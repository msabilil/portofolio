"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

const ICONS = {
  home: (
    <path d="M3 10.5 12 3l9 7.5M5 9.5V21h14V9.5" />
  ),
  experience: (
    <path d="M3 8h18v11H3zM8 8V5h8v3M3 13h18" />
  ),
  projects: (
    <path d="M3 7h6l2 2h10v10H3z" />
  ),
  tools: (
    <path d="M14.5 6.5 17 4a3 3 0 0 1 3 3l-2.5 2.5m-3-3-9 9v3h3l9-9m-3-3 3 3" />
  ),
} as const;

const NAV_ITEMS = [
  { key: "home", href: "/" },
  { key: "experience", href: "/experience" },
  { key: "projects", href: "/projects" },
  { key: "tools", href: "/tools" },
] as const;

export function TopNav() {
  const t = useTranslations("nav");
  const pathname = usePathname();

  return (
    <div className="pointer-events-none fixed inset-x-0 top-6 z-50 flex justify-center">
      <nav
        className="pointer-events-auto -ml-14 flex items-center gap-1 rounded-full border border-[var(--color-border)] bg-[var(--color-bg)]/90 p-1.5 shadow-[var(--shadow-md)] backdrop-blur"
        aria-label="Section navigation"
      >
        {NAV_ITEMS.map(({ key, href }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={key}
              href={href}
              aria-current={isActive ? "page" : undefined}
              className={
                "group relative flex h-12 w-12 items-center justify-center rounded-full transition-colors duration-[var(--dur-fast)] " +
                (isActive
                  ? "bg-[var(--color-accent)] text-white"
                  : "text-[var(--color-text)] hover:bg-[var(--color-bg-subtle)]")
              }
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                {ICONS[key]}
              </svg>
              <span
                className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 -translate-y-1 whitespace-nowrap rounded-[var(--radius-sm)] bg-[var(--color-text)] px-2.5 py-1 text-xs text-[var(--color-bg)] opacity-0 shadow-[var(--shadow-sm)] transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100"
              >
                {t(key)}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
