"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Starfield from "./Starfield";
import FloatingPlanet from "./FloatingPlanet";

interface HeroProps {
  lang: "en" | "hi";
}

const content = {
  en: {
    badge: "Your 360° Science Journey Begins",
    heading1: "Explore the",
    heading2: "Cosmos",
    subheading: "ब्रह्मांड की खोज करें",
    description:
      "Dive into interactive space tools, real-time event tracking, and deeply researched science stories — all designed to make the universe feel closer.",
    cta1: "Explore Tools",
    cta2: "Read Blog",
  },
  hi: {
    badge: "आपकी 360° विज्ञान यात्रा शुरू होती है",
    heading1: "खोजें",
    heading2: "ब्रह्मांड",
    subheading: "Explore the Cosmos",
    description:
      "इंटरैक्टिव स्पेस टूल्स, रियल-टाइम इवेंट ट्रैकिंग, और गहन विज्ञान कहानियों में डूबें — सब कुछ ब्रह्मांड को करीब लाने के लिए।",
    cta1: "उपकरण देखें",
    cta2: "ब्लॉग पढ़ें",
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 * i, duration: 0.6, ease: "easeOut" as const },
  }),
};

export default function Hero({ lang }: HeroProps) {
  const t = content[lang];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#000000]">
      {/* Animated starfield canvas */}
      <Starfield />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-space-black pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[rgba(139,92,246,0.04)] via-transparent to-[rgba(59,130,246,0.04)] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
          {/* Left — Text */}
          <div className="flex-1 text-center lg:text-left max-w-2xl">
            {/* Badge */}
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                bg-neon-violet/10 border border-neon-violet/20 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
              <span className="text-xs font-medium text-neon-violet tracking-wide">
                {t.badge}
              </span>
            </motion.div>

            {/* Main heading */}
            <motion.h1
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-3"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              <span className="text-text-primary">{t.heading1} </span>
              <span
                className="inline-block"
                style={{
                  background:
                    "linear-gradient(135deg, var(--neon-violet), var(--neon-blue))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {t.heading2}
              </span>
            </motion.h1>

            {/* Hindi/English sub-heading */}
            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-xl md:text-2xl text-text-muted font-medium mb-6"
              style={{ fontFamily: "var(--font-noto-sans-devanagari)" }}
            >
              {t.subheading}
            </motion.p>

            {/* Description */}
            <motion.p
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-base md:text-lg text-text-secondary leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0"
            >
              {t.description}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
            >
              {/* Primary — Glowing Pink */}
              <Link href="/tools">
                <motion.span
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="
                    inline-flex items-center gap-2 px-8 py-3.5 rounded-xl
                    text-sm font-semibold text-white cursor-pointer
                    bg-gradient-to-r from-neon-pink to-neon-pink-glow
                    shadow-[0_0_25px_rgba(236,72,153,0.4),0_0_60px_rgba(236,72,153,0.15)]
                    hover:shadow-[0_0_35px_rgba(236,72,153,0.6),0_0_80px_rgba(236,72,153,0.25)]
                    transition-shadow duration-300
                  "
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19 14.5M14.25 3.104c.251.023.501.05.75.082M19 14.5l-2.47 2.47a2.25 2.25 0 0 1-1.59.659H9.06a2.25 2.25 0 0 1-1.591-.659L5 14.5m14 0V17a2.25 2.25 0 0 1-2.25 2.25H7.25A2.25 2.25 0 0 1 5 17v-2.5"
                    />
                  </svg>
                  {t.cta1}
                </motion.span>
              </Link>

              {/* Secondary — Violet ghost */}
              <Link href="/blog">
                <motion.span
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="
                    inline-flex items-center gap-2 px-8 py-3.5 rounded-xl
                    text-sm font-semibold cursor-pointer
                    text-neon-violet border border-neon-violet/40
                    bg-neon-violet/[0.05]
                    hover:bg-neon-violet/[0.1] hover:border-neon-violet/60
                    shadow-[0_0_15px_rgba(139,92,246,0.1)]
                    hover:shadow-[0_0_25px_rgba(139,92,246,0.25)]
                    transition-all duration-300
                  "
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                    />
                  </svg>
                  {t.cta2}
                </motion.span>
              </Link>
            </motion.div>

            {/* Stats bar */}
            <motion.div
              custom={5}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex items-center gap-8 mt-12 justify-center lg:justify-start"
            >
              {[
                { value: "50+", label: lang === "en" ? "Space Tools" : "स्पेस टूल्स" },
                { value: "1K+", label: lang === "en" ? "Articles" : "लेख" },
                { value: "Live", label: lang === "en" ? "Event Tracking" : "इवेंट ट्रैकिंग" },
              ].map((stat, i) => (
                <div key={i} className="text-center lg:text-left">
                  <p className="text-lg font-bold text-text-primary">{stat.value}</p>
                  <p className="text-xs text-text-muted">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Floating Planet */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="flex-shrink-0"
          >
            <FloatingPlanet />
          </motion.div>
        </div>
      </div>

      {/* Bottom fade to page */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-space-black to-transparent pointer-events-none" />
    </section>
  );
}
