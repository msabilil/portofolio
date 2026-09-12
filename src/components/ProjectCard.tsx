import type { Project } from "@/content/projects";
import { ProjectPreview } from "@/components/space/ProjectPreview";
import { Icon } from "@/components/space/Icon";
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
  const known = [
    "recyclean",
    "arutalalab",
    "penjadwalan-produksi",
    "mental-health-app",
  ].includes(project.slug);
  return (
    <article className="gallery-card panel">
      {known || project.cover ? (
        <ProjectPreview project={project} locale={locale} />
      ) : (
        <div className="project-preview preview-arutala" aria-hidden="true">
          <span className="mood-art text-5xl">{project.title.charAt(0)}</span>
        </div>
      )}
      <div className="gallery-card-body">
        <h3>{project.title}</h3>
        {project.period && <p className="eyebrow">{project.period}</p>}
        <p>{description}</p>
        <ul className="tag-list">
          {project.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
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
