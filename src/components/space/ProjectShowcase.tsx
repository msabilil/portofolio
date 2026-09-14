"use client";
import { useRef, useState, useEffect, type KeyboardEvent } from "react";
import Image from "next/image";
import { useLocale } from "next-intl";
import {
  projects,
  type Project,
  type ProjectCategory,
} from "@/content/projects";
import Link from "next/link";
import { ProjectPreview } from "./ProjectPreview";
import { Icon } from "./Icon";
import { useSceneActivity } from "./useSceneActivity";
const featured = ["recyclean", "penjadwalan-produksi", "arutalalab"].map(
  (slug) => projects.find((project) => project.slug === slug)!,
);
export function ProjectShowcase() {
  const locale = useLocale() as "en" | "id";
  const id = locale === "id";
  const [selected, setSelected] = useState<Project | null>(null);
  const { ref, active } = useSceneActivity<HTMLElement>();
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
    <section
      id="projects"
      ref={ref}
      className="projects-section"
      data-active={active ? "true" : undefined}
    >
      <div className="space-stage space-stage-missions" aria-hidden="true">
        <span className="space-comets">
          <i />
          <i />
          <i />
          <i />
        </span>
        <Image
          className="missions-planet missions-neptune"
          src="/assets/photos/3d/neptune.png"
          alt=""
          width={1600}
          height={1600}
          sizes="(max-width: 800px) 38vw, 300px"
          unoptimized
          loading="lazy"
        />
        <Image
          className="missions-planet missions-mars"
          src="/assets/photos/3d/mars.png"
          alt=""
          width={560}
          height={560}
          sizes="(max-width: 800px) 34vw, 25vw"
          unoptimized
          loading="lazy"
        />
      </div>
      <div className="container">
        <div className="section-topline">
          <span className="eyebrow">
            02 / {id ? "MISI PILIHAN" : "SELECTED MISSIONS"}
          </span>
          <span className="eyebrow">
            {id ? "DESAIN → KODE → UJI" : "DESIGN → BUILD → TEST"}
          </span>
        </div>
        <div className="section-heading-row">
          <div>
            <h2>
              {id ? "Dari kebutuhan" : "From a problem"}
              <br />
              <span className="marker">{id ? "menjadi karya." : "to a project."}</span>
            </h2>
          </div>
          <p>
            {id
              ? "Setiap proyek berangkat dari kebutuhan yang berbeda. Jelajahi desain aplikasi, alur produksi, dan layanan digital yang pernah saya kerjakan."
              : "Each project starts with a different need. Explore the app designs, production workflows, and digital services I’ve worked on."}
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
                  {id ? "MISI" : "MISSION"} / 0{index + 1}
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
                    {id ? "Lihat detail proyek" : "View project details"}
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
                {id ? "ARSIP PROYEK" : "PROJECT ARCHIVE"}
              </span>
              <h3>
                {id ? "Semua proyek" : "All projects"}
                <span> ({projects.length.toString().padStart(2, "0")})</span>
              </h3>
            </div>
            <Link href="/projects" className="text-button">
              {id ? "Lihat galeri proyek" : "View project gallery"}
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
                  ? "Belum ada proyek terpisah di kategori ini. Cerita tentang pengujian aplikasi ada di section 05, Catatan Perjalanan."
                  : "There’s no standalone project in this category yet. You can find my application testing work in section 05, The Flight Log."}
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
                  ? "Buka tautan di bawah untuk menjelajahi proyek lebih lanjut. Visual berlabel ilustrasi konsep menjelaskan gagasan atau alur, bukan tangkapan layar produk."
                  : "Follow the link below to explore the project further. Visuals labelled concept illustration explain an idea or workflow; they are not product screenshots."}
              </p>
              {selected.link && (
                <a
                  className="button button-ink"
                  href={selected.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {selected.link.includes("figma.com")
                    ? id ? "Lihat desain di Figma" : "View design in Figma"
                    : selected.link.includes("github.com")
                      ? id ? "Lihat kode di GitHub" : "View code on GitHub"
                      : id ? "Kunjungi website" : "Visit website"}
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
