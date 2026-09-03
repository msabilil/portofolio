import { describe, expect, it } from "bun:test";
import { computeTilt } from "./heroTilt";

const RECT = { left: 0, top: 0, width: 200, height: 100 };

describe("computeTilt", () => {
  it("returns no tilt when the cursor is at the center", () => {
    const { rotateX, rotateY } = computeTilt(100, 50, RECT);
    expect(rotateX).toBe(0);
    expect(rotateY).toBe(0);
  });

  it("clamps to +maxDeg at the right edge", () => {
    const { rotateY } = computeTilt(200, 50, RECT, 6);
    expect(rotateY).toBe(6);
  });

  it("clamps to -maxDeg at the left edge", () => {
    const { rotateY } = computeTilt(0, 50, RECT, 6);
    expect(rotateY).toBe(-6);
  });

  it("tilts up (+rotateX) when the cursor is at the top edge", () => {
    const { rotateX } = computeTilt(100, 0, RECT, 6);
    expect(rotateX).toBe(6);
  });

  it("tilts down (-rotateX) when the cursor is at the bottom edge", () => {
    const { rotateX } = computeTilt(100, 100, RECT, 6);
    expect(rotateX).toBe(-6);
  });

  it("respects a custom maxDeg", () => {
    const { rotateY } = computeTilt(200, 50, RECT, 10);
    expect(rotateY).toBe(10);
  });
});
