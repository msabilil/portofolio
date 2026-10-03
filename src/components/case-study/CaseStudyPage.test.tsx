import { fireEvent, render, screen, within } from "@testing-library/react";
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
    expect(
      screen.queryByRole("heading", { name: "Snapshot" }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Masalah/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Arsitektur/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Dampak/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Repository:\s*Private/i)).toBeInTheDocument();
  });

  test("renders the production scheduling in a nutshell narrative", () => {
    const study = getCaseStudy("penjadwalan-produksi");
    render(
      <LocaleProvider>
        <CaseStudyPage study={study!} locale="en" />
      </LocaleProvider>,
    );

    expect(
      screen.getByRole("heading", { name: "In a nutshell" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /PT Thursina Mediana Utama, a publishing and printing company/,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/expected completion date for each order/),
    ).toBeInTheDocument();

    const sidebar = screen.getByRole("complementary", {
      name: "Project contents navigation",
    });
    expect(sidebar).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "In a nutshell" })).toHaveAttribute(
      "href",
      "#case-study-in-a-nutshell",
    );
    expect(screen.queryByRole("heading", { name: "Thesis documentation" })).not.toBeInTheDocument();
    expect(screen.queryByText(/AI-generated dummy example/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Dummy data, separate from/)).not.toBeInTheDocument();
    const approach = screen.getByRole("region", { name: "Approach and architecture" });
    expect(within(approach).getByRole("heading", { name: "Business process analysis with BPMN" })).toBeInTheDocument();
    expect(within(approach).queryByRole("heading", { name: "Estimation and SPT calculation simulation" })).not.toBeInTheDocument();
    expect(within(approach).getByRole("heading", { name: "System and database design" })).toBeInTheDocument();
    expect(within(approach).queryByRole("heading", { name: "Testing and user feedback" })).not.toBeInTheDocument();
    expect(within(approach).queryByRole("button", { name: /^Enlarge: UAT interview/ })).not.toBeInTheDocument();
    expect(within(approach).getAllByRole("button", { name: /^Enlarge: DFD Level/ })).toHaveLength(2);
    const stageHeadings = within(approach).getAllByRole("heading", { level: 3 }).map((heading) => heading.textContent);
    expect(stageHeadings.indexOf("Business process analysis with BPMN")).toBeLessThan(stageHeadings.indexOf("System and database design"));
    const facts = screen.getByRole("region", { name: "Project facts" });
    expect(facts.querySelector("dl")).not.toBeNull();
    expect(within(facts).queryByRole("heading")).not.toBeInTheDocument();
    const resultLink = screen.getByRole("link", {
      name: "System design",
    });
    fireEvent.click(resultLink);
    expect(resultLink).toHaveAttribute("aria-current", "location");
    expect(
      screen.getByRole("link", { name: "In a nutshell" }),
    ).not.toHaveAttribute("aria-current");
  });
});
