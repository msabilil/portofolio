export type Project = {
  slug: string;
  title: string;
  description: { en: string; id: string };
  tags: string[];
  cover: string;
  link?: string;
};

// Tambah project baru di sini. Cover diambil dari public/assets/projects/<slug>/cover.jpg
export const projects: Project[] = [
  {
    slug: "sample-project",
    title: "Sample Project",
    description: {
      en: "Placeholder description — replace with a real case study once assets are uploaded.",
      id: "Deskripsi placeholder — ganti dengan studi kasus asli setelah aset diunggah.",
    },
    tags: ["UI Design", "Figma"],
    cover: "/assets/projects/sample-project/cover.jpg",
  },
];
