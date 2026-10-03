"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import styles from "./RandomComets.module.css";

type Comet = { id: number; style: CSSProperties };
const random = (min: number, max: number) => min + Math.random() * (max - min);

// Mounted only while its scene is visible and motion is enabled.
export function RandomComets() {
  const layer = useRef<HTMLSpanElement>(null);
  const [comets, setComets] = useState<Comet[]>([]);

  useEffect(() => {
    const timers = new Set<ReturnType<typeof setTimeout>>();
    let nextId = 0;

    function later(callback: () => void, delay: number) {
      const timer = setTimeout(() => {
        timers.delete(timer);
        callback();
      }, delay);
      timers.add(timer);
    }

    function spawn() {
      const bounds = layer.current?.getBoundingClientRect();
      if (bounds?.width && bounds.height) {
        const id = nextId++;
        const direction = Math.random() < 0.3 ? -1 : 1;
        const dx = direction * bounds.width * random(0.35, 0.85);
        const dy = Math.min(bounds.height, window.innerHeight) * random(0.3, 0.9);
        const duration = random(2200, 5800);
        const style = {
          left: `${direction > 0 ? random(0, 55) : random(45, 100)}%`,
          top: `${random(0, 55)}%`,
          "--comet-dx": `${dx}px`,
          "--comet-dy": `${dy}px`,
          "--comet-angle": `${Math.atan2(dy, dx)}rad`,
          "--comet-size": `${random(3, 11)}px`,
          "--comet-tail": `${random(65, 200)}px`,
          "--comet-glow": random(0.45, 0.95),
          "--comet-duration": `${duration}ms`,
        } as CSSProperties;

        setComets((current) => [...current, { id, style }]);
        later(() => {
          setComets((current) => current.filter((comet) => comet.id !== id));
        }, duration);
      }
      // Independent arrivals occasionally overlap, without paired sizes or loops.
      later(spawn, random(1800, 6500));
    }

    later(spawn, random(400, 2200));
    return () => {
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <span ref={layer} className={styles.layer} aria-hidden="true">
      {comets.map((comet) => (
        <span key={comet.id} className={styles.flight} style={comet.style}>
          <i className={styles.comet} />
        </span>
      ))}
    </span>
  );
}
