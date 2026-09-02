export type SocialLinkId = "email" | "github" | "linkedin" | "instagram";

export type SocialLink = {
  id: SocialLinkId;
  href: string;
};

// instagram belum ada URL terverifikasi — tambahkan saat sudah ada.
export const profile = {
  name: "Muhammad Sabilil Fajri",
  social: [
    { id: "email", href: "mailto:muhamadfajri943@gmail.com" },
    { id: "github", href: "https://github.com/msabilil" },
    { id: "linkedin", href: "https://www.linkedin.com/in/muhammad-sabilil-fajri/" },
  ] as SocialLink[],
};
