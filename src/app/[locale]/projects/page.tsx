import { useLocale, useTranslations } from "next-intl";
import { projects } from "@/content/projects";
import { ProjectCard } from "@/components/ProjectCard";
import { Contact } from "@/components/layout/Contact";

export default function ProjectsPage() {
  const locale = useLocale() as "en" | "id";
  const t = useTranslations("projects");

  return (
    <div className="flex flex-col gap-24 py-12 md:py-16">
      <section className="fade-in-up">
        <h1 className="mb-8 text-[32px] font-semibold tracking-[-0.01em]">{t("title")}</h1>
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
