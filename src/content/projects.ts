export type Project = {
  slug: string;
  title: string;
  description: { en: string; id: string };
  tags: string[];
  cover?: string; // path relatif ke public/assets/projects/<slug>/ — opsional, ada fallback visual
  link?: string;
};

// Tambah project baru di sini. Cover (opsional) diambil dari
// public/assets/projects/<slug>/cover.jpg — kalau belum ada, ProjectCard
// otomatis pakai placeholder monokrom.
export const projects: Project[] = [
  {
    slug: "arutalalab",
    title: "ArutalaLab",
    description: {
      en: "An IT services platform bringing together training, tech talent placement, and custom software development under one product.",
      id: "Platform layanan IT yang menggabungkan pelatihan, penyaluran talenta teknologi, dan pengembangan software custom dalam satu produk.",
    },
    tags: ["Next.js", "TypeScript"],
    link: "https://arutalalab.vercel.app",
  },
  {
    slug: "penjadwalan-produksi",
    title: "Production Scheduling System",
    description: {
      en: "A web app for planning and tracking production schedules, built to replace a manual spreadsheet-based workflow.",
      id: "Aplikasi web untuk merencanakan dan melacak jadwal produksi, dibuat untuk menggantikan alur kerja manual berbasis spreadsheet.",
    },
    tags: ["PHP", "Web App"],
    link: "https://github.com/msabilil/penjadwalan-produksi-tmu",
  },
  {
    slug: "mental-health-app",
    title: "Mental Health App",
    description: {
      en: "An Android app concept for tracking mood and mental well-being day to day.",
      id: "Konsep aplikasi Android untuk melacak suasana hati dan kesejahteraan mental sehari-hari.",
    },
    tags: ["Kotlin", "Android"],
    link: "https://github.com/msabilil/MentalHealth",
  },
];
