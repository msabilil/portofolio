import type { Experience } from "@/content/experience";

type ExperienceItemProps = {
  experience: Experience;
  role: string;
  description: string[];
};

export function ExperienceItem({ experience, role, description }: ExperienceItemProps) {
  return (
    <div className="flex gap-4 border-b py-6 last:border-b-0" style={{ borderColor: "var(--color-border)" }}>
      <img
        src={experience.logo}
        alt=""
        aria-hidden="true"
        className="h-12 w-12 shrink-0 rounded-[var(--radius-sm)] border object-cover"
        style={{ borderColor: "var(--color-border)" }}
      />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <p className="font-semibold">
            {role} <span style={{ color: "var(--color-text-muted)" }}>· {experience.place}</span>
          </p>
          <p
            className="font-mono text-xs uppercase tracking-wide tabular-nums"
            style={{ color: "var(--color-text-muted)" }}
          >
            {experience.period}
          </p>
        </div>
        <ul className="mt-2 list-disc space-y-1 pl-5" style={{ color: "var(--color-text-muted)" }}>
          {description.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
