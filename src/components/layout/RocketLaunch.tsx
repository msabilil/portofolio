"use client";

import { Suspense, useCallback, useLayoutEffect, useRef, useState, type ComponentRef, type RefObject } from "react";
import {
  Canvas,
  useFrame,
  useThree,
  events,
  type ThreeEvent,
} from "@react-three/fiber";
import { Trail, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { prefersReducedMotion } from "@/components/SmoothScroll";
import { getAutoFlightPosition, getReleaseVelocity } from "./rocketMotion";

const AUTO_FLIGHT_SECONDS = 16;
const ROCKET_SCALE = 44;
const MAX_FLING_SECONDS = 0.8;
const TAIL_OFFSET = 0.4;
const ROCKET_X_LIMIT = 0.62;
const ROCKET_Y_MIN = -0.36;
const ROCKET_Y_MAX = 0.42;

type RocketMode = "auto" | "dragging" | "flinging" | "exiting" | "resetting";

function FlyingRocket({ reducedMotion }: { reducedMotion: boolean }) {
  const { scene } = useGLTF("/assets/hero/rocket.glb", true);
  const group = useRef<THREE.Group>(null);
  const trailAnchor = useRef<THREE.Group>(null);
  const trailMesh = useRef<ComponentRef<typeof Trail>>(null);
  const exhaust = useRef<THREE.Mesh>(null);
  const tailPosition = useRef(new THREE.Vector3());
  const { size } = useThree();
  const [mode, setMode] = useState<RocketMode>("auto");
  const modeRef = useRef<RocketMode>(mode);
  const autoStartTime = useRef<number | null>(null);
  const elapsedTime = useRef(0);
  const launchTime = useRef(0);
  const lastMoveTime = useRef(0);
  const dragOffset = useRef(new THREE.Vector3());
  const lastDragPoint = useRef(new THREE.Vector3());
  const releaseVelocity = useRef(new THREE.Vector3());
  const aimAxis = useRef(new THREE.Vector3(0, 0, 1));
  const aimQuaternion = useRef(new THREE.Quaternion());
  const dragPlane = useRef(new THREE.Plane(new THREE.Vector3(0, 0, 1), 0));
  const initialFlightPosition = getAutoFlightPosition(0, size);

  const syncTrailAnchor = useCallback(() => {
    if (!group.current || !trailAnchor.current) return;

    const tailOffset = tailPosition.current.set(0, -TAIL_OFFSET, 0)
      .multiplyScalar(group.current.scale.x)
      .applyQuaternion(group.current.quaternion)
      .add(group.current.position);
    trailAnchor.current.position.copy(tailOffset);
  }, []);

  const changeMode = useCallback((nextMode: RocketMode) => {
    modeRef.current = nextMode;
    if (exhaust.current) {
      exhaust.current.visible = !reducedMotion &&
        (nextMode === "dragging" || nextMode === "flinging");
    }
    setMode(nextMode);
  }, [reducedMotion]);

  function resetFlight() {
    // Hide both meshes immediately, before this frame is drawn. React then
    // unmounts the old Trail before the anchor is moved to the next launch.
    if (group.current) group.current.visible = false;
    if (trailMesh.current) trailMesh.current.visible = false;
    changeMode("resetting");
  }

  function pointFromPointer(event: { ray: THREE.Ray }) {
    const target = new THREE.Vector3();
    if (!event.ray.intersectPlane(dragPlane.current, target)) return null;

    target.x = THREE.MathUtils.clamp(
      target.x,
      -size.width * ROCKET_X_LIMIT,
      size.width * ROCKET_X_LIMIT,
    );
    target.y = THREE.MathUtils.clamp(
      target.y,
      size.height * ROCKET_Y_MIN,
      size.height * ROCKET_Y_MAX,
    );
    target.z = 0;
    return target;
  }

  const aimRocket = useCallback((direction: THREE.Vector3) => {
    if (!group.current || direction.lengthSq() < 0.0001) return;

    aimQuaternion.current.setFromAxisAngle(
      aimAxis.current,
      Math.atan2(direction.y, direction.x) - Math.PI / 2,
    );
    group.current.quaternion.copy(aimQuaternion.current);
  }, []);

  useLayoutEffect(() => {
    if (mode !== "resetting" || !group.current || !trailAnchor.current) return;
    const start = getAutoFlightPosition(0, size);
    const next = getAutoFlightPosition(0.01, size);
    group.current.position.set(start.x, start.y, 0);
    aimRocket(new THREE.Vector3(next.x - start.x, next.y - start.y, 0));
    group.current.scale.setScalar(ROCKET_SCALE);
    syncTrailAnchor();
    autoStartTime.current = elapsedTime.current;
    group.current.visible = true;
    // The next commit mounts a fresh Trail at the already-positioned tail.
    changeMode("auto");
  }, [mode, size, aimRocket, syncTrailAnchor, changeMode]);

  function capturePointer(event: ThreeEvent<PointerEvent>) {
    const target = event.target as unknown as {
      setPointerCapture: (pointerId: number) => void;
      releasePointerCapture: (pointerId: number) => void;
    };

    return target;
  }

  function handlePointerDown(event: ThreeEvent<PointerEvent>) {
    const target = event.nativeEvent.target;
    if (target instanceof Element && target.closest("a, button, input, select, textarea")) return;
    if (reducedMotion || modeRef.current === "resetting") return;
    const point = pointFromPointer(event);
    if (!group.current || !point) return;

    event.stopPropagation();
    event.nativeEvent.preventDefault();
    capturePointer(event).setPointerCapture(event.pointerId);
    dragOffset.current.copy(group.current.position).sub(point);
    lastDragPoint.current.copy(group.current.position);
    lastMoveTime.current = performance.now();
    releaseVelocity.current.set(0, 0, 0);
    changeMode("dragging");
  }

  function handlePointerMove(event: ThreeEvent<PointerEvent>) {
    const point = pointFromPointer(event);
    if (modeRef.current !== "dragging" || !group.current || !point) return;

    event.stopPropagation();
    event.nativeEvent.preventDefault();
    point.add(dragOffset.current);
    point.x = THREE.MathUtils.clamp(
      point.x,
      -size.width * ROCKET_X_LIMIT,
      size.width * ROCKET_X_LIMIT,
    );
    point.y = THREE.MathUtils.clamp(
      point.y,
      size.height * ROCKET_Y_MIN,
      size.height * ROCKET_Y_MAX,
    );
    const now = performance.now();
    const deltaMs = now - lastMoveTime.current;
    const delta = point.clone().sub(lastDragPoint.current);
    const velocity = getReleaseVelocity({ x: delta.x, y: delta.y }, deltaMs);
    releaseVelocity.current.set(velocity.x, velocity.y, 0);
    group.current.position.copy(point);
    aimRocket(delta);
    lastDragPoint.current.copy(point);
    lastMoveTime.current = now;
  }

  function handlePointerUp(event: ThreeEvent<PointerEvent>) {
    if (modeRef.current !== "dragging") return;

    event.stopPropagation();
    capturePointer(event).releasePointerCapture(event.pointerId);

    if (reducedMotion) {
      resetFlight();
      return;
    }

    // A click without dragging still gives an immediate push along the nose.
    if (releaseVelocity.current.lengthSq() < 1 && group.current) {
      releaseVelocity.current.set(0, 8, 0).applyQuaternion(group.current.quaternion);
    }
    launchTime.current = elapsedTime.current;
    changeMode("flinging");
  }

  function handlePointerCancel(event: ThreeEvent<PointerEvent>) {
    if (modeRef.current !== "dragging") return;

    event.stopPropagation();
    capturePointer(event).releasePointerCapture(event.pointerId);
    changeMode("exiting");
  }

  useFrame((_state, rawDelta) => {
    if (!group.current || modeRef.current === "resetting") return;

    // Resume from the last visible frame, without a large time jump after a pause.
    const delta = Math.min(rawDelta, 0.05);
    const elapsed = elapsedTime.current + delta;
    elapsedTime.current = elapsed;

    if (modeRef.current === "auto") {
      autoStartTime.current ??= elapsed;
      const flightProgress =
        (elapsed - autoStartTime.current) / AUTO_FLIGHT_SECONDS;
      const progress = Math.min(flightProgress, 1);

      const position = getAutoFlightPosition(progress, size);
      const nextPosition = getAutoFlightPosition(
        Math.min(progress + 0.01, 1),
        size,
      );
      group.current.position.set(position.x, position.y, 0);
      aimRocket(
        new THREE.Vector3(
          nextPosition.x - position.x,
          nextPosition.y - position.y,
          0,
        ),
      );
      group.current.scale.setScalar(ROCKET_SCALE);
      syncTrailAnchor();

      if (progress >= 1) {
        resetFlight();
      }
      return;
    }

    if (modeRef.current === "dragging") {
      group.current.scale.setScalar(ROCKET_SCALE * 1.08);
      syncTrailAnchor();
      return;
    }

    if (modeRef.current === "flinging") {
      const frameScale = delta * 60;
      group.current.position.addScaledVector(
        releaseVelocity.current,
        frameScale,
      );
      releaseVelocity.current.y -= 0.18 * frameScale;
      releaseVelocity.current.multiplyScalar(Math.pow(0.96, frameScale));
      aimRocket(releaseVelocity.current);
      group.current.scale.setScalar(ROCKET_SCALE * 1.08);
      syncTrailAnchor();

      if (elapsed - launchTime.current >= MAX_FLING_SECONDS)
        changeMode("exiting");
      return;
    }

    // After interaction, leave through the right edge before resetting offscreen.
    const exitSpeed = Math.max(size.width * 0.45, 240);
    const flightY = getAutoFlightPosition(1, size).y;
    const verticalStep = (flightY - group.current.position.y) * (1 - Math.exp(-2 * delta));
    group.current.position.x += exitSpeed * delta;
    group.current.position.y += verticalStep;
    aimRocket(new THREE.Vector3(exitSpeed * delta, verticalStep, 0));
    group.current.scale.setScalar(ROCKET_SCALE);
    syncTrailAnchor();

    if (group.current.position.x > size.width / 2 + ROCKET_SCALE * 3) resetFlight();
  });

  return (
    <>
      <group
        ref={trailAnchor}
        position={[initialFlightPosition.x - ROCKET_SCALE * TAIL_OFFSET, initialFlightPosition.y, 0]}
      />
      <group
        ref={group}
        position={[initialFlightPosition.x, initialFlightPosition.y, 0]}
        scale={ROCKET_SCALE}
        rotation={[0, 0, -Math.PI / 2]}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
      >
        {!reducedMotion && (
          <mesh ref={exhaust} visible={false} position={[0, -0.57, 0]} rotation={[0, 0, Math.PI]} raycast={() => {}}>
            <coneGeometry args={[0.11, 0.34, 12]} />
            <meshBasicMaterial color="#22d3ee" transparent opacity={0.9} />
          </mesh>
        )}
        <primitive object={scene} />
        {!reducedMotion && mode !== "resetting" && (
          <Trail
            ref={trailMesh}
            target={trailAnchor as unknown as RefObject<THREE.Object3D>}
            width={0.8}
            length={5}
            color="#22d3ee"
            attenuation={(width) => width * width}
          />
        )}
      </group>
    </>
  );
}

export function RocketLaunch({ active = true, eventSource }: {
  active?: boolean;
  eventSource: RefObject<HTMLElement | null>;
}) {
  const reducedMotion = prefersReducedMotion();

  return (
    <div
      className="rocket-play-area"
      role="group"
      aria-label="Roket interaktif. Tarik roket dengan mouse atau sentuhan."
    >
      <Canvas
        eventSource={eventSource as RefObject<HTMLElement>}
        events={(store) => ({
          ...events(store),
          compute: (event, state) => {
            const rect = state.gl.domElement.getBoundingClientRect();
            state.pointer.set(
              ((event.clientX - rect.left) / rect.width) * 2 - 1,
              -((event.clientY - rect.top) / rect.height) * 2 + 1,
            );
            state.raycaster.setFromCamera(state.pointer, state.camera);
          },
        })}
        frameloop={active ? "always" : "never"}
        orthographic
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 1.5]}
        style={{ touchAction: "pan-y" }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[2, 3, 4]} intensity={1.4} />
        <Suspense fallback={null}>
          <FlyingRocket reducedMotion={reducedMotion} />
        </Suspense>
      </Canvas>
    </div>
  );
}
