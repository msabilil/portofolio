"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { profile } from "@/content/profile";
import { LanguageToggle } from "./LanguageToggle";
import { ThemeToggle } from "./ThemeToggle";

const NAV_ITEMS = [
  { key: "home", href: "/" },
  { key: "about", href: "/#about" },
  { key: "skills", href: "/#skills" },
  { key: "projects", href: "/#projects" },
  { key: "contact", href: "/#contact" },
] as const;

export function TopNav({ theme }: { theme: "light" | "dark" }) {
  const t = useTranslations("nav");
  const pathname = usePathname();

  return (
    <header className="sticky top-4 z-50 flex justify-center px-4">
      <div className="glass-nav flex w-full max-w-[var(--container-max)] flex-wrap items-center justify-between gap-x-6 gap-y-2 rounded-full px-6 py-2.5">
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <Image
            src="/assets/photos/itsme.jpg"
            alt=""
            width={32}
            height={32}
            className="rounded-full border border-[var(--border-glow)] object-cover object-[center_20%]"
          />
          <span className="font-heading text-sm font-semibold uppercase tracking-[0.04em] text-white">
            {profile.name}
          </span>
        </Link>

        <nav aria-label="Section navigation" className="flex items-center gap-1">
          {NAV_ITEMS.map(({ key, href }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={key}
                href={href}
                aria-current={isActive ? "page" : undefined}
                className={
                  "rounded-full px-3.5 py-1.5 text-sm font-medium transition-[background-color,color,box-shadow] duration-[var(--dur-fast)] sm:px-4 " +
                  (isActive
                    ? "bg-gradient-to-r from-[#00f0ff] to-[#00a3ff] text-[#05060f] shadow-[0_0_15px_rgba(0,240,255,0.6)]"
                    : "text-[var(--color-text-muted)] hover:bg-white/5 hover:text-white")
                }
              >
                {t(key)}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <LanguageToggle />
          <ThemeToggle initialTheme={theme} />
        </div>
      </div>
    </header>
  );
}
