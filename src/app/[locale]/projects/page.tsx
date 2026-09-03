import { useLocale, useTranslations } from "next-intl";
import { projects } from "@/content/projects";
import { ProjectsFilterGrid } from "@/components/ProjectsFilterGrid";
import { Contact } from "@/components/layout/Contact";
import { SectionHeading } from "@/components/layout/SectionHeading";

export default function ProjectsPage() {
  const locale = useLocale() as "en" | "id";
  const t = useTranslations("projects");

  return (
    <div className="flex flex-col gap-24 py-12 md:py-16">
      <section className="fade-in-up">
        <SectionHeading title={t("title")} />
        <ProjectsFilterGrid
          projects={projects}
          locale={locale}
          viewLabel={t("viewLink")}
          emptyLabel={t("empty")}
          filterLabels={{
            all: t("filter.all"),
            "ui-ux": t("filter.uiux"),
            frontend: t("filter.frontend"),
            backend: t("filter.backend"),
            qa: t("filter.qa"),
          }}
        />
      </section>

      <Contact />
    </div>
  );
}
