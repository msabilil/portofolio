import { useLocale, useTranslations } from "next-intl";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { experience } from "@/content/experience";
import { ExperienceItem } from "@/components/ExperienceItem";
import { ProjectCard } from "@/components/ProjectCard";
import { SkillTag } from "@/components/SkillTag";
import { SocialLinks } from "@/components/layout/SocialLinks";

const TOOL_KEYS = ["figma", "balsamiq", "googleStitch", "claudeDesign", "deepseek"] as const;
const SOFT_KEYS = [
  "creative",
  "innovative",
  "communication",
  "interpersonal",
  "criticalThinking",
  "analyticalThinking",
  "problemSolving",
  "curiosity",
  "initiative",
] as const;

export default function HomePage() {
  const locale = useLocale() as "en" | "id";
  const tHome = useTranslations("home");
  const tAbout = useTranslations("about");
  const tSkills = useTranslations("skills");
  const tExperience = useTranslations("experience");
  const tProjects = useTranslations("projects");
  const tContact = useTranslations("contact");

  return (
    <div className="flex flex-col gap-20 py-12 md:py-16">
      <section id="about" className="fade-in-up">
        <p style={{ color: "var(--color-text-muted)" }}>{tHome("greeting")}</p>
        <h1 className="text-[42px] font-bold leading-[1.1] tracking-[-0.02em] sm:text-[52px]">
          {profile.name}
        </h1>
        <p className="mt-2 text-lg" style={{ color: "var(--color-text-muted)" }}>{tHome("tagline")}</p>
        <p className="mt-6 max-w-prose">{tAbout("bio")}</p>
        <a href="#projects" className="mt-6 inline-block underline underline-offset-4">
          {tHome("cta")}
        </a>
      </section>

      <section id="skills">
        <h2 className="mb-6 text-2xl font-semibold">{tSkills("title")}</h2>
        <div className="mb-8">
          <h3 className="mb-3 text-sm uppercase tracking-wide" style={{ color: "var(--color-text-muted)" }}>
            {tSkills("toolsHeading")}
          </h3>
          <div className="flex flex-wrap gap-2">
            {TOOL_KEYS.map((key) => (
              <SkillTag key={key} label={tSkills(`tools.${key}`)} />
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-3 text-sm uppercase tracking-wide" style={{ color: "var(--color-text-muted)" }}>
            {tSkills("softHeading")}
          </h3>
          <div className="flex flex-wrap gap-2">
            {SOFT_KEYS.map((key) => (
              <SkillTag key={key} label={tSkills(`soft.${key}`)} />
            ))}
          </div>
        </div>
      </section>

      <section id="experience">
        <h2 className="mb-6 text-2xl font-semibold">{tExperience("title")}</h2>
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

      <section id="projects">
        <h2 className="mb-6 text-2xl font-semibold">{tProjects("title")}</h2>
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

      <section id="contact">
        <h2 className="mb-4 text-2xl font-semibold">{tContact("title")}</h2>
        <p className="mb-6" style={{ color: "var(--color-text-muted)" }}>{tContact("intro")}</p>
        <SocialLinks />
      </section>
    </div>
  );
}
