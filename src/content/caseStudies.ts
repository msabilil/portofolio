export type LocalizedText = {
  id: string;
  en: string;
};

export type EvidenceStatus = "measured" | "estimated" | "proxy" | "qualitative";

export type CaseStudyLinkStatus = "available" | "private" | "unavailable";

export type CaseStudyMetric = {
  kind: "time-saved" | "error-reduction" | "supporting";
  label: LocalizedText;
  baseline?: LocalizedText;
  after?: LocalizedText;
  impact: LocalizedText;
  status: EvidenceStatus;
  method: LocalizedText;
};

export type CaseStudyLink = {
  label: LocalizedText;
  href?: string;
  status: CaseStudyLinkStatus;
};

export type CaseStudy = {
  slug: string;
  privacy: "public-safe";
  title: LocalizedText;
  pitch: LocalizedText;
  inANutshell?: LocalizedText;
  snapshot: {
    role: LocalizedText;
    duration: LocalizedText;
    scope: LocalizedText;
    stack: string[];
    type: LocalizedText;
  };
  problem: LocalizedText;
  informationArchitecture: LocalizedText;
  uxWriting: Array<{
    context: LocalizedText;
    before: LocalizedText;
    after: LocalizedText;
    reason: LocalizedText;
  }>;
  decisions: Array<{
    decision: LocalizedText;
    alternative: LocalizedText;
    reason: LocalizedText;
  }>;
  metrics: CaseStudyMetric[];
  links: CaseStudyLink[];
  deepDive: Array<{
    label: LocalizedText;
    detail: LocalizedText;
    href?: string;
    status: CaseStudyLinkStatus;
  }>;
  impact: LocalizedText;
  reflection: LocalizedText;
  recruiterSummary: {
    problem: LocalizedText;
    architecture: LocalizedText[];
    impact: LocalizedText;
  };
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "financial-management-system",
    privacy: "public-safe",
    title: {
      id: "Financial Management System",
      en: "Financial Management System",
    },
    pitch: {
      id: "Mendigitalkan alur akuntansi manual menjadi sistem keuangan yang lebih terstruktur.",
      en: "Digitizing a manual accounting workflow into a more structured financial system.",
    },
    snapshot: {
      role: {
        id: "Software Engineer Intern",
        en: "Software Engineer Intern",
      },
      duration: {
        id: "Jul 2024 — Des 2024",
        en: "Jul 2024 — Dec 2024",
      },
      scope: {
        id: "UI/UX, frontend, financial workflow, permissions, testing",
        en: "UI/UX, frontend, financial workflow, permissions, testing",
      },
      stack: ["Next.js", "React", "TypeScript", "Firestore", "Figma"],
      type: {
        id: "Project internship — data bisnis dianonimkan",
        en: "Internship project — business data anonymized",
      },
    },
    problem: {
      id: "Tim finance sebelumnya bergantung pada workflow Excel untuk mencatat transaksi, menghitung PPN, membuat jurnal debit-kredit, dan menyiapkan laporan. Alur ini membutuhkan struktur input yang konsisten serta cara yang lebih aman untuk menjaga akurasi data menjelang tutup periode.",
      en: "The finance team relied on an Excel-based workflow to record transactions, calculate VAT, prepare debit-credit journal entries, and produce reports. The workflow needed more consistent input structure and safer controls to protect data accuracy before period closing.",
    },
    informationArchitecture: {
      id: "Alur utama disusun dari input transaksi ke pencatatan jurnal, lalu ke laporan. Master data akun, proyek, dan inventaris menjadi fondasi bersama agar setiap transaksi tidak perlu mengulang data referensi.",
      en: "The main flow moves from transaction input to journal entries and then to financial reports. Account, project, and inventory master data act as shared foundations so each transaction does not repeat reference data.",
    },
    uxWriting: [
      {
        context: {
          id: "Input transaksi untuk pengguna finance non-teknis",
          en: "Transaction input for non-technical finance users",
        },
        before: {
          id: "Input tersebar di spreadsheet dengan struktur yang bergantung pada kebiasaan pengguna.",
          en: "Input was spread across spreadsheets and depended on each user's habits.",
        },
        after: {
          id: "Form transaksi terstruktur dengan field dan validasi yang konsisten.",
          en: "A structured transaction form with consistent fields and validation.",
        },
        reason: {
          id: "Bahasa dan struktur form mengikuti pekerjaan finance, bukan istilah teknis aplikasi.",
          en: "The form language and structure follow finance work instead of technical application terms.",
        },
      },
    ],
    decisions: [
      {
        decision: {
          id: "Saya membuat mockup Figma sebelum implementasi.",
          en: "I created Figma mockups before implementation.",
        },
        alternative: {
          id: "Langsung membangun form dari struktur database.",
          en: "Building the form directly from the database structure.",
        },
        reason: {
          id: "Tim finance perlu memvalidasi alur transaksi sebelum detail teknis dikunci.",
          en: "The finance team needed to validate the transaction flow before technical details were locked in.",
        },
      },
      {
        decision: {
          id: "Saya membangun laporan langsung dari data transaksi live.",
          en: "I built reports directly from live transaction data.",
        },
        alternative: {
          id: "Mengandalkan rekap manual terpisah.",
          en: "Relying on a separate manual recap.",
        },
        reason: {
          id: "Laporan tetap terhubung dengan sumber transaksi dan mengurangi duplikasi data.",
          en: "Reports stay connected to transaction sources and reduce duplicated data.",
        },
      },
    ],
    metrics: [
      {
        kind: "supporting",
        label: {
          id: "Workflow manual yang didigitalkan",
          en: "Manual workflow digitized",
        },
        impact: {
          id: "Excel, perhitungan PPN, jurnal debit-kredit, master data, dan laporan dipindahkan ke satu aplikasi web.",
          en: "Excel, VAT calculations, debit-credit journals, master data, and reports were moved into one web application.",
        },
        status: "proxy",
        method: {
          id: "Perbandingan capability dan alur sebelum/sesudah implementasi.",
          en: "Comparison of capabilities and workflows before and after implementation.",
        },
      },
      {
        kind: "error-reduction",
        label: {
          id: "Pencegahan kesalahan input",
          en: "Input error prevention",
        },
        impact: {
          id: "Validasi form, permission berbasis role, dan stress-testing membantu menjaga konsistensi transaksi.",
          en: "Form validation, role-based permissions, and stress testing help protect transaction consistency.",
        },
        status: "qualitative",
        method: {
          id: "Diturunkan dari capability sistem; tidak diklaim sebagai penurunan error rate produksi.",
          en: "Derived from system capabilities; not claimed as a production error-rate reduction.",
        },
      },
    ],
    links: [
      {
        label: { id: "Live demo", en: "Live demo" },
        status: "unavailable",
      },
      {
        label: { id: "Repository", en: "Repository" },
        status: "private",
      },
      {
        label: { id: "Figma", en: "Figma" },
        status: "private",
      },
    ],
    deepDive: [
      {
        label: {
          id: "Workflow transaksi",
          en: "Transaction workflow",
        },
        detail: {
          id: "Input transaksi, perhitungan PPN, jurnal, dan laporan dirangkai sebagai satu alur.",
          en: "Transaction input, VAT calculation, journals, and reports are connected as one flow.",
        },
        status: "private",
      },
      {
        label: {
          id: "Permission dan testing",
          en: "Permissions and testing",
        },
        detail: {
          id: "Akses modul dibatasi berdasarkan role dan transaksi diuji menjelang tutup periode.",
          en: "Module access is restricted by role and transactions were tested before period closing.",
        },
        status: "private",
      },
    ],
    impact: {
      id: "Project ini mengubah workflow akuntansi yang bergantung pada Excel menjadi sistem web terstruktur tanpa mengklaim angka operasional yang belum tersedia.",
      en: "The project changed an Excel-dependent accounting workflow into a structured web system without claiming unavailable operational metrics.",
    },
    reflection: {
      id: "Jika dikerjakan kembali, saya akan menyiapkan baseline waktu proses dan error rate sejak awal agar dampak digitalisasi dapat diukur lebih kuat.",
      en: "If I did it again, I would establish process-time and error-rate baselines earlier so the digitization impact could be measured more strongly.",
    },
    recruiterSummary: {
      problem: {
        id: "Menggantikan workflow accounting berbasis Excel yang membutuhkan perhitungan dan rekap manual.",
        en: "Replaced an Excel-based accounting workflow that required manual calculations and recaps.",
      },
      architecture: [
        {
          id: "Membuat mockup Figma sebelum implementasi agar alur input sesuai dengan kebutuhan tim finance non-teknis.",
          en: "Created Figma mockups before implementation so the input flow matched non-technical finance needs.",
        },
        {
          id: "Menghubungkan transaksi live dengan jurnal dan financial reporting.",
          en: "Connected live transactions to journals and financial reporting.",
        },
      ],
      impact: {
        id: "Digitized transaction, VAT, master-data, reporting, permissions, and testing workflows. Impact status: proxy and qualitative.",
        en: "Digitized transaction, VAT, master-data, reporting, permissions, and testing workflows. Impact status: proxy and qualitative.",
      },
    },
  },
  {
    slug: "edutive-learning-management-system",
    privacy: "public-safe",
    title: {
      id: "Edutive Learning Management System",
      en: "Edutive Learning Management System",
    },
    pitch: {
      id: "Menyatukan alur siswa, guru, kelas, pembayaran, kehadiran, dan penilaian dalam satu LMS berbasis peran.",
      en: "Bringing student, teacher, class, payment, attendance, and assessment workflows into one role-aware LMS.",
    },
    snapshot: {
      role: { id: "Engineering contributor", en: "Engineering contributor" },
      duration: { id: "Belum dicantumkan", en: "Not stated" },
      scope: {
        id: "LMS, role-based access, enrollment, teaching, payment, report card",
        en: "LMS, role-based access, enrollment, teaching, payments, report cards",
      },
      stack: ["Next.js", "TypeScript", "Express", "PostgreSQL", "Redis", "Zod"],
      type: { id: "Project — organisasi dianonimkan", en: "Project — organization anonymized" },
    },
    problem: {
      id: "Operasional pembelajaran membutuhkan alur berbeda untuk admin, manager, guru, dan siswa. Registrasi, kelas, pembayaran, kehadiran, ujian, dan report card perlu tetap mudah ditemukan tanpa mencampur hak akses antar peran.",
      en: "Learning operations require different workflows for admins, managers, teachers, and students. Registration, classes, payments, attendance, exams, and report cards need to remain discoverable without mixing permissions between roles.",
    },
    informationArchitecture: {
      id: "Navigasi dipisah berdasarkan peran. Area manager mengelola master data dan approval; area guru berfokus pada kelas, materi, ujian, kehadiran, dan penilaian; area siswa berfokus pada belajar, jadwal, pembayaran, dan hasil belajar.",
      en: "Navigation is separated by role. Manager areas handle master data and approvals; teacher areas focus on classes, learning, exams, attendance, and grading; student areas focus on learning, schedules, payments, and results.",
    },
    uxWriting: [
      {
        context: { id: "Registrasi siswa dan pembayaran", en: "Student registration and payment" },
        before: { id: "Alur perlu menjelaskan langkah biodata, kelas, dan pembayaran secara berurutan.", en: "The flow needed to explain biodata, class selection, and payment as sequential steps." },
        after: { id: "Setiap tahap ditampilkan sebagai langkah yang jelas dengan status dan aksi berikutnya.", en: "Each stage is presented as a clear step with status and next action." },
        reason: { id: "Mengurangi kebingungan saat pengguna berpindah dari pendaftaran ke pembayaran.", en: "To reduce confusion when users move from registration to payment." },
      },
    ],
    decisions: [
      {
        decision: { id: "Memisahkan dashboard dan route berdasarkan role.", en: "Separate dashboards and routes by role." },
        alternative: { id: "Satu navigasi yang berisi semua modul.", en: "One navigation containing every module." },
        reason: { id: "Informasi lebih relevan dan akses ke modul yang tidak sesuai peran dapat dibatasi.", en: "Information stays relevant and access to out-of-role modules can be restricted." },
      },
      {
        decision: { id: "Memodelkan teaching, attendance, exams, dan report card sebagai alur yang saling terhubung.", en: "Model teaching, attendance, exams, and report cards as connected workflows." },
        alternative: { id: "Membangun tiap modul sebagai halaman terpisah tanpa konteks.", en: "Build each module as a separate page without context." },
        reason: { id: "Guru dapat menyelesaikan pekerjaan akademik dari konteks kelas dan batch yang sama.", en: "Teachers can complete academic work from the same class and batch context." },
      },
    ],
    metrics: [
      {
        kind: "supporting",
        label: { id: "Role-based workflow coverage", en: "Role-based workflow coverage" },
        impact: { id: "Alur admin, manager, guru, dan siswa dipetakan ke area serta route yang berbeda.", en: "Admin, manager, teacher, and student workflows are mapped to distinct areas and routes." },
        status: "proxy",
        method: { id: "Diturunkan dari struktur route dan module di repository.", en: "Derived from the repository route and module structure." },
      },
      {
        kind: "error-reduction",
        label: { id: "Pencegahan salah alur", en: "Workflow error prevention" },
        impact: { id: "Permission, status, dan langkah registrasi membantu mencegah aksi dilakukan dari konteks yang salah.", en: "Permissions, statuses, and registration steps help prevent actions from the wrong context." },
        status: "qualitative",
        method: { id: "Evaluasi capability; bukan error rate produksi.", en: "Capability review; not a production error rate." },
      },
    ],
    links: [
      { label: { id: "Live demo", en: "Live demo" }, status: "unavailable" },
      { label: { id: "Repository", en: "Repository" }, status: "private" },
      { label: { id: "API documentation", en: "API documentation" }, status: "private" },
    ],
    deepDive: [
      {
        label: { id: "Role-based navigation", en: "Role-based navigation" },
        detail: { id: "Dashboard, route group, dan modul dibentuk untuk kebutuhan peran yang berbeda.", en: "Dashboards, route groups, and modules are shaped around different role needs." },
        status: "private",
      },
      {
        label: { id: "Student learning flow", en: "Student learning flow" },
        detail: { id: "Registrasi, kelas, pembayaran, jadwal, learning, dan report card dirangkai dalam pengalaman siswa.", en: "Registration, classes, payments, schedules, learning, and report cards are connected in the student experience." },
        status: "private",
      },
    ],
    impact: {
      id: "Edutive menyatukan banyak pekerjaan operasional pendidikan ke dalam LMS berbasis role, dengan status dampak proxy dan qualitative.",
      en: "Edutive consolidates education operations into a role-aware LMS, with proxy and qualitative impact status.",
    },
    reflection: {
      id: "Jika dikerjakan kembali, saya akan mengukur completion rate dan waktu penyelesaian untuk alur registrasi serta pembayaran.",
      en: "If I did it again, I would measure completion rate and task time for registration and payment flows.",
    },
    recruiterSummary: {
      problem: { id: "Menyatukan workflow pendidikan lintas admin, manager, guru, dan siswa.", en: "Unified education workflows across admins, managers, teachers, and students." },
      architecture: [
        { id: "Menyusun IA berdasarkan role dan konteks kerja.", en: "Structured the IA around roles and work contexts." },
        { id: "Menghubungkan enrollment, class, teaching, payment, attendance, dan report card.", en: "Connected enrollment, class, teaching, payment, attendance, and report-card flows." },
      ],
      impact: { id: "Role-based education workflow coverage. Impact status: proxy and qualitative.", en: "Role-based education workflow coverage. Impact status: proxy and qualitative." },
    },
  },
  {
    slug: "tiveflow-operations-platform",
    privacy: "public-safe",
    title: { id: "Tiveflow Operations Platform", en: "Tiveflow Operations Platform" },
    pitch: {
      id: "Menyatukan POS, inventory, cabang, finance, budgeting, dan integrasi order dalam satu platform operasional.",
      en: "Connecting POS, inventory, branches, finance, budgeting, and online orders in one operations platform.",
    },
    snapshot: {
      role: { id: "Engineering contributor", en: "Engineering contributor" },
      duration: { id: "Belum dicantumkan", en: "Not stated" },
      scope: { id: "POS, inventory, finance, branch, analytics, QA", en: "POS, inventory, finance, branches, analytics, QA" },
      stack: ["Next.js", "React", "TypeScript", "Prisma", "PostgreSQL", "Redis", "React Query"],
      type: { id: "Platform operasional — data tenant dianonimkan", en: "Operations platform — tenant data anonymized" },
    },
    problem: {
      id: "Operasional multi-cabang membutuhkan satu sumber data untuk penjualan, stok, resep, supplier, karyawan, keuangan, dan laporan. Banyak modul harus tetap konsisten ketika data bergerak dari transaksi harian ke inventory dan financial reporting.",
      en: "Multi-branch operations need one source of truth for sales, stock, recipes, suppliers, employees, finance, and reports. Modules must stay consistent as data moves from daily transactions into inventory and financial reporting.",
    },
    informationArchitecture: {
      id: "IA dibagi menjadi master data, daily operations, finance, people, integrations, analytics, dan area master tenant. Pengelompokan ini membantu pengguna berpindah dari pekerjaan transaksi ke rekonsiliasi dan analisis.",
      en: "The IA is divided into master data, daily operations, finance, people, integrations, analytics, and tenant-master areas. This grouping helps users move from transactions to reconciliation and analysis.",
    },
    uxWriting: [
      {
        context: { id: "Status inventory dan transaksi", en: "Inventory and transaction status" },
        before: { id: "Pengguna harus memahami status dari konteks modul yang berbeda.", en: "Users had to understand status from different module contexts." },
        after: { id: "Status aksi dan hasil ditampilkan dekat dengan objek yang sedang dikerjakan.", en: "Action and result statuses are shown close to the object being handled." },
        reason: { id: "Membantu keputusan operasional tanpa berpindah halaman berulang kali.", en: "To support operational decisions without repeated page switching." },
      },
    ],
    decisions: [
      {
        decision: { id: "Memisahkan domain operasi, finance, dan master data.", en: "Separate operations, finance, and master-data domains." },
        alternative: { id: "Menempatkan semua fungsi di satu dashboard datar.", en: "Place every function in one flat dashboard." },
        reason: { id: "Menjaga navigasi tetap dapat dipindai saat jumlah modul bertambah.", en: "To keep navigation scannable as the number of modules grows." },
      },
      {
        decision: { id: "Menggunakan query dan mutation terstruktur dengan validasi form.", en: "Use structured queries and mutations with form validation." },
        alternative: { id: "Memanggil endpoint langsung dari setiap komponen.", en: "Call endpoints directly from each component." },
        reason: { id: "Mengurangi duplikasi state dan menjaga kontrak input tetap konsisten.", en: "To reduce duplicated state and keep input contracts consistent." },
      },
    ],
    metrics: [
      {
        kind: "supporting",
        label: { id: "Operational areas covered", en: "Operational areas covered" },
        impact: { id: "Repository mencakup POS, inventory, budgeting, finance, branch, people, loyalty, online order, dan analytics.", en: "The repository covers POS, inventory, budgeting, finance, branches, people, loyalty, online orders, and analytics." },
        status: "proxy",
        method: { id: "Dihitung dari area route dan modul yang tersedia; bukan usage production.", en: "Counted from available route areas and modules; not production usage." },
      },
      {
        kind: "error-reduction",
        label: { id: "Kontrol konsistensi data", en: "Data consistency controls" },
        impact: { id: "Validasi, query state, dan pengujian E2E mendukung alur transaksi yang lebih terkontrol.", en: "Validation, query state, and E2E tests support more controlled transaction workflows." },
        status: "qualitative",
        method: { id: "Berdasarkan capability code dan test suite.", en: "Based on code capabilities and the test suite." },
      },
    ],
    links: [
      { label: { id: "Live demo", en: "Live demo" }, status: "unavailable" },
      { label: { id: "Repository", en: "Repository" }, status: "private" },
      { label: { id: "API documentation", en: "API documentation" }, status: "private" },
    ],
    deepDive: [
      {
        label: { id: "Inventory dan POS", en: "Inventory and POS" },
        detail: { id: "Transaksi penjualan, bahan baku, resep, stok, return, dan opname berada dalam domain operasi yang saling terkait.", en: "Sales, ingredients, recipes, stock, returns, and stock-taking live in connected operations domains." },
        status: "private",
      },
      {
        label: { id: "QA workflow", en: "QA workflow" },
        detail: { id: "Unit test dan E2E test mencakup auth, navigasi, transaksi, inventory, finance, dan responsive behavior.", en: "Unit and E2E tests cover auth, navigation, transactions, inventory, finance, and responsive behavior." },
        status: "private",
      },
    ],
    impact: {
      id: "Tiveflow memetakan operasi bisnis dari transaksi harian hingga laporan lintas cabang, tanpa klaim angka operasional yang belum tersedia.",
      en: "Tiveflow maps business operations from daily transactions to cross-branch reporting without claiming unavailable operational numbers.",
    },
    reflection: {
      id: "Jika dikerjakan kembali, saya akan menetapkan baseline waktu task dan error per domain sebelum rollout agar impact antar modul dapat dibandingkan.",
      en: "If I did it again, I would establish task-time and error baselines per domain before rollout so impact could be compared across modules.",
    },
    recruiterSummary: {
      problem: { id: "Mengelola banyak domain operasional dalam satu platform multi-cabang.", en: "Managed multiple operational domains in one multi-branch platform." },
      architecture: [
        { id: "Mengelompokkan IA menjadi master data, operations, finance, people, integrations, dan analytics.", en: "Grouped the IA into master data, operations, finance, people, integrations, and analytics." },
        { id: "Menggunakan query state, validasi, dan test suite untuk menjaga konsistensi workflow.", en: "Used query state, validation, and a test suite to protect workflow consistency." },
      ],
      impact: { id: "Broad operational coverage with proxy and qualitative impact evidence.", en: "Broad operational coverage with proxy and qualitative impact evidence." },
    },
  },
  {
    slug: "entertainment-operations-platform",
    privacy: "public-safe",
    title: { id: "Entertainment Operations Platform", en: "Entertainment Operations Platform" },
    pitch: {
      id: "Mendigitalkan siklus bisnis entertainment dari peluang, event, produksi, talent, dokumen, hingga keuangan.",
      en: "Digitizing the entertainment business cycle from opportunities and events to production, talent, documents, and finance.",
    },
    snapshot: {
      role: { id: "Engineering contributor", en: "Engineering contributor" },
      duration: { id: "Belum dicantumkan", en: "Not stated" },
      scope: { id: "CRM, event, production, finance, talent, document workflow", en: "CRM, events, production, finance, talent, document workflows" },
      stack: ["Next.js", "TypeScript", "Express", "PostgreSQL", "Redis", "Raw SQL", "Zod"],
      type: { id: "Platform bisnis — brand dan data dianonimkan", en: "Business platform — brands and data anonymized" },
    },
    problem: {
      id: "Pekerjaan entertainment bergerak dari deal ke event, deliverable, jadwal, talent, dokumen, dan pembayaran. Tanpa alur terpadu, konteks pekerjaan mudah tersebar dan status bisnis sulit dipantau lintas fungsi.",
      en: "Entertainment work moves from deals to events, deliverables, schedules, talent, documents, and payments. Without a connected flow, context becomes fragmented and business status is difficult to track across functions.",
    },
    informationArchitecture: {
      id: "IA mengikuti lifecycle bisnis: brand dan peluang di awal, workspace deal sebagai pusat konteks, lalu deliverable, jadwal, dokumen, status pembayaran, produksi, talent, dan laporan.",
      en: "The IA follows the business lifecycle: brands and opportunities at the start, deal workspace as the context hub, then deliverables, schedules, documents, payment status, production, talent, and reporting.",
    },
    uxWriting: [
      {
        context: { id: "Workspace deal dan deliverable", en: "Deal workspace and deliverables" },
        before: { id: "Status pekerjaan tersebar di beberapa area kerja.", en: "Work status was distributed across several work areas." },
        after: { id: "Ringkasan, progres, dokumen, jadwal, dan deliverable dikelompokkan dalam satu workspace deal.", en: "Summary, progress, documents, schedules, and deliverables are grouped in one deal workspace." },
        reason: { id: "Pengguna dapat membaca konteks dan langkah berikutnya dari satu tempat.", en: "Users can read context and next steps from one place." },
      },
    ],
    decisions: [
      {
        decision: { id: "Menjadikan deal workspace sebagai pusat navigasi lifecycle.", en: "Make the deal workspace the lifecycle navigation hub." },
        alternative: { id: "Memisahkan setiap fungsi tanpa konteks deal.", en: "Separate every function without deal context." },
        reason: { id: "Event, dokumen, deliverable, dan pembayaran tetap terhubung ke peluang bisnis.", en: "Events, documents, deliverables, and payments remain connected to the business opportunity." },
      },
      {
        decision: { id: "Memisahkan command dan query di API dengan domain events.", en: "Separate API commands and queries with domain events." },
        alternative: { id: "Menempatkan seluruh logika di controller.", en: "Place all logic in controllers." },
        reason: { id: "Business rules lebih mudah diuji dan perubahan lintas domain lebih terkontrol.", en: "Business rules are easier to test and cross-domain changes are more controlled." },
      },
    ],
    metrics: [
      {
        kind: "supporting",
        label: { id: "Business lifecycle coverage", en: "Business lifecycle coverage" },
        impact: { id: "Lifecycle peluang, event, produksi, talent, dokumen, transaksi, dan laporan tersedia sebagai domain terpisah namun terhubung.", en: "Opportunity, event, production, talent, document, transaction, and reporting lifecycles are modeled as separate but connected domains." },
        status: "proxy",
        method: { id: "Diturunkan dari route, domain, dan dokumentasi arsitektur repository.", en: "Derived from repository routes, domains, and architecture documentation." },
      },
      {
        kind: "error-reduction",
        label: { id: "Kontrol akses dan proses", en: "Access and process controls" },
        impact: { id: "RBAC, validation, workflow status, dan pemisahan domain membantu menjaga aksi sesuai konteks.", en: "RBAC, validation, workflow statuses, and domain separation help keep actions in context." },
        status: "qualitative",
        method: { id: "Evaluasi capability sistem; bukan angka error production.", en: "System capability review; not a production error number." },
      },
    ],
    links: [
      { label: { id: "Live demo", en: "Live demo" }, status: "unavailable" },
      { label: { id: "Repository", en: "Repository" }, status: "private" },
      { label: { id: "API documentation", en: "API documentation" }, status: "private" },
    ],
    deepDive: [
      {
        label: { id: "Deal workspace", en: "Deal workspace" },
        detail: { id: "Summary, deliverable, dokumen, jadwal, progres, dan status pembayaran dirancang sebagai satu konteks kerja.", en: "Summary, deliverables, documents, schedules, progress, and payment status form one work context." },
        status: "private",
      },
      {
        label: { id: "Domain architecture", en: "Domain architecture" },
        detail: { id: "Core domain dipisah dari adapter dan transport dengan CQRS, RBAC, serta validasi request.", en: "The core domain is separated from adapters and transport with CQRS, RBAC, and request validation." },
        status: "private",
      },
    ],
    impact: {
      id: "Platform ini menyatukan lifecycle bisnis entertainment ke workflow digital terstruktur; impact yang dipakai adalah proxy dan qualitative.",
      en: "The platform connects the entertainment business lifecycle into structured digital workflows; the impact evidence is proxy and qualitative.",
    },
    reflection: {
      id: "Jika dikerjakan kembali, saya akan mengukur waktu perpindahan status deal dan jumlah rework deliverable dari baseline operasional.",
      en: "If I did it again, I would measure deal-status cycle time and deliverable rework from an operational baseline.",
    },
    recruiterSummary: {
      problem: { id: "Menghubungkan lifecycle peluang hingga event, produksi, talent, dokumen, dan finance.", en: "Connected the lifecycle from opportunities to events, production, talent, documents, and finance." },
      architecture: [
        { id: "Menjadikan deal workspace sebagai pusat konteks.", en: "Made the deal workspace the context hub." },
        { id: "Menggunakan domain separation, CQRS, RBAC, dan validation untuk workflow bisnis.", en: "Used domain separation, CQRS, RBAC, and validation for business workflows." },
      ],
      impact: { id: "Connected entertainment lifecycle coverage. Impact status: proxy and qualitative.", en: "Connected entertainment lifecycle coverage. Impact status: proxy and qualitative." },
    },
  },
  {
    slug: "recyclean",
    privacy: "public-safe",
    title: { id: "RecyClean", en: "RecyClean" },
    pitch: {
      id: "Eksplorasi UI/UX untuk membantu pengguna memilah sampah dan merencanakan daur ulang.",
      en: "A UI/UX exploration to help people sort waste and plan their recycling.",
    },
    snapshot: {
      role: { id: "UI/UX project contributor", en: "UI/UX project contributor" },
      duration: { id: "Belum dicantumkan", en: "Not stated" },
      scope: { id: "Mobile app concept, splash screen, wireframe", en: "Mobile app concept, splash screen, wireframes" },
      stack: ["Figma", "Mobile App", "UI/UX"],
      type: { id: "Konsep aplikasi", en: "App concept" },
    },
    problem: {
      id: "Pengguna membutuhkan cara yang lebih mudah dipahami untuk memilah sampah dan merencanakan daur ulang. Konsep ini memulai eksplorasi dari layar pembuka dan wireframe alur utama.",
      en: "Users need a clearer way to sort waste and plan recycling. This concept starts the exploration with an entry screen and wireframes for the core flows.",
    },
    informationArchitecture: {
      id: "IA awal berpusat pada orientasi pengguna, pemilahan sampah, dan rencana daur ulang. Wireframe digunakan untuk menguji urutan informasi sebelum visual design dikembangkan.",
      en: "The initial IA centers on orientation, waste sorting, and recycling plans. Wireframes are used to test information order before visual design is developed.",
    },
    uxWriting: [
      {
        context: { id: "Orientasi pengguna baru", en: "New-user orientation" },
        before: { id: "Konsep masih berupa eksplorasi layar dan alur.", en: "The concept was still an exploration of screens and flows." },
        after: { id: "Splash screen dan wireframe memberi titik awal yang jelas untuk eksplorasi.", en: "The splash screen and wireframes provide a clear starting point for exploration." },
        reason: { id: "Membantu memvalidasi pemahaman alur sebelum detail visual dikunci.", en: "To validate flow comprehension before visual details are locked." },
      },
    ],
    decisions: [
      {
        decision: { id: "Memulai dari wireframe alur utama.", en: "Start with wireframes for the core flows." },
        alternative: { id: "Langsung membuat visual final.", en: "Jump straight to final visuals." },
        reason: { id: "Struktur dan urutan informasi perlu diuji sebelum polish visual.", en: "Structure and information order should be tested before visual polish." },
      },
    ],
    metrics: [
      {
        kind: "supporting",
        label: { id: "Flow coverage", en: "Flow coverage" },
        impact: { id: "Konsep mencakup entry screen dan wireframe untuk alur inti pemilahan serta daur ulang.", en: "The concept covers an entry screen and wireframes for core sorting and recycling flows." },
        status: "proxy",
        method: { id: "Diturunkan dari artefak desain yang tersedia.", en: "Derived from the available design artifacts." },
      },
    ],
    links: [
      { label: { id: "Figma", en: "Figma" }, status: "available", href: "https://www.figma.com/design/vtF1lh4iuZiF7idTMvfE79/Recyclean?node-id=17-2336&p=f&m=draw" },
      { label: { id: "Repository", en: "Repository" }, status: "unavailable" },
    ],
    deepDive: [
      {
        label: { id: "Wireframe alur utama", en: "Core-flow wireframes" },
        detail: { id: "Artefak untuk mengeksplorasi struktur informasi sebelum visual final.", en: "Artifacts used to explore information structure before final visuals." },
        status: "available",
        href: "https://www.figma.com/design/vtF1lh4iuZiF7idTMvfE79/Recyclean?node-id=17-2336&p=f&m=draw",
      },
    ],
    impact: { id: "RecyClean menghasilkan dasar IA dan wireframe untuk konsep aplikasi daur ulang; impact berstatus proxy.", en: "RecyClean established an IA and wireframe foundation for a recycling app concept; impact is proxy evidence." },
    reflection: { id: "Jika dikerjakan kembali, saya akan menguji label kategori sampah dengan pengguna dan mencatat completion rate tiap alur.", en: "If I did it again, I would test waste-category labels with users and record completion rate for each flow." },
    recruiterSummary: {
      problem: { id: "Membuat konsep alur yang lebih mudah dipahami untuk pemilahan dan daur ulang.", en: "Created a clearer concept flow for sorting and recycling." },
      architecture: [{ id: "Memulai dari IA dan wireframe sebelum visual design.", en: "Started with IA and wireframes before visual design." }],
      impact: { id: "Core recycling flow concept. Impact status: proxy.", en: "Core recycling flow concept. Impact status: proxy." },
    },
  },
  {
    slug: "penjadwalan-produksi",
    privacy: "public-safe",
    title: { id: "Production Scheduling System", en: "Production Scheduling System" },
    pitch: {
      id: "Mengubah penjadwalan manual menjadi workflow produksi berbasis estimasi untuk membantu supervisor menentukan prioritas dengan lebih jelas.",
      en: "Turning manual scheduling into an estimation-led production workflow that helps supervisors make clearer priority decisions.",
    },
    inANutshell: {
      id: "PT Thursina Mediana Utama, perusahaan penerbitan dan percetakan, sebelumnya mengelola jadwal produksi menggunakan Excel dan kertas. Ketika beberapa pesanan menumpuk, supervisor produksi kesulitan menentukan pekerjaan yang harus diprioritaskan karena belum ada perhitungan waktu produksi dan tanggal selesai yang konsisten.\n\nSaya merancang dan mengembangkan sistem penjadwalan produksi yang menghitung estimasi durasi setiap pesanan dan tanggal selesai yang diperkirakan. Sistem ini membantu supervisor menyusun prioritas berdasarkan timeline produksi yang lebih terstruktur, bukan hanya berdasarkan tebakan manual.\n\nDengan menggunakan data historis 2023–2024, saya melakukan simulasi workflow penjadwalan. Dari sekitar 21 pesanan, 9 pesanan sebelumnya mengalami keterlambatan. Dalam simulasi, seluruh pesanan dapat diselesaikan tepat waktu. Karena hasil ini berasal dari simulasi, impact-nya dikategorikan sebagai estimasi, bukan hasil pengukuran produksi langsung.",
      en: "PT Thursina Mediana Utama, a publishing and printing company, previously managed its production schedules using Excel and paper. When multiple orders accumulated, production supervisors had difficulty deciding which jobs should be prioritized because production duration and expected completion dates were not calculated consistently.\n\nI designed and developed a production scheduling system that calculates the estimated duration and expected completion date for each order. The system helps supervisors organize priorities using a more structured production timeline instead of relying only on manual guesswork.\n\nUsing historical data from 2023–2024, I simulated the scheduling workflow. In an approximate sample of 21 orders, 9 orders had previously been delayed. In the simulation, all orders were completed on time. Because this result came from a simulation, the impact is categorized as estimated rather than as a direct production measurement.",
    },
    snapshot: {
      role: { id: "Kontributor end-to-end untuk project skripsi", en: "End-to-end thesis project contributor" },
      duration: { id: "Feb 2025 — Agu 2025", en: "Feb 2025 — Aug 2025" },
      scope: { id: "Analisis, estimasi produksi, penjadwalan, prototype, implementasi, testing", en: "Analysis, production estimation, scheduling, prototyping, implementation, testing" },
      stack: ["PHP", "MySQL", "Balsamiq", "Draw.io", "Tailwind CSS"],
      type: { id: "Project skripsi", en: "Thesis project" },
    },
    problem: {
      id: "Penjadwalan produksi sebelumnya dilakukan menggunakan Excel dan kertas. Ketika pesanan menumpuk, supervisor produksi tidak memiliki dasar yang konsisten untuk membandingkan durasi produksi dan menentukan urutan pekerjaan. Kondisi ini menyebabkan keterlambatan produksi dan dapat memengaruhi kepuasan client.",
      en: "Production scheduling was previously managed using Excel and paper. When orders accumulated, production supervisors had no consistent basis for comparing production duration and deciding the order of jobs. This contributed to production delays and could affect client satisfaction.",
    },
    informationArchitecture: {
      id: "IA mengikuti alur Pesanan → Estimasi Produksi → Hitung Ulang jika diperlukan → Finalisasi Estimasi → Jadwal Produksi → Gantt Chart. Alur ini menghubungkan data pesanan, spesifikasi desain, durasi produksi, dan tanggal selesai yang diperkirakan.",
      en: "The IA follows the flow from Production Orders → Production Estimation → Recalculation when needed → Estimation Finalization → Production Schedule → Gantt Chart. This connects order data, design specifications, production duration, and expected completion dates.",
    },
    uxWriting: [
      {
        context: { id: "Alur estimasi sampai penjadwalan", en: "Estimation-to-scheduling workflow" },
        before: { id: "Penjadwalan melalui Excel dan kertas tanpa estimasi durasi yang konsisten.", en: "Scheduling through Excel and paper without consistent duration estimates." },
        after: { id: "Estimasi Produksi → Hitung Ulang Estimasi → Finalisasi Estimasi → Jadwal Produksi.", en: "Production Estimation → Recalculate Estimate → Finalize Estimate → Production Schedule." },
        reason: { id: "Membuat langkah dan status pekerjaan lebih mudah dipahami oleh setiap role yang terlibat.", en: "To make the workflow steps and job status easier for each involved role to understand." },
      },
    ],
    decisions: [
      {
        decision: { id: "Menggunakan estimasi durasi produksi sebagai dasar penjadwalan.", en: "Use estimated production duration as the basis for scheduling." },
        alternative: { id: "Mengandalkan tebakan manual dari pengalaman supervisor.", en: "Rely on manual guesses from the supervisor's experience." },
        reason: { id: "Supervisor memiliki dasar yang lebih konsisten untuk menentukan prioritas dan tanggal selesai yang diperkirakan.", en: "The supervisor gets a more consistent basis for setting priorities and expected completion dates." },
      },
      {
        decision: { id: "Memecah estimasi menjadi desain, plat, setup, mesin, QC, dan packing.", en: "Break the estimate into design, plate, setup, machine, QC, and packing stages." },
        alternative: { id: "Menggunakan satu angka durasi tanpa rincian proses.", en: "Use one duration value without process-level details." },
        reason: { id: "Rincian membuat hasil estimasi lebih mudah ditinjau dan dijelaskan.", en: "The breakdown makes the estimate easier to review and explain." },
      },
      {
        decision: { id: "Menghitung tanggal selesai dari durasi produksi, bukan meminta deadline client sebagai input utama.", en: "Calculate the expected completion date from production duration instead of using a client deadline as the primary input." },
        alternative: { id: "Menentukan tanggal selesai secara manual.", en: "Set the completion date manually." },
        reason: { id: "Tanggal selesai dapat ditelusuri kembali ke perhitungan produksi yang digunakan sistem.", en: "The completion date can be traced back to the production calculation used by the system." },
      },
    ],
    metrics: [
      {
        kind: "error-reduction",
        label: { id: "Pesanan terlambat dalam simulasi", en: "Delayed orders in simulation" },
        baseline: { id: "9 pesanan terlambat dari sekitar 21 pesanan pada data historis 2023–2024.", en: "9 delayed orders from an approximate sample of 21 historical orders from 2023–2024." },
        after: { id: "0 pesanan terlambat dalam simulasi.", en: "0 delayed orders in the simulation." },
        impact: { id: "Simulasi menunjukkan seluruh pesanan pada sample dapat diselesaikan tepat waktu.", en: "The simulation showed that all sampled orders could be completed on time." },
        status: "estimated",
        method: { id: "Simulasi menggunakan data pesanan historis; bukan pengukuran production secara langsung.", en: "Simulation using historical order data; not a direct production measurement." },
      },
      {
        kind: "supporting",
        label: { id: "Feedback supervisor produksi", en: "Production Supervisor feedback" },
        impact: { id: "Supervisor menyampaikan bahwa proses penjadwalan menjadi lebih mudah dan singkat.", en: "The Production Supervisor reported that scheduling became easier and shorter." },
        status: "qualitative",
        method: { id: "Feedback kualitatif setelah testing pada role yang terlibat.", en: "Qualitative feedback after testing with the involved roles." },
      },
      {
        kind: "supporting",
        label: { id: "Testing berbasis role", en: "Role-based testing" },
        impact: { id: "Workflow diuji pada setiap role yang terlibat dalam sistem.", en: "The workflow was tested with each role involved in the system." },
        status: "qualitative",
        method: { id: "Testing dilakukan pada alur dan kebutuhan masing-masing role.", en: "Testing covered the workflow and needs of each involved role." },
      },
    ],
    links: [
      { label: { id: "Repository", en: "Repository" }, status: "available", href: "https://github.com/msabilil/penjadwalan-produksi-tmu" },
      { label: { id: "Live demo", en: "Live demo" }, status: "unavailable" },
    ],
    deepDive: [
      {
        label: { id: "Workflow estimasi dan penjadwalan", en: "Estimation and scheduling workflow" },
        detail: { id: "Implementasi menghubungkan pesanan, rincian estimasi produksi, tanggal selesai yang diperkirakan, jadwal, dan Gantt Chart.", en: "The implementation connects orders, production estimate details, expected completion dates, schedules, and the Gantt Chart." },
        status: "available",
        href: "https://github.com/msabilil/penjadwalan-produksi-tmu",
      },
    ],
    impact: { id: "Dalam simulasi menggunakan data historis 2023–2024, pesanan terlambat berkurang dari 9 pesanan menjadi 0 pada sample sekitar 21 pesanan. Hasil ini berstatus estimated karena belum berasal dari pengukuran production secara langsung.", en: "In a simulation using historical 2023–2024 data, delayed orders decreased from 9 orders to 0 in an approximate sample of 21 orders. This result is estimated because it did not come from direct production measurement." },
    reflection: { id: "Jika dikerjakan kembali, saya akan membandingkan tanggal selesai hasil estimasi dengan tanggal selesai aktual dan memisahkan deadline dari client dengan tanggal selesai hasil perhitungan sistem.", en: "If I did it again, I would compare estimated completion dates with actual completion dates and separate client deadlines from system-calculated completion dates." },
    recruiterSummary: {
      problem: { id: "Mengganti penjadwalan berbasis Excel dan kertas yang sulit diprioritaskan ketika pesanan menumpuk.", en: "Replaced an Excel and paper-based scheduling workflow that became difficult to prioritize when orders accumulated." },
      architecture: [
        { id: "Menggunakan estimasi durasi produksi untuk menghitung tanggal selesai yang diperkirakan.", en: "Used production duration estimates to calculate expected completion dates." },
        { id: "Memecah proses menjadi estimasi, hitung ulang, finalisasi, dan penjadwalan.", en: "Structured the workflow into estimation, recalculation, finalization, and scheduling." },
        { id: "Menguji workflow pada setiap role yang terlibat.", en: "Tested the workflow with each involved role." },
      ],
      impact: { id: "Simulasi data historis 2023–2024 menunjukkan 9 pesanan terlambat menjadi 0 dari sample sekitar 21 pesanan. Impact status: estimated.", en: "A simulation using historical 2023–2024 data showed 9 delayed orders becoming 0 in an approximate sample of 21 orders. Impact status: estimated." },
    },
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}
