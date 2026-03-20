"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { blogPosts, categoryColors } from "@/data/blog";
import { Badge } from "@/components/ui";

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
    min: "min read",
  },
  hi: {
    badge: "ब्लॉग से",
    title: "नवीनतम अंतरिक्ष कहानियाँ",
    subtitle: "खगोल भौतिकी, मिशनों और हमारे भविष्य को आकार देने वाले विज्ञान की गहन जानकारी",
    readMore: "लेख पढ़ें",
    viewAll: "सभी लेख देखें",
    min: "मिनट पठन",
  },
};

export default function FeaturedBlog({ lang }: FeaturedBlogProps) {
  const t = text[lang];
  const featured = blogPosts.filter((p) => p.featured).slice(0, 1);
  const recent = blogPosts.filter((p) => !p.featured).slice(0, 4);

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

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* Featured post — large card */}
        {featured.map((post) => {
          const catColor = categoryColors[post.category];
          return (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-3"
            >
              <Link href={`/blog/${post.slug}`} className="block group h-full">
                <div
                  className="
                    relative h-full min-h-[320px] rounded-2xl overflow-hidden
                    border border-white/[0.07]
                    hover:border-white/[0.15]
                    transition-all duration-300
                  "
                >
                  {/* BG gradient */}
                  <div
                    className="absolute inset-0"
                    style={{ background: post.image }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(5,5,16,0.95)] via-[rgba(5,5,16,0.5)] to-transparent" />

                  {/* Content */}
                  <div className="relative h-full flex flex-col justify-end p-6 sm:p-8">
                    <Badge variant={catColor.badge}>{post.categoryLabel[lang]}</Badge>
                    <h3
                      className="text-xl sm:text-2xl font-bold text-text-primary mt-3 mb-2 group-hover:text-white transition-colors"
                      style={{ fontFamily: "var(--font-space-grotesk)" }}
                    >
                      {post.title[lang]}
                    </h3>
                    <p className="text-sm text-text-secondary line-clamp-2 mb-4">
                      {post.excerpt[lang]}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-text-muted">
                      <span>{post.author.name}</span>
                      <span>·</span>
                      <span>{post.readingTime} {t.min}</span>
                      <span>·</span>
                      <span>{new Date(post.date).toLocaleDateString(lang === "hi" ? "hi-IN" : "en-US", { month: "short", day: "numeric" })}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}

        {/* Recent posts — stacked cards */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {recent.map((post, i) => {
            const catColor = categoryColors[post.category];
            return (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
              >
                <Link href={`/blog/${post.slug}`} className="block group">
                  <div
                    className="
                      p-4 rounded-xl
                      bg-[rgba(17,17,40,0.55)] backdrop-blur-xl
                      border border-white/[0.07]
                      hover:border-white/[0.15]
                      transition-all duration-300
                    "
                  >
                    <div className="flex items-start gap-3">
                      {/* Color dot */}
                      <div
                        className="w-2 h-2 rounded-full mt-1.5 shrink-0"
                        style={{ backgroundColor: catColor.glow.replace("0.3", "1") }}
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-text-primary group-hover:text-white transition-colors line-clamp-2 leading-snug">
                          {post.title[lang]}
                        </h4>
                        <div className="flex items-center gap-2 mt-2 text-[11px] text-text-muted">
                          <span>{post.readingTime} {t.min}</span>
                          <span>·</span>
                          <span>{post.categoryLabel[lang]}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>

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
