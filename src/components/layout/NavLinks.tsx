"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

const ROUTES = ["/", "/about", "/skills", "/projects", "/contact"] as const;
type Route = (typeof ROUTES)[number];
const LABEL_KEYS: Record<Route, string> = {
  "/": "home",
  "/about": "about",
  "/skills": "skills",
  "/projects": "projects",
  "/contact": "contact",
};

export function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const t = useTranslations("nav");

  return (
    <nav aria-label={t("mainLabel")}>
      <ul className="flex flex-col gap-3">
        {ROUTES.map((route) => {
          const isActive = pathname === route;
          return (
            <li key={route}>
              <Link
                href={route}
                onClick={onNavigate}
                aria-current={isActive ? "page" : undefined}
                style={{ color: isActive ? "var(--color-text)" : "var(--color-text-muted)" }}
                className={isActive ? "font-semibold" : undefined}
              >
                {t(LABEL_KEYS[route])}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
