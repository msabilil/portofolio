import type { Project } from "@/content/projects";
import { getCaseStudy } from "@/content/caseStudies";
import { ProjectPreview } from "@/components/space/ProjectPreview";
import { Icon } from "@/components/space/Icon";
import Link from "next/link";
type ProjectCardProps = {
  project: Project;
  description: string;
  viewLabel: string;
  locale?: "en" | "id";
};
export function ProjectCard({
  project,
  description,
  viewLabel,
  locale = "en",
}: ProjectCardProps) {
  return (
    <article className="gallery-card panel">
      <ProjectPreview project={project} locale={locale} />
      <div className="gallery-card-body">
        <h3>{project.title}</h3>
        {project.period && <p className="eyebrow">{project.period}</p>}
        <p>{description}</p>
        <ul className="tag-list">
          {project.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
        {getCaseStudy(project.slug) && (
          <Link href={`/projects/${project.slug}`} className="button button-ink">
            {locale === "id" ? "Baca case study" : "Read case study"}
            <Icon name="arrow" width="18" />
          </Link>
        )}
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-button"
          >
            {viewLabel}
            <Icon name="arrow" width="18" />
          </a>
        )}
      </div>
    </article>
  );
}
