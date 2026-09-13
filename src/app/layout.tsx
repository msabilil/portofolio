import type { Metadata } from "next";
import { AppShell } from "@/components/layout/AppShell";
import { inter, jetbrainsMono, spaceGrotesk } from "@/styles/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Portfolio Space — Muhammad Sabilil Fajri",
  description:
    "UI/UX design, web development and quality assurance by Muhammad Sabilil Fajri, Bandung, Indonesia.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
