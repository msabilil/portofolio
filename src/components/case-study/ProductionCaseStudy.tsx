import type { ReactNode } from "react";
import type { CaseStudy } from "@/content/caseStudies";
import { businessProcessArtifacts, sptMethod, uatArtifacts, estimationChart, productionChart, productionArtifactGroups, type ProductionArtifact } from "@/content/productionArtifacts";
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
        <p>{id ? "Saya memulai dari analisis proses bisnis, kemudian menyimulasikan perhitungan estimasi dan SPT sebelum merancang serta mengembangkan sistem. Dokumentasi berikut mengikuti urutan tersebut." : "I started with business process analysis, then simulated estimation and SPT calculations before designing and developing the system. The documentation below follows that sequence."}</p>
        <div className={styles.subsection}>
          <h3 id="case-study-business-analysis" className={styles.stageHeading}>{id ? "Analisis proses bisnis dengan BPMN" : "Business process analysis with BPMN"}</h3>
          <p>{id ? "Saya memetakan perpindahan pesanan, file cetak, dan jadwal antarperan. Analisis ini mencakup penerimaan pesanan, estimasi waktu, penjadwalan, pelaksanaan produksi, pemilihan mesin, dan penentuan cover. Perbedaan proses tersebut menjadi dasar untuk merinci kebutuhan estimasi waktu." : "I mapped how orders, print files, and schedules move between roles. The analysis covers order intake, time estimation, scheduling, production, machine selection, and cover selection. These process differences inform the production time breakdown."}</p>
          {gallery(businessProcessArtifacts)}
        </div>
        <div className={styles.subsection}>
          <h3>{id ? "Keputusan utama" : "Key decisions"}</h3>
          {study.decisions.map((decision) => <div className={styles.decision} key={decision.decision.en}><h4>{text(decision.decision)}</h4><p>{text(decision.reason)}</p></div>)}
        </div>
        <div className={styles.subsection}>
          <h3 id="case-study-results" className={styles.stageHeading}>{id ? "Simulasi perhitungan estimasi dan SPT" : "Estimation and SPT calculation simulation"}</h3>
          <p>{id ? "Setelah proses bisnis dipetakan, saya menyusun tahapan perhitungan. Data pesanan, durasi desain, spesifikasi plat, setup dan kapasitas mesin, QC, serta packing menghasilkan estimasi total waktu produksi. Shortest Processing Time (SPT) mengurutkan pesanan berdasarkan durasi yang lebih pendek, lalu urutan tersebut digunakan untuk menyusun jadwal dan Gantt chart." : "After mapping the business processes, I defined the calculation stages. Order data, design duration, plate specifications, machine setup and capacity, QC, and packing produce a total production time estimate. Shortest Processing Time (SPT) sequences orders by shorter durations; the sequence then informs the schedule and Gantt chart."}</p>
          <div className={styles.methodPreview}>{visual(sptMethod)}</div>
          <h4>{id ? "Data input · April 2024" : "Input data · April 2024"}</h4>
          <p>{text(productionArtifactGroups[0].detail)}</p>
          {gallery(productionArtifactGroups[0].images)}
          <h4>{id ? "Hasil estimasi dan jadwal produksi" : "Estimation and production scheduling output"}</h4>
          {visual(estimationChart)}
          {visual(productionChart)}
          <p>{id ? "Pada cuplikan jadwal, Fikih Kelas 5 dengan estimasi 1 hari dikerjakan sebelum Mewarnai Sayuran (4 hari) dan Sosial Media (15 hari). Contoh ini memperlihatkan prioritas durasi pendek pada pesanan dengan tanggal masuk yang sama." : "In the schedule excerpt, Fikih Kelas 5 with a 1-day estimate precedes Mewarnai Sayuran (4 days) and Sosial Media (15 days). This illustrates shorter-duration priorities for orders with the same arrival date."}</p>
        </div>
        <div className={styles.subsection}>
          <h3 id="case-study-impact" className={styles.stageHeading}>{id ? "Hasil simulasi" : "Simulation results"}</h3>
          <div className={styles.comparison}>
            <div><span>{id ? "Tabel sampel April" : "April sample table"}</span><p className={styles.resultNumber}>18</p><p>{id ? "pesanan" : "orders"}</p></div>
            <div><span>{id ? "Gantt estimasi April" : "April estimation Gantt"}</span><p className={styles.resultNumber}>14</p><p>{id ? "pesanan ditampilkan" : "orders shown"}</p></div>
          </div>
          <p>{text(study.impact)}</p>
        </div>
        <div className={styles.subsection}>
          <h3 id="case-study-system-design" className={styles.stageHeading}>{id ? "Perancangan sistem dan database" : "System and database design"}</h3>
          <p>{text(study.informationArchitecture)}</p>
          <h4>Entity Relationship Diagram (ERD)</h4>
          <p>{id ? "Model hubungan antara pesanan, file cetak, desain, estimasi, mesin, dan jadwal produksi." : "Relationships between orders, print files, designs, estimates, machines, and production schedules."}</p>
          {gallery([productionArtifactGroups[1].images[0]])}
          <h4>Data Flow Diagram (DFD)</h4>
          <p>{id ? "Diagram konteks (Level 0) menunjukkan hubungan antarperan. Level 1 memetakan alur utama, Level 2 merinci proses utama, dan Level 3 menguraikan subproses." : "The context diagram (Level 0) shows role interactions. Level 1 maps the main flow, Level 2 details the main processes, and Level 3 decomposes subprocesses."}</p>
          {gallery([...productionArtifactGroups[2].images, ...productionArtifactGroups[3].images])}
          <h4>{id ? "Skema relasi database" : "Database relational schema"}</h4>
          <p>{id ? "Struktur tabel, primary key, dan foreign key untuk pesanan, estimasi, rincian proses, serta analisis jadwal." : "Tables, primary keys, and foreign keys for orders, estimates, process details, and schedule analysis."}</p>
          {gallery([productionArtifactGroups[1].images[1]])}
        </div>
        <div className={styles.subsection}>
          <h3 id="case-study-prototype" className={styles.stageHeading}>{id ? "Perancangan UI/UX" : "UI/UX design"}</h3>
          <p>{text(productionArtifactGroups[4].detail)}</p>
          {gallery(productionArtifactGroups[4].images)}
        </div>
      <div className={styles.subsection}>
        <h3 id="case-study-validation" className={styles.stageHeading}>{id ? "Pengujian dan masukan pengguna" : "Testing and user feedback"}</h3>
        <p>{id ? "Pengujian menggunakan black box dan UAT. Empat lembar wawancara bertanggal 7 Agustus 2025 memberikan masukan mengenai data master, desain, pesanan, estimasi, dan jadwal produksi." : "Testing used black-box testing and UAT. Four interview forms dated August 7, 2025 provide feedback on master data, designs, orders, estimates, and production schedules."}</p>
        <div className={styles.subsection}>
          <h4>{id ? "Yang membantu pengguna" : "What helped users"}</h4>
          <p>{id ? "Responden menilai antarmuka mudah dipahami. Pengelolaan data master dan pencarian pesanan membantu pekerjaan mereka; supervisor menyampaikan bahwa penjadwalan mempermudah pekerjaan. Masukan ini bersifat kualitatif." : "Respondents found the interface easy to understand. Master data management and order search helped their work; the supervisor reported that scheduling made the work easier. These findings are qualitative."}</p>
        </div>
        <details className={styles.sampleDetails}>
          <summary>{id ? "Lihat lainnya: ringkasan wawancara" : "View more: interview summary"}</summary>
          <div className={styles.tableWrap} role="region" tabIndex={0} aria-label={id ? "Ringkasan wawancara UAT" : "UAT interview summary"}>
            <table>
              <caption>{id ? "Parafrasa dari empat lembar wawancara yang diberikan" : "Paraphrased from the four supplied interview forms"}</caption>
              <thead><tr><th>{id ? "Fokus wawancara" : "Interview focus"}</th><th>{id ? "Temuan" : "Findings"}</th></tr></thead>
              <tbody>
                <tr><td>{id ? "Data master" : "Master data"}</td><td>{id ? "Antarmuka sederhana, pesan dialog jelas, dan input berjalan lancar. Tidak ada saran khusus." : "Simple interface, clear messages, and smooth data entry. No specific suggestions."}</td></tr>
                <tr><td>{id ? "Desain" : "Design"}</td><td>{id ? "Alur cukup mudah; sistem perlu lebih fleksibel untuk berbagai skenario kerja nyata." : "The workflow was understandable; greater flexibility for real working scenarios was requested."}</td></tr>
                <tr><td>{id ? "Pesanan" : "Orders"}</td><td>{id ? "Pencarian membantu. Saran: mempersempit kolom pencarian, merapikan hasil cetak, menambahkan informasi harga dan analisis pesanan." : "Search was helpful. Suggestions: reduce search field width, simplify print output, and add pricing information and order analysis."}</td></tr>
                <tr><td>{id ? "Estimasi & jadwal" : "Estimates & schedules"}</td><td>{id ? "Penjadwalan membantu. Perlu penjelasan cara menghitung estimasi, penyesuaian jadwal saat gangguan, dan pemantauan langsung. Perubahan atau penundaan belum dapat diproses ke jadwal." : "Scheduling was helpful. Requests included calculation explanations, schedule adjustments during disruptions, and live monitoring. Changes or delays could not yet be reflected in the schedule."}</td></tr>
              </tbody>
            </table>
          </div>
        </details>
        {gallery(uatArtifacts)}
        <p className={styles.caption}>{id ? "Dokumentasi tabel black box belum ditambahkan ke studi kasus ini. Wawancara tidak digunakan untuk mengklaim persentase keberhasilan UAT atau waktu kerja yang dihemat." : "The black-box test tables have not yet been added to this case study. Interviews do not establish a UAT pass rate or measured time savings."}</p>
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
