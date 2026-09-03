export type RocketTransform = { x: number; y: number; rotationZ: number };

const PATH_START_X = -1.4;
const PATH_END_X = 1.4;
const PATH_START_Y = -1;
const PATH_END_Y = 1;
const BANK_ANGLE_RAD = -0.5;

/**
 * Position along a fixed diagonal flight path, looping every
 * `loopDuration` seconds. Negative/large `elapsedSeconds` values are
 * normalized into [0, loopDuration) so the loop never jumps.
 */
export function computeRocketTransform(elapsedSeconds: number, loopDuration = 6): RocketTransform {
  const wrapped = ((elapsedSeconds % loopDuration) + loopDuration) % loopDuration;
  const t = wrapped / loopDuration;

  return {
    x: PATH_START_X + t * (PATH_END_X - PATH_START_X),
    y: PATH_START_Y + t * (PATH_END_Y - PATH_START_Y),
    rotationZ: BANK_ANGLE_RAD,
  };
}
