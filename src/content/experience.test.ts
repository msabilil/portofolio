import { describe, expect, it } from "bun:test";
import { experience } from "./experience";

describe("experience data", () => {
  it("has unique, non-empty ids", () => {
    const ids = experience.map((e) => e.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const id of ids) expect(id.length).toBeGreaterThan(0);
  });

  it("every entry has an en and id role and description", () => {
    for (const entry of experience) {
      expect(entry.role.en.length).toBeGreaterThan(0);
      expect(entry.role.id.length).toBeGreaterThan(0);
      expect(entry.description.en.length).toBeGreaterThan(0);
      expect(entry.description.id.length).toBeGreaterThan(0);
    }
  });
});
