import { describe, expect, it } from "bun:test";
import { computeRocketTransform } from "./heroRocketPath";

describe("computeRocketTransform", () => {
  it("starts at the beginning of the path at elapsed=0", () => {
    const { x, y } = computeRocketTransform(0, 6);
    expect(x).toBeCloseTo(-1.4);
    expect(y).toBeCloseTo(-1);
  });

  it("reaches the midpoint of the path at half the loop duration", () => {
    const { x, y } = computeRocketTransform(3, 6);
    expect(x).toBeCloseTo(0);
    expect(y).toBeCloseTo(0);
  });

  it("loops seamlessly back to the start position", () => {
    const start = computeRocketTransform(0, 6);
    const wrapped = computeRocketTransform(6, 6);
    expect(wrapped.x).toBeCloseTo(start.x);
    expect(wrapped.y).toBeCloseTo(start.y);
  });

  it("normalizes negative elapsed time instead of going negative", () => {
    const { x, y } = computeRocketTransform(-1, 6);
    const expected = computeRocketTransform(5, 6);
    expect(x).toBeCloseTo(expected.x);
    expect(y).toBeCloseTo(expected.y);
  });

  it("always returns the same fixed bank angle", () => {
    expect(computeRocketTransform(0).rotationZ).toBe(-0.5);
    expect(computeRocketTransform(4.2).rotationZ).toBe(-0.5);
  });
});
