"use client";

import { motion } from "framer-motion";
import type { CelestialBody } from "@/data/universe/planets";
import GlassPanel from "@/components/ui/GlassPanel";

interface PlanetDetailsProps {
  body: CelestialBody;
  lang: "en" | "hi";
}

const statLabels: Record<string, { en: string; hi: string; icon: string }> = {
  mass: { en: "Mass", hi: "द्रव्यमान", icon: "⚖" },
  diameter: { en: "Diameter", hi: "व्यास", icon: "◎" },
  gravity: { en: "Gravity", hi: "गुरुत्वाकर्षण", icon: "↓" },
  temperature: { en: "Temperature", hi: "तापमान", icon: "🌡" },
  dayLength: { en: "Day Length", hi: "दिन की लंबाई", icon: "☀" },
  yearLength: { en: "Year Length", hi: "वर्ष की लंबाई", icon: "⟳" },
  distanceFromSun: { en: "Distance from Sun", hi: "सूर्य से दूरी", icon: "↔" },
};

export default function PlanetDetails({ body, lang }: PlanetDetailsProps) {
  const statEntries = Object.entries(body.stats).filter(
    ([key]) => key !== "atmosphere"
  ) as [string, { value: string; unit: string }][];

  return (
    <div className="space-y-6">
      {/* Description */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <p className="text-sm text-text-secondary leading-relaxed">
          {body.description[lang]}
        </p>
      </motion.div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
        {statEntries.map(([key, stat], i) => {
          const label = statLabels[key];
          if (!label) return null;
          return (
            <GlassPanel
              key={key}
              intensity="light"
              className="p-3 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <span className="text-base">{label.icon}</span>
              <p className="text-xs text-text-muted mt-1">{label[lang]}</p>
              <p
                className="text-sm font-bold text-text-primary mt-0.5"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {stat.value}
              </p>
              <p className="text-[10px] text-text-muted">{stat.unit}</p>
            </GlassPanel>
          );
        })}
      </div>

      {/* Atmosphere */}
      <GlassPanel
        intensity="light"
        className="p-4"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-1">
          {lang === "en" ? "Atmosphere" : "वायुमंडल"}
        </h4>
        <p className="text-sm text-text-primary">
          {body.stats.atmosphere[lang]}
        </p>
      </GlassPanel>
    </div>
  );
}
