"use client";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { projects } from "@/content/projects";
import { experience } from "@/content/experience";
import { getIconSlug } from "@/lib/techIcons";
import { TechLogo } from "@/components/TechLogo";
import Link from "next/link";
import { Icon } from "./Icon";
const groups = [
  {
    name: "UI/UX Design",
    icon: "star" as const,
    tech: ["Figma"],
  },
  {
    name: "Web Development",
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
      "PHP",
      "Express",
      "MySQL",
      "PostgreSQL",
      "Prisma",
      "Redis",
      "NoSQL (Firestore)",
      "ElysiaJS",
    ],
  },
  {
    name: "Dev Ops",
    icon: "orbit" as const,
    tech: ["Git", "Docker", "GitHub Actions"],
  },
  {
    name: "Quality Assurance",
    icon: "check" as const,
    tech: ["Jest", "Playwright", "Postman", "Swagger"],
  },
];
export function TechSection() {
  const id = useLocale() === "id";
  const locale = id ? "id" : "en";
  const t = useTranslations("skills");
  const [selected, setSelected] = useState("React");
  const [group, setGroup] = useState("all");
  const relatedProjects = projects.filter(
    (p) =>
      p.tags.includes(selected) ||
      (selected === "Figma" && p.categories.includes("ui-ux")),
  );
  const relatedExperience = experience.filter((e) =>
    e.skills?.includes(selected),
  );
  return (
    <section id="skills" className="lunar-section tech-section">
      <div className="toolkit-backdrop" aria-hidden="true">
        <div className="toolkit-neptune" />
      </div>
      <div className="container">
        <div className="section-topline">
          <span className="eyebrow">
            03 / {id ? "PERALATAN MISI" : "MISSION TOOLKIT"}
          </span>
        </div>
        <div className="section-heading-row">
          <h2>
            {id ? "Perangkat di" : "The tools"}
            <br />
            <span className="marker">{id ? "balik karya." : "behind the work."}</span>
          </h2>
          <p>
            {id
              ? "Dari Figma hingga pengujian otomatis, inilah perangkat yang mendukung proses saya. Pilih salah satunya untuk melihat kaitannya dengan proyek dan pengalaman kerja."
              : "From Figma to automated testing, these tools support my process. Select one to see how it connects to my projects and work experience."}
          </p>
        </div>
        <div className="tech-layout">
          <div>
            <div
              className="filter-row"
              role="group"
              aria-label={id ? "Kategori teknologi" : "Technology categories"}
            >
              {["all", ...groups.map((g) => g.name)].map((value) => (
                <button
                  key={value}
                  aria-pressed={group === value}
                  onClick={() => setGroup(value)}
                >
                  {value === "all" ? (id ? "Semua kategori" : "All categories") : value}
                </button>
              ))}
            </div>
            <div className="tech-groups">
              {groups
                .filter((g) => group === "all" || group === g.name)
                .map((g) => (
                  <div key={g.name} className="tech-group">
                    <h3>
                      <Icon name={g.icon} width="17" />
                      <span>{g.name}</span>
                      <span className="eyebrow">
                        {g.tech.length.toString().padStart(2, "0")}
                      </span>
                    </h3>
                    <div className="tech-buttons">
                      {g.tech.map((tech) => (
                        <button
                          key={tech}
                          aria-pressed={selected === tech}
                          onClick={() => setSelected(tech)}
                        >
                          <TechLogo slug={getIconSlug(tech)} />
                          <span>{tech}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <aside className="tech-inspector panel" aria-live="polite">
            <span className="eyebrow">{id ? "DALAM PRAKTIK" : "IN PRACTICE"}</span>
            <div className="inspector-icon" aria-hidden="true">
              <TechLogo slug={getIconSlug(selected)} size={42} />
            </div>
            <h3>{selected}</h3>
            <p>
              {id
                ? "Contoh penggunaan perangkat ini dalam pekerjaan saya."
                : "Examples of how I’ve used this tool in my work."}
            </p>
            <div className="inspector-evidence">
              {relatedProjects.map((p) => (
                <Link href="/#projects" key={p.slug}>
                  <span className="eyebrow">{id ? "PROYEK" : "PROJECT"}</span>
                  <strong>
                    {p.title}
                    <Icon name="arrow" width="16" />
                  </strong>
                </Link>
              ))}
              {relatedExperience.map((e) => (
                <Link href="/#journey" key={e.id}>
                  <span className="eyebrow">
                    {id ? "PENGALAMAN" : "EXPERIENCE"}
                  </span>
                  <strong>
                    {e.role[locale]}
                    <Icon name="arrow" width="16" />
                  </strong>
                  <small>{e.place.split(" — ")[0]}</small>
                </Link>
              ))}
              {!relatedProjects.length && !relatedExperience.length && (
                <p>
                  {id
                    ? "Perangkat ini masuk dalam proses belajar dan eksplorasi saya. Contoh proyeknya belum ditampilkan di sini."
                    : "This tool is part of my learning and exploration. A project example hasn’t been added here yet."}
                </p>
              )}
            </div>
            <span className="inspector-footer eyebrow">
              {id
                ? "BAGIAN DARI PROSES SAYA"
                : "PART OF MY PROCESS"}
            </span>
          </aside>
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
