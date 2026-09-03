export type Education = {
  id: string;
  degree: { en: string; id: string };
  institution: string;
  period: string;
  gpa: string;
  coursework: { en: string[]; id: string[] };
};

export const education: Education[] = [
  {
    id: "unikom",
    degree: { en: "Bachelor's Degree in Informatics Engineering", id: "Sarjana Teknik Informatika" },
    institution: "Universitas Komputer Indonesia — Bandung, Indonesia",
    period: "Oct 2021 — Nov 2025",
    gpa: "GPA 3.51/4.00 (Cumlaude)",
    coursework: {
      en: [
        "Programming & Algorithm",
        "Data Structures",
        "Object-Oriented Programming",
        "Software Engineering",
        "Human-Computer Interaction",
      ],
      id: [
        "Pemrograman & Algoritma",
        "Struktur Data",
        "Pemrograman Berorientasi Objek",
        "Rekayasa Perangkat Lunak",
        "Interaksi Manusia & Komputer",
      ],
    },
  },
];
