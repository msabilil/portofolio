import { useLocale, useTranslations } from "next-intl";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { experience } from "@/content/experience";
import { ExperienceItem } from "@/components/ExperienceItem";
import { ProjectCard } from "@/components/ProjectCard";
import { SkillTag } from "@/components/SkillTag";
import { Contact } from "@/components/layout/Contact";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { Doodle } from "@/components/layout/Doodle";
import { Link } from "@/i18n/navigation";

const TOOL_KEYS = ["figma", "microsoftOffice", "researching", "prototyping", "wireframing", "uxWriting"] as const;
const SOFT_KEYS = [
  "creative",
  "innovative",
  "communication",
  "interpersonal",
  "criticalThinking",
  "analyticalThinking",
  "problemSolving",
  "curiosity",
] as const;
const LANGUAGE_KEYS = ["english", "indonesian"] as const;

export default function HomePage() {
  const locale = useLocale() as "en" | "id";
  const tHome = useTranslations("home");
  const tAbout = useTranslations("about");
  const tSkills = useTranslations("skills");
  const tExperience = useTranslations("experience");
  const tProjects = useTranslations("projects");

  return (
    <div className="flex flex-col gap-24 py-12 md:py-16">
      <section className="fade-in-up relative">
        <Doodle className="pointer-events-none absolute -right-6 -top-4 hidden h-32 w-32 md:block" />
        <p style={{ color: "var(--color-text-muted)" }}>{tHome("greeting")}</p>
        <h1 className="text-[42px] font-bold leading-[1.1] tracking-[-0.02em] sm:text-[52px]">
          {profile.name}
        </h1>
        <p className="mt-2 text-lg" style={{ color: "var(--color-text-muted)" }}>{tHome("tagline")}</p>
        <p className="mt-6 max-w-prose">{tAbout("bio")}</p>
        <Link
          href="/projects"
          className="mt-6 inline-block underline underline-offset-4 transition-colors duration-[var(--dur-fast)] hover:text-[var(--color-accent)]"
        >
          {tHome("cta")}
        </Link>
      </section>

      <section>
        <SectionHeading number="02" title={tSkills("title")} />
        <div className="mb-8">
          <h3 className="mb-3 font-mono text-sm uppercase tracking-wide" style={{ color: "var(--color-text-muted)" }}>
            {tSkills("toolsHeading")}
          </h3>
          <div className="flex flex-wrap gap-2">
            {TOOL_KEYS.map((key) => (
              <SkillTag key={key} label={tSkills(`tools.${key}`)} />
            ))}
          </div>
        </div>
        <div className="mb-8">
          <h3 className="mb-3 font-mono text-sm uppercase tracking-wide" style={{ color: "var(--color-text-muted)" }}>
            {tSkills("softHeading")}
          </h3>
          <div className="flex flex-wrap gap-2">
            {SOFT_KEYS.map((key) => (
              <SkillTag key={key} label={tSkills(`soft.${key}`)} />
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-3 font-mono text-sm uppercase tracking-wide" style={{ color: "var(--color-text-muted)" }}>
            {tSkills("languagesHeading")}
          </h3>
          <div className="flex flex-wrap gap-2">
            {LANGUAGE_KEYS.map((key) => (
              <SkillTag key={key} label={tSkills(`languages.${key}`)} />
            ))}
          </div>
        </div>
      </section>

      <section>
        <SectionHeading number="03" title={tExperience("title")} />
        <div>
          {experience.map((entry) => (
            <ExperienceItem
              key={entry.id}
              experience={entry}
              role={entry.role[locale]}
              description={entry.description[locale]}
            />
          ))}
        </div>
      </section>

      <section>
        <SectionHeading number="04" title={tProjects("title")} />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              description={project.description[locale]}
              viewLabel={tProjects("viewLink")}
            />
          ))}
        </div>
      </section>

      <Contact number="05" />
    </div>
  );
}
