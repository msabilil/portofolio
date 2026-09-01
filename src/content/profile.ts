export type SocialLinkId = "email" | "github" | "linkedin" | "instagram";

export type SocialLink = {
  id: SocialLinkId;
  href: string;
};

// linkedin/instagram belum ada URL terverifikasi — tambahkan saat sudah ada.
export const profile = {
  name: "Muhammad Sabilil Fajri",
  social: [
    { id: "email", href: "mailto:muhamadfajri943@gmail.com" },
    { id: "github", href: "https://github.com/msabilil" },
  ] as SocialLink[],
};
