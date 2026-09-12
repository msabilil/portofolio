"use client";
import { useState } from "react";
import { ProjectCard } from "@/components/ProjectCard";
import type { Project, ProjectCategory } from "@/content/projects";
type FilterValue = ProjectCategory | "all";
type Props = {
  projects: Project[];
  locale: "en" | "id";
  viewLabel: string;
  filterLabels: Record<FilterValue, string>;
  emptyLabel: string;
};
const FILTERS: FilterValue[] = ["all", "ui-ux", "frontend", "backend", "qa"];
export function ProjectsFilterGrid({
  projects,
  locale,
  viewLabel,
  filterLabels,
  emptyLabel,
}: Props) {
  const [active, setActive] = useState<FilterValue>("all");
  const filtered =
    active === "all"
      ? projects
      : projects.filter((p) => p.categories.includes(active));
  return (
    <>
      <div
        className="filter-row"
        role="group"
        aria-label={locale === "id" ? "Filter proyek" : "Filter projects"}
      >
        {FILTERS.map((filter) => (
          <button
            key={filter}
            aria-pressed={active === filter}
            onClick={() => setActive(filter)}
          >
            {filterLabels[filter]}
          </button>
        ))}
      </div>
      <div aria-live="polite">
        {filtered.length ? (
          <div className="gallery-grid">
            {filtered.map((project) => (
              <ProjectCard
                key={project.slug}
                project={project}
                description={project.description[locale]}
                viewLabel={viewLabel}
                locale={locale}
              />
            ))}
          </div>
        ) : (
          <p className="empty-state">{emptyLabel}</p>
        )}
      </div>
    </>
  );
}
