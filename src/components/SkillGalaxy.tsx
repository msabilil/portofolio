import type { ReactNode } from "react";

const SKILL_KEYS = ["javascript", "react", "typescript", "uiux", "qa"] as const;

type SkillKey = (typeof SKILL_KEYS)[number];

type SkillGalaxyProps = {
  title: string;
  items: Record<SkillKey, string>;
};

const SKILL_LEVELS: Record<SkillKey, number> = {
  javascript: 92,
  react: 90,
  typescript: 86,
  uiux: 88,
  qa: 80,
};

const ACCENTS: Record<SkillKey, string> = {
  javascript: "#f7df1e",
  react: "#61dafb",
  typescript: "#3178c6",
  uiux: "#d946ef",
  qa: "#22d3ee",
};

const STARS = [
  { left: "8%", top: "16%", size: "2px" },
  { left: "22%", top: "11%", size: "3px" },
  { left: "42%", top: "18%", size: "2px" },
  { left: "74%", top: "14%", size: "2px" },
  { left: "90%", top: "28%", size: "3px" },
  { left: "14%", top: "48%", size: "2px" },
  { left: "82%", top: "51%", size: "2px" },
  { left: "30%", top: "82%", size: "2px" },
  { left: "68%", top: "88%", size: "3px" },
];

function SkillIcon({ skill }: { skill: SkillKey }) {
  const commonProps = {
    width: 28,
    height: 28,
    viewBox: "0 0 28 28",
    fill: "none",
    "aria-hidden": true,
  } as const;

  const icons: Record<SkillKey, ReactNode> = {
    javascript: <path d="M3 3h22v22H3zM14.7 20.8c.6 1 1.6 1.5 2.8 1.5 1.2 0 2-.6 2-1.4 0-1-.8-1.3-2.1-1.9l-.7-.3c-2-0.8-3.3-1.8-3.3-4 0-2 1.6-3.5 4-3.5 1.7 0 2.9.6 3.8 2.1l-2.1 1.4c-.5-.8-1-1.1-1.7-1.1-.8 0-1.3.5-1.3 1.1 0 .8.5 1.1 1.8 1.7l.7.3c2.3 1 3.6 2.1 3.6 4.2 0 2.4-1.9 3.8-4.6 3.8-2.5 0-4.2-1.2-5-2.9l2.1-1ZM7 11.4v7.2c0 1.5-.6 2.1-1.7 2.1-.6 0-1.1-.2-1.5-.4L3 22.4c.7.5 1.5.8 2.5.8 2.4 0 3.8-1.3 3.8-4.3v-7.5H7Z" fill="currentColor" />,
    react: <><circle cx="14" cy="14" r="2.2" fill="currentColor" /><path d="M14 5.2c3.8 0 6.9 3.9 6.9 8.8s-3.1 8.8-6.9 8.8-6.9-3.9-6.9-8.8S10.2 5.2 14 5.2Z" stroke="currentColor" strokeWidth="1.4" /><path d="M6.4 9.6c1.9-3.3 6.8-3.3 11.1-.8 4.2 2.5 6.2 7 4.3 10.3-1.9 3.3-6.8 3.3-11.1.8-4.2-2.5-6.2-7-4.3-10.3Z" stroke="currentColor" strokeWidth="1.4" transform="rotate(60 14 14)" /></>,
    typescript: <path d="M3 3h22v22H3zM5.8 11.1h6.7v2.2h-2.2v7.6H8v-7.6H5.8v-2.2Zm8.1 7.6c.7.5 1.5.8 2.4.8.8 0 1.3-.3 1.3-.8 0-.4-.3-.6-1.4-1.1l-.6-.2c-1.5-.6-2.4-1.4-2.4-2.9 0-1.6 1.3-2.7 3.2-2.7 1.3 0 2.3.4 3.1 1.2l-1.4 1.7c-.5-.5-1-.7-1.6-.7-.6 0-.9.2-.9.6 0 .4.3.6 1.4 1l.5.2c1.8.7 2.6 1.5 2.6 3 0 1.7-1.3 2.9-3.5 2.9-1.5 0-2.8-.5-3.6-1.3l.9-1.7Z" fill="currentColor" />,
    uiux: <><path d="m5 22 2.2-6.2L18.7 4.3a2 2 0 0 1 2.8 2.8L10 18.6 5 22Z" fill="currentColor" /><path d="m16.4 6.6 3 3M4 24h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></>,
    qa: <><circle cx="14" cy="14" r="9" stroke="currentColor" strokeWidth="1.8" /><path d="m9.5 14 3 3 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></>,
  };

  return <svg {...commonProps}>{icons[skill]}</svg>;
}

export function SkillGalaxy({ title, items }: SkillGalaxyProps) {
  return (
    <div className="relative isolate overflow-hidden rounded-[2rem] border border-[var(--border-glow)] bg-[rgba(5,6,15,0.72)] px-5 py-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_0_28px_rgba(34,211,238,0.1)] sm:px-8">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_38%,rgba(34,211,238,0.15),transparent_36%),radial-gradient(circle_at_12%_85%,rgba(168,85,247,0.14),transparent_32%)]" />
      {STARS.map((star, index) => (
        <span
          key={index}
          aria-hidden="true"
          className="pointer-events-none absolute -z-10 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)]"
          style={{ left: star.left, top: star.top, width: star.size, height: star.size }}
        />
      ))}

      <div className="relative">
        <div className="mb-8 flex items-center justify-center gap-3">
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-[var(--accent-cyan)]" aria-hidden="true" />
          <h3 className="font-heading text-xl font-semibold uppercase tracking-[0.12em] text-[var(--accent-cyan)] text-glow">
            {title}
          </h3>
          <span className="h-px w-10 bg-gradient-to-l from-transparent to-[var(--accent-cyan)]" aria-hidden="true" />
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {SKILL_KEYS.map((skill) => {
            const level = SKILL_LEVELS[skill];
            const accent = ACCENTS[skill];
            return (
              <article
                key={skill}
                aria-label={`${items[skill]}, ${level}% proficiency`}
                className="group rounded-xl border border-white/20 bg-white/[0.07] p-3 backdrop-blur-sm transition-[transform,border-color,box-shadow] duration-[var(--dur-base)] hover:-translate-y-1 hover:border-[var(--accent-cyan)] hover:shadow-[0_0_20px_var(--accent-cyan-glow)] sm:p-4"
              >
                <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg" style={{ color: accent, backgroundColor: `${accent}1f` }}>
                  <SkillIcon skill={skill} />
                </div>
                <h4 className="min-h-10 text-sm font-semibold leading-tight text-white">{items[skill]}</h4>
                <div
                  className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/15"
                  role="progressbar"
                  aria-label={`${items[skill]} proficiency`}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={level}
                >
                  <div className="h-full rounded-full transition-[width] duration-700" style={{ width: `${level}%`, backgroundColor: accent, boxShadow: `0 0 10px ${accent}` }} />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
