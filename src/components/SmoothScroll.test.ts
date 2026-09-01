import { afterEach, describe, expect, it } from "bun:test";
import { prefersReducedMotion } from "./SmoothScroll";

function mockMatchMedia(matches: boolean) {
  window.matchMedia = ((query: string) => ({
    matches,
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
  })) as unknown as typeof window.matchMedia;
}

describe("prefersReducedMotion", () => {
  afterEach(() => {
    // @ts-expect-error test cleanup only
    delete window.matchMedia;
  });

  it("is true when the OS setting is enabled", () => {
    mockMatchMedia(true);
    expect(prefersReducedMotion()).toBe(true);
  });

  it("is false otherwise", () => {
    mockMatchMedia(false);
    expect(prefersReducedMotion()).toBe(false);
  });
});
