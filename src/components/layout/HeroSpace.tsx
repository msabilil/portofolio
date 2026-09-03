"use client";

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

// Decorative PNG layers over the nebula background. The files don't
// exist yet — the user is supplying them — so these quietly render
// nothing (empty alt, no broken-image chrome) until each path is
// filled in. Position/size for each comes from the --astronaut-*,
// --rocket-*, --planet-*-* custom properties on .hero-space (see
// globals.css) so they can be moved without touching this file.
function HeroDecorativeAssets() {
  return (
    <>
      <img
        src="/assets/hero/planet-2.png"
        alt=""
        loading="lazy"
        className="hero-asset-float-c pointer-events-none absolute -z-10 hidden sm:block"
        style={{
          top: "var(--planet-2-top)",
          left: "var(--planet-2-left)",
          width: "var(--planet-2-width)",
        }}
      />
      <img
        src="/assets/hero/planet-1.png"
        alt=""
        loading="lazy"
        className="hero-asset-float-b pointer-events-none absolute -z-10 hidden sm:block"
        style={{
          top: "var(--planet-1-top)",
          left: "var(--planet-1-left)",
          width: "var(--planet-1-width)",
        }}
      />
      <img
        src="/assets/hero/planet-3.png"
        alt=""
        loading="lazy"
        className="hero-asset-float-a pointer-events-none absolute -z-10 hidden sm:block"
        style={{
          top: "var(--planet-3-top)",
          right: "var(--planet-3-right)",
          width: "var(--planet-3-width)",
        }}
      />
      <img
        src="/assets/hero/rocket.png"
        alt=""
        loading="eager"
        className="hero-asset-float-a pointer-events-none absolute -z-10"
        style={{
          top: "var(--rocket-top)",
          right: "var(--rocket-right)",
          width: "var(--rocket-width)",
        }}
      />
      <img
        src="/assets/hero/astronaut.png"
        alt=""
        loading="eager"
        className="hero-asset-float-b pointer-events-none absolute -z-10"
        style={{
          top: "var(--astronaut-top)",
          right: "var(--astronaut-right)",
          width: "var(--astronaut-width)",
          transform: "translateY(-50%)",
        }}
      />
    </>
  );
}

export function HeroSpace({ name, greeting, tagline, ctaLabel, connectLabel }: HeroSpaceProps) {
  return (
    <section className="hero-space fade-in-up relative isolate min-h-[420px] overflow-hidden sm:min-h-[480px] lg:min-h-[600px]">
      <HeroStarfield />
      <HeroDecorativeAssets />
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 py-16 sm:items-start sm:justify-center sm:px-12 sm:py-20 md:px-10 lg:px-12">
        <div className="max-w-xl text-center sm:text-left">
          <p className="font-medium text-[var(--accent-cyan)]">{greeting}</p>
          <h1 className="font-heading text-glow mt-2 text-[36px] font-bold uppercase leading-[1.15] tracking-[-0.01em] text-white sm:text-[48px]">
            {name}
          </h1>
          <p className="mt-4 text-lg text-[var(--color-text-muted)]">{tagline}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3 sm:justify-start">
            <Link
              href="/projects"
              className="rounded-full bg-gradient-to-r from-[var(--accent-cyan)] to-[#67e8f9] px-6 py-2.5 font-medium text-[#05060f] shadow-[0_0_20px_var(--accent-cyan-glow)] transition-[transform,box-shadow] duration-[var(--dur-fast)] hover:-translate-y-0.5 hover:shadow-[0_0_28px_var(--accent-cyan-glow)]"
            >
              {ctaLabel}
            </Link>
            <a
              href="#contact"
              className="rounded-full border border-[var(--accent-purple)] bg-white/5 px-6 py-2.5 font-medium text-[var(--accent-purple)] backdrop-blur-md transition-[transform,box-shadow] duration-[var(--dur-fast)] hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]"
            >
              {connectLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
