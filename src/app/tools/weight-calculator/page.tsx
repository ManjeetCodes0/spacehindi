"use client";

import Link from "next/link";
import { Navbar, Footer } from "@/components/layout";
import WeightCalculator from "@/components/tools/WeightCalculator";
import { useLang } from "@/context/LanguageContext";

export default function WeightCalculatorPage() {
  const { lang } = useLang();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-space-black pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-text-muted mb-8">
            <Link href="/tools" className="hover:text-text-secondary transition-colors">
              {lang === "en" ? "Tools" : "उपकरण"}
            </Link>
            <span>/</span>
            <span className="text-text-secondary">
              {lang === "en" ? "Weight on Planets" : "ग्रहों पर वज़न"}
            </span>
          </nav>

          <WeightCalculator lang={lang} />
        </div>
      </main>
      <Footer />
    </>
  );
}
