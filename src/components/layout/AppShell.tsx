"use client";

import { SmoothScroll } from "@/components/SmoothScroll";
import { SpaceIntro } from "@/components/space/SpaceIntro";
import { useAppLocale, LocaleProvider } from "@/i18n/LocaleProvider";
import { SpaceBackground } from "./SpaceBackground";
import { TopNav } from "./TopNav";

function AppContent({ children }: { children: React.ReactNode }) {
  const { locale } = useAppLocale();

  return (
    <>
      <a className="skip-link" href="#main-content">
        {locale === "id" ? "Lewati ke konten" : "Skip to content"}
      </a>
      <SpaceIntro />
      <SpaceBackground />
      <TopNav />
      <SmoothScroll>
        <main id="main-content" className="w-full min-w-0" tabIndex={-1}>
          {children}
        </main>
      </SmoothScroll>
    </>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <LocaleProvider>
      <AppContent>{children}</AppContent>
    </LocaleProvider>
  );
}
