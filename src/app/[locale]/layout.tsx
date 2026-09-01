import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { archivo } from "@/styles/fonts";
import { Sidebar } from "@/components/layout/Sidebar";
import { SmoothScroll } from "@/components/SmoothScroll";
import "../globals.css";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Muhamad Fajri — UI/UX Designer",
    description: "Portfolio of Muhamad Fajri, UI/UX designer.",
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
    <html lang={locale} className={archivo.variable}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <div className="mx-auto flex w-full max-w-[var(--container-max)] flex-col items-stretch gap-6 px-6 py-10 md:flex-row md:items-start md:gap-10 md:px-[10%] md:py-14 lg:gap-16">
            <Sidebar />
            <SmoothScroll>
              <main className="w-full min-w-0">{children}</main>
            </SmoothScroll>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
