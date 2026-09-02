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
    <div role="group" aria-label={t("themeLabel")} className="flex gap-2">
      {THEMES.map((value) => (
        <button
          key={value}
          type="button"
          aria-current={value === theme ? "true" : undefined}
          onClick={() => applyTheme(value)}
          className={
            value === theme
              ? "font-semibold text-[var(--color-text)] underline underline-offset-4"
              : "text-[var(--color-text-muted)] transition-colors duration-[var(--dur-fast)] hover:text-[var(--color-hover)]"
          }
        >
          {t(value === "light" ? "lightLabel" : "darkLabel")}
        </button>
      ))}
    </div>
  );
}
