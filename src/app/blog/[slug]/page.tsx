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
      className="fixed top-0 left-0 right-0 h-[2px] z-[60] origin-left"
      style={{
        scaleX,
        background: "var(--accent)",
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
        background: "var(--glass-bg)",
        border: "1px dashed var(--glass-border)",
        minHeight: "90px",
      }}
    >
      <div className="flex items-center justify-center h-full min-h-[90px] text-xs" style={{ color: "var(--text-muted)" }}>
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
      className="p-5 rounded-2xl mb-6"
      style={{
        background: "var(--glass-bg)",
        border: "1px solid var(--glass-border)",
      }}
    >
      <h3
        className="text-sm font-semibold mb-3 flex items-center gap-2"
        style={{ color: "var(--text-primary)" }}
      >
        <svg className="w-4 h-4" style={{ color: "var(--accent)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
        </svg>
        {lang === "en" ? "Table of Contents" : "विषय सूची"}
      </h3>
      <ol className="space-y-1.5">
        {sections.map((section, i) => (
          <li key={section._key || i}>
            <a
              href={`#section-${i}`}
              className="text-xs hover:opacity-80 transition-colors flex items-center gap-2"
              style={{ color: "var(--text-muted)" }}
            >
              <span className="font-mono text-[10px]" style={{ color: "var(--accent)" }}>{String(i + 1).padStart(2, "0")}</span>
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
      className="scroll-mt-20"
    >
      <h2
        className="text-xl sm:text-2xl font-bold mb-4 flex items-center gap-3"
        style={{
          fontFamily: "var(--font-noto-sans-devanagari), var(--font-playfair), system-ui",
          color: "var(--text-primary)",
        }}
      >
        <span
          className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
          style={{
            background: "var(--accent-muted)",
            color: "var(--accent)",
            border: "1px solid var(--accent-muted)",
          }}
        >
          {index + 1}
        </span>
        {heading}
      </h2>

      {/* Section image */}
      {section.sectionImage?.asset?.url && (
        <div className="relative rounded-xl overflow-hidden my-5" style={{ border: "1px solid var(--glass-border)" }}>
          <img
            src={section.sectionImage.asset.url}
            alt={lang === "hi" ? section.headingHi : section.headingEn}
            className="w-full h-48 sm:h-56 object-cover max-w-full"
          />
        </div>
      )}

      <div
        className="prose prose-invert prose-base max-w-none prose-p:leading-relaxed"
        style={{
          fontFamily: lang === "hi"
            ? "var(--font-noto-sans-devanagari), var(--font-inter), system-ui"
            : "var(--font-inter), system-ui",
          color: "var(--text-secondary)",
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
          background: "var(--glass-bg)",
          border: "1px solid rgba(16,185,129,0.25)",
        }}
      >
        <h3
          className="text-lg font-bold mb-5 flex items-center gap-2"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif", color: "#10b981" }}
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
                  background: "rgba(16,185,129,0.12)",
                  color: "#10b981",
                  border: "1px solid rgba(16,185,129,0.25)",
                }}
              >
                {i + 1}
              </span>
              <p
                className="text-sm leading-relaxed"
                style={{
                  fontFamily: "var(--font-noto-sans-devanagari), var(--font-inter), system-ui",
                  color: "var(--text-secondary)",
                }}
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
        className="text-lg font-bold mb-5 flex items-center gap-2"
        style={{ fontFamily: "var(--font-playfair), Georgia, serif", color: "var(--text-primary)" }}
      >
        <svg className="w-5 h-5" style={{ color: "var(--accent)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
              background: "var(--glass-bg)",
              border: "1px solid var(--accent-muted)",
            }}
          >
            <p className="text-sm font-bold mb-2" style={{ fontFamily: "var(--font-playfair), Georgia, serif", color: "var(--accent)" }}>
              {item.term}
            </p>
            <p className="text-xs leading-relaxed mb-1" style={{ fontFamily: "var(--font-noto-sans-devanagari), system-ui", color: "var(--text-secondary)" }}>
              {lang === "hi" ? item.definitionHi : item.definitionEn}
            </p>
            <p className="text-xs leading-relaxed italic" style={{ color: "var(--text-muted)" }}>
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
        className="text-lg font-bold mb-5 flex items-center gap-2"
        style={{ fontFamily: "var(--font-playfair), Georgia, serif", color: "var(--text-primary)" }}
      >
        <svg className="w-5 h-5" style={{ color: "var(--accent)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
              background: "var(--glass-bg)",
              border: "1px solid var(--glass-border)",
            }}
          >
            <summary
              className="flex items-center justify-between cursor-pointer p-4 sm:p-5 text-sm font-medium transition-colors list-none"
              style={{
                fontFamily: "var(--font-noto-sans-devanagari), var(--font-playfair), system-ui",
                color: "var(--text-primary)",
              }}
            >
              {lang === "hi" ? item.questionHi : item.questionEn}
              <svg
                className="w-4 h-4 group-open:rotate-180 transition-transform flex-shrink-0 ml-3"
                style={{ color: "var(--text-muted)" }}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </summary>
            <div
              className="px-4 sm:px-5 pb-4 sm:pb-5 text-sm leading-relaxed"
              style={{
                fontFamily: lang === "hi"
                  ? "var(--font-noto-sans-devanagari), var(--font-inter), system-ui"
                  : "var(--font-inter), system-ui",
                color: "var(--text-secondary)",
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
    <div className="flex flex-wrap gap-2 mb-4">
      {tags.map((tag) => (
        <span
          key={tag}
          className="px-2.5 py-1 rounded-full text-[10px] font-medium uppercase tracking-wider"
          style={{
            background: "var(--accent-muted)",
            color: "var(--accent)",
            border: "1px solid var(--accent-muted)",
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
    <article className="pt-4 pb-8 sm:pt-6 sm:pb-12">
      <StructuredData post={post} lang={lang} />

      {/* Back link — compact */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-xs mb-4 transition-colors"
        style={{ color: "var(--text-muted)" }}
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        {lang === "en" ? "Back" : "वापस"}
      </Link>

      <div className="flex gap-10 lg:gap-14 relative">
        {/* Main content */}
        <div className="flex-1 min-w-0 max-w-3xl">
          {/* Header — immediately above the fold */}
          <header className="mb-6">
            {/* Meta line — compact */}
            <div className="flex items-center gap-2 mb-3 flex-wrap text-xs" style={{ color: "var(--text-muted)" }}>
              <span
                className="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider"
                style={{ background: "var(--accent-muted)", color: "var(--accent)" }}
              >
                {lang === "en" ? "Deep Dive" : "गहन विश्लेषण"}
              </span>
              <span>{post.sourceName}</span>
              <span>·</span>
              <span>
                {new Date(post.publishedAt).toLocaleDateString(
                  lang === "hi" ? "hi-IN" : "en-IN",
                  { year: "numeric", month: "short", day: "numeric" }
                )}
              </span>
            </div>

            {/* Title — large, immediate */}
            <h1
              className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-2"
              style={{
                fontFamily: lang === "hi"
                  ? "var(--font-noto-sans-devanagari), system-ui"
                  : "var(--font-playfair), Georgia, serif",
                color: "var(--text-primary)",
              }}
            >
              {primaryTitle}
            </h1>

            <p className="text-base" style={{ color: "var(--text-muted)", fontFamily: "var(--font-playfair), Georgia, serif" }}>
              {secondaryTitle}
            </p>

            {/* Meta description as subtitle */}
            {(lang === "en" ? post.metaDescriptionEn : post.metaDescriptionHi) && (
              <p
                className="mt-2 text-sm leading-relaxed"
                style={{
                  fontFamily: lang === "hi"
                    ? "var(--font-noto-sans-devanagari), system-ui"
                    : "var(--font-inter), system-ui",
                  color: "var(--text-secondary)",
                }}
              >
                {lang === "en" ? post.metaDescriptionEn : post.metaDescriptionHi}
              </p>
            )}
          </header>

          {/* Tags — compact */}
          <Tags tags={post.tags} />

          {/* Hero image — reduced height on mobile */}
          {imageUrl && (
            <div className="relative rounded-xl overflow-hidden mb-8" style={{ border: "1px solid var(--glass-border)" }}>
              <img
                src={imageUrl}
                alt={post.titleEnglish}
                className="w-full h-44 sm:h-64 lg:h-72 object-cover max-w-full"
              />
            </div>
          )}

          {/* Ad slot after hero */}
          <AdSlot />

          {/* Sectioned content */}
          {hasSections ? (
            <div className="space-y-8">
              {post.sections!.map((section, i) => (
                <div key={section._key || i}>
                  <ArticleSection section={section} index={i} lang={lang} />
                  {i % 2 === 1 && i < post.sections!.length - 1 && <AdSlot />}
                </div>
              ))}
            </div>
          ) : (
            <GlassPanel
              intensity="light"
              className="p-6 sm:p-8 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
            >
              <div
                className="prose prose-invert prose-lg max-w-none prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-p:leading-relaxed"
                style={{
                  fontFamily: lang === "hi"
                    ? "var(--font-noto-sans-devanagari), var(--font-inter), system-ui"
                    : "var(--font-inter), system-ui",
                  color: "var(--text-secondary)",
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
                background: "var(--accent-muted)",
                border: "1px solid var(--accent-muted)",
              }}
            >
              <p
                className="text-sm sm:text-base leading-relaxed italic"
                style={{
                  fontFamily: lang === "hi"
                    ? "var(--font-noto-sans-devanagari), var(--font-inter), system-ui"
                    : "var(--font-inter), system-ui",
                  color: "var(--text-secondary)",
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
            <div className="mt-8 pt-6" style={{ borderTop: "1px solid var(--glass-border)" }}>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                {lang === "en" ? "Original source:" : "मूल स्रोत:"}{" "}
                <a
                  href={post.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "var(--accent)" }}
                  className="hover:underline"
                >
                  {post.sourceName}
                </a>
              </p>
            </div>
          )}
        </div>

        {/* Sidebar — desktop only */}
        <aside className="hidden lg:block w-72 xl:w-80 shrink-0">
          <div className="sticky top-20 space-y-6">
            {/* Table of Contents */}
            {hasSections && (
              <TableOfContents sections={post.sections} lang={lang} />
            )}

            {/* Quick facts sidebar card */}
            {post.infographicFacts && post.infographicFacts.length > 0 && (
              <div
                className="p-5 rounded-2xl"
                style={{
                  background: "var(--glass-bg)",
                  border: "1px solid var(--glass-border)",
                }}
              >
                <h3 className="text-sm font-semibold mb-4 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
                  <span style={{ color: "#10b981" }}>&#x2726;</span>
                  {lang === "en" ? "Quick Facts" : "त्वरित तथ्य"}
                </h3>
                <ul className="space-y-2">
                  {(lang === "en" && post.infographicFactsEnglish?.length
                    ? post.infographicFactsEnglish
                    : post.infographicFacts
                  ).slice(0, 3).map((f, i) => (
                    <li key={i} className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
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
              className="p-5 rounded-2xl"
              style={{
                background: "var(--glass-bg)",
                border: "1px solid var(--glass-border)",
              }}
            >
              <h3 className="text-sm font-semibold mb-4 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
                <svg className="w-4 h-4" style={{ color: "var(--accent)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.66-5.66a8 8 0 1111.32 0l-5.66 5.66z" />
                </svg>
                {lang === "en" ? "Explore Tools" : "टूल्स एक्सप्लोर करें"}
              </h3>
              <div className="space-y-2">
                {[
                  { name: lang === "en" ? "ISS Tracker" : "ISS ट्रैकर", href: "/tools/iss-tracker" },
                  { name: lang === "en" ? "Orbit Simulator" : "कक्षा सिम्युलेटर", href: "/tools/orbit-simulator" },
                  { name: lang === "en" ? "Universe Explorer" : "ब्रह्मांड एक्सप्लोरर", href: "/universe" },
                ].map((tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className="flex items-center gap-3 p-2.5 rounded-xl transition-colors group"
                  >
                    <span className="text-sm transition-colors" style={{ color: "var(--text-secondary)" }}>
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
        <main className="min-h-screen pt-20 flex items-center justify-center" style={{ background: "var(--bg-primary)" }}>
          <div className="text-center">
            <p className="text-6xl font-bold mb-4" style={{ color: "var(--text-muted)" }}>404</p>
            <p style={{ color: "var(--text-secondary)" }}>
              {lang === "en" ? "Article not found." : "लेख नहीं मिला।"}
            </p>
            <Link href="/blog" className="inline-block mt-6 text-sm hover:underline" style={{ color: "var(--accent)" }}>
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
        <main className="min-h-screen pt-20 flex items-center justify-center" style={{ background: "var(--bg-primary)" }}>
          <div className="flex flex-col items-center gap-4">
            <div
              className="w-8 h-8 rounded-full animate-spin"
              style={{ border: "2px solid var(--accent-muted)", borderTopColor: "var(--accent)" }}
            />
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
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
      <main className="min-h-screen pt-16" style={{ background: "var(--bg-primary)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {post && <DeepDiveArticle post={post} lang={lang} />}
        </div>
      </main>
      <Footer />
    </>
  );
}
