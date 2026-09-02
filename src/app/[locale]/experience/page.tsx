import { useLocale, useTranslations } from "next-intl";
import { experience } from "@/content/experience";
import { ExperienceItem } from "@/components/ExperienceItem";
import { Contact } from "@/components/layout/Contact";
import { SectionHeading } from "@/components/layout/SectionHeading";

export default function ExperiencePage() {
  const locale = useLocale() as "en" | "id";
  const t = useTranslations("experience");

  return (
    <div className="flex flex-col gap-24 py-12 md:py-16">
      <section className="fade-in-up">
        <SectionHeading title={t("title")} />
        <div>
          {experience.map((entry) => (
            <ExperienceItem
              key={entry.id}
              experience={entry}
              role={entry.role[locale]}
              description={entry.description[locale]}
            />
          ))}
        </div>
      </section>

      <Contact />
    </div>
  );
}
