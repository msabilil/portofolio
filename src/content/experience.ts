export type Experience = {
  id: string;
  role: { en: string; id: string };
  place: string;
  period: string;
  description: { en: string[]; id: string[] };
};

export const experience: Experience[] = [
  {
    id: "arutalalab",
    role: { en: "Fullstack Developer", id: "Fullstack Developer" },
    place: "ArutalaLab — Bandung, Indonesia",
    period: "Aug 2022 — Present",
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
  {
    id: "indera-sae-pratama",
    role: { en: "Software Engineer", id: "Software Engineer" },
    place: "PT. Indera Sae Pratama — Bandung, Indonesia",
    period: "Jan 2022 — Jul 2022",
    description: {
      en: [
        "Conduct user research through usability testing to inform UI/UX design decisions.",
        "Design high-fidelity wireframes, prototypes, and UI components using Figma, ensuring that designs align with user needs and business objectives.",
        "Collaborating with product managers to ensure seamless integration of designs into the final product.",
      ],
      id: [
        "Melakukan riset pengguna lewat usability testing untuk mendukung keputusan desain UI/UX.",
        "Mendesain wireframe hi-fi, prototipe, dan komponen UI menggunakan Figma, memastikan desain sesuai kebutuhan pengguna dan tujuan bisnis.",
        "Berkolaborasi dengan product manager memastikan integrasi desain ke produk akhir berjalan mulus.",
      ],
    },
  },
];
