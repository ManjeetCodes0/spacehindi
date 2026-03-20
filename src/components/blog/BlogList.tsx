"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { blogPosts, categoryColors, type BlogPost } from "@/data/blog";
import { Badge } from "@/components/ui";

interface BlogListProps {
  lang: "en" | "hi";
}

const text = {
  en: {
    badge: "Science Stories & Analysis",
    title: "The Blog",
    subtitle: "Deep dives into space science, astrophysics, and India's role in the cosmos.",
    readMore: "Read Article",
    min: "min read",
    featured: "Featured",
  },
  hi: {
    badge: "विज्ञान कहानियाँ और विश्लेषण",
    title: "ब्लॉग",
    subtitle: "अंतरिक्ष विज्ञान, खगोल भौतिकी, और ब्रह्मांड में भारत की भूमिका पर गहन लेख।",
    readMore: "लेख पढ़ें",
    min: "मिनट पठन",
    featured: "विशेष",
  },
};

function FeaturedCard({ post, lang }: { post: BlogPost; lang: "en" | "hi" }) {
  const t = text[lang];
  const colors = categoryColors[post.category];

  return (
    <Link href={`/blog/${post.slug}`} className="block group">
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
            <div
              className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
              style={{ background: post.image }}
            />
            {/* Soft infographic overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[rgba(17,17,40,0.8)] hidden lg:block" />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(17,17,40,0.9)] via-transparent to-transparent lg:hidden" />

            {/* Featured badge */}
            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neon-violet/20 border border-neon-violet/30 text-xs font-semibold text-neon-violet">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                </svg>
                {t.featured}
              </span>
            </div>

            {/* Placeholder astronaut silhouette for the image area */}
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
              <svg className="w-24 h-24 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5a17.92 17.92 0 01-8.716-2.247m0 0A8.966 8.966 0 013 12c0-1.264.26-2.467.732-3.558" />
              </svg>
            </div>
          </div>

          {/* Content side */}
          <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4">
              <Badge variant={colors.badge}>
                {post.categoryLabel[lang]}
              </Badge>
              <span className="text-xs text-text-muted">
                {post.readingTime} {t.min}
              </span>
              <span className="text-xs text-text-muted">•</span>
              <span className="text-xs text-text-muted">{post.date}</span>
            </div>

            <h2
              className="text-2xl sm:text-3xl font-bold text-text-primary leading-tight mb-2 group-hover:text-white transition-colors"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              {post.title[lang]}
            </h2>

            {/* Show the other language title as subtitle */}
            <p
              className="text-sm text-text-muted mb-4"
              style={{ fontFamily: "var(--font-noto-sans-devanagari)" }}
            >
              {post.title[lang === "en" ? "hi" : "en"]}
            </p>

            <p className="text-sm text-text-secondary leading-relaxed mb-6">
              {post.excerpt[lang]}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-neon-violet to-neon-blue flex items-center justify-center text-[10px] font-bold text-white">
                  {post.author.name.charAt(0)}
                </div>
                <span className="text-xs text-text-muted">{post.author.name}</span>
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

function PostCard({ post, lang, index }: { post: BlogPost; lang: "en" | "hi"; index: number }) {
  const t = text[lang];
  const colors = categoryColors[post.category];

  return (
    <Link href={`/blog/${post.slug}`} className="block group h-full">
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ delay: index * 0.06, duration: 0.4, ease: "easeOut" as const }}
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
          <div
            className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
            style={{ background: post.image }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(17,17,40,0.95)] via-[rgba(17,17,40,0.3)] to-transparent" />

          {/* Placeholder icon */}
          <div className="absolute inset-0 flex items-center justify-center opacity-15">
            <svg className="w-16 h-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
            </svg>
          </div>

          {/* Category over image */}
          <div className="absolute bottom-3 left-3">
            <Badge variant={colors.badge}>
              {post.categoryLabel[lang]}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-5">
          <div className="flex items-center gap-2 text-xs text-text-muted mb-3">
            <span>{post.readingTime} {t.min}</span>
            <span>•</span>
            <span>{post.date}</span>
          </div>

          <h3
            className="text-base sm:text-lg font-semibold text-text-primary leading-snug mb-1.5 group-hover:text-white transition-colors line-clamp-2"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            {post.title[lang]}
          </h3>

          <p
            className="text-xs text-text-muted mb-3 line-clamp-1"
            style={{ fontFamily: "var(--font-noto-sans-devanagari)" }}
          >
            {post.title[lang === "en" ? "hi" : "en"]}
          </p>

          <p className="text-sm text-text-muted leading-relaxed line-clamp-2 mb-4">
            {post.excerpt[lang]}
          </p>

          {/* Footer */}
          <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/[0.04]">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-neon-violet to-neon-blue flex items-center justify-center text-[9px] font-bold text-white">
                {post.author.name.charAt(0)}
              </div>
              <span className="text-[11px] text-text-muted">{post.author.name}</span>
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
  const featured = blogPosts.find((p) => p.featured);
  const rest = blogPosts.filter((p) => !p.featured);

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

      {/* Featured post */}
      {featured && (
        <div className="mb-8">
          <FeaturedCard post={featured} lang={lang} />
        </div>
      )}

      {/* Grid of remaining posts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {rest.map((post, i) => (
          <PostCard key={post.slug} post={post} lang={lang} index={i} />
        ))}
      </div>
    </section>
  );
}
