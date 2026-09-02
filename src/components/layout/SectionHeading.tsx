export function SectionHeading({ number, title }: { number: string; title: string }) {
  return (
    <h2 className="mb-8 flex items-baseline gap-3 text-[32px] font-semibold tracking-[-0.01em]">
      <span className="font-mono text-base font-normal" style={{ color: "var(--color-text-muted)" }}>
        {number}
      </span>
      {title}
    </h2>
  );
}
