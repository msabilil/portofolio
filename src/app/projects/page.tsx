"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { ProjectsFilterGrid } from "@/components/ProjectsFilterGrid";
import { Contact } from "@/components/layout/Contact";
import { projects } from "@/content/projects";

export default function ProjectsPage() {
  const locale = useLocale() as "en" | "id";
  const t = useTranslations("projects");
  return (
    <div className="subpage lunar-section">
      <div className="container">
        <Link href="/" className="text-button">← {locale === "id" ? "Kembali ke ruang utama" : "Back to the main space"}</Link>
        <div className="subpage-heading">
          <span className="eyebrow">MISSION ARCHIVE / 04 PROJECTS</span>
          <h1>{locale === "id" ? "Semua proyek." : "The project gallery."}</h1>
        </div>
        <ProjectsFilterGrid
          projects={projects}
          locale={locale}
          viewLabel={t("viewLink")}
          emptyLabel={t("empty")}
          filterLabels={{ all: t("filter.all"), "ui-ux": t("filter.uiux"), frontend: t("filter.frontend"), backend: t("filter.backend"), qa: t("filter.qa") }}
        />
      </div>
      <Contact />
    </div>
  );
}
