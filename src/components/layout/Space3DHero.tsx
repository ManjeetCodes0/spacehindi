"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { celestialBodies } from "@/data/universe/planets";

interface Space3DHeroProps {
  lang: "en" | "hi";
}

const content = {
  en: {
    heading1: "Space Science &",
    heading2: "Astronomy in Hindi",
    subheading: "अंतरिक्ष विज्ञान हिंदी में — ScienceHindi 360",
    description:
      "Interactive space tools, real-time event tracking, and deeply researched science stories — making the universe feel closer.",
    cta1: "Explore Tools",
    cta2: "Read Blog",
  },
  hi: {
    heading1: "अंतरिक्ष विज्ञान",
    heading2: "हिंदी में",
    subheading: "Space Science & Astronomy — ScienceHindi 360",
    description:
      "इंटरैक्टिव स्पेस टूल्स, रियल-टाइम इवेंट ट्रैकिंग, और गहन विज्ञान कहानियाँ — ब्रह्मांड को करीब लाने के लिए।",
    cta1: "उपकरण देखें",
    cta2: "ब्लॉग पढ़ें",
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
      .then((res) => (res.ok ? res.json() : []))
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const isHindi = lang === "hi";

  // Ensure video plays (handle autoplay policies)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playVideo = async () => {
      try {
        await video.play();
      } catch {
        // Autoplay blocked — muted videos should always work
        video.muted = true;
        try { await video.play(); } catch { /* ignore */ }
      }
    };

    video.playbackRate = 0.75;

    const markLoaded = () => {
      if (!videoLoaded) {
        setVideoLoaded(true);
        playVideo();
      }
    };

    // Seamless loop using requestAnimationFrame for frame-accurate rewind.
    // Checks at ~60fps so we never miss the rewind window on a short video.
    let rafId: number;
    const loopCheck = () => {
      if (video.duration && video.currentTime > video.duration - 0.15) {
        video.currentTime = 0;
      }
      rafId = requestAnimationFrame(loopCheck);
    };
    rafId = requestAnimationFrame(loopCheck);

    // Check if the video already loaded before this effect ran (race condition fix)
    if (video.readyState >= 3) {
      markLoaded();
    }

    // Listen for multiple load-related events to catch all cases
    video.addEventListener("canplaythrough", markLoaded);
    video.addEventListener("loadeddata", markLoaded);
    video.addEventListener("playing", markLoaded);

    // If video errors out, keep showing the static poster fallback
    const onError = () => setVideoFailed(true);
    video.addEventListener("error", onError);

    // Fallback: if video takes too long (slow network), keep the poster visible
    const fallbackTimer = setTimeout(() => {
      if (!videoLoaded) setVideoFailed(true);
    }, 8000);

    return () => {
      cancelAnimationFrame(rafId);
      video.removeEventListener("canplaythrough", markLoaded);
      video.removeEventListener("loadeddata", markLoaded);
      video.removeEventListener("playing", markLoaded);
      video.removeEventListener("error", onError);
      clearTimeout(fallbackTimer);
    };
  }, [videoLoaded]);

  return (
    <section
      className="relative h-screen w-full overflow-hidden bg-black"
      style={{ contentVisibility: "auto", containIntrinsicSize: "auto 100vh" }}
    >
      {/* Layer 1: Background Video — WebM primary, MP4 fallback */}
      {!videoFailed && (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
          style={{ opacity: videoLoaded ? 1 : 0 }}
          autoPlay
          muted
          playsInline
          preload="auto"
          poster="/core/hero-poster.webp"
          aria-hidden="true"
        >
          <source src="/core/hero-video.webm" type="video/webm" />
          <source src="/core/hero-video.mp4" type="video/mp4" />
        </video>
      )}

      {/* Layer 2: Static fallback — shows while video loads, or permanently if video fails */}
      {(!videoLoaded || videoFailed) && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/core/hero-poster.webp)" }}
          aria-hidden="true"
        />
      )}

      {/* Layer 3: Gradient overlays for readability */}
      <div className="absolute inset-0 z-[2] pointer-events-none">
        {/* Dark vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.65) 100%)",
          }}
        />
        {/* Left-side gradient for text readability */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 40%, transparent 70%)",
          }}
        />
        {/* Bottom fade to page background */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[var(--bg-primary)] to-transparent" />
        {/* Top subtle darkening for navbar */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[rgba(0,0,0,0.4)] to-transparent" />
      </div>

      {/* Layer 4: Content */}
      <div className="absolute inset-0 z-[3] flex items-center">
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
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[4] flex flex-col items-center gap-2"
      >
        <p className="text-xs" style={{ color: "var(--text-muted)" }}>Scroll to explore</p>
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
            aria-label="Scroll down to explore more content"
            role="img"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
