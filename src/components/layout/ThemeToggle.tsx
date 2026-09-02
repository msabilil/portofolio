"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

type Theme = "light" | "dark";
const THEMES: Theme[] = ["light", "dark"];

const ICONS: Record<Theme, React.ReactNode> = {
  light: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </>
  ),
  dark: <path d="M20.5 14.5a8.5 8.5 0 1 1-11-11 7 7 0 0 0 11 11Z" />,
};

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
          aria-label={t(value === "light" ? "lightLabel" : "darkLabel")}
          aria-current={value === theme ? "true" : undefined}
          onClick={() => applyTheme(value)}
          className={
            "flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-[var(--dur-fast)] " +
            (value === theme
              ? "bg-[var(--color-accent)] text-white"
              : "text-[var(--color-text)] hover:bg-[var(--color-bg-subtle)]")
          }
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            {ICONS[value]}
          </svg>
        </button>
      ))}
    </div>
  );
}
