export type Experience = {
  id: string;
  role: { en: string; id: string };
  place: string;
  period: string;
  logo: string;
  description: { en: string[]; id: string[] };
  skills?: string[];
};

export const experience: Experience[] = [
  {
    id: "thetechtive",
    role: { en: "Full Stack Developer Intern", id: "Full Stack Developer Intern" },
    place: "PT. Thetechtive Karya Digital — Bandung, Indonesia",
    period: "May 2026 — Sep 2026",
    logo: "/assets/logos/thetechtive.png",
    description: {
      en: [
        "Developed an ERP system for an entertainment agency, digitizing workflows across brand & marketing, talent and event scheduling, production, and finance.",
        "Designed and developed features end-to-end, from business process analysis and UI/UX design to frontend, backend, and database implementation.",
        "Built frontend and backend services using Next.js, React, TypeScript, Express, Prisma, PostgreSQL, Redis, and Tailwind CSS, including talent schedule conflict detection.",
        "Implemented Jest and Playwright automated testing, containerized services with Docker & Docker Compose, and configured GitHub Actions CI/CD for staging and production deployment.",
      ],
      id: [
        "Mengembangkan sistem ERP untuk agensi entertainment, mendigitalkan alur kerja brand & marketing, penjadwalan talent dan acara, produksi, dan keuangan.",
        "Merancang dan mengembangkan fitur end-to-end, dari analisis proses bisnis dan desain UI/UX sampai implementasi frontend, backend, dan database.",
        "Membangun layanan frontend dan backend menggunakan Next.js, React, TypeScript, Express, Prisma, PostgreSQL, Redis, dan Tailwind CSS, termasuk deteksi bentrok jadwal talent.",
        "Menerapkan automated testing dengan Jest dan Playwright, mengkontainerkan layanan dengan Docker & Docker Compose, serta mengonfigurasi CI/CD GitHub Actions untuk deployment staging dan production.",
      ],
    },
    skills: [
      "Next.js",
      "React",
      "TypeScript",
      "Express",
      "Prisma",
      "PostgreSQL",
      "Redis",
      "Tailwind CSS",
      "Jest",
      "Playwright",
      "Docker",
      "GitHub Actions",
    ],
  },
  {
    id: "indera-sae-pratama",
    role: { en: "Software Engineer Intern", id: "Software Engineer Intern" },
    place: "PT. Indera Sae Pratama — Bandung, Indonesia",
    period: "Jul 2024 — Dec 2024",
    logo: "/assets/logos/indera-sae-pratama.png",
    description: {
      en: [
        "Replaced a manual Excel-based accounting workflow with a financial web application (Next.js, TypeScript, React, Firestore), automating VAT calculations, debit-credit journal entries, and master data management for accounts, projects, and inventory.",
        "Built a complete financial reporting module (general ledger, trial balance, balance sheet, profit and loss statement) directly from live transaction data, working alongside the finance team to align outputs with accounting standards.",
        "Produced interface mockups in Figma prior to implementation, ensuring the transaction input flow was intuitive for a non-technical finance team, then built it directly into code.",
        "Implemented role-based permissions in Firestore to restrict finance module access to authorized users, and performed debugging and stress-testing against real-time transactions to preserve data accuracy ahead of period closing.",
      ],
      id: [
        "Menggantikan alur kerja akuntansi manual berbasis Excel dengan aplikasi web keuangan (Next.js, TypeScript, React, Firestore), mengotomasi perhitungan PPN, jurnal debit-kredit, dan pengelolaan master data akun, proyek, dan inventaris.",
        "Membangun modul laporan keuangan lengkap (general ledger, trial balance, neraca, laporan laba rugi) langsung dari data transaksi live, bekerja sama dengan tim finance untuk menyelaraskan output dengan standar akuntansi.",
        "Membuat mockup antarmuka di Figma sebelum implementasi, memastikan alur input transaksi intuitif untuk tim finance non-teknis, lalu membangunnya langsung ke kode.",
        "Menerapkan role-based permission di Firestore untuk membatasi akses modul finance ke pengguna yang berwenang, serta melakukan debugging dan stress-testing terhadap transaksi real-time demi menjaga akurasi data menjelang tutup periode.",
      ],
    },
    skills: ["Next.js", "React", "TypeScript", "NoSQL (Firestore)", "Figma"],
  },
  {
    id: "arutalalab",
    role: { en: "Fullstack Developer", id: "Fullstack Developer" },
    place: "ArutalaLab — Bandung, Indonesia",
    period: "Aug 2022 — Present",
    logo: "/assets/logos/arutalalab.png",
    description: {
      en: [
        "Collaborated with the design team to create 3 wireframe designs for web.",
        "Collaborating with product managers to ensure seamless integration of designs into the final product.",
        "Analyze user feedback to iterate designs and improve product usability.",
      ],
      id: [
        "Berkolaborasi dengan tim desain membuat 3 desain wireframe untuk web.",
        "Berkolaborasi dengan product manager memastikan integrasi desain ke produk akhir berjalan mulus.",
        "Menganalisis feedback pengguna untuk mengiterasi desain dan meningkatkan usabilitas produk.",
      ],
    },
  },
];
