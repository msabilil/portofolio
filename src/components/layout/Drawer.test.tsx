import { describe, expect, it } from "bun:test";
import { fireEvent, render, screen } from "@testing-library/react";
import { Drawer } from "./Drawer";

describe("Drawer", () => {
  it("renders nothing when closed", () => {
    render(
      <Drawer isOpen={false} onClose={() => {}} closeLabel="Close menu">
        <p>content</p>
      </Drawer>,
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("moves focus to the close button when opened", () => {
    render(
      <Drawer isOpen onClose={() => {}} closeLabel="Close menu">
        <p>content</p>
      </Drawer>,
    );
    const closeButtons = screen.getAllByRole("button", { name: "Close menu" });
    expect(document.activeElement).toBe(closeButtons[closeButtons.length - 1]);
  });

  it("calls onClose on Escape", () => {
    let closed = false;
    render(
      <Drawer isOpen onClose={() => (closed = true)} closeLabel="Close menu">
        <p>content</p>
      </Drawer>,
    );
    fireEvent.keyDown(document, { key: "Escape" });
    expect(closed).toBe(true);
  });

  it("calls onClose when the overlay is clicked", () => {
    let closed = false;
    render(
      <Drawer isOpen onClose={() => (closed = true)} closeLabel="Close menu">
        <p>content</p>
      </Drawer>,
    );
    fireEvent.click(screen.getByTestId("drawer-overlay"));
    expect(closed).toBe(true);
  });
});
