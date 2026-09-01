# Portofolio UI/UX Design

Status: Approved for implementation planning
Date: 2026-09-01

## Context

Portofolio personal untuk UI/UX designer. Stack sudah discaffold: Next.js
16 (App Router), TypeScript, Tailwind CSS v4, ESLint, dijalankan dengan Bun
1.4. Dokumen ini mendefinisikan konsep tampilan dan struktur situs sebelum
implementasi dimulai.

Referensi gaya/layout:
- https://sawad.framer.website/
- https://www.satriabahari.my.id/en

## Goals

- Layout tidak full-width, ada ruang kosong kiri-kanan di layar lebar.
- Sidebar kiri fixed: foto, nama, sosial media/kontak, nav menu, toggle
  bahasa. Selalu terlihat di semua halaman.
- Scroll konten terasa pelan/halus (bukan native jump-scroll).
- Dukung dua bahasa: Indonesia dan Inggris, lewat URL (`/id`, `/en`).
- Palet warna putih dominan dengan aksen hitam tipis. Font Archivo.
- Multi-page: Home, About, Skills, Projects, Contact.

## Non-Goals

- Tidak ada CMS atau database — konten project disimpan sebagai file lokal.
- Tidak ada form kontak dengan backend/email service — Contact hanya
  daftar link (email, WA, sosial media) yang bisa diklik.
- Tidak ada dashboard admin atau auth.
- Tidak membangun ulang tooling scaffold (sudah selesai di sesi sebelumnya).

## Layout & Responsive

**Desktop (>= md breakpoint Tailwind, 768px+):**
- Container max-width ~1400px, `mx-auto`, padding horizontal responsif —
  bukan full-width.
- Sidebar kiri fixed (`position: fixed`), lebar ~280-320px, tinggi penuh
  viewport. Isi: foto profil, nama, role/title singkat, daftar icon
  sosial media (link langsung), toggle bahasa ID/EN, nav vertikal
  (Home/About/Skills/Projects/Contact).
- Area kanan: margin-left selebar sidebar, jadi scroll container sendiri
  per halaman (bukan sidebar yang ikut scroll).

**Mobile (< md):**
- Sidebar berubah jadi header bar tipis di atas: foto kecil + nama +
  tombol hamburger.
- Klik hamburger membuka drawer/overlay berisi nav menu, sosial media,
  dan toggle bahasa.
- Konten halaman full width di bawah header bar.

## Visual Style

- Warna: putih (`#FFFFFF` / near-white) sebagai base, hitam (`#0A0A0A`
  atau sejenis) sebagai aksen teks/border/hover. Tidak ada warna lain.
- Font: Archivo, dimuat via `next/font/google`, dipakai untuk heading
  dan body (bisa beda weight, tanpa font kedua).
- Gaya minimal: whitespace lega, border tipis alih-alih shadow tebal,
  tanpa elemen dekoratif berlebih.

## Scroll Behavior

- Gunakan library smooth-scroll (Lenis) dibungkus provider di root
  layout, aktif di area konten kanan.
- Konfigurasi duration/easing dilambatkan dari default library supaya
  terasa "sangat pelan" dibanding native scroll, tapi tetap responsif
  terhadap wheel/trackpad/touch.
- `prefers-reduced-motion: reduce` di-hormati — matikan efek smooth
  scroll untuk user yang set preferensi itu di OS (fallback ke native
  scroll instant).

## Internationalization

- Library: `next-intl`.
- Struktur route: `app/[locale]/(routes)`, locale `id` dan `en`, `id`
  sebagai default locale.
- Semua string UI (nav label, bio, skill label, soft skill list, contact
  label) disimpan di `messages/id.json` dan `messages/en.json`.
- Toggle bahasa di sidebar/drawer: link yang mengganti prefix locale di
  URL saat ini (mempertahankan halaman yang sedang dibuka).

## Pages

1. **Home** — hero singkat: nama, tagline/role, CTA ke Projects atau
   About.
2. **About** — bio paragraf, foto tambahan.
3. **Skills** — dua grup ditampilkan sebagai tag/grid (bukan progress
   bar):
   - Tools: Figma, Balsamiq, Google Stitch, AI design tool (mis. Open
     Design), DeepSeek (riset/pencarian asset).
   - Soft skills: Creative, Innovative, Communication, Interpersonal,
     Critical thinking, Analytical thinking, Problem solving, Curiosity,
     Initiative.
4. **Projects** — grid/list card. Tiap project: judul, deskripsi
   (id/en), tags, cover image, link (demo/case study). Data disimpan di
   `src/content/projects.ts`, gambar di
   `public/assets/projects/<slug>/`.
5. **Contact** — daftar kontak yang bisa diklik: email (`mailto:`),
   WhatsApp, LinkedIn, GitHub, Instagram, dll sesuai yang tersedia.
   Statis, tanpa form/backend.

## Assets

Folder sudah dibuat di `public/assets/`:
- `photos/` — foto profil (sidebar) dan foto tambahan (About).
- `projects/<slug>/` — screenshot/cover tiap project.
- `icons/` — icon sosial media/tools kalau tidak pakai icon library.
- `og/` — Open Graph image (1200x630) untuk preview share link.
- `cv/` — file CV/resume PDF untuk tombol download (kalau ada).

User akan upload asset secara manual ke folder-folder ini. Konten
teks (bio, deskripsi project) menyusul terpisah, tidak dicakup spec ini.

## Dependencies Baru

- `next-intl` — routing & dictionary i18n.
- `lenis` — smooth scroll.
- Font Archivo via `next/font/google` (tidak perlu package tambahan).

## Testing / Verification

- `bun run build` harus sukses tiap tahap implementasi (routing i18n,
  sidebar layout, smooth scroll, tiap halaman).
- Manual check di browser: sidebar fixed & responsive breakpoint mobile,
  toggle bahasa berpindah locale tanpa reload penuh dan tanpa kehilangan
  halaman aktif, scroll terasa pelan di desktop, scroll native saat
  `prefers-reduced-motion` aktif.
- `bun run lint` bersih.

## Open Items (di luar scope spec ini)

- Isi teks final (bio, deskripsi tiap project, resume PDF) — user
  siapkan terpisah, discaffold sebagai placeholder dulu.
- Foto profil final yang dipakai di sidebar (foto yang ada sekarang
  disarankan dipakai di About, bukan foto profil utama — lihat diskusi
  sebelumnya).
