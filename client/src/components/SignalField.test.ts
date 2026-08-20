import { describe, expect, it } from "vitest";
import { signalFieldProfile } from "./SignalField";

describe("Signal Field profile", () => {
  it("keeps the 3D background within the intended performance and accessibility envelope", () => {
    expect(signalFieldProfile).toEqual({
      ringCount: 14,
      maxPixelRatio: 1.5,
      disablesOnCompactViewport: true,
      respectsReducedMotion: true,
    });
  });
});
