"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import type { Group } from "three";
import { prefersReducedMotion } from "@/components/SmoothScroll";
import { computeRocketTransform } from "./heroRocketPath";

const MODEL_PATH = "/assets/3d/rocket.glb";
const LOOP_DURATION = 6;
const RESTING_ROTATION_Z = -0.5;

function RocketModel() {
  const { scene } = useGLTF(MODEL_PATH);
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    const group = groupRef.current;
    if (!group) return;

    if (prefersReducedMotion()) {
      group.position.set(0, 0, 0);
      group.rotation.z = RESTING_ROTATION_Z;
      return;
    }

    const { x, y, rotationZ } = computeRocketTransform(state.clock.elapsedTime, LOOP_DURATION);
    group.position.set(x, y, 0);
    group.rotation.z = rotationZ;
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene} scale={0.6} />
      <pointLight color="#ff8a3d" intensity={4} distance={1.5} position={[0, -0.4, 0]} />
    </group>
  );
}

export function HeroRocket() {
  return (
    <div
      className="pointer-events-none absolute right-2 top-2 h-[220px] w-[220px] sm:h-[280px] sm:w-[280px]"
      aria-hidden="true"
    >
      <Canvas camera={{ position: [0, 0, 4], fov: 40 }} gl={{ alpha: true, antialias: true }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[2, 2, 2]} intensity={1.2} />
        <Suspense fallback={null}>
          <RocketModel />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload(MODEL_PATH);
