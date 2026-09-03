import type { Education } from "@/content/education";

type EducationItemProps = {
  entry: Education;
  locale: "en" | "id";
};

export function EducationItem({ entry, locale }: EducationItemProps) {
  return (
    <div className="flex flex-col gap-1 border-b py-6 last:border-b-0" style={{ borderColor: "var(--color-border)" }}>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="font-semibold">
          {entry.degree[locale]} <span style={{ color: "var(--color-text-muted)" }}>· {entry.institution}</span>
        </p>
        <p
          className="font-mono text-xs uppercase tracking-wide tabular-nums"
          style={{ color: "var(--color-text-muted)" }}
        >
          {entry.period}
        </p>
      </div>
      <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
        {entry.gpa}
      </p>
      <p className="mt-1 text-sm" style={{ color: "var(--color-text-muted)" }}>
        {entry.coursework[locale].join(" · ")}
      </p>
    </div>
  );
}
