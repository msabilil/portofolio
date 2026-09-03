"use client";

import { useState } from "react";
import { iconUrl } from "@/lib/techIcons";

export function SkillTag({ label, icon }: { label: string; icon?: string }) {
  const [iconFailed, setIconFailed] = useState(false);

  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm transition-colors duration-[var(--dur-fast)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
      style={{ borderColor: "var(--color-border)" }}
    >
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
