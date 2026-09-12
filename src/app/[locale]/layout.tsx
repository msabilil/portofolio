import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { inter, jetbrainsMono, spaceGrotesk } from "@/styles/fonts";
import { TopNav } from "@/components/layout/TopNav";
import { SpaceBackground } from "@/components/layout/SpaceBackground";
import { SmoothScroll } from "@/components/SmoothScroll";
import { SpaceIntro } from "@/components/space/SpaceIntro";
import "../globals.css";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Portfolio Space — Muhammad Sabilil Fajri",
    description:
      "UI/UX design, web development and quality assurance by Muhammad Sabilil Fajri, Bandung, Indonesia.",
    alternates: {
      languages: { en: "/en", id: "/id" },
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <a className="skip-link" href="#main-content">
          {locale === "id" ? "Lewati ke konten" : "Skip to content"}
        </a>
        <NextIntlClientProvider messages={messages}>
          <SpaceIntro />
          <SpaceBackground />
          <TopNav />
          <SmoothScroll>
            <main id="main-content" className="w-full min-w-0" tabIndex={-1}>
              {children}
            </main>
          </SmoothScroll>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
