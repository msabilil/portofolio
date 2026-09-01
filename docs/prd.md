# PRD — Website Portofolio Personal

**Versi:** 1.2
**Tanggal:** 2026-09-01
**Status:** Draft
**Pemilik:** [Nama kamu]
**Menggantikan:** v1.1

---

## Riwayat Perubahan

| Versi | Perubahan |
|-------|-----------|
| 1.0 | Draf awal: multi-page (Home/About/Skills/Projects/Contact), sidebar fixed full-height dengan nav menu. |
| 1.1 | **Perubahan besar:** dari multi-page jadi **single-page** (semua section discroll di satu halaman, tanpa nav menu). Sidebar berubah dari fixed full-height jadi **kotak rounded, sticky, vertically-centered**, tidak lagi menampung nav menu. Main content area dipusatkan dengan ruang kosong kiri-kanan (~20% viewport tiap sisi) alih-alih dua kolom fixed-width. Tambah section baru **Pengalaman** (placeholder, data asli menyusul). |
| 1.2 | Margin kiri-kanan main di layar lebar diturunkan dari **~20%** jadi **~10%** tiap sisi — 20% dirasa kelewat lebar. |

## 1. Ringkasan Produk

Website portofolio personal **satu halaman** (single-page) dengan gaya minimalis, banyak
whitespace, dan pengalaman scroll yang halus/perlahan. Semua bagian — tentang singkat,
skill & tools, pengalaman, dan project — tampil langsung dalam satu alur scroll, tanpa
navigasi antar halaman. Fokus utamanya menampilkan identitas, skill (tools UI/UX + soft
skill), pengalaman, dan project dengan cara yang tenang dan enak dilihat — bukan
portofolio yang ramai.

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
/[locale]              → Single page — semua section discroll di sini
```

Tidak ada route terpisah per section. Section (dengan anchor id untuk
kemungkinan deep-link) tersusun vertikal dalam satu halaman:
`#about → #skills → #experience → #projects → #contact`.

Halaman detail project (`/[locale]/projects/[slug]`) tetap di luar cakupan
(lihat §11 Q3) — link project mengarah keluar (demo/repo eksternal).

`locale` = `id` | `en`. Default & fallback: **en**.

---

## 6. Fitur & Requirement Fungsional

### 6.1 Layout utama
- Main content area **dipusatkan secara horizontal**, menyisakan ruang kosong
  kiri-kanan **±10% lebar viewport** di layar lebar (bukan dua kolom
  fixed-width penuh layar).
- Di dalam area tersebut: **sidebar** (lihat §6.2) + konten section yang
  discroll.

### 6.2 Sidebar (tanpa nav menu)
- Berbentuk **kotak dengan sudut rounded**, bukan panel fixed full-height.
- **Sticky & vertically-centered** terhadap viewport saat halaman discroll —
  tidak menghabiskan seluruh tinggi main.
- Isi: foto profil, nama, role/title singkat, icon sosial media (klik →
  link), toggle bahasa ID/EN. **Tidak ada nav menu** — karena seluruh
  section sudah tampil langsung di satu halaman.
- Di mobile: sidebar tampil sebagai kartu ringkas di bagian atas halaman
  (bukan drawer/hamburger — tidak ada nav yang perlu disembunyikan).

### 6.3 Multi-bahasa (i18n)
- Toggle ID/EN di sidebar.
- Ganti bahasa = ganti prefix URL (`/id` ↔ `/en`) **tanpa full reload**,
  tetap di halaman yang sama (single page, jadi selalu di root).
- Semua teks (bio, label skill, soft skill, pengalaman, dsb.) diambil dari
  `messages/id.json` & `messages/en.json`. **Tidak ada teks hardcoded** di
  komponen.

### 6.4 Smooth scroll
- Area konten memakai **Lenis** dengan `duration`/`easing` yang dilambatkan
  dari default → efek momentum halus, bukan native jump-scroll.
- Harus tetap responsif terhadap keyboard & tidak mengganggu aksesibilitas
  (lihat §9).

### 6.5 Section (single page, urutan tampil)
- **Tentang (singkat)** — bio ringkas.
- **Skills & Tools** — dua kelompok:
  - **Tools:** Figma, Balsamiq, Google Stitch, Claude Design, DeepSeek (cari asset).
  - **Soft skills:** Creative, Innovative, Communication, Interpersonal,
    Critical thinking, Analytical thinking, Problem solving, Curiosity, Initiative.
  - Tampilan **grid / tag list** — **tanpa progress bar**.
- **Pengalaman** *(baru)* — daftar pengalaman (role, tempat, periode,
  deskripsi singkat). **Placeholder** untuk saat ini; data asli menyusul
  (lihat §11 Q5).
- **Projects** — grid/list card. Tiap card mengambil aset dari
  `public/assets/projects/<slug>/`.
- **Contact** — daftar kontak (email/sosial), statis tanpa form
  (keputusan §11 Q1 tetap berlaku).

---

## 7. Requirement Konten (per section)

| Section | Konten yang perlu disiapkan |
|---------|------------------------------|
| Tentang | Paragraf bio singkat (ID & EN) |
| Skills & Tools | Daftar tools & soft skill (label diterjemahkan) |
| Pengalaman | Per entri: role, tempat, periode, deskripsi singkat (ID/EN) — placeholder dulu |
| Projects | Per project: judul, deskripsi (ID/EN), tags, cover image, link |
| Contact | Email, akun sosial |
| Global (sidebar) | Foto profil, ikon/nama sosial + URL, nama, role |

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

### 8.2 Experience (`src/content/experience.ts`) *(baru di v1.1)*
Tiap entri pengalaman berupa objek:

```ts
type Experience = {
  id: string;
  role: { id: string; en: string };
  place: string;
  period: string;             // mis. "2024 — Sekarang"
  description: { id: string; en: string };
};
```

Berisi data placeholder sampai pengalaman asli tersedia.

### 8.3 Translasi (`messages/id.json`, `messages/en.json`)
Struktur key sejajar antar bahasa, mis. `about.bio`, `skills.soft.creative`,
`experience.title`, dst. (Namespace `nav.*` dari v1.0 dihapus — tidak ada
lagi nav menu.)

---

## 9. Requirement Non-Fungsional

- **Performa:** target Lighthouse ≥ 90 (Performance & Best Practices). Gambar
  dioptimalkan (`next/image`), font di-load via `next/font` (no FOUT berlebihan).
- **SEO:** metadata halaman & per locale, `hreflang` untuk ID/EN, Open Graph
  image.
- **Aksesibilitas:** kontras teks memadai, fokus keyboard jelas, hormati
  `prefers-reduced-motion` (matikan/kurangi smooth scroll bila diminta).
- **Responsif:** layout rapi dari mobile kecil hingga layar lebar. Di layar
  lebar, main content dipusatkan dengan ruang kosong ±10% kiri-kanan (bukan
  menempel tepi); di mobile, sidebar jadi kartu ringkas di atas, bukan
  drawer/hamburger.
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
| Q5 | Isi section Pengalaman? | (a) placeholder dulu (b) data asli sekarang | **(a)** — 1–2 entri placeholder, data asli menyusul dari pemilik. |

---

## 12. Milestone (usulan)

1. **Setup** — Next.js + Bun + TS + Archivo + next-intl + Lenis. *(selesai)*
2. **Layout inti (v1.2)** — main content dipusatkan (±10% margin kiri-kanan),
   sidebar kotak rounded sticky vertically-centered (tanpa nav menu), smooth
   scroll.
3. **Section** — Tentang, Skills & Tools, Pengalaman (placeholder), Projects,
   Contact — semua dalam satu halaman.
4. **Polish** — i18n lengkap, SEO, aksesibilitas, performa.
