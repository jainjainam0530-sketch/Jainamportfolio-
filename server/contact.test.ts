import { describe, expect, it } from "vitest";
import { contactMessageInput } from "./routers";

describe("contact message input", () => {
  it("accepts a complete visitor message", () => {
    const result = contactMessageInput.safeParse({
      name: "Alex Visitor",
      email: "alex@example.com",
      subject: "Portfolio question",
      message: "I would like to discuss an opportunity related to your work.",
      company: "",
    });
    expect(result.success).toBe(true);
  });

  it("rejects incomplete messages", () => {
    const result = contactMessageInput.safeParse({ name: "A", email: "invalid", subject: "Hi", message: "Short" });
    expect(result.success).toBe(false);
  });
});
