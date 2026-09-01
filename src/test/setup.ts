import { GlobalRegistrator } from "@happy-dom/global-registrator";
import { expect } from "bun:test";

GlobalRegistrator.register();

const matchers = await import("@testing-library/jest-dom/matchers");
expect.extend(matchers);
