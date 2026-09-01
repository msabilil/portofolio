import { useTranslations } from "next-intl";

export default function AboutPage() {
  const t = useTranslations("about");

  return (
    <div className="max-w-prose">
      <h1 className="mb-4 text-2xl font-semibold">{t("title")}</h1>
      <p style={{ color: "var(--color-text-muted)" }}>{t("bio")}</p>
    </div>
  );
}
