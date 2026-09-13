"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Contact } from "@/components/layout/Contact";
import { TechSection } from "@/components/space/TechSection";

export default function ToolsPage() {
  const id = useLocale() === "id";
  const t = useTranslations("skills");
  return (
    <div className="subpage lunar-section">
      <div className="container">
        <Link href="/" className="text-button">← {id ? "Kembali ke ruang utama" : "Back to the main space"}</Link>
        <div className="subpage-heading">
          <span className="eyebrow">TOOLS & TECHNOLOGIES</span>
          <h1>{id ? "Perangkat eksplorasi." : "The exploration toolkit."}</h1>
        </div>
        <div className="human-skills">
          <span className="eyebrow">{t("proficientHeading")}</span>
          <p>{["javascript", "typescript", "html5", "css3", "nextjs", "react", "php", "mysql", "nosql", "git"].map((key) => t("proficient." + key)).join(" · ")}</p>
          <span className="eyebrow">{t("familiarHeading")}</span>
          <p>{["vuejs", "elysiajs", "postgresql", "swagger", "postman", "cicdTesting"].map((key) => t("familiar." + key)).join(" · ")}</p>
        </div>
      </div>
      <TechSection />
      <Contact />
    </div>
  );
}
