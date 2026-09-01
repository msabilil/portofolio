import { useTranslations } from "next-intl";
import { profile } from "@/content/profile";
import type { SocialLinkId } from "@/content/profile";

const LABEL_KEYS: Record<SocialLinkId, string> = {
  email: "emailLabel",
  github: "githubLabel",
  linkedin: "linkedinLabel",
  instagram: "instagramLabel",
};

function EmailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <rect x="2" y="4" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2.5 5l6.5 5 6.5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path
        d="M9 1.5a7.5 7.5 0 0 0-2.37 14.62c.37.07.51-.16.51-.36v-1.4c-2.09.45-2.53-.9-2.53-.9-.34-.87-.83-1.1-.83-1.1-.68-.46.05-.45.05-.45.75.05 1.15.77 1.15.77.67 1.14 1.75.82 2.18.62.07-.48.26-.82.48-1-1.68-.19-3.44-.84-3.44-3.72 0-.82.29-1.5.77-2.02-.08-.19-.34-.96.07-2 0 0 .63-.2 2.06.77a7.1 7.1 0 0 1 3.75 0c1.43-.97 2.06-.77 2.06-.77.41 1.04.15 1.81.07 2 .48.52.77 1.2.77 2.02 0 2.89-1.76 3.53-3.45 3.71.27.24.51.7.51 1.42v2.1c0 .2.14.44.52.36A7.5 7.5 0 0 0 9 1.5Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <rect x="1.5" y="1.5" width="15" height="15" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5.5 7.5v5M5.5 5.5v.01M8.5 12.5v-3c0-1 .6-1.7 1.6-1.7s1.4.7 1.4 1.7v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <rect x="1.5" y="1.5" width="15" height="15" rx="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="9" cy="9" r="3.2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="13" cy="5" r="0.8" fill="currentColor" />
    </svg>
  );
}

const ICONS: Record<SocialLinkId, () => React.JSX.Element> = {
  email: EmailIcon,
  github: GithubIcon,
  linkedin: LinkedinIcon,
  instagram: InstagramIcon,
};

export function SocialLinks() {
  const t = useTranslations("social");

  return (
    <ul className="flex gap-4">
      {profile.social.map((link) => {
        const Icon = ICONS[link.id];
        return (
          <li key={link.id}>
            <a
              href={link.href}
              target={link.id === "email" ? undefined : "_blank"}
              rel={link.id === "email" ? undefined : "noopener noreferrer"}
              aria-label={t(LABEL_KEYS[link.id])}
              style={{ color: "var(--color-text-muted)" }}
            >
              <Icon />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
