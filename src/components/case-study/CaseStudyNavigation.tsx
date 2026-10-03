"use client";

import { useEffect, useState } from "react";
import styles from "./CaseStudyPage.module.css";

export function CaseStudyNavigation({
  sections,
  label,
}: {
  sections: { id: string; label: string }[];
  label: string;
}) {
  const [active, setActive] = useState(sections[0]?.id);
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-100px 0px -55% 0px" },
    );
    sections.forEach(({ id }) => {
      const heading = document.getElementById(id);
      if (heading) observer.observe(heading);
    });
    return () => observer.disconnect();
  }, [sections]);
  return (
    <nav className={styles.sidebarNav} aria-label={label}>
      {sections.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          aria-current={active === section.id ? "location" : undefined}
          onClick={() => setActive(section.id)}
        >
          {section.label}
        </a>
      ))}
    </nav>
  );
}
