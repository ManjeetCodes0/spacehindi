"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { planets } from "@/data/planets";
import SpaceAgeCard from "./SpaceAgeCard";

interface SpaceAgeCalculatorProps {
  lang: "en" | "hi";
}

const orbitalPeriods: Record<string, number> = {
  mercury: 0.24,
  venus: 0.61,
  earth: 1.0,
  mars: 1.88,
  jupiter: 11.86,
  saturn: 29.45,
  uranus: 84.01,
  neptune: 164.79,
};

const text = {
  en: {
    title: "Space Age Calculator",
    subtitle: "Find out how old you'd be on every planet in our solar system",
    dayLabel: "Day",
    monthLabel: "Month",
    yearLabel: "Year",
    dayPlaceholder: "DD",
    monthPlaceholder: "MM",
    yearPlaceholder: "YYYY",
    hint: "Enter your birthdate to see your age on other planets",
    funFact: "Fun Fact",
    factText:
      "On Mercury, you'd celebrate a birthday every 88 Earth days — that's over 4 birthdays per Earth year!",
    earthAge: "Your Earth age",
    years: "years",
  },
  hi: {
    title: "अंतरिक्ष आयु कैलकुलेटर",
    subtitle: "जानें कि सौरमंडल के हर ग्रह पर आपकी आयु कितनी होगी",
    dayLabel: "दिन",
    monthLabel: "महीना",
    yearLabel: "वर्ष",
    dayPlaceholder: "DD",
    monthPlaceholder: "MM",
    yearPlaceholder: "YYYY",
    hint: "अन्य ग्रहों पर अपनी आयु जानने के लिए जन्मतिथि दर्ज करें",
    funFact: "रोचक तथ्य",
    factText:
      "बुध पर, आप हर 88 पृथ्वी दिनों में जन्मदिन मनाएँगे — यानी एक पृथ्वी वर्ष में 4 से ज़्यादा जन्मदिन!",
    earthAge: "पृथ्वी पर आपकी आयु",
    years: "वर्ष",
  },
};

// Planets to display (exclude Moon which has no orbital period data)
const agePlanets = planets.filter((p) => p.id in orbitalPeriods);

export default function SpaceAgeCalculator({ lang }: SpaceAgeCalculatorProps) {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const t = text[lang];

  const earthAgeYears = useMemo(() => {
    const d = parseInt(day, 10);
    const m = parseInt(month, 10);
    const y = parseInt(year, 10);

    if (!d || !m || !y || y < 1900 || y > 2026 || m < 1 || m > 12 || d < 1 || d > 31) return 0;

    const birthDate = new Date(y, m - 1, d);
    const now = new Date();

    if (birthDate > now) return 0;

    const diffMs = now.getTime() - birthDate.getTime();
    return diffMs / (1000 * 60 * 60 * 24 * 365.25);
  }, [day, month, year]);

  const inputClass = `
    w-full px-4 py-4 rounded-xl text-2xl font-bold tabular-nums text-center
    bg-space-elevated border border-space-border
    text-text-primary placeholder:text-text-muted/50 placeholder:text-base placeholder:font-normal
    outline-none
    transition-all duration-250 ease-out
    focus:border-neon-violet/50 focus:shadow-[0_0_20px_rgba(139,92,246,0.15)]
    hover:border-space-border/80
    [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
  `;

  return (
    <div className="space-y-8 pb-10">
      {/* Input section — Day / Month / Year */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="
          max-w-md mx-auto p-6 rounded-2xl
          bg-[rgba(17,17,40,0.6)] backdrop-blur-xl
          border border-[rgba(139,92,246,0.15)]
        "
      >
        <div className="grid grid-cols-3 gap-3">
          {/* Day */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              {t.dayLabel}
            </label>
            <input
              type="number"
              inputMode="numeric"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              placeholder={t.dayPlaceholder}
              min="1"
              max="31"
              className={inputClass}
            />
          </div>
          {/* Month */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              {t.monthLabel}
            </label>
            <input
              type="number"
              inputMode="numeric"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              placeholder={t.monthPlaceholder}
              min="1"
              max="12"
              className={inputClass}
            />
          </div>
          {/* Year */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              {t.yearLabel}
            </label>
            <input
              type="number"
              inputMode="numeric"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder={t.yearPlaceholder}
              min="1900"
              max="2026"
              className={inputClass}
            />
          </div>
        </div>
        <p className="text-xs text-text-muted mt-3">{t.hint}</p>

        {/* Earth age summary */}
        {earthAgeYears > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.3 }}
            className="mt-4 pt-4 border-t border-white/[0.06] text-center"
          >
            <p className="text-xs text-text-muted">{t.earthAge}</p>
            <p className="text-xl font-bold text-neon-violet tabular-nums">
              {earthAgeYears.toFixed(2)} {t.years}
            </p>
          </motion.div>
        )}
      </motion.div>

      {/* Planet grid */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8 mt-12">
        {agePlanets.map((planet, i) => (
          <SpaceAgeCard
            key={planet.id}
            planet={planet}
            orbitalPeriod={orbitalPeriods[planet.id]}
            earthAgeYears={earthAgeYears}
            lang={lang}
            index={i}
          />
        ))}
      </div>

      {/* Fun fact */}
      {earthAgeYears > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="
            max-w-2xl mx-auto p-5 rounded-2xl
            bg-neon-violet/[0.06] border border-neon-violet/15
            flex items-start gap-3
          "
        >
          <span className="shrink-0 w-8 h-8 rounded-lg bg-neon-violet/15 flex items-center justify-center text-neon-violet text-sm">
            ?
          </span>
          <div>
            <p className="text-xs font-semibold text-neon-violet mb-1">{t.funFact}</p>
            <p className="text-sm text-text-secondary leading-relaxed">{t.factText}</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
