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
  sm: "w-12 h-12",
  md: "w-16 h-16",
  lg: "w-20 h-20",
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
        flex flex-col items-center gap-3 p-4 sm:p-5 rounded-2xl
        bg-[rgba(17,17,40,0.5)] backdrop-blur-sm
        border border-white/[0.06]
        hover:border-white/[0.12] hover:bg-[rgba(17,17,40,0.7)]
        transition-all duration-300 group
        min-w-[120px]
      "
    >
      {/* Planet sphere */}
      <div className="relative">
        <div
          className={`${sizeMap[planet.size]} rounded-full relative`}
          style={{
            background: planet.gradient,
            boxShadow: `inset -4px -2px 8px rgba(0,0,0,0.4), 0 0 20px ${planet.color}20`,
          }}
        >
          {/* Light reflection */}
          <div
            className="absolute top-[15%] left-[20%] w-[30%] h-[25%] rounded-full"
            style={{
              background: "radial-gradient(ellipse, rgba(255,255,255,0.15) 0%, transparent 70%)",
              filter: "blur(2px)",
            }}
          />
          {/* Ring for Saturn/Uranus */}
          {planet.ring && (
            <div
              className="absolute inset-[-25%] rounded-full border border-white/10 pointer-events-none"
              style={{ transform: "rotateX(75deg)" }}
            />
          )}
        </div>
        {/* Glow pulse on hover */}
        <div
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle, ${planet.color}15 0%, transparent 70%)`,
            transform: "scale(1.8)",
          }}
        />
      </div>

      {/* Planet name */}
      <p className="text-xs font-medium text-text-muted group-hover:text-text-secondary transition-colors">
        {planet.name[lang]}
      </p>

      {/* Weight value */}
      <div className="text-center">
        <p
          className="text-xl sm:text-2xl font-bold tabular-nums"
          style={{ color: planet.color }}
        >
          {earthWeight > 0 ? animatedWeight : "—"}
        </p>
        <p className="text-[10px] text-text-muted mt-0.5">
          {lang === "en" ? "kg" : "किग्रा"}
        </p>
      </div>

      {/* Gravity badge */}
      <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.04] text-text-muted">
        {planet.gravity}x g
      </span>
    </motion.div>
  );
}
