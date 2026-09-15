"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { getIconSlug } from "@/lib/techIcons";
import { TechLogo } from "@/components/TechLogo";
import { Icon } from "./Icon";

const groups = [
  {
    name: "UI/UX",
    icon: "star" as const,
    tech: ["Figma"],
    description: {
      id: "Merancang alur, antarmuka, dan prototipe yang berangkat dari kebutuhan pengguna.",
      en: "Designing flows, interfaces, and prototypes around user needs.",
    },
  },
  {
    name: "Front End",
    icon: "code" as const,
    tech: [
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
      id: "Membangun antarmuka web yang cepat, responsif, dan mudah digunakan.",
      en: "Building fast, responsive web interfaces that are easy to use.",
    },
  },
  {
    name: "Back End",
    icon: "code" as const,
    tech: ["PHP", "Express", "ElysiaJS"],
    description: {
      id: "Mengembangkan layanan aplikasi, API, dan logika yang menopang pengalaman pengguna.",
      en: "Developing application services, APIs, and the logic behind the user experience.",
    },
  },
  {
    name: "Database",
    icon: "orbit" as const,
    tech: ["MySQL", "PostgreSQL", "Prisma", "Redis", "NoSQL (Firestore)"],
    description: {
      id: "Menyusun data yang rapi, aman, dan siap mendukung kebutuhan aplikasi.",
      en: "Structuring reliable data layers that support application needs.",
    },
  },
  {
    name: "DevOps & Tools",
    icon: "check" as const,
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

export function TechSection() {
  const id = useLocale() === "id";
  const t = useTranslations("skills");
  const [activeGroupName, setActiveGroupName] = useState("Front End");
  const [selected, setSelected] = useState("TypeScript");
  const activeGroup =
    groups.find((group) => group.name === activeGroupName) ?? groups[0];

  return (
    <section id="skills" className="lunar-section tech-section">
      <div className="toolkit-backdrop" aria-hidden="true">
        <div className="toolkit-neptune" />
      </div>
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
              {groups.map((group) => (
                <button
                  key={group.name}
                  type="button"
                  role="tab"
                  aria-selected={activeGroup.name === group.name}
                  aria-controls="tech-layer"
                  onClick={() => {
                    setActiveGroupName(group.name);
                    setSelected(group.tech[0]);
                  }}
                >
                  <Icon name={group.icon} width="20" />
                  <span>{group.name}</span>
                  <small>{group.tech.length.toString().padStart(2, "0")}</small>
                </button>
              ))}
            </div>
          </div>
          <span className="tech-layer-label eyebrow">
            {id ? "DAFTAR KATEGORI & LAYER" : "CATEGORY & LAYER LIST"}
          </span>
          <section
            id="tech-layer"
            className="tech-group"
            aria-live="polite"
            aria-labelledby="tech-layer-title"
          >
            <div className="tech-layer-heading">
              <div>
                <span className="tech-layer-number">
                  {String(groups.indexOf(activeGroup) + 1).padStart(2, "0")}
                </span>
                <span className="eyebrow">/ {activeGroup.name}</span>
              </div>
              <span className="tech-layer-status">{id ? "DIPILIH" : "SELECTED"}</span>
            </div>
            <h3 id="tech-layer-title">{activeGroup.name}</h3>
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
                  <span>{tech}</span>
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
