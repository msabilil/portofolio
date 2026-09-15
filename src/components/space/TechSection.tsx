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
    tone: "ui",
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
    tone: "data",
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
    tone: "ops",
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
  tone: "all",
  icon: "blocks" as const,
  tech: [...new Set(groups.flatMap((group) => group.tech))],
  description: {
    id: "Rangkuman teknologi yang saya gunakan dari desain hingga pengiriman aplikasi.",
    en: "An overview of the technology I use from design through application delivery.",
  },
};

const categoryGroups = [allGroup, ...groups];

const techDescriptions: Record<
  string,
  { label: { id: string; en: string }; detail: { id: string; en: string } }
> = {
  Figma: {
    label: { id: "UI & UX flow", en: "UI & UX flow" },
    detail: { id: "Merancang antarmuka, prototipe, dan alur pengguna sebelum implementasi.", en: "Designing interfaces, prototypes, and user flows before implementation." },
  },
  JavaScript: {
    label: { id: "Interactivity", en: "Interactivity" },
    detail: { id: "Menjalankan logika dan interaksi dinamis langsung di browser.", en: "Powering dynamic logic and interactions directly in the browser." },
  },
  TypeScript: {
    label: { id: "Type-safe code", en: "Type-safe code" },
    detail: { id: "Mencegah kesalahan lebih awal dengan tipe statis dan kontrak data yang jelas.", en: "Catching errors early with static types and clear data contracts." },
  },
  React: {
    label: { id: "Component UI", en: "Component UI" },
    detail: { id: "Membangun antarmuka interaktif dari komponen yang dapat digunakan kembali.", en: "Building interactive interfaces from reusable components." },
  },
  "Next.js": {
    label: { id: "Web & SEO", en: "Web & SEO" },
    detail: { id: "Merender aplikasi web cepat dengan routing, server rendering, dan optimasi SEO.", en: "Rendering fast web apps with routing, server rendering, and SEO optimization." },
  },
  HTML5: {
    label: { id: "Semantic markup", en: "Semantic markup" },
    detail: { id: "Menyusun konten yang semantik, mudah diakses, dan ramah mesin pencari.", en: "Structuring content semantically for accessibility and search engines." },
  },
  CSS3: {
    label: { id: "Responsive styling", en: "Responsive styling" },
    detail: { id: "Mengatur tata letak, visual, dan responsivitas antarmuka di berbagai layar.", en: "Controlling interface layout, visuals, and responsiveness across screens." },
  },
  "Tailwind CSS": {
    label: { id: "Utility CSS", en: "Utility CSS" },
    detail: { id: "Menyusun styling yang konsisten dengan utility class dan token desain.", en: "Composing consistent styling with utility classes and design tokens." },
  },
  "Vue.js": {
    label: { id: "Reactive UI", en: "Reactive UI" },
    detail: { id: "Membangun antarmuka reaktif secara bertahap, dari widget hingga aplikasi penuh.", en: "Building reactive interfaces progressively, from widgets to full applications." },
  },
  PHP: {
    label: { id: "Server logic", en: "Server logic" },
    detail: { id: "Menangani logika aplikasi, permintaan server, dan integrasi data di backend.", en: "Handling application logic, server requests, and data integration on the backend." },
  },
  Express: {
    label: { id: "HTTP API", en: "HTTP API" },
    detail: { id: "Membangun API HTTP yang ringan dengan middleware dan routing yang fleksibel.", en: "Building lightweight HTTP APIs with flexible middleware and routing." },
  },
  ElysiaJS: {
    label: { id: "Type-safe API", en: "Type-safe API" },
    detail: { id: "Membuat API cepat dengan validasi dan tipe end-to-end yang aman.", en: "Creating fast APIs with safe end-to-end validation and types." },
  },
  MySQL: {
    label: { id: "Transactional DB", en: "Transactional DB" },
    detail: { id: "Menyimpan dan mengelola data relasional yang terstruktur dengan query SQL.", en: "Storing and managing structured relational data with SQL queries." },
  },
  PostgreSQL: {
    label: { id: "Advanced SQL", en: "Advanced SQL" },
    detail: { id: "Menangani data relasional dan query kompleks dengan fitur SQL yang kaya.", en: "Handling relational data and complex queries with rich SQL features." },
  },
  Prisma: {
    label: { id: "Type-safe ORM", en: "Type-safe ORM" },
    detail: { id: "Mendukung migrasi database yang aman, pemodelan skema deklaratif, dan query yang optimal.", en: "Supporting safe database migrations, declarative schema modeling, and optimized queries." },
  },
  Redis: {
    label: { id: "In-memory cache", en: "In-memory cache" },
    detail: { id: "Mempercepat aplikasi dengan cache, session store, dan pekerjaan berbasis antrean.", en: "Speeding up applications with caching, session storage, and queue-based work." },
  },
  "NoSQL (Firestore)": {
    label: { id: "NoSQL & real-time", en: "NoSQL & real-time" },
    detail: { id: "Menyimpan data dokumen di cloud dengan sinkronisasi real-time.", en: "Storing document data in the cloud with real-time synchronization." },
  },
  Git: {
    label: { id: "Version control", en: "Version control" },
    detail: { id: "Melacak perubahan kode, mengelola branch, dan berkolaborasi dengan aman.", en: "Tracking code changes, managing branches, and collaborating safely." },
  },
  Docker: {
    label: { id: "Consistent runtime", en: "Consistent runtime" },
    detail: { id: "Menjalankan aplikasi dalam container agar lingkungan pengembangan dan rilis konsisten.", en: "Running applications in containers for consistent development and release environments." },
  },
  "GitHub Actions": {
    label: { id: "CI/CD automation", en: "CI/CD automation" },
    detail: { id: "Mengotomatiskan build, test, dan deployment setiap ada perubahan kode.", en: "Automating builds, tests, and deployments for every code change." },
  },
  Jest: {
    label: { id: "Unit testing", en: "Unit testing" },
    detail: { id: "Memverifikasi unit dan logika aplikasi secara cepat dan terisolasi.", en: "Verifying application units and logic quickly in isolation." },
  },
  Playwright: {
    label: { id: "Browser E2E", en: "Browser E2E" },
    detail: { id: "Menguji alur pengguna end-to-end pada browser nyata secara otomatis.", en: "Automatically testing end-to-end user flows in real browsers." },
  },
  Postman: {
    label: { id: "API testing", en: "API testing" },
    detail: { id: "Menguji endpoint, menyimpan koleksi request, dan memeriksa respons API.", en: "Testing endpoints, saving request collections, and inspecting API responses." },
  },
  Swagger: {
    label: { id: "API specification", en: "API specification" },
    detail: { id: "Mendokumentasikan kontrak API agar endpoint mudah dipahami dan diintegrasikan.", en: "Documenting API contracts so endpoints are easy to understand and integrate." },
  },
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
                  className={`tech-category-button tech-category-button--${group.tone}`}
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
                      <small>{techDescriptions[tech].label[locale]}</small>
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
              <h3 className="inspector-tech-title">
                <span>{selected ?? (id ? "Pilih teknologi" : "Select a technology")}</span>
                {selected && <small>{techDescriptions[selected].label[locale]}</small>}
              </h3>
              <p>
                {selected
                  ? techDescriptions[selected].detail[locale]
                  : id
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
