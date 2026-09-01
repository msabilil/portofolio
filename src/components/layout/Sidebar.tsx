import Image from "next/image";
import { useTranslations } from "next-intl";
import { profile } from "@/content/profile";
import { LanguageToggle } from "./LanguageToggle";
import { SocialLinks } from "./SocialLinks";

export function Sidebar() {
  const t = useTranslations("sidebar");

  return (
    <aside
      className="flex shrink-0 flex-row items-center gap-4 rounded-[var(--radius-md)] border p-4 md:sticky md:top-1/2 md:w-[var(--sidebar-w)] md:-translate-y-1/2 md:flex-col md:items-start md:gap-6 md:p-8"
      style={{ borderColor: "var(--color-border)" }}
    >
      <Image
        src="/assets/photos/profile.jpg"
        alt={profile.name}
        width={80}
        height={80}
        className="rounded-full border object-cover"
        style={{ borderColor: "var(--color-border)" }}
      />
      <div>
        <p className="font-semibold leading-tight">{profile.name}</p>
        <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>{t("roleLabel")}</p>
      </div>
      <SocialLinks />
      <LanguageToggle />
    </aside>
  );
}
