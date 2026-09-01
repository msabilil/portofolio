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
