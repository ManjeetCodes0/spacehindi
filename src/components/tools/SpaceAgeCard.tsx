"use client";

import { motion } from "framer-motion";
import { useAnimatedNumber } from "@/hooks/useAnimatedNumber";
import type { Planet } from "@/data/planets";

interface SpaceAgeCardProps {
  planet: Planet;
  orbitalPeriod: number;
  earthAgeYears: number;
  lang: "en" | "hi";
  index: number;
}

const sizeMap = {
  sm: "w-16 h-16 md:w-24 md:h-24 xl:w-28 xl:h-28",
  md: "w-20 h-20 md:w-28 md:h-28 xl:w-32 xl:h-32",
  lg: "w-24 h-24 md:w-32 md:h-32 xl:w-40 xl:h-40",
};

export default function SpaceAgeCard({
  planet,
  orbitalPeriod,
  earthAgeYears,
  lang,
  index,
}: SpaceAgeCardProps) {
  const spaceAge = orbitalPeriod > 0 ? earthAgeYears / orbitalPeriod : 0;
  const animatedAge = useAnimatedNumber(spaceAge, 500, 2);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4, ease: "easeOut" as const }}
      className="
        flex flex-col items-center gap-2 p-6 md:p-8 rounded-[2rem]
        bg-[rgba(17,17,40,0.5)] backdrop-blur-xl
        border border-white/[0.08] shadow-xl
        hover:border-white/[0.2] hover:bg-[rgba(17,17,40,0.8)] hover:shadow-2xl hover:-translate-y-2
        transition-all duration-300 group
        w-full
      "
    >
      <div className="relative group w-full flex justify-center">
        <div className={`relative ${sizeMap[planet.size]} group-hover:scale-110 transition-transform duration-700`}>
           <img 
              src={`/universe/planets/${planet.id}/${planet.id}1.png`}
              alt={planet.name.en}
              className="w-full h-full object-contain animate-[spin_40s_linear_infinite] group-hover:animate-[spin_40s_linear_infinite_reverse]"
           />
           {/* Glow subtle pulse behind planet */}
           <div 
             className="absolute inset-0 rounded-full blur-md opacity-30 group-hover:opacity-60 transition-opacity duration-700" 
             style={{ 
               backgroundColor: planet.color, 
               transform: "scale(0.85)",
               boxShadow: `0 0 20px 2px ${planet.color}80` // dynamic glow
             }}
           />
        </div>
      </div>

      {/* Planet name */}
      <p className="text-sm md:text-xl font-bold text-text-muted group-hover:text-text-primary transition-colors uppercase tracking-widest mt-4">
        {planet.name[lang]}
      </p>

      {/* Age value */}
      <div className="text-center mt-2 mb-3">
        <p
          className="text-4xl md:text-5xl lg:text-6xl font-black tabular-nums drop-shadow-lg"
          style={{ color: planet.color }}
        >
          {earthAgeYears > 0 ? animatedAge : "—"}
        </p>
        <p className="text-[11px] md:text-sm font-bold text-text-muted mt-2 tracking-widest uppercase opacity-70">
          {lang === "en" ? "years" : "वर्ष"}
        </p>
      </div>

      {/* Orbital period badge */}
      <span className="text-[10px] md:text-xs font-semibold px-4 py-1.5 mt-2 rounded-full border border-white/10 bg-white/5 text-text-secondary group-hover:bg-white/10 transition-colors">
        {lang === "en" ? "1 yr" : "1 वर्ष"} = {orbitalPeriod}{" "}
        {lang === "en" ? "Earth yr" : "पृथ्वी वर्ष"}
      </span>
    </motion.div>
  );
}
