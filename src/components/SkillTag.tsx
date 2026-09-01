export function SkillTag({ label }: { label: string }) {
  return (
    <span
      className="rounded-full border px-3 py-1 text-sm"
      style={{ borderColor: "var(--color-border)" }}
    >
      {label}
    </span>
  );
}
