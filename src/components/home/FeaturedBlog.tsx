"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import type { DeepDivePost } from "@/types/deep-dive";

interface FeaturedBlogProps {
  lang: "en" | "hi";
}

const text = {
  en: {
    badge: "From the Blog",
    title: "Latest Space Stories",
    subtitle: "Deep dives into astrophysics, missions, and the science shaping our future",
    readMore: "Read Article",
    viewAll: "View All Articles",
    deepDive: "Deep Dive",
  },
  hi: {
    badge: "ब्लॉग से",
    title: "नवीनतम अंतरिक्ष कहानियाँ",
    subtitle: "खगोल भौतिकी, मिशनों और हमारे भविष्य को आकार देने वाले विज्ञान की गहन जानकारी",
    readMore: "लेख पढ़ें",
    viewAll: "सभी लेख देखें",
    deepDive: "गहन विश्लेषण",
  },
};

export default function FeaturedBlog({ lang }: FeaturedBlogProps) {
  const t = text[lang];
  const [posts, setPosts] = useState<DeepDivePost[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("/api/deep-dive");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) setPosts(data.slice(0, 5));
        }
      } catch {
        // Silently fail
      }
    }
    fetchPosts();
  }, []);

  const featured = posts[0];
  const recent = posts.slice(1, 5);

  return (
    <section className="py-16 sm:py-24">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
            bg-neon-blue/10 border border-neon-blue/20 mb-5"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-neon-blue" />
          <span className="text-xs font-medium text-neon-blue tracking-wide">{t.badge}</span>
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

      {/* No posts yet */}
      {posts.length === 0 && (
        <div className="text-center py-8">
          <p className="text-sm text-text-muted">
            {lang === "en" ? "Articles coming soon..." : "लेख जल्द आ रहे हैं..."}
          </p>
        </div>
      )}

      {posts.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
          {/* Featured post — large card */}
          {featured && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-3"
            >
              <Link href={`/blog/${featured.slug.current}`} className="block group h-full">
                <div className="relative h-full min-h-[320px] rounded-2xl overflow-hidden border border-white/[0.07] hover:border-white/[0.15] transition-all duration-300">
                  {featured.mainImage?.asset?.url ? (
                    <img
                      src={featured.mainImage.asset.url}
                      alt={featured.titleEnglish}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <div
                      className="absolute inset-0"
                      style={{ background: "linear-gradient(135deg, #1a0533 0%, #0c1445 50%, #050510 100%)" }}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(5,5,16,0.95)] via-[rgba(5,5,16,0.5)] to-transparent" />

                  <div className="relative h-full flex flex-col justify-end p-6 sm:p-8">
                    <span className="inline-flex self-start items-center gap-1.5 px-2.5 py-1 rounded-full bg-neon-cyan/15 text-neon-cyan border border-neon-cyan/25 text-[10px] font-semibold">
                      {t.deepDive}
                    </span>
                    <h3
                      className="text-lg sm:text-xl font-bold text-text-primary mt-3 mb-1 group-hover:text-white transition-colors"
                      style={{ fontFamily: "var(--font-noto-sans-devanagari), var(--font-space-grotesk), system-ui" }}
                    >
                      {lang === "hi" ? featured.titleHindi : featured.titleEnglish}
                    </h3>
                    <p
                      className="text-sm text-text-muted line-clamp-1 mb-3"
                      style={{ fontFamily: "var(--font-space-grotesk)" }}
                    >
                      {lang === "hi" ? featured.titleEnglish : featured.titleHindi}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-text-muted">
                      <span>{featured.authorName || "Manjeet Singh"}</span>
                      <span>·</span>
                      <span>{featured.sourceName}</span>
                      <span>·</span>
                      <span>
                        {new Date(featured.publishedAt).toLocaleDateString(
                          lang === "hi" ? "hi-IN" : "en-US",
                          { month: "short", day: "numeric" }
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {/* Recent posts — stacked cards */}
          {recent.length > 0 && (
            <div className="lg:col-span-2 flex flex-col gap-4">
              {recent.map((post, i) => (
                <motion.div
                  key={post._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                >
                  <Link href={`/blog/${post.slug.current}`} className="block group">
                    <div className="p-4 rounded-xl bg-[rgba(17,17,40,0.55)] backdrop-blur-xl border border-white/[0.07] hover:border-white/[0.15] transition-all duration-300">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full mt-1.5 shrink-0 bg-neon-cyan" />
                        <div className="flex-1 min-w-0">
                          <h4
                            className="text-sm font-medium text-text-primary group-hover:text-white transition-colors line-clamp-2 leading-snug"
                            style={{ fontFamily: "var(--font-noto-sans-devanagari), var(--font-space-grotesk), system-ui" }}
                          >
                            {lang === "hi" ? post.titleHindi : post.titleEnglish}
                          </h4>
                          <div className="flex items-center gap-2 mt-2 text-[11px] text-text-muted">
                            <span>{post.sourceName}</span>
                            <span>·</span>
                            <span>
                              {new Date(post.publishedAt).toLocaleDateString(
                                lang === "hi" ? "hi-IN" : "en-US",
                                { month: "short", day: "numeric" }
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* View all CTA */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="text-center mt-10"
      >
        <Link
          href="/blog"
          className="
            inline-flex items-center gap-2 px-6 py-3 rounded-xl
            text-sm font-semibold
            text-neon-blue border border-neon-blue/30
            bg-neon-blue/[0.05]
            hover:bg-neon-blue/[0.1] hover:border-neon-blue/50
            shadow-[0_0_15px_rgba(59,130,246,0.1)]
            hover:shadow-[0_0_25px_rgba(59,130,246,0.2)]
            transition-all duration-300
          "
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
          </svg>
          {t.viewAll}
        </Link>
      </motion.div>
    </section>
  );
}
