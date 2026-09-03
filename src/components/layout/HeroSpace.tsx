"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Particles, { ParticlesProvider } from "@tsparticles/react";
import type { Engine } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { Link } from "@/i18n/navigation";
import { prefersReducedMotion } from "@/components/SmoothScroll";
import { computeTilt } from "./heroTilt";
import { HeroRocket } from "./HeroRocket";

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
            number: { value: 90 },
            color: { value: ["#ffffff", "#00f0ff"] },
            opacity: {
              value: { min: 0.2, max: 0.9 },
              animation: { enable: !reducedMotion, speed: 0.6, sync: false },
            },
            size: { value: { min: 0.5, max: 2 } },
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

function HeroAstronaut() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const section = wrapperRef.current?.closest(".hero-space");
    const tiltEl = tiltRef.current;
    if (!section || !tiltEl) return;

    function handleMove(event: Event) {
      const mouseEvent = event as MouseEvent;
      const rect = (section as HTMLElement).getBoundingClientRect();
      const { rotateX, rotateY } = computeTilt(mouseEvent.clientX, mouseEvent.clientY, rect);
      tiltEl!.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }

    section.addEventListener("mousemove", handleMove);
    return () => section.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div ref={wrapperRef} className="hero-float relative w-full max-w-[360px] shrink-0 sm:order-last">
      <div ref={tiltRef} className="relative aspect-square w-full">
        <Image
          src="/assets/hero/astronaut.png"
          alt=""
          aria-hidden="true"
          fill
          sizes="(min-width: 640px) 360px, 70vw"
          priority
          className="object-contain drop-shadow-[0_20px_60px_rgba(157,78,221,0.45)]"
        />
      </div>
    </div>
  );
}

export function HeroSpace({ name, greeting, tagline, ctaLabel, connectLabel }: HeroSpaceProps) {
  return (
    <section className="hero-space fade-in-up relative isolate flex flex-col items-center gap-10 overflow-hidden rounded-[var(--radius-md)] px-6 py-16 sm:flex-row sm:justify-between sm:px-12 sm:py-20">
      <HeroStarfield />
      <HeroRocket />
      <div className="relative z-10 max-w-xl text-center sm:text-left">
        <p className="text-[var(--neon-cyan)]">{greeting}</p>
        <h1 className="mt-2 text-[42px] font-bold leading-[1.1] tracking-[-0.02em] sm:text-[52px]">{name}</h1>
        <p className="mt-4 text-lg text-white/80">{tagline}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3 sm:justify-start">
          <Link
            href="/projects"
            className="rounded-full bg-[var(--neon-cyan)] px-6 py-2.5 font-medium text-[#0b0d17] transition-transform duration-[var(--dur-fast)] hover:-translate-y-0.5"
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
      <HeroAstronaut />
    </section>
  );
}
