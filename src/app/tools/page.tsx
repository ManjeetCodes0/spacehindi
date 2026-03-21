"use client";

import { Navbar, Footer } from "@/components/layout";
import ToolsHub from "@/components/tools/ToolsHub";
import { useLang } from "@/context/LanguageContext";

export default function ToolsPage() {
  const { lang } = useLang();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-space-black pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ToolsHub lang={lang} />
        </div>
      </main>
      <Footer />
    </>
  );
}
