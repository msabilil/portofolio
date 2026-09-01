# PRD — Website Portofolio Personal

**Versi:** 1.0
**Tanggal:** 2026-09-01
**Status:** Draft
**Pemilik:** [Nama kamu]

---

## 1. Ringkasan Produk

Website portofolio personal satu-halaman-per-seksi dengan gaya minimalis, banyak
whitespace, dan pengalaman scroll yang halus/perlahan. Fokus utamanya menampilkan
identitas, skill (tools UI/UX + soft skill), dan project dengan cara yang tenang dan
enak dilihat — bukan portofolio yang ramai.

Website bilingual (Indonesia & Inggris) dan bisa diganti bahasanya langsung dari
sidebar tanpa reload penuh.

**Referensi gaya & struktur:**
- https://sawad.framer.website/
- https://www.satriabahari.my.id/en

---

## 2. Tujuan (Goals)

| # | Tujuan | Ukuran keberhasilan |
|---|--------|---------------------|
| G1 | Menampilkan profil & kontak dengan jelas | Sidebar selalu terlihat di desktop; kontak 1 klik |
| G2 | Menonjolkan skill tanpa kesan "mengukur diri" | Skill tampil sebagai tag/grid, **tanpa progress bar** |
| G3 | Memamerkan project secara rapi | Grid/list card yang bersih, mudah ditambah lewat 1 file config |
| G4 | Pengalaman baca yang tenang | Scroll halus (momentum), whitespace lega |
| G5 | Jangkauan dua bahasa | Toggle ID/EN, seluruh teks tersimpan di file translasi |

---

## 3. Target Pengguna

- **Recruiter / HR** — cepat lihat profil, skill, dan cara kontak.
- **Klien / calon kolaborator** — lihat contoh project & kualitas kerja.
- **Sesama desainer** — menilai selera desain & detail.

Mayoritas akses kemungkinan besar dari **desktop** (recruiter), namun pengalaman
**mobile** tetap harus rapi.

---

## 4. Tech Stack

| Kategori | Pilihan |
|----------|---------|
| Runtime & package manager | Bun 1.4 |
| Bahasa | TypeScript |
| UI library | React 19 (via Next.js) |
| Framework | Next.js (App Router) |
| Internationalization | next-intl |
| Smooth scroll | Lenis |
| Font | Archivo (via `next/font/google`) |
| Data project | File lokal (`src/content/projects.ts`) — **tanpa CMS** |
| Hosting (usulan) | Vercel |

---

## 5. Information Architecture / Sitemap

```
/[locale]              → Home
/[locale]/about        → About
/[locale]/skills       → Skills
/[locale]/projects     → Projects (list, link demo/repo eksternal)
/[locale]/contact      → Contact
```

Halaman detail project (`/[locale]/projects/[slug]`) ditunda ke fase berikutnya
(lihat §11 Q3).

`locale` = `id` | `en`. Default & fallback: **en**.

---

## 6. Fitur & Requirement Fungsional

### 6.1 Navigasi & Sidebar (desktop)
- Sidebar kiri **fixed**, lebar 280–320px.
- Isi: foto profil, nama, role/title singkat, icon sosial media (klik → link),
  toggle bahasa ID/EN, nav menu (Home / About / Skills / Projects / Contact).
- Menu aktif diberi indikator visual (bukan sekadar warna).
- Area konten kanan punya **scroll sendiri**.

### 6.2 Navigasi mobile
- Sidebar collapse jadi **header bar tipis**: foto kecil + nama + hamburger.
- Hamburger membuka **drawer** berisi: nav menu + icon sosial + toggle bahasa.
- Drawer bisa ditutup (tombol close, klik overlay, atau tombol Esc).

### 6.3 Multi-bahasa (i18n)
- Toggle ID/EN di sidebar & drawer.
- Ganti bahasa = ganti prefix URL (`/id/...` ↔ `/en/...`) **tanpa full reload**.
- Semua teks (nav, bio, label skill, soft skill, dsb.) diambil dari
  `messages/id.json` & `messages/en.json`. **Tidak ada teks hardcoded** di komponen.
- Bahasa aktif dipertahankan saat pindah halaman.

### 6.4 Smooth scroll
- Area konten kanan memakai **Lenis** dengan `duration`/`easing` yang dilambatkan
  dari default → efek momentum halus, bukan native jump-scroll.
- Harus tetap responsif terhadap keyboard & tidak mengganggu aksesibilitas
  (lihat §9).

### 6.5 Halaman
- **Home** — landing singkat (nama, tagline, arahan ke Projects/Contact).
- **About** — bio + foto tambahan.
- **Skills** — dua kelompok:
  - **Tools:** Figma, Balsamiq, Google Stitch, Claude Design, DeepSeek (cari asset).
  - **Soft skills:** Creative, Innovative, Communication, Interpersonal,
    Critical thinking, Analytical thinking, Problem solving, Curiosity, Initiative.
  - Tampilan **grid / tag list** — **tanpa progress bar**.
- **Projects** — grid/list card. Tiap card mengambil aset dari
  `public/assets/projects/<slug>/`.
- **Contact** — daftar kontak (email/sosial) dan/atau form. **Perlu keputusan**
  (lihat §11).

---

## 7. Requirement Konten (per halaman)

| Halaman | Konten yang perlu disiapkan |
|---------|------------------------------|
| Home | Nama, role/title, tagline singkat (ID & EN) |
| About | Paragraf bio (ID & EN), 1 foto profil + 1–2 foto tambahan |
| Skills | Daftar tools & soft skill (label diterjemahkan) |
| Projects | Per project: judul, deskripsi (ID/EN), tags, cover image, link |
| Contact | Email, akun sosial, teks ajakan |
| Global | Foto profil, ikon/nama sosial + URL, nama, role |

---

## 8. Model Data

### 8.1 Project (`src/content/projects.ts`)
Tiap project berupa objek:

```ts
type Project = {
  slug: string;              // dipakai untuk folder aset & URL detail
  title: string;
  description: { id: string; en: string };
  tags: string[];
  cover: string;             // path relatif ke public/assets/projects/<slug>/
  link?: string;             // demo / repo / studi kasus
};
```

Aset per project disimpan di `public/assets/projects/<slug>/`.

### 8.2 Translasi (`messages/id.json`, `messages/en.json`)
Struktur key sejajar antar bahasa, mis. `nav.home`, `about.bio`,
`skills.soft.creative`, dst.

---

## 9. Requirement Non-Fungsional

- **Performa:** target Lighthouse ≥ 90 (Performance & Best Practices). Gambar
  dioptimalkan (`next/image`), font di-load via `next/font` (no FOUT berlebihan).
- **SEO:** metadata per halaman & per locale, `hreflang` untuk ID/EN, Open Graph
  image.
- **Aksesibilitas:** kontras teks memadai, fokus keyboard jelas, drawer bisa
  dinavigasi keyboard, hormati `prefers-reduced-motion` (matikan/kurangi smooth
  scroll bila diminta).
- **Responsif:** layout rapi dari mobile kecil hingga layar lebar (konten dibatasi
  max-width ~1400px).
- **Maintainability:** tambah project cukup edit 1 file config + folder aset;
  tambah bahasa cukup tambah file `messages/*.json`.

---

## 10. Di Luar Cakupan (Out of Scope)

- CMS / backend admin untuk konten.
- Blog / artikel.
- Autentikasi / area login.
- Analytics lanjutan (bisa ditambah nanti, mis. Vercel Analytics).
- Bahasa selain ID & EN (arsitektur sudah siap, tapi belum diisi).

---

## 11. Open Questions / Keputusan Terbuka

| # | Pertanyaan | Opsi | Rekomendasi |
|---|-----------|------|-------------|
| Q1 | Halaman Contact: form atau daftar kontak? | — | **Diputuskan: daftar kontak saja**, tanpa backend/form. |
| Q2 | Default locale? | — | **Diputuskan: en** (Inggris), lebih ramah buat recruiter/klien internasional. |
| Q3 | Perlu halaman detail project (`/projects/[slug]`)? | — | **Diputuskan: nanti**. Scope awal cukup grid project + link demo/repo eksternal. |
| Q4 | "Open Design" — merujuk ke tool spesifik yang mana? | — | **Diputuskan: Claude Design** (label & referensi di Skills sudah diperbarui). |

---

## 12. Milestone (usulan)

1. **Setup** — Next.js + Bun + TS + Archivo + next-intl + Lenis.
2. **Layout inti** — sidebar desktop + header/drawer mobile + smooth scroll.
3. **Halaman** — Home, About, Skills.
4. **Projects** — config data + grid card (+ detail opsional).
5. **Contact** — sesuai keputusan Q1.
6. **Polish** — i18n lengkap, SEO, aksesibilitas, performa.
