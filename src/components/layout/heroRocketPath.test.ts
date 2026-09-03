import { describe, expect, it } from "bun:test";
import { computeRocketTransform } from "./heroRocketPath";

describe("computeRocketTransform", () => {
  it("starts at the beginning of the path at elapsed=0", () => {
    const { x, y } = computeRocketTransform(0, 6);
    expect(x).toBeCloseTo(-2.2);
    expect(y).toBeCloseTo(-2.0);
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

  it("keeps both path endpoints beyond the camera's visible frustum", () => {
    // 4 * tan(20deg) at z=0, camera fov 40, distance 4, plus the model's own
    // scaled half-extent (~0.24) so the loop reset happens off-screen.
    const VISIBLE_HALF_EXTENT = 4 * Math.tan((20 * Math.PI) / 180);

    const start = computeRocketTransform(0, 6);
    const nearEnd = computeRocketTransform(5.99, 6); // just before it wraps back to start

    expect(Math.abs(start.x)).toBeGreaterThan(VISIBLE_HALF_EXTENT);
    expect(Math.abs(start.y)).toBeGreaterThan(VISIBLE_HALF_EXTENT);
    expect(Math.abs(nearEnd.x)).toBeGreaterThan(VISIBLE_HALF_EXTENT);
    expect(Math.abs(nearEnd.y)).toBeGreaterThan(VISIBLE_HALF_EXTENT);
  });
});
