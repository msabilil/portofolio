import type { ReactNode } from "react";
import type { CaseStudy } from "@/content/caseStudies";
import { businessProcessArtifacts, productionArtifactGroups, type ProductionArtifact } from "@/content/productionArtifacts";
import { ArtifactImage } from "./ArtifactImage";
import styles from "./CaseStudyPage.module.css";

export function ProductionCaseStudy({ study, locale }: { study: CaseStudy; locale: "id" | "en" }) {
  const id = locale === "id";
  const text = (value: { id: string; en: string }) => value[locale];
  const visual = (asset: ProductionArtifact) => (
    <ArtifactImage key={asset.src} src={asset.src} alt={text(asset.label)} caption={text(asset.label)} locale={locale} width={asset.width} height={asset.height} originalResolution />
  );
  const gallery = (assets: ProductionArtifact[]) => (
    <>
      <div className={styles.artifactGallery}>{assets.slice(0, 2).map(visual)}</div>
      {assets.length > 2 && (
        <details className={styles.sampleDetails}>
          <summary>{id ? "Lihat lainnya" : "View more"} ({assets.length - 2} {id ? "gambar" : "images"})</summary>
          <div className={styles.artifactGallery}>{assets.slice(2).map(visual)}</div>
        </details>
      )}
    </>
  );
  return (
    <>
      <section className={styles.nutshell} aria-labelledby="case-study-in-a-nutshell">
        <h2 id="case-study-in-a-nutshell">In a nutshell</h2>
        <div className={styles.nutshellBody}>
          {text(study.inANutshell!).split("\n\n").map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </section>
      <Section name="problem" title={id ? "Masalah" : "The problem"}>
        <p>{text(study.problem)}</p>
      </Section>
      <Section name="approach" title={id ? "Pendekatan dan arsitektur" : "Approach and architecture"}>
        <p>{id ? "Pendekatan dimulai dari analisis proses bisnis melalui BPMN, dilanjutkan dengan penentuan metode estimasi dan prioritas kerja, lalu perancangan sistem, database, serta antarmuka." : "The approach starts with BPMN business process analysis, followed by the estimation and job-priority method, then the system, database, and interface design."}</p>
        <div className={styles.subsection}>
          <h3 id="case-study-business-analysis" className={styles.stageHeading}>{id ? "Analisis proses bisnis dengan BPMN" : "Business process analysis with BPMN"}</h3>
          <p>{id ? "BPMN memetakan alur penjadwalan dan pelaksanaan produksi, dari penyerahan pesanan serta file cetak kepada supervisor hingga persiapan mesin, pencetakan, finishing, dan pencatatan hasil." : "The BPMN diagrams map scheduling and production, from handing orders and print files to the supervisor through machine preparation, printing, finishing, and recording results."}</p>
          {gallery(businessProcessArtifacts)}
        </div>
        <div className={styles.subsection}>
          <h3 id="case-study-system-design" className={styles.stageHeading}>{id ? "Perancangan sistem dan database" : "System and database design"}</h3>
          <p>{text(study.informationArchitecture)}</p>
          <h4>Entity Relationship Diagram (ERD)</h4>
          <p>{id ? "Model hubungan antara pesanan, file cetak, desain, estimasi, mesin, dan jadwal produksi." : "Relationships between orders, print files, designs, estimates, machines, and production schedules."}</p>
          {gallery([productionArtifactGroups[1].images[0]])}
          <h4>Data Flow Diagram (DFD)</h4>
          <p>{id ? "Diagram konteks (Level 0) menunjukkan hubungan antarperan. DFD Level 1 memetakan alur utama sistem." : "The context diagram (Level 0) shows role interactions. DFD Level 1 maps the main system flow."}</p>
          {gallery(productionArtifactGroups[2].images)}
          <h4>{id ? "Skema relasi database" : "Database relational schema"}</h4>
          <p>{id ? "Struktur tabel, primary key, dan foreign key untuk pesanan, estimasi, rincian proses, serta analisis jadwal." : "Tables, primary keys, and foreign keys for orders, estimates, process details, and schedule analysis."}</p>
          {gallery([productionArtifactGroups[1].images[1]])}
        </div>
        <div className={styles.subsection}>
          <h3 id="case-study-prototype" className={styles.stageHeading}>{id ? "Perancangan UI/UX" : "UI/UX design"}</h3>
          <p>{text(productionArtifactGroups[4].detail)}</p>
          {gallery(productionArtifactGroups[4].images)}
        </div>
      </Section>
      <Section name="interface" title={id ? "Pengembangan" : "Development"}>
        <p>{id ? "Saya mengembangkan seluruh aplikasi, dari halaman per peran dan interaksi pengguna hingga fungsi perhitungan PHP serta penyimpanan MySQL." : "I built the whole application, from role-specific pages and user interactions to the PHP calculation functions and MySQL data model."}</p>
        <div className={styles.subsection}>
          <h3 id="case-study-frontend" className={styles.stageHeading}>Frontend</h3>
          <p>{id ? "Halaman PHP dirender di server dengan layout dan navigasi sesuai empat peran. HTML, Tailwind CSS, CSS tambahan, dan JavaScript membentuk formulir serta interaksi tanpa lapisan API terpisah." : "Server-rendered PHP pages use layouts and navigation for four roles. HTML, Tailwind CSS, additional CSS, and JavaScript provide forms and interactions without a separate API layer."}</p>
          <ul className={styles.implementationList}>
            <li>{id ? "Staf penjualan mencatat dan mencari pesanan, memilih desain, serta membuka detail dan dokumen pesanan untuk dicetak melalui browser." : "Sales staff enter and search orders, select designs, and open order details and browser-printable order documents."}</li>
            <li>{id ? "Supervisor meninjau rincian estimasi, membuka dialog hitung ulang untuk mengubah jumlah pekerja, lalu memfinalisasi estimasi." : "Supervisors review estimate details, use a recalculation dialog to adjust worker counts, and finalize estimates."}</li>
            <li>{id ? "Jadwal dikelompokkan per tanggal dengan filter rentang tanggal; Gantt bulanan memperlihatkan estimasi waktu pesanan." : "The schedule groups orders by date with a date-range filter; a monthly Gantt shows order time estimates."}</li>
          </ul>
        </div>
        <div className={styles.artifactGallery}>
          <ArtifactImage
            src="/assets/projects/penjadwalan-produksi/screen-schedule.png"
            alt={id ? "Jadwal produksi detail per tanggal" : "Detailed production schedule by date"}
            caption={id ? "Halaman Jadwal Produksi" : "Production Schedule Page"}
            locale={locale}
            width={1803}
            height={953}
            originalResolution
          />
          <ArtifactImage
            src="/assets/projects/penjadwalan-produksi/screen-admin.png"
            alt={id ? "Dashboard beranda administrator" : "Administrator home dashboard"}
            caption={id ? "Beranda Administrator" : "Administrator Dashboard"}
            locale={locale}
            width={1838}
            height={944}
            originalResolution
          />
        </div>
        <div className={styles.subsection}>
          <h3 id="case-study-backend" className={styles.stageHeading}>Backend</h3>
          <p>{id ? "Fungsi PHP menghubungkan pesanan, desain, mesin, estimasi, dan jadwal dalam MySQL. Sesi login dan pemeriksaan role membatasi halaman; helper permission mengatur aksi pada resource yang didukung." : "PHP functions connect orders, designs, machines, estimates, and schedules in MySQL. Login sessions and role checks restrict pages; permission helpers govern supported resource actions."}</p>
          <ul className={styles.implementationList}>
            <li>{id ? "Estimasi membaca spesifikasi desain dan jumlah pesanan, memilih mesin sesuai kebutuhan cetak dan finishing, lalu menjumlahkan waktu desain, plat, setup, mesin, QC, dan packing. Nilai total dikonversi menjadi menit, jam, hari, dan tanggal perkiraan selesai." : "Estimation reads design specifications and order quantity, selects printing and finishing machines, then sums design, plate, setup, machine, QC, and packing times. The total is converted to minutes, hours, days, and an expected completion date."}</li>
            <li>{id ? "Estimasi dan rincian parameter disimpan bersama dalam transaksi PDO; supervisor dapat menghitung ulang dengan jumlah desainer, pekerja QC, dan pekerja packing yang diubah." : "The estimate and its calculation parameters are saved together in a PDO transaction; supervisors can recalculate with adjusted designer, QC, and packing worker counts."}</li>
            <li>{id ? "Perhitungan jadwal mengurutkan tanggal pesanan lebih dulu dan durasi lebih singkat dalam tanggal yang sama. Setelah waktu desain dan satu hari persiapan, jumlah cetak dialokasikan ke kapasitas harian yang tersisa; kelebihannya dilanjutkan pada hari berikutnya." : "Schedule calculation sorts by order date first and shorter duration within the same date. After design time and one preparation day, print quantity fills remaining daily capacity; any remainder moves to subsequent days."}</li>
          </ul>
          <p>{id ? "Kode backend juga menyediakan detail proses per mesin dan pemeriksaan bentrok waktu. Fungsi tersebut terpisah dari alokasi kapasitas harian pada halaman jadwal yang ditampilkan di atas." : "The backend also includes machine-level process details and time-conflict checks. Those functions are separate from the daily-capacity allocation shown in the schedule page above."}</p>
        </div>
      </Section>
      <Section name="next" title={id ? "Pengembangan berikutnya" : "Future development"}>
        <p>{text(study.reflection)}</p>
      </Section>
    </>
  );
}

function Section({ name, title, children }: { name: string; title: string; children: ReactNode }) {
  return <section className={styles.section} aria-labelledby={`case-study-${name}`}><h2 id={`case-study-${name}`}>{title}</h2><div className={styles.body}>{children}</div></section>;
}
