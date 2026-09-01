import Image from "next/image";
import { useTranslations } from "next-intl";
import { profile } from "@/content/profile";
import { LanguageToggle } from "./LanguageToggle";
import { NavLinks } from "./NavLinks";
import { SocialLinks } from "./SocialLinks";

export function Sidebar() {
  const t = useTranslations("sidebar");

  return (
    <aside
      className="hidden shrink-0 md:sticky md:top-0 md:flex md:h-screen md:w-[var(--sidebar-w)] md:flex-col md:gap-8 md:border-r md:py-16 md:pr-8"
      style={{ borderColor: "var(--color-border)" }}
    >
      <Image
        src="/assets/photos/profile.jpg"
        alt={profile.name}
        width={96}
        height={96}
        className="rounded-full"
      />
      <div>
        <p className="text-lg font-semibold">{profile.name}</p>
        <p style={{ color: "var(--color-text-muted)" }}>{t("roleLabel")}</p>
      </div>
      <SocialLinks />
      <LanguageToggle />
      <NavLinks />
    </aside>
  );
}
