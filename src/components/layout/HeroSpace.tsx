"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";

type HeroSpaceProps = {
  name: string;
  greeting: string;
  tagline: string;
  ctaLabel: string;
  connectLabel: string;
};

// Full-bleed AI-generated background (nebula, planets, astronaut, and
// rocket all baked into one image) — replaces the earlier hand-built
// canvas nebula, CSS planets, tsparticles starfield, SVG rocket, and
// separately-animated astronaut PNG.
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

export function HeroSpace({ name, greeting, tagline, ctaLabel, connectLabel }: HeroSpaceProps) {
  return (
    <section className="hero-space fade-in-up relative isolate flex min-h-[560px] flex-col items-center justify-center overflow-hidden px-6 py-16 sm:items-start sm:justify-center sm:px-12 sm:py-20 md:px-10 lg:px-12">
      <HeroBackground />
      <div className="relative z-10 max-w-xl text-center sm:text-left">
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
    </section>
  );
}
