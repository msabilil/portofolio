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
      className="flex items-center gap-1 rounded-full border border-[var(--color-border)] bg-[var(--color-bg)]/90 p-1 shadow-[var(--shadow-sm)] backdrop-blur"
    >
      {routing.locales.map((code) => (
        <button
          key={code}
          type="button"
          aria-current={code === locale ? "true" : undefined}
          onClick={() => router.replace(pathname, { locale: code })}
          className={
            "flex h-10 w-10 items-center justify-center rounded-full text-xs font-semibold transition-colors duration-[var(--dur-fast)] " +
            (code === locale
              ? "bg-[var(--color-accent)] text-white"
              : "text-[var(--color-text)] hover:bg-[var(--color-bg-subtle)]")
          }
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
