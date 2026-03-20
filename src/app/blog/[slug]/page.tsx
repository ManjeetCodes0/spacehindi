"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Navbar, Footer } from "@/components/layout";
import { BlogPost } from "@/components/blog";
import { blogPosts } from "@/data/blog";

export default function BlogArticlePage() {
  const [lang, setLang] = useState<"en" | "hi">("en");
  const params = useParams();
  const slug = params.slug as string;

  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <>
        <Navbar lang={lang} onToggleLang={() => setLang(lang === "en" ? "hi" : "en")} />
        <main className="min-h-screen bg-space-black pt-24 flex items-center justify-center">
          <div className="text-center">
            <p className="text-6xl font-bold text-text-muted mb-4">404</p>
            <p className="text-text-secondary">
              {lang === "en" ? "Article not found." : "लेख नहीं मिला।"}
            </p>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar lang={lang} onToggleLang={() => setLang(lang === "en" ? "hi" : "en")} />
      <main className="min-h-screen bg-space-black pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BlogPost post={post} lang={lang} />
        </div>
      </main>
      <Footer lang={lang} />
    </>
  );
}
