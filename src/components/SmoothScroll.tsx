"use client";
import type { ReactNode } from "react";
export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}
// Native scrolling preserves wheel/touch responsiveness and requires no permanent RAF.
export function SmoothScroll({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
