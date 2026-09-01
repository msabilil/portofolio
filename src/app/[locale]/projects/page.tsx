import { useLocale, useTranslations } from "next-intl";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/content/projects";

export default function ProjectsPage() {
  const locale = useLocale() as "en" | "id";
  const t = useTranslations("projects");

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">{t("title")}</h1>
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
    </div>
  );
}
