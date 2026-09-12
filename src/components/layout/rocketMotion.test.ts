import { describe, expect, test } from "bun:test";
import { getAutoFlightPosition, getReleaseVelocity } from "./rocketMotion";

describe("rocket motion", () => {
  test("starts off the left side and moves to the right side slowly", () => {
    const bounds = { width: 800, height: 500 };
    const start = getAutoFlightPosition(0, bounds);
    const middle = getAutoFlightPosition(0.5, bounds);
    const end = getAutoFlightPosition(1, bounds);

    expect(start.x).toBeLessThan(-bounds.width / 2);
    expect(middle.x).toBeGreaterThan(start.x);
    expect(end.x).toBeGreaterThan(bounds.width / 2);
    expect(Math.abs(middle.y)).toBeLessThan(bounds.height / 2);
  });

  test("keeps a playful release velocity within a safe limit", () => {
    expect(getReleaseVelocity({ x: 120, y: -80 }, 16)).toEqual({ x: 8, y: -5 });
    expect(getReleaseVelocity({ x: 2000, y: -2000 }, 16)).toEqual({ x: 18, y: -18 });
  });
});
