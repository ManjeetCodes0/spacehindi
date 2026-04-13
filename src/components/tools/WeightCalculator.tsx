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
  const [weight, setWeight] = useState<string>("60");
  const t = text[lang];

  const earthWeight = parseFloat(weight) || 0;

  return (
    <div className="space-y-12 pb-10">
      {/* Input section */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="
          max-w-[450px] mx-auto p-8 rounded-[2rem]
          bg-bg-surface backdrop-blur-xl shadow-lg border border-bg-border
          relative overflow-hidden
        "
      >
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent pointer-events-none" />
        <label className="block text-sm font-semibold text-text-secondary mb-3 uppercase tracking-wider relative z-10">
          {t.inputLabel}
        </label>
        <div className="relative group z-10">
          <input
            type="number"
            inputMode="decimal"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder={t.placeholder}
            min="0"
            max="10000"
            className="
              w-full px-6 py-5 rounded-2xl text-4xl font-black tabular-nums tracking-wide
              bg-bg-elevated border-2 border-bg-border
              text-text-primary placeholder:text-text-muted/40 placeholder:text-lg placeholder:font-normal
              outline-none shadow-inner
              transition-all duration-300 ease-out
              focus:border-accent focus:shadow-[0_0_30px_rgba(139,92,246,0.2)] focus:bg-bg-primary
              hover:border-accent/50
              [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
            "
          />
          <span className="absolute right-6 top-1/2 -translate-y-1/2 text-xl text-text-muted font-bold transition-colors group-hover:text-text-secondary">
            {lang === "en" ? "kg" : "किग्रा"}
          </span>
        </div>
        <p className="text-xs text-text-muted mt-4 text-center font-medium relative z-10">{t.hint}</p>
      </motion.div>

      {/* Planet grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
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
            max-w-2xl mx-auto p-6 rounded-2xl
            bg-accent/10 border border-accent/20 shadow-md
            flex items-start gap-4 mt-8
          "
        >
          <span className="shrink-0 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-xl shadow-accent/40 font-bold" style={{ color: "var(--accent)" }}>
            !
          </span>
          <div>
            <p className="text-sm font-bold mb-1 uppercase tracking-wider" style={{ color: "var(--accent)" }}>{t.funFact}</p>
            <p className="text-[15px] font-medium text-text-primary leading-relaxed">{t.factText}</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
