"use client";

import Image from "next/image";
import Particles, { ParticlesProvider } from "@tsparticles/react";
import type { Engine } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { Link } from "@/i18n/navigation";
import { prefersReducedMotion } from "@/components/SmoothScroll";

type HeroSpaceProps = {
  name: string;
  greeting: string;
  tagline: string;
  ctaLabel: string;
  connectLabel: string;
};

// Full-bleed AI-generated background (nebula, planets, astronaut, and
// rocket all baked into one image) — replaces the earlier hand-built
// canvas nebula, CSS planets, and SVG rocket. The tsparticles starfield
// stays layered on top for a bit of drifting/twinkling motion the
// static image alone doesn't have.
//
// `fill` + object-cover always spans the section edge-to-edge at
// whatever height the responsive min-height below sets — object-contain
// kept the image uncropped but pillarboxed (empty bars left/right)
// whenever the section's width:height ratio didn't match the image's
// own 16:9, which loses full-width for a wide hero far more often than
// it avoids a modest top/bottom crop.
function HeroBackground() {
  return (
    <Image
      src="/assets/hero/space-background.jpg"
      alt=""
      aria-hidden="true"
      fill
      priority
      sizes="100vw"
      className="-z-20 object-cover"
    />
  );
}

async function initStarfield(engine: Engine) {
  await loadSlim(engine);
}

function HeroStarfield() {
  const reducedMotion = prefersReducedMotion();

  return (
    <ParticlesProvider init={initStarfield}>
      <Particles
        id="hero-starfield"
        className="absolute inset-0 -z-10"
        options={{
          fullScreen: false,
          background: { color: "transparent" },
          fpsLimit: 60,
          particles: {
            number: { value: 150 },
            color: { value: ["#ffffff", "#00f0ff"] },
            opacity: {
              value: { min: 0.2, max: 0.9 },
              animation: { enable: !reducedMotion, speed: 0.6, sync: false },
            },
            size: { value: { min: 0.3, max: 2.2 } },
            move: {
              enable: !reducedMotion,
              speed: 0.2,
              direction: "none",
              random: true,
              outModes: { default: "out" },
            },
          },
          interactivity: {
            events: { onHover: { enable: false }, onClick: { enable: false } },
          },
        }}
      />
    </ParticlesProvider>
  );
}

export function HeroSpace({ name, greeting, tagline, ctaLabel, connectLabel }: HeroSpaceProps) {
  return (
    <section className="hero-space fade-in-up relative isolate min-h-[420px] overflow-hidden sm:min-h-[480px] lg:min-h-[600px]">
      <HeroBackground />
      <HeroStarfield />
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 py-16 sm:items-start sm:justify-center sm:px-12 sm:py-20 md:px-10 lg:px-12">
        <div className="max-w-xl text-center sm:text-left">
          <p className="text-[var(--neon-cyan)]">{greeting}</p>
          <h1 className="mt-2 text-[42px] font-bold leading-[1.1] tracking-[-0.02em] sm:text-[52px]">{name}</h1>
          <p className="mt-4 text-lg text-white/80">{tagline}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3 sm:justify-start">
            <Link
              href="/projects"
              className="rounded-full bg-[var(--neon-cyan)] px-6 py-2.5 font-medium text-[#0b0d17] shadow-[0_0_20px_rgba(0,240,255,0.55)] transition-[transform,box-shadow] duration-[var(--dur-fast)] hover:-translate-y-0.5 hover:shadow-[0_0_28px_rgba(0,240,255,0.8)]"
            >
              {ctaLabel}
            </Link>
            <a
              href="#contact"
              className="rounded-full border border-[var(--neon-purple)] px-6 py-2.5 font-medium text-[var(--neon-purple-text)] transition-transform duration-[var(--dur-fast)] hover:-translate-y-0.5"
            >
              {connectLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
