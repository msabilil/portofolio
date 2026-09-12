"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { LanguageToggle } from "./LanguageToggle";
import { Icon } from "@/components/space/Icon";
const NAV_ITEMS = [
  { key: "home", href: "/" },
  { key: "about", href: "/#about" },
  { key: "projects", href: "/#projects" },
  { key: "skills", href: "/#skills" },
  { key: "contact", href: "/#contact" },
] as const;
export function TopNav() {
  const t = useTranslations("nav");
  const id = useLocale() === "id";
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [section, setSection] = useState("home");
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) setSection(entry.target.id);
      },
      { rootMargin: "-20% 0px -55% 0px" },
    );
    NAV_ITEMS.forEach((item) => {
      const el = document.getElementById(item.key);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [pathname]);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);
  const active =
    pathname === "/"
      ? section
      : pathname.slice(1) === "tools"
        ? "skills"
        : pathname.slice(1);
  return (
    <header className="site-header">
      <div className="nav-shell">
        <Link
          href="/"
          className="brand"
          aria-label="Portfolio Space — Home"
          onClick={() => setOpen(false)}
        >
          <span className="brand-logo" aria-hidden="true">
            <Image src="/assets/logos/logo-msf.png" alt="" fill sizes="180px" />
          </span>
        </Link>
        <nav
          className="desktop-nav"
          aria-label={id ? "Navigasi utama" : "Main navigation"}
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              aria-current={active === item.key ? "location" : undefined}
              onClick={() => setSection(item.key)}
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>
        <div className="nav-actions">
          <LanguageToggle />
          <button
            ref={trigger}
            className="menu-toggle"
            type="button"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={
              id
                ? open
                  ? "Tutup menu"
                  : "Buka menu"
                : open
                  ? "Close menu"
                  : "Open menu"
            }
            onClick={() => setOpen(!open)}
          >
            <Icon name={open ? "close" : "menu"} />
          </button>
        </div>
      </div>
      {open && (
        <nav
          id="mobile-navigation"
          className="mobile-nav"
          aria-label={id ? "Navigasi seluler" : "Mobile navigation"}
        >
          {NAV_ITEMS.map((item, index) => (
            <Link
              key={item.key}
              href={item.href}
              aria-current={active === item.key ? "location" : undefined}
              onClick={() => {
                setSection(item.key);
                setOpen(false);
              }}
            >
              <span className="eyebrow">0{index + 1}</span>
              {t(item.key)}
              <Icon name="arrow" />
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
