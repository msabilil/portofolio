import { useLocale, useTranslations } from "next-intl";
import { projects } from "@/content/projects";
import { ProjectCard } from "@/components/ProjectCard";
import { Contact } from "@/components/layout/Contact";
import { SectionHeading } from "@/components/layout/SectionHeading";

export default function ProjectsPage() {
  const locale = useLocale() as "en" | "id";
  const t = useTranslations("projects");

  return (
    <div className="flex flex-col gap-24 py-12 md:py-16">
      <section className="fade-in-up">
        <SectionHeading title={t("title")} />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              description={project.description[locale]}
              viewLabel={t("viewLink")}
            />
          ))}
        </div>
      </section>

      <Contact />
    </div>
  );
}
