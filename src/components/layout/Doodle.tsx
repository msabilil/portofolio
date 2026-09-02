export function Doodle({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 160"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden="true"
      className={className}
      style={{ color: "var(--color-accent)", opacity: 0.35 }}
    >
      <path d="M20 90c0-38 30-68 68-68s58 26 48 54-46 24-58 4 12-40 34-30" />
      <circle cx="132" cy="118" r="4" />
      <path d="M22 128c18 10 40 10 56-2" />
    </svg>
  );
}
