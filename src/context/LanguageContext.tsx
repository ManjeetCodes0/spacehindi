"use client";

import { createContext, useContext, ReactNode } from "react";

type Lang = "en" | "hi";

interface LanguageContextType {
  lang: Lang;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  toggleLang: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Language is now fixed to English for UI.
  // Articles always display Hindi content directly (not via lang context).
  return (
    <LanguageContext.Provider value={{ lang: "en", toggleLang: () => {} }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
