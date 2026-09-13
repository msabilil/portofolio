"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type RefObject,
  type SyntheticEvent,
} from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import styles from "./SpaceIntro.module.css";

type Phase = "sweep" | "loading" | "departing" | "done";

// Keep the opening to one visit per document, including locale/route changes.
let hasEntered = false;

export function SpaceIntro() {
  const pathname = usePathname();
  return pathname === "/" ? <Opening /> : null;
}

function Opening() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [phase, setPhase] = useState<Phase>("sweep");
  const [progress, setProgress] = useState(0);
  const finished = phase === "done";

  const finish = useCallback(() => {
    hasEntered = true;
    dialog.current?.close();
    setPhase("done");
    document.getElementById("main-content")?.focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    const modal = dialog.current;
    if (!modal) return;
    // Cover the server-rendered page before hydration, then use the modal layer.
    modal.close();
    if (finished || hasEntered || window.location.hash || window.scrollY > 0) return;

    modal.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    let cancelled = false;
    let assetsSettled = false;
    const background = new window.Image();
    background.src = "/assets/hero/space-background.jpg";
    const images = Array.from(
      document.querySelectorAll<HTMLImageElement>("#home img, [data-space-intro] img"),
    );

    void Promise.allSettled([
      document.fonts.ready,
      background.decode(),
      ...images.map((image) => image.decode()),
    ]).then(() => {
      if (!cancelled) assetsSettled = true;
    });

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const loadingDuration = reduced ? 180 : 1500;
    const departureDuration = reduced ? 0 : 750;
    const started = performance.now();
    let loadingStarted: number | undefined = reduced ? started : undefined;
    let departureStarted: number | undefined;

    // The final image reveal owns the handoff. A separate wall-clock timer
    // can cut off CSS motion when rendering is delayed or the tab is busy.
    const reveal = modal.querySelector<HTMLElement>("[data-space-reveal]");
    const beginLoading = () => {
      loadingStarted ??= performance.now();
    };
    reveal?.addEventListener("animationend", beginLoading);
    modal.dataset.running = "true";

    const timer = window.setInterval(() => {
      const elapsed = performance.now() - started;
      if (departureStarted !== undefined) {
        if (elapsed - departureStarted >= departureDuration) {
          window.clearInterval(timer);
          finish();
        }
        return;
      }
      if (loadingStarted === undefined) {
        // Still allow entry if browser animation events are unavailable.
        if (elapsed < 6000) return;
        beginLoading();
      }

      const loadingElapsed = performance.now() - loadingStarted!;
      if ((assetsSettled && loadingElapsed >= loadingDuration) || loadingElapsed >= 6000) {
        setProgress(100);
        setPhase("departing");
        departureStarted = elapsed;
      } else {
        setPhase("loading");
        setProgress(Math.min(94, Math.round((loadingElapsed / loadingDuration) * 94)));
      }
    }, 40);

    return () => {
      cancelled = true;
      window.clearInterval(timer);
      reveal?.removeEventListener("animationend", beginLoading);
      delete modal.dataset.running;
      modal.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [finished, finish]);

  if (finished) return null;

  return (
    <IntroDialog
      dialog={dialog}
      phase={phase}
      progress={progress}
      onCancel={(event) => {
        event.preventDefault();
        finish();
      }}
    />
  );
}

type IntroDialogProps = {
  dialog?: RefObject<HTMLDialogElement | null>;
  phase: Phase;
  progress: number;
  running?: boolean;
  onCancel?: (event: SyntheticEvent<HTMLDialogElement>) => void;
};

function IntroDialog({
  dialog,
  phase,
  progress,
  running = false,
  onCancel,
}: IntroDialogProps) {
  const t = useTranslations("opening");

  return (
    <>
      <noscript>
        <style>{"dialog[data-space-intro] { display: none !important; }"}</style>
      </noscript>
      <dialog
        ref={dialog}
        open
        data-space-intro
        data-running={running ? "true" : undefined}
        data-phase={phase}
        className={styles.screen}
        aria-label={t("progressLabel")}
        onCancel={onCancel}
      >
        <div className={styles.atmosphere} aria-hidden="true">
          <div className={styles.outerLayer} />
          <div className={styles.middleLayer} />
        </div>

        <div className={styles.spaceBackground} data-space-reveal aria-hidden="true" />

        <div className={styles.stars} aria-hidden="true">
          {Array.from({ length: 48 }, (_, index) => (
            <i
              key={index}
              style={
                {
                  "--x": `${(index * 37 + 11) % 100}%`,
                  "--y": `${(index * 61 + 7) % 100}%`,
                  "--size": `${index % 5 === 0 ? 3 : 1.5}px`,
                  "--angle": `${index * 7.5}deg`,
                  "--delay": `${(index % 6) * 0.035}s`,
                } as CSSProperties
              }
            />
          ))}
        </div>

        <div className={styles.content} aria-hidden={phase === "sweep"}>
          <div className={styles.emblem} aria-hidden="true">
            <span className={styles.logo}>
              <Image
                src="/assets/logos/logo-msf.png"
                alt=""
                width={300}
                height={300}
                sizes="300px"
                loading="eager"
              />
            </span>
          </div>
          <h2 className={styles.title}>Muhammad Sabilil Fajri</h2>
          <p className={styles.description} role="status">
            {phase === "departing" ? t("launching") : t("description")}
          </p>
          <div className={styles.loading}>
            <div
              className={styles.track}
              role="progressbar"
              aria-label={t("progressLabel")}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progress}
            >
              <span style={{ transform: `scaleX(${progress / 100})` }} />
            </div>
            <span className={styles.percentage} aria-hidden="true">
              {String(progress).padStart(2, "0")}%
            </span>
          </div>
        </div>
      </dialog>
    </>
  );
}
