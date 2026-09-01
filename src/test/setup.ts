import { GlobalRegistrator } from "@happy-dom/global-registrator";
import { afterEach, expect } from "bun:test";

GlobalRegistrator.register();

const matchers = await import("@testing-library/jest-dom/matchers");
expect.extend(matchers as Parameters<typeof expect.extend>[0]);

const { cleanup } = await import("@testing-library/react");
afterEach(cleanup);
