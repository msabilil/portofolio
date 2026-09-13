import { getRequestConfig } from "next-intl/server";
import en from "../../messages/en.json";

// Client-side language switching supplies the active locale after hydration.
// This default only fulfils next-intl's server configuration requirement.
export default getRequestConfig(async () => ({
  locale: "en",
  messages: en,
  timeZone: "Asia/Jakarta",
}));
