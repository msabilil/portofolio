"use client";
import { useRef, useState, useEffect, type KeyboardEvent } from "react";
import { useLocale } from "next-intl";
import {
  projects,
  type Project,
  type ProjectCategory,
} from "@/content/projects";
import Link from "next/link";
import { ProjectPreview } from "./ProjectPreview";
import { Icon } from "./Icon";
const featured = ["recyclean", "penjadwalan-produksi", "arutalalab"].map(
  (slug) => projects.find((project) => project.slug === slug)!,
);
export function ProjectShowcase() {
  const locale = useLocale() as "en" | "id";
  const id = locale === "id";
  const [selected, setSelected] = useState<Project | null>(null);
  const [filter, setFilter] = useState<ProjectCategory | "all">("all");
  const dialog = useRef<HTMLDialogElement>(null);
  function containFocus(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key !== "Tab") return;
    const targets = event.currentTarget.querySelectorAll<HTMLElement>(
      'button:not([disabled]), a[href], [tabindex="0"]',
    );
    const first = targets[0];
    const last = targets[targets.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  }
  useEffect(() => {
    if (!selected || !dialog.current) return;
    const element = dialog.current;
    const previous = document.activeElement as HTMLElement | null;
    element.showModal();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      element.close();
      document.body.style.overflow = overflow;
      previous?.focus();
    };
  }, [selected]);
  const filtered = projects.filter(
    (p) => filter === "all" || p.categories.includes(filter),
  );
  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <div className="section-topline">
          <span className="eyebrow">
            02 / {id ? "MISI PILIHAN" : "SELECTED MISSIONS"}
          </span>
          <span className="eyebrow">DESIGN → DEVELOP → TEST</span>
        </div>
        <div className="section-heading-row">
          <div>
            <h2>
              {id ? "Ide yang jadi" : "Ideas made"}
              <br />
              <span className="marker">{id ? "nyata." : "real."}</span>
            </h2>
          </div>
          <p>
            {id
              ? "Pilihan karya dari eksplorasi desain hingga sistem yang menyelesaikan masalah sehari-hari."
              : "Selected work, from design explorations to systems that solve everyday problems."}
          </p>
        </div>
        <div className="project-stack">
          {featured.map((project, index) => (
            <article
              className={"featured-project panel feature-" + index}
              key={project.slug}
            >
              <div className="feature-visual">
                <div className="project-index eyebrow">
                  MISSION / 0{index + 1}
                  <span>↗</span>
                </div>
                <ProjectPreview project={project} locale={locale} />
              </div>
              <div className="feature-details">
                <span className="eyebrow">
                  {project.categories.join(" + ")} {project.period && " / 2025"}
                </span>
                <h3>{project.title}</h3>
                <p>{project.description[locale]}</p>
                <ul className="tag-list">
                  {project.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
                <div className="feature-links">
                  <button
                    className="button button-ink"
                    onClick={() => setSelected(project)}
                  >
                    {id ? "Jelajahi proyek" : "Explore project"}
                    <Icon name="arrow" />
                  </button>
                  {project.link && (
                    <a
                      className="text-button"
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {project.slug === "recyclean"
                        ? "Figma"
                        : project.link.includes("github")
                          ? "GitHub"
                          : id
                            ? "Lihat website"
                            : "Live website"}
                      <Icon name="arrow" width="17" />
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="project-archive panel">
          <div className="archive-heading">
            <div>
              <span className="eyebrow">
                {id ? "ARSIP EKSPLORASI" : "EXPLORATION ARCHIVE"}
              </span>
              <h3>
                {id ? "Semua proyek" : "The project index"}
                <span> ({projects.length.toString().padStart(2, "0")})</span>
              </h3>
            </div>
            <Link href="/projects" className="text-button">
              {id ? "Buka galeri" : "Open gallery"}
              <Icon name="arrow" width="18" />
            </Link>
          </div>
          <div
            className="filter-row"
            role="group"
            aria-label={id ? "Filter proyek" : "Filter projects"}
          >
            {(["all", "ui-ux", "frontend", "backend", "qa"] as const).map(
              (value) => (
                <button
                  key={value}
                  aria-pressed={filter === value}
                  onClick={() => setFilter(value)}
                >
                  {value === "all"
                    ? id
                      ? "Semua"
                      : "All projects"
                    : value === "ui-ux"
                      ? "UI/UX"
                      : value === "qa"
                        ? "QA"
                        : value}
                </button>
              ),
            )}
          </div>
          <div aria-live="polite">
            {filtered.length ? (
              filtered.map((project) => (
                <button
                  key={project.slug}
                  className="archive-row"
                  onClick={() => setSelected(project)}
                >
                  <span className="archive-number">
                    {(projects.indexOf(project) + 1)
                      .toString()
                      .padStart(2, "0")}
                  </span>
                  <strong>{project.title}</strong>
                  <span className="archive-tags">
                    {project.tags.slice(0, 2).join(" / ")}
                  </span>
                  <Icon name="arrow" />
                </button>
              ))
            ) : (
              <p className="empty-state">
                {id
                  ? "Belum ada proyek mandiri di kategori ini. Pengalaman QA ada pada bagian perjalanan."
                  : "No standalone projects in this category yet. Find QA work in my journey below."}
              </p>
            )}
          </div>
        </div>
      </div>
      <dialog
        ref={dialog}
        className="project-dialog"
        aria-labelledby="project-dialog-title"
        onKeyDown={containFocus}
        onCancel={() => setSelected(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setSelected(null);
        }}
      >
        {selected && (
          <div className="dialog-content">
            <div className="dialog-top">
              <span className="eyebrow">
                {id ? "CATATAN PROYEK" : "PROJECT NOTES"} / {selected.slug}
              </span>
              <button
                autoFocus
                className="icon-button"
                aria-label={id ? "Tutup detail" : "Close details"}
                onClick={() => setSelected(null)}
              >
                <Icon name="close" />
              </button>
            </div>
            <ProjectPreview project={selected} locale={locale} />
            <div className="dialog-body">
              <h2 id="project-dialog-title">{selected.title}</h2>
              <p>{selected.description[locale]}</p>
              <div className="dialog-facts">
                <div>
                  <span className="eyebrow">{id ? "CAKUPAN" : "SCOPE"}</span>
                  <p>{selected.categories.join(" / ")}</p>
                </div>
                <div>
                  <span className="eyebrow">
                    {id ? "PERANGKAT" : "TOOLKIT"}
                  </span>
                  <p>{selected.tags.join(" · ")}</p>
                </div>
                {selected.period && (
                  <div>
                    <span className="eyebrow">{id ? "PERIODE" : "PERIOD"}</span>
                    <p>{selected.period}</p>
                  </div>
                )}
              </div>
              <p className="project-note">
                {id
                  ? "Dokumentasi dan detail implementasi tersedia pada tautan proyek. Visual berlabel ilustrasi konsep bukan tangkapan layar produk."
                  : "Explore the project link for documentation and implementation details. Visuals labelled concept illustration are not product screenshots."}
              </p>
              {selected.link && (
                <a
                  className="button button-ink"
                  href={selected.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {id ? "Buka sumber proyek" : "Open project source"}
                  <Icon name="arrow" />
                </a>
              )}
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
