"use client";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { projects } from "@/content/projects";
import { experience } from "@/content/experience";
import Link from "next/link";
import { Icon } from "./Icon";
const groups = [
  {
    name: "Interface",
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
  },
  {
    name: "Server & data",
    icon: "globe" as const,
    tech: [
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
    name: "Design & quality",
    icon: "star" as const,
    tech: ["Figma", "Jest", "Playwright", "Postman", "Swagger"],
  },
  {
    name: "Delivery",
    icon: "orbit" as const,
    tech: ["Git", "Docker", "GitHub Actions"],
  },
];
const initials: Record<string, string> = {
  JavaScript: "JS",
  TypeScript: "TS",
  React: "⚛",
  "Next.js": "N",
  HTML5: "H5",
  CSS3: "C3",
  "Tailwind CSS": "≈",
  "Vue.js": "V",
  PostgreSQL: "PG",
  "NoSQL (Firestore)": "FS",
  "GitHub Actions": "GH",
};
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
      <div className="container">
        <div className="section-topline">
          <span className="eyebrow">
            03 / {id ? "PERALATAN MISI" : "MISSION TOOLKIT"}
          </span>
          <Link href="/tools" className="text-button">
            {id ? "Daftar lengkap" : "Full skill list"}
            <Icon name="arrow" width="18" />
          </Link>
        </div>
        <div className="section-heading-row">
          <h2>
            {id ? "Di balik" : "Behind the"}
            <br />
            <span className="marker">{id ? "layar." : "screens."}</span>
          </h2>
          <p>
            {id
              ? "Perangkat yang saya gunakan untuk mendesain, membangun, menguji, dan merilis. Pilih teknologi untuk melihat konteks penggunaannya."
              : "The tools I use to design, build, test, and ship. Select a technology to see where it fits."}
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
                  {value === "all" ? (id ? "Semua" : "All systems") : value}
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
                          <span className="tech-monogram" aria-hidden="true">
                            {initials[tech] || tech.slice(0, 2)}
                          </span>
                          <span>{tech}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <aside className="tech-inspector panel" aria-live="polite">
            <span className="eyebrow">SYSTEM INSPECTOR</span>
            <div className="inspector-icon" aria-hidden="true">
              {initials[selected] || selected.slice(0, 2)}
            </div>
            <h3>{selected}</h3>
            <p>
              {id
                ? "Konteks penggunaan dalam karya dan pengalaman saya."
                : "Where this tool appears in my work and experience."}
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
                    ? "Bagian dari perangkat belajar dan pengembangan saya. Belum ada contoh proyek terpisah yang dipublikasikan di sini."
                    : "Part of my learning and development toolkit. A separate project example is not published here yet."}
                </p>
              )}
            </div>
            <span className="inspector-footer eyebrow">
              {id
                ? "KONTEKS NYATA, BUKAN SKOR PERSENTASE"
                : "REAL CONTEXT, NOT A PERCENTAGE SCORE"}
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
