# Design — Website Portofolio Personal

**Versi:** 1.2
**Tanggal:** 2026-09-01
**Menggantikan:** v1.1
**Referensi:** https://sawad.framer.website/ · https://www.satriabahari.my.id/en

## Riwayat Perubahan

| Versi | Perubahan |
|-------|-----------|
| 1.0 | Draf awal: sidebar fixed full-height dua kolom, multi-page, mobile pakai header+drawer. |
| 1.1 | Single-page — sidebar jadi **kotak rounded, sticky, vertically-centered** tanpa nav menu; main content dipusatkan dengan margin ±20% viewport; mobile: sidebar jadi kartu ringkas di atas (drawer dihapus, tidak ada nav yang perlu disembunyikan). |
| 1.2 | Margin kiri-kanan diturunkan dari **±20%** jadi **±10%** viewport di layar lebar — 20% dirasa kelewat lebar. |

---

## 1. Filosofi Desain

Tenang, minimal, dan lega. Putih dominan dengan aksen hitam yang tipis, banyak
whitespace, dan pergerakan yang halus. Kesan yang ingin dicapai: rapi dan matang —
bukan portofolio yang berusaha keras menarik perhatian, melainkan yang membuat
kontennya nyaman dibaca.

**Prinsip:**
1. **Whitespace dulu.** Ruang kosong adalah bagian dari desain, bukan sisa.
2. **Satu warna aksen.** Hanya hitam tipis di atas putih — tidak ada warna lain.
3. **Gerak halus, tidak mengganggu.** Scroll pelan memberi kesan tenang; animasi
   secukupnya.
4. **Konten tidak melebar penuh.** Dibatasi lebar agar mata punya "nafas".
5. **Skill bukan angka.** Ditampilkan sebagai tag, bukan bar yang seolah mengukur.

---

## 2. Sistem Warna

Putih sebagai basis, near-black untuk teks (bukan hitam pekat, agar terasa "putih
dengan sedikit sekali hitam"). Tidak ada warna lain.

| Token | Nilai | Penggunaan |
|-------|-------|------------|
| `--color-bg` | `#FFFFFF` | Background utama |
| `--color-bg-subtle` | `#F6F6F5` | Panel/hover halus, pembeda area |
| `--color-text` | `#0F0F0F` | Teks utama (near-black) |
| `--color-text-muted` | `#6E6E6E` | Teks sekunder, caption, label |
| `--color-border` | `#E6E6E4` | Garis pemisah, border card |
| `--color-hover` | `#000000` | State hover teks/ikon (kontras naik) |

Catatan:
- Gunakan `--color-text` untuk badan teks; `--color-hover` hanya untuk penekanan
  interaktif.
- Pertahankan kontras teks utama ≥ 7:1 terhadap background (near-black di atas putih
  sudah aman).

---

## 3. Tipografi

**Font:** Archivo — di-load via `next/font/google`, di-subset `latin`, dengan
`display: swap`.

```ts
import { Archivo } from "next/font/google";

export const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-archivo",
});
```

**Skala (usulan):**

| Peran | Ukuran | Weight | Tracking |
|-------|--------|--------|----------|
| Display / nama | 40–56px | 700 | -0.02em |
| Judul halaman (H1) | 32–40px | 600 | -0.01em |
| Sub-judul (H2) | 22–26px | 600 | normal |
| Judul kecil (H3) | 18px | 500 | normal |
| Body | 16px | 400 | normal |
| Caption / label | 13–14px | 500 | 0.02em, kadang UPPERCASE |

- `line-height` body ~1.6 untuk keterbacaan; heading ~1.15–1.25.
- Nomor & label kecil boleh UPPERCASE dengan letter-spacing untuk kesan editorial
  (seperti referensi).

---

## 4. Layout & Grid

- **Main content dipusatkan secara horizontal**, menyisakan ruang kosong
  kiri-kanan **±10% lebar viewport** di layar lebar (padding horizontal
  persentase pada wrapper, dibungkus `max-width` ~1200px sebagai batas atas
  di layar sangat lebar, biar margin gak melar tanpa batas). Konten **tidak
  full-width**, dan bukan dua kolom fixed-width penuh layar seperti draf
  v1.0.
- **Di dalam area yang dipusatkan itu:**
  - **Sidebar** — kotak rounded, **sticky & vertically-centered**, tinggi
    mengikuti konten (bukan full-height).
  - **Konten section** — satu kolom, discroll (Lenis), berisi semua section
    berurutan.

```
┌──10%──┬──────────────── main (±80% viewport) ─────────────────┬──10%──┐
│         │  ┌─────────┐   ┌─────────────────────────┐   │         │
│         │  │ SIDEBAR │   │  CONTENT (scroll, Lenis) │   │         │
│  kosong │  │ (rounded,│   │  Tentang → Skills →      │   │  kosong │
│         │  │  sticky, │   │  Pengalaman → Projects → │   │         │
│         │  │  center- │   │  Contact                 │   │         │
│         │  │  vertikal)│  │                          │   │         │
│         │  └─────────┘   └─────────────────────────┘   │         │
└─────────┴───────────────────────────────────────────────┴─────────┘
```

- **Spacing scale** (kelipatan 4/8): 4, 8, 12, 16, 24, 32, 48, 64, 96px.
  Gunakan spasi besar antar seksi untuk kesan lega.

---

## 5. Komponen

### 5.1 Sidebar (desktop)
- **Kotak dengan sudut rounded** (`--radius-md`), border tipis
  (`--color-border`), padding dalam nyaman (mis. 32px).
- **Sticky & vertically-centered**: `position: sticky` + `top: 50%` +
  `translateY(-50%)` — tetap kelihatan pas discroll, tapi tinggi kotak
  mengikuti kontennya sendiri (bukan `height: 100vh`).
- Urutan vertikal: **foto profil** (bulat) → **nama** → **role/title
  singkat** → **icon sosial** (baris ikon, hover naik kontras) → **toggle
  bahasa**. **Tidak ada nav menu** — semua section sudah tampil di satu
  halaman yang sama.

### 5.2 Sidebar (mobile)
- Kartu yang sama (isi identik: foto, nama, role, sosial, toggle bahasa),
  tapi tampil sebagai **blok statis di bagian paling atas halaman** —
  bukan sticky, bukan drawer/hamburger. Karena tidak ada nav yang perlu
  disembunyikan, tidak perlu pola header+drawer dari draf v1.0.
- Layout dalam kartu boleh lebih horizontal di mobile (foto di kiri, nama+role
  di kanan) supaya tidak makan tinggi layar.

### 5.3 Social links
- Ikon garis (line icon) monokrom. Default `--color-text-muted`, hover
  `--color-hover`.
- Tiap ikon `<a>` dengan `aria-label`, `target="_blank"`, `rel="noopener"`.

### 5.4 Language toggle
- Dua state: **ID / EN**. State aktif ditandai (weight/underline), bukan warna.
- Aksi: pindah locale = ganti prefix URL via `<Link>` (tanpa full reload).

### 5.5 Project card
- Layout card bersih: **cover image** (rasio konsisten, mis. 16:10 atau 4:3),
  judul, tags (baris kecil), deskripsi singkat.
- Hover: elevasi sangat halus / border menegas / cover sedikit zoom — subtle saja.
- Ambil aset dari `public/assets/projects/<slug>/`.

### 5.6 Skill tag / grid
- **Tag list** untuk tools & soft skill. Bentuk pill dengan border tipis atau
  sekadar teks berjarak.
- **Tanpa progress bar / persentase.** Dua kelompok terpisah: **Tools** dan
  **Soft skills**, masing-masing diberi label seksi kecil (UPPERCASE muted).

### 5.7 Experience item *(baru di v1.1)*
- List vertikal sederhana, bukan card bertumpuk berat. Tiap entri: **role**
  (semibold) + **tempat** dalam satu baris, **periode** kecil di sampingnya
  (`--color-text-muted`, mis. UPPERCASE kecil), lalu **deskripsi** singkat di
  bawahnya.
- Pemisah antar entri: border tipis atas/bawah atau spacing besar — bukan
  card dengan shadow.

---

## 6. Motion & Interaksi

### 6.1 Smooth scroll (Lenis)
Diterapkan pada **area konten kanan**. Diperlambat dari default agar terasa
momentum halus.

```ts
// Contoh konfigurasi — nilai final disesuaikan saat testing
const lenis = new Lenis({
  duration: 2.2,                 // default ~1.2 → dinaikkan agar lebih pelan
  easing: (t) => 1 - Math.pow(1 - t, 3), // easeOutCubic, terasa "meluncur"
  smoothWheel: true,
  wheelMultiplier: 0.8,          // < 1 = tiap scroll bergerak lebih pelan
});
```

- Bungkus dalam client component (`SmoothScroll.tsx`) yang menjalankan RAF loop.
- **Hormati `prefers-reduced-motion`:** jika aktif, nonaktifkan/kurangi smoothing.

### 6.2 Hover & transition
- Durasi 150–250ms, easing ease-out. Perubahan hover halus (warna/opacity/posisi
  kecil), tidak berlebihan.
- Fokus keyboard: outline jelas (jangan dihilangkan) demi aksesibilitas.

### 6.3 Transisi halaman (opsional)
- Fade/slide ringan antar halaman boleh, tapi tetap cepat & tidak mengganggu.

---

## 7. Responsif / Breakpoints

| Breakpoint | Perilaku |
|-----------|----------|
| ≥ 768px (desktop/tablet) | Main dipusatkan (±10% margin kiri-kanan), sidebar rounded sticky vertically-centered di kiri, konten di kanan. |
| < 768px (mobile) | Sidebar jadi kartu statis di atas (layout horizontal ringkas); konten satu kolom penuh di bawahnya (dalam padding). |

- Di layar sangat lebar, `max-width` pada wrapper mencegah margin kiri-kanan
  melebihi proporsi wajar — lihat §10.

---

## 8. Aksesibilitas

- Kontras teks utama tinggi (near-black di atas putih).
- Semua kontrol interaktif dapat difokuskan & dioperasikan via keyboard
  (toggle bahasa, link sosial, link project). Gunakan `--focus-ring`
  (outline 2px solid, offset 2px) — jangan hilangkan outline tanpa pengganti.
- `prefers-reduced-motion` mematikan smooth scroll berlebih.
- Gambar punya `alt` yang bermakna (foto profil, cover project).

---

## 9. Struktur File (usulan)

```
src/
  app/
    [locale]/
      layout.tsx           // wrapper margin + SmoothScroll + provider i18n
      page.tsx             // satu-satunya halaman — semua section di sini
  components/
    layout/
      Sidebar.tsx           // rounded, sticky, vertically-centered (desktop)
                             // + varian kartu statis (mobile) di komponen sama
      LanguageToggle.tsx
      SocialLinks.tsx
    SmoothScroll.tsx        // wrapper Lenis (client component)
    ProjectCard.tsx
    SkillTag.tsx
    ExperienceItem.tsx
  content/
    profile.ts             // nama, role, sosial
    projects.ts            // data project (title, desc id/en, tags, cover, link)
    experience.ts           // data pengalaman (placeholder)
  i18n/
    routing.ts             // konfigurasi locale (id, en)
    navigation.ts
    request.ts
  styles/
    fonts.ts
messages/
  id.json
  en.json
public/
  assets/
    photos/profile.jpg
    projects/
      <slug>/cover.jpg
```

> v1.1 menghapus `MobileHeader.tsx`, `Drawer.tsx`, dan `NavLinks.tsx` dari
> draf v1.0 — tidak relevan lagi tanpa nav menu/multi-page. Route per
> halaman (`about/`, `skills/`, dst.) juga dihapus; semua jadi section di
> satu `page.tsx`.

---

## 10. Token Ringkas (untuk implementasi)

```css
:root {
  --color-bg: #FFFFFF;
  --color-bg-subtle: #F6F6F5;
  --color-text: #0F0F0F;
  --color-text-muted: #6E6E6E;
  --color-border: #E6E6E4;
  --color-hover: #000000;

  --container-max: 1200px;   /* batas atas lebar main di layar sangat lebar */
  --sidebar-w: 300px;         /* di rentang 280–320px */

  --radius-sm: 8px;
  --radius-md: 12px;

  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --dur-fast: 150ms;
  --dur-base: 250ms;

  --focus-ring: 2px solid var(--color-text);
  --focus-ring-offset: 2px;
}
```

---

## 11. Checklist Sesuai Referensi

- [ ] Main dipusatkan, margin kiri-kanan ±10% di layar lebar (tidak full-width).
- [ ] Sidebar berbentuk kotak rounded, sticky, vertically-centered — bukan
      panel fixed full-height, dan **tanpa nav menu**.
- [ ] Mobile: sidebar jadi kartu statis di atas (bukan drawer/hamburger).
- [ ] Putih dominan, aksen hitam tipis, tanpa warna lain.
- [ ] Font Archivo via `next/font`.
- [ ] Scroll pelan (Lenis) di area konten.
- [ ] Skills sebagai tag/grid, tanpa progress bar.
- [ ] Section Pengalaman tampil (placeholder) di antara Skills dan Projects.
- [ ] Projects dari config + folder aset per slug.
- [ ] Toggle ID/EN ganti prefix URL tanpa reload penuh.
- [ ] Semua section (Tentang/Skills/Pengalaman/Projects/Contact) tampil di
      satu halaman yang sama, urut vertikal.
