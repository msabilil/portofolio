"use client";

import { NextIntlClientProvider } from "next-intl";
import { createContext, useCallback, useContext, useEffect, useMemo, useSyncExternalStore } from "react";
import en from "../../messages/en.json";
import id from "../../messages/id.json";

export const locales = ["en", "id"] as const;
export type Locale = (typeof locales)[number];

const STORAGE_KEY = "portfolio-locale";
const LOCALE_CHANGE_EVENT = "portfolio-locale-change";
const messages = { en, id } as const;

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

function isLocale(value: string | null): value is Locale {
  return value !== null && locales.includes(value as Locale);
}

function getStoredLocale(): Locale {
  const storedLocale = window.localStorage.getItem(STORAGE_KEY);
  return isLocale(storedLocale) ? storedLocale : "en";
}

function subscribeToLocale(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(LOCALE_CHANGE_EVENT, onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(LOCALE_CHANGE_EVENT, onStoreChange);
  };
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const locale = useSyncExternalStore<Locale>(
    subscribeToLocale,
    getStoredLocale,
    () => "en",
  );

  const setLocale = useCallback((nextLocale: Locale) => {
    window.localStorage.setItem(STORAGE_KEY, nextLocale);
    document.documentElement.lang = nextLocale;
    window.dispatchEvent(new Event(LOCALE_CHANGE_EVENT));
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo(() => ({ locale, setLocale }), [locale, setLocale]);

  return (
    <LocaleContext.Provider value={value}>
      <NextIntlClientProvider
        locale={locale}
        messages={messages[locale]}
        timeZone="Asia/Jakarta"
      >
        {children}
      </NextIntlClientProvider>
    </LocaleContext.Provider>
  );
}

export function useAppLocale() {
  const value = useContext(LocaleContext);
  if (!value) throw new Error("useAppLocale must be used within LocaleProvider");
  return value;
}
