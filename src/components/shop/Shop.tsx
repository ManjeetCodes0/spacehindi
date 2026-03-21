"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { products, sectionHeadings, type ShopCategory } from "@/data/shop";
import ProductCard from "./ProductCard";
import CategoryTabs, { type FilterCategory } from "./CategoryTabs";

interface ShopProps {
  lang: "en" | "hi";
}

const text = {
  en: {
    badge: "Curated Space Gear",
    title: "Space Shop",
    subtitle: "Handpicked space collectibles, accessories, and books for science enthusiasts. Every purchase supports ScienceHindi 360.",
  },
  hi: {
    badge: "क्यूरेटेड स्पेस गियर",
    title: "स्पेस शॉप",
    subtitle: "विज्ञान प्रेमियों के लिए चुनिंदा स्पेस कलेक्टिबल्स, एक्सेसरीज़ और किताबें। हर खरीदारी ScienceHindi 360 को सपोर्ट करती है।",
  },
};

const categoryOrder: ShopCategory[] = ["Astronaut Statue", "Keychains", "Books"];

export default function Shop({ lang }: ShopProps) {
  const t = text[lang];
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("all");

  const visibleCategories =
    activeFilter === "all"
      ? categoryOrder
      : categoryOrder.filter((c) => c === activeFilter);

  const grouped = visibleCategories.map((cat) => ({
    category: cat,
    heading: sectionHeadings[cat],
    items: products.filter((p) => p.category === cat),
  }));

  return (
    <section className="py-12 sm:py-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5"
          style={{
            background: "rgba(139,92,246,0.1)",
            border: "1px solid rgba(168,130,255,0.3)",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#a78bfa" }} />
          <span className="text-xs font-medium tracking-wide" style={{ color: "#c4b5fd" }}>
            {t.badge}
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
          style={{ fontFamily: "var(--font-space-grotesk)", color: "#f5f5f7" }}
        >
          {t.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-base sm:text-lg"
          style={{ color: "#d4d4d8" }}
        >
          {t.subtitle}
        </motion.p>
      </div>

      {/* Category Tabs */}
      <CategoryTabs active={activeFilter} onChange={setActiveFilter} lang={lang} />

      {/* Category Sections */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeFilter}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3 }}
        >
          {grouped.map((section, sectionIdx) => (
            <div key={section.category} className={sectionIdx > 0 ? "mt-16 sm:mt-20" : ""}>
              {/* Section heading */}
              <div className="mb-8">
                <h3
                  className="text-2xl sm:text-3xl font-bold mb-2"
                  style={{
                    fontFamily: "var(--font-space-grotesk)",
                    color: "#f5f5f7",
                  }}
                >
                  {section.heading[lang]}
                </h3>
                <p
                  className="text-sm sm:text-base"
                  style={{
                    color: "#a1a1aa",
                    fontFamily: lang === "hi"
                      ? "var(--font-noto-sans-devanagari), system-ui"
                      : "var(--font-inter), system-ui",
                  }}
                >
                  {section.heading.subtitle[lang]}
                </p>
                {/* Accent line */}
                <div
                  className="mt-4 h-px w-16"
                  style={{
                    background: "linear-gradient(90deg, #8b5cf6, rgba(139,92,246,0))",
                  }}
                />
              </div>

              {/* Product grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {section.items.map((product, i) => (
                  <ProductCard key={product.id} product={product} lang={lang} index={i} />
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
