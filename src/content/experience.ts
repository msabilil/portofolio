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
        "Built an internal financial application with Next.js, TypeScript, and Firebase for project transactions, procurement, payments, invoices, accounts, and inventory.",
        "Developed the interface, API route handlers, and Firebase data layer, including VAT calculations, debit-credit records, and general ledger, trial balance, balance sheet, and income statement views.",
        "Produced interface mockups in Figma prior to implementation, ensuring the transaction input flow was intuitive for a non-technical finance team, then built it directly into code.",
        "Added admin controls for transaction entry access and Firebase Storage uploads for supporting documents; tested transaction and reporting workflows.",
      ],
      id: [
        "Membangun aplikasi keuangan internal dengan Next.js, TypeScript, dan Firebase untuk transaksi proyek, pengadaan, pembayaran, invoice, akun, dan inventory.",
        "Mengembangkan antarmuka, API route handler, dan penyimpanan Firebase, termasuk perhitungan PPN, pencatatan debit-kredit, serta tampilan buku besar, neraca lajur, neraca, dan laba-rugi.",
        "Membuat mockup antarmuka di Figma sebelum implementasi, memastikan alur input transaksi intuitif untuk tim finance non-teknis, lalu membangunnya langsung ke kode.",
        "Menambahkan kontrol admin untuk akses pencatatan transaksi dan unggah bukti melalui Firebase Storage; menguji alur transaksi serta laporan.",
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
