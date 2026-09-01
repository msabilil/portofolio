import { describe, expect, it, mock } from "bun:test";

mock.module("next/navigation", () => ({
  usePathname: () => "/about",
  useRouter: () => ({ push: () => {}, replace: () => {} }),
  redirect: () => {},
  permanentRedirect: () => {},
}));

const { render, screen } = await import("@testing-library/react");
const { NextIntlClientProvider } = await import("next-intl");
const { NavLinks } = await import("./NavLinks");

const messages = {
  nav: {
    mainLabel: "Main navigation",
    home: "Home",
    about: "About",
    skills: "Skills",
    projects: "Projects",
    contact: "Contact",
  },
};

describe("NavLinks", () => {
  it("marks the current route with aria-current and leaves the rest unmarked", () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <NavLinks />
      </NextIntlClientProvider>,
    );

    expect(screen.getByRole("link", { name: "About" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "Home" })).not.toHaveAttribute("aria-current");
  });
});
