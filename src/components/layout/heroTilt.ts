export type Tilt = { rotateX: number; rotateY: number };

export type TiltRect = { left: number; top: number; width: number; height: number };

function clamp(value: number, min: number, max: number): number {
  const result = Math.min(max, Math.max(min, value));
  return Object.is(result, -0) ? 0 : result;
}

/**
 * Maps a cursor position within `rect` to a small rotation, clamped to
 * +/-maxDeg. Center of the rect = no tilt; edges = full tilt.
 */
export function computeTilt(clientX: number, clientY: number, rect: TiltRect, maxDeg = 6): Tilt {
  const relX = rect.width === 0 ? 0 : (clientX - rect.left) / rect.width - 0.5;
  const relY = rect.height === 0 ? 0 : (clientY - rect.top) / rect.height - 0.5;

  return {
    rotateY: clamp(relX * maxDeg * 2, -maxDeg, maxDeg),
    rotateX: clamp(-relY * maxDeg * 2, -maxDeg, maxDeg),
  };
}
