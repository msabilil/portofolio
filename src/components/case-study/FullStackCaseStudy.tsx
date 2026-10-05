import type { ReactNode } from "react";
import type { CaseStudy } from "@/content/caseStudies";
import { fullStackCaseStudyDetails } from "@/content/fullStackCaseStudyDetails";
import { getCaseStudyPresentation } from "@/content/caseStudyPresentation";
import styles from "./CaseStudyPage.module.css";

export function FullStackCaseStudy({ study, locale }: { study: CaseStudy; locale: "id" | "en" }) {
  const detail = fullStackCaseStudyDetails[study.slug];
  const presentation = getCaseStudyPresentation(study.slug);
  const id = locale === "id";
  const text = (value: { id: string; en: string }) => value[locale];

  return (
    <>
      <section className={styles.nutshell} aria-labelledby="case-study-in-a-nutshell">
        <h2 id="case-study-in-a-nutshell">In a nutshell</h2>
        <div className={styles.nutshellBody}><p>{text(detail.nutshell)}</p></div>
      </section>

      <Section name="problem" title={id ? "Masalah" : "The problem"}>
        <p>{text(study.problem)}</p>
      </Section>

      <Section name="approach" title={id ? "Pendekatan dan arsitektur" : "Approach and architecture"}>
        <p>{text(study.informationArchitecture)}</p>
        <div className={styles.subsection}>
          <h3 id="case-study-business-analysis" className={styles.stageHeading}>{id ? "Analisis alur kerja" : "Workflow analysis"}</h3>
          <p>{text(detail.analysis)}</p>
          <figure className={styles.flowFigure}>
            <ol className={styles.flow}>
              {presentation.flow.map((step) => <li key={step.en}>{text(step)}</li>)}
            </ol>
            <figcaption>{id ? "Ringkasan alur berdasarkan modul yang tersedia" : "Flow summary based on available modules"}</figcaption>
          </figure>
        </div>
        <div className={styles.subsection}>
          <h3 id="case-study-system-design" className={styles.stageHeading}>{id ? "Perancangan sistem dan data" : "System and data design"}</h3>
          <p>{text(detail.system)}</p>
          <h4>{id ? "Keputusan perancangan" : "Design decisions"}</h4>
          <ul className={styles.implementationList}>
            {study.decisions.map((decision) => <li key={decision.decision.en}><strong>{text(decision.decision)}</strong> {text(decision.reason)}</li>)}
          </ul>
        </div>
        <div className={styles.subsection}>
          <h3 id="case-study-prototype" className={styles.stageHeading}>{id ? "Perancangan UI/UX" : "UI/UX design"}</h3>
          <p>{text(detail.ux)}</p>
        </div>
      </Section>

      <Section name="interface" title={id ? "Pengembangan" : "Development"}>
        <p>{text(detail.contribution)}</p>
        <div className={styles.subsection}>
          <h3 id="case-study-frontend" className={styles.stageHeading}>Frontend</h3>
          <ul className={styles.implementationList}>
            {detail.frontend.map((item) => <li key={item.en}>{text(item)}</li>)}
          </ul>
        </div>
        <div className={styles.subsection}>
          <h3 id="case-study-backend" className={styles.stageHeading}>Backend</h3>
          <ul className={styles.implementationList}>
            {detail.backend.map((item) => <li key={item.en}>{text(item)}</li>)}
          </ul>
        </div>
        <div className={styles.subsection}>
          <h3>{id ? "Cakupan dan bukti" : "Scope and evidence"}</h3>
          <p>{text(study.impact)}</p>
          <div className={styles.metricGrid}>
            {study.metrics.map((metric) => (
              <div className={styles.metric} key={metric.label.en}>
                <h4>{text(metric.label)}</h4>
                <p>{text(metric.impact)}</p>
                <span className={styles.evidence}>{text(metric.method)}</span>
              </div>
            ))}
          </div>
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
