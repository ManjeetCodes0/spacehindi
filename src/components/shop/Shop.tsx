"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { products, shopCategories, type ShopCategory } from "@/data/shop";
import ProductCard from "./ProductCard";

interface ShopProps {
  lang: "en" | "hi";
}

const text = {
  en: {
    badge: "Curated Science Gear",
    title: "Space Shop",
    subtitle: "Handpicked telescopes, kits, and books reviewed by our science team. Every purchase supports ScienceHindi 360.",
    all: "All",
    results: "products",
    affiliate: "Affiliate Disclosure",
    affiliateText: "We earn a small commission from qualifying purchases at no extra cost to you.",
  },
  hi: {
    badge: "क्यूरेटेड साइंस गियर",
    title: "स्पेस शॉप",
    subtitle: "हमारी विज्ञान टीम द्वारा समीक्षित टेलीस्कोप, किट और पुस्तकें। हर खरीदारी ScienceHindi 360 को सपोर्ट करती है।",
    all: "सभी",
    results: "उत्पाद",
    affiliate: "एफिलिएट प्रकटीकरण",
    affiliateText: "हम आपको बिना किसी अतिरिक्त लागत के योग्य खरीदारी से एक छोटा कमीशन कमाते हैं।",
  },
};

export default function Shop({ lang }: ShopProps) {
  const [activeCategory, setActiveCategory] = useState<ShopCategory | "all">("all");
  const t = text[lang];

  const filtered =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <section className="py-12 sm:py-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
            bg-neon-green/10 border border-neon-green/20 mb-5"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-neon-green" />
          <span className="text-xs font-medium text-neon-green tracking-wide">
            {t.badge}
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-4"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          {t.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-text-secondary text-base sm:text-lg"
        >
          {t.subtitle}
        </motion.p>
      </div>

      {/* Category filters */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="flex flex-wrap items-center justify-center gap-2 mb-8"
      >
        <button
          onClick={() => setActiveCategory("all")}
          className={`
            px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer
            ${
              activeCategory === "all"
                ? "bg-neon-green/15 text-neon-green border border-neon-green/30 shadow-[0_0_15px_rgba(16,185,129,0.15)]"
                : "bg-space-elevated border border-space-border text-text-muted hover:text-text-secondary hover:border-space-border/80"
            }
          `}
        >
          {t.all}
        </button>
        {shopCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`
              px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer
              flex items-center gap-2
              ${
                activeCategory === cat.id
                  ? "bg-neon-green/15 text-neon-green border border-neon-green/30 shadow-[0_0_15px_rgba(16,185,129,0.15)]"
                  : "bg-space-elevated border border-space-border text-text-muted hover:text-text-secondary hover:border-space-border/80"
              }
            `}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d={cat.icon} />
            </svg>
            {cat.label[lang]}
          </button>
        ))}
      </motion.div>

      {/* Result count */}
      <p className="text-xs text-text-muted mb-6 text-center">
        {filtered.length} {t.results}
      </p>

      {/* Product grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((product, i) => (
          <ProductCard key={product.id} product={product} lang={lang} index={i} />
        ))}
      </div>

      {/* Affiliate disclosure */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="mt-10 text-center"
      >
        <p className="text-[11px] text-text-muted max-w-lg mx-auto">
          <span className="font-semibold">{t.affiliate}:</span> {t.affiliateText}
        </p>
      </motion.div>
    </section>
  );
}
