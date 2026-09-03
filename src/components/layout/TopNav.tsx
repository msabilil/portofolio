"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { profile } from "@/content/profile";
import { LanguageToggle } from "./LanguageToggle";
import { ThemeToggle } from "./ThemeToggle";

const NAV_ICONS = {
  home: <path d="M3 10.5 12 3l9 7.5M5 9.5V21h14V9.5" />,
  about: (
    <>
      <circle cx="12" cy="8" r="3.2" />
      <path d="M5 20c1.4-3.6 4.2-5.5 7-5.5s5.6 1.9 7 5.5" />
    </>
  ),
  skills: <path d="M12 3.5 14.4 9l6 .8-4.3 4.1 1 6-5.1-2.9-5.1 2.9 1-6-4.3-4.1 6-.8Z" />,
  projects: <path d="M3 7h6l2 2h10v10H3z" />,
  contact: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </>
  ),
} as const;

const NAV_ITEMS = [
  { key: "home", href: "/" },
  { key: "about", href: "/#about" },
  { key: "skills", href: "/#skills" },
  { key: "projects", href: "/#projects" },
  { key: "contact", href: "/#contact" },
] as const;

function NavIcon({ variant }: { variant: keyof typeof NAV_ICONS }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {NAV_ICONS[variant]}
    </svg>
  );
}

export function TopNav({ theme }: { theme: "light" | "dark" }) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-5 z-50 flex flex-col items-center px-4">
      <div className="glass-nav flex w-auto max-w-[94vw] items-center gap-3 rounded-full px-4 py-2 sm:max-w-[70vw] sm:gap-6 sm:px-6 sm:py-2.5">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Image
            src="/assets/photos/itsme.jpg"
            alt=""
            width={28}
            height={28}
            className="rounded-full border border-[var(--border-glow)] object-cover object-[center_20%]"
          />
          <span className="font-heading hidden text-sm font-semibold uppercase tracking-[0.04em] text-white sm:inline">
            {profile.name}
          </span>
        </Link>

        <nav aria-label="Section navigation" className="hidden items-center gap-1 sm:flex">
          {NAV_ITEMS.map(({ key, href }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={key}
                href={href}
                aria-current={isActive ? "page" : undefined}
                className={
                  "flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium transition-[background-color,color,box-shadow] duration-[var(--dur-fast)] " +
                  (isActive
                    ? "bg-gradient-to-r from-[#00f0ff] to-[#00a3ff] text-[#05060f] shadow-[0_0_15px_rgba(0,240,255,0.6)]"
                    : "text-[var(--color-text-muted)] hover:bg-white/5 hover:text-white")
                }
              >
                <NavIcon variant={key} />
                {t(key)}
              </Link>
            );
          })}
        </nav>

        <div className="hidden shrink-0 items-center gap-2 sm:flex">
          <LanguageToggle />
          <ThemeToggle initialTheme={theme} />
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white sm:hidden"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            {open ? <path d="M6 6 18 18M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <div className="glass-nav mt-2 flex w-[94vw] flex-col gap-1 rounded-2xl p-3 sm:hidden">
          {NAV_ITEMS.map(({ key, href }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={key}
                href={href}
                onClick={() => setOpen(false)}
                aria-current={isActive ? "page" : undefined}
                className={
                  "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium " +
                  (isActive
                    ? "bg-gradient-to-r from-[#00f0ff] to-[#00a3ff] text-[#05060f] shadow-[0_0_15px_rgba(0,240,255,0.6)]"
                    : "text-[var(--color-text-muted)] hover:bg-white/5 hover:text-white")
                }
              >
                <NavIcon variant={key} />
                {t(key)}
              </Link>
            );
          })}
          <div className="mt-1 flex items-center gap-2 border-t border-white/10 px-4 pt-3">
            <LanguageToggle />
            <ThemeToggle initialTheme={theme} />
          </div>
        </div>
      )}
    </header>
  );
}
