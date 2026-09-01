import { useTranslations } from "next-intl";
import { profile } from "@/content/profile";
import type { SocialLinkId } from "@/content/profile";

const LABEL_KEYS: Record<SocialLinkId, string> = {
  email: "emailLabel",
  github: "githubLabel",
  linkedin: "linkedinLabel",
  instagram: "instagramLabel",
};

export function SocialLinks() {
  const t = useTranslations("social");

  return (
    <ul className="flex gap-3">
      {profile.social.map((link) => (
        <li key={link.id}>
          <a
            href={link.href}
            target={link.id === "email" ? undefined : "_blank"}
            rel={link.id === "email" ? undefined : "noopener noreferrer"}
            aria-label={t(LABEL_KEYS[link.id])}
            style={{ color: "var(--color-text-muted)" }}
          >
            {t(LABEL_KEYS[link.id])}
          </a>
        </li>
      ))}
    </ul>
  );
}
