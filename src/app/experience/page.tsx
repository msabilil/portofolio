"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { ExperienceItem } from "@/components/ExperienceItem";
import { Contact } from "@/components/layout/Contact";
import { experience } from "@/content/experience";

export default function ExperiencePage() {
  const locale = useLocale() as "en" | "id";
  return (
    <div className="subpage lunar-section">
      <div className="container">
        <Link href="/#journey" className="text-button">← {locale === "id" ? "Kembali ke perjalanan" : "Back to the journey"}</Link>
        <div className="subpage-heading">
          <span className="eyebrow">THE FLIGHT LOG</span>
          <h1>{locale === "id" ? "Pengalaman kerja." : "Work experience."}</h1>
        </div>
        {experience.map((entry) => (
          <article className="subpage-experience panel" key={entry.id}>
            <ExperienceItem experience={entry} role={entry.role[locale]} description={entry.description[locale]} />
          </article>
        ))}
      </div>
      <Contact />
    </div>
  );
}
