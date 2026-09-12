"use client";
import { useEffect, useRef, useState } from "react";

// One observer per animated scene; no scroll listeners or React updates per frame.
export function useSceneActivity<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [active, setActive] = useState(false);
  const [reduced, setReduced] = useState(true);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const sync = () => {
      setReduced(media.matches);
      setActive(visible && !document.hidden && !media.matches);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    if (ref.current) observer.observe(ref.current);
    media.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    sync();
    return () => {
      observer.disconnect();
      media.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);
  return { ref, active, reduced };
}
