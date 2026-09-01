"use client";

import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { profile } from "@/content/profile";
import { Drawer } from "./Drawer";
import { LanguageToggle } from "./LanguageToggle";
import { NavLinks } from "./NavLinks";
import { SocialLinks } from "./SocialLinks";

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M2 5h16M2 10h16M2 15h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function MobileHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("drawer");

  return (
    <header
      className="flex items-center justify-between border-b p-4 md:hidden"
      style={{ borderColor: "var(--color-border)" }}
    >
      <div className="flex items-center gap-2">
        <Image src="/assets/photos/profile.jpg" alt={profile.name} width={32} height={32} className="rounded-full" />
        <span className="font-semibold">{profile.name}</span>
      </div>
      <button type="button" aria-label={t("openLabel")} aria-expanded={isOpen} onClick={() => setIsOpen(true)}>
        <MenuIcon />
      </button>
      <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} closeLabel={t("closeLabel")}>
        <NavLinks onNavigate={() => setIsOpen(false)} />
        <SocialLinks />
        <LanguageToggle />
      </Drawer>
    </header>
  );
}
