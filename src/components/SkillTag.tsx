"use client";

import { useState } from "react";
import { iconUrl } from "@/lib/techIcons";

export function SkillTag({ label, icon }: { label: string; icon?: string }) {
  const [iconFailed, setIconFailed] = useState(false);

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-glow)] px-3 py-1 text-sm text-[var(--color-text-muted)] transition-[transform,box-shadow,color,border-color] duration-[var(--dur-fast)] hover:-translate-y-0.5 hover:border-[var(--accent-cyan)] hover:text-white hover:shadow-[0_0_14px_var(--accent-cyan-glow)]">
      {icon && !iconFailed && (
        <img
          src={iconUrl(icon)}
          alt=""
          aria-hidden="true"
          className="h-3.5 w-3.5 shrink-0 opacity-70"
          onError={() => setIconFailed(true)}
        />
      )}
      {label}
    </span>
  );
}
