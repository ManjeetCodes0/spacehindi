"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import type { Product } from "@/data/shop";

interface ProductCardProps {
  product: Product;
  lang: "en" | "hi";
  index: number;
}

const badgeStyles = {
  choice: {
    bg: "bg-neon-green/15",
    border: "border-neon-green/30",
    text: "text-neon-green",
    label: { en: "ScienceHindi Choice", hi: "ScienceHindi चॉइस" },
  },
  bestseller: {
    bg: "bg-neon-violet/15",
    border: "border-neon-violet/30",
    text: "text-neon-violet",
    label: { en: "Bestseller", hi: "बेस्टसेलर" },
  },
  new: {
    bg: "bg-neon-cyan/15",
    border: "border-neon-cyan/30",
    text: "text-neon-cyan",
    label: { en: "New", hi: "नया" },
  },
};

function StarRating({ rating, reviews }: { rating: number; reviews: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => {
          const fill = rating >= star ? 1 : rating >= star - 0.5 ? 0.5 : 0;
          return (
            <svg key={star} className="w-3.5 h-3.5" viewBox="0 0 20 20">
              <defs>
                <linearGradient id={`star-fill-${star}-${rating}`}>
                  <stop offset={`${fill * 100}%`} stopColor="#f59e0b" />
                  <stop offset={`${fill * 100}%`} stopColor="#374151" />
                </linearGradient>
              </defs>
              <path
                fill={`url(#star-fill-${star}-${rating})`}
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
              />
            </svg>
          );
        })}
      </div>
      <span className="text-xs text-text-muted">
        {rating} ({reviews.toLocaleString()})
      </span>
    </div>
  );
}

export default function ProductCard({ product, lang, index }: ProductCardProps) {
  const badge = product.badge ? badgeStyles[product.badge] : null;
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(product.affiliateUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = product.affiliateUrl;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.05, duration: 0.4, ease: "easeOut" as const }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      className="
        group h-full flex flex-col rounded-2xl overflow-hidden
        bg-[rgba(17,17,40,0.5)] backdrop-blur-xl
        border border-white/[0.07]
        hover:border-neon-green/25
        transition-all duration-300
        hover:shadow-[0_0_30px_rgba(16,185,129,0.12)]
      "
    >
      {/* Image area */}
      <div className="relative h-44 overflow-hidden">
        <div
          className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
          style={{ background: product.image }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(17,17,40,0.95)] via-[rgba(17,17,40,0.3)] to-transparent" />

        {/* Placeholder product icon */}
        <div className="absolute inset-0 flex items-center justify-center opacity-15">
          <svg className="w-16 h-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
          </svg>
        </div>

        {/* Badge */}
        {badge && (
          <div className="absolute top-3 left-3">
            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold border ${badge.bg} ${badge.border} ${badge.text}`}>
              {product.badge === "choice" && (
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                </svg>
              )}
              {badge.label[lang]}
            </span>
          </div>
        )}

        {/* Price tag */}
        <div className="absolute bottom-3 right-3">
          <span className="px-3 py-1.5 rounded-lg bg-space-black/80 backdrop-blur-sm border border-white/[0.08] text-lg font-bold text-neon-green">
            {product.price}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        {/* Dual-language title */}
        <h3
          className="text-base font-semibold text-text-primary leading-snug mb-0.5 group-hover:text-white transition-colors"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          {product.name[lang]}
        </h3>
        <p
          className="text-xs text-text-muted mb-3"
          style={{ fontFamily: "var(--font-noto-sans-devanagari)" }}
        >
          {product.name[lang === "en" ? "hi" : "en"]}
        </p>

        {/* Rating */}
        <div className="mb-3">
          <StarRating rating={product.rating} reviews={product.reviews} />
        </div>

        {/* Description */}
        <p className="text-sm text-text-muted leading-relaxed line-clamp-2 mb-4">
          {product.description[lang]}
        </p>

        {/* CTA */}
        <div className="mt-auto flex gap-2">
          <Link
            href={product.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="
              flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl
              text-sm font-semibold text-white cursor-pointer
              bg-gradient-to-r from-neon-green/80 to-neon-green
              shadow-[0_0_15px_rgba(16,185,129,0.2)]
              hover:shadow-[0_0_25px_rgba(16,185,129,0.4)]
              transition-shadow duration-300
            "
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
            {lang === "en" ? "Buy on Amazon" : "Amazon पर खरीदें"}
          </Link>
          <button
            onClick={handleCopyLink}
            className="
              flex items-center justify-center px-3 py-2.5 rounded-xl cursor-pointer
              bg-space-elevated border border-space-border
              text-text-muted hover:text-neon-green hover:border-neon-green/30
              transition-all duration-200
            "
            title={lang === "en" ? "Copy affiliate link" : "लिंक कॉपी करें"}
          >
            {copied ? (
              <svg className="w-4 h-4 text-neon-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
