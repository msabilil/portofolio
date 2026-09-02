import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { archivo, jetbrainsMono } from "@/styles/fonts";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopNav } from "@/components/layout/TopNav";
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
    <html lang={locale} className={`${archivo.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var t=localStorage.getItem('theme');if(t==='dark'||t==='light')document.documentElement.dataset.theme=t}catch(e){}",
          }}
        />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <TopNav />
          <div className="mx-auto flex w-full max-w-[var(--container-max)] flex-col items-stretch gap-6 px-6 pb-10 pt-24 md:flex-row md:items-start md:gap-10 md:px-10 md:pb-14 md:pt-24 lg:px-12 lg:gap-16">
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
