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
