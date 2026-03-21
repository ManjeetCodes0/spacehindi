"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import type { DeepDivePost } from "@/types/deep-dive";

interface BlogListProps {
  lang: "en" | "hi";
}

const text = {
  en: {
    badge: "Science Stories & Analysis",
    title: "The Blog",
    subtitle: "Deep dives into space science, astrophysics, and India's role in the cosmos.",
    readMore: "Read Article",
    loading: "Loading articles...",
    empty: "No articles yet. Check back soon!",
    deepDive: "Deep Dive",
  },
  hi: {
    badge: "विज्ञान कहानियाँ और विश्लेषण",
    title: "ब्लॉग",
    subtitle: "अंतरिक्ष विज्ञान, खगोल भौतिकी, और ब्रह्मांड में भारत की भूमिका पर गहन लेख।",
    readMore: "लेख पढ़ें",
    loading: "लेख लोड हो रहे हैं...",
    empty: "अभी कोई लेख नहीं। जल्द वापस आएं!",
    deepDive: "गहन विश्लेषण",
  },
};

function FeaturedCard({ post, lang }: { post: DeepDivePost; lang: "en" | "hi" }) {
  const t = text[lang];
  const imageUrl = post.mainImage?.asset?.url;
  const contentForExcerpt = (lang === "en" && post.contentEnglish) ? post.contentEnglish : post.content;
  const excerpt = contentForExcerpt?.slice(0, 200) + "...";

  return (
    <Link href={`/blog/${post.slug.current}`} className="block group">
      <motion.article
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="
          relative overflow-hidden rounded-2xl
          bg-[rgba(17,17,40,0.5)] backdrop-blur-xl
          border border-white/[0.07]
          hover:border-neon-violet/30
          transition-all duration-400
          hover:shadow-[0_0_40px_rgba(139,92,246,0.15)]
        "
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Image side */}
          <div className="relative h-56 sm:h-64 lg:h-full min-h-[280px] overflow-hidden">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={post.titleEnglish}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div
                className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                style={{ background: "linear-gradient(135deg, #1a0533 0%, #0c1445 50%, #050510 100%)" }}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[rgba(17,17,40,0.8)] hidden lg:block" />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(17,17,40,0.9)] via-transparent to-transparent lg:hidden" />

            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neon-cyan/20 border border-neon-cyan/30 text-xs font-semibold text-neon-cyan">
                {t.deepDive}
              </span>
            </div>
          </div>

          {/* Content side */}
          <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs text-text-muted">{post.sourceName}</span>
              <span className="text-xs text-text-muted">•</span>
              <span className="text-xs text-text-muted">
                {new Date(post.publishedAt).toLocaleDateString(
                  lang === "hi" ? "hi-IN" : "en-IN",
                  { year: "numeric", month: "short", day: "numeric" }
                )}
              </span>
            </div>

            <h2
              className="text-xl sm:text-2xl font-bold text-text-primary leading-tight mb-1 group-hover:text-white transition-colors"
              style={{ fontFamily: "var(--font-noto-sans-devanagari), var(--font-space-grotesk), system-ui" }}
            >
              {lang === "hi" ? post.titleHindi : post.titleEnglish}
            </h2>

            <p
              className="text-sm text-text-muted mb-4"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              {lang === "hi" ? post.titleEnglish : post.titleHindi}
            </p>

            <p
              className="text-sm text-text-secondary leading-relaxed mb-6 line-clamp-3"
              style={{ fontFamily: "var(--font-noto-sans-devanagari), var(--font-inter), system-ui" }}
            >
              {excerpt}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-neon-violet to-neon-blue flex items-center justify-center text-[10px] font-bold text-white">
                  {(post.authorName || "M").charAt(0)}
                </div>
                <span className="text-xs text-text-muted">{post.authorName || "Manjeet Singh"}</span>
              </div>

              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-neon-violet group-hover:gap-2.5 transition-all">
                {t.readMore}
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}

function PostCard({ post, lang, index }: { post: DeepDivePost; lang: "en" | "hi"; index: number }) {
  const t = text[lang];
  const imageUrl = post.mainImage?.asset?.url;
  const contentForExcerpt = (lang === "en" && post.contentEnglish) ? post.contentEnglish : post.content;
  const excerpt = contentForExcerpt?.slice(0, 120) + "...";

  return (
    <Link href={`/blog/${post.slug.current}`} className="block group h-full">
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ delay: index * 0.06, duration: 0.4 }}
        className="
          h-full flex flex-col overflow-hidden rounded-2xl
          bg-[rgba(17,17,40,0.5)] backdrop-blur-xl
          border border-white/[0.07]
          hover:border-neon-violet/30
          transition-all duration-400
          hover:shadow-[0_0_30px_rgba(139,92,246,0.12)]
        "
      >
        {/* Image */}
        <div className="relative h-44 sm:h-48 overflow-hidden">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={post.titleEnglish}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div
              className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
              style={{ background: "linear-gradient(135deg, #0c1445 0%, #1a0533 50%, #050510 100%)" }}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(17,17,40,0.95)] via-[rgba(17,17,40,0.3)] to-transparent" />

          <div className="absolute bottom-3 left-3">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-neon-cyan/15 text-neon-cyan border border-neon-cyan/25">
              {post.sourceName || t.deepDive}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-5">
          <div className="flex items-center gap-2 text-xs text-text-muted mb-3">
            <span>
              {new Date(post.publishedAt).toLocaleDateString("en-IN", {
                year: "numeric", month: "short", day: "numeric",
              })}
            </span>
          </div>

          <h3
            className="text-sm sm:text-base font-semibold text-text-primary leading-snug mb-1 group-hover:text-white transition-colors line-clamp-2"
            style={{ fontFamily: "var(--font-noto-sans-devanagari), var(--font-space-grotesk), system-ui" }}
          >
            {lang === "hi" ? post.titleHindi : post.titleEnglish}
          </h3>

          <p
            className="text-xs text-text-muted mb-3 line-clamp-1"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            {lang === "hi" ? post.titleEnglish : post.titleHindi}
          </p>

          <p
            className="text-sm text-text-muted leading-relaxed line-clamp-2 mb-4"
            style={{ fontFamily: "var(--font-noto-sans-devanagari), var(--font-inter), system-ui" }}
          >
            {excerpt}
          </p>

          {/* Footer */}
          <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/[0.04]">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-neon-violet to-neon-blue flex items-center justify-center text-[9px] font-bold text-white">
                {(post.authorName || "M").charAt(0)}
              </div>
              <span className="text-[11px] text-text-muted">{post.authorName || "Manjeet Singh"}</span>
            </div>
            <svg
              className="w-4 h-4 text-text-muted group-hover:text-neon-violet group-hover:translate-x-1 transition-all"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}

export default function BlogList({ lang }: BlogListProps) {
  const t = text[lang];
  const [posts, setPosts] = useState<DeepDivePost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("/api/deep-dive");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) setPosts(data);
        }
      } catch {
        // Silently fail — show empty state
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  const featured = posts[0]; // Most recent = featured
  const rest = posts.slice(1);

  return (
    <section className="py-8 sm:py-12">
      {/* Section header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
            bg-neon-pink/10 border border-neon-pink/20 mb-5"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-neon-pink" />
          <span className="text-xs font-medium text-neon-pink tracking-wide">
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

      {/* Loading */}
      {loading && (
        <div className="flex flex-col items-center gap-4 py-16">
          <div className="w-8 h-8 border-2 border-neon-violet/30 border-t-neon-violet rounded-full animate-spin" />
          <p className="text-sm text-text-muted">{t.loading}</p>
        </div>
      )}

      {/* Empty state */}
      {!loading && posts.length === 0 && (
        <div className="text-center py-16">
          <p className="text-lg text-text-muted">{t.empty}</p>
        </div>
      )}

      {/* Featured post */}
      {!loading && featured && (
        <div className="mb-8">
          <FeaturedCard post={featured} lang={lang} />
        </div>
      )}

      {/* Grid of remaining posts */}
      {!loading && rest.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {rest.map((post, i) => (
            <PostCard key={post._id} post={post} lang={lang} index={i} />
          ))}
        </div>
      )}
    </section>
  );
}
