"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useLocale } from "next-intl";
import { Icon } from "@/components/space/Icon";
import { useSceneActivity } from "@/components/space/useSceneActivity";
import { HeroPlanets, LunarAstronaut } from "@/components/space/HeroActors";
const RocketLaunch = dynamic(
  () => import("./RocketLaunch").then((m) => m.RocketLaunch),
  { ssr: false },
);
type HeroSpaceProps = {
  title: string;
  description: string;
  ctaLabel: string;
  connectLabel: string;
};
export function HeroSpace({
  title,
  description,
  ctaLabel,
  connectLabel,
}: HeroSpaceProps) {
  const id = useLocale() === "id";
  const { ref, active, reduced } = useSceneActivity<HTMLElement>();
  const [playing, setPlaying] = useState(true);
  const [paused, setPaused] = useState(false);
  return (
    <section
      id="home"
      ref={ref}
      className="hero-space"
      data-active={active && !paused}
    >
      <div className="hero-nebula" aria-hidden="true" />
      <div className="star-map" aria-hidden="true" />
      <HeroPlanets reduced={reduced} active={active && !paused} />
      <div className="hero-copy container">
        <h1 aria-label={title}>
          <span>PORTFOLIO</span>{" "}
          <span className="hero-title-accent">
            SPACE
            <span className="title-spark" aria-hidden="true">
              ✦
            </span>
          </span>
        </h1>
        <p className="hero-description">{description}</p>
        <div className="hero-actions">
          <a className="button button-cyan" href="#projects">
            {ctaLabel}
            <Icon name="arrow" />
          </a>
          <a className="button button-light" href="#contact">
            {connectLabel}
            <Icon name="mail" />
          </a>
          <a
            className="hero-cv"
            href="/assets/cv/muhammad-sabilil-fajri-cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            {id ? "Lihat CV" : "View CV"} <Icon name="arrow" width="16" />
          </a>
        </div>
      </div>
      <div className="hero-bottom container">
        <p className="hero-coordinate eyebrow">
          BDG, INDONESIA
          <br />
          <span>06°55′ S / 107°36′ E</span>
        </p>
        <a className="scroll-cue" href="#about">
          <Icon name="down" />
          <span>{id ? "MULAI EKSPLORASI" : "SCROLL TO EXPLORE"}</span>
        </a>
        <div className="motion-controls">
          {!reduced && (
            <button
              className="tiny-control"
              type="button"
              aria-pressed={paused}
              onClick={() => setPaused(!paused)}
            >
              {paused
                ? id
                  ? "Lanjutkan gerakan"
                  : "Resume motion"
                : id
                  ? "Jeda gerakan"
                  : "Pause motion"}
            </button>
          )}
          {!reduced && (
            <button
              className="tiny-control"
              type="button"
              aria-pressed={playing}
              onClick={() => setPlaying(!playing)}
            >
              {playing
                ? id
                  ? "Parkir roket"
                  : "Park rocket"
                : id
                  ? "Mainkan roket ↗"
                  : "Play with rocket ↗"}
            </button>
          )}
        </div>
      </div>
      <div className="lunar-horizon" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </div>
      <LunarAstronaut reduced={reduced} active={active && !paused} />
      <div className="lunar-flag" aria-hidden="true">
        <span className="flag-logo">
          <Image src="/assets/logos/logo-msf.png" alt="" fill sizes="58px" />
        </span>
      </div>
      {playing && !reduced && <RocketLaunch active={active && !paused} eventSource={ref} />}
    </section>
  );
}
