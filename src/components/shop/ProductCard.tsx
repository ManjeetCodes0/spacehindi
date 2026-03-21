"use client";

import { motion } from "framer-motion";
import type { Product } from "@/data/shop";

interface ProductCardProps {
  product: Product;
  lang: "en" | "hi";
  index: number;
}

export default function ProductCard({ product, lang, index }: ProductCardProps) {
  const isHindi = lang === "hi";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.06, duration: 0.4, ease: "easeOut" as const }}
      className="group h-full flex flex-col rounded-2xl overflow-hidden transition-all duration-300"
      style={{
        background: "#000000",
        border: "1.5px solid rgba(168,130,255,0.45)",
        boxShadow: "0 0 14px rgba(139,92,246,0.18), 0 0 2px rgba(168,130,255,0.25)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(168,130,255,0.85)";
        e.currentTarget.style.boxShadow = "0 0 32px rgba(139,92,246,0.4), 0 0 4px rgba(168,130,255,0.5)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(168,130,255,0.45)";
        e.currentTarget.style.boxShadow = "0 0 14px rgba(139,92,246,0.18), 0 0 2px rgba(168,130,255,0.25)";
      }}
    >
      {/* Product Image */}
      <div
        className="relative h-56 overflow-hidden"
        style={{
          background: "radial-gradient(ellipse at center, #1a1030 0%, #0c0816 60%, #000000 100%)",
        }}
      >
        {/* Subtle violet ambient glow behind product */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(circle at 50% 60%, rgba(139,92,246,0.1) 0%, transparent 70%)",
          }}
        />
        <img
          src={product.imageURL}
          alt={isHindi ? product.hindiTitle : product.title}
          className="w-full h-full object-cover scale-110 transition-transform duration-500 group-hover:scale-[1.18]"
          loading="lazy"
        />
        {/* Bottom gradient fade into card body */}
        <div
          className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
          style={{
            background: "linear-gradient(to top, #000000, transparent)",
          }}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        {/* English title */}
        <h3
          className="text-base font-semibold leading-snug mb-1"
          style={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            color: "#f5f5f7",
          }}
        >
          {product.title}
        </h3>

        {/* Hindi title */}
        <p
          className="text-sm mb-3"
          style={{
            fontFamily: "var(--font-noto-sans-devanagari), system-ui",
            color: "#d4d4d8",
          }}
        >
          {product.hindiTitle}
        </p>

        {/* Description — primary language first */}
        <p
          className="text-sm leading-relaxed mb-1"
          style={{
            color: "#d4d4d8",
            fontFamily: isHindi
              ? "var(--font-noto-sans-devanagari), system-ui"
              : "var(--font-inter), system-ui",
          }}
        >
          {isHindi ? product.hindiDescription : product.description}
        </p>
        <p
          className="text-xs leading-relaxed mb-5"
          style={{
            color: "#a1a1aa",
            fontFamily: isHindi
              ? "var(--font-inter), system-ui"
              : "var(--font-noto-sans-devanagari), system-ui",
          }}
        >
          {isHindi ? product.description : product.hindiDescription}
        </p>

        {/* CTA Button */}
        <div className="mt-auto">
          <a
            href={product.affiliateLink}
            target="_blank"
            rel="nofollow sponsored noopener"
            className="
              flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl
              text-sm font-bold text-white cursor-pointer
              transition-all duration-300
            "
            style={{
              background: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
              boxShadow: "0 0 20px rgba(139,92,246,0.35), 0 0 4px rgba(168,130,255,0.3)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 0 36px rgba(139,92,246,0.55), 0 0 6px rgba(168,130,255,0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 0 20px rgba(139,92,246,0.35), 0 0 4px rgba(168,130,255,0.3)";
            }}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
            {lang === "en" ? "Check Price on Amazon" : "Amazon पर कीमत देखें"}
          </a>
        </div>
      </div>
    </motion.div>
  );
}
