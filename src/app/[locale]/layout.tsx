import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { routing } from "@/i18n/routing";
import { archivo, inter, jetbrainsMono, spaceGrotesk } from "@/styles/fonts";
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
  const cookieStore = await cookies();
  const theme = cookieStore.get("theme")?.value === "dark" ? "dark" : "light";

  return (
    <html
      lang={locale}
      data-theme={theme}
      className={`${archivo.variable} ${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <NextIntlClientProvider messages={messages}>
          <TopNav theme={theme} />
          <SmoothScroll>
            <main className="w-full min-w-0">{children}</main>
          </SmoothScroll>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
