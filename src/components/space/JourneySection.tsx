"use client";
import Image from "next/image";
import { useLocale } from "next-intl";
import { experience } from "@/content/experience";
import { education } from "@/content/education";
import { certifications } from "@/content/certifications";
import { ExperienceItem } from "@/components/ExperienceItem";
import { EducationItem } from "@/components/EducationItem";
import { CertificationItem } from "@/components/CertificationItem";
import Link from "next/link";
import { Icon } from "./Icon";
import { useSceneActivity } from "./useSceneActivity";
export function JourneySection() {
  const locale = useLocale() as "en" | "id";
  const id = locale === "id";
  const { ref, active } = useSceneActivity<HTMLElement>();
  return (
    <section
      id="journey"
      ref={ref}
      className="journey-section"
      data-active={active ? "true" : undefined}
    >
      <div className="space-stage space-stage-log" aria-hidden="true">
        <span className="space-comets">
          <i />
          <i />
          <i />
          <i />
        </span>
        <Image
          className="missions-planet missions-neptune"
          src="/assets/photos/3d/neptune.png"
          alt=""
          width={1600}
          height={1600}
          sizes="(max-width: 800px) 38vw, 300px"
          unoptimized
          loading="lazy"
        />
        <Image
          className="missions-planet missions-mars"
          src="/assets/photos/3d/mars.png"
          alt=""
          width={560}
          height={560}
          sizes="(max-width: 800px) 34vw, 25vw"
          unoptimized
          loading="lazy"
        />
      </div>
      <div className="container">
        <div className="section-topline">
          <span className="eyebrow">
            05 / {id ? "CATATAN PERJALANAN" : "THE FLIGHT LOG"}
          </span>
        </div>
        <div className="section-heading-row">
          <h2>
            {id ? "Belajar dari" : "Learning through"}
            <br />
            <span className="marker">{id ? "setiap langkah." : "experience."}</span>
          </h2>
          <p>
            {id
              ? "Kuliah memberi fondasi; proyek dan kerja tim memberi konteks. Inilah pengalaman yang membentuk cara saya merancang, membangun, dan menguji produk."
              : "University gave me a foundation; projects and teamwork gave it context. These experiences shape how I design, build, and test products."}
          </p>
        </div>
        <div className="journey-layout">
          <aside className="journey-aside">
            <div className="flex flex-col items-start gap-6">
              <div className="pb-3">
                <div className="mission-patch">
                  <Icon name="orbit" width="64" height="64" />
                  <strong>
                    {id ? "TERUS" : "ALWAYS"}
                    <br />
                    {id ? "BELAJAR" : "LEARNING"}
                  </strong>
                  <span>MSF / {id ? "SEJAK 2021" : "SINCE 2021"}</span>
                </div>
              </div>
              <div className="flex flex-col items-start gap-3">
                <p>
                  {id
                    ? "Setiap tim dan proyek membawa pelajaran baru."
                    : "Each team and project brings something new to learn."}
                </p>
                <Link href="/experience" className="text-button">
                  {id ? "Baca riwayat lengkap" : "View full experience"}
                  <Icon name="arrow" width="18" />
                </Link>
              </div>
            </div>
          </aside>
          <div className="timeline">
            {experience.map((entry, index) => (
              <article className="timeline-card panel" key={entry.id}>
                <div className="timeline-label eyebrow">
                  <span>{id ? "PENGALAMAN" : "EXPERIENCE"}</span>
                  <span>0{index + 1}</span>
                </div>
                <ExperienceItem
                  experience={entry}
                  role={entry.role[locale]}
                  description={entry.description[locale]}
                />
              </article>
            ))}
            {education.map((entry) => (
              <article className="timeline-card panel" key={entry.id}>
                <div className="timeline-label eyebrow">
                  {id ? "PENDIDIKAN" : "EDUCATION"}
                </div>
                <EducationItem entry={entry} locale={locale} />
              </article>
            ))}
            <article className="timeline-card panel">
              <div className="timeline-label eyebrow">
                {id
                  ? "SERTIFIKASI & PEMBELAJARAN"
                  : "CERTIFICATIONS & LEARNING"}
              </div>
              {certifications.map((entry) => (
                <CertificationItem
                  key={entry.id}
                  entry={entry}
                  locale={locale}
                  certificateLabel={id ? "Sertifikat" : "Certificate"}
                />
              ))}
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
