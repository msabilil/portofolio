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
          {id ? "Dari kebiasaan kecil, untuk bumi." : "Small habits. A healthier planet."}
        </span>
      </div>
    );

  if (project.slug === "penjadwalan-produksi")
    return (
      <div className="project-preview preview-production">
        <span className="preview-meta">
          {id ? "PETA ALUR / ILUSTRASI KONSEP" : "WORKFLOW / CONCEPT ILLUSTRATION"}
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
            <h4>{id ? "Dari order ke produksi." : "From order to production."}</h4>
            <div className="workflow-steps">
              {["Sales", "Design", "Production"].map((label, i) => (
                <div key={label}>
                  <span>0{i + 1}</span>
                  <strong>{label}</strong>
                  <small>
                    {[
                      id ? "Detail pesanan" : "Order details",
                      id ? "Spesifikasi" : "Specifications",
                      id ? "Jadwal mesin" : "Machine schedule",
                    ][i]}
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

  return (
    <div className="project-preview preview-generic">
      <span className="preview-meta">
        {id ? "ILUSTRASI KONSEP / PROJECT" : "CONCEPT ILLUSTRATION / PROJECT"}
      </span>
      <div className="generic-art">
        <span className="generic-mark" aria-hidden="true">
          {project.title.charAt(0)}
        </span>
        <h4>{project.title}</h4>
        <p>
          {id ? "Eksplorasi alur dan solusi digital." : "A focused digital solution exploration."}
        </p>
        <div className="generic-dots" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </div>
      </div>
    </div>
  );
}
