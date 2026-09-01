# Portfolio Frontend Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the bilingual (EN/ID) portfolio UI on top of the existing Next.js scaffold: fixed sidebar / mobile drawer navigation, slow smooth scroll, design tokens from `design.md`, and five placeholder-content pages (Home, About, Skills, Projects, Contact).

**Architecture:** App Router with a `[locale]` dynamic segment powered by `next-intl` (default locale `en`, `id` also supported). A shared locale layout renders a fixed desktop `Sidebar` / mobile `MobileHeader`+`Drawer` shell around a `SmoothScroll`-wrapped content area. Pages are Server Components pulling copy from `messages/*.json` and local content modules (`profile.ts`, `projects.ts`) — no CMS, no backend.

**Tech Stack:** Next.js 16 (App Router), TypeScript, Tailwind CSS v4, Bun 1.4 (runtime, package manager, and test runner), `next-intl`, `lenis`.

**Spec:** `docs/prd.md` and `docs/design.md` (both v1.0, all open questions resolved).

## Global Constraints

- Runtime/package manager: Bun 1.4 — use `bun add`, `bun run`, `bun test` (not npm/yarn/pnpm/vitest/jest).
- Locales: `en` (default) and `id`, prefixed in the URL (`/en/...`, `/id/...`) — per PRD §5 and §11 Q2.
- Colors/typography/spacing tokens come verbatim from `docs/design.md` §2–§4 and §10 — do not invent new values.
- No CMS/backend, no contact form, no `/projects/[slug]` detail page in this plan — per PRD §10 and §11 Q1/Q3.
- Accessibility: every interactive element keyboard-operable, visible focus (`--focus-ring`), `prefers-reduced-motion` respected for the smooth-scroll effect — per `design.md` §8 and PRD §9.
- No emoji-as-icons — inline SVG for the hamburger/close icons (per `frontend-ui-engineering` guidance already applied below).
- **Testing strategy:** `bun test` (with `@testing-library/react` + `happy-dom`) covers pure logic and presentational components with no Next.js router dependency: content/message validation, the reduced-motion branch, `Drawer`, `ProjectCard`, `SocialLinks`, and `NavLinks` (via a `next/navigation` mock). Components that only *compose* already-tested pieces (`Sidebar`, `MobileHeader`, `LanguageToggle`) and Server Component pages are verified via `bun run build` + a manual browser checklist in their task — mocking `next/navigation` and the async Server Component render pipeline for every composed node would cost more than it protects for a portfolio of this size.

---

### Task 1: Test tooling (Bun test + Testing Library + happy-dom)

**Files:**
- Create: `bunfig.toml`
- Create: `src/test/setup.ts`
- Create: `src/test/setup.test.tsx`
- Modify: `package.json` (add `test` script)

**Interfaces:**
- Consumes: nothing (first task).
- Produces: a working `bun test` command with DOM APIs (`happy-dom`) and `@testing-library/react` + `jest-dom` matchers available to every later test file — no import needed per test file beyond `@testing-library/react` itself.

- [ ] **Step 1: Install test dependencies**

```bash
bun add -d @testing-library/react @testing-library/jest-dom @happy-dom/global-registrator
```

- [ ] **Step 2: Create the preload setup file**

`src/test/setup.ts`:
```ts
import { GlobalRegistrator } from "@happy-dom/global-registrator";
import { expect } from "bun:test";
import * as matchers from "@testing-library/jest-dom/matchers";

GlobalRegistrator.register();
expect.extend(matchers);
```

- [ ] **Step 3: Point Bun's test runner at the preload file**

`bunfig.toml`:
```toml
[test]
preload = ["./src/test/setup.ts"]
```

- [ ] **Step 4: Write the smoke test (fails first — no test runner wired yet is not the point; the point is confirming the DOM + RTL wiring works)**

`src/test/setup.test.tsx`:
```tsx
import { describe, expect, it } from "bun:test";
import { render, screen } from "@testing-library/react";

describe("test environment", () => {
  it("renders a React component into happy-dom", () => {
    render(<div>hello</div>);
    expect(screen.getByText("hello")).toBeInTheDocument();
  });
});
```

- [ ] **Step 5: Add the `test` script**

In `package.json`, add to `"scripts"`:
```json
"test": "bun test"
```

- [ ] **Step 6: Run the test and verify it passes**

Run: `bun test`
Expected: `1 pass` for `src/test/setup.test.tsx`. If it fails with a DOM-related error, `happy-dom` did not register — check `bunfig.toml` path.

- [ ] **Step 7: Commit**

```bash
git add bunfig.toml src/test/setup.ts src/test/setup.test.tsx package.json bun.lock
git commit -m "test: wire up bun test with happy-dom and testing-library"
```

---

### Task 2: Content data (`profile.ts`, `projects.ts`)

**Files:**
- Create: `src/content/profile.ts`
- Create: `src/content/profile.test.ts`
- Create: `src/content/projects.ts`
- Create: `src/content/projects.test.ts`

**Interfaces:**
- Consumes: nothing.
- Produces:
  - `profile: { name: string; social: { id: "email"|"github"|"linkedin"|"instagram"; href: string }[] }` from `@/content/profile`.
  - `type Project = { slug: string; title: string; description: { en: string; id: string }; tags: string[]; cover: string; link?: string }` and `projects: Project[]` from `@/content/projects`.

- [ ] **Step 1: Write the failing tests**

`src/content/profile.test.ts`:
```ts
import { describe, expect, it } from "bun:test";
import { profile } from "./profile";

describe("profile data", () => {
  it("has a name and at least one social link with a known id and a non-empty href", () => {
    expect(profile.name.length).toBeGreaterThan(0);
    expect(profile.social.length).toBeGreaterThan(0);
    for (const link of profile.social) {
      expect(["email", "github", "linkedin", "instagram"]).toContain(link.id);
      expect(link.href.length).toBeGreaterThan(0);
    }
  });
});
```

`src/content/projects.test.ts`:
```ts
import { describe, expect, it } from "bun:test";
import { projects } from "./projects";

describe("projects data", () => {
  it("has unique, non-empty slugs", () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) expect(slug.length).toBeGreaterThan(0);
  });

  it("every project has an en and id description", () => {
    for (const project of projects) {
      expect(project.description.en.length).toBeGreaterThan(0);
      expect(project.description.id.length).toBeGreaterThan(0);
    }
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `bun test src/content`
Expected: FAIL — `Cannot find module './profile'` / `./projects'`.

- [ ] **Step 3: Implement the content modules**

`src/content/profile.ts`:
```ts
export type SocialLinkId = "email" | "github" | "linkedin" | "instagram";

export type SocialLink = {
  id: SocialLinkId;
  href: string;
};

// Ganti href github/linkedin/instagram dengan URL profil asli sebelum publish.
export const profile = {
  name: "Muhamad Fajri",
  social: [
    { id: "email", href: "mailto:muhamadfajri943@gmail.com" },
    { id: "github", href: "https://github.com/" },
    { id: "linkedin", href: "https://linkedin.com/" },
    { id: "instagram", href: "https://instagram.com/" },
  ] as SocialLink[],
};
```

`src/content/projects.ts`:
```ts
export type Project = {
  slug: string;
  title: string;
  description: { en: string; id: string };
  tags: string[];
  cover: string;
  link?: string;
};

// Tambah project baru di sini. Cover diambil dari public/assets/projects/<slug>/cover.jpg
export const projects: Project[] = [
  {
    slug: "sample-project",
    title: "Sample Project",
    description: {
      en: "Placeholder description — replace with a real case study once assets are uploaded.",
      id: "Deskripsi placeholder — ganti dengan studi kasus asli setelah aset diunggah.",
    },
    tags: ["UI Design", "Figma"],
    cover: "/assets/projects/sample-project/cover.jpg",
  },
];
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `bun test src/content`
Expected: `4 pass`.

- [ ] **Step 5: Commit**

```bash
git add src/content
git commit -m "feat: add profile and projects content modules"
```

---

### Task 3: Translation messages (`messages/en.json`, `messages/id.json`)

**Files:**
- Create: `messages/en.json`
- Create: `messages/id.json`
- Create: `src/i18n/messages.test.ts`

**Interfaces:**
- Consumes: nothing.
- Produces: the message namespaces every later component/page reads via `useTranslations(<namespace>)`: `nav`, `sidebar`, `home`, `about`, `skills` (with `skills.tools.*` and `skills.soft.*`), `projects`, `contact`, `drawer`, `social`.

- [ ] **Step 1: Write the failing test**

`src/i18n/messages.test.ts`:
```ts
import { describe, expect, it } from "bun:test";
import en from "../../messages/en.json";
import id from "../../messages/id.json";

function flattenKeys(value: unknown, prefix = ""): string[] {
  if (typeof value !== "object" || value === null) return [prefix];
  return Object.entries(value).flatMap(([key, child]) =>
    flattenKeys(child, prefix ? `${prefix}.${key}` : key),
  );
}

describe("translation messages", () => {
  it("en and id expose the exact same set of keys", () => {
    expect(flattenKeys(id).sort()).toEqual(flattenKeys(en).sort());
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `bun test src/i18n/messages.test.ts`
Expected: FAIL — cannot find `../../messages/en.json`.

- [ ] **Step 3: Write the message files**

`messages/en.json`:
```json
{
  "nav": {
    "mainLabel": "Main navigation",
    "home": "Home",
    "about": "About",
    "skills": "Skills",
    "projects": "Projects",
    "contact": "Contact"
  },
  "sidebar": {
    "roleLabel": "UI/UX Designer",
    "languageLabel": "Language"
  },
  "home": {
    "greeting": "Hi, I'm",
    "tagline": "I design clear, human interfaces.",
    "cta": "View projects"
  },
  "about": {
    "title": "About",
    "bio": "Placeholder bio — add a short paragraph about your background and design focus here."
  },
  "skills": {
    "title": "Skills",
    "toolsHeading": "Tools",
    "softHeading": "Soft skills",
    "tools": {
      "figma": "Figma",
      "balsamiq": "Balsamiq",
      "googleStitch": "Google Stitch",
      "claudeDesign": "Claude Design",
      "deepseek": "DeepSeek"
    },
    "soft": {
      "creative": "Creative",
      "innovative": "Innovative",
      "communication": "Communication",
      "interpersonal": "Interpersonal",
      "criticalThinking": "Critical thinking",
      "analyticalThinking": "Analytical thinking",
      "problemSolving": "Problem solving",
      "curiosity": "Curiosity",
      "initiative": "Initiative"
    }
  },
  "projects": {
    "title": "Projects",
    "viewLink": "View"
  },
  "contact": {
    "title": "Contact",
    "intro": "The fastest way to reach me is by email or social media."
  },
  "drawer": {
    "openLabel": "Open menu",
    "closeLabel": "Close menu"
  },
  "social": {
    "emailLabel": "Email",
    "githubLabel": "GitHub",
    "linkedinLabel": "LinkedIn",
    "instagramLabel": "Instagram"
  }
}
```

`messages/id.json`:
```json
{
  "nav": {
    "mainLabel": "Navigasi utama",
    "home": "Beranda",
    "about": "Tentang",
    "skills": "Keahlian",
    "projects": "Proyek",
    "contact": "Kontak"
  },
  "sidebar": {
    "roleLabel": "UI/UX Designer",
    "languageLabel": "Bahasa"
  },
  "home": {
    "greeting": "Hai, saya",
    "tagline": "Saya merancang antarmuka yang jelas dan manusiawi.",
    "cta": "Lihat proyek"
  },
  "about": {
    "title": "Tentang",
    "bio": "Bio placeholder — tambahkan paragraf singkat tentang latar belakang dan fokus desainmu di sini."
  },
  "skills": {
    "title": "Keahlian",
    "toolsHeading": "Tools",
    "softHeading": "Soft skill",
    "tools": {
      "figma": "Figma",
      "balsamiq": "Balsamiq",
      "googleStitch": "Google Stitch",
      "claudeDesign": "Claude Design",
      "deepseek": "DeepSeek"
    },
    "soft": {
      "creative": "Creative",
      "innovative": "Innovative",
      "communication": "Communication",
      "interpersonal": "Interpersonal",
      "criticalThinking": "Critical thinking",
      "analyticalThinking": "Analytical thinking",
      "problemSolving": "Problem solving",
      "curiosity": "Curiosity",
      "initiative": "Initiative"
    }
  },
  "projects": {
    "title": "Proyek",
    "viewLink": "Lihat"
  },
  "contact": {
    "title": "Kontak",
    "intro": "Cara tercepat menghubungi saya lewat email atau media sosial."
  },
  "drawer": {
    "openLabel": "Buka menu",
    "closeLabel": "Tutup menu"
  },
  "social": {
    "emailLabel": "Email",
    "githubLabel": "GitHub",
    "linkedinLabel": "LinkedIn",
    "instagramLabel": "Instagram"
  }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `bun test src/i18n/messages.test.ts`
Expected: `1 pass`.

- [ ] **Step 5: Commit**

```bash
git add messages src/i18n/messages.test.ts
git commit -m "feat: add en/id translation messages with a key-parity test"
```

---

### Task 4: `next-intl` routing/middleware + restructure into `[locale]`

**Files:**
- Create: `src/i18n/routing.ts`
- Create: `src/i18n/routing.test.ts`
- Create: `src/i18n/navigation.ts`
- Create: `src/i18n/request.ts`
- Create: `src/middleware.ts`
- Modify: `next.config.ts`
- Delete: `src/app/layout.tsx`
- Delete: `src/app/page.tsx`
- Create: `src/app/[locale]/layout.tsx`
- Create: `src/app/[locale]/page.tsx`

**Interfaces:**
- Consumes: `messages/en.json` / `messages/id.json` (Task 3), `profile` (Task 2).
- Produces: `routing` (`{ locales: ["en","id"]; defaultLocale: "en" }`) from `@/i18n/routing`; `{ Link, redirect, usePathname, useRouter, getPathname }` from `@/i18n/navigation` — every later nav component imports `Link`/`usePathname`/`useRouter` from here, never from `next/navigation` directly.

- [ ] **Step 1: Install `next-intl`**

```bash
bun add next-intl
```

- [ ] **Step 2: Write the failing routing config test**

`src/i18n/routing.test.ts`:
```ts
import { describe, expect, it } from "bun:test";
import { routing } from "./routing";

describe("i18n routing config", () => {
  it("supports en and id with en as the default locale", () => {
    expect(routing.locales).toEqual(["en", "id"]);
    expect(routing.defaultLocale).toBe("en");
  });
});
```

- [ ] **Step 3: Run test to verify it fails**

Run: `bun test src/i18n/routing.test.ts`
Expected: FAIL — cannot find `./routing`.

- [ ] **Step 4: Implement the i18n plumbing**

`src/i18n/routing.ts`:
```ts
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "id"],
  defaultLocale: "en",
});
```

`src/i18n/navigation.ts`:
```ts
import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
```

`src/i18n/request.ts`:
```ts
import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
```

`src/middleware.ts`:
```ts
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
```

`next.config.ts`:
```ts
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {};

export default withNextIntl(nextConfig);
```

- [ ] **Step 5: Delete the old root layout/page and add the `[locale]` versions**

```bash
rm src/app/layout.tsx src/app/page.tsx
```

`src/app/[locale]/layout.tsx`:
```tsx
import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
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
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

`src/app/[locale]/page.tsx`:
```tsx
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
```

- [ ] **Step 6: Run test to verify it passes**

Run: `bun test src/i18n/routing.test.ts`
Expected: `1 pass`.

- [ ] **Step 7: Verify the routing manually**

```bash
bun run build
bun run dev &
sleep 2
curl -sI http://localhost:3000/ | head -1        # expect a redirect (307/308) to /en
curl -s http://localhost:3000/en | grep -o "Muhamad Fajri"
curl -s http://localhost:3000/id | grep -o "Hai, saya"
kill %1
```

Expected: root redirects, `/en` renders the English greeting, `/id` renders the Indonesian greeting.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: wire up next-intl routing and restructure app into [locale]"
```

---

### Task 5: Design tokens and Archivo font

**Files:**
- Create: `src/styles/fonts.ts`
- Modify: `src/app/globals.css`
- Modify: `src/app/[locale]/layout.tsx`

**Interfaces:**
- Consumes: `src/app/[locale]/layout.tsx` from Task 4.
- Produces: `archivo` (a `next/font/google` result with `.variable`) from `@/styles/fonts`; CSS custom properties `--color-bg`, `--color-bg-subtle`, `--color-text`, `--color-text-muted`, `--color-border`, `--color-hover`, `--container-max`, `--sidebar-w`, `--radius-sm`, `--radius-md`, `--ease-out`, `--dur-fast`, `--dur-base`, `--focus-ring`, `--focus-ring-offset` — every later component styles against these tokens, never raw hex values.

> No `bun test` step here: `next/font/google` requires Next's own compiler plugin and cannot be imported in a plain Bun test process. Verification is `bun run build` plus the manual visual check below.

- [ ] **Step 1: Add the Archivo font module**

`src/styles/fonts.ts`:
```ts
import { Archivo } from "next/font/google";

export const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-archivo",
});
```

- [ ] **Step 2: Replace `globals.css` with the design tokens from `design.md` §10**

`src/app/globals.css`:
```css
@import "tailwindcss";

:root {
  --color-bg: #ffffff;
  --color-bg-subtle: #f6f6f5;
  --color-text: #0f0f0f;
  --color-text-muted: #6e6e6e;
  --color-border: #e6e6e4;
  --color-hover: #000000;

  --container-max: 1400px;
  --sidebar-w: 300px;

  --radius-sm: 8px;
  --radius-md: 12px;

  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --dur-fast: 150ms;
  --dur-base: 250ms;

  --focus-ring: 2px solid var(--color-text);
  --focus-ring-offset: 2px;
}

@theme inline {
  --color-background: var(--color-bg);
  --color-foreground: var(--color-text);
  --font-sans: var(--font-archivo);
}

body {
  background: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-archivo), ui-sans-serif, system-ui, sans-serif;
}

*:focus-visible {
  outline: var(--focus-ring);
  outline-offset: var(--focus-ring-offset);
}
```

- [ ] **Step 3: Apply the font variable to `<html>`**

In `src/app/[locale]/layout.tsx`, add the import and apply the class name:
```tsx
import { archivo } from "@/styles/fonts";
```
Change:
```tsx
    <html lang={locale}>
```
to:
```tsx
    <html lang={locale} className={archivo.variable}>
```

- [ ] **Step 4: Verify with a build and a manual check**

Run: `bun run build`
Expected: succeeds with no font-loader errors.

Manual: `bun run dev`, open `http://localhost:3000/en`, confirm in devtools that body text renders in Archivo and the background is white (`#ffffff`).

- [ ] **Step 5: Commit**

```bash
git add src/styles/fonts.ts src/app/globals.css src/app/[locale]/layout.tsx
git commit -m "feat: apply design tokens and Archivo font"
```

---

### Task 6: `SmoothScroll` (Lenis, reduced-motion aware)

**Files:**
- Create: `src/components/SmoothScroll.tsx`
- Create: `src/components/SmoothScroll.test.ts`

**Interfaces:**
- Consumes: nothing new.
- Produces: `SmoothScroll` (React component, `{ children: ReactNode }`) and `prefersReducedMotion(): boolean` from `@/components/SmoothScroll` — Task 10 wraps the page content with `<SmoothScroll>`.

- [ ] **Step 1: Install `lenis`**

```bash
bun add lenis
```

- [ ] **Step 2: Write the failing test for the reduced-motion branch**

`src/components/SmoothScroll.test.ts`:
```ts
import { afterEach, describe, expect, it } from "bun:test";
import { prefersReducedMotion } from "./SmoothScroll";

function mockMatchMedia(matches: boolean) {
  window.matchMedia = ((query: string) => ({
    matches,
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
  })) as unknown as typeof window.matchMedia;
}

describe("prefersReducedMotion", () => {
  afterEach(() => {
    // @ts-expect-error test cleanup only
    delete window.matchMedia;
  });

  it("is true when the OS setting is enabled", () => {
    mockMatchMedia(true);
    expect(prefersReducedMotion()).toBe(true);
  });

  it("is false otherwise", () => {
    mockMatchMedia(false);
    expect(prefersReducedMotion()).toBe(false);
  });
});
```

- [ ] **Step 3: Run test to verify it fails**

Run: `bun test src/components/SmoothScroll.test.ts`
Expected: FAIL — cannot find `./SmoothScroll`.

- [ ] **Step 4: Implement `SmoothScroll`**

`src/components/SmoothScroll.tsx`:
```tsx
"use client";

import Lenis from "lenis";
import { useEffect, type ReactNode } from "react";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      duration: 2.2,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      wheelMultiplier: 0.8,
    });

    let frameId: number;
    function raf(time: number) {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    }
    frameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `bun test src/components/SmoothScroll.test.ts`
Expected: `2 pass`.

- [ ] **Step 6: Commit**

```bash
git add src/components/SmoothScroll.tsx src/components/SmoothScroll.test.ts package.json bun.lock
git commit -m "feat: add reduced-motion-aware Lenis smooth scroll wrapper"
```

---

### Task 7: `Drawer` (mobile nav shell)

**Files:**
- Create: `src/components/layout/Drawer.tsx`
- Create: `src/components/layout/Drawer.test.tsx`

**Interfaces:**
- Consumes: nothing (no `next-intl`/`next/navigation` dependency by design — it only takes `children`).
- Produces: `Drawer` (`{ isOpen: boolean; onClose: () => void; closeLabel: string; children: ReactNode }`) from `@/components/layout/Drawer` — Task 9's `MobileHeader` renders it.

- [ ] **Step 1: Write the failing tests**

`src/components/layout/Drawer.test.tsx`:
```tsx
import { describe, expect, it } from "bun:test";
import { fireEvent, render, screen } from "@testing-library/react";
import { Drawer } from "./Drawer";

describe("Drawer", () => {
  it("renders nothing when closed", () => {
    render(
      <Drawer isOpen={false} onClose={() => {}} closeLabel="Close menu">
        <p>content</p>
      </Drawer>,
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("moves focus to the close button when opened", () => {
    render(
      <Drawer isOpen onClose={() => {}} closeLabel="Close menu">
        <p>content</p>
      </Drawer>,
    );
    const closeButtons = screen.getAllByRole("button", { name: "Close menu" });
    expect(document.activeElement).toBe(closeButtons[closeButtons.length - 1]);
  });

  it("calls onClose on Escape", () => {
    let closed = false;
    render(
      <Drawer isOpen onClose={() => (closed = true)} closeLabel="Close menu">
        <p>content</p>
      </Drawer>,
    );
    fireEvent.keyDown(document, { key: "Escape" });
    expect(closed).toBe(true);
  });

  it("calls onClose when the overlay is clicked", () => {
    let closed = false;
    render(
      <Drawer isOpen onClose={() => (closed = true)} closeLabel="Close menu">
        <p>content</p>
      </Drawer>,
    );
    fireEvent.click(screen.getByTestId("drawer-overlay"));
    expect(closed).toBe(true);
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `bun test src/components/layout/Drawer.test.tsx`
Expected: FAIL — cannot find `./Drawer`.

- [ ] **Step 3: Implement `Drawer`**

`src/components/layout/Drawer.tsx`:
```tsx
"use client";

import { useEffect, useRef, type ReactNode } from "react";

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

type DrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  closeLabel: string;
  children: ReactNode;
};

export function Drawer({ isOpen, onClose, closeLabel, children }: DrawerProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) closeButtonRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      <button
        type="button"
        data-testid="drawer-overlay"
        aria-label={closeLabel}
        onClick={onClose}
        className="absolute inset-0 bg-black/40"
      />
      <div
        role="dialog"
        aria-modal="true"
        className="relative ml-auto flex h-full w-72 flex-col gap-6 p-6"
        style={{ background: "var(--color-bg)" }}
      >
        <button ref={closeButtonRef} type="button" onClick={onClose} aria-label={closeLabel}>
          <CloseIcon />
        </button>
        {children}
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `bun test src/components/layout/Drawer.test.tsx`
Expected: `4 pass`.

- [ ] **Step 5: Commit**

```bash
git add src/components/layout/Drawer.tsx src/components/layout/Drawer.test.tsx
git commit -m "feat: add accessible mobile Drawer shell"
```

---

### Task 8: `SocialLinks` and `NavLinks`

**Files:**
- Create: `src/components/layout/SocialLinks.tsx`
- Create: `src/components/layout/SocialLinks.test.tsx`
- Create: `src/components/layout/NavLinks.tsx`
- Create: `src/components/layout/NavLinks.test.tsx`

**Interfaces:**
- Consumes: `profile` (Task 2), `messages.social`/`messages.nav` (Task 3), `Link`/`usePathname` from `@/i18n/navigation` (Task 4).
- Produces: `SocialLinks` (no props) and `NavLinks` (`{ onNavigate?: () => void }`) from `@/components/layout/*` — Task 9 (`MobileHeader`) and Task 10 (`Sidebar`) render both.

- [ ] **Step 1: Write the failing `SocialLinks` test**

`src/components/layout/SocialLinks.test.tsx`:
```tsx
import { describe, expect, it } from "bun:test";
import { NextIntlClientProvider } from "next-intl";
import { render, screen } from "@testing-library/react";
import { SocialLinks } from "./SocialLinks";

const messages = {
  social: {
    emailLabel: "Email",
    githubLabel: "GitHub",
    linkedinLabel: "LinkedIn",
    instagramLabel: "Instagram",
  },
};

describe("SocialLinks", () => {
  it("renders one accessible link per profile social entry", () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <SocialLinks />
      </NextIntlClientProvider>,
    );

    const emailLink = screen.getByRole("link", { name: "Email" });
    expect(emailLink).toHaveAttribute("href", "mailto:muhamadfajri943@gmail.com");

    const githubLink = screen.getByRole("link", { name: "GitHub" });
    expect(githubLink).toHaveAttribute("target", "_blank");
    expect(githubLink).toHaveAttribute("rel", "noopener noreferrer");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `bun test src/components/layout/SocialLinks.test.tsx`
Expected: FAIL — cannot find `./SocialLinks`.

- [ ] **Step 3: Implement `SocialLinks`**

`src/components/layout/SocialLinks.tsx`:
```tsx
import { useTranslations } from "next-intl";
import { profile } from "@/content/profile";
import type { SocialLinkId } from "@/content/profile";

const LABEL_KEYS: Record<SocialLinkId, string> = {
  email: "emailLabel",
  github: "githubLabel",
  linkedin: "linkedinLabel",
  instagram: "instagramLabel",
};

export function SocialLinks() {
  const t = useTranslations("social");

  return (
    <ul className="flex gap-3">
      {profile.social.map((link) => (
        <li key={link.id}>
          <a
            href={link.href}
            target={link.id === "email" ? undefined : "_blank"}
            rel={link.id === "email" ? undefined : "noopener noreferrer"}
            aria-label={t(LABEL_KEYS[link.id])}
            style={{ color: "var(--color-text-muted)" }}
          >
            {t(LABEL_KEYS[link.id])}
          </a>
        </li>
      ))}
    </ul>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `bun test src/components/layout/SocialLinks.test.tsx`
Expected: `1 pass`.

- [ ] **Step 5: Write the failing `NavLinks` test (mocks `next/navigation`)**

`src/components/layout/NavLinks.test.tsx`:
```tsx
import { describe, expect, it, mock } from "bun:test";

mock.module("next/navigation", () => ({
  usePathname: () => "/about",
  useRouter: () => ({ push: () => {}, replace: () => {} }),
}));

const { render, screen } = await import("@testing-library/react");
const { NextIntlClientProvider } = await import("next-intl");
const { NavLinks } = await import("./NavLinks");

const messages = {
  nav: {
    mainLabel: "Main navigation",
    home: "Home",
    about: "About",
    skills: "Skills",
    projects: "Projects",
    contact: "Contact",
  },
};

describe("NavLinks", () => {
  it("marks the current route with aria-current and leaves the rest unmarked", () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <NavLinks />
      </NextIntlClientProvider>,
    );

    expect(screen.getByRole("link", { name: "About" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "Home" })).not.toHaveAttribute("aria-current");
  });
});
```

- [ ] **Step 6: Run test to verify it fails**

Run: `bun test src/components/layout/NavLinks.test.tsx`
Expected: FAIL — cannot find `./NavLinks`.

- [ ] **Step 7: Implement `NavLinks`**

`src/components/layout/NavLinks.tsx`:
```tsx
"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

const ROUTES = ["/", "/about", "/skills", "/projects", "/contact"] as const;
type Route = (typeof ROUTES)[number];
const LABEL_KEYS: Record<Route, string> = {
  "/": "home",
  "/about": "about",
  "/skills": "skills",
  "/projects": "projects",
  "/contact": "contact",
};

export function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const t = useTranslations("nav");

  return (
    <nav aria-label={t("mainLabel")}>
      <ul className="flex flex-col gap-3">
        {ROUTES.map((route) => {
          const isActive = pathname === route;
          return (
            <li key={route}>
              <Link
                href={route}
                onClick={onNavigate}
                aria-current={isActive ? "page" : undefined}
                style={{ color: isActive ? "var(--color-text)" : "var(--color-text-muted)" }}
                className={isActive ? "font-semibold" : undefined}
              >
                {t(LABEL_KEYS[route])}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
```

- [ ] **Step 8: Run test to verify it passes**

Run: `bun test src/components/layout/NavLinks.test.tsx`
Expected: `1 pass`.

- [ ] **Step 9: Commit**

```bash
git add src/components/layout/SocialLinks.tsx src/components/layout/SocialLinks.test.tsx src/components/layout/NavLinks.tsx src/components/layout/NavLinks.test.tsx
git commit -m "feat: add SocialLinks and NavLinks with active-route highlighting"
```

---

### Task 9: `LanguageToggle`, `Sidebar` (desktop), `MobileHeader`

**Files:**
- Create: `src/components/layout/LanguageToggle.tsx`
- Create: `src/components/layout/Sidebar.tsx`
- Create: `src/components/layout/MobileHeader.tsx`

**Interfaces:**
- Consumes: `NavLinks`, `SocialLinks` (Task 8), `Drawer` (Task 7), `profile` (Task 2), `useRouter`/`usePathname` from `@/i18n/navigation` (Task 4), `routing` (Task 4).
- Produces: `LanguageToggle`, `Sidebar`, `MobileHeader` (all no-prop components) from `@/components/layout/*` — Task 10 renders `Sidebar` and `MobileHeader` in the locale layout.

> No `bun test` here: all three compose already-tested pieces (`NavLinks`, `SocialLinks`, `Drawer`) plus `next-intl`'s router-coupled `useRouter`/`usePathname`, which would need the same `next/navigation` mock as Task 8 with no new branching logic to protect. Verified via `bun run build` + the manual checklist in Task 10, once the full shell is wired up.

- [ ] **Step 1: Implement `LanguageToggle`**

`src/components/layout/LanguageToggle.tsx`:
```tsx
"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export function LanguageToggle() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("sidebar");

  return (
    <div role="group" aria-label={t("languageLabel")} className="flex gap-2">
      {routing.locales.map((code) => (
        <button
          key={code}
          type="button"
          aria-current={code === locale ? "true" : undefined}
          onClick={() => router.replace(pathname, { locale: code })}
          style={{ color: code === locale ? "var(--color-text)" : "var(--color-text-muted)" }}
          className={code === locale ? "font-semibold underline" : undefined}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Implement `Sidebar` (desktop, fixed)**

`src/components/layout/Sidebar.tsx`:
```tsx
import Image from "next/image";
import { useTranslations } from "next-intl";
import { profile } from "@/content/profile";
import { LanguageToggle } from "./LanguageToggle";
import { NavLinks } from "./NavLinks";
import { SocialLinks } from "./SocialLinks";

export function Sidebar() {
  const t = useTranslations("sidebar");

  return (
    <aside
      className="hidden md:fixed md:inset-y-0 md:left-0 md:flex md:w-[var(--sidebar-w)] md:flex-col md:gap-8 md:border-r md:p-8"
      style={{ borderColor: "var(--color-border)" }}
    >
      <Image
        src="/assets/photos/profile.jpg"
        alt={profile.name}
        width={96}
        height={96}
        className="rounded-full"
      />
      <div>
        <p className="text-lg font-semibold">{profile.name}</p>
        <p style={{ color: "var(--color-text-muted)" }}>{t("roleLabel")}</p>
      </div>
      <SocialLinks />
      <LanguageToggle />
      <NavLinks />
    </aside>
  );
}
```

- [ ] **Step 3: Implement `MobileHeader` (header bar + hamburger + `Drawer`)**

`src/components/layout/MobileHeader.tsx`:
```tsx
"use client";

import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { profile } from "@/content/profile";
import { Drawer } from "./Drawer";
import { LanguageToggle } from "./LanguageToggle";
import { NavLinks } from "./NavLinks";
import { SocialLinks } from "./SocialLinks";

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M2 5h16M2 10h16M2 15h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function MobileHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("drawer");

  return (
    <header
      className="flex items-center justify-between border-b p-4 md:hidden"
      style={{ borderColor: "var(--color-border)" }}
    >
      <div className="flex items-center gap-2">
        <Image src="/assets/photos/profile.jpg" alt={profile.name} width={32} height={32} className="rounded-full" />
        <span className="font-semibold">{profile.name}</span>
      </div>
      <button type="button" aria-label={t("openLabel")} aria-expanded={isOpen} onClick={() => setIsOpen(true)}>
        <MenuIcon />
      </button>
      <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} closeLabel={t("closeLabel")}>
        <NavLinks onNavigate={() => setIsOpen(false)} />
        <SocialLinks />
        <LanguageToggle />
      </Drawer>
    </header>
  );
}
```

- [ ] **Step 4: Run the full test suite (regression check — no new tests, but nothing else should break)**

Run: `bun test`
Expected: all previous tests still pass.

- [ ] **Step 5: Commit**

```bash
git add src/components/layout/LanguageToggle.tsx src/components/layout/Sidebar.tsx src/components/layout/MobileHeader.tsx
git commit -m "feat: add LanguageToggle, desktop Sidebar and MobileHeader"
```

---

### Task 10: Wire the shell into the locale layout

**Files:**
- Modify: `src/app/[locale]/layout.tsx`

**Interfaces:**
- Consumes: `Sidebar`, `MobileHeader` (Task 9), `SmoothScroll` (Task 6).
- Produces: the final page shell every route in `[locale]/` renders inside.

- [ ] **Step 1: Update the locale layout**

`src/app/[locale]/layout.tsx` (full file):
```tsx
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
```

- [ ] **Step 2: Build and manually verify the shell**

Run: `bun run build`
Expected: succeeds.

Manual (`bun run dev`, `http://localhost:3000/en`):
- [ ] At ≥1024px width: sidebar fixed on the left, content offset to its right, container has visible whitespace at the far edges of a wide window (not full-bleed).
- [ ] At <768px width: sidebar is hidden, the mobile header bar shows instead; tapping the hamburger opens the drawer, Escape and the overlay both close it, and focus lands on the drawer's close button when it opens.
- [ ] Tab through the page: every interactive element (nav links, social links, language toggle, hamburger) shows a visible focus ring.
- [ ] Toggle EN/ID: the URL prefix changes and the current page stays the same.
- [ ] In devtools, emulate `prefers-reduced-motion: reduce`, reload, and confirm the page scrolls natively (no added momentum).

- [ ] **Step 3: Commit**

```bash
git add src/app/[locale]/layout.tsx
git commit -m "feat: wire sidebar/mobile-header/smooth-scroll shell into the locale layout"
```

---

### Task 11: `ProjectCard` and `SkillTag`

**Files:**
- Create: `src/components/ProjectCard.tsx`
- Create: `src/components/ProjectCard.test.tsx`
- Create: `src/components/SkillTag.tsx`

**Interfaces:**
- Consumes: `Project` type (Task 2).
- Produces: `ProjectCard` (`{ project: Project; description: string; viewLabel: string }`) and `SkillTag` (`{ label: string }`) from `@/components/*` — Task 12's Projects and Skills pages render them.

- [ ] **Step 1: Write the failing `ProjectCard` tests**

`src/components/ProjectCard.test.tsx`:
```tsx
import { describe, expect, it } from "bun:test";
import { render, screen } from "@testing-library/react";
import { ProjectCard } from "./ProjectCard";
import type { Project } from "@/content/projects";

const project: Project = {
  slug: "demo",
  title: "Demo Project",
  description: { en: "A demo project.", id: "Proyek demo." },
  tags: ["UI", "Figma"],
  cover: "/assets/projects/demo/cover.jpg",
  link: "https://example.com",
};

describe("ProjectCard", () => {
  it("renders title, description, tags and a view link", () => {
    render(<ProjectCard project={project} description={project.description.en} viewLabel="View" />);

    expect(screen.getByText("Demo Project")).toBeInTheDocument();
    expect(screen.getByText("A demo project.")).toBeInTheDocument();
    expect(screen.getByText("UI")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "View" })).toHaveAttribute("href", "https://example.com");
  });

  it("omits the view link when the project has no link", () => {
    render(<ProjectCard project={{ ...project, link: undefined }} description={project.description.en} viewLabel="View" />);
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `bun test src/components/ProjectCard.test.tsx`
Expected: FAIL — cannot find `./ProjectCard`.

- [ ] **Step 3: Implement `ProjectCard` and `SkillTag`**

`src/components/ProjectCard.tsx`:
```tsx
import Image from "next/image";
import type { Project } from "@/content/projects";

type ProjectCardProps = {
  project: Project;
  description: string;
  viewLabel: string;
};

export function ProjectCard({ project, description, viewLabel }: ProjectCardProps) {
  return (
    <article
      className="rounded-[var(--radius-md)] border p-4"
      style={{ borderColor: "var(--color-border)" }}
    >
      <div className="relative mb-3 aspect-[4/3]">
        <Image src={project.cover} alt={project.title} fill className="rounded-[var(--radius-sm)] object-cover" />
      </div>
      <h3 className="font-semibold">{project.title}</h3>
      <p style={{ color: "var(--color-text-muted)" }}>{description}</p>
      <ul className="mt-2 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <li
            key={tag}
            className="rounded-full border px-2 py-1 text-xs"
            style={{ borderColor: "var(--color-border)" }}
          >
            {tag}
          </li>
        ))}
      </ul>
      {project.link && (
        <a href={project.link} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block underline">
          {viewLabel}
        </a>
      )}
    </article>
  );
}
```

`src/components/SkillTag.tsx`:
```tsx
export function SkillTag({ label }: { label: string }) {
  return (
    <span
      className="rounded-full border px-3 py-1 text-sm"
      style={{ borderColor: "var(--color-border)" }}
    >
      {label}
    </span>
  );
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `bun test src/components/ProjectCard.test.tsx`
Expected: `2 pass`.

- [ ] **Step 5: Commit**

```bash
git add src/components/ProjectCard.tsx src/components/ProjectCard.test.tsx src/components/SkillTag.tsx
git commit -m "feat: add ProjectCard and SkillTag components"
```

---

### Task 12: Remaining pages (About, Skills, Projects, Contact)

**Files:**
- Create: `src/app/[locale]/about/page.tsx`
- Create: `src/app/[locale]/skills/page.tsx`
- Create: `src/app/[locale]/projects/page.tsx`
- Create: `src/app/[locale]/contact/page.tsx`

**Interfaces:**
- Consumes: `SkillTag`, `ProjectCard` (Task 11), `projects` (Task 2), `SocialLinks` (Task 8), message namespaces `about`/`skills`/`projects`/`contact` (Task 3).
- Produces: the four routes named in PRD §5 (`/[locale]/about`, `/skills`, `/projects`, `/contact`).

> No `bun test` here: these are async Server Components reading `next-intl`'s server-side translation context — they cannot be rendered by `@testing-library/react` outside Next's own render pipeline. Verified via `bun run build` (which type-checks and statically renders every locale/page combination) plus the manual checklist below.

- [ ] **Step 1: About page**

`src/app/[locale]/about/page.tsx`:
```tsx
import { useTranslations } from "next-intl";

export default function AboutPage() {
  const t = useTranslations("about");

  return (
    <div className="max-w-prose">
      <h1 className="mb-4 text-2xl font-semibold">{t("title")}</h1>
      <p style={{ color: "var(--color-text-muted)" }}>{t("bio")}</p>
    </div>
  );
}
```

- [ ] **Step 2: Skills page**

`src/app/[locale]/skills/page.tsx`:
```tsx
import { useTranslations } from "next-intl";
import { SkillTag } from "@/components/SkillTag";

const TOOL_KEYS = ["figma", "balsamiq", "googleStitch", "claudeDesign", "deepseek"] as const;
const SOFT_KEYS = [
  "creative",
  "innovative",
  "communication",
  "interpersonal",
  "criticalThinking",
  "analyticalThinking",
  "problemSolving",
  "curiosity",
  "initiative",
] as const;

export default function SkillsPage() {
  const t = useTranslations("skills");

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">{t("title")}</h1>
      <section className="mb-8">
        <h2 className="mb-3 text-sm uppercase tracking-wide" style={{ color: "var(--color-text-muted)" }}>
          {t("toolsHeading")}
        </h2>
        <div className="flex flex-wrap gap-2">
          {TOOL_KEYS.map((key) => (
            <SkillTag key={key} label={t(`tools.${key}`)} />
          ))}
        </div>
      </section>
      <section>
        <h2 className="mb-3 text-sm uppercase tracking-wide" style={{ color: "var(--color-text-muted)" }}>
          {t("softHeading")}
        </h2>
        <div className="flex flex-wrap gap-2">
          {SOFT_KEYS.map((key) => (
            <SkillTag key={key} label={t(`soft.${key}`)} />
          ))}
        </div>
      </section>
    </div>
  );
}
```

- [ ] **Step 3: Projects page**

`src/app/[locale]/projects/page.tsx`:
```tsx
import { useLocale, useTranslations } from "next-intl";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/content/projects";

export default function ProjectsPage() {
  const locale = useLocale() as "en" | "id";
  const t = useTranslations("projects");

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">{t("title")}</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard
            key={project.slug}
            project={project}
            description={project.description[locale]}
            viewLabel={t("viewLink")}
          />
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Contact page**

`src/app/[locale]/contact/page.tsx`:
```tsx
import { useTranslations } from "next-intl";
import { SocialLinks } from "@/components/layout/SocialLinks";

export default function ContactPage() {
  const t = useTranslations("contact");

  return (
    <div>
      <h1 className="mb-4 text-2xl font-semibold">{t("title")}</h1>
      <p className="mb-6" style={{ color: "var(--color-text-muted)" }}>{t("intro")}</p>
      <SocialLinks />
    </div>
  );
}
```

- [ ] **Step 5: Build and manually verify all pages**

Run: `bun run build`
Expected: succeeds; the route list includes `/[locale]`, `/[locale]/about`, `/[locale]/skills`, `/[locale]/projects`, `/[locale]/contact` for both `en` and `id`.

Manual (`bun run dev`):
- [ ] `/en/about` and `/id/about` show the bio text in the right language.
- [ ] `/en/skills` and `/id/skills` show two labeled groups (Tools, Soft skills) as tag lists — no progress bars.
- [ ] `/en/projects` shows the sample project card with a working "View" link; the card image slot doesn't break layout even though `public/assets/projects/sample-project/cover.jpg` doesn't exist yet.
- [ ] `/en/contact` shows the social links list, each clickable.

- [ ] **Step 6: Commit**

```bash
git add src/app/[locale]/about src/app/[locale]/skills src/app/[locale]/projects src/app/[locale]/contact
git commit -m "feat: add About, Skills, Projects and Contact pages"
```

---

### Task 13: Final verification

**Files:** none (verification only).

**Interfaces:** none — this task only confirms the previous twelve integrate cleanly.

- [ ] **Step 1: Run the full automated test suite**

Run: `bun test`
Expected: every test from Tasks 1–11 passes (no regressions).

- [ ] **Step 2: Run the production build**

Run: `bun run build`
Expected: succeeds, no type errors, no font/i18n warnings.

- [ ] **Step 3: Run lint**

Run: `bun run lint`
Expected: no errors.

- [ ] **Step 4: Full manual pass**

`bun run dev`, walk through `/en` and `/id` for all five pages, re-confirm the Task 10 checklist (breakpoints, focus rings, drawer, reduced motion) still holds now that real page content is in place.

- [ ] **Step 5: Commit if Steps 1–3 required any fixes**

```bash
git add -A
git commit -m "chore: fix issues found during final verification pass"
```

(If nothing needed fixing, skip this commit — there's nothing to record.)
