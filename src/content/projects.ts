export type ProjectCategory = "ui-ux" | "frontend" | "backend" | "qa";

export type Project = {
  slug: string;
  title: string;
  description: { en: string; id: string };
  categories: ProjectCategory[];
  tags: string[];
  cover?: string; // path relatif ke public/assets/projects/<slug>/ — opsional, ada fallback visual
  link?: string;
  period?: string;
};

// Tambah project baru di sini. Cover (opsional) diambil dari
// public/assets/projects/<slug>/cover.jpg — kalau belum ada, ProjectCard
// otomatis pakai placeholder monokrom.
export const projects: Project[] = [
  {
    slug: "recyclean",
    title: "RecyClean",
    description: {
      en: "A UI/UX exploration to help people sort waste and plan their recycling. This app concept covers the splash screen and wireframes for its key workflows.",
      id: "Eksplorasi UI/UX untuk membantu orang memilah sampah dan merencanakan daur ulang. Konsep ini mencakup layar pembuka serta wireframe alur utama aplikasi.",
    },
    categories: ["ui-ux"],
    tags: ["Mobile App", "UI/UX"],
    cover: "/assets/projects/Recyclean.png",
    link: "https://www.figma.com/design/vtF1lh4iuZiF7idTMvfE79/Recyclean?node-id=17-2336&p=f&m=draw",
  },
  {
    slug: "arutalalab",
    title: "ArutalaLab",
    description: {
      en: "A platform bringing together training, tech talent placement, and custom software development. The project connects ArutalaLab’s three services in one web experience.",
      id: "Platform yang menyatukan pelatihan, penyaluran talenta teknologi, dan pengembangan perangkat lunak sesuai kebutuhan. Proyek ini menghubungkan ketiga layanan ArutalaLab dalam satu pengalaman web.",
    },
    categories: ["frontend", "backend"],
    tags: ["Next.js", "TypeScript"],
    link: "https://arutalalab.vercel.app",
  },
  {
    slug: "penjadwalan-produksi",
    title: "Production Scheduling System",
    description: {
      en: "A thesis project connecting sales, design, and production teams in a shared scheduling system. Production time is estimated from design specifications and machine capacity, replacing manual guesswork.",
      id: "Sistem penjadwalan produksi untuk proyek skripsi yang menghubungkan tim sales, desain, dan produksi. Estimasi waktu dihitung dari spesifikasi desain dan kapasitas mesin, menggantikan perkiraan manual.",
    },
    categories: ["ui-ux", "frontend", "backend"],
    tags: ["PHP", "MySQL", "Tailwind CSS", "Web App"],
    link: "https://github.com/msabilil/penjadwalan-produksi-tmu",
    period: "Feb 2025 — Aug 2025",
  },
  {
    slug: "mental-health-app",
    title: "Mental Health App",
    description: {
      en: "An Android app for keeping track of daily moods and habits.",
      id: "Aplikasi Android untuk mencatat suasana hati dan kebiasaan harian.",
    },
    categories: ["frontend"],
    tags: ["Kotlin", "Android"],
    link: "https://github.com/msabilil/MentalHealth",
  },
];
