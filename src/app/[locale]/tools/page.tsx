import { useTranslations } from "next-intl";
import { SkillTag } from "@/components/SkillTag";
import { Contact } from "@/components/layout/Contact";
import { SectionHeading } from "@/components/layout/SectionHeading";

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

export default function ToolsPage() {
  const t = useTranslations("skills");

  return (
    <div className="flex flex-col gap-24 py-12 md:py-16">
      <section className="fade-in-up">
        <SectionHeading title={t("title")} />
        <div className="mb-8">
          <h3 className="mb-3 font-mono text-sm uppercase tracking-wide" style={{ color: "var(--color-text-muted)" }}>
            {t("toolsHeading")}
          </h3>
          <div className="flex flex-wrap gap-2">
            {TOOL_KEYS.map((key) => (
              <SkillTag key={key} label={t(`tools.${key}`)} />
            ))}
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
