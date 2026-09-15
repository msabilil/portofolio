import { getIconSlug } from "@/lib/techIcons";
import { TechLogo } from "./TechLogo";

export function SkillTag({ label, icon }: { label: string; icon?: string }) {
  const slug = icon || getIconSlug(label);
  return (
    <span className="skill-tag">
      <TechLogo slug={slug} size={13} />
      {label}
    </span>
  );
}
