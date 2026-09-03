type SectionHeadingProps = {
  title: string;
  glow?: boolean;
  center?: boolean;
};

export function SectionHeading({ title, glow, center }: SectionHeadingProps) {
  return (
    <h2
      className={
        "mb-8 text-[32px] font-semibold tracking-[-0.01em] " +
        (glow ? "font-heading text-glow text-[var(--accent-cyan)] " : "") +
        (center ? "text-center" : "")
      }
    >
      {title}
    </h2>
  );
}
