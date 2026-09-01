import type { Experience } from "@/content/experience";

type ExperienceItemProps = {
  experience: Experience;
  role: string;
  description: string;
};

export function ExperienceItem({ experience, role, description }: ExperienceItemProps) {
  return (
    <div className="border-b py-6 last:border-b-0" style={{ borderColor: "var(--color-border)" }}>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="font-semibold">
          {role} <span style={{ color: "var(--color-text-muted)" }}>· {experience.place}</span>
        </p>
        <p className="text-xs uppercase tracking-wide" style={{ color: "var(--color-text-muted)" }}>
          {experience.period}
        </p>
      </div>
      <p className="mt-2" style={{ color: "var(--color-text-muted)" }}>
        {description}
      </p>
    </div>
  );
}
