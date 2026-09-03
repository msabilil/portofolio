export type Certification = {
  id: string;
  title: { en: string; id: string };
  issuer: string;
  period: string;
  certificate: string;
  coursework: { en: string[]; id: string[] };
};

export const certifications: Certification[] = [
  {
    id: "dicoding-fe-be",
    title: {
      en: "Independent Study — Front-end Expert & Back-end Web Developer",
      id: "Studi Independen — Front-end Expert & Back-end Web Developer",
    },
    issuer: "Dicoding Indonesia — Bandung, Indonesia",
    period: "Feb 2023 — Aug 2023",
    certificate: "Certificate of Completion",
    coursework: {
      en: [
        "Mobile First Approach",
        "JavaScript Clean Code",
        "Progressive Web Apps",
        "Automation Testing",
        "Web Performance",
        "Deployment with CI/CD",
        "API CRUD",
      ],
      id: [
        "Pendekatan Mobile First",
        "JavaScript Clean Code",
        "Progressive Web Apps",
        "Automation Testing",
        "Web Performance",
        "Deployment dengan CI/CD",
        "API CRUD",
      ],
    },
  },
  {
    id: "bnsp-junior-web",
    title: {
      en: "Junior Web Programming",
      id: "Junior Web Programming",
    },
    issuer: "Badan Nasional Sertifikasi Profesi — Yogyakarta, Indonesia",
    period: "Mar 2025",
    certificate: "Certificate of Completion",
    coursework: {
      en: [
        "Using Data Structures",
        "Implementing User Interface",
        "Writing Code with Guidelines and Best Practices",
        "Implementing Structured Programming",
        "Using Pre-Existing Libraries/Components",
        "Program Code Documentation",
        "Debugging",
      ],
      id: [
        "Menggunakan Struktur Data",
        "Mengimplementasikan User Interface",
        "Menulis Kode Sesuai Guideline & Best Practice",
        "Mengimplementasikan Pemrograman Terstruktur",
        "Menggunakan Library/Komponen yang Sudah Ada",
        "Dokumentasi Kode Program",
        "Debugging",
      ],
    },
  },
];
