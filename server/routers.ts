import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { notifyOwner } from "./_core/notification";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { createContactMessage } from "./db";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const contactMessageInput = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(120),
  email: z.string().trim().email("Please enter a valid email address.").max(320),
  subject: z.string().trim().min(3, "Please add a short subject.").max(160),
  message: z.string().trim().min(15, "Please include a little more detail.").max(5000),
  company: z.string().max(0).optional().default(""),
});

const contactCooldowns = new Map<string, number>();
const CONTACT_COOLDOWN_MS = 30_000;

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),
  contact: router({
    submit: publicProcedure.input(contactMessageInput).mutation(async ({ ctx, input }) => {
      const senderKey = ctx.req.ip ?? ctx.req.socket.remoteAddress ?? "unknown";
      const lastSubmission = contactCooldowns.get(senderKey);
      if (lastSubmission && Date.now() - lastSubmission < CONTACT_COOLDOWN_MS) {
        throw new TRPCError({ code: "TOO_MANY_REQUESTS", message: "Please wait a moment before sending another message." });
      }

      // Honeypot field: return a neutral response without storing likely bot traffic.
      if (input.company) return { success: true, notified: false } as const;

      await createContactMessage({
        name: input.name,
        email: input.email,
        subject: input.subject,
        message: input.message,
      });
      contactCooldowns.set(senderKey, Date.now());

      let notified = false;
      try {
        notified = await notifyOwner({
          title: `New portfolio message: ${input.subject}`,
          content: `${input.name} (${input.email}) wrote:\n\n${input.message}`,
        });
      } catch (error) {
        console.warn("[Contact] Message stored, but owner notification failed:", error);
      }
      return { success: true, notified } as const;
    }),
  }),

  // TODO: add feature routers here, e.g.
  // todo: router({
  //   list: protectedProcedure.query(({ ctx }) =>
  //     db.getUserTodos(ctx.user.id)
  //   ),
  // }),
});

export type AppRouter = typeof appRouter;
