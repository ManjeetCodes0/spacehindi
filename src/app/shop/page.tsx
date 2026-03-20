"use client";

import { useState } from "react";
import { Navbar, Footer } from "@/components/layout";
import { Shop } from "@/components/shop";
import { Newsletter } from "@/components/events";

export default function ShopPage() {
  const [lang, setLang] = useState<"en" | "hi">("en");

  return (
    <>
      <Navbar lang={lang} onToggleLang={() => setLang(lang === "en" ? "hi" : "en")} />
      <main className="min-h-screen bg-space-black pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Shop lang={lang} />
          <Newsletter lang={lang} />
        </div>
      </main>
      <Footer lang={lang} />
    </>
  );
}
