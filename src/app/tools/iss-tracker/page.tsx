"use client";

import Link from "next/link";
import { Navbar, Footer } from "@/components/layout";
import ISSTracker from "@/components/tools/ISSTracker";
import { useLang } from "@/context/LanguageContext";

export default function ISSTrackerPage() {
  const { lang } = useLang();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-space-black pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-text-muted mb-8">
            <Link href="/tools" className="hover:text-text-secondary transition-colors">
              {lang === "en" ? "Tools" : "उपकरण"}
            </Link>
            <span>/</span>
            <span className="text-text-secondary">
              {lang === "en" ? "ISS Live Tracker" : "ISS लाइव ट्रैकर"}
            </span>
          </nav>
          <ISSTracker lang={lang} />
        </div>
      </main>
      <Footer />
    </>
  );
}
