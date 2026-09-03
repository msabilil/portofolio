"use client";

import { useState } from "react";
import { ProjectCard } from "@/components/ProjectCard";
import type { Project, ProjectCategory } from "@/content/projects";

type FilterValue = ProjectCategory | "all";

type ProjectsFilterGridProps = {
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
}: ProjectsFilterGridProps) {
  const [active, setActive] = useState<FilterValue>("all");
  const filtered = active === "all" ? projects : projects.filter((p) => p.categories.includes(active));

  return (
    <>
      <div className="mb-6 flex flex-wrap gap-2">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            type="button"
            aria-pressed={active === filter}
            onClick={() => setActive(filter)}
            className="cursor-pointer rounded-full border px-3 py-1.5 text-sm transition-[background-color,border-color,color,transform] duration-[var(--dur-fast)] ease-[var(--ease-out)] active:scale-[0.97]"
            style={
              active === filter
                ? { background: "var(--color-accent)", borderColor: "var(--color-accent)", color: "#fff" }
                : { borderColor: "var(--color-border)", color: "var(--color-text-muted)" }
            }
          >
            {filterLabels[filter]}
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {filtered.map((project, index) => (
            <div
              key={`${active}-${project.slug}`}
              className="fade-in-up"
              style={{ animationDelay: `${Math.min(index * 50, 200)}ms` }}
            >
              <ProjectCard project={project} description={project.description[locale]} viewLabel={viewLabel} />
            </div>
          ))}
        </div>
      ) : (
        <p key={active} className="fade-in-up" style={{ color: "var(--color-text-muted)" }}>
          {emptyLabel}
        </p>
      )}
    </>
  );
}
