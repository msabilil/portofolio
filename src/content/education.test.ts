import { describe, expect, it } from "bun:test";
import { education } from "./education";

describe("education data", () => {
  it("has unique, non-empty ids", () => {
    const ids = education.map((e) => e.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const id of ids) expect(id.length).toBeGreaterThan(0);
  });

  it("every entry has an en and id degree and coursework", () => {
    for (const entry of education) {
      expect(entry.degree.en.length).toBeGreaterThan(0);
      expect(entry.degree.id.length).toBeGreaterThan(0);
      expect(entry.coursework.en.length).toBeGreaterThan(0);
      expect(entry.coursework.id.length).toBeGreaterThan(0);
    }
  });
});
