"use client";

import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Navbar, Footer } from "@/components/layout";
import {
  CelestialCanvas,
  CelestialSelector,
  MoonGallery,
  PlanetDetails,
  PlanetMedia,
} from "@/components/universe";
import { getCelestialBody, celestialBodies } from "@/data/universe/planets";
import { useLang } from "@/context/LanguageContext";

export default function PlanetPage() {
  const { lang } = useLang();
  const params = useParams();
  const id = params.id as string;

  const body = getCelestialBody(id);

  if (!body) {
    notFound();
  }

  // Next/Prev navigation
  const sorted = [...celestialBodies].sort((a, b) => a.order - b.order);
  const currentIndex = sorted.findIndex((b) => b.id === id);
  const prev = currentIndex > 0 ? sorted[currentIndex - 1] : null;
  const next = currentIndex < sorted.length - 1 ? sorted[currentIndex + 1] : null;

  return (
    <>
      <Navbar />
      <main className="bg-space-black min-h-screen pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-text-muted mb-6">
            <Link href="/" className="hover:text-text-secondary transition-colors">
              {lang === "en" ? "Home" : "होम"}
            </Link>
            <span>/</span>
            <Link
              href="/universe"
              className="hover:text-text-secondary transition-colors"
            >
              {lang === "en" ? "Universe" : "ब्रह्मांड"}
            </Link>
            <span>/</span>
            <span className="text-text-secondary">{body.name[lang]}</span>
          </nav>

          {/* Planet selector bar */}
          <CelestialSelector lang={lang} activeId={id} />

          {/* Hero section */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Canvas */}
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              key={id}
            >
              <div className="relative">
                <CelestialCanvas body={body} size={400} />
                {/* Ambient glow */}
                <div
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{
                    background: `radial-gradient(circle, ${body.color}15 0%, transparent 70%)`,
                    transform: "scale(1.5)",
                  }}
                />
              </div>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              key={`info-${id}`}
            >
              <div className="flex items-center gap-3 mb-2">
                <span
                  className="px-2 py-0.5 rounded-full text-[10px] font-medium border"
                  style={{
                    color: body.color,
                    borderColor: `${body.color}40`,
                    backgroundColor: `${body.color}10`,
                  }}
                >
                  {body.type[lang]}
                </span>
                <span className="text-xs text-text-muted">
                  #{body.order} {lang === "en" ? "from the Sun" : "सूर्य से"}
                </span>
              </div>

              <h1
                className="text-4xl sm:text-5xl font-bold text-text-primary"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {body.name[lang]}
              </h1>

              <p
                className="text-lg mt-2"
                style={{ color: body.color }}
              >
                {body.tagline[lang]}
              </p>

              <div className="mt-6">
                <PlanetDetails body={body} lang={lang} />
              </div>
            </motion.div>
          </div>

          {/* Moons */}
          <div className="mt-16">
            <MoonGallery lang={lang} planetId={id} />
          </div>

          {/* Media */}
          <div className="mt-16">
            <PlanetMedia body={body} lang={lang} />
          </div>

          {/* Prev / Next navigation */}
          <div className="mt-16 flex items-center justify-between">
            {prev ? (
              <Link
                href={`/universe/${prev.id}`}
                className="group flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] transition-all"
              >
                <span className="text-text-muted group-hover:text-text-secondary transition-colors">
                  ←
                </span>
                <div>
                  <p className="text-[10px] text-text-muted uppercase tracking-wider">
                    {lang === "en" ? "Previous" : "पिछला"}
                  </p>
                  <p className="text-sm font-medium text-text-primary">
                    {prev.name[lang]}
                  </p>
                </div>
              </Link>
            ) : (
              <div />
            )}

            {next ? (
              <Link
                href={`/universe/${next.id}`}
                className="group flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] transition-all text-right"
              >
                <div>
                  <p className="text-[10px] text-text-muted uppercase tracking-wider">
                    {lang === "en" ? "Next" : "अगला"}
                  </p>
                  <p className="text-sm font-medium text-text-primary">
                    {next.name[lang]}
                  </p>
                </div>
                <span className="text-text-muted group-hover:text-text-secondary transition-colors">
                  →
                </span>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
