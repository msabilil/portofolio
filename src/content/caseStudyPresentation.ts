import type { LocalizedText } from "./caseStudies";

type Presentation = {
  cover: string;
  coverAlt: LocalizedText;
  flow: LocalizedText[];
};

const flows: Record<string, [string, string][]> = {
  "penjadwalan-produksi": [
    ["Pesanan", "Orders"],
    ["Estimasi", "Estimation"],
    ["Tinjau ulang", "Review"],
    ["Penjadwalan", "Scheduling"],
  ],
  "financial-management-system": [
    ["Transaksi", "Transactions"],
    ["Validasi", "Validation"],
    ["Jurnal", "Journals"],
    ["Laporan", "Reports"],
  ],
  "edutive-learning-management-system": [
    ["Pendaftaran", "Enrollment"],
    ["Kelas", "Classes"],
    ["Evaluasi", "Assessment"],
    ["Rapor", "Report cards"],
  ],
  "tiveflow-operations-platform": [
    ["Pesanan", "Orders"],
    ["Persediaan", "Inventory"],
    ["Transaksi", "Transactions"],
    ["Laporan", "Reports"],
  ],
  "entertainment-operations-platform": [
    ["Peluang", "Opportunities"],
    ["Acara", "Events"],
    ["Produksi", "Production"],
    ["Laporan", "Reports"],
  ],
  recyclean: [
    ["Kenali sampah", "Identify waste"],
    ["Pilah", "Sort"],
    ["Rencanakan", "Plan"],
    ["Daur ulang", "Recycle"],
  ],
};

// These are explicitly illustrative editorial assets, not original project evidence.
export function getCaseStudyPresentation(slug: string): Presentation {
  const production = slug === "penjadwalan-produksi";
  return {
    cover: production
      ? "/assets/case-studies/print-planning.webp"
      : "/assets/case-studies/design-process.webp",
    coverAlt: production
      ? {
          id: "Ilustrasi buku dan lembar cetak untuk konteks penjadwalan produksi",
          en: "Illustrative books and print proofs for production planning",
        }
      : {
          id: "Ilustrasi lembar rancangan alur dan wireframe",
          en: "Illustrative workflow sketches and wireframe sheets",
        },
    flow: (
      flows[slug] ?? [
        ["Input", "Input"],
        ["Proses", "Process"],
        ["Hasil", "Output"],
      ]
    ).map(([id, en]) => ({ id, en })),
  };
}
