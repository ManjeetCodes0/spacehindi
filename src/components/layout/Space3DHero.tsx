"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import Starfield from "./Starfield";
import { useImageSequence } from "@/hooks/useImageSequence";
import { celestialBodies } from "@/data/universe/planets";

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
    heading1: "Explore the",
    heading2: "Cosmos",
    subheading: "ब्रह्मांड की खोज करें",
    description:
      "Interactive space tools, real-time event tracking, and deeply researched science stories — making the universe feel closer.",
    cta1: "Explore Tools",
    cta2: "Read Blog",
    scrollHint: "Scroll to explore",
  },
  hi: {
    heading1: "खोजें",
    heading2: "ब्रह्मांड",
    subheading: "Explore the Cosmos",
    description:
      "इंटरैक्टिव स्पेस टूल्स, रियल-टाइम इवेंट ट्रैकिंग, और गहन विज्ञान कहानियाँ — ब्रह्मांड को करीब लाने के लिए।",
    cta1: "उपकरण देखें",
    cta2: "ब्लॉग पढ़ें",
    scrollHint: "एक्सप्लोर करने के लिए स्क्रॉल करें",
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 * i, duration: 0.5, ease: "easeOut" as const },
  }),
};

const TOOL_COUNT = 6;
const PLANET_COUNT = celestialBodies.length;

function HeroStats({ lang }: { lang: "en" | "hi" }) {
  const [articleCount, setArticleCount] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/deep-dive")
      .then((res) => res.ok ? res.json() : [])
      .then((data) => {
        const count = Array.isArray(data) ? data.length : 0;
        setArticleCount(count);
      })
      .catch(() => setArticleCount(0));
  }, []);

  const stats = [
    { value: `${TOOL_COUNT}`, label: lang === "en" ? "Space Tools" : "स्पेस टूल्स" },
    { value: `${PLANET_COUNT}`, label: lang === "en" ? "Planets" : "ग्रह" },
    {
      value: articleCount !== null ? `${articleCount}+` : "...",
      label: lang === "en" ? "Articles" : "लेख",
    },
    { value: "Live", label: lang === "en" ? "Tracking" : "ट्रैकिंग" },
  ];

  return (
    <motion.div
      custom={4}
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="flex items-center gap-8 mt-12"
    >
      {stats.map((stat, i) => (
        <div key={i} className="text-center sm:text-left">
          <p className="text-lg font-bold text-white">{stat.value}</p>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>{stat.label}</p>
        </div>
      ))}
    </motion.div>
  );
}

export default function Space3DHero({ lang }: Space3DHeroProps) {
  const t = content[lang];
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const currentFrameRef = useRef(0);
  const autoFrameRef = useRef(0);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const windowHeight = useWindowHeight();

  // Lazy-load the earth image sequence in the background
  const { images, ready } = useImageSequence({
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

  // Canvas rendering
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

      if (currentFrameRef.current === clampedIdx) return;
      currentFrameRef.current = clampedIdx;

      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;

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

  // Resize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      currentFrameRef.current = -1;
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

  const isHindi = lang === "hi";

  return (
    <section
      ref={sectionRef}
      className="relative bg-bg-primary"
      style={{ height: `${SCROLL_HEIGHT + windowHeight}px` }}
    >
      {/* Sticky viewport container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Layer 1: Starfield — always visible immediately */}
        <div className="absolute inset-0 z-0">
          <Starfield />
        </div>

        {/* Layer 2: Earth canvas — loads in background, fades in */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-[1] transition-opacity duration-1000"
          style={{ opacity: ready ? 1 : 0 }}
          aria-hidden="true"
        />

        {/* Layer 3: Gradient overlays */}
        <div className="absolute inset-0 z-[2] pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)",
            }}
          />
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[var(--bg-primary)] to-transparent" />
          <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[rgba(0,0,0,0.4)] to-transparent" />
        </div>

        {/* Layer 4: Content — visible immediately, no glass panel */}
        <motion.div
          style={{ opacity: contentOpacity, y: contentY }}
          className="absolute inset-0 z-[3] flex items-center"
        >
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              {/* Heading */}
              <motion.h1
                custom={0}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08] mb-4"
                style={{
                  fontFamily: isHindi
                    ? "var(--font-noto-sans-devanagari), system-ui"
                    : "var(--font-playfair), Georgia, serif",
                }}
              >
                <span className="text-white">{t.heading1} </span>
                <span className="text-gradient-violet inline-block">
                  {t.heading2}
                </span>
              </motion.h1>

              {/* Bilingual sub-heading */}
              <motion.p
                custom={1}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="text-xl md:text-2xl font-medium mb-6"
                style={{
                  color: "var(--text-muted)",
                  fontFamily: isHindi
                    ? "var(--font-playfair), Georgia, serif"
                    : "var(--font-noto-sans-devanagari), system-ui",
                }}
              >
                {t.subheading}
              </motion.p>

              {/* Description */}
              <motion.p
                custom={2}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="text-base md:text-lg leading-relaxed mb-10 max-w-xl"
                style={{ color: "var(--text-secondary)" }}
              >
                {t.description}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                custom={3}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="flex flex-col sm:flex-row items-start gap-4"
              >
                <Link href="/tools">
                  <motion.span
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="
                      inline-flex items-center gap-2 px-8 py-3.5 rounded-xl
                      text-sm font-semibold text-white cursor-pointer
                      transition-all duration-300
                    "
                    style={{
                      background: "var(--accent)",
                      boxShadow: "0 0 20px rgba(139,92,246,0.3)",
                    }}
                  >
                    {t.cta1}
                  </motion.span>
                </Link>

                <Link href="/blog">
                  <motion.span
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="
                      inline-flex items-center gap-2 px-8 py-3.5 rounded-xl
                      text-sm font-semibold cursor-pointer
                      border transition-all duration-300
                    "
                    style={{
                      color: "var(--text-primary)",
                      borderColor: "rgba(255,255,255,0.15)",
                      background: "rgba(255,255,255,0.04)",
                    }}
                  >
                    {t.cta2}
                  </motion.span>
                </Link>
              </motion.div>

              {/* Dynamic stats */}
              <HeroStats lang={lang} />
            </div>
          </div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          style={{ opacity: contentOpacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[4] flex flex-col items-center gap-2"
        >
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>{t.scrollHint}</p>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg
              className="w-5 h-5"
              style={{ color: "var(--text-muted)" }}
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
  );
}
