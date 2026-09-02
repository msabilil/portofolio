import { useTranslations } from "next-intl";
import { SocialLinks } from "./SocialLinks";

export function Contact() {
  const t = useTranslations("contact");

  return (
    <section>
      <h2 className="mb-4 text-[32px] font-semibold tracking-[-0.01em]">{t("title")}</h2>
      <p className="mb-6 max-w-prose" style={{ color: "var(--color-text-muted)" }}>{t("intro")}</p>
      <SocialLinks />
    </section>
  );
}
