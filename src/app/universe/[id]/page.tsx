"use client";

import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar, Footer } from "@/components/layout";
import { CelestialSelector, MoonGallery, PlanetMedia } from "@/components/universe";
import { getCelestialBody, celestialBodies } from "@/data/universe/planets";
import { useLang } from "@/context/LanguageContext";

const statMeta: Record<string, { en: string; hi: string }> = {
  diameter:    { en: "Diameter",   hi: "व्यास"        },
  temperature: { en: "Avg Temp",   hi: "औसत तापमान"   },
  dayLength:   { en: "Day",        hi: "दिन"           },
  yearLength:  { en: "Year",       hi: "वर्ष"          },
};

const GLASS_STATS = ["diameter", "temperature", "dayLength", "yearLength"] as const;

export default function PlanetPage() {
  const { lang } = useLang();
  const params = useParams();
  const id = params.id as string;

  const body = getCelestialBody(id);
  if (!body) notFound();

  const sorted = [...celestialBodies].sort((a, b) => a.order - b.order);
  const idx = sorted.findIndex((b) => b.id === id);
  const prev = idx > 0 ? sorted[idx - 1] : null;
  const next = idx < sorted.length - 1 ? sorted[idx + 1] : null;

  // Use PNG images for the supported planets
  const planetsWithImages = new Set([
    "mercury", "venus", "earth", "mars", "jupiter", "saturn", "uranus", "neptune", "moon", "pluto"
  ]);
  const hasPlanetImage = planetsWithImages.has(id);

  /* Nav button shared style */
  const navBtnStyle: React.CSSProperties = {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.08)",
    flexShrink: 0,
  };

  return (
    <>
      <Navbar />

      <main className="bg-[#050a12]">
        {/* ============================================================ */}
        {/*  HERO — flex-column, no absolute overlap                     */}
        {/* ============================================================ */}
        <AnimatePresence mode="wait">
          <motion.section
            key={id}
            className="relative w-full overflow-hidden flex flex-col"
            style={{
              /* 100svh on browsers that support it, falls back to 100vh */
              height: "100svh",
              minHeight: "100vh",
              background: "radial-gradient(circle at center, #0a1b2a 0%, #020509 100%)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* ── Removed Orbital rings (hud lines) per request ── */}

            {/* ── Main content column ── */}
            <div
              className="relative z-10 flex flex-col items-center w-full"
              style={{
                flex: 1,
                paddingTop: "5rem",   /* clear fixed navbar (80px) */
                paddingBottom: "0",
                overflow: "hidden",
              }}
            >
              {/* TITLE */}
              <motion.div
                className="absolute inset-0 flex flex-col items-center pointer-events-none"
                style={{ zIndex: 30, justifyContent: "flex-start", paddingTop: "clamp(4rem, 12vh, 15vh)" }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                <h1
                  className="text-center select-none"
                  style={{
                    fontSize: "clamp(3rem, 11vw, 16rem)",
                    fontWeight: 200,
                    letterSpacing: "clamp(0.1em, 3vw, 0.35em)", // Wider letter spacing ensures even short words span wider
                    color: "rgba(255,255,255,0.85)",
                    fontFamily: "var(--font-montserrat), sans-serif",
                    lineHeight: 1,
                    textTransform: "uppercase",
                  }}
                >
                  {body.name[lang]}
                </h1>
              </motion.div>

              {/* PLANET — positioned absolutely from the bottom to prevent swallowing the text */}
              <motion.div
                className="absolute z-10 w-full flex items-center justify-center pointer-events-none"
                style={{ bottom: "0" }}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="relative flex items-center justify-center pointer-events-auto">
                  {/* Base Glow emitting from bottom of planet meeting the HUD */}
                  <div
                    className="absolute bottom-0 w-[60%] h-[30%] rounded-[100%] pointer-events-none"
                    style={{
                      background: `radial-gradient(ellipse at center, ${body.color}80 0%, transparent 70%)`,
                      filter: "blur(60px)",
                      transform: "translateY(50%)",
                      zIndex: 10,
                    }}
                  />

                  {/* Outer glow behind planet */}
                  <div
                    className="absolute rounded-full pointer-events-none"
                    style={{
                      width: "140%",
                      height: "140%",
                      background: `radial-gradient(circle, ${body.color}15 0%, transparent 70%)`,
                      filter: "blur(40px)",
                      zIndex: 0,
                    }}
                  />

                  {/* Planet size: anchored to bottom, pushing its top edge to intersect perfectly with the Title */}
                  <motion.div
                    style={{
                      width: "min(100vw, 85vh)",
                      height: "min(100vw, 85vh)",
                      maxWidth: "1200px",
                      maxHeight: "1200px",
                      zIndex: 1,
                      marginBottom: "clamp(-10vh, -5vh, -20px)", // Sink the planet slightly behind bottom nav
                    }}
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  >
                    {hasPlanetImage ? (
                      <div className="relative w-full h-full flex items-center justify-center">
                        <Image
                          src={id === "moon" ? "/universe/moons/earth/Moon-earth.png" : `/universe/planets/${id}/${id}1.png`}
                          alt={body.name[lang]}
                          fill
                          priority
                          style={{ objectFit: "contain", filter: `drop-shadow(0 0 80px ${body.color}80)` }}
                          className="pointer-events-none"
                        />
                      </div>
                    ) : (
                      /* CSS gradient sphere fallback */
                      <div
                        className="w-full h-full rounded-full"
                        style={{
                          background: body.gradient,
                          boxShadow: `
                            0 0 80px 10px ${body.color}40,
                            0 30px 100px -10px ${body.color}60,
                            inset -40px -30px 80px rgba(0,0,0,0.9),
                            inset 15px 15px 40px rgba(255,255,255,0.08)
                          `,
                        }}
                      />
                    )}
                  </motion.div>
                </div>
              </motion.div>

              {/* BOTTOM BAR — prev arrow + glass panel + next arrow */}
              <motion.div
                className="absolute bottom-6 sm:bottom-12 w-full flex items-center justify-center gap-4 sm:gap-6 px-4 z-20 pointer-events-auto"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                {/* Prev */}
                {prev ? (
                  <Link href={`/universe/${prev.id}`}>
                    <div
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-all duration-300 cursor-pointer"
                      style={{
                        background: "rgba(10, 15, 25, 0.4)",
                        backdropFilter: "blur(20px)",
                        border: "1px solid rgba(255,255,255,0.05)",
                      }}
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </div>
                  </Link>
                ) : (
                  <div
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-[#a1a1aa] opacity-20"
                    style={{
                      background: "rgba(10, 15, 25, 0.4)",
                      backdropFilter: "blur(20px)",
                      border: "1px solid rgba(255,255,255,0.05)",
                    }}
                  >
                     <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                     </svg>
                  </div>
                )}

                {/* Glass stats panel */}
                <div
                  className="flex gap-4 sm:gap-12 overflow-x-auto items-center"
                  style={{
                    background: "rgba(10, 15, 25, 0.4)",
                    backdropFilter: "blur(24px)",
                    WebkitBackdropFilter: "blur(24px)",
                    borderRadius: "100px",
                    padding: "clamp(10px, 1.5vw, 16px) clamp(20px, 4vw, 36px)",
                    border: "1px solid rgba(255,255,255,0.05)",
                    boxShadow: "0 30px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
                    scrollbarWidth: "none",
                  }}
                >
                  {GLASS_STATS.map((key) => {
                    const stat = body.stats[key];
                    const meta = statMeta[key];
                    return (
                      <div key={key} className="flex flex-col gap-1 items-start flex-shrink-0">
                        <span
                          className="font-medium whitespace-nowrap"
                          style={{
                            fontSize: "clamp(9px, 1vw, 11px)",
                            color: "rgba(255,255,255,0.4)",
                            textTransform: "uppercase",
                            letterSpacing: "0.1em",
                          }}
                        >
                          {meta[lang]}
                        </span>
                        <span
                          className="whitespace-nowrap font-medium font-sans"
                          style={{
                            fontSize: "clamp(13px, 1.5vw, 15px)",
                            color: "#ffffff",
                          }}
                        >
                          {stat.value}{" "}
                          <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8em" }}>
                            {stat.unit}
                          </span>
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Next */}
                {next ? (
                  <Link href={`/universe/${next.id}`}>
                    <div
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-all duration-300 cursor-pointer"
                      style={{
                        background: "rgba(10, 15, 25, 0.4)",
                        backdropFilter: "blur(20px)",
                        border: "1px solid rgba(255,255,255,0.05)",
                      }}
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                ) : (
                  <div
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-[#a1a1aa] opacity-20"
                    style={{
                      background: "rgba(10, 15, 25, 0.4)",
                      backdropFilter: "blur(20px)",
                      border: "1px solid rgba(255,255,255,0.05)",
                    }}
                  >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                  </div>
                )}
              </motion.div>
            </div>
          </motion.section>
        </AnimatePresence>

        {/* ============================================================ */}
        {/*  CONTENT BELOW HERO                                          */}
        {/* ============================================================ */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-[#64748b] mb-5">
            <Link href="/" className="hover:text-[#e2e8f0] transition-colors">
              {lang === "en" ? "Home" : "होम"}
            </Link>
            <span>/</span>
            <Link href="/universe" className="hover:text-[#e2e8f0] transition-colors">
              {lang === "en" ? "Universe" : "ब्रह्मांड"}
            </Link>
            <span>/</span>
            <span className="text-[#e2e8f0]">{body.name[lang]}</span>
          </nav>

          {/* Planet selector */}
          <CelestialSelector lang={lang} activeId={id} />

          {/* Overview */}
          <motion.div
            className="mt-8 rounded-[30px] border border-white/[0.04] p-8 sm:p-12 mb-16"
            style={{
              background: "rgba(10, 15, 25, 0.4)",
              backdropFilter: "blur(24px)",
              boxShadow: "0 30px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3
              className="text-xs sm:text-sm font-semibold uppercase tracking-widest mb-4"
              style={{
                color: "rgba(255,255,255,0.6)",
                letterSpacing: "0.2em",
                fontFamily: "var(--font-space-grotesk-real), sans-serif",
              }}
            >
              {lang === "en" ? "Overview" : "अवलोकन"}
            </h3>
            <p className="text-base sm:text-lg text-[#cbd5e1] leading-relaxed font-light">
              {body.description[lang]}
            </p>
            <div className="mt-8 pt-6 border-t border-white/[0.04] flex flex-col gap-2">
              <span
                className="text-[10px] uppercase tracking-widest font-semibold"
                style={{ color: "rgba(255,255,255,0.4)", letterSpacing: "0.15em" }}
              >
                {lang === "en" ? "Atmosphere" : "वायुमंडल"}
              </span>
              <p className="text-sm text-[#e2e8f0]">
                {body.stats.atmosphere[lang]}
              </p>
            </div>
          </motion.div>

          {/* Moons */}
          <div className="mt-14">
            <MoonGallery lang={lang} planetId={id} />
          </div>

          {/* Media — YouTube, unchanged */}
          <div className="mt-14">
            <PlanetMedia body={body} lang={lang} />
          </div>

          {/* Bottom Prev / Next */}
          <div className="mt-20 flex flex-col sm:flex-row items-center justify-between gap-6">
            {prev ? (
              <Link
                href={`/universe/${prev.id}`}
                className="group flex items-center gap-4 px-6 py-4 rounded-[100px] border border-white/[0.04] hover:bg-white/[0.02] transition-all w-full sm:w-auto"
                style={{ background: "rgba(10, 15, 25, 0.4)", backdropFilter: "blur(24px)" }}
              >
                <div className="w-10 h-10 rounded-full bg-white/[0.05] flex items-center justify-center group-hover:bg-white/[0.1] transition-all">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest" style={{ letterSpacing: "0.15em" }}>
                    {lang === "en" ? "Previous" : "पिछला"}
                  </p>
                  <p className="text-sm font-medium text-white tracking-wide" style={{ fontFamily: "var(--font-space-grotesk-real)" }}>
                    {prev.name[lang]}
                  </p>
                </div>
              </Link>
            ) : <div className="hidden sm:block" />}

            {next ? (
              <Link
                href={`/universe/${next.id}`}
                className="group flex flex-row-reverse sm:flex-row items-center gap-4 px-6 py-4 rounded-[100px] border border-white/[0.04] hover:bg-white/[0.02] transition-all w-full sm:w-auto text-left sm:text-right"
                style={{ background: "rgba(10, 15, 25, 0.4)", backdropFilter: "blur(24px)" }}
              >
                <div className="w-10 h-10 rounded-full bg-white/[0.05] flex items-center justify-center group-hover:bg-white/[0.1] transition-all">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest" style={{ letterSpacing: "0.15em" }}>
                    {lang === "en" ? "Next" : "अगला"}
                  </p>
                  <p className="text-sm font-medium text-white tracking-wide" style={{ fontFamily: "var(--font-space-grotesk-real)" }}>
                    {next.name[lang]}
                  </p>
                </div>
              </Link>
            ) : <div className="hidden sm:block" />}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
