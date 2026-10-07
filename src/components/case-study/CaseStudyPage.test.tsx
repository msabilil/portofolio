import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, test } from "bun:test";
import { getCaseStudy } from "@/content/caseStudies";
import { LocaleProvider } from "@/i18n/LocaleProvider";
import { CaseStudyPage } from "./CaseStudyPage";

describe("CaseStudyPage", () => {
  test("renders the financial case study in the production case study structure", () => {
    const study = getCaseStudy("financial-management-system");
    render(
      <LocaleProvider>
        <CaseStudyPage study={study!} locale="id" />
      </LocaleProvider>,
    );

    expect(
      screen.getByRole("heading", { name: study!.title.id, level: 1 }),
    ).toBeInTheDocument();
    const nutshell = screen.getByRole("region", { name: "In a nutshell" });
    const paragraphs = nutshell.querySelectorAll("p");
    expect(paragraphs).toHaveLength(2);
    expect(paragraphs[0]).toHaveTextContent("PT Indera Sae Pratama");
    expect(paragraphs[1]).toHaveTextContent("Saya membangun aplikasi web Next.js dan Firebase");
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
    expect(screen.getByRole("heading", { name: "Analisis alur kerja" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Perancangan sistem dan data" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Perancangan UI/UX" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Frontend" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Backend" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Pengembangan berikutnya" })).toBeInTheDocument();
    expect(screen.getByText("Repository · Private")).toBeInTheDocument();
  });

  test.each([
    "financial-management-system",
    "edutive-learning-management-system",
    "tiveflow-operations-platform",
    "entertainment-operations-platform",
  ])("uses the shared frontend/backend structure for %s", (slug) => {
    const study = getCaseStudy(slug)!;
    const { unmount } = render(
      <LocaleProvider>
        <CaseStudyPage study={study} locale="en" />
      </LocaleProvider>,
    );

    const headings = screen.getAllByRole("heading", { level: 2 }).map((heading) => heading.textContent);
    expect(headings).toEqual([
      "In a nutshell",
      "The problem",
      "Approach and architecture",
      "Development",
      "Future development",
    ]);
    const approach = screen.getByRole("region", { name: "Approach and architecture" });
    expect(within(approach).getByRole("heading", { name: "Workflow analysis" })).toBeInTheDocument();
    expect(within(approach).getByRole("heading", { name: "System and data design" })).toBeInTheDocument();
    expect(within(approach).getByRole("heading", { name: "UI/UX design" })).toBeInTheDocument();
    const development = screen.getByRole("region", { name: "Development" });
    expect(within(development).getByRole("heading", { name: "Frontend" })).toBeInTheDocument();
    expect(within(development).getByRole("heading", { name: "Backend" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Frontend" })).toHaveAttribute("href", "#case-study-frontend");
    expect(screen.getByRole("link", { name: "Backend" })).toHaveAttribute("href", "#case-study-backend");
    if (slug === "tiveflow-operations-platform") {
      expect(within(development).getByText(/does not claim I built Tiveflow's backend/)).toBeInTheDocument();
    }
    unmount();
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
    expect(screen.getByText("Live demo")).toBeInTheDocument();
    expect(screen.queryByText("Live demo: Unavailable")).not.toBeInTheDocument();
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
    const development = screen.getByRole("region", { name: "Development" });
    expect(within(development).getByText(/pages for four roles/)).toBeInTheDocument();
    expect(within(development).queryByRole("heading", { name: "Frontend" })).not.toBeInTheDocument();
    expect(within(development).queryByRole("heading", { name: "Backend" })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Frontend" })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Backend" })).not.toBeInTheDocument();
    const facts = screen.getByRole("region", { name: "Project facts" });
    expect(facts.querySelector("dl")).not.toBeNull();
    expect(within(facts).queryByRole("heading")).not.toBeInTheDocument();
    expect(within(facts).getByText("Full-stack system developer")).toBeInTheDocument();
    const resultLink = screen.getByRole("link", {
      name: "System design",
    });
    fireEvent.click(resultLink);
    expect(resultLink).toHaveAttribute("aria-current", "location");
    expect(
      screen.getByRole("link", { name: "In a nutshell" }),
    ).not.toHaveAttribute("aria-current");
  });

  test("shows a concise development paragraph in Indonesian", () => {
    const study = getCaseStudy("penjadwalan-produksi");
    render(
      <LocaleProvider>
        <CaseStudyPage study={study!} locale="id" />
      </LocaleProvider>,
    );

    const development = screen.getByRole("region", { name: "Pengembangan" });
    expect(within(development).getByText(/halaman untuk empat peran/)).toBeInTheDocument();
    expect(within(development).queryByText(/logika PHP dan MySQL/)).not.toBeInTheDocument();
    expect(screen.getByText("Pengembang sistem full-stack")).toBeInTheDocument();
  });
});
