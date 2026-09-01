import { describe, expect, it } from "bun:test";
import { NextIntlClientProvider } from "next-intl";
import { render, screen } from "@testing-library/react";
import { SocialLinks } from "./SocialLinks";

const messages = {
  social: {
    emailLabel: "Email",
    githubLabel: "GitHub",
    linkedinLabel: "LinkedIn",
    instagramLabel: "Instagram",
  },
};

describe("SocialLinks", () => {
  it("renders one accessible link per profile social entry", () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <SocialLinks />
      </NextIntlClientProvider>,
    );

    const emailLink = screen.getByRole("link", { name: "Email" });
    expect(emailLink).toHaveAttribute("href", "mailto:muhamadfajri943@gmail.com");

    const githubLink = screen.getByRole("link", { name: "GitHub" });
    expect(githubLink).toHaveAttribute("target", "_blank");
    expect(githubLink).toHaveAttribute("rel", "noopener noreferrer");
  });
});
