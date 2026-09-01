# Design — Website Portofolio Personal

**Versi:** 1.0
**Tanggal:** 2026-09-01
**Referensi:** https://sawad.framer.website/ · https://www.satriabahari.my.id/en

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

- **Container maksimum ~1400px**, `margin-inline: auto`, dengan padding kiri-kanan
  agar tidak menempel tepi di layar lebar. Konten **tidak full-width**.
- **Dua kolom di desktop:**
  - **Sidebar kiri fixed**, lebar **280–320px**.
  - **Kolom konten kanan**, punya **scroll area sendiri**.

```
┌──────────────────────── max-width ~1400px ─────────────────────────┐
│                                                                    │
│  ┌───────────────┐   ┌───────────────────────────────────────┐    │
│  │  SIDEBAR       │   │  CONTENT (scroll sendiri, Lenis)       │    │
│  │  (fixed,       │   │                                        │    │
│  │   280–320px)   │   │  Halaman aktif                         │    │
│  │                │   │                                        │    │
│  │  • foto        │   │                                        │    │
│  │  • nama        │   │                                        │    │
│  │  • role        │   │                                        │    │
│  │  • sosial      │   │                                        │    │
│  │  • toggle ID/EN│   │                                        │    │
│  │  • nav menu    │   │                                        │    │
│  └───────────────┘   └───────────────────────────────────────┘    │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘
```

- **Spacing scale** (kelipatan 4/8): 4, 8, 12, 16, 24, 32, 48, 64, 96px.
  Gunakan spasi besar antar seksi untuk kesan lega.

---

## 5. Komponen

### 5.1 Sidebar (desktop)
- Fixed di kiri, penuh tinggi viewport.
- Urutan vertikal: **foto profil** (bulat/rounded) → **nama** → **role/title
  singkat** → **icon sosial** (baris ikon, hover naik kontras) → **toggle bahasa**
  → **nav menu**.
- Border kanan tipis (`--color-border`) opsional sebagai pemisah dari konten.
- Item nav aktif: penanda selain warna (mis. garis kecil / titik / weight naik).

### 5.2 Mobile header + drawer
- **Header bar tipis**: foto kecil + nama di kiri, **hamburger** di kanan.
- **Drawer** (slide dari kanan/kiri) berisi: nav menu, icon sosial, toggle bahasa.
- Overlay gelap tipis di belakang drawer; klik overlay / Esc / tombol close =
  tutup.
- Transisi drawer halus (ease-out ~250ms).

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
| ≥ 1024px (desktop) | Sidebar fixed + konten kanan (dua kolom). |
| 768–1023px (tablet) | Bisa tetap dua kolom dengan sidebar lebih sempit, atau beralih ke header + drawer. |
| < 768px (mobile) | Header bar tipis + hamburger drawer; konten satu kolom penuh (dalam padding). |

- Konten selalu dibatasi oleh container ~1400px; di layar sangat lebar, whitespace
  kiri-kanan bertambah.

---

## 8. Aksesibilitas

- Kontras teks utama tinggi (near-black di atas putih).
- Semua kontrol interaktif dapat difokuskan & dioperasikan via keyboard (nav,
  toggle, drawer, link sosial). Gunakan `--focus-ring` (outline 2px solid,
  offset 2px) — jangan hilangkan outline tanpa pengganti.
- Drawer mobile: fokus terkurung saat terbuka, Esc menutup, tombol punya
  `aria-label`.
- `prefers-reduced-motion` mematikan smooth scroll berlebih.
- Gambar punya `alt` yang bermakna (foto profil, cover project).

---

## 9. Struktur File (usulan)

```
src/
  app/
    [locale]/
      layout.tsx           // sidebar/header + SmoothScroll + provider i18n
      page.tsx             // Home
      about/page.tsx
      skills/page.tsx
      projects/page.tsx
      projects/[slug]/page.tsx   // opsional (detail)
      contact/page.tsx
  components/
    Sidebar.tsx
    MobileHeader.tsx
    Drawer.tsx
    LanguageToggle.tsx
    SocialLinks.tsx
    SmoothScroll.tsx        // wrapper Lenis (client component)
    ProjectCard.tsx
    SkillTag.tsx
  content/
    projects.ts            // data project (title, desc id/en, tags, cover, link)
  i18n/
    routing.ts             // konfigurasi locale (id, en)
    request.ts
  styles/
    globals.css            // token warna (CSS variables), reset, base
messages/
  id.json
  en.json
public/
  assets/
    profile.jpg
    projects/
      <slug>/cover.jpg
```

> Catatan App Router: pakai **segment folder** per halaman (`about/`, `skills/`,
> dst.), bukan route group `(...)` — tanda kurung tidak muncul di URL, jadi tidak
> membentuk path halaman. Home = `page.tsx` di root `[locale]`.

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

  --container-max: 1400px;
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

- [ ] Container tidak full-width (max ~1400px, margin auto).
- [ ] Sidebar kiri fixed dengan foto, nama, role, sosial, toggle bahasa, nav.
- [ ] Mobile: header tipis + hamburger drawer.
- [ ] Putih dominan, aksen hitam tipis, tanpa warna lain.
- [ ] Font Archivo via `next/font`.
- [ ] Scroll pelan (Lenis) di area konten kanan.
- [ ] Skills sebagai tag/grid, tanpa progress bar.
- [ ] Projects dari config + folder aset per slug.
- [ ] Toggle ID/EN ganti prefix URL tanpa reload penuh.
