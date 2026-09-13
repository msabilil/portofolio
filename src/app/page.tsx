"use client";

import { useTranslations } from "next-intl";
import { HeroSpace } from "@/components/layout/HeroSpace";
import { Contact } from "@/components/layout/Contact";
import { GithubActivity } from "@/components/space/GithubActivity";
import { JourneySection } from "@/components/space/JourneySection";
import { ProfileSection } from "@/components/space/ProfileSection";
import { ProjectShowcase } from "@/components/space/ProjectShowcase";
import { TechSection } from "@/components/space/TechSection";

export default function HomePage() {
  const t = useTranslations("home");
  return (
    <>
      <HeroSpace title={t("title")} description={t("description")} ctaLabel={t("cta")} connectLabel={t("connect")} />
      <ProfileSection />
      <ProjectShowcase />
      <TechSection />
      <GithubActivity />
      <JourneySection />
      <Contact />
    </>
  );
}
