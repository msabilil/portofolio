"use client";

import { useState } from "react";
import Image from "next/image";
import { useLocale } from "next-intl";
import styles from "./HeroActors.module.css";

type ActorProps = { reduced: boolean; active: boolean };

function Planet({ variant, reduced, active }: ActorProps & { variant: "jupiter" | "blue" }) {
  const id = useLocale() === "id";
  const [held, setHeld] = useState(false);
  const name = variant === "jupiter" ? "Jupiter" : id ? "planet biru" : "blue planet";
  return (
    <div className={`${styles.orbit} ${variant === "blue" ? styles.blue : ""}`} data-running={active && !held}>
      <div className={styles.rotor}>
        <div className={styles.slot}>
          <div className={styles.counter}>
            <div className={styles.upright}>
              <button
                type="button"
                className={`${styles.actor} ${styles.planet}`}
                aria-label={`${id ? "Jeda orbit" : "Pause orbit of"} ${name}`}
                aria-pressed={held}
                disabled={reduced}
                onClick={() => setHeld(value => !value)}
              >
                <span className={styles.planetHalo} aria-hidden="true" />
                <Image
                  src={`/assets/hero/planet-${variant === "jupiter" ? "1" : "3"}.png`}
                  alt=""
                  width={180}
                  height={180}
                  sizes="(max-width: 800px) 64px, 135px"
                  draggable={false}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function HeroPlanets(props: ActorProps) {
  return <><Planet variant="jupiter" {...props} /><Planet variant="blue" {...props} /></>;
}

export function LunarAstronaut({ reduced, active }: ActorProps) {
  const id = useLocale() === "id";
  const [held, setHeld] = useState(false);
  return (
    <div className={styles.moonRoute} data-running={active && !held}>
      <div className={styles.traveler}>
        <span className={styles.shadow} aria-hidden="true" />
        <div className={styles.hop}>
          <button
            type="button"
            className={`${styles.actor} ${styles.astronaut}`}
            aria-label={id ? "Jeda perjalanan astronaut" : "Pause astronaut exploration"}
            aria-pressed={held}
            disabled={reduced}
            onClick={() => setHeld(value => !value)}
          >
            <span className={styles.heading} aria-hidden="true">
              <Image src="/assets/hero/astronaut.png" alt="" width={380} height={380} loading="eager" sizes="(max-width: 800px) 150px, 230px" draggable={false} />
            </span>
            <span className={styles.greeting} aria-hidden="true">{id ? "HALO, WARGA BUMI!" : "HELLO, EARTHLING!"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
