"use client";

import { Component, Suspense, useRef, type ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import type { Group } from "three";
import { prefersReducedMotion } from "@/components/SmoothScroll";
import { computeRocketTransform, BANK_ANGLE_RAD, DEFAULT_LOOP_DURATION } from "./heroRocketPath";

const MODEL_PATH = "/assets/3d/rocket.glb";
const DRACO_DECODER_PATH = "/draco/";

class RocketErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    return this.state.hasError ? null : this.props.children;
  }
}

function RocketModel() {
  const { scene } = useGLTF(MODEL_PATH, DRACO_DECODER_PATH);
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    const group = groupRef.current;
    if (!group) return;

    if (prefersReducedMotion()) {
      group.position.set(0, 0, 0);
      group.rotation.z = BANK_ANGLE_RAD;
      return;
    }

    const { x, y, rotationZ } = computeRocketTransform(state.clock.elapsedTime, DEFAULT_LOOP_DURATION);
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
      className="pointer-events-none absolute right-2 top-2 h-[140px] w-[140px] sm:h-[180px] sm:w-[180px]"
      aria-hidden="true"
    >
      <Canvas camera={{ position: [0, 0, 4], fov: 40 }} gl={{ alpha: true, antialias: true }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[2, 2, 2]} intensity={1.2} />
        <Suspense fallback={null}>
          <RocketErrorBoundary>
            <RocketModel />
          </RocketErrorBoundary>
        </Suspense>
      </Canvas>
    </div>
  );
}

if (typeof window !== "undefined") {
  useGLTF.preload(MODEL_PATH, DRACO_DECODER_PATH);
}
