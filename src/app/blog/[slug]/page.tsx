"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import { Navbar, Footer } from "@/components/layout";
import type { DeepDivePost } from "@/types/deep-dive";

/* ═══════════════════════════════════════════════════════
   READING PROGRESS BAR
═══════════════════════════════════════════════════════ */
function ReadingProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] z-[60] origin-left"
      style={{ scaleX, background: "linear-gradient(90deg, #8b5cf6, #3b82f6, #06b6d4)" }}
    />
  );
}

/* ═══════════════════════════════════════════════════════
   SHARE / SAVE BUTTONS
═══════════════════════════════════════════════════════ */
function ShareBar({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const copyLink = useCallback(() => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, []);

  const shareOnTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(window.location.href)}`,
      "_blank"
    );
  };

  const shareOnWhatsApp = () => {
    window.open(
      `https://wa.me/?text=${encodeURIComponent(title + " " + window.location.href)}`,
      "_blank"
    );
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {/* WhatsApp */}
      <button
        onClick={shareOnWhatsApp}
        title="Share on WhatsApp"
        className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer"
        style={{ background: "rgba(37,211,102,0.12)", color: "#25D366", border: "1px solid rgba(37,211,102,0.25)" }}
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        WhatsApp
      </button>

      {/* Twitter/X */}
      <button
        onClick={shareOnTwitter}
        title="Share on X"
        className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer"
        style={{ background: "rgba(255,255,255,0.06)", color: "var(--text-secondary)", border: "1px solid rgba(255,255,255,0.1)" }}
      >
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.849L1.254 2.25H8.08l4.253 5.622 5.91-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
        Share
      </button>

      {/* Copy Link */}
      <button
        onClick={copyLink}
        title="Copy link"
        className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer"
        style={{ background: copied ? "rgba(139,92,246,0.15)" : "rgba(255,255,255,0.06)", color: copied ? "#8b5cf6" : "var(--text-secondary)", border: `1px solid ${copied ? "rgba(139,92,246,0.3)" : "rgba(255,255,255,0.1)"}` }}
      >
        {copied ? (
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
        )}
        {copied ? "Copied!" : "Copy Link"}
      </button>

      {/* Save / Bookmark */}
      <button
        onClick={() => setSaved(!saved)}
        title="Save article"
        className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer"
        style={{ background: saved ? "rgba(251,191,36,0.12)" : "rgba(255,255,255,0.06)", color: saved ? "#fbbf24" : "var(--text-secondary)", border: `1px solid ${saved ? "rgba(251,191,36,0.25)" : "rgba(255,255,255,0.1)"}` }}
      >
        <svg className="w-3.5 h-3.5" fill={saved ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
        </svg>
        {saved ? "Saved" : "Save"}
      </button>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   AUTHOR CARD
═══════════════════════════════════════════════════════ */
function AuthorCard({ post }: { post: DeepDivePost }) {
  const name = post.authorName || "Manjeet Singh";
  const initials = name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  const date = new Date(post.publishedAt).toLocaleDateString("en-IN", {
    year: "numeric", month: "long", day: "numeric",
  });

  return (
    <div
      className="flex items-center gap-4 p-5 rounded-2xl"
      style={{ background: "rgba(139,92,246,0.06)", border: "1px solid rgba(139,92,246,0.15)" }}
    >
      {/* Avatar */}
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0 text-white"
        style={{ background: "linear-gradient(135deg, #8b5cf6, #3b82f6)" }}
      >
        {initials}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>{name}</p>
        <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>Science Writer · ScienceHindi 360</p>
        <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>{date}</p>
      </div>
      <Link
        href="/about"
        className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
        style={{ background: "rgba(139,92,246,0.12)", color: "#a78bfa", border: "1px solid rgba(139,92,246,0.2)" }}
      >
        View Profile
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
      </Link>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   TABLE OF CONTENTS
═══════════════════════════════════════════════════════ */
function TableOfContents({ sections }: { sections: DeepDivePost["sections"] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            const idx = parseInt(id.replace("section-", ""));
            if (!isNaN(idx)) setActive(idx);
          }
        });
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );

    sections?.forEach((_, i) => {
      const el = document.getElementById(`section-${i}`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  if (!sections || sections.length === 0) return null;

  return (
    <nav
      className="p-5 rounded-2xl"
      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
    >
      <h3 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "var(--text-muted)" }}>
        Contents
      </h3>
      <ol className="space-y-1">
        {sections.map((section, i) => (
          <li key={section._key || i}>
            <a
              href={`#section-${i}`}
              className="flex items-start gap-2.5 py-1.5 px-2 rounded-lg text-xs transition-all"
              style={{
                color: active === i ? "#a78bfa" : "var(--text-muted)",
                background: active === i ? "rgba(139,92,246,0.08)" : "transparent",
                fontWeight: active === i ? "600" : "400",
              }}
            >
              <span
                className="flex-shrink-0 font-mono text-[10px] mt-0.5"
                style={{ color: active === i ? "#8b5cf6" : "var(--text-muted)" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="leading-snug">{section.headingHi}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

/* ═══════════════════════════════════════════════════════
   SECTION IMAGE — full-width, glow effect
═══════════════════════════════════════════════════════ */
function SectionImage({ url, alt }: { url: string; alt: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6 }}
      className="my-8 relative"
    >
      <div
        className="relative overflow-hidden rounded-2xl"
        style={{
          boxShadow: "0 0 0 1px rgba(139,92,246,0.15), 0 8px 40px rgba(0,0,0,0.5), 0 0 60px rgba(139,92,246,0.08)",
        }}
      >
        <img
          src={url}
          alt={alt}
          className="w-full object-cover"
          style={{ display: "block", maxHeight: "480px" }}
          loading="lazy"
        />
        {/* Subtle inner glow overlay */}
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{ boxShadow: "inset 0 0 40px rgba(0,0,0,0.3)" }}
        />
      </div>
      <p className="text-center text-xs mt-2" style={{ color: "var(--text-muted)" }}>
        {alt}
      </p>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   ARTICLE SECTION
═══════════════════════════════════════════════════════ */
function ArticleSection({
  section,
  index,
  showImage,
}: {
  section: NonNullable<DeepDivePost["sections"]>[number];
  index: number;
  showImage: boolean;
}) {
  return (
    <motion.section
      id={`section-${index}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
      className="scroll-mt-24"
    >
      {/* Section heading */}
      <h2
        className="text-2xl sm:text-3xl font-bold mb-6 leading-snug"
        style={{
          fontFamily: "var(--font-noto-sans-devanagari), system-ui",
          color: "var(--text-primary)",
          borderLeft: "3px solid #8b5cf6",
          paddingLeft: "1rem",
        }}
      >
        {section.headingHi}
      </h2>

      {/* Content paragraphs */}
      <div
        style={{
          fontFamily: "var(--font-noto-sans-devanagari), system-ui",
          color: "var(--text-secondary)",
          fontSize: "1.0625rem",
          lineHeight: "1.85",
        }}
      >
        {section.contentHi.split("\n").map((para, i) => {
          const trimmed = para.trim();
          if (!trimmed) return null;
          return (
            <p key={i} style={{ marginBottom: "1.25rem" }}>
              {trimmed}
            </p>
          );
        })}
      </div>

      {/* Section image — placed AFTER content, only shown if available & allowed */}
      {showImage && section.sectionImage?.asset?.url && (
        <SectionImage url={section.sectionImage.asset.url} alt={section.headingHi} />
      )}
    </motion.section>
  );
}

/* ═══════════════════════════════════════════════════════
   INFOGRAPHIC FACTS
═══════════════════════════════════════════════════════ */
function InfographicFacts({ facts }: { facts: string[] }) {
  if (!facts || facts.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="my-12"
    >
      <div
        className="rounded-2xl p-7 sm:p-8"
        style={{
          background: "linear-gradient(135deg, rgba(16,185,129,0.06) 0%, rgba(6,182,212,0.06) 100%)",
          border: "1px solid rgba(16,185,129,0.2)",
        }}
      >
        <h3
          className="text-xl font-bold mb-6 flex items-center gap-3"
          style={{ color: "#10b981" }}
        >
          <span
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.25)" }}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
            </svg>
          </span>
          Mind-Blowing Facts
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {facts.map((fact, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="flex items-start gap-3 p-3 rounded-xl"
              style={{ background: "rgba(16,185,129,0.05)" }}
            >
              <span
                className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold mt-0.5"
                style={{ background: "rgba(16,185,129,0.15)", color: "#10b981" }}
              >
                {i + 1}
              </span>
              <p
                className="text-sm leading-relaxed"
                style={{
                  fontFamily: "var(--font-noto-sans-devanagari), system-ui",
                  color: "var(--text-secondary)",
                }}
              >
                {fact}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

/* ═══════════════════════════════════════════════════════
   SCIENCE CORNER
═══════════════════════════════════════════════════════ */
function ScienceCorner({ terms }: { terms: DeepDivePost["scienceCorner"] }) {
  if (!terms || terms.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="my-12"
    >
      <h3
        className="text-xl font-bold mb-5 flex items-center gap-3"
        style={{ color: "var(--text-primary)" }}
      >
        <span
          className="w-9 h-9 rounded-full flex items-center justify-center"
          style={{ background: "rgba(139,92,246,0.12)", border: "1px solid rgba(139,92,246,0.2)" }}
        >
          <svg className="w-4 h-4" style={{ color: "#a78bfa" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
          </svg>
        </span>
        Science Corner
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {terms.map((item, i) => (
          <motion.div
            key={item._key || i}
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="p-4 rounded-xl"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(139,92,246,0.15)" }}
          >
            <p className="text-sm font-bold mb-2" style={{ color: "#a78bfa" }}>
              {item.term}
            </p>
            <p
              className="text-xs leading-relaxed"
              style={{ fontFamily: "var(--font-noto-sans-devanagari), system-ui", color: "var(--text-secondary)" }}
            >
              {item.definitionHi}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

/* ═══════════════════════════════════════════════════════
   FAQ
═══════════════════════════════════════════════════════ */
function FAQSection({ faq }: { faq: DeepDivePost["faq"] }) {
  if (!faq || faq.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="my-12"
    >
      <h3
        className="text-xl font-bold mb-5 flex items-center gap-3"
        style={{ color: "var(--text-primary)" }}
      >
        <span
          className="w-9 h-9 rounded-full flex items-center justify-center"
          style={{ background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)" }}
        >
          <svg className="w-4 h-4" style={{ color: "#60a5fa" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
          </svg>
        </span>
        Frequently Asked Questions
      </h3>

      <div className="space-y-3">
        {faq.map((item, i) => (
          <details
            key={item._key || i}
            className="group rounded-xl overflow-hidden"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <summary
              className="flex items-center justify-between cursor-pointer p-5 text-base font-semibold list-none select-none"
              style={{
                fontFamily: "var(--font-noto-sans-devanagari), system-ui",
                color: "var(--text-primary)",
              }}
            >
              {item.questionHi}
              <svg
                className="w-4 h-4 group-open:rotate-180 transition-transform flex-shrink-0 ml-4"
                style={{ color: "var(--text-muted)" }}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </summary>
            <div
              className="px-5 pb-5 text-base leading-relaxed"
              style={{
                fontFamily: "var(--font-noto-sans-devanagari), system-ui",
                color: "var(--text-secondary)",
                borderTop: "1px solid rgba(255,255,255,0.06)",
                paddingTop: "1rem",
              }}
            >
              {item.answerHi}
            </div>
          </details>
        ))}
      </div>
    </motion.section>
  );
}

/* ═══════════════════════════════════════════════════════
   TAGS
═══════════════════════════════════════════════════════ */
function Tags({ tags }: { tags?: string[] }) {
  if (!tags || tags.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider"
          style={{ background: "rgba(139,92,246,0.1)", color: "#a78bfa", border: "1px solid rgba(139,92,246,0.2)" }}
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   JSON-LD STRUCTURED DATA
═══════════════════════════════════════════════════════ */
function StructuredData({ post }: { post: DeepDivePost }) {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.titleHindi,
    description: post.metaDescriptionHi || "",
    author: { "@type": "Person", name: post.authorName || "Manjeet Singh" },
    publisher: { "@type": "Organization", name: "ScienceHindi 360" },
    datePublished: post.publishedAt,
    image: post.mainImage?.asset?.url || "",
    inLanguage: "hi",
  };

  const faqSchema =
    post.faq && post.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: post.faq.map((item) => ({
            "@type": "Question",
            name: item.questionHi,
            acceptedAnswer: { "@type": "Answer", text: item.answerHi },
          })),
        }
      : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}
    </>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN ARTICLE LAYOUT
═══════════════════════════════════════════════════════ */
function DeepDiveArticle({ post }: { post: DeepDivePost }) {
  const imageUrl = post.mainImage?.asset?.url;
  const hasSections = post.sections && post.sections.length > 0;

  return (
    <article className="pt-6 pb-16">
      <StructuredData post={post} />

      {/* Back navigation */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm mb-8 transition-colors group"
        style={{ color: "var(--text-muted)" }}
      >
        <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        Back to Blog
      </Link>

      <div className="flex gap-12 xl:gap-16 relative">
        {/* ── MAIN COLUMN ── */}
        <div className="flex-1 min-w-0">

          {/* HEADER */}
          <header className="mb-8">
            {/* Category + Date */}
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <span
                className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest"
                style={{ background: "linear-gradient(135deg, rgba(139,92,246,0.2), rgba(59,130,246,0.2))", color: "#a78bfa", border: "1px solid rgba(139,92,246,0.3)" }}
              >
                Deep Dive
              </span>
              <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                {new Date(post.publishedAt).toLocaleDateString("en-IN", {
                  year: "numeric", month: "long", day: "numeric",
                })}
              </span>
            </div>

            {/* Title */}
            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4"
              style={{
                fontFamily: "var(--font-noto-sans-devanagari), system-ui",
                color: "var(--text-primary)",
                letterSpacing: "-0.01em",
              }}
            >
              {post.titleHindi}
            </h1>

            {/* Meta description — subtitle */}
            {post.metaDescriptionHi && (
              <p
                className="text-lg leading-relaxed mb-6"
                style={{
                  fontFamily: "var(--font-noto-sans-devanagari), system-ui",
                  color: "var(--text-secondary)",
                }}
              >
                {post.metaDescriptionHi}
              </p>
            )}

            {/* Tags */}
            <Tags tags={post.tags} />
          </header>

          {/* HERO IMAGE — full width, after author, before article body */}
          {imageUrl && (
            <motion.div
              initial={{ opacity: 0, scale: 0.99 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="mt-8 relative overflow-hidden rounded-2xl"
              style={{
                boxShadow: "0 0 0 1px rgba(139,92,246,0.2), 0 20px 80px rgba(0,0,0,0.5), 0 0 100px rgba(139,92,246,0.06)",
              }}
            >
              <img
                src={imageUrl}
                alt={post.titleHindi}
                className="w-full object-cover"
                style={{ display: "block", maxHeight: "520px" }}
                loading="eager"
              />
              {/* Subtle inner shadow */}
              <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: "inset 0 0 60px rgba(0,0,0,0.25)" }} />
            </motion.div>
          )}

          {/* DIVIDER */}
          <div className="my-10 flex items-center gap-4">
            <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.07)" }} />
            <span className="text-xs uppercase tracking-widest font-semibold" style={{ color: "var(--text-muted)" }}>
              Article Begins
            </span>
            <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.07)" }} />
          </div>

          {/* SECTIONS */}
          {hasSections ? (
            <div className="space-y-12">
              {post.sections!.map((section, i) => (
                <ArticleSection
                  key={section._key || i}
                  section={section}
                  index={i}
                  showImage={i > 0} // Only show section images from section 2 onwards (not section 1 which follows hero)
                />
              ))}
            </div>
          ) : (
            <div
              style={{
                fontFamily: "var(--font-noto-sans-devanagari), system-ui",
                color: "var(--text-secondary)",
                fontSize: "1.0625rem",
                lineHeight: "1.9",
              }}
            >
              {post.content.split("\n").map((para, i) => {
                const trimmed = para.trim();
                if (!trimmed) return null;
                if (trimmed.startsWith("## ")) return (
                  <h2 key={i} className="text-2xl font-bold mt-10 mb-4" style={{ color: "var(--text-primary)" }}>
                    {trimmed.slice(3)}
                  </h2>
                );
                return <p key={i} style={{ marginBottom: "1.25rem" }}>{trimmed}</p>;
              })}
            </div>
          )}

          {/* CONCLUSION */}
          {post.conclusion && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="my-12 relative rounded-2xl p-8 overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(139,92,246,0.08) 0%, rgba(59,130,246,0.06) 100%)",
                border: "1px solid rgba(139,92,246,0.18)",
              }}
            >
              {/* Quote mark */}
              <div
                className="text-6xl font-serif leading-none mb-4 select-none"
                style={{ color: "rgba(139,92,246,0.25)", fontFamily: "Georgia, serif" }}
              >
                &ldquo;
              </div>
              <p
                className="text-lg sm:text-xl leading-relaxed"
                style={{
                  fontFamily: "var(--font-noto-sans-devanagari), system-ui",
                  color: "var(--text-secondary)",
                  fontStyle: "italic",
                }}
              >
                {post.conclusion}
              </p>
              <div
                className="text-6xl font-serif leading-none text-right mt-2 select-none"
                style={{ color: "rgba(139,92,246,0.25)", fontFamily: "Georgia, serif" }}
              >
                &rdquo;
              </div>
            </motion.div>
          )}

          {/* FACTS */}
          <InfographicFacts facts={post.infographicFacts} />

          {/* SCIENCE CORNER */}
          <ScienceCorner terms={post.scienceCorner} />

          {/* FAQ */}
          <FAQSection faq={post.faq} />

          {/* SHARE BAR — bottom */}
          <div
            className="mt-12 pt-8 pb-4"
            style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
          >
            <p className="text-sm font-semibold mb-4" style={{ color: "var(--text-muted)" }}>
              Share this article
            </p>
            <ShareBar title={post.titleHindi} />
          </div>

          {/* AUTHOR BIO — bottom of article */}
          <div className="mt-8">
            <AuthorCard post={post} />
          </div>
        </div>

        {/* ── SIDEBAR ── */}
        <aside className="hidden lg:block w-64 xl:w-72 shrink-0">
          <div className="sticky top-24 space-y-5">

            {/* Table of Contents */}
            {hasSections && <TableOfContents sections={post.sections} />}

            {/* Share */}
            <div
              className="p-5 rounded-2xl"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <h3 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "var(--text-muted)" }}>
                Share
              </h3>
              <div className="flex flex-col gap-2">
                <ShareBar title={post.titleHindi} />
              </div>
            </div>

            {/* Quick Facts */}
            {post.infographicFacts && post.infographicFacts.length > 0 && (
              <div
                className="p-5 rounded-2xl"
                style={{ background: "rgba(16,185,129,0.04)", border: "1px solid rgba(16,185,129,0.15)" }}
              >
                <h3 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#10b981" }}>
                  Quick Facts
                </h3>
                <ul className="space-y-3">
                  {post.infographicFacts.slice(0, 4).map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                      <span className="text-[#10b981] mt-0.5 flex-shrink-0">✦</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Explore Tools CTA */}
            <div
              className="p-5 rounded-2xl"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <h3 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "var(--text-muted)" }}>
                Explore Tools
              </h3>
              <div className="space-y-1.5">
                {[
                  { name: "ISS Tracker", href: "/tools/iss-tracker", emoji: "🛰️" },
                  { name: "Orbit Simulator", href: "/tools/orbit-simulator", emoji: "🌍" },
                  { name: "Universe Explorer", href: "/universe", emoji: "🌌" },
                ].map((tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className="flex items-center gap-2.5 p-2.5 rounded-xl transition-all hover:bg-white/5 group"
                  >
                    <span>{tool.emoji}</span>
                    <span className="text-xs font-medium group-hover:text-white transition-colors" style={{ color: "var(--text-secondary)" }}>
                      {tool.name}
                    </span>
                    <svg className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ color: "var(--text-muted)" }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
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

/* ═══════════════════════════════════════════════════════
   PAGE WRAPPER
═══════════════════════════════════════════════════════ */
export default function BlogArticlePage() {
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
            <p className="text-7xl font-bold mb-4" style={{ color: "rgba(139,92,246,0.3)" }}>404</p>
            <p className="text-lg mb-6" style={{ color: "var(--text-secondary)" }}>Article not found.</p>
            <Link href="/blog" className="inline-flex items-center gap-2 text-sm hover:gap-3 transition-all" style={{ color: "#a78bfa" }}>
              ← Back to Blog
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
              className="w-9 h-9 rounded-full animate-spin"
              style={{ border: "2px solid rgba(139,92,246,0.2)", borderTopColor: "#8b5cf6" }}
            />
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>Loading article...</p>
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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {post && <DeepDiveArticle post={post} />}
        </div>
      </main>
      <Footer />
    </>
  );
}
