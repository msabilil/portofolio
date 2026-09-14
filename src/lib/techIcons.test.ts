import { describe, expect, it } from "bun:test";
import { readFileSync } from "node:fs";
import sources from "../../public/assets/skills/sources.json";
import { experience } from "@/content/experience";
import { projects } from "@/content/projects";
import { getIconSlug, iconUrl } from "./techIcons";

describe("local technology artwork", () => {
  it("ships a real 128px PNG for every recorded source", () => {
    for (const [slug, source] of Object.entries(sources)) {
      expect(source.startsWith("https://raw.githubusercontent.com/")).toBe(true);
      const file = readFileSync(new URL(`../../public${iconUrl(slug)}`, import.meta.url));
      expect(file.subarray(0, 8).toString("hex")).toBe("89504e470d0a1a0a");
      expect(file.readUInt32BE(16)).toBe(128);
      expect(file.readUInt32BE(20)).toBe(128);
    }
  });

  it("resolves supported project and experience tags to shipped artwork", () => {
    const labels = [
      ...projects.flatMap((project) => project.tags),
      ...experience.flatMap((entry) => entry.skills ?? []),
      "Playwright", "ElysiaJS", "JavaScript", "React",
    ];
    for (const label of labels) {
      const slug = getIconSlug(label);
      if (slug) expect(Object.hasOwn(sources, slug)).toBe(true);
    }
    expect(getIconSlug("Playwright")).toBe("playwright");
    expect(getIconSlug("ElysiaJS")).toBe("elysia");
    expect(getIconSlug("Unknown tool")).toBeUndefined();
  });
});
