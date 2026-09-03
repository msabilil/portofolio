export type RocketTransform = { x: number; y: number; rotationZ: number };

// Path endpoints must clear the camera's visible frustum (4 * tan(20deg) =
// ~1.456 at z=0, camera fov 40 dist 4) plus the model's own scaled half-extent
// (~0.24) so the loop reset happens off-screen instead of visibly teleporting.
const PATH_START_X = -2.2;
const PATH_END_X = 2.2;
const PATH_START_Y = -2.0;
const PATH_END_Y = 2.0;
export const BANK_ANGLE_RAD = -0.5;
export const DEFAULT_LOOP_DURATION = 6;

/**
 * Position along a fixed diagonal flight path, looping every
 * `loopDuration` seconds. Negative/large `elapsedSeconds` values are
 * normalized into [0, loopDuration) so the loop never jumps.
 */
export function computeRocketTransform(
  elapsedSeconds: number,
  loopDuration = DEFAULT_LOOP_DURATION,
): RocketTransform {
  const wrapped = ((elapsedSeconds % loopDuration) + loopDuration) % loopDuration;
  const t = wrapped / loopDuration;

  return {
    x: PATH_START_X + t * (PATH_END_X - PATH_START_X),
    y: PATH_START_Y + t * (PATH_END_Y - PATH_START_Y),
    rotationZ: BANK_ANGLE_RAD,
  };
}
