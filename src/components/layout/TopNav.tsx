"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { profile } from "@/content/profile";
import { LanguageToggle } from "./LanguageToggle";
import { ThemeToggle } from "./ThemeToggle";

const NAV_ITEMS = [
  { key: "home", href: "/" },
  { key: "experience", href: "/experience" },
  { key: "projects", href: "/projects" },
  { key: "tools", href: "/tools" },
] as const;

export function TopNav({ theme }: { theme: "light" | "dark" }) {
  const t = useTranslations("nav");
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg)]/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-[var(--container-max)] flex-wrap items-center justify-between gap-x-6 gap-y-2 px-6 py-3 md:px-10 lg:px-12">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <Image
            src="/assets/photos/itsme.jpg"
            alt=""
            width={36}
            height={36}
            className="rounded-full border border-[var(--color-border)] object-cover object-[center_20%]"
          />
          <span className="font-semibold tracking-[-0.01em]">{profile.name}</span>
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
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors duration-[var(--dur-fast)] " +
                  (isActive
                    ? "bg-[var(--color-accent)] text-white"
                    : "text-[var(--color-text)] hover:bg-[var(--color-bg-subtle)]")
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
