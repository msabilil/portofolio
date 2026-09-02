import { useTranslations } from "next-intl";
import { SocialLinks } from "./SocialLinks";
import { SectionHeading } from "./SectionHeading";
import { Doodle } from "./Doodle";

export function Contact({ number }: { number: string }) {
  const t = useTranslations("contact");

  return (
    <section className="relative">
      <Doodle className="pointer-events-none absolute -right-4 top-0 hidden h-28 w-28 sm:block" />
      <SectionHeading number={number} title={t("title")} />
      <p className="mb-6 max-w-prose" style={{ color: "var(--color-text-muted)" }}>{t("intro")}</p>
      <SocialLinks />
    </section>
  );
}
