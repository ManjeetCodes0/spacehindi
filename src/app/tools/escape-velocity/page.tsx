"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar, Footer } from "@/components/layout";
import EscapeVelocityCalculator from "@/components/tools/EscapeVelocityCalculator";

export default function EscapeVelocityPage() {
  const [lang, setLang] = useState<"en" | "hi">("en");

  return (
    <>
      <Navbar lang={lang} onToggleLang={() => setLang(lang === "en" ? "hi" : "en")} />
      <main className="min-h-screen bg-space-black pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-text-muted mb-8">
            <Link href="/tools" className="hover:text-text-secondary transition-colors">
              {lang === "en" ? "Tools" : "उपकरण"}
            </Link>
            <span>/</span>
            <span className="text-text-secondary">
              {lang === "en" ? "Escape Velocity" : "पलायन वेग"}
            </span>
          </nav>
          <EscapeVelocityCalculator lang={lang} />
        </div>
      </main>
      <Footer lang={lang} />
    </>
  );
}
