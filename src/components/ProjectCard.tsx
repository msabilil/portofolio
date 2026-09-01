import Image from "next/image";
import type { Project } from "@/content/projects";

type ProjectCardProps = {
  project: Project;
  description: string;
  viewLabel: string;
};

function CoverPlaceholder({ title }: { title: string }) {
  return (
    <div
      aria-hidden="true"
      className="flex h-full w-full items-center justify-center rounded-[var(--radius-sm)] border"
      style={{
        borderColor: "var(--color-border)",
        background:
          "repeating-linear-gradient(135deg, var(--color-bg-subtle) 0 2px, transparent 2px 14px)",
      }}
    >
      <span className="text-4xl font-semibold" style={{ color: "var(--color-border)" }}>
        {title.charAt(0)}
      </span>
    </div>
  );
}

export function ProjectCard({ project, description, viewLabel }: ProjectCardProps) {
  return (
    <article
      className="group rounded-[var(--radius-md)] border p-4 transition-colors duration-[var(--dur-base)]"
      style={{ borderColor: "var(--color-border)" }}
    >
      <div className="relative mb-3 aspect-[4/3] overflow-hidden rounded-[var(--radius-sm)]">
        {project.cover ? (
          <Image
            src={project.cover}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-[var(--dur-base)] group-hover:scale-105"
          />
        ) : (
          <CoverPlaceholder title={project.title} />
        )}
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
