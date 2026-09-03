"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Particles, { ParticlesProvider } from "@tsparticles/react";
import type { Engine } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { Link } from "@/i18n/navigation";
import { prefersReducedMotion } from "@/components/SmoothScroll";
import { computeTilt } from "./heroTilt";

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

function HeroNebula() {
  return <div className="hero-nebula pointer-events-none absolute inset-0 -z-20" aria-hidden="true" />;
}

type HeroPlanetProps = {
  className: string;
  size: number;
  colors: [string, string, string];
  ring?: boolean;
};

function HeroPlanet({ className, size, colors, ring }: HeroPlanetProps) {
  const [light, base, dark] = colors;
  return (
    <div
      className={`pointer-events-none absolute -z-10 ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {ring && (
        <div
          className="absolute left-1/2 top-1/2 -z-10 rounded-full border border-white/25"
          style={{
            width: size * 1.9,
            height: size * 0.6,
            transform: "translate(-50%, -50%) rotate(-18deg)",
          }}
        />
      )}
      <div
        className="h-full w-full rounded-full"
        style={{
          background: `radial-gradient(circle at 32% 28%, ${light}, ${base} 55%, ${dark} 100%)`,
          boxShadow: `0 0 ${size * 0.4}px ${base}55`,
        }}
      />
    </div>
  );
}

function HeroRocket() {
  return (
    <div
      className="hero-float pointer-events-none absolute right-3 top-3 h-[140px] w-[140px] sm:h-[190px] sm:w-[190px]"
      aria-hidden="true"
    >
      <div className="hero-smoke-puff absolute bottom-2 left-2 h-6 w-6 rounded-full bg-white/50 blur-md" style={{ animationDelay: "0s" }} />
      <div className="hero-smoke-puff absolute bottom-4 left-4 h-5 w-5 rounded-full bg-white/40 blur-md" style={{ animationDelay: "0.8s" }} />
      <div className="hero-smoke-puff absolute bottom-1 left-6 h-4 w-4 rounded-full bg-white/30 blur-md" style={{ animationDelay: "1.6s" }} />
      <Image
        src="/assets/hero/rocket.png"
        alt=""
        aria-hidden="true"
        fill
        sizes="190px"
        className="object-contain drop-shadow-[0_10px_30px_rgba(0,240,255,0.35)]"
      />
    </div>
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
    <section className="hero-space fade-in-up relative isolate flex flex-col items-center gap-10 overflow-hidden px-6 py-16 sm:flex-row sm:justify-between sm:px-12 sm:py-20 md:px-10 lg:px-12">
      <HeroNebula />
      <HeroStarfield />
      <HeroPlanet
        className="left-[6%] top-[8%] hidden sm:block"
        size={150}
        colors={["#f6e2b3", "#c9973f", "#7a5a22"]}
        ring
      />
      <HeroPlanet
        className="bottom-[10%] right-[22%] hidden md:block"
        size={70}
        colors={["#bfe3f0", "#5b8fa8", "#2c4a58"]}
      />
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
