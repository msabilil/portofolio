import { useTranslations } from "next-intl";
import { profile } from "@/content/profile";
import { Link } from "@/i18n/navigation";

export default function HomePage() {
  const t = useTranslations("home");

  return (
    <div>
      <p>{t("greeting")}</p>
      <h1 className="text-3xl font-semibold">{profile.name}</h1>
      <p style={{ color: "var(--color-text-muted)" }}>{t("tagline")}</p>
      <Link href="/projects" className="mt-4 inline-block underline">
        {t("cta")}
      </Link>
    </div>
  );
}
