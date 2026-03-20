"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { planets } from "@/data/planets";
import PlanetWeight from "./PlanetWeight";

interface WeightCalculatorProps {
  lang: "en" | "hi";
}

const text = {
  en: {
    title: "Weight on Other Planets",
    subtitle: "See how gravity changes your weight across the solar system",
    inputLabel: "Your Weight on Earth",
    placeholder: "Enter weight in kg",
    hint: "The results update in real-time as you type",
    funFact: "Fun Fact",
    factText:
      "On Jupiter, you'd weigh over 2.5x your Earth weight — making even standing up a workout!",
  },
  hi: {
    title: "ग्रहों पर आपका वज़न",
    subtitle: "देखें कि सौरमंडल में गुरुत्वाकर्षण आपके वज़न को कैसे बदलता है",
    inputLabel: "पृथ्वी पर आपका वज़न",
    placeholder: "वज़न किग्रा में दर्ज करें",
    hint: "जैसे आप टाइप करेंगे, परिणाम रियल-टाइम अपडेट होंगे",
    funFact: "रोचक तथ्य",
    factText:
      "बृहस्पति पर, आपका वज़न पृथ्वी के वज़न से 2.5 गुना अधिक होगा — खड़ा होना भी एक कसरत होगी!",
  },
};

export default function WeightCalculator({ lang }: WeightCalculatorProps) {
  const [weight, setWeight] = useState<string>("");
  const t = text[lang];

  const earthWeight = parseFloat(weight) || 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-bold text-text-primary mb-3"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          {t.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-text-secondary"
        >
          {t.subtitle}
        </motion.p>
      </div>

      {/* Input section */}
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
        <label className="block text-sm font-medium text-text-secondary mb-2">
          {t.inputLabel}
        </label>
        <div className="relative">
          <input
            type="number"
            inputMode="decimal"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder={t.placeholder}
            min="0"
            max="10000"
            className="
              w-full px-5 py-4 rounded-xl text-2xl font-bold tabular-nums
              bg-space-elevated border border-space-border
              text-text-primary placeholder:text-text-muted/50 placeholder:text-base placeholder:font-normal
              outline-none
              transition-all duration-250 ease-out
              focus:border-neon-violet/50 focus:shadow-[0_0_20px_rgba(139,92,246,0.15)]
              hover:border-space-border/80
              [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
            "
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-text-muted font-medium">
            {lang === "en" ? "kg" : "किग्रा"}
          </span>
        </div>
        <p className="text-xs text-text-muted mt-2">{t.hint}</p>
      </motion.div>

      {/* Planet grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        {planets.map((planet, i) => (
          <PlanetWeight
            key={planet.id}
            planet={planet}
            earthWeight={earthWeight}
            lang={lang}
            index={i}
          />
        ))}
      </div>

      {/* Fun fact */}
      {earthWeight > 0 && (
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
