import { SkillTag } from "@/components/SkillTag";
import { getIconSlug } from "@/lib/techIcons";

const KEYS = ["uiux", "webdev", "qa"] as const;

const ICON_PATHS: Record<(typeof KEYS)[number], React.ReactNode> = {
  uiux: (
    <>
      <path d="M4 20 15 9l3.5 3.5L7 21H4v-3Z" />
      <path d="M13.5 6.5 17.5 10.5" />
      <path d="M17 6l1.5-1.5L21 7 19.5 8.5 17 6Z" />
    </>
  ),
  webdev: (
    <>
      <path d="m9 8-5 4 5 4" />
      <path d="m15 8 5 4-5 4" />
    </>
  ),
  qa: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12.5 2.5 2.5L16 9.5" />
    </>
  ),
};

// Highlight tags per discipline — a curated subset, not the full skill list
// (the exhaustive Proficient/Familiar breakdown lives below this section).
const HIGHLIGHT_TAGS: Record<(typeof KEYS)[number], string[]> = {
  uiux: ["Figma"],
  webdev: ["Next.js", "React", "TypeScript", "PHP", "MySQL", "Git"],
  qa: ["Jest", "Playwright", "GitHub Actions"],
};

function ExpertiseIcon({ variant }: { variant: (typeof KEYS)[number] }) {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICON_PATHS[variant]}
    </svg>
  );
}

type CoreExpertiseProps = {
  items: Record<(typeof KEYS)[number], { title: string; description: string }>;
};

export function CoreExpertise({ items }: CoreExpertiseProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {KEYS.map((key) => (
        <div
          key={key}
          className="flex flex-col rounded-[var(--radius-md)] border border-[var(--border-glow)] bg-[var(--bg-dark)]/40 p-6 transition-[transform,border-color,box-shadow] duration-[var(--dur-base)] ease-[var(--ease-out)] hover:-translate-y-1 hover:border-[var(--accent-cyan)] hover:shadow-[0_0_28px_var(--accent-cyan-glow)]"
        >
          <div style={{ color: "var(--accent-cyan)" }}>
            <ExpertiseIcon variant={key} />
          </div>
          <h3 className="mt-4 font-semibold">{items[key].title}</h3>
          <p className="mt-2 text-sm" style={{ color: "var(--color-text-muted)" }}>
            {items[key].description}
          </p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {HIGHLIGHT_TAGS[key].map((tag) => (
              <SkillTag key={tag} label={tag} icon={getIconSlug(tag)} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
