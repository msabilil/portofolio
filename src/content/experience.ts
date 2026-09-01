export type Experience = {
  id: string;
  role: { en: string; id: string };
  place: string;
  period: string;
  description: { en: string; id: string };
};

// Placeholder — ganti dengan pengalaman asli.
export const experience: Experience[] = [
  {
    id: "placeholder-1",
    role: { en: "UI/UX Designer", id: "UI/UX Designer" },
    place: "Placeholder Company",
    period: "2024 — Present",
    description: {
      en: "Placeholder description — replace with real experience details once available.",
      id: "Deskripsi placeholder — ganti dengan detail pengalaman asli setelah tersedia.",
    },
  },
];
