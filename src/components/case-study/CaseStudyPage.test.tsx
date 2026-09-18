import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "bun:test";
import { getCaseStudy } from "@/content/caseStudies";
import { LocaleProvider } from "@/i18n/LocaleProvider";
import { CaseStudyPage } from "./CaseStudyPage";

describe("CaseStudyPage", () => {
  test("renders the hybrid case study sections without decorative numbering", () => {
    const study = getCaseStudy("financial-management-system");
    render(
      <LocaleProvider>
        <CaseStudyPage study={study!} locale="id" />
      </LocaleProvider>,
    );

    expect(
      screen.getByRole("heading", { name: study!.title.id, level: 1 }),
    ).toBeInTheDocument();
    expect(screen.queryByText("PROJECT CASE STUDY")).not.toBeInTheDocument();
    expect(screen.queryByText("01")).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Snapshot" })).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Masalah/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Arsitektur/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Dampak/i })).toBeInTheDocument();
    expect(screen.getByText(/Repository:\s*Private/i)).toBeInTheDocument();
  });

  test("renders the production scheduling in a nutshell narrative", () => {
    const study = getCaseStudy("penjadwalan-produksi");
    render(
      <LocaleProvider>
        <CaseStudyPage study={study!} locale="en" />
      </LocaleProvider>,
    );

    expect(screen.getByRole("heading", { name: "In a nutshell" })).toBeInTheDocument();
    expect(screen.getByText(/PT Thursina Mediana Utama, a publishing and printing company/)).toBeInTheDocument();
    expect(screen.getByText(/expected completion date for each order/)).toBeInTheDocument();

    const sidebar = screen.getByRole("complementary", { name: "Project contents navigation" });
    expect(sidebar).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "In a nutshell" })).toHaveAttribute("href", "#case-study-in-a-nutshell");
    expect(screen.getByRole("link", { name: "Recruiter Summary" })).toHaveAttribute("href", "#recruiter-summary");
  });
});
