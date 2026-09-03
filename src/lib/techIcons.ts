// Simple Icons slugs (https://simpleicons.org) keyed by exact tag/skill label.
// Unmapped labels just render without an icon — no build-time dependency needed.
const TECH_ICON_SLUGS: Record<string, string> = {
  "Next.js": "nextdotjs",
  React: "react",
  TypeScript: "typescript",
  "Tailwind CSS": "tailwindcss",
  PostgreSQL: "postgresql",
  Redis: "redis",
  Docker: "docker",
  "GitHub Actions": "githubactions",
  Jest: "jest",
  Prisma: "prisma",
  Express: "express",
  Figma: "figma",
  Kotlin: "kotlin",
  PHP: "php",
  Android: "android",
  MySQL: "mysql",
  JavaScript: "javascript",
  HTML5: "html5",
  CSS3: "css",
  Git: "git",
  "Vue.js": "vuedotjs",
  "NoSQL (Firestore)": "firebase",
  Swagger: "swagger",
  Postman: "postman",
};

export function getIconSlug(tag: string): string | undefined {
  return TECH_ICON_SLUGS[tag];
}

export function iconUrl(slug: string): string {
  return `https://cdn.simpleicons.org/${slug}`;
}
