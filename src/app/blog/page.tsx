"use client";

import { useState } from "react";
import { Navbar, Footer } from "@/components/layout";
import { BlogList, WebStoriesSlider } from "@/components/blog";

export default function BlogPage() {
  const [lang, setLang] = useState<"en" | "hi">("en");

  return (
    <>
      <Navbar lang={lang} onToggleLang={() => setLang(lang === "en" ? "hi" : "en")} />
      <main className="min-h-screen bg-space-black pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <WebStoriesSlider lang={lang} />
          <BlogList lang={lang} />
        </div>
      </main>
      <Footer lang={lang} />
    </>
  );
}
