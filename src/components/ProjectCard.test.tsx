import { describe, expect, it, mock } from "bun:test";
import type { Project } from "@/content/projects";

// next/image needs Next's runtime image loader config, which isn't present
// under a bare bun test render — swap in a plain <img> for this test.
mock.module("next/image", () => ({
  // eslint-disable-next-line @next/next/no-img-element -- test-only stand-in
  default: (props: { src: string; alt: string }) => <img src={props.src} alt={props.alt} />,
}));

const { render, screen } = await import("@testing-library/react");
const { ProjectCard } = await import("./ProjectCard");

const project: Project = {
  slug: "demo",
  title: "Demo Project",
  description: { en: "A demo project.", id: "Proyek demo." },
  tags: ["UI", "Figma"],
  cover: "/assets/projects/demo/cover.jpg",
  link: "https://example.com",
};

describe("ProjectCard", () => {
  it("renders title, description, tags and a view link", () => {
    render(<ProjectCard project={project} description={project.description.en} viewLabel="View" />);

    expect(screen.getByText("Demo Project")).toBeInTheDocument();
    expect(screen.getByText("A demo project.")).toBeInTheDocument();
    expect(screen.getByText("UI")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "View" })).toHaveAttribute("href", "https://example.com");
  });

  it("omits the view link when the project has no link", () => {
    render(<ProjectCard project={{ ...project, link: undefined }} description={project.description.en} viewLabel="View" />);
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("renders a letter placeholder when the project has no cover image", () => {
    render(<ProjectCard project={{ ...project, cover: undefined }} description={project.description.en} viewLabel="View" />);
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    expect(screen.getByText("D")).toBeInTheDocument();
  });
});
