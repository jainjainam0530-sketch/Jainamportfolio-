import { describe, expect, it } from "vitest";
import { getScrollAudioState, signalAudioProfile, signalFieldProfile } from "./SignalField";

describe("Signal Field profile", () => {
  it("keeps the 3D background within the intended performance and accessibility envelope", () => {
    expect(signalFieldProfile).toEqual({
      ringCount: 14,
      maxPixelRatio: 1.5,
      disablesOnCompactViewport: true,
      respectsReducedMotion: true,
      usesPointerDepth: true,
    });
  });
});

describe("Signal Field soundscape", () => {
  it("keeps a melodic frequency band audible across the full scroll range", () => {
    const top = getScrollAudioState(0);
    const middle = getScrollAudioState(0.5);
    const bottom = getScrollAudioState(1);

    expect(top.frequency).toBe(signalAudioProfile.topFrequency);
    expect(bottom.frequency).toBe(signalAudioProfile.bottomFrequency);
    expect(top.frequency).toBeGreaterThan(middle.frequency);
    expect(middle.frequency).toBeGreaterThan(bottom.frequency);
    expect(bottom.frequency).toBeGreaterThan(1000);
  });

  it("clamps out-of-range scroll progress and increases presence lower on the page", () => {
    expect(getScrollAudioState(-1)).toEqual(getScrollAudioState(0));
    expect(getScrollAudioState(2)).toEqual(getScrollAudioState(1));
    expect(getScrollAudioState(1).resonance).toBeGreaterThan(getScrollAudioState(0).resonance);
    expect(getScrollAudioState(1).volume).toBeGreaterThan(getScrollAudioState(0).volume);
  });
});
