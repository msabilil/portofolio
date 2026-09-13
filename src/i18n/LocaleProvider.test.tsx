import { beforeEach, describe, expect, it } from "bun:test";
import { fireEvent, render, screen } from "@testing-library/react";
import { useTimeZone } from "next-intl";
import { LanguageToggle } from "@/components/layout/LanguageToggle";
import { LocaleProvider } from "./LocaleProvider";

describe("LocaleProvider", () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.history.replaceState({}, "", "/");
  });

  it("mengganti bahasa di halaman yang sama dan menyimpannya", () => {
    render(
      <LocaleProvider>
        <LanguageToggle />
      </LocaleProvider>,
    );

    const indonesian = screen.getByRole("button", { name: "ID" });
    fireEvent.click(indonesian);

    expect(indonesian).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("group")).toHaveAccessibleName("Bahasa");
    expect(window.location.pathname).toBe("/");
    expect(window.localStorage.getItem("portfolio-locale")).toBe("id");
    expect(document.documentElement.lang).toBe("id");
  });

  it("provides Asia/Jakarta as the time zone", () => {
    function TimeZone() {
      return <output>{useTimeZone()}</output>;
    }

    render(
      <LocaleProvider>
        <TimeZone />
      </LocaleProvider>,
    );

    expect(screen.getByText("Asia/Jakarta")).toBeInTheDocument();
  });
});
