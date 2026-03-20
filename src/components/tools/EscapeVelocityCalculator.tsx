"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useAnimatedNumber } from "@/hooks/useAnimatedNumber";
import { planets } from "@/data/planets";

interface EscapeVelocityCalculatorProps {
  lang: "en" | "hi";
}

interface CelestialBody {
  id: string;
  name: { en: string; hi: string };
  mass: number; // in kg
  radius: number; // in meters
  escapeVelocity: number; // in km/s (precomputed for display)
  color: string;
  gradient: string;
  size: "sm" | "md" | "lg";
  ring?: boolean;
}

// Real escape velocities and physical data
const celestialBodies: CelestialBody[] = [
  {
    id: "mercury",
    name: { en: "Mercury", hi: "बुध" },
    mass: 3.3011e23,
    radius: 2.4397e6,
    escapeVelocity: 4.25,
    color: "#a0a0a0",
    gradient: "radial-gradient(circle at 35% 30%, #c8c8c8 0%, #8a8a8a 40%, #5a5a5a 80%)",
    size: "sm",
  },
  {
    id: "venus",
    name: { en: "Venus", hi: "शुक्र" },
    mass: 4.8675e24,
    radius: 6.0518e6,
    escapeVelocity: 10.36,
    color: "#e8a84c",
    gradient: "radial-gradient(circle at 35% 30%, #f0c060 0%, #d4903a 40%, #a06020 80%)",
    size: "md",
  },
  {
    id: "earth",
    name: { en: "Earth", hi: "पृथ्वी" },
    mass: 5.972e24,
    radius: 6.371e6,
    escapeVelocity: 11.19,
    color: "#10b981",
    gradient: "radial-gradient(circle at 35% 30%, #34d399 0%, #059669 40%, #064e3b 80%)",
    size: "md",
  },
  {
    id: "moon",
    name: { en: "Moon", hi: "चंद्रमा" },
    mass: 7.342e22,
    radius: 1.7374e6,
    escapeVelocity: 2.38,
    color: "#9ca3af",
    gradient: "radial-gradient(circle at 35% 30%, #e5e7eb 0%, #9ca3af 40%, #4b5563 80%)",
    size: "sm",
  },
  {
    id: "mars",
    name: { en: "Mars", hi: "मंगल" },
    mass: 6.4171e23,
    radius: 3.3895e6,
    escapeVelocity: 5.03,
    color: "#ec4899",
    gradient: "radial-gradient(circle at 35% 30%, #f87171 0%, #dc2626 40%, #7f1d1d 80%)",
    size: "sm",
  },
  {
    id: "jupiter",
    name: { en: "Jupiter", hi: "बृहस्पति" },
    mass: 1.8982e27,
    radius: 6.9911e7,
    escapeVelocity: 59.5,
    color: "#f59e0b",
    gradient: "radial-gradient(circle at 35% 30%, #fbbf24 0%, #d97706 35%, #92400e 70%, #5a3010 90%)",
    size: "lg",
  },
  {
    id: "saturn",
    name: { en: "Saturn", hi: "शनि" },
    mass: 5.6834e26,
    radius: 5.8232e7,
    escapeVelocity: 35.5,
    color: "#a78bfa",
    gradient: "radial-gradient(circle at 35% 30%, #ddd6b0 0%, #c4a86c 40%, #8a7040 80%)",
    size: "lg",
    ring: true,
  },
  {
    id: "uranus",
    name: { en: "Uranus", hi: "अरुण" },
    mass: 8.6810e25,
    radius: 2.5362e7,
    escapeVelocity: 21.3,
    color: "#06b6d4",
    gradient: "radial-gradient(circle at 35% 30%, #67e8f9 0%, #0891b2 40%, #164e63 80%)",
    size: "md",
    ring: true,
  },
  {
    id: "neptune",
    name: { en: "Neptune", hi: "वरुण" },
    mass: 1.02413e26,
    radius: 2.4622e7,
    escapeVelocity: 23.5,
    color: "#3b82f6",
    gradient: "radial-gradient(circle at 35% 30%, #60a5fa 0%, #2563eb 40%, #1e3a5f 80%)",
    size: "md",
  },
  {
    id: "sun",
    name: { en: "Sun", hi: "सूर्य" },
    mass: 1.989e30,
    radius: 6.9634e8,
    escapeVelocity: 617.5,
    color: "#fbbf24",
    gradient: "radial-gradient(circle at 35% 30%, #fef08a 0%, #fbbf24 40%, #b45309 80%)",
    size: "lg",
  },
];

const sizeMap = {
  sm: "w-12 h-12",
  md: "w-16 h-16",
  lg: "w-20 h-20",
};

const text = {
  en: {
    title: "Escape Velocity Calculator",
    subtitle:
      "Calculate the speed needed to escape the gravitational pull of any celestial body",
    customTitle: "Custom Body",
    massLabel: "Mass (kg)",
    massPlaceholder: "e.g. 5.972e24",
    radiusLabel: "Radius (m)",
    radiusPlaceholder: "e.g. 6371000",
    calculate: "Calculate",
    result: "Escape Velocity",
    kms: "km/s",
    mph: "mph",
    comparison: "vs Earth",
    funFact: "Fun Fact",
    factText:
      "To escape Jupiter's gravity, you'd need to travel at 59.5 km/s — that's over 214,000 km/h, or 5x faster than Earth's escape velocity!",
  },
  hi: {
    title: "पलायन वेग कैलकुलेटर",
    subtitle:
      "किसी भी खगोलीय पिंड के गुरुत्वाकर्षण से बचने के लिए आवश्यक गति की गणना करें",
    customTitle: "कस्टम पिंड",
    massLabel: "द्रव्यमान (kg)",
    massPlaceholder: "जैसे 5.972e24",
    radiusLabel: "त्रिज्या (m)",
    radiusPlaceholder: "जैसे 6371000",
    calculate: "गणना करें",
    result: "पलायन वेग",
    kms: "km/s",
    mph: "mph",
    comparison: "पृथ्वी की तुलना",
    funFact: "रोचक तथ्य",
    factText:
      "बृहस्पति के गुरुत्वाकर्षण से बचने के लिए, आपको 59.5 km/s की गति चाहिए — यह 2,14,000 km/h से अधिक है, पृथ्वी के पलायन वेग से 5 गुना तेज़!",
  },
};

const G = 6.674e-11; // gravitational constant

function EscapeVelocityCard({
  body,
  lang,
  index,
}: {
  body: CelestialBody;
  lang: "en" | "hi";
  index: number;
}) {
  const animatedVelocity = useAnimatedNumber(body.escapeVelocity, 500, 1);
  const ratio = body.escapeVelocity / 11.19; // vs Earth

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.05,
        duration: 0.4,
        ease: "easeOut" as const,
      }}
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
          className={`${sizeMap[body.size]} rounded-full relative`}
          style={{
            background: body.gradient,
            boxShadow: `inset -4px -2px 8px rgba(0,0,0,0.4), 0 0 20px ${body.color}20`,
          }}
        >
          <div
            className="absolute top-[15%] left-[20%] w-[30%] h-[25%] rounded-full"
            style={{
              background:
                "radial-gradient(ellipse, rgba(255,255,255,0.15) 0%, transparent 70%)",
              filter: "blur(2px)",
            }}
          />
          {body.ring && (
            <div
              className="absolute inset-[-25%] rounded-full border border-white/10 pointer-events-none"
              style={{ transform: "rotateX(75deg)" }}
            />
          )}
        </div>
        <div
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle, ${body.color}15 0%, transparent 70%)`,
            transform: "scale(1.8)",
          }}
        />
      </div>

      {/* Name */}
      <p className="text-xs font-medium text-text-muted group-hover:text-text-secondary transition-colors">
        {body.name[lang]}
      </p>

      {/* Velocity */}
      <div className="text-center">
        <p
          className="text-xl sm:text-2xl font-bold tabular-nums"
          style={{ color: body.color }}
        >
          {animatedVelocity}
        </p>
        <p className="text-[10px] text-text-muted mt-0.5">km/s</p>
      </div>

      {/* Ratio badge */}
      <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.04] text-text-muted">
        {ratio.toFixed(2)}x {lang === "en" ? "Earth" : "पृथ्वी"}
      </span>
    </motion.div>
  );
}

export default function EscapeVelocityCalculator({
  lang,
}: EscapeVelocityCalculatorProps) {
  const [customMass, setCustomMass] = useState("");
  const [customRadius, setCustomRadius] = useState("");
  const t = text[lang];

  const customEscapeVelocity = useMemo(() => {
    const m = parseFloat(customMass);
    const r = parseFloat(customRadius);
    if (!m || !r || m <= 0 || r <= 0) return 0;
    // v_e = sqrt(2GM/r) in m/s, convert to km/s
    return Math.sqrt((2 * G * m) / r) / 1000;
  }, [customMass, customRadius]);

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

      {/* Planet grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        {celestialBodies.map((body, i) => (
          <EscapeVelocityCard key={body.id} body={body} lang={lang} index={i} />
        ))}
      </div>

      {/* Custom calculator */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="
          max-w-lg mx-auto p-6 rounded-2xl
          bg-[rgba(17,17,40,0.6)] backdrop-blur-xl
          border border-[rgba(16,185,129,0.15)]
        "
      >
        <h3
          className="text-lg font-semibold text-text-primary mb-4"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          {t.customTitle}
        </h3>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              {t.massLabel}
            </label>
            <input
              type="text"
              inputMode="decimal"
              value={customMass}
              onChange={(e) => setCustomMass(e.target.value)}
              placeholder={t.massPlaceholder}
              className="
                w-full px-4 py-3 rounded-xl text-sm font-medium
                bg-space-elevated border border-space-border
                text-text-primary placeholder:text-text-muted/50
                outline-none transition-all duration-250 ease-out
                focus:border-neon-green/50 focus:shadow-[0_0_20px_rgba(16,185,129,0.15)]
              "
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              {t.radiusLabel}
            </label>
            <input
              type="text"
              inputMode="decimal"
              value={customRadius}
              onChange={(e) => setCustomRadius(e.target.value)}
              placeholder={t.radiusPlaceholder}
              className="
                w-full px-4 py-3 rounded-xl text-sm font-medium
                bg-space-elevated border border-space-border
                text-text-primary placeholder:text-text-muted/50
                outline-none transition-all duration-250 ease-out
                focus:border-neon-green/50 focus:shadow-[0_0_20px_rgba(16,185,129,0.15)]
              "
            />
          </div>
        </div>

        {/* Result */}
        {customEscapeVelocity > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.3 }}
            className="mt-5 pt-5 border-t border-white/[0.06] text-center space-y-1"
          >
            <p className="text-xs text-text-muted">{t.result}</p>
            <p className="text-3xl font-bold text-neon-green tabular-nums">
              {customEscapeVelocity.toFixed(2)}{" "}
              <span className="text-sm text-text-muted">{t.kms}</span>
            </p>
            <p className="text-xs text-text-muted">
              = {(customEscapeVelocity * 3600).toFixed(0)} km/h ·{" "}
              {(customEscapeVelocity / 11.19).toFixed(2)}x {t.comparison}
            </p>
          </motion.div>
        )}
      </motion.div>

      {/* Fun fact */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="
          max-w-2xl mx-auto p-5 rounded-2xl
          bg-neon-green/[0.06] border border-neon-green/15
          flex items-start gap-3
        "
      >
        <span className="shrink-0 w-8 h-8 rounded-lg bg-neon-green/15 flex items-center justify-center text-neon-green text-sm">
          ?
        </span>
        <div>
          <p className="text-xs font-semibold text-neon-green mb-1">{t.funFact}</p>
          <p className="text-sm text-text-secondary leading-relaxed">{t.factText}</p>
        </div>
      </motion.div>
    </div>
  );
}
