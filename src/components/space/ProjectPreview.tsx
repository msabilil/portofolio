import Image from "next/image";
import type { Project } from "@/content/projects";
export function ProjectPreview({
  project,
  locale = "en",
}: {
  project: Project;
  locale?: "en" | "id";
}) {
  const id = locale === "id";
  if (project.cover)
    return (
      <div className="project-preview preview-recyclean">
        <span className="preview-meta">FIGMA / UI EXPLORATION</span>
        <div className="recyclean-art">
          <Image
            src={project.cover}
            alt={
              id
                ? "Desain layar dan wireframe RecyClean"
                : "RecyClean screen design and wireframes"
            }
            fill
            sizes="(max-width: 760px) 85vw, 550px"
          />
        </div>
        <span className="preview-caption">
          {id
            ? "Dari kebiasaan kecil, untuk bumi."
            : "Small habits. A healthier planet."}
        </span>
      </div>
    );
  if (project.slug === "penjadwalan-produksi")
    return (
      <div className="project-preview preview-production">
        <span className="preview-meta">
          {id
            ? "PETA ALUR / ILUSTRASI KONSEP"
            : "WORKFLOW / CONCEPT ILLUSTRATION"}
        </span>
        <div className="workflow-window">
          <div className="window-bar">
            <span />
            <span />
            <span />
            <p>production.workspace</p>
          </div>
          <div className="workflow-body">
            <span className="eyebrow">
              {id ? "SATU ALUR KERJA TERHUBUNG" : "ONE CONNECTED WORKFLOW"}
            </span>
            <h4>
              {id ? "Dari order ke produksi." : "From order to production."}
            </h4>
            <div className="workflow-steps">
              {["Sales", "Design", "Production"].map((label, i) => (
                <div key={label}>
                  <span>0{i + 1}</span>
                  <strong>{label}</strong>
                  <small>
                    {
                      [
                        id ? "Detail pesanan" : "Order details",
                        id ? "Spesifikasi" : "Specifications",
                        id ? "Jadwal mesin" : "Machine schedule",
                      ][i]
                    }
                  </small>
                </div>
              ))}
            </div>
            <div className="workflow-estimate">
              <span>↳</span>
              {id
                ? "Estimasi waktu berbasis kapasitas mesin"
                : "Time estimates based on machine capacity"}
            </div>
          </div>
        </div>
      </div>
    );
  if (project.slug === "arutalalab")
    return (
      <div className="project-preview preview-arutala">
        <span className="preview-meta">
          {id
            ? "PETA LAYANAN / ILUSTRASI KONSEP"
            : "SERVICE MAP / CONCEPT ILLUSTRATION"}
        </span>
        <div className="arutala-art">
          <span className="arutala-symbol" aria-hidden="true">
            a<span>↗</span>
          </span>
          <h4>
            ArutalaLab<span>®</span>
          </h4>
          <p>
            {id
              ? "Teknologi. Talenta. Kolaborasi."
              : "Technology. Talent. Together."}
          </p>
          <div className="service-orbits">
            <span>Training</span>
            <span>Tech talent</span>
            <span>Software</span>
          </div>
        </div>
      </div>
    );
  return (
    <div className="project-preview preview-mental">
      <span className="preview-meta">
        {id ? "ILUSTRASI KONSEP / ANDROID" : "CONCEPT ILLUSTRATION / ANDROID"}
      </span>
      <div className="mood-art">
        <span className="mood-face" aria-hidden="true">
          ☺
        </span>
        <h4>{id ? "Bagaimana harimu?" : "How are you, today?"}</h4>
        <p>
          {id
            ? "Ruang untuk suasana hati & kebiasaan."
            : "A space for moods & daily habits."}
        </p>
        <div className="mood-dots" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
          <i />
        </div>
      </div>
    </div>
  );
}
