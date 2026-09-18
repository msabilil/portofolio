# Project Detail Context

Dokumen ini adalah source of truth untuk penulisan konten dan implementasi frontend halaman detail
project portfolio. Tujuannya adalah menjaga pekerjaan tetap berbasis fakta, mudah dibaca recruiter,
dan tidak berubah menjadi halaman yang terlalu besar atau terlalu dekoratif.

## Konteks utama

Halaman detail project menggunakan struktur dari skill `ux-writing-ia-showcase`. Skill tersebut
menjadi acuan untuk urutan konten, UX Writing, Information Architecture, evidence, metric, dan
recruiter summary.

Tambahan wajib untuk setiap case study adalah bagian `In a nutshell`. Bagian ini memberi konteks
singkat sebelum pembaca masuk ke snapshot dan detail proses.

Skill `design-taste-frontend` dipakai sebagai guardrail frontend. Arah visualnya adalah portfolio
detail yang tenang, rapi, nyaman dibaca, dan mendukung isi. Halaman tidak perlu terlihat seperti
showcase design yang penuh efek.

## Design read

Reading this as: portfolio project detail for recruiters and hiring managers, with a calm and
editorial reading language, leaning toward the existing project tokens, native CSS, and restrained
motion.

### Dial yang digunakan

- `DESIGN_VARIANCE: 3` karena struktur harus jelas dan tidak eksperimental.
- `MOTION_INTENSITY: 2` karena pembaca perlu fokus pada narasi dan evidence.
- `VISUAL_DENSITY: 3` karena halaman membutuhkan ruang baca, tetapi tetap mudah discan.

Jangan menaikkan dial hanya untuk membuat halaman terlihat lebih menarik. Isi case study adalah
elemen utama.

## Struktur konten halaman

Urutan default halaman:

```text
Back to projects
Project title
Value proposition
Project links
Project facts inside the hero area, without a Snapshot heading
In a nutshell as a separate section
The Problem
Approach & Architecture
  Information Architecture
  UX Writing Approach
  Tech Stack
  Key Decisions & Trade-offs
Results & Performance Benchmarks
  Time Saved
  Error Reduction
  Supporting metrics
  Measurement notes and limitations
Code & Artifact Deep Dive
Impact
What I’d Change Today
Recruiter Summary
```

Urutan ini boleh berubah jika isi project tidak memiliki bagian tertentu. Bagian yang tidak
didukung evidence lebih baik dihilangkan atau ditandai unavailable daripada diisi dengan asumsi.

## Aturan `In a nutshell`

### Tujuan

`In a nutshell` menjawab tiga hal:

1. Apa konteks produk, industri, atau workflow-nya?
2. Mengapa konteks tersebut penting bagi pengguna atau bisnis?
3. Apa tujuan utama project ini?

### Bentuk

- Letakkan setelah value proposition dan sebelum snapshot.
- Gunakan 2 sampai 3 paragraf pendek.
- Gunakan bahasa naratif yang konkret, bukan slogan.
- Boleh menggunakan bahasa Inggris jika locale project adalah Inggris.
- Jangan memasukkan metric yang belum memiliki sumber.
- Jangan mengarang client, user count, market position, revenue, adoption, atau testimonial.
- Jika hanya ada satu fakta yang kuat, tulis satu paragraf yang padat.

### Contoh dari brief

Contoh berikut adalah pola copy untuk project transportasi. Ini bukan fakta yang boleh dipindahkan
ke project lain tanpa sumber yang sama.

> In the bustling landscape of Indonesia's transportation, buses and shuttles weave an essential
> thread by connecting people and cultures. Recognizing the pivotal role these modes of transport
> play in the lives of millions, we embarked on a design journey to enhance the way people move
> using buses and shuttles.
>
> With buses and shuttles securing the top two spots in search inquiries on tiket.com, our team set
> out to address the unique needs of our users, ensuring a seamless and efficient booking process.
>
> The goal was clear: to elevate the user journey, streamline processes, and boost the market
> presence of buses and shuttles on our platform.

### Content model

Case study content harus memiliki field terlokalisasi untuk bagian ini, misalnya:

```ts
inANutshell: {
  id: string;
  en: string;
}
```

Satu sumber content dipakai untuk card summary, halaman detail, dan recruiter summary. Jangan
menduplikasi narasi di beberapa komponen.

## Aturan judul dan heading

Masalah yang harus dihindari terlihat pada halaman `Production Scheduling System` saat ini:

- Ada label `PROJECT CASE STUDY` di atas title.
- Ada label `SNAPSHOT` sebagai micro-label sebelum isi snapshot.
- Ada nomor `01` di atas `The Problem`.
- Ada nomor `02`, `03`, dan `04` untuk section berikutnya.
- Judul utama terlalu besar sehingga mengambil perhatian lebih besar daripada isi.

Target baru:

- `Project title` adalah `h1` pertama di halaman. Tidak ada teks, nomor, index, atau eyebrow di
  atasnya.
- Hapus `PROJECT CASE STUDY` dan padanan Indonesianya dari atas title.
- Hero mencakup title, value proposition, project links, dan project facts.
- Project facts tetap ditampilkan di dalam hero, tetapi jangan menambahkan heading `Snapshot`.
- `In a nutshell` adalah section terpisah setelah hero, bukan bagian dari hero.
- `The Problem`, `Approach & Architecture`, `Results & Performance Benchmarks`, dan
  `Code & Artifact Deep Dive` menggunakan heading biasa tanpa nomor.
- Menghapus nomor juga berarti menghapus background, panel, pseudo-element, atau dekorasi yang hanya
  ada untuk menopang nomor tersebut.
- Jangan memakai format `01 / 04`, `001`, `No. 01`, atau pagination dekoratif.
- Jangan memakai label kecil hanya agar layout terlihat lebih designerly.
- Heading harus menjelaskan isi section. Jika tidak menambah makna, hapus.

## Arah typography

Typography harus nyaman untuk membaca case study panjang.

- Hindari `text-7xl`, `text-8xl`, atau ukuran display yang membuat title mendominasi halaman.
- Target `h1` desktop sekitar 48 sampai 64px, dan mobile sekitar 36 sampai 44px.
- Target `h2` sekitar 28 sampai 36px, dengan skala yang konsisten antar section.
- Body text sekitar 16 sampai 18px dengan `line-height` sekitar 1.6 sampai 1.8.
- Batasi lebar paragraf sekitar 60 sampai 70 karakter agar mata tidak cepat lelah.
- Gunakan satu keluarga font yang sudah dipakai project. Jangan menambah font baru hanya untuk
  membuat halaman terasa premium.
- Prioritaskan weight, contrast, dan spacing daripada ukuran ekstrem.
- Hindari italic atau serif dekoratif jika tidak memiliki alasan dari brand.

## Arah layout dan scroll

- Gunakan satu kolom baca utama dengan lebar terkontrol.
- Snapshot boleh memakai grid sederhana jika membantu scanning, lalu collapse menjadi satu kolom di
  mobile.
- Jangan menggunakan scroll hijack, horizontal scroll, sticky stack, parallax, atau transisi antar
  section untuk halaman ini.
- Native vertical scroll harus terasa stabil di desktop dan mobile.
- Jangan menambahkan scroll cue seperti `Scroll to explore`.
- Spacing harus membentuk ritme yang jelas, bukan section yang melayang terlalu jauh satu sama lain.
- Setiap section harus memiliki reading order yang tetap pada mobile.
- Link kembali ke gallery tetap terlihat dan mudah ditemukan, tetapi tidak boleh mengambil perhatian
  dari title.

## Arah visual

Halaman harus terlihat rapi dan content-first.

- Pertahankan theme, color token, typography, dan navigation project yang sudah ada.
- Gunakan maksimal satu accent yang sudah tersedia di project.
- Jangan menambah gradient besar, glow, noise, glassmorphism, atau decorative shape tanpa fungsi.
- Gunakan card hanya jika card membantu grouping atau hierarchy. Untuk sebagian besar section,
  whitespace dan divider sederhana sudah cukup.
- Jangan membuat bento grid atau tiga kartu identik untuk isi case study.
- Jangan membuat fake screenshot dari kumpulan `div`.
- Gunakan screenshot atau artifact asli jika tersedia. Jika tidak ada, jangan mengarang preview.
- Jangan menambahkan label status, dot dekoratif, badge, atau pill hanya untuk mengisi ruang.
- Jangan menggunakan animation yang tidak membantu hierarchy, feedback, atau perubahan state.
- Hormati `prefers-reduced-motion` jika ada motion ringan seperti reveal.

## Aturan penulisan case study

Gunakan struktur dan evidence dari `ux-writing-ia-showcase`.

- Buka dengan outcome atau perubahan yang dapat dipahami pembaca non-teknis.
- Jelaskan problem dalam 2 sampai 4 kalimat: siapa yang terdampak, bottleneck, dan constraint.
- Tulis keputusan dengan pola `Saya memilih X dibanding Y karena Z`.
- Tampilkan IA dalam sitemap, task flow, atau diagram jika memang membantu.
- Tampilkan UX Writing dalam tabel `Context | Before | After | Reasoning` jika data tersedia.
- Bedakan evidence `Measured`, `Estimated`, `Proxy`, dan `Qualitative`.
- Jangan mengubah capability seperti validasi, dropdown, atau centralization menjadi klaim penurunan
  error aktual tanpa data.
- Untuk angka waktu atau error, tulis sumber, metode pengukuran, asumsi, dan keterbatasan.
- Nyatakan role, kontribusi pribadi, kolaborator, status project, dan batasan publikasi.
- Project fiktif atau self-directed harus diberi label yang sesuai.
- Link private, unavailable, atau tidak aman dipublikasikan harus memiliki status yang jelas.

## Mapping ke codebase

Dokumen ini berlaku terutama untuk:

- `src/content/caseStudies.ts`: source content localized dan evidence.
- `src/app/projects/[slug]/page.tsx`: detail route dan metadata.
- `src/components/case-study/CaseStudyPage.tsx`: rendering struktur halaman.
- `src/components/case-study/CaseStudyPage.module.css`: typography, spacing, layout, dan responsive
  behavior.

Implementasi berikutnya sebaiknya menghapus ketergantungan pada prop `number` di `CaseSection`,
menghapus eyebrow case study di hero, dan menambahkan field `inANutshell` pada content model.
Perubahan tersebut belum dilakukan oleh dokumen ini.

## Checklist sebelum dianggap selesai

- [ ] `h1` hanya berisi title project.
- [ ] Tidak ada `PROJECT CASE STUDY` atau label sejenis di atas title.
- [ ] Hero mencakup title, value proposition, links, dan project facts.
- [ ] `In a nutshell` berada sebagai section terpisah setelah hero.
- [ ] Tidak ada heading `Snapshot`.
- [ ] Tidak ada nomor section di atas atau di samping heading.
- [ ] Tidak ada background atau decorative panel sisa dari nomor section.
- [ ] Ada bagian `In a nutshell` jika project memiliki konteks yang cukup.
- [ ] Semua copy `In a nutshell` bersumber dari fakta project.
- [ ] Title tidak mendominasi viewport.
- [ ] Body text nyaman dibaca pada desktop dan mobile.
- [ ] Native vertical scroll tetap stabil.
- [ ] Tidak ada scroll hijack atau motion dekoratif yang tidak perlu.
- [ ] Heading hierarchy valid dan reading order mobile masuk akal.
- [ ] Metric diberi status evidence dan tidak mengandung angka rekaan.
- [ ] Link private atau unavailable diberi status yang jelas.
- [ ] Theme, font, dan color token existing tetap konsisten.
- [ ] Tidak ada fake screenshot, bento kosong, atau decorative label yang tidak memiliki fungsi.
- [ ] Copy telah dibaca ulang untuk menghapus kalimat yang terdengar seperti halusinasi atau slogan
  generik.
