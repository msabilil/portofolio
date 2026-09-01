import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { archivo } from "@/styles/fonts";
import { MobileHeader } from "@/components/layout/MobileHeader";
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
          <MobileHeader />
          <div className="mx-auto flex max-w-[var(--container-max)]">
            <Sidebar />
            <SmoothScroll>
              <main className="w-full p-6 md:ml-[var(--sidebar-w)] md:p-12">{children}</main>
            </SmoothScroll>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
