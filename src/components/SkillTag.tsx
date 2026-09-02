export function SkillTag({ label }: { label: string }) {
  return (
    <span
      className="rounded-full border px-3 py-1 text-sm transition-colors duration-[var(--dur-fast)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
      style={{ borderColor: "var(--color-border)" }}
    >
      {label}
    </span>
  );
}
