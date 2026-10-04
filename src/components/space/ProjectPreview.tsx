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
          {id ? "TAMPILAN APLIKASI" : "APP PREVIEW"}
        </span>
        <div className="production-screen">
          <div className="production-screen-bar" aria-hidden="true">
            <span /><span /><span />
            <p>TMU / {id ? "estimasi produksi" : "production estimates"}</p>
          </div>
          <div className="production-screen-image">
            <Image
              src="/assets/projects/penjadwalan-produksi/screen-gantt.png"
              alt={id ? "Tampilan Gantt estimasi produksi dalam aplikasi TMU" : "TMU application's production estimation Gantt chart"}
              fill
              sizes="(max-width: 760px) 90vw, 620px"
            />
          </div>
        </div>
        <span className="production-preview-caption">
          {id ? "GANTT ESTIMASI" : "ESTIMATION GANTT"}
        </span>
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
