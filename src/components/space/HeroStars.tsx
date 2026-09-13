"use client";

import Particles, { ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useCallback } from "react";

const starOptions = {
  detectRetina: true,
  fpsLimit: 40,
  fullScreen: { enable: false },
  interactivity: {
    events: { onClick: { enable: false }, onHover: { enable: false }, resize: { enable: true } },
  },
  particles: {
    color: { value: ["#f9f7e8", "#8ecee3", "#ffffff"] },
    links: { enable: false },
    move: { enable: true, speed: 0.12, direction: "none", outModes: { default: "out" } },
    number: { density: { enable: true, area: 900 }, value: 85 },
    opacity: { value: { min: 0.2, max: 0.75 } },
    reduceDuplicates: true,
    shape: { type: "circle" },
    size: { value: { min: 1, max: 2.4 } },
  },
} as const;

export function HeroStars() {
  const initializeParticles = useCallback(async (engine: Parameters<typeof loadSlim>[0]) => {
    await loadSlim(engine);
  }, []);

  return (
    <div className="hero-stars" aria-hidden="true">
      <ParticlesProvider init={initializeParticles}>
        <Particles id="hero-stars" options={starOptions} />
      </ParticlesProvider>
    </div>
  );
}
