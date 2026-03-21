"use client";

import { motion } from "framer-motion";
import { getMoonsByPlanet } from "@/data/universe/moons";
import type { Moon } from "@/data/universe/moons";
import GlassPanel from "@/components/ui/GlassPanel";

interface MoonGalleryProps {
  lang: "en" | "hi";
  planetId: string;
}

function MoonCard({ moon, lang, index }: { moon: Moon; lang: "en" | "hi"; index: number }) {
  return (
    <GlassPanel
      intensity="light"
      className="p-4 group hover:border-white/[0.15] transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <div className="flex items-start gap-3">
        {/* Moon sphere */}
        <div
          className="w-12 h-12 rounded-full flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
          style={{
            background: moon.gradient,
            boxShadow: `inset -4px -2px 8px rgba(0,0,0,0.5), 0 0 12px ${moon.color}20`,
          }}
        />
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-text-primary">
            {moon.name[lang]}
          </h4>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-xs text-text-muted">
              {lang === "en" ? "Diameter" : "व्यास"}: {moon.diameter} km
            </span>
            <span className="text-xs text-text-muted">
              {lang === "en" ? "Discovered" : "खोज"}: {moon.discovery}
            </span>
          </div>
          <p className="text-xs text-text-secondary mt-2 leading-relaxed">
            {moon.fact[lang]}
          </p>
        </div>
      </div>
    </GlassPanel>
  );
}

export default function MoonGallery({ lang, planetId }: MoonGalleryProps) {
  const planetMoons = getMoonsByPlanet(planetId);

  if (planetMoons.length === 0) return null;

  return (
    <section>
      <h3
        className="text-xl font-bold text-text-primary mb-4"
        style={{ fontFamily: "var(--font-space-grotesk)" }}
      >
        {lang === "en" ? "Moons" : "चंद्रमा"}
        <span className="ml-2 text-sm font-normal text-text-muted">
          ({planetMoons.length})
        </span>
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {planetMoons.map((moon, i) => (
          <MoonCard key={moon.id} moon={moon} lang={lang} index={i} />
        ))}
      </div>
    </section>
  );
}
