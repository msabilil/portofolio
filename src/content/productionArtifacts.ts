import type { LocalizedText } from "./caseStudies";
import sizes from "./productionAssetSizes.json";

export type ProductionArtifact = {
  src: string;
  width: number;
  height: number;
  label: LocalizedText;
  caption: LocalizedText;
};

function artifact(name: string, id: string, en: string, captionId: string, captionEn: string): ProductionArtifact {
  const dimensions = sizes[name as keyof typeof sizes];
  return { ...dimensions, src: `/assets/projects/penjadwalan-produksi/${name}.png`, label: { id, en }, caption: { id: captionId, en: captionEn } };
}

export const estimationChart = artifact("gantt-estimation-april", "Gantt estimasi pesanan April 2024", "April 2024 order estimation Gantt", "Contoh April: durasi dan perkiraan tanggal selesai untuk setiap pesanan sebelum melihat rincian urutan proses produksi.", "April example: duration and expected completion date for each order before reviewing the production process sequence.");
export const productionChart = artifact("gantt-production-april", "Jadwal produksi per proses", "Production schedule by process", "Cuplikan April: Fikih Kelas 5 (1 hari), Mewarnai Sayuran (4 hari), dan Sosial Media (15 hari). Baris memperlihatkan desain, plat, setup, cetak, laminasi, jilid, QC, dan packing.", "April excerpt: Fikih Kelas 5 (1 day), Mewarnai Sayuran (4 days), and Sosial Media (15 days). Rows show design, plate, setup, printing, lamination, binding, QC, and packing.");

export const productionArtifactGroups = [
  {
    label: { id: "Data sampel · April 2024", en: "Sample data · April 2024" },
    detail: { id: "18 pesanan sebagai contoh input: spesifikasi produk, halaman, sisi, desain, cover, warna, finishing, jumlah, dan tanggal. Spesifikasi ini menjadi input perhitungan estimasi.", en: "18 orders illustrating the inputs: product specifications, pages, sides, design, cover, color, finishing, quantity, and dates. These specifications inform the duration estimates." },
    images: [1, 2, 3].map((page) => artifact(`sample-april-${page}`, `Data sampel April · bagian ${page}`, `April sample data · part ${page}`, `Tabel asli tesis, bagian ${page} dari 3.`, `Original thesis table, part ${page} of 3.`)),
  },
  {
    label: { id: "Model data · ERD dan skema relasi", en: "Data model · ERD and relational schema" },
    detail: { id: "Pesanan terhubung ke file cetak dan estimasi; rincian estimasi mengacu pada mesin; jadwal menyimpan urutan pengerjaan dan waktu proses. Skema relasi juga memuat analisis jadwal.", en: "Orders connect to print files and estimates; estimate details reference machines; schedules store job sequence and process time. The relational schema also includes schedule analysis." },
    images: [
      artifact("erd", "Entity Relationship Diagram", "Entity Relationship Diagram", "ERD konseptual untuk user, desain, file cetak, pesanan, estimasi, mesin, dan jadwal produksi.", "Conceptual ERD for users, designs, print files, orders, estimates, machines, and production schedules."),
      artifact("relational-schema", "Skema relasi database", "Database relational schema", "Skema tabel dengan primary key, foreign key, rincian estimasi, dan analisis jadwal.", "Table schema with primary keys, foreign keys, estimate details, and schedule analysis."),
    ],
  },
  {
    label: { id: "Alur sistem · diagram konteks dan DFD", en: "System flow · context diagram and DFD" },
    detail: { id: "Diagram konteks memperlihatkan empat peran pengguna. DFD menjelaskan login, data master, transaksi, estimasi waktu, dan jadwal produksi.", en: "The context diagram shows the four user roles. The DFD covers login, master data, transactions, time estimation, and production schedules." },
    images: [
      artifact("context-diagram", "DFD Level 0 · diagram konteks", "DFD Level 0 · context diagram", "Hubungan sistem dengan admin, staf penjualan, manajer penerbit, dan supervisor produksi.", "System interactions with administrators, sales staff, publishing managers, and production supervisors."),
      artifact("dfd-overview", "DFD Level 1 · alur utama", "DFD Level 1 · main flow", "Aliran informasi dari login dan data master hingga estimasi serta jadwal.", "Information flow from login and master data through estimates and schedules."),
    ],
  },
  {
    label: { id: "DFD rinci · dekomposisi proses", en: "Detailed DFD · process decomposition" },
    detail: { id: "Dokumentasi teknis untuk menelusuri tiap proses. Diagram yang sama pada asset kiriman ditampilkan satu kali.", en: "Technical documentation for tracing each process. Duplicate diagrams in the supplied assets are shown once." },
    images: [
      ["dfd-master-data", "Data master", "Master data"],
      ["dfd-transactions", "Transaksi", "Transactions"],
      ["dfd-estimation", "Pengelolaan estimasi", "Estimate management"],
      ["dfd-scheduling", "Pengelolaan jadwal", "Schedule management"],
      ["dfd-users", "Pengelolaan user", "User management"],
      ["dfd-design", "Pengelolaan desain", "Design management"],
      ["dfd-machines", "Pengelolaan mesin", "Machine management"],
      ["dfd-orders", "Pengelolaan pesanan", "Order management"],
      ["dfd-print-files", "Pengelolaan file cetak", "Print file management"],
      ["dfd-estimation-calculation", "Perhitungan waktu estimasi", "Estimation time calculations"],
    ].map(([name, id, en], index) => {
      const level = index < 4 ? 2 : 3;
      return artifact(name, `DFD Level ${level} · ${id}`, `DFD Level ${level} · ${en}`, `DFD Level ${level}: ${id.toLowerCase()}.`, `DFD Level ${level}: ${en.toLowerCase()}.`);
    }),
  },
  {
    label: { id: "UI/UX · wireframe supervisor produksi", en: "UI/UX · production supervisor wireframes" },
    detail: { id: "Empat rancangan layar menjelaskan pencarian pesanan, detail transaksi, status file cetak, dan timeline jadwal. Ini adalah prototype, bukan screenshot implementasi.", en: "Four screen designs explain order search, transaction details, print file status, and the schedule timeline. These are prototypes, rather than implementation screenshots." },
    images: [
      ["wireframe-orders", "Daftar pesanan", "Order list"],
      ["wireframe-order-detail", "Detail transaksi", "Transaction detail"],
      ["wireframe-print-files", "File cetak", "Print files"],
      ["wireframe-schedule", "Jadwal produksi", "Production schedule"],
    ].map(([name, id, en]) => artifact(name, id, en, `Wireframe asli: ${id.toLowerCase()}. Angka pada prototype hanya contoh tampilan.`, `Original wireframe: ${en.toLowerCase()}. Prototype numbers are display examples.`)),
  },
];


export const businessProcessArtifacts = [
  ["bpmn-product-orders", "Prosedur estimasi pesanan produk", "Product order estimation procedure", "Alur pemesanan, pembayaran, purchase order, pembuatan file cetak, dan revisi sampai persetujuan pelanggan.", "Ordering, payment, purchase orders, print file creation, and revisions through customer approval."],
  ["bpmn-production-estimation", "Prosedur estimasi waktu produksi", "Production time estimation procedure", "Staf penjualan meneruskan PO; kebutuhan desain ditinjau sebelum supervisor memperkirakan waktu proses dan menyusun urutan kerja.", "Sales forwards the PO; design requirements are reviewed before the supervisor estimates process time and sequences work."],
  ["bpmn-scheduling", "Prosedur penjadwalan", "Scheduling procedure", "Supervisor mengorganisasi pesanan dan file cetak, mengestimasi waktu, menghitung kebutuhan bahan, dan membuat catatan jadwal produksi.", "The supervisor organizes orders and print files, estimates time, calculates material needs, and records the production schedule."],
  ["bpmn-production-process", "Prosedur proses produksi", "Production process procedure", "Jadwal dan berkas diteruskan ke produksi, diikuti persiapan bahan dan mesin, pencetakan, finishing, serta pencatatan hasil.", "Schedules and files go to production, followed by material and machine preparation, printing, finishing, and recording results."],
  ["bpmn-print-machines", "Prosedur penentuan mesin cetak", "Print machine selection procedure", "Cabang sheet dan web memperlihatkan kebutuhan setup serta proses pencetakan yang berbeda.", "Sheet and web branches show different setup requirements and printing processes."],
  ["bpmn-cover", "Prosedur penentuan cover", "Cover selection procedure", "Hardcover dan softcover memiliki urutan penjilidan, pemasangan cover, pemotongan, dan pemeriksaan yang berbeda.", "Hardcover and softcover require different binding, cover attachment, cutting, and inspection sequences."],
].map(([name, id, en, captionId, captionEn]) => artifact(name, `BPMN · ${id}`, `BPMN · ${en}`, captionId, captionEn));

export const sptMethod = artifact("spt-method", "Tahapan perhitungan estimasi dan Shortest Processing Time", "Estimation and Shortest Processing Time calculation stages", "Data pesanan dan parameter proses → estimasi durasi → pengurutan pesanan → penentuan jadwal → Gantt penjadwalan produksi.", "Order data and process parameters → duration estimation → order sequencing → schedule determination → production scheduling Gantt.");

export const uatArtifacts = [
  ["uat-master-data", "Wawancara UAT · data master", "UAT interview · master data"],
  ["uat-design", "Wawancara UAT · desain", "UAT interview · design"],
  ["uat-orders", "Wawancara UAT · pesanan", "UAT interview · orders"],
  ["uat-scheduling", "Wawancara UAT · estimasi dan jadwal", "UAT interview · estimates and schedules"],
].map(([name, id, en]) => artifact(name, id, en, "Dokumen wawancara asli, 7 Agustus 2025. Buka gambar asli untuk membaca jawaban tulisan tangan.", "Original interview document, August 7, 2025. Open the original image to read the handwritten responses."));
