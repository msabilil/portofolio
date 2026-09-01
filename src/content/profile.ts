export type SocialLinkId = "email" | "github" | "linkedin" | "instagram";

export type SocialLink = {
  id: SocialLinkId;
  href: string;
};

// Ganti href github/linkedin/instagram dengan URL profil asli sebelum publish.
export const profile = {
  name: "Muhamad Fajri",
  social: [
    { id: "email", href: "mailto:muhamadfajri943@gmail.com" },
    { id: "github", href: "https://github.com/" },
    { id: "linkedin", href: "https://linkedin.com/" },
    { id: "instagram", href: "https://instagram.com/" },
  ] as SocialLink[],
};
