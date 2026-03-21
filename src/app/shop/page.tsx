"use client";

import { Navbar, Footer } from "@/components/layout";
import { Shop } from "@/components/shop";
import { Newsletter } from "@/components/events";
import { useLang } from "@/context/LanguageContext";

export default function ShopPage() {
  const { lang } = useLang();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-space-black pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Shop lang={lang} />
          <Newsletter lang={lang} />
        </div>
      </main>
      <Footer />
    </>
  );
}
