"use client";

import { motion } from "framer-motion";
import { useAnimatedNumber } from "@/hooks/useAnimatedNumber";
import type { Planet } from "@/data/planets";

interface PlanetWeightProps {
  planet: Planet;
  earthWeight: number;
  lang: "en" | "hi";
  index: number;
}

const sizeMap = {
  sm: "w-[60px] h-[60px]",
  md: "w-[80px] h-[80px]",
  lg: "w-[100px] h-[100px]",
};

export default function PlanetWeight({ planet, earthWeight, lang, index }: PlanetWeightProps) {
  const weight = earthWeight * planet.gravity;
  const animatedWeight = useAnimatedNumber(weight, 500, 1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4, ease: "easeOut" as const }}
      className="
        flex flex-col items-center gap-3 p-5 sm:p-6 rounded-2xl
        bg-bg-elevated/50 backdrop-blur-sm
        border border-bg-border/50
        hover:border-accent/40 hover:bg-bg-elevated shadow-sm hover:shadow-lg
        transition-all duration-300 group
        min-w-[120px]
      "
    >
      {/* Planet sphere */}
      <div className="relative mb-2">
        <img
          src={planet.id === "moon" ? "/universe/moons/earth/Moon-earth.png" : `/universe/planets/${planet.id}/${planet.id}1.png`}
          alt={planet.name[lang]}
          className={`${sizeMap[planet.size]} rounded-full relative object-cover pointer-events-none transition-transform duration-700 group-hover:scale-110 group-hover:rotate-12 grayscale-[10%]`}
          style={{
            filter: `drop-shadow(0 0 14px ${planet.color}80)`,
            boxShadow: `inset -6px -6px 12px rgba(0,0,0,0.6)`
          }}
        />
        {/* Glow pulse on hover */}
        <div
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${planet.color}25 0%, transparent 70%)`,
            transform: "scale(1.8)",
          }}
        />
      </div>

      {/* Planet name */}
      <p className="text-sm font-semibold text-text-secondary group-hover:text-text-primary transition-colors">
        {planet.name[lang]}
      </p>

      {/* Weight value */}
      <div className="text-center">
        <p
          className="text-2xl sm:text-3xl font-extrabold tabular-nums transition-colors"
          style={{ color: planet.color }}
        >
          {earthWeight > 0 ? animatedWeight : "—"}
        </p>
        <p className="text-[11px] text-text-muted mt-1 uppercase tracking-wider font-bold">
          {lang === "en" ? "kg" : "किग्रा"}
        </p>
      </div>

      {/* Gravity badge */}
      <span className="text-[11px] px-3 py-1 font-bold rounded-full bg-bg-surface border border-bg-border text-text-muted mt-1 group-hover:border-accent/30 group-hover:text-accent transition-colors">
        {planet.gravity}x g
      </span>
    </motion.div>
  );
}
