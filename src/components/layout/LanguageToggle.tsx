"use client";
import { useTranslations } from "next-intl";
import { locales, useAppLocale } from "@/i18n/LocaleProvider";
export function LanguageToggle() {
  const { locale, setLocale } = useAppLocale();
  const t = useTranslations("sidebar");
  return (
    <div
      className="language-toggle"
      role="group"
      aria-label={t("languageLabel")}
    >
      {locales.map((code) => (
        <button
          key={code}
          type="button"
          aria-pressed={code === locale}
          onClick={() => setLocale(code)}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
