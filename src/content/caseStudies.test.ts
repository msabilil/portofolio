import { describe, expect, test } from "bun:test";
import { caseStudies, getCaseStudy } from "./caseStudies";

describe("case study registry", () => {
  test("contains safe financial management case study", () => {
    const study = getCaseStudy("financial-management-system");
    expect(study?.title.id).toBe("Financial Management System");
    expect(study?.privacy).toBe("public-safe");
    expect(study?.metrics.every((metric) => metric.status !== "measured")).toBe(true);
  });

  test("all case studies have both locales and recruiter impact", () => {
    for (const study of caseStudies) {
      expect(study.title.id.length).toBeGreaterThan(0);
      expect(study.title.en.length).toBeGreaterThan(0);
      expect(study.recruiterSummary.impact.id.length).toBeGreaterThan(0);
    }
  });
});
