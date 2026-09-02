"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

type Theme = "light" | "dark";
const THEMES: Theme[] = ["light", "dark"];

export function ThemeToggle({ initialTheme }: { initialTheme: Theme }) {
  const t = useTranslations("sidebar");
  const [theme, setTheme] = useState<Theme>(initialTheme);

  function applyTheme(next: Theme) {
    setTheme(next);
    document.documentElement.dataset.theme = next;
    document.cookie = `theme=${next}; path=/; max-age=31536000; samesite=lax`;
  }

  return (
    <div
      role="group"
      aria-label={t("themeLabel")}
      className="flex items-center gap-1 rounded-full border border-[var(--color-border)] bg-[var(--color-bg)]/90 p-1 shadow-[var(--shadow-sm)] backdrop-blur"
    >
      {THEMES.map((value) => (
        <button
          key={value}
          type="button"
          aria-current={value === theme ? "true" : undefined}
          onClick={() => applyTheme(value)}
          className={
            value === theme
              ? "rounded-full bg-[var(--color-accent)] px-3 py-1 text-xs font-semibold text-white"
              : "rounded-full px-3 py-1 text-xs text-[var(--color-text-muted)] transition-colors duration-[var(--dur-fast)] hover:text-[var(--color-text)]"
          }
        >
          {t(value === "light" ? "lightLabel" : "darkLabel")}
        </button>
      ))}
    </div>
  );
}
