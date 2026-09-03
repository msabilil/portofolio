import { describe, expect, it } from "bun:test";
import { certifications } from "./certifications";

describe("certifications data", () => {
  it("has unique, non-empty ids", () => {
    const ids = certifications.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const id of ids) expect(id.length).toBeGreaterThan(0);
  });

  it("every entry has an en and id title and coursework", () => {
    for (const entry of certifications) {
      expect(entry.title.en.length).toBeGreaterThan(0);
      expect(entry.title.id.length).toBeGreaterThan(0);
      expect(entry.coursework.en.length).toBeGreaterThan(0);
      expect(entry.coursework.id.length).toBeGreaterThan(0);
    }
  });
});
