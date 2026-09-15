"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { projects } from "@/content/projects";
import { experience } from "@/content/experience";
import { getIconSlug } from "@/lib/techIcons";
import { TechLogo } from "@/components/TechLogo";
import { Icon } from "./Icon";

const groups = [
  {
    name: "UI/UX & Front End",
    icon: "panels" as const,
    tech: [
      "Figma",
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Vue.js",
    ],
    description: {
      id: "Merancang alur dan membangun antarmuka web yang cepat, responsif, dan mudah digunakan.",
      en: "Designing flows and building fast, responsive web interfaces that are easy to use.",
    },
  },
  {
    name: "Back End & Database",
    icon: "database" as const,
    tech: [
      "PHP",
      "Express",
      "ElysiaJS",
      "MySQL",
      "PostgreSQL",
      "Prisma",
      "Redis",
      "NoSQL (Firestore)",
    ],
    description: {
      id: "Mengembangkan API, layanan aplikasi, dan data layer yang aman serta andal.",
      en: "Developing reliable APIs, application services, and secure data layers.",
    },
  },
  {
    name: "DevOps & Tools",
    icon: "workflow" as const,
    tech: [
      "Git",
      "Docker",
      "GitHub Actions",
      "Jest",
      "Playwright",
      "Postman",
      "Swagger",
    ],
    description: {
      id: "Menjaga proses pengembangan, pengujian, dan pengiriman aplikasi tetap andal.",
      en: "Keeping development, testing, and delivery workflows reliable.",
    },
  },
];

const allGroup = {
  name: "all",
  icon: "blocks" as const,
  tech: [...new Set(groups.flatMap((group) => group.tech))],
  description: {
    id: "Rangkuman teknologi yang saya gunakan dari desain hingga pengiriman aplikasi.",
    en: "An overview of the technology I use from design through application delivery.",
  },
};

const categoryGroups = [allGroup, ...groups];

const techDescriptions: Record<string, string> = {
  Figma: "UI Design",
  JavaScript: "Scripting Core",
  TypeScript: "Type-Safe Code",
  React: "Component UI",
  "Next.js": "App Framework",
  HTML5: "Semantic Markup",
  CSS3: "Visual Styling",
  "Tailwind CSS": "Utility CSS",
  "Vue.js": "Progressive UI",
  PHP: "Server Runtime",
  Express: "API Framework",
  ElysiaJS: "Type-Safe API",
  MySQL: "Relational Data",
  PostgreSQL: "SQL Database",
  Prisma: "Data ORM",
  Redis: "Cache Store",
  "NoSQL (Firestore)": "Cloud NoSQL",
  Git: "Version Control",
  Docker: "Containers",
  "GitHub Actions": "CI/CD Workflow",
  Jest: "Unit Testing",
  Playwright: "Browser Testing",
  Postman: "API Client",
  Swagger: "API Docs",
};

export function TechSection() {
  const id = useLocale() === "id";
  const locale = id ? "id" : "en";
  const t = useTranslations("skills");
  const [activeGroupName, setActiveGroupName] = useState("all");
  const [selected, setSelected] = useState<string | null>(null);
  const activeGroup =
    categoryGroups.find((group) => group.name === activeGroupName) ?? allGroup;
  const activeGroupLabel =
    activeGroup.name === "all"
      ? id
        ? "Semua Stack"
        : "All Stack"
      : activeGroup.name;
  const relatedProjects = selected
    ? projects.filter(
        (project) =>
          project.tags.includes(selected) ||
          (selected === "Figma" && project.categories.includes("ui-ux")),
      )
    : [];
  const relatedExperience = selected
    ? experience.filter((entry) => entry.skills?.includes(selected))
    : [];

  return (
    <section id="skills" className="lunar-section tech-section">
      <div className="container">
        <div className="section-topline">
          <span className="eyebrow">03 / TECH STACK</span>
        </div>
        <div className="section-heading-row">
          <h2>
            Tech Stack <span className="marker">&amp; Tools</span>
          </h2>
          <p>
            {id
              ? "Teknologi dan tools yang saya gunakan untuk membangun aplikasi web dan menjaga proses pengembangannya."
              : "The technology and tools I use to build web applications and support their delivery."}
          </p>
        </div>
        <div className="tech-layout">
          <div className="tech-category-area">
            <span className="eyebrow">{id ? "KATEGORI" : "CATEGORIES"}</span>
            <div
              className="tech-category-grid"
              role="tablist"
              aria-label={id ? "Kategori tech stack" : "Tech stack categories"}
            >
              {categoryGroups.map((group) => (
                <button
                  key={group.name}
                  type="button"
                  role="tab"
                  aria-selected={activeGroup.name === group.name}
                  aria-controls="tech-layer"
                  onClick={() => {
                    setActiveGroupName(group.name);
                    setSelected(null);
                  }}
                >
                  <Icon name={group.icon} width="20" />
                  <span className="tech-category-copy">
                    <strong>
                      {group.name === "all"
                        ? id
                          ? "Semua Stack"
                          : "All Stack"
                        : group.name}
                    </strong>
                    <small>{group.tech.length.toString().padStart(2, "0")}</small>
                  </span>
                </button>
              ))}
            </div>
          </div>
          <span className="tech-layer-label eyebrow">
            {id ? "DAFTAR KATEGORI & LAYER" : "CATEGORY & LAYER LIST"}
          </span>
          <div className="tech-layer-layout">
            <section
              id="tech-layer"
              className="tech-group"
              aria-live="polite"
              aria-labelledby="tech-layer-title"
            >
              <div className="tech-layer-heading">
                <div>
                  <span className="tech-layer-number">
                    {String(categoryGroups.indexOf(activeGroup)).padStart(2, "0")}
                  </span>
                  <span className="eyebrow">/ {activeGroupLabel}</span>
                </div>
                <span className="tech-layer-status">{id ? "DIPILIH" : "SELECTED"}</span>
              </div>
              <h3 id="tech-layer-title">{activeGroupLabel}</h3>
              <p>{id ? activeGroup.description.id : activeGroup.description.en}</p>
              <div className="tech-buttons">
                {activeGroup.tech.map((tech) => (
                  <button
                    key={tech}
                    type="button"
                    aria-pressed={selected === tech}
                    onClick={() => setSelected(tech)}
                  >
                    <TechLogo slug={getIconSlug(tech)} />
                    <span className="tech-stack-copy">
                      <strong>{tech}</strong>
                      <small>{techDescriptions[tech]}</small>
                    </span>
                  </button>
                ))}
              </div>
              <footer className="tech-layer-footer">
                <span>{activeGroup.tech.length} {id ? "Teknologi" : "Technologies"}</span>
                <Link href="/#projects">
                  {id ? "Detail Layer" : "Layer Details"}
                  <Icon name="arrow" width="15" />
                </Link>
              </footer>
            </section>
            <aside className="tech-inspector panel" aria-live="polite">
              <span className="eyebrow">{id ? "DALAM PRAKTIK" : "IN PRACTICE"}</span>
              <div className="inspector-icon" aria-hidden="true">
                {selected && <TechLogo slug={getIconSlug(selected)} size={42} />}
              </div>
              <h3>{selected ?? (id ? "Pilih teknologi" : "Select a technology")}</h3>
              <p>
                {id
                  ? "Pilih satu teknologi untuk melihat konteks penggunaannya dalam pekerjaan saya."
                  : "Select a technology to see how it appears in my work."}
              </p>
              <div className="inspector-evidence">
                {relatedProjects.map((project) => (
                  <Link href="/#projects" key={project.slug}>
                    <span className="eyebrow">{id ? "PROYEK" : "PROJECT"}</span>
                    <strong>
                      {project.title}
                      <Icon name="arrow" width="16" />
                    </strong>
                  </Link>
                ))}
                {relatedExperience.map((entry) => (
                  <Link href="/#journey" key={entry.id}>
                    <span className="eyebrow">{id ? "PENGALAMAN" : "EXPERIENCE"}</span>
                    <strong>
                      {entry.role[locale]}
                      <Icon name="arrow" width="16" />
                    </strong>
                    <small>{entry.place.split(" — ")[0]}</small>
                  </Link>
                ))}
                {selected && !relatedProjects.length && !relatedExperience.length && (
                  <p>
                    {id
                      ? "Teknologi ini masuk dalam proses belajar dan eksplorasi saya. Contoh proyeknya belum ditampilkan di sini."
                      : "This technology is part of my learning and exploration. A project example has not been added here yet."}
                  </p>
                )}
              </div>
              <span className="inspector-footer eyebrow">
                {id ? "BAGIAN DARI PROSES SAYA" : "PART OF MY PROCESS"}
              </span>
            </aside>
          </div>
        </div>
        <div className="human-skills">
          <span className="eyebrow">{t("softHeading")}</span>
          <p>
            {[
              "computationalThinking",
              "communication",
              "analyticalThinking",
              "criticalThinking",
              "problemSolving",
              "teamwork",
            ]
              .map((key) => t("soft." + key))
              .join(" · ")}
          </p>
          <span className="eyebrow">{t("languagesHeading")}</span>
          <p>
            {t("languages.english")} · {t("languages.indonesian")}
          </p>
        </div>
      </div>
    </section>
  );
}
