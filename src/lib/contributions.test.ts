import { describe, expect, it } from "bun:test";
import { parseContributions } from "./contributions";
describe("parseContributions", () => {
  it("sorts actual contribution dates without synthesizing activity", () => {
    expect(
      parseContributions({
        contributions: [
          { date: "2026-09-02", count: 2, level: 1 },
          { date: "2026-09-01", count: 0, level: 0 },
        ],
      }),
    ).toEqual([
      { date: "2026-09-01", count: 0, level: 0 },
      { date: "2026-09-02", count: 2, level: 1 },
    ]);
  });
  it("rejects empty, malformed, negative and duplicate data", () => {
    for (const value of [
      null,
      {},
      { contributions: [] },
      { contributions: [{ date: "bad", count: 0, level: 0 }] },
      { contributions: [{ date: "2026-09-01", count: -1, level: 1 }] },
      {
        contributions: Array(2).fill({
          date: "2026-09-01",
          count: 0,
          level: 0,
        }),
      },
    ])
      expect(() => parseContributions(value)).toThrow();
  });
});
