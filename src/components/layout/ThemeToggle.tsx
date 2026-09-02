"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

type Theme = "light" | "dark";
const THEMES: Theme[] = ["light", "dark"];

export function ThemeToggle() {
  const t = useTranslations("sidebar");
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    setTheme((document.documentElement.dataset.theme as Theme) ?? "light");
  }, []);

  function applyTheme(next: Theme) {
    setTheme(next);
    document.documentElement.dataset.theme = next;
    localStorage.setItem("theme", next);
  }

  return (
    <div
      role="group"
      aria-label={t("themeLabel")}
      className="flex items-center gap-1 rounded-full border border-[var(--color-border)] p-1"
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
