import { describe, expect, it } from "bun:test";
import { render, screen } from "@testing-library/react";

describe("test environment", () => {
  it("renders a React component into happy-dom", () => {
    render(<div>hello</div>);
    expect(screen.getByText("hello")).toBeInTheDocument();
  });
});
