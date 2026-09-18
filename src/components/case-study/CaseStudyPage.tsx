"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useAppLocale, type Locale } from "@/i18n/LocaleProvider";
import type { CaseStudy } from "@/content/caseStudies";
import styles from "./CaseStudyPage.module.css";

type CaseStudyPageProps = {
  study: CaseStudy;
  locale?: Locale;
};

export function CaseStudyPage({ study, locale: requestedLocale }: CaseStudyPageProps) {
  const { locale: appLocale } = useAppLocale();
  const locale = requestedLocale ?? appLocale;
  const id = locale === "id";
  const text = (value: { id: string; en: string }) => value[locale];

  return (
    <article className={`${styles.page} lunar-section`}>
      <div className="container">
        <Link href="/projects" className="text-button">
          {id ? "Kembali ke galeri proyek" : "Back to project gallery"}
        </Link>

        <section className={styles.heroBlock} aria-label={id ? "Pengantar project" : "Project introduction"}>
          <header className={styles.hero}>
          <h1>{text(study.title)}</h1>
          <p className={styles.pitch}>{text(study.pitch)}</p>
          <div className={styles.links} aria-label={id ? "Tautan project" : "Project links"}>
            {study.links.map((link) =>
              link.status === "available" && link.href ? (
                <a
                  key={link.label.en}
                  className="button button-ink"
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {text(link.label)}
                </a>
              ) : (
                <span key={link.label.en} className={styles.unavailable}>
                  {text(link.label)}: {link.status === "private" ? "Private" : id ? "Belum tersedia" : "Unavailable"}
                </span>
              ),
            )}
          </div>
          </header>

          <section className={styles.snapshot} aria-label={id ? "Fakta project" : "Project facts"}>
            <div className={styles.snapshotGrid}>
              <SnapshotItem label={id ? "Peran" : "Role"} value={text(study.snapshot.role)} />
              <SnapshotItem label={id ? "Durasi" : "Duration"} value={text(study.snapshot.duration)} />
              <SnapshotItem label={id ? "Cakupan" : "Scope"} value={text(study.snapshot.scope)} />
              <SnapshotItem label={id ? "Jenis project" : "Project type"} value={text(study.snapshot.type)} />
              <SnapshotItem label="Stack" value={study.snapshot.stack.join(", ")} />
            </div>
          </section>

        </section>

        <div className={styles.readingLayout}>
          <aside className={styles.sidebar} aria-label={id ? "Navigasi isi project" : "Project contents navigation"}>
            <p className={styles.sidebarLabel}>{id ? "Di halaman ini" : "On this page"}</p>
            <nav className={styles.sidebarNav}>
              {study.inANutshell && <a href="#case-study-in-a-nutshell">In a nutshell</a>}
              <a href="#case-study-problem">{id ? "Masalah" : "The Problem"}</a>
              <a href="#case-study-approach">{id ? "Pendekatan dan Arsitektur" : "Approach and Architecture"}</a>
              <a href="#case-study-results">{id ? "Hasil dan Benchmark" : "Results and Benchmarks"}</a>
              <a href="#case-study-deep-dive">Code and Artifact Deep Dive</a>
              <a href="#case-study-impact">{id ? "Dampak" : "Impact"}</a>
              <a href="#recruiter-summary">{id ? "Ringkasan Recruiter" : "Recruiter Summary"}</a>
            </nav>
          </aside>

          <div className={styles.readingContent}>
        {study.inANutshell && (
          <section className={styles.nutshell} aria-labelledby="case-study-in-a-nutshell">
            <h2 id="case-study-in-a-nutshell">In a nutshell</h2>
            <div className={styles.nutshellBody}>
              {text(study.inANutshell).split("\n\n").map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>
        )}

        <CaseSection id="problem" title={id ? "Masalah" : "The Problem"}>
          <p>{text(study.problem)}</p>
        </CaseSection>

        <CaseSection id="approach" title={id ? "Pendekatan dan Arsitektur" : "Approach and Architecture"}>
          <div className={styles.subsection}>
            <h3>Information Architecture</h3>
            <p>{text(study.informationArchitecture)}</p>
          </div>
          <div className={styles.subsection}>
            <h3>UX Writing</h3>
            <div className={styles.tableWrap}>
              <table>
                <thead>
                  <tr>
                    <th>{id ? "Konteks" : "Context"}</th>
                    <th>{id ? "Sebelum" : "Before"}</th>
                    <th>{id ? "Sesudah" : "After"}</th>
                    <th>{id ? "Alasan" : "Reasoning"}</th>
                  </tr>
                </thead>
                <tbody>
                  {study.uxWriting.map((row) => (
                    <tr key={row.context.en}>
                      <td>{text(row.context)}</td>
                      <td>{text(row.before)}</td>
                      <td>{text(row.after)}</td>
                      <td>{text(row.reason)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className={styles.subsection}>
            <h3>{id ? "Keputusan utama" : "Key decisions"}</h3>
            <div className={styles.decisionList}>
              {study.decisions.map((decision) => (
                <div className={styles.decision} key={decision.decision.en}>
                  <strong>{text(decision.decision)}</strong>
                  <p>{text(decision.reason)}</p>
                  <span>{id ? "Alternatif" : "Alternative"}: {text(decision.alternative)}</span>
                </div>
              ))}
            </div>
          </div>
        </CaseSection>

        <CaseSection id="results" title={id ? "Hasil dan Benchmark" : "Results and Performance Benchmarks"}>
          <div className={styles.metricGrid}>
            {study.metrics.map((metric) => (
              <div className={styles.metric} key={metric.label.en}>
                <span className={styles.metaLabel}>{text(metric.label)}</span>
                {metric.baseline && <p><strong>Baseline:</strong> {text(metric.baseline)}</p>}
                {metric.after && <p><strong>After:</strong> {text(metric.after)}</p>}
                <p>{text(metric.impact)}</p>
                <span className={styles.evidence}>{metric.status}: {text(metric.method)}</span>
              </div>
            ))}
          </div>
        </CaseSection>

        <CaseSection id="deep-dive" title="Code and Artifact Deep Dive">
          <div className={styles.artifactList}>
            {study.deepDive.map((artifact) => (
              <div className={styles.artifact} key={artifact.label.en}>
                <div>
                  <strong>{text(artifact.label)}</strong>
                  <p>{text(artifact.detail)}</p>
                </div>
                {artifact.status === "available" && artifact.href ? (
                  <a className="text-button" href={artifact.href} target="_blank" rel="noopener noreferrer">
                    {id ? "Buka" : "Open"}
                  </a>
                ) : (
                  <span className={styles.unavailable}>
                    {artifact.status === "private" ? "Private" : id ? "Belum tersedia" : "Unavailable"}
                  </span>
                )}
              </div>
            ))}
          </div>
        </CaseSection>

        <section className={styles.closing} aria-labelledby="case-study-impact">
          <h2 id="case-study-impact">{id ? "Dampak" : "Impact"}</h2>
          <p className={styles.impact}>{text(study.impact)}</p>
          <div className={styles.reflection}>
            <h3>{id ? "Yang akan saya ubah" : "What I’d Change Today"}</h3>
            <p>{text(study.reflection)}</p>
          </div>
        </section>

        <section className={styles.summary} aria-labelledby="recruiter-summary">
          <h2 id="recruiter-summary">{id ? "Ringkasan Recruiter" : "Recruiter Summary"}</h2>
          <h3>{text(study.title)}</h3>
          <p><strong>Problem:</strong> {text(study.recruiterSummary.problem)}</p>
          <p><strong>{id ? "Architecture dan decisions" : "Architecture and decisions"}:</strong></p>
          <ul>
            {study.recruiterSummary.architecture.map((item) => <li key={item.en}>{text(item)}</li>)}
          </ul>
          <p><strong>Impact:</strong> {text(study.recruiterSummary.impact)}</p>
        </section>
          </div>
        </div>
      </div>
    </article>
  );
}

function CaseSection({ id, title, children }: { id: string; title: string; children: ReactNode }) {
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
      <span className={styles.metaLabel}>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
