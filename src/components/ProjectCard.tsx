import Image from "next/image";
import type { Project } from "@/content/projects";

type ProjectCardProps = {
  project: Project;
  description: string;
  viewLabel: string;
};

export function ProjectCard({ project, description, viewLabel }: ProjectCardProps) {
  return (
    <article
      className="rounded-[var(--radius-md)] border p-4"
      style={{ borderColor: "var(--color-border)" }}
    >
      <div className="relative mb-3 aspect-[4/3]">
        <Image src={project.cover} alt={project.title} fill className="rounded-[var(--radius-sm)] object-cover" />
      </div>
      <h3 className="font-semibold">{project.title}</h3>
      <p style={{ color: "var(--color-text-muted)" }}>{description}</p>
      <ul className="mt-2 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <li
            key={tag}
            className="rounded-full border px-2 py-1 text-xs"
            style={{ borderColor: "var(--color-border)" }}
          >
            {tag}
          </li>
        ))}
      </ul>
      {project.link && (
        <a href={project.link} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block underline">
          {viewLabel}
        </a>
      )}
    </article>
  );
}
