"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import Starfield from "./Starfield";
import { useImageSequence } from "@/hooks/useImageSequence";

interface Space3DHeroProps {
  lang: "en" | "hi";
}

const TOTAL_FRAMES = 240;
const SCROLL_HEIGHT = 1200;
const AUTO_PLAY_SPEED = 0.3;
const AUTO_PLAY_INTERVAL = 50;

function useWindowHeight() {
  const [h, setH] = useState(800);
  useEffect(() => {
    setH(window.innerHeight);
    const onResize = () => setH(window.innerHeight);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return h;
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
    loading: "Loading Earth View",
    scrollHint: "Scroll to rotate Earth",
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
    loading: "अर्थ व्यू लोड हो रहा है",
    scrollHint: "पृथ्वी को घुमाने के लिए स्क्रॉल करें",
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

// ─── Neon Loading Screen ────────────────────────────────────────
function NeonLoader({
  progress,
  label,
}: {
  progress: number;
  label: string;
}) {
  const percent = Math.round(progress * 100);

  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#030108]">
      {/* Ambient glow */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.4) 0%, rgba(236,72,153,0.2) 50%, transparent 70%)",
        }}
      />

      {/* Rotating ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        className="w-24 h-24 rounded-full border-2 border-transparent mb-8"
        style={{
          borderTopColor: "var(--neon-violet)",
          borderRightColor: "rgba(139,92,246,0.3)",
          boxShadow:
            "0 0 30px rgba(139,92,246,0.3), inset 0 0 30px rgba(139,92,246,0.1)",
        }}
      />

      {/* Label */}
      <p
        className="text-text-secondary text-sm font-medium mb-4 tracking-wide"
        style={{ fontFamily: "var(--font-space-grotesk)" }}
      >
        {label}
      </p>

      {/* Progress bar */}
      <div className="w-64 h-1.5 rounded-full bg-white/[0.06] overflow-hidden relative">
        <motion.div
          className="h-full rounded-full"
          style={{
            background:
              "linear-gradient(90deg, var(--neon-violet), var(--neon-pink))",
            boxShadow:
              "0 0 15px rgba(139,92,246,0.5), 0 0 30px rgba(236,72,153,0.3)",
          }}
          initial={{ width: "0%" }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </div>

      {/* Percentage */}
      <p className="text-text-muted text-xs mt-3 tabular-nums font-medium">
        {percent}%
      </p>
    </div>
  );
}

// ─── Main Component ─────────────────────────────────────────────
export default function Space3DHero({ lang }: Space3DHeroProps) {
  const t = content[lang];
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const currentFrameRef = useRef(0);
  const autoFrameRef = useRef(0);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const windowHeight = useWindowHeight();

  const { images, progress, ready } = useImageSequence({
    folder: "/earthview",
    prefix: "ezgif-frame-",
    totalFrames: TOTAL_FRAMES,
    extension: "jpg",
    padLength: 3,
  });

  // Scroll-driven frame index
  const { scrollY } = useScroll();
  const scrollFrame = useTransform(scrollY, [0, SCROLL_HEIGHT], [0, TOTAL_FRAMES - 1]);
  const [activeFrame, setActiveFrame] = useState(0);

  // Track scroll activity
  useMotionValueEvent(scrollFrame, "change", (v) => {
    isScrollingRef.current = true;
    setActiveFrame(Math.round(v));

    // Reset idle timer
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false;
      autoFrameRef.current = Math.round(v);
    }, 2000);
  });

  // Auto-play when idle
  useEffect(() => {
    if (!ready) return;

    const interval = setInterval(() => {
      if (!isScrollingRef.current) {
        autoFrameRef.current =
          (autoFrameRef.current + AUTO_PLAY_SPEED) % TOTAL_FRAMES;
        setActiveFrame(Math.round(autoFrameRef.current));
      }
    }, AUTO_PLAY_INTERVAL);

    return () => clearInterval(interval);
  }, [ready]);

  // ─── Canvas Rendering ──────────────────────────────────────
  const drawFrame = useCallback(
    (frameIndex: number) => {
      const canvas = canvasRef.current;
      if (!canvas || !images.length) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const clampedIdx = Math.max(
        0,
        Math.min(TOTAL_FRAMES - 1, Math.round(frameIndex))
      );
      const img = images[clampedIdx];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      // Avoid redundant draws
      if (currentFrameRef.current === clampedIdx) return;
      currentFrameRef.current = clampedIdx;

      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;

      // "cover" algorithm — fill canvas without distortion
      const scale = Math.max(cw / iw, ch / ih);
      const sw = iw * scale;
      const sh = ih * scale;
      const sx = (cw - sw) / 2;
      const sy = (ch - sh) / 2;

      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, sx, sy, sw, sh);
    },
    [images]
  );

  // Resize canvas to match viewport
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      currentFrameRef.current = -1; // force redraw
      drawFrame(activeFrame);
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [drawFrame, activeFrame]);

  // Draw on frame change
  useEffect(() => {
    drawFrame(activeFrame);
  }, [activeFrame, drawFrame]);

  // Content fade based on scroll
  const contentOpacity = useTransform(scrollY, [0, SCROLL_HEIGHT * 0.4], [1, 0]);
  const contentY = useTransform(scrollY, [0, SCROLL_HEIGHT * 0.4], [0, -60]);

  return (
    <>
      {/* Loading screen */}
      {!ready && <NeonLoader progress={progress} label={t.loading} />}

      <section
        ref={sectionRef}
        className="relative bg-[#000000]"
        style={{ height: `${SCROLL_HEIGHT + windowHeight}px` }}
      >
        {/* Sticky container */}
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* Layer 1: Starfield (behind everything) */}
          <div className="absolute inset-0 z-0">
            <Starfield />
          </div>

          {/* Layer 2: Canvas (image sequence) */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 z-[1]"
            aria-hidden="true"
          />

          {/* Layer 3: Gradient overlays */}
          <div className="absolute inset-0 z-[2] pointer-events-none">
            {/* Dark vignette edges */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)",
              }}
            />
            {/* Bottom fade */}
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-space-black to-transparent" />
            {/* Top subtle fade */}
            <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[rgba(0,0,0,0.3)] to-transparent" />
            {/* Neon color tint */}
            <div className="absolute inset-0 bg-gradient-to-r from-[rgba(139,92,246,0.03)] via-transparent to-[rgba(59,130,246,0.03)]" />
          </div>

          {/* Layer 4: Content overlay */}
          <motion.div
            style={{ opacity: contentOpacity, y: contentY }}
            className="absolute inset-0 z-[3] flex items-center"
          >
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Glass panel */}
              <div
                className="
                  max-w-2xl
                  p-8 sm:p-10 rounded-3xl
                  bg-[rgba(5,5,16,0.5)] backdrop-blur-xl
                  border border-white/[0.06]
                  shadow-[0_0_80px_rgba(0,0,0,0.5)]
                "
              >
                {/* Badge */}
                <motion.div
                  custom={0}
                  variants={fadeUp}
                  initial="hidden"
                  animate={ready ? "visible" : "hidden"}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                    bg-neon-violet/10 border border-neon-violet/20 mb-6"
                >
                  <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
                  <span className="text-xs font-medium text-neon-violet tracking-wide">
                    {t.badge}
                  </span>
                </motion.div>

                {/* Heading */}
                <motion.h1
                  custom={1}
                  variants={fadeUp}
                  initial="hidden"
                  animate={ready ? "visible" : "hidden"}
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

                {/* Bilingual sub-heading */}
                <motion.p
                  custom={2}
                  variants={fadeUp}
                  initial="hidden"
                  animate={ready ? "visible" : "hidden"}
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
                  animate={ready ? "visible" : "hidden"}
                  className="text-base md:text-lg text-text-secondary leading-relaxed mb-10 max-w-xl"
                >
                  {t.description}
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  custom={4}
                  variants={fadeUp}
                  initial="hidden"
                  animate={ready ? "visible" : "hidden"}
                  className="flex flex-col sm:flex-row items-start gap-4"
                >
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
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19 14.5M14.25 3.104c.251.023.501.05.75.082M19 14.5l-2.47 2.47a2.25 2.25 0 0 1-1.59.659H9.06a2.25 2.25 0 0 1-1.591-.659L5 14.5m14 0V17a2.25 2.25 0 0 1-2.25 2.25H7.25A2.25 2.25 0 0 1 5 17v-2.5" />
                      </svg>
                      {t.cta1}
                    </motion.span>
                  </Link>

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
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                      </svg>
                      {t.cta2}
                    </motion.span>
                  </Link>
                </motion.div>

                {/* Stats */}
                <motion.div
                  custom={5}
                  variants={fadeUp}
                  initial="hidden"
                  animate={ready ? "visible" : "hidden"}
                  className="flex items-center gap-8 mt-10"
                >
                  {[
                    { value: "6+", label: lang === "en" ? "Space Tools" : "स्पेस टूल्स" },
                    { value: "1K+", label: lang === "en" ? "Articles" : "लेख" },
                    { value: "Live", label: lang === "en" ? "Event Tracking" : "इवेंट ट्रैकिंग" },
                  ].map((stat, i) => (
                    <div key={i}>
                      <p className="text-lg font-bold text-text-primary">{stat.value}</p>
                      <p className="text-xs text-text-muted">{stat.label}</p>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={ready ? { opacity: 1 } : {}}
            transition={{ delay: 2, duration: 1 }}
            style={{ opacity: contentOpacity }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[4] flex flex-col items-center gap-2"
          >
            <p className="text-xs text-text-muted">{t.scrollHint}</p>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg
                className="w-5 h-5 text-text-muted"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
