import Image from "next/image";
import { useTranslations } from "next-intl";
import { profile } from "@/content/profile";
import { LanguageToggle } from "./LanguageToggle";
import { ThemeToggle } from "./ThemeToggle";
import { SocialLinks } from "./SocialLinks";

export function Sidebar({ theme }: { theme: "light" | "dark" }) {
  const t = useTranslations("sidebar");

  return (
    <aside
      className="flex shrink-0 flex-row items-center gap-4 rounded-[var(--radius-md)] border border-[var(--color-border)] p-4 shadow-[var(--shadow-sm)] md:sticky md:top-1/2 md:w-[var(--sidebar-w)] md:-translate-y-1/2 md:flex-col md:items-start md:gap-6 md:p-8"
    >
      <Image
        src="/assets/photos/itsme.jpg"
        alt={profile.name}
        width={112}
        height={112}
        className="rounded-[var(--radius-md)] border border-[var(--color-border)] object-cover object-[center_20%]"
      />
      <div>
        <p className="text-lg font-bold leading-tight tracking-[-0.01em]">{profile.name}</p>
        <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>{t("roleLabel")}</p>
      </div>
      <SocialLinks />
      <div className="flex items-center gap-4">
        <LanguageToggle />
        <ThemeToggle initialTheme={theme} />
      </div>
    </aside>
  );
}
