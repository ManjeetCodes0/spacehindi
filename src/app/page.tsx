"use client";

import { useState } from "react";
import { Navbar, Hero, Footer } from "@/components/layout";

export default function Home() {
  const [lang, setLang] = useState<"en" | "hi">("en");

  return (
    <>
      <Navbar lang={lang} onToggleLang={() => setLang(lang === "en" ? "hi" : "en")} />
      <main>
        <Hero lang={lang} />
      </main>
      <Footer lang={lang} />
    </>
  );
}
