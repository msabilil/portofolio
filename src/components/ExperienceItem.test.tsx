import { describe, expect, it } from "bun:test";
import { render, screen } from "@testing-library/react";
import { ExperienceItem } from "./ExperienceItem";
import type { Experience } from "@/content/experience";

const entry: Experience = {
  id: "demo",
  role: { en: "UI/UX Designer", id: "UI/UX Designer" },
  place: "Demo Studio",
  period: "2024 — Present",
  logo: "/assets/logos/demo.png",
  description: { en: ["Demo description."], id: ["Deskripsi demo."] },
};

describe("ExperienceItem", () => {
  it("renders role, place, period and description", () => {
    render(<ExperienceItem experience={entry} role={entry.role.en} description={entry.description.en} />);

    expect(screen.getByText(/UI\/UX Designer/)).toBeInTheDocument();
    expect(screen.getByText(/Demo Studio/)).toBeInTheDocument();
    expect(screen.getByText("2024 — Present")).toBeInTheDocument();
    expect(screen.getByText("Demo description.")).toBeInTheDocument();
  });
});
