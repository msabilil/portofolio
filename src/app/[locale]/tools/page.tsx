import { useTranslations } from "next-intl";
import { SkillTag } from "@/components/SkillTag";
import { Contact } from "@/components/layout/Contact";
import { SectionHeading } from "@/components/layout/SectionHeading";
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

export default function ToolsPage() {
  const t = useTranslations("skills");

  return (
    <div className="mx-auto flex w-full max-w-[var(--container-max)] flex-col gap-24 px-6 py-12 md:px-10 md:py-16 lg:px-12">
      <section className="fade-in-up">
        <SectionHeading title={t("title")} />
        <div className="mb-8">
          <h3 className="mb-3 font-mono text-sm uppercase tracking-wide" style={{ color: "var(--color-text-muted)" }}>
            {t("proficientHeading")}
          </h3>
          <div className="flex flex-wrap gap-2">
            {PROFICIENT_KEYS.map((key) => {
              const label = t(`proficient.${key}`);
              return <SkillTag key={key} label={label} icon={getIconSlug(label)} />;
            })}
          </div>
        </div>
        <div className="mb-8">
          <h3 className="mb-3 font-mono text-sm uppercase tracking-wide" style={{ color: "var(--color-text-muted)" }}>
            {t("familiarHeading")}
          </h3>
          <div className="flex flex-wrap gap-2">
            {FAMILIAR_KEYS.map((key) => {
              const label = t(`familiar.${key}`);
              return <SkillTag key={key} label={label} icon={getIconSlug(label)} />;
            })}
          </div>
        </div>
        <div className="mb-8">
          <h3 className="mb-3 font-mono text-sm uppercase tracking-wide" style={{ color: "var(--color-text-muted)" }}>
            {t("softHeading")}
          </h3>
          <div className="flex flex-wrap gap-2">
            {SOFT_KEYS.map((key) => (
              <SkillTag key={key} label={t(`soft.${key}`)} />
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-3 font-mono text-sm uppercase tracking-wide" style={{ color: "var(--color-text-muted)" }}>
            {t("languagesHeading")}
          </h3>
          <div className="flex flex-wrap gap-2">
            {LANGUAGE_KEYS.map((key) => (
              <SkillTag key={key} label={t(`languages.${key}`)} />
            ))}
          </div>
        </div>
      </section>

      <Contact />
    </div>
  );
}
