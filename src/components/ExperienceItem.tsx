import type { Experience } from "@/content/experience";
import Image from "next/image";
import { SkillTag } from "@/components/SkillTag";
import { getIconSlug } from "@/lib/techIcons";

type ExperienceItemProps = {
  experience: Experience;
  role: string;
  description: string[];
};

export function ExperienceItem({
  experience,
  role,
  description,
}: ExperienceItemProps) {
  return (
    <div
      className="flex gap-4 border-b py-6 last:border-b-0"
      style={{ borderColor: "var(--color-border)" }}
    >
      <Image
        src={experience.logo}
        width={48}
        height={48}
        alt=""
        aria-hidden="true"
        className="h-12 w-12 shrink-0 rounded-[var(--radius-sm)] border object-contain p-1.5"
        style={{ borderColor: "var(--color-border)" }}
      />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <p className="font-semibold">
            {role}{" "}
            <span style={{ color: "var(--color-text-muted)" }}>
              · {experience.place}
            </span>
          </p>
          <p
            className="font-mono text-xs uppercase tracking-wide tabular-nums"
            style={{ color: "var(--color-text-muted)" }}
          >
            {experience.period}
          </p>
        </div>
        <ul
          className="mt-2 list-disc space-y-1 pl-5"
          style={{ color: "var(--color-text-muted)" }}
        >
          {description.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
        {experience.skills && experience.skills.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {experience.skills.map((skill) => (
              <SkillTag key={skill} label={skill} icon={getIconSlug(skill)} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
