import { useLocale, useTranslations } from "next-intl";
import { projects } from "@/content/projects";
import { experience } from "@/content/experience";
import { education } from "@/content/education";
import { certifications } from "@/content/certifications";
import { ExperienceItem } from "@/components/ExperienceItem";
import { ProjectCard } from "@/components/ProjectCard";
import { SkillTag } from "@/components/SkillTag";
import { EducationItem } from "@/components/EducationItem";
import { CertificationItem } from "@/components/CertificationItem";
import { CoreExpertise } from "@/components/CoreExpertise";
import { Contact } from "@/components/layout/Contact";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { HeroSpace } from "@/components/layout/HeroSpace";
import { Reveal } from "@/components/layout/Reveal";
import { getIconSlug } from "@/lib/techIcons";

const PROFICIENT_KEYS = ["javascript", "typescript", "html5", "css3", "nextjs", "react", "php", "mysql", "nosql", "git"] as const;
const FAMILIAR_KEYS = ["vuejs", "elysiajs", "postgresql", "swagger", "postman", "cicdTesting"] as const;
const SOFT_KEYS = [
  "computationalThinking",
  "communication",
  "analyticalThinking",
  "criticalThinking",
  "problemSolving",
  "teamwork",
] as const;
const LANGUAGE_KEYS = ["english", "indonesian"] as const;

export default function HomePage() {
  const locale = useLocale() as "en" | "id";
  const tHome = useTranslations("home");
  const tAbout = useTranslations("about");
  const tExpertise = useTranslations("expertise");
  const tSkills = useTranslations("skills");
  const tExperience = useTranslations("experience");
  const tProjects = useTranslations("projects");
  const tEducation = useTranslations("education");
  const tCertifications = useTranslations("certifications");

  return (
    <>
      <HeroSpace
        headline={tHome("headline")}
        tagline={tHome("tagline")}
        ctaLabel={tHome("cta")}
        connectLabel={tHome("connect")}
      />
      <div className="mx-auto flex w-full max-w-[var(--container-max)] flex-col gap-24 px-6 py-12 md:px-10 md:py-16 lg:px-12">
      <Reveal className="block">
        <section id="about">
          <SectionHeading title={tAbout("title")} />
          <p className="max-w-prose" style={{ color: "var(--color-text-muted)" }}>
            {tAbout("bio")}
          </p>
        </section>
      </Reveal>

      <Reveal className="block">
        <section id="skills">
          <SectionHeading title={tExpertise("title")} glow center />
          <div className="mb-10">
            <CoreExpertise
              items={{
                uiux: { title: tExpertise("uiux.title"), description: tExpertise("uiux.description") },
                webdev: { title: tExpertise("webdev.title"), description: tExpertise("webdev.description") },
                qa: { title: tExpertise("qa.title"), description: tExpertise("qa.description") },
              }}
            />
          </div>
          <div className="mb-8">
            <h3 className="mb-3 font-mono text-sm uppercase tracking-wide" style={{ color: "var(--color-text-muted)" }}>
              {tSkills("proficientHeading")}
            </h3>
            <div className="flex flex-wrap gap-2">
              {PROFICIENT_KEYS.map((key) => {
                const label = tSkills(`proficient.${key}`);
                return <SkillTag key={key} label={label} icon={getIconSlug(label)} />;
              })}
            </div>
          </div>
          <div className="mb-8">
            <h3 className="mb-3 font-mono text-sm uppercase tracking-wide" style={{ color: "var(--color-text-muted)" }}>
              {tSkills("familiarHeading")}
            </h3>
            <div className="flex flex-wrap gap-2">
              {FAMILIAR_KEYS.map((key) => {
                const label = tSkills(`familiar.${key}`);
                return <SkillTag key={key} label={label} icon={getIconSlug(label)} />;
              })}
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
      </Reveal>

      <Reveal className="block">
        <section>
          <SectionHeading title={tExperience("title")} />
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
      </Reveal>

      <Reveal className="block">
        <section id="projects">
          <SectionHeading title={tProjects("title")} glow center />
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
      </Reveal>

      <Reveal className="block">
        <section>
          <SectionHeading title={tEducation("title")} />
          <div>
            {education.map((entry) => (
              <EducationItem key={entry.id} entry={entry} locale={locale} />
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal className="block">
        <section>
          <SectionHeading title={tCertifications("title")} />
          <div>
            {certifications.map((entry) => (
              <CertificationItem
                key={entry.id}
                entry={entry}
                locale={locale}
                certificateLabel={tCertifications("certificateLabel")}
              />
            ))}
          </div>
        </section>
      </Reveal>

      <Contact />
      </div>
    </>
  );
}
