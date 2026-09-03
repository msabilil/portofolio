import Image from "next/image";

// Fixed, full-viewport nebula background behind every page — not
// confined to the Hero section. Sits below the sticky nav too, so the
// nav's glass blur has actual image content to show through instead of
// blurring a flat color, and there's no seam where the Hero's own
// background used to end and the rest of the page began.
export function SpaceBackground() {
  return (
    <div className="fixed inset-0 -z-30" aria-hidden="true">
      <Image
        src="/assets/hero/space-background.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-[var(--bg-dark)]/40" />
    </div>
  );
}
