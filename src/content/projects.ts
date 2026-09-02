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
    slug: "recyclean",
    title: "RecyClean",
    description: {
      en: "A waste-management companion app concept — UI/UX exploration covering splash screen and core wireframes to help users sort and schedule recycling.",
      id: "Konsep aplikasi pendamping pengelolaan sampah — eksplorasi UI/UX mencakup splash screen dan wireframe inti untuk membantu pengguna memilah dan menjadwalkan daur ulang.",
    },
    tags: ["Mobile App", "UI/UX"],
    cover: "/assets/projects/Recyclean.png",
    link: "https://www.figma.com/design/vtF1lh4iuZiF7idTMvfE79/Recyclean?node-id=17-2336&p=f&m=draw",
  },
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
