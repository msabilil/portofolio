import { useTranslations } from "next-intl";
import { SkillTag } from "@/components/SkillTag";

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

export default function SkillsPage() {
  const t = useTranslations("skills");

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">{t("title")}</h1>
      <section className="mb-8">
        <h2 className="mb-3 text-sm uppercase tracking-wide" style={{ color: "var(--color-text-muted)" }}>
          {t("toolsHeading")}
        </h2>
        <div className="flex flex-wrap gap-2">
          {TOOL_KEYS.map((key) => (
            <SkillTag key={key} label={t(`tools.${key}`)} />
          ))}
        </div>
      </section>
      <section>
        <h2 className="mb-3 text-sm uppercase tracking-wide" style={{ color: "var(--color-text-muted)" }}>
          {t("softHeading")}
        </h2>
        <div className="flex flex-wrap gap-2">
          {SOFT_KEYS.map((key) => (
            <SkillTag key={key} label={t(`soft.${key}`)} />
          ))}
        </div>
      </section>
    </div>
  );
}
