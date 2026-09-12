import { useLocale } from "next-intl";
import { experience } from "@/content/experience";
import { education } from "@/content/education";
import { certifications } from "@/content/certifications";
import { ExperienceItem } from "@/components/ExperienceItem";
import { EducationItem } from "@/components/EducationItem";
import { CertificationItem } from "@/components/CertificationItem";
import { Link } from "@/i18n/navigation";
import { Icon } from "./Icon";
export function JourneySection() {
  const locale = useLocale() as "en" | "id";
  const id = locale === "id";
  return (
    <section id="journey" className="journey-section">
      <div className="star-map" aria-hidden="true" />
      <div className="container">
        <div className="section-topline">
          <span className="eyebrow">
            05 / {id ? "CATATAN PERJALANAN" : "THE FLIGHT LOG"}
          </span>
          <span className="eyebrow">2021 → {id ? "SEKARANG" : "PRESENT"}</span>
        </div>
        <div className="section-heading-row">
          <h2>
            {id ? "Bukan perjalanan" : "Not an overnight"}
            <br />
            <span className="marker">{id ? "semalam." : "journey."}</span>
          </h2>
          <p>
            {id
              ? "Belajar, berkolaborasi, dan membangun. Setiap pengalaman membawa perspektif baru untuk misi berikutnya."
              : "Learning, collaborating, and building. Every experience brings a new perspective to the next mission."}
          </p>
        </div>
        <div className="journey-layout">
          <aside className="journey-aside">
            <div className="mission-patch">
              <Icon name="orbit" width="64" height="64" />
              <strong>
                ALWAYS
                <br />
                EXPLORING
              </strong>
              <span>MSF / EST. 2021</span>
            </div>
            <p>
              {id
                ? "Dari ruang kelas ke produk nyata."
                : "From the classroom to real-world products."}
            </p>
            <Link href="/experience" className="text-button">
              {id ? "Lihat pengalaman" : "View experience"}
              <Icon name="arrow" width="18" />
            </Link>
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
