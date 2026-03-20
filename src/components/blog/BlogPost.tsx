"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { categoryColors, type BlogPost as BlogPostType, sampleArticleContent } from "@/data/blog";
import { Badge } from "@/components/ui";
import InfoBox from "./InfoBox";

interface BlogPostProps {
  post: BlogPostType;
  lang: "en" | "hi";
}

const text = {
  en: {
    back: "Back to Blog",
    min: "min read",
    trendingTools: "Trending Tools",
    relatedGear: "Related Gear",
    shareArticle: "Share Article",
    toc: "Contents",
  },
  hi: {
    back: "ब्लॉग पर वापस",
    min: "मिनट पठन",
    trendingTools: "ट्रेंडिंग टूल्स",
    relatedGear: "संबंधित गियर",
    shareArticle: "लेख साझा करें",
    toc: "विषय सूची",
  },
};

const trendingTools = [
  { name: { en: "Weight Calculator", hi: "वज़न कैलकुलेटर" }, href: "/tools/weight-calculator", icon: "🪐" },
  { name: { en: "Space Age", hi: "अंतरिक्ष आयु" }, href: "/tools", icon: "⏳" },
  { name: { en: "Light-Year Converter", hi: "प्रकाश-वर्ष कनवर्टर" }, href: "/tools", icon: "⚡" },
];

const relatedGear = [
  { name: { en: "Celestron NexStar 8SE", hi: "सेलेस्ट्रॉन नेक्सस्टार 8SE" }, price: "$1,199", href: "/shop" },
  { name: { en: "Astronomy Binoculars", hi: "एस्ट्रोनॉमी दूरबीन" }, price: "$89", href: "/shop" },
  { name: { en: "Star Map Poster", hi: "स्टार मैप पोस्टर" }, price: "$24", href: "/shop" },
];

export default function BlogPostTemplate({ post, lang }: BlogPostProps) {
  const t = text[lang];
  const colors = categoryColors[post.category];
  const content = sampleArticleContent[lang];

  return (
    <article className="py-8 sm:py-12">
      {/* Back link */}
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-8"
      >
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text-secondary transition-colors group"
        >
          <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          {t.back}
        </Link>
      </motion.div>

      {/* Layout: Content + Sidebar */}
      <div className="flex gap-10 lg:gap-14 relative">
        {/* Main content column */}
        <div className="flex-1 min-w-0 max-w-3xl">
          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <div className="flex items-center gap-3 mb-5">
              <Badge variant={colors.badge}>
                {post.categoryLabel[lang]}
              </Badge>
              <span className="text-xs text-text-muted">
                {post.readingTime} {t.min}
              </span>
              <span className="text-xs text-text-muted">•</span>
              <span className="text-xs text-text-muted">{post.date}</span>
            </div>

            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary leading-tight mb-3"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              {post.title[lang]}
            </h1>

            <p
              className="text-lg text-text-muted mb-6"
              style={{ fontFamily: "var(--font-noto-sans-devanagari)" }}
            >
              {post.title[lang === "en" ? "hi" : "en"]}
            </p>

            {/* Author row */}
            <div className="flex items-center gap-3 pb-6 border-b border-white/[0.06]">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-violet to-neon-blue flex items-center justify-center text-sm font-bold text-white">
                {post.author.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-medium text-text-primary">{post.author.name}</p>
                <p className="text-xs text-text-muted">{post.date}</p>
              </div>
            </div>
          </motion.header>

          {/* Hero image area */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="relative h-56 sm:h-72 lg:h-80 rounded-2xl overflow-hidden mb-10 border border-white/[0.06]"
          >
            <div className="absolute inset-0" style={{ background: post.image }} />
            <div className="absolute inset-0 bg-gradient-to-t from-space-black/50 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
              <svg className="w-20 h-20 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
              </svg>
            </div>
          </motion.div>

          {/* Article body — Tailwind Typography */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="
              prose prose-invert prose-lg max-w-none
              prose-headings:font-bold prose-headings:tracking-tight
              prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:text-text-primary
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-text-primary
              prose-p:text-text-secondary prose-p:leading-relaxed
              prose-strong:text-text-primary prose-strong:font-semibold
              prose-blockquote:border-neon-violet/40 prose-blockquote:bg-neon-violet/[0.03]
              prose-blockquote:rounded-r-xl prose-blockquote:py-4 prose-blockquote:px-6
              prose-blockquote:not-italic prose-blockquote:text-text-secondary
              prose-a:text-neon-violet prose-a:no-underline hover:prose-a:underline
              prose-code:text-neon-cyan prose-code:bg-space-elevated prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
              prose-hr:border-white/[0.06]
            "
            style={{ fontFamily: "var(--font-inter), var(--font-noto-sans-devanagari), system-ui" }}
          >
            {/* Render markdown-like content as HTML */}
            <div dangerouslySetInnerHTML={{ __html: markdownToHtml(content) }} />
          </motion.div>

          {/* Inline InfoBox examples */}
          <InfoBox
            variant="blue"
            titleEn="What is a Deep Field Image?"
            titleHi="डीप फील्ड छवि क्या है?"
            lang={lang}
          >
            {lang === "en"
              ? "A deep field image is a photograph of a small area of sky, taken with an extremely long exposure time. The extended exposure allows the telescope to collect light from very faint, distant objects — often galaxies billions of light-years away."
              : "डीप फील्ड छवि आकाश के एक छोटे क्षेत्र की तस्वीर है, जो बहुत लंबे एक्सपोज़र समय के साथ ली गई है। विस्तारित एक्सपोज़र टेलीस्कोप को बहुत हल्की, दूर की वस्तुओं से प्रकाश एकत्र करने की अनुमति देता है।"}
          </InfoBox>

          <InfoBox
            variant="green"
            titleEn="Infrared vs. Visible Light"
            titleHi="इन्फ्रारेड बनाम दृश्य प्रकाश"
            lang={lang}
          >
            {lang === "en"
              ? "Infrared light has longer wavelengths than visible light. The expansion of the universe stretches light from distant objects into the infrared range — a phenomenon called redshift. Webb's infrared instruments can detect this stretched light that Hubble could not."
              : "इन्फ्रारेड प्रकाश की तरंगदैर्ध्य दृश्य प्रकाश से अधिक होती है। ब्रह्मांड का विस्तार दूर की वस्तुओं से प्रकाश को इन्फ्रारेड रेंज में खींचता है — जिसे रेडशिफ्ट कहा जाता है।"}
          </InfoBox>
        </div>

        {/* Sidebar — desktop only */}
        <aside className="hidden lg:block w-72 xl:w-80 shrink-0">
          <div className="sticky top-24 space-y-6">
            {/* Trending Tools */}
            <div className="p-5 rounded-2xl bg-[rgba(17,17,40,0.5)] backdrop-blur-xl border border-white/[0.07]">
              <h3 className="text-sm font-semibold text-text-primary mb-4 flex items-center gap-2">
                <svg className="w-4 h-4 text-neon-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                </svg>
                {t.trendingTools}
              </h3>
              <div className="space-y-2">
                {trendingTools.map((tool) => (
                  <Link
                    key={tool.href + tool.name.en}
                    href={tool.href}
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/[0.04] transition-colors group"
                  >
                    <span className="text-lg">{tool.icon}</span>
                    <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">
                      {tool.name[lang]}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Related Shop Items */}
            <div className="p-5 rounded-2xl bg-[rgba(17,17,40,0.5)] backdrop-blur-xl border border-white/[0.07]">
              <h3 className="text-sm font-semibold text-text-primary mb-4 flex items-center gap-2">
                <svg className="w-4 h-4 text-neon-pink" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                {t.relatedGear}
              </h3>
              <div className="space-y-2">
                {relatedGear.map((item) => (
                  <Link
                    key={item.name.en}
                    href={item.href}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-white/[0.04] transition-colors group"
                  >
                    <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">
                      {item.name[lang]}
                    </span>
                    <span className="text-xs font-semibold text-neon-green">{item.price}</span>
                  </Link>
                ))}
              </div>
              <Link
                href="/shop"
                className="mt-3 block text-center text-xs font-medium text-neon-pink hover:text-neon-pink-glow transition-colors py-2 rounded-lg border border-neon-pink/20 hover:border-neon-pink/40"
              >
                {lang === "en" ? "Browse All Gear →" : "सभी गियर देखें →"}
              </Link>
            </div>

            {/* Share */}
            <div className="p-5 rounded-2xl bg-[rgba(17,17,40,0.5)] backdrop-blur-xl border border-white/[0.07]">
              <h3 className="text-sm font-semibold text-text-primary mb-3">
                {t.shareArticle}
              </h3>
              <div className="flex gap-2">
                {["X", "FB", "WA", "LI"].map((platform) => (
                  <button
                    key={platform}
                    className="flex-1 py-2 rounded-lg bg-space-elevated border border-space-border text-xs font-medium text-text-muted hover:text-text-primary hover:border-neon-violet/30 transition-all cursor-pointer"
                  >
                    {platform}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </article>
  );
}

/**
 * Minimal markdown-to-HTML converter for the article body.
 * Handles: headings, bold, blockquotes, paragraphs.
 */
function markdownToHtml(md: string): string {
  return md
    .trim()
    .split("\n\n")
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return "";
      if (trimmed.startsWith("### "))
        return `<h3>${formatInline(trimmed.slice(4))}</h3>`;
      if (trimmed.startsWith("## "))
        return `<h2>${formatInline(trimmed.slice(3))}</h2>`;
      if (trimmed.startsWith("> "))
        return `<blockquote><p>${formatInline(trimmed.slice(2))}</p></blockquote>`;
      return `<p>${formatInline(trimmed)}</p>`;
    })
    .join("\n");
}

function formatInline(text: string): string {
  return text.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
}
