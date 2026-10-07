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
        <p>{id ? "Saya membangun halaman untuk empat peran guna mencatat pesanan, meninjau estimasi, dan melihat jadwal produksi." : "I built pages for four roles to enter orders, review estimates, and view production schedules."}</p>
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
