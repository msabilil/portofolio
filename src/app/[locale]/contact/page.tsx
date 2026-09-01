import { useTranslations } from "next-intl";
import { SocialLinks } from "@/components/layout/SocialLinks";

export default function ContactPage() {
  const t = useTranslations("contact");

  return (
    <div>
      <h1 className="mb-4 text-2xl font-semibold">{t("title")}</h1>
      <p className="mb-6" style={{ color: "var(--color-text-muted)" }}>{t("intro")}</p>
      <SocialLinks />
    </div>
  );
}
