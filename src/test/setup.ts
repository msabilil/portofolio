import { GlobalRegistrator } from "@happy-dom/global-registrator";
import { afterEach, expect } from "bun:test";

// next/image resolves relative asset URLs against the browser location.
GlobalRegistrator.register({ url: "http://localhost:3000" });

const matchers = await import("@testing-library/jest-dom/matchers");
expect.extend(matchers as Parameters<typeof expect.extend>[0]);

const { cleanup } = await import("@testing-library/react");
afterEach(cleanup);
