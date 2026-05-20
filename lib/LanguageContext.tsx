"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { translations, Locale } from "./translations";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  refreshSettings: () => Promise<void>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ 
  children,
  initialLocale = "tr"
}: { 
  children: React.ReactNode;
  initialLocale?: Locale;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const [dbSettings, setDbSettings] = useState<Record<string, string>>({});

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/settings");
      if (res.ok) {
        const data = await res.json();
        setDbSettings(data);
      }
    } catch (err) {
      console.error("Language settings could not be fetched:", err);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const langParam = params.get("lang") as Locale;
    
    if (langParam && (langParam === "tr" || langParam === "en")) {
      setLocaleState(langParam);
      localStorage.setItem("locale", langParam);
      document.cookie = `locale=${langParam};path=/;max-age=${60 * 60 * 24 * 365}`;
    } else {
      const saved = localStorage.getItem("locale") as Locale;
      if (saved && (saved === "tr" || saved === "en")) {
        setLocaleState(saved);
      }
    }
    fetchSettings();
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("locale", newLocale);
    document.cookie = `locale=${newLocale};path=/;max-age=${60 * 60 * 24 * 365}`;
  };

  const t = (key: string) => {
    const overrideKey = `${locale}.${key}`;
    if (dbSettings && dbSettings[overrideKey]) {
      return dbSettings[overrideKey];
    }

    const keys = key.split(".");
    let value: any = translations[locale];
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t, refreshSettings: fetchSettings }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
