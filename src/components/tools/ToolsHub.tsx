"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { spaceTools, type SpaceTool } from "@/data/tools";
import { Badge } from "@/components/ui";

interface ToolsHubProps {
  lang: "en" | "hi";
}

const text = {
  en: {
    badge: "Interactive Space Laboratory",
    title: "Space Tools",
    subtitle:
      "Calculators, converters, and simulators that bring astrophysics to your fingertips.",
    comingSoon: "Coming Soon",
  },
  hi: {
    badge: "इंटरैक्टिव स्पेस लैब",
    title: "स्पेस टूल्स",
    subtitle:
      "कैलकुलेटर, कनवर्टर, और सिम्युलेटर जो खगोल भौतिकी को आपकी उंगलियों पर लाते हैं।",
    comingSoon: "जल्द आ रहा है",
  },
};

function ToolCard({
  tool,
  lang,
  index,
}: {
  tool: SpaceTool;
  lang: "en" | "hi";
  index: number;
}) {
  const inner = (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.06, duration: 0.45, ease: "easeOut" as const }}
      whileHover={
        tool.available
          ? {
              scale: 1.03,
              transition: { duration: 0.2 },
            }
          : {}
      }
      className={`
        relative group h-full p-6 rounded-2xl overflow-hidden
        bg-[rgba(17,17,40,0.55)] backdrop-blur-xl
        border border-white/[0.07]
        transition-all duration-300
        ${
          tool.available
            ? "cursor-pointer hover:border-white/[0.15]"
            : "opacity-60 cursor-default"
        }
      `}
      style={
        tool.available
          ? {
              // glow will be added via hover pseudo-like trick below
            }
          : {}
      }
    >
      {/* Hover glow overlay */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          boxShadow: `inset 0 0 40px ${tool.glowColor}, 0 0 30px ${tool.glowColor}`,
        }}
      />

      {/* Top accent line */}
      <div
        className="absolute top-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(90deg, transparent, ${tool.glowColor}, transparent)`,
        }}
      />

      {/* Icon */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300"
        style={{
          backgroundColor: `${tool.glowColor.replace("0.3", "0.1")}`,
        }}
      >
        <svg
          className="w-6 h-6 transition-colors duration-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
          style={{ color: tool.glowColor.replace("0.3)", "1)") }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d={tool.icon} />
        </svg>
      </div>

      {/* Name */}
      <h3
        className="text-lg font-semibold text-text-primary mb-2 group-hover:text-white transition-colors"
        style={{ fontFamily: "var(--font-space-grotesk)" }}
      >
        {tool.name[lang]}
      </h3>

      {/* Description */}
      <p className="text-sm text-text-muted leading-relaxed group-hover:text-text-secondary transition-colors">
        {tool.description[lang]}
      </p>

      {/* Status */}
      {!tool.available && (
        <div className="mt-4">
          <Badge variant="muted">{text[lang].comingSoon}</Badge>
        </div>
      )}

      {/* Arrow indicator for available tools */}
      {tool.available && (
        <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-text-muted group-hover:text-text-secondary transition-colors">
          <span>{lang === "en" ? "Open Tool" : "टूल खोलें"}</span>
          <svg
            className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </div>
      )}
    </motion.div>
  );

  if (tool.available) {
    return (
      <Link href={`/tools/${tool.slug}`} className="block h-full">
        {inner}
      </Link>
    );
  }

  return inner;
}

export default function ToolsHub({ lang }: ToolsHubProps) {
  const t = text[lang];

  return (
    <section className="py-16 sm:py-20">
      {/* Section header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
            bg-neon-cyan/10 border border-neon-cyan/20 mb-5"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan" />
          <span className="text-xs font-medium text-neon-cyan tracking-wide">
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

      {/* Tool grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {spaceTools.map((tool, i) => (
          <ToolCard key={tool.id} tool={tool} lang={lang} index={i} />
        ))}
      </div>
    </section>
  );
}
