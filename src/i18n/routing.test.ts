import { describe, expect, it } from "bun:test";
import { routing } from "./routing";

describe("i18n routing config", () => {
  it("supports en and id with en as the default locale", () => {
    expect(routing.locales).toEqual(["en", "id"]);
    expect(routing.defaultLocale).toBe("en");
  });
});
