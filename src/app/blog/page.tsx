"use client";

import { Navbar, Footer } from "@/components/layout";
import { BlogList } from "@/components/blog";

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-bg-primary pt-20 transition-colors duration-300">
        <BlogList />
      </main>
      <Footer />
    </>
  );
}
