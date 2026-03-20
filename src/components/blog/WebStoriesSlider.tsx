"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { spaceStories } from "@/data/blog";

interface WebStoriesSliderProps {
  lang: "en" | "hi";
}

const text = {
  en: { title: "Quick Space Facts", viewAll: "View All" },
  hi: { title: "त्वरित अंतरिक्ष तथ्य", viewAll: "सभी देखें" },
};

export default function WebStoriesSlider({ lang }: WebStoriesSliderProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const t = text[lang];

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 200;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-1 h-6 rounded-full bg-gradient-to-b from-neon-pink to-neon-violet" />
          <h2
            className="text-lg sm:text-xl font-bold text-text-primary"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            {t.title}
          </h2>
        </div>

        {/* Scroll controls (desktop) */}
        <div className="hidden sm:flex items-center gap-2">
          <button
            onClick={() => scroll("left")}
            className="w-8 h-8 rounded-full bg-space-elevated border border-space-border flex items-center justify-center text-text-muted hover:text-text-primary hover:border-neon-violet/30 transition-all cursor-pointer"
            aria-label="Scroll left"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-8 h-8 rounded-full bg-space-elevated border border-space-border flex items-center justify-center text-text-muted hover:text-text-primary hover:border-neon-violet/30 transition-all cursor-pointer"
            aria-label="Scroll right"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </div>

      {/* Horizontal scroll track */}
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {spaceStories.map((story, i) => (
          <motion.div
            key={story.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04, duration: 0.35 }}
            className="snap-start shrink-0"
          >
            {story.type === "affiliate" ? (
              <Link href={story.affiliateLink || "/shop"} className="block">
                <StoryCard story={story} lang={lang} />
              </Link>
            ) : (
              <StoryCard story={story} lang={lang} />
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function StoryCard({
  story,
  lang,
}: {
  story: (typeof spaceStories)[number];
  lang: "en" | "hi";
}) {
  const isAffiliate = story.type === "affiliate";

  return (
    <div
      className={`
        relative w-[140px] sm:w-[160px] aspect-[9/16] rounded-2xl overflow-hidden
        border transition-all duration-300 group cursor-pointer
        ${
          isAffiliate
            ? "border-neon-pink/25 hover:border-neon-pink/50 hover:shadow-[0_0_25px_rgba(236,72,153,0.2)]"
            : "border-white/[0.06] hover:border-neon-violet/30 hover:shadow-[0_0_20px_rgba(139,92,246,0.15)]"
        }
      `}
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0"
        style={{ background: story.image }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Affiliate badge */}
      {isAffiliate && (
        <div className="absolute top-3 left-3 right-3">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-neon-pink/20 border border-neon-pink/30 text-[9px] font-semibold text-neon-pink uppercase tracking-wider">
            <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
            AD
          </span>
        </div>
      )}

      {/* Content at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
        <p className="text-xs sm:text-sm font-semibold text-white leading-tight mb-2">
          {story.title[lang]}
        </p>
        {isAffiliate && story.cta && (
          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-neon-pink">
            {story.cta[lang]}
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
          </span>
        )}
      </div>

      {/* Tap indicator ring */}
      <div className="absolute top-3 right-3 w-6 h-6 rounded-full border-2 border-white/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-2 h-2 rounded-full bg-white/60" />
      </div>
    </div>
  );
}
