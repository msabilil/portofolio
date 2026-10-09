import type { LocalizedText } from "./caseStudies";

type Detail = {
  nutshell: LocalizedText;
  analysis: LocalizedText;
  system: LocalizedText;
  ux: LocalizedText;
  contribution: LocalizedText;
  frontend: LocalizedText[];
  backend: LocalizedText[];
};

const copy = (id: string, en: string): LocalizedText => ({ id, en });

export const fullStackCaseStudyDetails: Record<string, Detail> = {
  "financial-management-system": {
    nutshell: copy(
      "PT Indera Sae Pratama mengelola transaksi dan laporan keuangan proyek melalui alur berbasis Excel. Tim finance perlu mencatat transaksi, menghitung PPN, menyusun jurnal debit-kredit, serta menelusuri pengadaan dan pembayaran menurut proyek; alur ini membutuhkan struktur input dan rekap yang konsisten.\n\nSaya membangun aplikasi web Next.js dan Firebase dari frontend hingga API serta penyimpanan data. Kode proyek menghubungkan transaksi, Purchase Order, RCA, pembayaran, dan invoice, sementara akun dan subakun mengelompokkan pencatatan debit-kredit. Data transaksi dirangkum dalam buku besar, neraca lajur, neraca, dan laba-rugi.",
      "PT Indera Sae Pratama managed project transactions and financial reports through an Excel-based workflow. The finance team needed to record transactions, calculate VAT, prepare debit-credit entries, and track procurement and payments by project; this workflow needed consistent input and reporting structures.\n\nI built the Next.js and Firebase web application across its frontend, API, and data layer. Project codes connect transactions, purchase orders, RCA, payments, and invoices, while accounts and subaccounts organize debit-credit records. Transaction data is summarized in the general ledger, trial balance, balance sheet, and income statement.",
    ),
    analysis: copy(
      "Master proyek, akun, subakun, dan inventory menjadi referensi untuk transaksi. Kode proyek menghubungkan pencatatan transaksi dengan Purchase Order, RCA, pembayaran, dan invoice; modul laporan merangkum data debit-kredit menurut akun, proyek, atau periode sesuai kebutuhannya.",
      "Project, account, subaccount, and inventory records provide references for transactions. Project codes connect transaction records with purchase orders, RCA, payments, and invoices; reporting modules summarize debit-credit data by account, project, or period where relevant.",
    ),
    system: copy(
      "Aplikasi Next.js menyatukan halaman web dan route handler API dalam satu repo. Firestore menyimpan proyek, akun, transaksi, dan dokumen terkait; Firebase Authentication menangani login dan Firebase Storage menyimpan lampiran bukti transaksi.",
      "The Next.js application keeps web pages and API route handlers in one repository. Firestore stores projects, accounts, transactions, and related documents; Firebase Authentication handles sign-in and Firebase Storage keeps transaction attachments.",
    ),
    ux: copy(
      "Saya menyiapkan mockup Figma sebelum implementasi agar susunan informasi dapat ditinjau. Contohnya mencakup tabel pengguna dengan pencarian dan status, serta detail persetujuan pembayaran yang memisahkan informasi vendor, pemesan, item Purchase Order, dan ringkasan PPN. Data pada gambar berikut disamarkan.",
      "I prepared Figma mockups before implementation to review how information was organized. Examples include a searchable user table with status indicators and a payment approval detail that separates vendor, requisitioner, purchase order items, and VAT summary. Data in the following images has been redacted.",
    ),
    contribution: copy(
      "Saya mengembangkan sistem ini secara menyeluruh, termasuk antarmuka, API di aplikasi Next.js, dan penyimpanan Firebase.",
      "I built the system across its interface, Next.js API, and Firebase data layer.",
    ),
    frontend: [
      copy("Halaman operasional dan admin mencakup master proyek, akun dan subakun, inventory, transaksi, Purchase Order, RCA, invoice, serta detail persetujuan pembayaran.", "Operational and admin pages cover project, account, subaccount, and inventory records, transactions, purchase orders, RCA, invoices, and payment approval details."),
      copy("Form dan tabel mendukung pemilihan referensi data, pencatatan transaksi dan bukti, serta peninjauan buku besar, neraca lajur, neraca, dan laba-rugi.", "Forms and tables support reference selection, transaction and evidence entry, and review of the general ledger, trial balance, balance sheet, and income statement."),
    ],
    backend: [
      copy("Route handler mengolah master data, transaksi, pengadaan, invoice, upload, dan rekap laporan. Pencatatan transaksi menghubungkan kode proyek dengan akun debit-kredit; PPN dihitung menurut rumus di kode aplikasi.", "Route handlers process master data, transactions, procurement, invoices, uploads, and report summaries. Transaction records link project codes with debit-credit accounts; VAT follows the formula in the application code."),
      copy("Firestore menyimpan data operasional untuk rekap laporan. Firebase Authentication menangani login email dan kata sandi, sementara Firebase Storage menyimpan lampiran bukti transaksi.", "Firestore stores operational data used by report summaries. Firebase Authentication handles email and password sign-in, while Firebase Storage stores transaction evidence attachments."),
    ],
  },
  "edutive-learning-management-system": {
    nutshell: copy(
      "Edutive menyatukan administrasi kelas, pembelajaran, pembayaran, kehadiran, dan rapor untuk beberapa peran. Saya membangun frontend dan backend aplikasi, termasuk alur web berbasis peran dan REST API akademik.",
      "Edutive connects class administration, learning, payments, attendance, and report cards for several roles. I built the application's frontend and backend, including role-based web flows and the academic REST API.",
    ),
    analysis: copy(
      "Alur akademik menghubungkan kelas dan batch, pendaftaran siswa, pertemuan, tugas atau ujian, kehadiran, penilaian, hingga rapor. Pembayaran dan approval manager berjalan bersama proses belajar, sementara kolaborasi brand memiliki alur proyek tersendiri.",
      "The academic flow connects classes and batches, enrollment, lessons, assignments or exams, attendance, grading, and report cards. Payments and manager approvals run alongside learning, while brand collaborations have their own project flow.",
    ),
    system: copy(
      "Web Next.js berkomunikasi dengan REST API Bun dan Express. Data akademik berhubungan melalui kelas, batch, pertemuan, siswa, dan guru di PostgreSQL; backend memisahkan domain, repository SQL, command, query, dan transport API.",
      "The Next.js web app talks to a Bun and Express REST API. Academic data relates classes, batches, lessons, students, and teachers in PostgreSQL; the backend separates domains, SQL repositories, commands, queries, and API transport.",
    ),
    ux: copy(
      "Navigasi dan dashboard mengikuti pekerjaan kesiswaan, manager, guru, serta siswa/orang tua. Pendaftaran, kelas, pembayaran, dan hasil belajar ditempatkan dalam konteks peran agar langkah berikutnya mudah ditemukan.",
      "Navigation and dashboards follow the work of student administration, managers, teachers, and students or parents. Enrollment, classes, payments, and learning results sit in the relevant role context so the next step is easier to find.",
    ),
    contribution: copy(
      "Saya membangun frontend dan backend seluruh fitur Edutive serta menangani CI/CD dan konfigurasi Docker aplikasi.",
      "I built Edutive's frontend and backend features and handled the application's CI/CD and Docker configuration.",
    ),
    frontend: [
      copy("Portal per peran menampilkan pendaftaran, kelas dan batch, materi, tugas, ujian, kehadiran, pembayaran, serta rapor sesuai akses pengguna.", "Role-based portals show enrollment, classes and batches, materials, assignments, exams, attendance, payments, and report cards according to access."),
      copy("Komponen React, Context dan hooks mengelola alur halaman; API client dan mapper mengubah data REST menjadi bentuk yang dipakai antarmuka. QR ditampilkan untuk kebutuhan kehadiran.", "React components, Context, and hooks manage page flows; an API client and mappers turn REST data into interface models. QR codes support attendance."),
    ],
    backend: [
      copy("REST API memproses pendaftaran, pembelajaran, nilai, rapor, pembayaran, dan kolaborasi brand dengan PostgreSQL serta repository SQL langsung.", "The REST API processes enrollment, learning, grades, report cards, payments, and brand collaboration through PostgreSQL and direct SQL repositories."),
      copy("JWT, middleware role, dan Zod membatasi serta memvalidasi aksi. Struktur hexagonal, CQRS, domain events, dan Unit of Work memisahkan aturan bisnis dari transport dan penyimpanan.", "JWT, role middleware, and Zod restrict and validate actions. Hexagonal structure, CQRS, domain events, and a Unit of Work separate business rules from transport and persistence."),
    ],
  },
  "tiveflow-operations-platform": {
    nutshell: copy(
      "Tiveflow menghubungkan POS, stok, shift, SDM, keuangan, dan laporan dalam platform multi-tenant. Kontribusi saya berfokus pada frontend SDM serta Portal Karyawan dan pengujian lintas fitur; backend dijelaskan sebagai arsitektur produk yang terhubung dengan pekerjaan tersebut.",
      "Tiveflow connects POS, stock, shifts, HR, finance, and reporting in a multi-tenant platform. My work focused on the HR and employee portal frontend and cross-feature testing; the backend is described as product architecture connected to that work.",
    ),
    analysis: copy(
      "Alur operasional bergerak dari penyiapan tenant, cabang, katalog, resep, dan stok ke shift kasir, transaksi, konsumsi bahan, settlement, lalu laporan. Portal karyawan menghubungkan jadwal shift, absensi, gaji, kasbon, dan cuti.",
      "Operations move from tenant, branch, catalog, recipe, and stock setup to cashier shifts, sales, ingredient consumption, settlement, and reports. The employee portal connects shifts, attendance, payroll, advances, and leave.",
    ),
    system: copy(
      "Web Next.js memakai REST API Express dengan PostgreSQL, Prisma, dan skema data per tenant. Permission serta konfigurasi fitur mengatur akses menurut tenant, cabang, dan pengguna; dashboard master berada pada aplikasi terpisah.",
      "The Next.js web app uses an Express REST API with PostgreSQL, Prisma, and per-tenant data schemas. Permissions and feature settings govern access by tenant, branch, and user; the master dashboard is a separate app.",
    ),
    ux: copy(
      "Antarmuka dikelompokkan menurut pekerjaan kasir, pengelola cabang, staf stok, keuangan, SDM, dan karyawan. Bagian SDM serta Portal Karyawan menempatkan data pribadi dan aksi operasional sesuai hak akses pengguna.",
      "The interface is grouped around cashier, branch management, stock, finance, HR, and employee tasks. HR and employee portal areas place personal data and operational actions within each user's access scope.",
    ),
    contribution: copy(
      "Kontribusi saya adalah frontend modul SDM & Karyawan dan Portal Karyawan, serta pengujian fungsional, regresi, dan integrasi seluruh fitur. Arsitektur backend berikut menjelaskan sistem yang diintegrasikan dan diuji, bukan klaim bahwa saya membangun backend Tiveflow.",
      "My contribution was the HR and employee portal frontend plus functional, regression, and integration testing across the product. The backend description below explains the system I integrated with and tested; it does not claim I built Tiveflow's backend.",
    ),
    frontend: [
      copy("Saya mengembangkan tampilan SDM & Karyawan dan Portal Karyawan untuk data karyawan, shift, absensi, gaji, kasbon, dan cuti sesuai modul yang tersedia.", "I developed the HR and employee portal interfaces for employee data, shifts, attendance, payroll, advances, and leave within the available modules."),
      copy("Web memakai komponen React, form, query dan mutation API, serta permission untuk menampilkan aksi yang sesuai. Saya juga menguji alur lintas modul secara fungsional, regresi, dan integrasi.", "The web app uses React components, forms, API queries and mutations, and permissions to show relevant actions. I also tested cross-module flows for functionality, regressions, and integration."),
    ],
    backend: [
      copy("Backend produk memisahkan skema master dan skema bisnis tenant, menyediakan API untuk POS, stok, shift, SDM, keuangan, laporan, dan integrasi order online.", "The product backend separates master and tenant business schemas and exposes APIs for POS, stock, shifts, HR, finance, reports, and online-order integrations."),
      copy("JWT, permission middleware, dan validasi Zod menjaga akses dan input; transaksi penjualan dapat terhubung ke konsumsi stok dan pencatatan keuangan sesuai mode tenant.", "JWT, permission middleware, and Zod validation govern access and input; sales can feed stock consumption and financial records according to tenant mode."),
    ],
  },
  "entertainment-operations-platform": {
    nutshell: copy(
      "Platform Entertainment menghubungkan brand deal dengan talent, deliverable, jadwal, produksi, dokumen, dan keuangan. Saya membangun frontend dan backend agar setiap peran dapat bekerja dari konteks deal yang sama hingga pekerjaan dan pembayaran selesai.",
      "The Entertainment platform connects brand deals with talent, deliverables, schedules, production, documents, and finance. I built the frontend and backend so each role could work from the same deal context through completion and payment.",
    ),
    analysis: copy(
      "Alur dimulai dari brand dan deal, berlanjut ke talent, deliverable, jadwal atau event, produksi, dokumen, dan pembayaran. Setiap peran perlu melihat status pekerjaan yang sama dari sudut pandang tugasnya.",
      "The flow starts with brands and deals, then connects talent, deliverables, schedules or events, production, documents, and payments. Each role needs to see the same work status from its own task context.",
    ),
    system: copy(
      "Web Next.js berkomunikasi dengan REST API Bun dan Express. Domain brand, deal, jadwal, produksi, dokumen, talent, dan keuangan dipisahkan; PostgreSQL dengan repository SQL langsung menyimpan data dan penyimpanan objek menangani berkas.",
      "The Next.js web app talks to a Bun and Express REST API. Brand, deal, schedule, production, document, talent, and finance domains are separated; PostgreSQL with direct SQL repositories stores data, while object storage handles files.",
    ),
    ux: copy(
      "Workspace deal menjadi pusat konteks untuk ringkasan, deliverable, dokumen, jadwal, progres, dan pembayaran. Halaman lain mengikuti role marketing, creative, talent, produksi, dan finance agar pekerjaan lintas tim tetap dapat ditelusuri.",
      "The deal workspace centers summary, deliverables, documents, schedules, progress, and payments. Other pages follow marketing, creative, talent, production, and finance roles so cross-team work remains traceable.",
    ),
    contribution: copy(
      "Saya membangun frontend dan backend seluruh fitur Entertainment serta menangani CI/CD dan konfigurasi Docker aplikasi.",
      "I built Entertainment's frontend and backend features and handled the application's CI/CD and Docker configuration.",
    ),
    frontend: [
      copy("Halaman per peran menampilkan deal, deliverable, kalender talent dan event, kebutuhan produksi, dokumen, serta ringkasan keuangan sesuai konteks pengguna.", "Role-based pages show deals, deliverables, talent and event calendars, production needs, documents, and finance summaries in context."),
      copy("Komponen React memakai query dan mutation API, form tervalidasi, serta editor DOCX untuk alur dokumen yang tersedia di web.", "React components use API queries and mutations, validated forms, and a DOCX editor for the web's document workflow."),
    ],
    backend: [
      copy("REST API mengelola status deal dan deliverable, jadwal/event, kebutuhan produksi, berkas, fee, transaksi, dan laporan pada domain yang terpisah.", "The REST API manages deal and deliverable states, schedules and events, production needs, files, fees, transactions, and reports in separate domains."),
      copy("CQRS, domain events, validasi Zod, dan RBAC menjaga aturan bisnis. Pemeriksaan bentrok jadwal talent memakai rentang waktu; berkas disimpan melalui penyimpanan objek yang kompatibel S3.", "CQRS, domain events, Zod validation, and RBAC organize business rules. Talent schedule conflicts are checked by time range; files use S3-compatible object storage."),
    ],
  },
};
