"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, type ReactNode } from "react";
import { useAppLocale, type Locale } from "@/i18n/LocaleProvider";
import type { CaseStudy } from "@/content/caseStudies";
import { fullStackCaseStudyDetails } from "@/content/fullStackCaseStudyDetails";
import { getCaseStudyPresentation } from "@/content/caseStudyPresentation";
import { ArtifactImage } from "./ArtifactImage";
import { ProductionCaseStudy } from "./ProductionCaseStudy";
import { FullStackCaseStudy } from "./FullStackCaseStudy";
import { CaseStudyNavigation } from "./CaseStudyNavigation";
import styles from "./CaseStudyPage.module.css";

type CaseStudyPageProps = {
  study: CaseStudy;
  locale?: Locale;
};

export function CaseStudyPage({
  study,
  locale: requestedLocale,
}: CaseStudyPageProps) {
  const { locale: appLocale } = useAppLocale();
  const locale = requestedLocale ?? appLocale;
  const id = locale === "id";
  const text = (value: { id: string; en: string }) => value[locale];
  const presentation = getCaseStudyPresentation(study.slug);
  const production = study.slug === "penjadwalan-produksi";
  const fullStack = study.slug in fullStackCaseStudyDetails;
  const sections = useMemo(
    () => production || fullStack ? [
      { id: "case-study-in-a-nutshell", label: "In a nutshell" },
      { id: "case-study-problem", label: id ? "Masalah" : "The problem" },
      { id: "case-study-approach", label: id ? "Pendekatan dan arsitektur" : "Approach and architecture" },
      { id: "case-study-business-analysis", label: production ? (id ? "Analisis BPMN" : "BPMN analysis") : (id ? "Analisis alur kerja" : "Workflow analysis") },
      { id: "case-study-system-design", label: id ? "Perancangan sistem" : "System design" },
      { id: "case-study-prototype", label: id ? "Perancangan UI/UX" : "UI/UX design" },
      { id: "case-study-interface", label: id ? "Pengembangan" : "Development" },
      { id: "case-study-frontend", label: "Frontend" },
      { id: "case-study-backend", label: "Backend" },
      { id: "case-study-next", label: id ? "Pengembangan berikutnya" : "Future development" },
    ] : [
      { id: "case-study-in-a-nutshell", label: "In a nutshell" },
      { id: "case-study-problem", label: id ? "Masalah" : "The problem" },
      {
        id: "case-study-approach",
        label: id ? "Pendekatan dan arsitektur" : "Approach and architecture",
      },
      {
        id: "case-study-results",
        label: id ? "Hasil dan benchmark" : "Results and benchmarks",
      },
      {
        id: "case-study-deep-dive",
        label: id ? "Kode dan artefak" : "Code and artifacts",
      },
      { id: "case-study-impact", label: id ? "Dampak" : "Impact" },
      {
        id: "recruiter-summary",
        label: id ? "Ringkasan Recruiter" : "Recruiter Summary",
      },
    ],
    [id, production, fullStack],
  );

  return (
    <article className={styles.page} data-project={study.slug}>
      <div className={styles.container}>
        <Link href="/projects" className={styles.projectLink}>
          {id ? "Kembali ke galeri proyek" : "Back to project gallery"}
        </Link>

        <section
          className={styles.heroBlock}
          aria-label={id ? "Pengantar project" : "Project introduction"}
        >
          <header className={styles.hero}>
            <h1>{text(study.title)}</h1>
            <p className={styles.pitch}>{text(study.pitch)}</p>
            <div
              className={styles.links}
              aria-label={id ? "Tautan project" : "Project links"}
            >
              {study.links.map((link) => {
                const label = text(link.label);
                const kind = link.label.en === "Repository"
                  ? styles.repositoryLink
                  : link.label.en === "Live demo"
                    ? styles.liveDemoLink
                    : styles.otherLink;
                return link.status === "available" && link.href ? (
                  <a
                    key={link.label.en}
                    className={`${styles.actionLink} ${kind}`}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {label}
                  </a>
                ) : (
                  <span
                    key={link.label.en}
                    className={`${styles.actionLink} ${kind} ${styles.disabledLink}`}
                    aria-label={`${label}: ${link.status === "private" ? "Private" : id ? "Belum tersedia" : "Unavailable"}`}
                  >
                    <span>{label}{link.status === "private" ? " · Private" : ""}</span>
                  </span>
                );
              })}
            </div>
          </header>

          <section
            className={styles.snapshot}
            aria-label={id ? "Fakta project" : "Project facts"}
          >
            <dl className={styles.snapshotGrid}>
              <SnapshotItem
                label={id ? "Peran" : "Role"}
                value={text(study.snapshot.role)}
              />
              <SnapshotItem
                label={id ? "Durasi" : "Duration"}
                value={text(study.snapshot.duration)}
              />
              <SnapshotItem
                label={id ? "Cakupan" : "Scope"}
                value={text(study.snapshot.scope)}
              />
              <SnapshotItem
                label={id ? "Jenis project" : "Project type"}
                value={text(study.snapshot.type)}
              />
              <SnapshotItem
                label="Tools & stack"
                value={study.snapshot.stack.join(", ")}
              />
            </dl>
          </section>
        </section>

        {production ? (
          <div className={styles.heroScreenshot}>
            <ArtifactImage
              src="/assets/projects/penjadwalan-produksi/screen-gantt.png"
              alt={id ? "Gantt chart estimasi produksi pada aplikasi TMU" : "Production estimation Gantt chart in the TMU application"}
              caption={id ? "Halaman Gantt Chart Estimasi" : "Estimation Gantt Chart Page"}
              locale={locale}
              width={1838}
              height={948}
              originalResolution
            />
          </div>
        ) : (
          <figure className={styles.cover}>
            <Image
              src={presentation.cover}
              alt={text(presentation.coverAlt)}
              width={1440}
              height={960}
              sizes="(max-width: 900px) 100vw, 1160px"
              preload
            />
            <figcaption>
              {id ? "Ilustrasi konteks proyek · dibuat dengan AI" : "Project context illustration · AI-generated"}
            </figcaption>
          </figure>
        )}

        <div className={styles.readingLayout}>
          <aside
            className={styles.sidebar}
            aria-label={
              id ? "Navigasi isi project" : "Project contents navigation"
            }
          >
            <p className={styles.sidebarLabel}>
              {id ? "Di halaman ini" : "On this page"}
            </p>
            <CaseStudyNavigation
              sections={sections}
              label={id ? "Daftar isi" : "Table of contents"}
            />
          </aside>

          <div className={styles.readingContent}>
            {production ? <ProductionCaseStudy study={study} locale={locale} /> : fullStack ? <FullStackCaseStudy study={study} locale={locale} /> : <>
            {
              <section
                className={styles.nutshell}
                aria-labelledby="case-study-in-a-nutshell"
              >
                <h2 id="case-study-in-a-nutshell">In a nutshell</h2>
                <div className={styles.nutshellBody}>
                  {text(study.inANutshell ?? study.pitch)
                    .split("\n\n")
                    .map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                </div>
              </section>
            }

            <CaseSection id="problem" title={id ? "Masalah" : "The Problem"}>
              <p>{text(study.problem)}</p>
            </CaseSection>

            <CaseSection
              id="approach"
              title={
                id ? "Pendekatan dan Arsitektur" : "Approach and Architecture"
              }
            >
              <div className={styles.subsection}>
                <h3>Information Architecture</h3>
                <p>{text(study.informationArchitecture)}</p>
                <figure className={styles.flowFigure}>
                  <ol className={styles.flow}>
                    {presentation.flow.map((step) => (
                      <li key={step.en}>{text(step)}</li>
                    ))}
                  </ol>
                  <figcaption>
                    {id
                      ? "Alur sistem · ringkasan"
                      : "System flow · simplified"}
                  </figcaption>
                </figure>
              </div>
              <div className={styles.subsection}>
                <h3>UX Writing</h3>
                <div className={styles.writingList}>
                  {study.uxWriting.map((row) => (
                    <div className={styles.writingExample} key={row.context.en}>
                      <h4>{text(row.context)}</h4>
                      <div className={styles.comparison}>
                        <div>
                          <span>{id ? "Sebelum" : "Before"}</span>
                          <p>{text(row.before)}</p>
                        </div>
                        <div>
                          <span>{id ? "Sesudah" : "After"}</span>
                          <p>{text(row.after)}</p>
                        </div>
                      </div>
                      <p className={styles.caption}>{text(row.reason)}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.subsection}>
                <h3>{id ? "Keputusan utama" : "Key decisions"}</h3>
                <div className={styles.decisionList}>
                  {study.decisions.map((decision) => (
                    <div className={styles.decision} key={decision.decision.en}>
                      <h4>{text(decision.decision)}</h4>
                      <p>{text(decision.reason)}</p>
                      <span>
                        {id ? "Alternatif" : "Alternative"}:{" "}
                        {text(decision.alternative)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CaseSection>

            <CaseSection
              id="results"
              title={
                id
                  ? "Hasil dan Benchmark"
                  : "Results and Performance Benchmarks"
              }
            >
              <div className={styles.metricGrid}>
                {study.metrics.map((metric) => (
                  <div className={styles.metric} key={metric.label.en}>
                    <h3>{text(metric.label)}</h3>
                    {(metric.baseline || metric.after) && (
                      <div className={styles.comparison}>
                        {metric.baseline && (
                          <div>
                            <span>{id ? "Kondisi awal" : "Baseline"}</span>
                            <p>{text(metric.baseline)}</p>
                          </div>
                        )}
                        {metric.after && (
                          <div>
                            <span>{id ? "Hasil" : "After"}</span>
                            <p>{text(metric.after)}</p>
                          </div>
                        )}
                      </div>
                    )}
                    <p>{text(metric.impact)}</p>
                    <span className={styles.evidence}>
                      {metric.status}: {text(metric.method)}
                    </span>
                  </div>
                ))}
              </div>
            </CaseSection>

            <CaseSection id="deep-dive" title="Code and Artifact Deep Dive">
              <p>
                {id
                  ? "Artefak membantu menjelaskan proses di balik solusi. Contoh visual berikut adalah materi ilustratif, bukan dokumen asli project."
                  : "Artifacts help explain the process behind the solution. The visual below is illustrative, not an original project document."}
              </p>
              <ArtifactImage
                src={
                  production
                    ? "/assets/case-studies/scheduling-wireframe.webp"
                    : presentation.cover
                }
                alt={
                  id
                    ? production
                      ? "Contoh wireframe pesanan, estimasi, dan penjadwalan"
                      : "Ilustrasi proses perancangan"
                    : production
                      ? "Example wireframes for orders, estimates, and scheduling"
                      : "Illustration of the design process"
                }
                caption={
                  id
                    ? "Contoh ilustratif · dibuat dengan AI"
                    : "Illustrative example · AI-generated"
                }
                locale={locale}
              />
              {production && (
                <details className={styles.sampleDetails}>
                  <summary>
                    {id
                      ? "Lihat lainnya: contoh data penjadwalan"
                      : "View more: sample scheduling data"}
                  </summary>
                  <p className={styles.caption}>
                    {id
                      ? "Data dummy, terpisah dari simulasi historis 2023–2024. Tidak digunakan sebagai bukti hasil."
                      : "Dummy data, separate from the 2023–2024 historical simulation. Not used as evidence of results."}
                  </p>
                  <div
                    className={styles.tableWrap}
                    tabIndex={0}
                    role="region"
                    aria-label={id ? "Data contoh" : "Sample data"}
                  >
                    <table>
                      <caption>
                        {id ? "Tiga pesanan fiktif" : "Three fictional orders"}
                      </caption>
                      <thead>
                        <tr>
                          <th>{id ? "Pesanan" : "Order"}</th>
                          <th>{id ? "Produk" : "Product"}</th>
                          <th>{id ? "Jumlah" : "Quantity"}</th>
                          <th>
                            {id ? "Estimasi durasi" : "Estimated duration"}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>DEMO-A</td>
                          <td>{id ? "Buku kerja" : "Workbook"}</td>
                          <td>640</td>
                          <td>{id ? "2 hari" : "2 days"}</td>
                        </tr>
                        <tr>
                          <td>DEMO-B</td>
                          <td>{id ? "Katalog" : "Catalogue"}</td>
                          <td>320</td>
                          <td>{id ? "1 hari" : "1 day"}</td>
                        </tr>
                        <tr>
                          <td>DEMO-C</td>
                          <td>{id ? "Kalender" : "Calendar"}</td>
                          <td>480</td>
                          <td>{id ? "2 hari" : "2 days"}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </details>
              )}
              <div className={styles.artifactList}>
                {study.deepDive.map((artifact) => (
                  <div className={styles.artifact} key={artifact.label.en}>
                    <div>
                      <strong>{text(artifact.label)}</strong>
                      <p>{text(artifact.detail)}</p>
                    </div>
                    {artifact.status === "available" && artifact.href ? (
                      <a
                        className={styles.projectLink}
                        href={artifact.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {id ? "Buka" : "Open"}
                      </a>
                    ) : (
                      <span className={styles.unavailable}>
                        {artifact.status === "private"
                          ? "Private"
                          : id
                            ? "Belum tersedia"
                            : "Unavailable"}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </CaseSection>

            <section
              className={styles.closing}
              aria-labelledby="case-study-impact"
            >
              <h2 id="case-study-impact">{id ? "Dampak" : "Impact"}</h2>
              <p className={styles.impact}>{text(study.impact)}</p>
              <div className={styles.reflection}>
                <h3>{id ? "Yang akan saya ubah" : "What I’d Change Today"}</h3>
                <p>{text(study.reflection)}</p>
              </div>
            </section>

            <section
              className={styles.summary}
              aria-labelledby="recruiter-summary"
            >
              <h2 id="recruiter-summary">
                {id ? "Ringkasan Recruiter" : "Recruiter Summary"}
              </h2>
              <h3>{text(study.title)}</h3>
              <p>
                <strong>Problem:</strong> {text(study.recruiterSummary.problem)}
              </p>
              <p>
                <strong>
                  {id
                    ? "Architecture dan decisions"
                    : "Architecture and decisions"}
                  :
                </strong>
              </p>
              <ul>
                {study.recruiterSummary.architecture.map((item) => (
                  <li key={item.en}>{text(item)}</li>
                ))}
              </ul>
              <p>
                <strong>Impact:</strong> {text(study.recruiterSummary.impact)}
              </p>
            </section>
            </>}
            <div className={styles.endLinks}>
              <Link className={styles.projectLink} href="/projects">
                {id ? "Jelajahi project lainnya" : "Explore more projects"}
              </Link>
              <a className={styles.projectLink} href="#main-content">
                {id ? "Kembali ke atas" : "Back to top"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function CaseSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className={styles.section} aria-labelledby={`case-study-${id}`}>
      <h2 id={`case-study-${id}`}>{title}</h2>
      <div className={styles.body}>{children}</div>
    </section>
  );
}

function SnapshotItem({ label, value }: { label: string; value: string }) {
  return (
    <div className={styles.snapshotItem}>
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}
