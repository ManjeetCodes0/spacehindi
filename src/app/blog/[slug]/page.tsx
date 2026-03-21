"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import { Navbar, Footer } from "@/components/layout";
import type { DeepDivePost } from "@/types/deep-dive";
import GlassPanel from "@/components/ui/GlassPanel";
import { useLang } from "@/context/LanguageContext";

// ─── Reading Progress Bar ──────────────────────────────────────────────────────

function ReadingProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] z-[60] origin-left"
      style={{
        scaleX,
        background: "linear-gradient(90deg, #3b82f6, #06b6d4, #22d3ee)",
        boxShadow: "0 0 12px rgba(59,130,246,0.5), 0 0 24px rgba(6,182,212,0.3)",
      }}
    />
  );
}

// ─── Ad Slot Placeholder ────────────────────────────────────────────────────────

function AdSlot({ className = "" }: { className?: string }) {
  return (
    <div
      className={`my-8 rounded-xl overflow-hidden ${className}`}
      style={{
        background: "rgba(17,17,40,0.3)",
        border: "1px dashed rgba(255,255,255,0.08)",
        minHeight: "90px",
      }}
    >
      {/* AdSense slot — replace with actual ad code */}
      <div className="flex items-center justify-center h-full min-h-[90px] text-xs text-text-muted/40">
        Ad Space
      </div>
    </div>
  );
}

// ─── Table of Contents ──────────────────────────────────────────────────────────

function TableOfContents({
  sections,
  lang,
}: {
  sections: DeepDivePost["sections"];
  lang: "en" | "hi";
}) {
  if (!sections || sections.length === 0) return null;

  return (
    <nav
      className="p-5 rounded-2xl backdrop-blur-xl mb-6"
      style={{
        background: "rgba(17,17,40,0.5)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <h3 className="text-sm font-semibold text-text-primary mb-3 flex items-center gap-2">
        <svg className="w-4 h-4 text-neon-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
        </svg>
        {lang === "en" ? "Table of Contents" : "विषय सूची"}
      </h3>
      <ol className="space-y-1.5">
        {sections.map((section, i) => (
          <li key={section._key || i}>
            <a
              href={`#section-${i}`}
              className="text-xs text-text-muted hover:text-neon-cyan transition-colors flex items-center gap-2"
            >
              <span className="text-neon-cyan/50 font-mono text-[10px]">{String(i + 1).padStart(2, "0")}</span>
              {lang === "hi" ? section.headingHi : section.headingEn}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

// ─── Section Renderer ───────────────────────────────────────────────────────────

function ArticleSection({
  section,
  index,
  lang,
}: {
  section: NonNullable<DeepDivePost["sections"]>[number];
  index: number;
  lang: "en" | "hi";
}) {
  const heading = lang === "hi" ? section.headingHi : section.headingEn;
  const content = lang === "hi" ? section.contentHi : section.contentEn;

  return (
    <motion.section
      id={`section-${index}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
      className="scroll-mt-24"
    >
      <h2
        className="text-xl sm:text-2xl font-bold text-text-primary mb-4 flex items-center gap-3"
        style={{ fontFamily: "var(--font-noto-sans-devanagari), var(--font-space-grotesk), system-ui" }}
      >
        <span
          className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
          style={{
            background: "rgba(139,92,246,0.12)",
            color: "#8b5cf6",
            border: "1px solid rgba(139,92,246,0.25)",
          }}
        >
          {index + 1}
        </span>
        {heading}
      </h2>

      {/* Section image */}
      {section.sectionImage?.asset?.url && (
        <div className="relative rounded-xl overflow-hidden my-5 border border-white/[0.06]">
          <img
            src={section.sectionImage.asset.url}
            alt={lang === "hi" ? section.headingHi : section.headingEn}
            className="w-full h-48 sm:h-56 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>
      )}

      <div
        className="prose prose-invert prose-base max-w-none prose-p:text-text-secondary prose-p:leading-relaxed prose-strong:text-text-primary"
        style={{
          fontFamily: lang === "hi"
            ? "var(--font-noto-sans-devanagari), var(--font-inter), system-ui"
            : "var(--font-inter), system-ui",
        }}
      >
        {content.split("\n").map((para, i) => {
          const trimmed = para.trim();
          if (!trimmed) return null;
          return <p key={i}>{trimmed}</p>;
        })}
      </div>
    </motion.section>
  );
}

// ─── Infographic Facts Card ────────────────────────────────────────────────────

function InfographicFacts({
  facts,
  lang,
}: {
  facts: string[];
  lang: "en" | "hi";
}) {
  if (!facts || facts.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="my-10"
    >
      <div
        className="relative rounded-2xl p-6 sm:p-8 overflow-hidden"
        style={{
          background: "rgba(0,0,0,0.6)",
          border: "1.5px solid rgba(16,185,129,0.35)",
          boxShadow: "0 0 20px rgba(16,185,129,0.1), inset 0 1px 0 rgba(16,185,129,0.1)",
        }}
      >
        <div
          className="absolute top-0 left-0 w-32 h-32 pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 70%)" }}
        />

        <h3
          className="text-lg font-bold text-neon-green mb-5 flex items-center gap-2"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
          </svg>
          {lang === "en" ? "Mind-Blowing Facts" : "दिमाग उड़ाने वाले तथ्य"}
        </h3>

        <ul className="space-y-3">
          {facts.map((fact, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex items-start gap-3"
            >
              <span
                className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold mt-0.5"
                style={{
                  background: "rgba(16,185,129,0.15)",
                  color: "#10b981",
                  border: "1px solid rgba(16,185,129,0.3)",
                }}
              >
                {i + 1}
              </span>
              <p
                className="text-sm text-text-secondary leading-relaxed"
                style={{ fontFamily: "var(--font-noto-sans-devanagari), var(--font-inter), system-ui" }}
              >
                {fact}
              </p>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.section>
  );
}

// ─── Science Corner ────────────────────────────────────────────────────────────

function ScienceCorner({
  terms,
  lang,
}: {
  terms: DeepDivePost["scienceCorner"];
  lang: "en" | "hi";
}) {
  if (!terms || terms.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="my-10"
    >
      <h3
        className="text-lg font-bold text-text-primary mb-5 flex items-center gap-2"
        style={{ fontFamily: "var(--font-space-grotesk)" }}
      >
        <svg className="w-5 h-5 text-neon-violet" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
        </svg>
        {lang === "en" ? "Science Corner" : "विज्ञान कोना"}
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {terms.map((item, i) => (
          <motion.div
            key={item._key || i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="relative rounded-xl p-4 overflow-hidden"
            style={{
              background: "rgba(0,0,0,0.5)",
              border: "1px solid rgba(139,92,246,0.2)",
              boxShadow: "0 0 15px rgba(139,92,246,0.08), 0 0 30px rgba(139,92,246,0.04)",
            }}
          >
            <p className="text-sm font-bold text-neon-violet mb-2" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              {item.term}
            </p>
            <p className="text-xs text-text-secondary leading-relaxed mb-1" style={{ fontFamily: "var(--font-noto-sans-devanagari), system-ui" }}>
              {lang === "hi" ? item.definitionHi : item.definitionEn}
            </p>
            <p className="text-xs text-text-muted leading-relaxed italic">
              {lang === "hi" ? item.definitionEn : item.definitionHi}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

// ─── FAQ Section (SEO Rich Snippets) ────────────────────────────────────────────

function FAQSection({
  faq,
  lang,
}: {
  faq: DeepDivePost["faq"];
  lang: "en" | "hi";
}) {
  if (!faq || faq.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="my-10"
    >
      <h3
        className="text-lg font-bold text-text-primary mb-5 flex items-center gap-2"
        style={{ fontFamily: "var(--font-space-grotesk)" }}
      >
        <svg className="w-5 h-5 text-neon-pink" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
        </svg>
        {lang === "en" ? "Frequently Asked Questions" : "अक्सर पूछे जाने वाले प्रश्न"}
      </h3>

      <div className="space-y-3">
        {faq.map((item, i) => (
          <details
            key={item._key || i}
            className="group rounded-xl overflow-hidden"
            style={{
              background: "rgba(0,0,0,0.4)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <summary
              className="flex items-center justify-between cursor-pointer p-4 sm:p-5 text-sm font-medium text-text-primary hover:text-white transition-colors list-none"
              style={{ fontFamily: "var(--font-noto-sans-devanagari), var(--font-space-grotesk), system-ui" }}
            >
              {lang === "hi" ? item.questionHi : item.questionEn}
              <svg
                className="w-4 h-4 text-text-muted group-open:rotate-180 transition-transform flex-shrink-0 ml-3"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </summary>
            <div
              className="px-4 sm:px-5 pb-4 sm:pb-5 text-sm text-text-secondary leading-relaxed"
              style={{
                fontFamily: lang === "hi"
                  ? "var(--font-noto-sans-devanagari), var(--font-inter), system-ui"
                  : "var(--font-inter), system-ui",
              }}
            >
              {lang === "hi" ? item.answerHi : item.answerEn}
            </div>
          </details>
        ))}
      </div>
    </motion.section>
  );
}

// ─── Tags ───────────────────────────────────────────────────────────────────────

function Tags({ tags }: { tags?: string[] }) {
  if (!tags || tags.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 my-6">
      {tags.map((tag) => (
        <span
          key={tag}
          className="px-2.5 py-1 rounded-full text-[10px] font-medium uppercase tracking-wider"
          style={{
            background: "rgba(139,92,246,0.1)",
            color: "rgba(139,92,246,0.7)",
            border: "1px solid rgba(139,92,246,0.15)",
          }}
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

// ─── Structured Data (JSON-LD) ──────────────────────────────────────────────────

function StructuredData({ post, lang }: { post: DeepDivePost; lang: "en" | "hi" }) {
  const title = lang === "hi" ? post.titleHindi : post.titleEnglish;
  const description = lang === "hi" ? post.metaDescriptionHi : post.metaDescriptionEn;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description || "",
    author: { "@type": "Person", name: post.authorName || "Manjeet Singh" },
    publisher: { "@type": "Organization", name: "ScienceHindi 360" },
    datePublished: post.publishedAt,
    image: post.mainImage?.asset?.url || "",
  };

  const faqSchema = post.faq && post.faq.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faq.map((item) => ({
      "@type": "Question",
      name: lang === "hi" ? item.questionHi : item.questionEn,
      acceptedAnswer: {
        "@type": "Answer",
        text: lang === "hi" ? item.answerHi : item.answerEn,
      },
    })),
  } : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
    </>
  );
}

// ─── Deep Dive Article Renderer ────────────────────────────────────────────────

function DeepDiveArticle({
  post,
  lang,
}: {
  post: DeepDivePost;
  lang: "en" | "hi";
}) {
  const imageUrl = post.mainImage?.asset?.url;
  const primaryTitle = lang === "hi" ? post.titleHindi : post.titleEnglish;
  const secondaryTitle = lang === "hi" ? post.titleEnglish : post.titleHindi;
  const hasSections = post.sections && post.sections.length > 0;

  return (
    <article className="py-8 sm:py-12">
      <StructuredData post={post} lang={lang} />

      {/* Back link */}
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-8"
      >
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text-secondary transition-colors group"
        >
          <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          {lang === "en" ? "Back to Blog" : "ब्लॉग पर वापस"}
        </Link>
      </motion.div>

      <div className="flex gap-10 lg:gap-14 relative">
        {/* Main content */}
        <div className="flex-1 min-w-0 max-w-3xl">
          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20">
                {lang === "en" ? "Deep Dive" : "गहन विश्लेषण"}
              </span>
              <span className="text-xs text-text-muted">{post.sourceName}</span>
              <span className="text-xs text-text-muted">•</span>
              <span className="text-xs text-text-muted">
                {new Date(post.publishedAt).toLocaleDateString(
                  lang === "hi" ? "hi-IN" : "en-IN",
                  { year: "numeric", month: "short", day: "numeric" }
                )}
              </span>
              <span className="text-xs text-text-muted">•</span>
              <span className="text-xs text-text-muted">{post.authorName || "Manjeet Singh"}</span>
            </div>

            <h1
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary leading-tight mb-2"
              style={{ fontFamily: "var(--font-noto-sans-devanagari), var(--font-space-grotesk), system-ui" }}
            >
              {primaryTitle}
            </h1>

            <p className="text-lg text-text-muted" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              {secondaryTitle}
            </p>

            {/* Meta description as subtitle */}
            {(lang === "en" ? post.metaDescriptionEn : post.metaDescriptionHi) && (
              <p
                className="mt-3 text-sm text-text-secondary leading-relaxed"
                style={{
                  fontFamily: lang === "hi"
                    ? "var(--font-noto-sans-devanagari), system-ui"
                    : "var(--font-inter), system-ui",
                }}
              >
                {lang === "en" ? post.metaDescriptionEn : post.metaDescriptionHi}
              </p>
            )}
          </motion.header>

          {/* Tags */}
          <Tags tags={post.tags} />

          {/* Hero image */}
          {imageUrl && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="relative rounded-2xl overflow-hidden mb-10 border border-white/[0.06]"
            >
              <img
                src={imageUrl}
                alt={post.titleEnglish}
                className="w-full h-56 sm:h-72 lg:h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </motion.div>
          )}

          {/* Ad slot after hero */}
          <AdSlot />

          {/* Sectioned content (new format) */}
          {hasSections ? (
            <div className="space-y-8">
              {post.sections!.map((section, i) => (
                <div key={section._key || i}>
                  <ArticleSection section={section} index={i} lang={lang} />
                  {/* Ad slot every 2 sections */}
                  {i % 2 === 1 && i < post.sections!.length - 1 && <AdSlot />}
                </div>
              ))}
            </div>
          ) : (
            /* Fallback: flat content (old posts) */
            <GlassPanel
              intensity="light"
              className="p-6 sm:p-8 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
            >
              <div
                className="prose prose-invert prose-lg max-w-none prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h2:text-text-primary prose-p:text-text-secondary prose-p:leading-relaxed prose-strong:text-text-primary"
                style={{
                  fontFamily: lang === "hi"
                    ? "var(--font-noto-sans-devanagari), var(--font-inter), system-ui"
                    : "var(--font-inter), system-ui",
                }}
              >
                {((lang === "en" && post.contentEnglish) ? post.contentEnglish : post.content)
                  .split("\n")
                  .map((para, i) => {
                    const trimmed = para.trim();
                    if (!trimmed) return null;
                    if (trimmed.startsWith("### ")) return <h3 key={i}>{trimmed.slice(4)}</h3>;
                    if (trimmed.startsWith("## ")) return <h2 key={i}>{trimmed.slice(3)}</h2>;
                    return <p key={i}>{trimmed}</p>;
                  })}
              </div>
            </GlassPanel>
          )}

          {/* Ad slot before facts */}
          <AdSlot />

          {/* Infographic Facts */}
          <InfographicFacts
            facts={
              lang === "en" && post.infographicFactsEnglish?.length
                ? post.infographicFactsEnglish
                : post.infographicFacts
            }
            lang={lang}
          />

          {/* Science Corner */}
          <ScienceCorner terms={post.scienceCorner} lang={lang} />

          {/* Conclusion */}
          {(post.conclusion || post.conclusionEnglish) && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="my-10 relative rounded-2xl p-6 sm:p-8 overflow-hidden text-center"
              style={{
                background: "linear-gradient(135deg, rgba(139,92,246,0.08), rgba(6,182,212,0.08))",
                border: "1px solid rgba(139,92,246,0.15)",
              }}
            >
              <p
                className="text-sm sm:text-base text-text-secondary leading-relaxed italic"
                style={{
                  fontFamily: lang === "hi"
                    ? "var(--font-noto-sans-devanagari), var(--font-inter), system-ui"
                    : "var(--font-inter), system-ui",
                }}
              >
                &ldquo;{(lang === "en" && post.conclusionEnglish) ? post.conclusionEnglish : post.conclusion}&rdquo;
              </p>
            </motion.div>
          )}

          {/* Ad slot before FAQ */}
          <AdSlot />

          {/* FAQ Section */}
          <FAQSection faq={post.faq} lang={lang} />

          {/* Source link */}
          {post.sourceUrl && (
            <div className="mt-8 pt-6 border-t border-white/[0.06]">
              <p className="text-xs text-text-muted">
                {lang === "en" ? "Original source:" : "मूल स्रोत:"}{" "}
                <a
                  href={post.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neon-violet hover:underline"
                >
                  {post.sourceName}
                </a>
              </p>
            </div>
          )}
        </div>

        {/* Sidebar — desktop only */}
        <aside className="hidden lg:block w-72 xl:w-80 shrink-0">
          <div className="sticky top-24 space-y-6">
            {/* Table of Contents */}
            {hasSections && (
              <TableOfContents sections={post.sections} lang={lang} />
            )}

            {/* Quick facts sidebar card */}
            {post.infographicFacts && post.infographicFacts.length > 0 && (
              <div
                className="p-5 rounded-2xl backdrop-blur-xl"
                style={{
                  background: "rgba(17,17,40,0.5)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <h3 className="text-sm font-semibold text-text-primary mb-4 flex items-center gap-2">
                  <span className="text-neon-green">&#x2726;</span>
                  {lang === "en" ? "Quick Facts" : "त्वरित तथ्य"}
                </h3>
                <ul className="space-y-2">
                  {(lang === "en" && post.infographicFactsEnglish?.length
                    ? post.infographicFactsEnglish
                    : post.infographicFacts
                  ).slice(0, 3).map((f, i) => (
                    <li key={i} className="text-xs text-text-muted leading-relaxed">
                      &bull; {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Sidebar ad slot */}
            <AdSlot />

            {/* Tools promo */}
            <div
              className="p-5 rounded-2xl backdrop-blur-xl"
              style={{
                background: "rgba(17,17,40,0.5)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <h3 className="text-sm font-semibold text-text-primary mb-4 flex items-center gap-2">
                <svg className="w-4 h-4 text-neon-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.66-5.66a8 8 0 1111.32 0l-5.66 5.66z" />
                </svg>
                {lang === "en" ? "Explore Tools" : "टूल्स एक्सप्लोर करें"}
              </h3>
              <div className="space-y-2">
                {[
                  { name: lang === "en" ? "ISS Tracker" : "ISS ट्रैकर", href: "/tools/iss-tracker", icon: "satellite" },
                  { name: lang === "en" ? "Orbit Simulator" : "कक्षा सिम्युलेटर", href: "/tools/orbit-simulator", icon: "orbit" },
                  { name: lang === "en" ? "Universe Explorer" : "ब्रह्मांड एक्सप्लोरर", href: "/universe", icon: "galaxy" },
                ].map((tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/[0.04] transition-colors group"
                  >
                    <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">
                      {tool.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </article>
  );
}

// ─── Page Component ────────────────────────────────────────────────────────────

export default function BlogArticlePage() {
  const { lang } = useLang();
  const params = useParams();
  const slug = params.slug as string;

  const [post, setPost] = useState<DeepDivePost | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await fetch(`/api/deep-dive?slug=${encodeURIComponent(slug)}`);
        if (res.ok) {
          const data = await res.json();
          if (data && data._id) {
            setPost(data);
          } else {
            setNotFound(true);
          }
        } else {
          setNotFound(true);
        }
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [slug]);

  if (notFound) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-[#000000] pt-24 flex items-center justify-center">
          <div className="text-center">
            <p className="text-6xl font-bold text-text-muted mb-4">404</p>
            <p className="text-text-secondary">
              {lang === "en" ? "Article not found." : "लेख नहीं मिला।"}
            </p>
            <Link href="/blog" className="inline-block mt-6 text-sm text-neon-violet hover:underline">
              {lang === "en" ? "\u2190 Back to Blog" : "\u2190 ब्लॉग पर वापस"}
            </Link>
          </div>
        </main>
      </>
    );
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-[#000000] pt-24 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-2 border-neon-violet/30 border-t-neon-violet rounded-full animate-spin" />
            <p className="text-sm text-text-muted">
              {lang === "en" ? "Loading article..." : "लेख लोड हो रहा है..."}
            </p>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <ReadingProgressBar />
      <Navbar />
      <main className="min-h-screen bg-[#000000] pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {post && <DeepDiveArticle post={post} lang={lang} />}
        </div>
      </main>
      <Footer />
    </>
  );
}
