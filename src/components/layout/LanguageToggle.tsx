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
      className="language-toggle"
      role="group"
      aria-label={t("languageLabel")}
    >
      {routing.locales.map((code) => (
        <button
          key={code}
          type="button"
          aria-pressed={code === locale}
          onClick={() =>
            router.replace(pathname + window.location.hash, { locale: code })
          }
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
