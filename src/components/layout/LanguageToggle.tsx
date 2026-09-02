"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export function LanguageToggle() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("sidebar");

  return (
    <div
      role="group"
      aria-label={t("languageLabel")}
      className="flex items-center gap-1 rounded-full border border-[var(--color-border)] p-1"
    >
      {routing.locales.map((code) => (
        <button
          key={code}
          type="button"
          aria-current={code === locale ? "true" : undefined}
          onClick={() => router.replace(pathname, { locale: code })}
          className={
            code === locale
              ? "rounded-full bg-[var(--color-accent)] px-3 py-1 text-xs font-semibold text-white"
              : "rounded-full px-3 py-1 text-xs text-[var(--color-text-muted)] transition-colors duration-[var(--dur-fast)] hover:text-[var(--color-text)]"
          }
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
