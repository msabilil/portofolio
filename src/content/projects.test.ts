import { describe, expect, it } from "bun:test";
import { projects } from "./projects";

const VALID_CATEGORIES = ["ui-ux", "frontend", "backend", "qa"];

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

  it("every project has at least one valid category", () => {
    for (const project of projects) {
      expect(project.categories.length).toBeGreaterThan(0);
      for (const category of project.categories) {
        expect(VALID_CATEGORIES).toContain(category);
      }
    }
  });
});
