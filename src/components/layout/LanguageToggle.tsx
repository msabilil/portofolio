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
    <div role="group" aria-label={t("languageLabel")} className="flex gap-2">
      {routing.locales.map((code) => (
        <button
          key={code}
          type="button"
          aria-current={code === locale ? "true" : undefined}
          onClick={() => router.replace(pathname, { locale: code })}
          style={{ color: code === locale ? "var(--color-text)" : "var(--color-text-muted)" }}
          className={code === locale ? "font-semibold underline" : undefined}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
