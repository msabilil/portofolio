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
    slug: "financial-management-system",
    title: "Financial Management System",
    description: {
      en: "A structured web system for digitizing transaction input, VAT calculations, journals, master data, and financial reporting.",
      id: "Sistem web terstruktur untuk mendigitalisasi input transaksi, perhitungan PPN, jurnal, master data, dan laporan keuangan.",
    },
    categories: ["ui-ux", "frontend", "backend"],
    tags: ["Next.js", "TypeScript", "Firestore", "Figma"],
    period: "Jul 2024 — Dec 2024",
  },
  {
    slug: "edutive-learning-management-system",
    title: "Edutive Learning Management System",
    description: {
      en: "A role-aware LMS connecting enrollment, classes, teaching, payments, attendance, exams, and report cards.",
      id: "LMS berbasis peran yang menghubungkan registrasi, kelas, pengajaran, pembayaran, kehadiran, ujian, dan report card.",
    },
    categories: ["ui-ux", "frontend", "backend"],
    tags: ["Next.js", "TypeScript", "Express", "PostgreSQL", "Redis"],
  },
  {
    slug: "tiveflow-operations-platform",
    title: "Tiveflow Operations Platform",
    description: {
      en: "An operations platform connecting POS, inventory, branches, finance, budgeting, analytics, and online orders.",
      id: "Platform operasional yang menghubungkan POS, inventory, cabang, finance, budgeting, analytics, dan online order.",
    },
    categories: ["frontend", "backend", "qa"],
    tags: ["Next.js", "React", "TypeScript", "Prisma", "PostgreSQL"],
  },
  {
    slug: "entertainment-operations-platform",
    title: "Entertainment Operations Platform",
    description: {
      en: "A business platform for opportunities, events, production, talent, documents, transactions, and reporting.",
      id: "Platform bisnis untuk peluang, event, produksi, talent, dokumen, transaksi, dan pelaporan.",
    },
    categories: ["frontend", "backend"],
    tags: ["Next.js", "TypeScript", "Express", "PostgreSQL", "Redis"],
  },
];
