import type { ReactNode } from "react";
import styles from "./NeptuneSurface.module.css";

// Extend the existing lunar illustration: one continuous planet carries 03–04.
// The shared surface keeps its cloud bands aligned when toolkit filters change.
export function NeptuneSurface({ children }: { children: ReactNode }) {
  return (
    <div className={styles.world}>
      <div className={styles.surface} aria-hidden="true">
        <div className={styles.clouds} />
      </div>
      {children}
    </div>
  );
}
