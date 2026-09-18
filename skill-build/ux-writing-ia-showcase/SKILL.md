---
name: ux-writing-ia-showcase
description: >-
  Create recruiter-friendly UX Writing and Information Architecture portfolio case studies
  for projects, especially work that digitizes manual workflows. Use this skill whenever the
  user asks for a portfolio showcase, project case study, UX Writing before/after, IA or sitemap
  documentation, architecture decisions, recruiter summary, Time Saved, Error Reduction, or
  a manual-to-digital impact narrative.
metadata:
  short-description: "Build UX Writing + IA portfolio case studies"
---

# UX Writing + IA Showcase

Gunakan skill ini untuk mengubah project yang sudah selesai atau sedang berjalan menjadi bukti
kerja yang mudah dipindai recruiter, tetapi tetap cukup dalam untuk hiring manager atau engineer.
Output utamanya adalah satu case study lengkap dan satu recruiter summary yang berasal dari narasi
serta evidence yang sama.

## Alur kerja

1. Pahami project dari brief pengguna, file code/content, screenshot, link demo, Figma, repository,
   dan artefak yang tersedia. Bedakan fakta yang terlihat dari asumsi.
2. Susun value proposition satu kalimat yang menyebutkan perubahan atau outcome, bukan hanya nama
   teknologi.
3. Petakan Problem, Approach & Architecture, Results & Performance Benchmarks, serta Code & Artifact
   Deep Dive. Untuk project UX, bagian architecture mencakup IA, content structure, dan UX Writing;
   untuk project engineering, sertakan system design dan trade-off teknis.
4. Pilih status evidence untuk setiap klaim impact:
   - **Measured:** berasal dari data penggunaan atau pengujian langsung.
   - **Estimated:** dihitung dari breakdown langkah kerja, observasi, wawancara, atau sampel kecil.
   - **Proxy:** memakai jumlah langkah, handoff, peran, form, atau proses yang dihilangkan.
   - **Qualitative:** menjelaskan kemampuan sistem atau perubahan workflow tanpa angka.
5. Tulis case study lengkap dan recruiter summary. Jangan mengisi angka yang tidak diberikan.
6. Jika pengguna meminta preview, riset, atau rancangan, tampilkan draft tanpa mengubah code. Jika
   pengguna meminta implementasi, audit struktur project dan gunakan pola routing/content yang sudah
   ada sebelum memilih komponen baru.

## Struktur output wajib

Baca [case-study-template.md](references/case-study-template.md) ketika menghasilkan case study.
Gunakan urutan berikut, kecuali pengguna meminta format lain:

```text
# Project Title: High-Level Value Proposition
In a nutshell
Links: Live Demo | IA/Architecture Diagram | Figma/API Documentation | Repository
Project Snapshot
The Problem
Approach & Architecture
   - Information Architecture
   - UX Writing Approach
   - Tech Stack
   - Key Decisions & Trade-offs
Results & Performance Benchmarks
   - Time Saved
   - Error Reduction
   - Supporting metrics
   - Measurement method and limitations
Code & Artifact Deep Dive
Impact
What I’d Change Today
Recruiter Summary
```

### In a nutshell

Tambahkan bagian `In a nutshell` setelah judul dan value proposition, sebelum snapshot. Sebelum
menulisnya, kumpulkan informasi berikut dari pengguna, repository, brief, atau artefak project.
Jika informasi belum tersedia, tandai sebagai unknown atau tanyakan secara eksplisit. Jangan mengisi
bagian yang kosong dengan asumsi.

#### Informasi yang perlu dikumpulkan

- **Context / Background:** Sistem dibuat untuk perusahaan atau industri apa? Proses kerja atau
  proses produksi seperti apa yang dijalankan? Siapa yang biasanya membuat jadwal atau keputusan?
- **Problem:** Sebelum sistem ada, proses dilakukan dengan apa, misalnya Excel, manual, WhatsApp,
  papan produksi, atau sistem lama? Apa bottleneck utamanya?
- **Users:** Siapa pengguna utama, misalnya Production Planner, PPIC, Supervisor Produksi, Admin,
  Manager, atau peran lain?
- **Business / Operational Impact:** Masalah tersebut menyebabkan apa, misalnya production delay,
  overtime, idle machine, salah prioritas order, atau sulit memonitor progress?
- **Solution:** Secara sederhana sistem yang dibuat melakukan apa? Sebutkan input penting seperti
  order, mesin, kapasitas, deadline, atau prioritas jika memang ada di evidence.
- **Your Role:** Apa kontribusi penulis, misalnya UI/UX Designer, Product Designer, Developer,
  atau end-to-end dari research sampai development?
- **Goal:** Target utama project apa, misalnya mempercepat scheduling, mengurangi konflik jadwal,
  meningkatkan visibility produksi, atau membuat planning lebih terstruktur?
- **Result / Outcome:** Apa yang berubah setelah sistem dibuat? Gunakan angka jika measured atau
  estimated dengan metode yang jelas. Jika belum ada angka, jelaskan expected impact atau outcome
  kualitatif secara jujur.

#### Format sintesis opsional

Setelah informasi terkumpul, informasi tersebut bisa diringkas menjadi lima komponen berikut sebelum
mengubahnya menjadi narasi:

- **Context:** latar industri, produk, proses, dan pengguna.
- **Opportunity:** sinyal kebutuhan atau potensi bisnis yang membuat project relevan.
- **Challenge:** kondisi sebelum solusi, bottleneck, dan dampak operasionalnya.
- **Goal:** perubahan yang ingin dicapai.
- **Solution and Outcome:** apa yang dibangun, kontribusi penulis, dan hasil atau expected impact.

Format ringkas boleh ditulis seperti ini:

```text
Context — [industri, proses, dan pengguna]
Opportunity — [sinyal kebutuhan atau potensi yang didukung evidence]
Challenge — [workflow lama, bottleneck, dan dampak]
Goal — [target perubahan]
Solution and Outcome — [solusi, role, hasil atau expected impact]
```

Gunakan tanda `—` hanya sebagai separator pada draft internal ini. Untuk copy yang dirender di
halaman, ikuti aturan visual project dan hindari separator dekoratif jika tidak diperlukan.

#### Bentuk narasi final

Ubah sintesis tersebut menjadi 2 sampai 3 paragraf pendek yang mengalir. Narasi harus menjelaskan
konteks, alasan project penting, challenge, dan goal tanpa terdengar seperti daftar fitur. Solution,
role, dan outcome dapat masuk di paragraf terakhir atau tetap dijelaskan pada bagian berikutnya.
Pisahkan fakta `Measured`, `Estimated`, `Proxy`, `Qualitative`, dan `Expected` sesuai evidence.
Bagian ini bukan tempat untuk mengarang metric, client, adoption, revenue, atau testimonial.

Contoh bentuk narasi:

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

Gunakan contoh tersebut sebagai pola kedalaman dan alur, bukan sebagai fakta yang boleh dipindahkan
ke project lain. Jika sumber hanya mendukung satu paragraf, tulis satu paragraf yang padat daripada
menambah konteks fiktif.

### Presentasi halaman project detail

Untuk implementasi halaman detail portfolio, struktur case study tetap mengikuti template di atas,
namun heading tidak diberi nomor dan tidak memakai label dekoratif sebelum judul.

- Judul project menjadi `h1` pertama. Jangan menaruh `Project Case Study`, nomor, index, atau eyebrow
  lain di atas judul.
- `Snapshot` adalah heading biasa tanpa nomor.
- `The Problem`, `Approach & Architecture`, `Results & Performance Benchmarks`, dan bagian lain
  memakai heading biasa tanpa `01`, `02`, `03`, atau pagination.
- Jika sebuah label tidak membantu pembaca memahami isi, hapus label tersebut.
- Jangan membuat judul besar hanya untuk memberi kesan portfolio. Utamakan ukuran yang nyaman,
  lebar baca yang terkontrol, line-height yang lega, dan jarak section yang konsisten.
- Halaman harus terasa rapi, tenang, dan mudah discan. Design mendukung isi case study, bukan
  mengambil perhatian dari evidence.

## Metrik digitalisasi

Untuk project manual-to-digital, prioritaskan `Time Saved` dan `Error Reduction`. Metrik teknis seperti
latency atau bundle size hanya menjadi tambahan jika ada data yang relevan.

### Time Saved

Gunakan satuan yang sama, idealnya menit:

```text
time saved per process = manual minutes - digital minutes
time saved (%) = (manual minutes - digital minutes) / manual minutes × 100
```

Jika frekuensi tersedia, hitung skala secara terpisah:

```text
monthly hours saved = time saved per process × processes per day × workdays per month / 60
```

Contoh: 240 menit manual menjadi 30 menit digital berarti hemat 210 menit atau 87,5% per proses.
Tulis sebagai `estimated` jika angka berasal dari asumsi atau breakdown, bukan pengukuran langsung.

### Error Reduction

Gunakan error rate atau jumlah rework yang sebanding:

```text
error reduction (%) = (manual error rate - digital error rate) / manual error rate × 100
```

Jika tidak ada persentase, gunakan bukti yang bisa diverifikasi: validasi input, dropdown, auto-fill,
single source of truth, version control, atau jumlah langkah yang mencegah kesalahan. Jangan mengubah
kemampuan pencegahan error menjadi klaim penurunan error aktual tanpa data.

### Jika tidak ada data historis

Gunakan pendekatan estimasi secara eksplisit:

- pecah workflow manual menjadi langkah dan estimasikan durasi tiap langkah;
- catat sumber estimasi: observasi, wawancara, sampel, atau asumsi;
- ukur alur digital pada satu atau beberapa skenario bila memungkinkan;
- tampilkan skala proses, jumlah langkah, jumlah orang, atau frekuensi jika waktu tidak dapat dipercaya;
- beri label `Estimated Impact` dan tulis keterbatasannya.

Contoh framing yang aman:

> Berdasarkan breakdown workflow dan wawancara dengan dua staff operasional, proses manual diperkirakan
> memerlukan sekitar 50 menit per dokumen. Dengan sistem digital, alur tersebut diperkirakan menjadi
> sekitar 3 menit. Ini adalah estimasi proses, bukan data produksi langsung.

## Standar penulisan

- Buka dengan outcome atau perubahan yang dapat dipahami pembaca non-teknis.
- Jelaskan problem dalam 2–4 kalimat: siapa yang terdampak, apa bottleneck-nya, dan constraint utama.
- Tulis keputusan sebagai `Saya memilih X dibanding Y karena Z`, bukan daftar aktivitas.
- Tampilkan IA dalam sitemap, task flow, atau diagram Mermaid jika memang membantu pembaca.
- Tampilkan UX Writing dalam tabel `Context | Before | After | Reasoning`.
- Hubungkan setiap hasil ke evidence: screenshot, Figma node, route, component, schema, test, atau link
  repository. Jika link line-level tidak tersedia, gunakan file atau section yang paling spesifik.
- Pisahkan hasil nyata, estimasi, proxy, dan kemampuan yang dirancang.
- Nyatakan kontribusi pribadi, kolaborator, status project, serta keterbatasan publikasi.
- Untuk project fiktif atau self-directed, beri label tersebut dan jangan menulis seolah-olah ada client,
  user, revenue, launch, atau testimonial nyata.
- Hasil akhir boleh Bahasa Indonesia, Inggris, atau keduanya sesuai locale project; pertahankan istilah
  teknis dalam bentuk aslinya bila lebih jelas.

## Mode implementasi

Jika diminta mengubah website:

1. Pertahankan visual language, typography, navigation, locale, dan accessibility pattern project.
2. Jangan memaksa case study panjang ke modal atau card yang hanya cocok untuk ringkasan; gunakan halaman
   detail atau route khusus jika pembaca perlu mengikuti alur evidence.
3. Gunakan content model terstruktur agar satu project dapat menghasilkan card, halaman lengkap, dan
   recruiter summary tanpa menduplikasi copy.
4. Verifikasi link, responsive reading order, heading hierarchy, keyboard access, dan status private/
   unavailable sebelum menyatakan implementasi selesai.
