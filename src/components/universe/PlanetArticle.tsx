"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { PlanetArticle } from "@/data/universe/articles/mercury";

interface PlanetArticleProps {
  article: PlanetArticle;
  planetColor: string;
}

export default function PlanetArticle({ article, planetColor }: PlanetArticleProps) {
  return (
    <article className="mt-16">
      {/* Article Header */}
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-1 h-8 rounded-full"
            style={{ background: planetColor }}
          />
          <span className="text-xs uppercase tracking-[0.2em] text-white/40 font-medium">
            Detailed Article
          </span>
          <span className="text-xs text-white/25">|</span>
          <span className="text-xs text-white/40">{article.readingTime} min read</span>
          <span className="text-xs text-white/25">|</span>
          <span className="text-xs text-white/40">Updated: {article.lastUpdated}</span>
        </div>
        <h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight"
          style={{ fontFamily: "var(--font-space-grotesk-real), sans-serif" }}
        >
          {article.title}
        </h2>
      </motion.div>

      {/* Table of Contents */}
      <motion.nav
        className="mb-14 rounded-[24px] border border-white/[0.04] p-6 sm:p-8"
        style={{
          background: "rgba(10, 15, 25, 0.5)",
          backdropFilter: "blur(20px)",
        }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
      >
        <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-white/50 mb-5">
          इस Article में
        </h3>
        <ol className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {article.tableOfContents.map((item, i) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="group flex items-center gap-3 py-2 px-3 rounded-xl hover:bg-white/[0.03] transition-all"
              >
                <span
                  className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0"
                  style={{
                    background: `${planetColor}15`,
                    color: planetColor,
                    border: `1px solid ${planetColor}30`,
                  }}
                >
                  {i + 1}
                </span>
                <span className="text-sm text-white/70 group-hover:text-white transition-colors">
                  {item.label}
                </span>
              </a>
            </li>
          ))}
        </ol>
      </motion.nav>

      {/* Intro Section */}
      <motion.div
        id="intro"
        className="mb-14 scroll-mt-24"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="prose-custom">
          {article.intro.split("\n\n").map((para, i) => (
            <p
              key={i}
              className="text-base sm:text-[17px] text-[#b8c5d4] leading-[1.85] mb-5 font-light"
            >
              {para}
            </p>
          ))}
        </div>
      </motion.div>

      {/* Article Sections */}
      {article.sections.map((section, idx) => (
        <motion.section
          key={section.id}
          id={section.id}
          className="mb-16 scroll-mt-24"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.05 }}
        >
          {/* Section Heading */}
          <div className="flex items-start gap-4 mb-6">
            <div
              className="mt-1 w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{
                background: `${planetColor}12`,
                border: `1px solid ${planetColor}25`,
              }}
            >
              <span className="text-sm font-bold" style={{ color: planetColor }}>
                {String(idx + 1).padStart(2, "0")}
              </span>
            </div>
            <h2
              className="text-xl sm:text-2xl md:text-[28px] font-bold text-white leading-snug"
              style={{ fontFamily: "var(--font-space-grotesk-real), sans-serif" }}
            >
              {section.heading}
            </h2>
          </div>

          {/* Section Image */}
          {section.image && (
            <div className="mb-8 rounded-[20px] overflow-hidden border border-white/[0.04]">
              <div className="relative w-full aspect-[16/9] bg-[#0a0f18]">
                <Image
                  src={section.image}
                  alt={section.imageAlt || section.heading}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 800px"
                />
              </div>
              {section.imageCaption && (
                <div
                  className="px-5 py-3 text-xs text-white/40 italic"
                  style={{ background: "rgba(10, 15, 25, 0.6)" }}
                >
                  {section.imageCaption}
                </div>
              )}
            </div>
          )}

          {/* Section Content */}
          <div className="pl-0 sm:pl-14">
            {section.content.split("\n\n").map((para, i) => {
              // Handle markdown-like headings (### )
              if (para.startsWith("### ")) {
                return (
                  <h3
                    key={i}
                    className="text-lg font-semibold text-white mt-8 mb-3"
                    style={{ fontFamily: "var(--font-space-grotesk-real), sans-serif" }}
                  >
                    {para.replace("### ", "")}
                  </h3>
                );
              }

              // Handle list items
              if (para.includes("\n- ") || para.startsWith("- ")) {
                const lines = para.split("\n");
                return (
                  <ul key={i} className="mb-5 space-y-2">
                    {lines.map((line, j) => {
                      const text = line.replace(/^- /, "");
                      if (!text.trim()) return null;
                      return (
                        <li
                          key={j}
                          className="flex items-start gap-3 text-base text-[#b8c5d4] leading-relaxed font-light"
                        >
                          <span
                            className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0"
                            style={{ background: planetColor }}
                          />
                          {text}
                        </li>
                      );
                    })}
                  </ul>
                );
              }

              // Handle numbered list items (1. **Bold**: text)
              if (/^\d+\.\s\*\*/.test(para)) {
                return (
                  <div key={i} className="mb-4 pl-4 border-l-2 py-2" style={{ borderColor: `${planetColor}30` }}>
                    <p className="text-base text-[#b8c5d4] leading-[1.85] font-light">
                      {renderBoldText(para)}
                    </p>
                  </div>
                );
              }

              // Regular paragraphs
              return (
                <p
                  key={i}
                  className="text-base sm:text-[17px] text-[#b8c5d4] leading-[1.85] mb-5 font-light"
                >
                  {renderBoldText(para)}
                </p>
              );
            })}
          </div>
        </motion.section>
      ))}

      {/* Fun Facts Section */}
      <motion.section
        id="facts"
        className="mb-16 scroll-mt-24"
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="flex items-start gap-4 mb-8">
          <div
            className="mt-1 w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{
              background: `${planetColor}12`,
              border: `1px solid ${planetColor}25`,
            }}
          >
            <svg className="w-5 h-5" style={{ color: planetColor }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h2
            className="text-xl sm:text-2xl md:text-[28px] font-bold text-white leading-snug"
            style={{ fontFamily: "var(--font-space-grotesk-real), sans-serif" }}
          >
            बुध ग्रह के रोचक तथ्य
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {article.funFacts.map((fact, i) => (
            <motion.div
              key={i}
              className="rounded-[18px] border border-white/[0.04] p-5 flex items-start gap-4"
              style={{
                background: "rgba(10, 15, 25, 0.4)",
                backdropFilter: "blur(12px)",
              }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <span
                className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
                style={{
                  background: `${planetColor}15`,
                  color: planetColor,
                  border: `1px solid ${planetColor}20`,
                }}
              >
                {i + 1}
              </span>
              <p className="text-sm text-[#b8c5d4] leading-relaxed font-light">
                {fact}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section
        id="faq"
        className="mb-16 scroll-mt-24"
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="flex items-start gap-4 mb-8">
          <div
            className="mt-1 w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{
              background: `${planetColor}12`,
              border: `1px solid ${planetColor}25`,
            }}
          >
            <svg className="w-5 h-5" style={{ color: planetColor }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2
            className="text-xl sm:text-2xl md:text-[28px] font-bold text-white leading-snug"
            style={{ fontFamily: "var(--font-space-grotesk-real), sans-serif" }}
          >
            अक्सर पूछे जाने वाले सवाल (FAQ)
          </h2>
        </div>

        <div className="space-y-4">
          {article.faqs.map((faq, i) => (
            <details
              key={i}
              className="group rounded-[18px] border border-white/[0.04] overflow-hidden"
              style={{ background: "rgba(10, 15, 25, 0.4)" }}
            >
              <summary className="flex items-center justify-between cursor-pointer p-5 sm:p-6 hover:bg-white/[0.02] transition-colors list-none">
                <h3 className="text-[15px] sm:text-base font-medium text-white pr-4">
                  {faq.question}
                </h3>
                <svg
                  className="w-5 h-5 text-white/30 flex-shrink-0 transition-transform group-open:rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0">
                <p className="text-sm sm:text-[15px] text-[#b8c5d4] leading-[1.8] font-light">
                  {faq.answer}
                </p>
              </div>
            </details>
          ))}
        </div>
      </motion.section>

      {/* Conclusion */}
      <motion.div
        className="mb-12 rounded-[24px] border border-white/[0.04] p-6 sm:p-10"
        style={{
          background: `linear-gradient(135deg, rgba(10, 15, 25, 0.6) 0%, ${planetColor}08 100%)`,
          backdropFilter: "blur(20px)",
          borderColor: `${planetColor}15`,
        }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2
          className="text-xl sm:text-2xl font-bold text-white mb-5"
          style={{ fontFamily: "var(--font-space-grotesk-real), sans-serif" }}
        >
          निष्कर्ष
        </h2>
        {article.conclusion.split("\n\n").map((para, i) => (
          <p
            key={i}
            className="text-base text-[#b8c5d4] leading-[1.85] mb-4 last:mb-0 font-light"
          >
            {para}
          </p>
        ))}
      </motion.div>

      {/* SEO Keywords (visually hidden, screen-reader accessible) */}
      <div className="sr-only" aria-hidden="true">
        {article.keywords.join(", ")}
      </div>
    </article>
  );
}

/** Renders text with **bold** markdown syntax */
function renderBoldText(text: string) {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-semibold text-white">
        {part}
      </strong>
    ) : (
      part
    )
  );
}
