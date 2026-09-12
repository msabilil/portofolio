export type RocketBounds = {
  width: number;
  height: number;
};

export type RocketPosition = {
  x: number;
  y: number;
};

export type PointerDelta = RocketPosition;

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export function getAutoFlightPosition(progress: number, bounds: RocketBounds): RocketPosition {
  const normalizedProgress = clamp(progress, 0, 1);
  // Leave enough clearance for the entire model before an offscreen reset,
  // including on narrow phones where a percentage-only margin is too small.
  const clearance = Math.max(bounds.width * 0.15, 132);
  const startX = -bounds.width / 2 - clearance;
  const endX = bounds.width / 2 + clearance;
  const arc = Math.sin(normalizedProgress * Math.PI) * bounds.height * 0.005;
  const verticalOffset = bounds.width >= 1200 ? 0.28 : 0.3;

  return {
    x: startX + (endX - startX) * normalizedProgress,
    y: bounds.height * verticalOffset + arc,
  };
}

export function getReleaseVelocity(delta: PointerDelta, elapsedMs: number): PointerDelta {
  const safeElapsedMs = Math.max(elapsedMs, 1);

  return {
    x: clamp(Math.round(delta.x / safeElapsedMs), -18, 18),
    y: clamp(Math.round(delta.y / safeElapsedMs), -18, 18),
  };
}
