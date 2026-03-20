"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { spaceTools } from "@/data/tools";

interface ToolsShowcaseProps {
  lang: "en" | "hi";
}

const text = {
  en: {
    badge: "Interactive Space Lab",
    title: "Explore Our Tools",
    subtitle: "Calculators, simulators, and trackers that bring astrophysics to your fingertips",
    openTool: "Open Tool",
    viewAll: "View All Tools",
  },
  hi: {
    badge: "इंटरैक्टिव स्पेस लैब",
    title: "हमारे टूल्स खोजें",
    subtitle: "कैलकुलेटर, सिम्युलेटर और ट्रैकर जो खगोल भौतिकी को आपकी उंगलियों पर लाते हैं",
    openTool: "टूल खोलें",
    viewAll: "सभी टूल्स देखें",
  },
};

export default function ToolsShowcase({ lang }: ToolsShowcaseProps) {
  const t = text[lang];
  const tools = spaceTools.filter((tool) => tool.available).slice(0, 6);

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
            bg-neon-cyan/10 border border-neon-cyan/20 mb-5"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan" />
          <span className="text-xs font-medium text-neon-cyan tracking-wide">{t.badge}</span>
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

      {/* Tools grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {tools.map((tool, i) => (
          <motion.div
            key={tool.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.06, duration: 0.45 }}
            whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
          >
            <Link href={`/tools/${tool.slug}`} className="block group h-full">
              <div
                className="
                  relative h-full p-6 rounded-2xl overflow-hidden
                  bg-[rgba(17,17,40,0.55)] backdrop-blur-xl
                  border border-white/[0.07]
                  hover:border-white/[0.15]
                  transition-all duration-300
                  cursor-pointer
                "
              >
                {/* Hover glow */}
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
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${tool.glowColor.replace("0.3", "0.1")}` }}
                >
                  <svg
                    className="w-6 h-6"
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
                <p className="text-sm text-text-muted leading-relaxed group-hover:text-text-secondary transition-colors mb-4">
                  {tool.description[lang]}
                </p>

                {/* Open indicator */}
                <div className="flex items-center gap-1.5 text-xs font-medium text-text-muted group-hover:text-text-secondary transition-colors">
                  <span>{t.openTool}</span>
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
              </div>
            </Link>
          </motion.div>
        ))}
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
          href="/tools"
          className="
            inline-flex items-center gap-2 px-6 py-3 rounded-xl
            text-sm font-semibold
            text-neon-cyan border border-neon-cyan/30
            bg-neon-cyan/[0.05]
            hover:bg-neon-cyan/[0.1] hover:border-neon-cyan/50
            shadow-[0_0_15px_rgba(6,182,212,0.1)]
            hover:shadow-[0_0_25px_rgba(6,182,212,0.2)]
            transition-all duration-300
          "
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19 14.5M14.25 3.104c.251.023.501.05.75.082M19 14.5l-2.47 2.47a2.25 2.25 0 0 1-1.59.659H9.06a2.25 2.25 0 0 1-1.591-.659L5 14.5m14 0V17a2.25 2.25 0 0 1-2.25 2.25H7.25A2.25 2.25 0 0 1 5 17v-2.5" />
          </svg>
          {t.viewAll}
        </Link>
      </motion.div>
    </section>
  );
}
