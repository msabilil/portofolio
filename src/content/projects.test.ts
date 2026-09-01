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
