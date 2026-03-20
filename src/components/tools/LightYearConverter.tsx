"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";

interface LightYearConverterProps {
  lang: "en" | "hi";
}

type Unit = "ly" | "pc" | "au" | "km";

interface UnitInfo {
  label: { en: string; hi: string };
  short: string;
  color: string;
  // Conversion factor TO kilometers
  toKm: number;
}

const units: Record<Unit, UnitInfo> = {
  ly: {
    label: { en: "Light-Years", hi: "प्रकाश-वर्ष" },
    short: "ly",
    color: "#8b5cf6",
    toKm: 9.461e12,
  },
  pc: {
    label: { en: "Parsecs", hi: "पारसेक" },
    short: "pc",
    color: "#06b6d4",
    toKm: 3.0857e13,
  },
  au: {
    label: { en: "Astronomical Units", hi: "खगोलीय इकाई" },
    short: "AU",
    color: "#f59e0b",
    toKm: 1.496e8,
  },
  km: {
    label: { en: "Kilometers", hi: "किलोमीटर" },
    short: "km",
    color: "#10b981",
    toKm: 1,
  },
};

const unitKeys: Unit[] = ["ly", "pc", "au", "km"];

const text = {
  en: {
    title: "Light-Year Converter",
    subtitle: "Convert between cosmic distance units instantly",
    inputLabel: "Enter a value",
    placeholder: "Enter distance",
    fromLabel: "From",
    funFact: "Fun Fact",
    factText:
      "The nearest star to Earth (Proxima Centauri) is about 4.24 light-years away — that's roughly 40 trillion kilometers!",
  },
  hi: {
    title: "प्रकाश-वर्ष कनवर्टर",
    subtitle: "ब्रह्मांडीय दूरी इकाइयों को तुरंत रूपांतरित करें",
    inputLabel: "मान दर्ज करें",
    placeholder: "दूरी दर्ज करें",
    fromLabel: "से",
    funFact: "रोचक तथ्य",
    factText:
      "पृथ्वी का सबसे निकट तारा (प्रॉक्सिमा सेंटॉरी) लगभग 4.24 प्रकाश-वर्ष दूर है — यह लगभग 40 ट्रिलियन किलोमीटर है!",
  },
};

function formatNumber(num: number): string {
  if (num === 0) return "0";
  if (num >= 1e15) return num.toExponential(4);
  if (num >= 1e12) return (num / 1e12).toFixed(4) + "T";
  if (num >= 1e9) return (num / 1e9).toFixed(4) + "B";
  if (num >= 1e6) return (num / 1e6).toFixed(4) + "M";
  if (num >= 1000) return num.toLocaleString("en", { maximumFractionDigits: 4 });
  if (num >= 0.01) return num.toFixed(6);
  return num.toExponential(4);
}

export default function LightYearConverter({ lang }: LightYearConverterProps) {
  const [value, setValue] = useState("");
  const [fromUnit, setFromUnit] = useState<Unit>("ly");
  const t = text[lang];

  const inputNum = parseFloat(value) || 0;

  const conversions = useMemo(() => {
    if (inputNum === 0) return null;
    const inKm = inputNum * units[fromUnit].toKm;
    return unitKeys
      .filter((u) => u !== fromUnit)
      .map((u) => ({
        unit: u,
        value: inKm / units[u].toKm,
      }));
  }, [inputNum, fromUnit]);

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
          max-w-lg mx-auto p-6 rounded-2xl
          bg-[rgba(17,17,40,0.6)] backdrop-blur-xl
          border border-[rgba(59,130,246,0.15)]
        "
      >
        <label className="block text-sm font-medium text-text-secondary mb-2">
          {t.inputLabel}
        </label>
        <div className="relative">
          <input
            type="number"
            inputMode="decimal"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={t.placeholder}
            min="0"
            className="
              w-full px-5 py-4 rounded-xl text-2xl font-bold tabular-nums
              bg-space-elevated border border-space-border
              text-text-primary placeholder:text-text-muted/50 placeholder:text-base placeholder:font-normal
              outline-none transition-all duration-250 ease-out
              focus:border-neon-blue/50 focus:shadow-[0_0_20px_rgba(59,130,246,0.15)]
              hover:border-space-border/80
              [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
            "
          />
        </div>

        {/* Unit selector */}
        <div className="mt-4">
          <p className="text-xs text-text-muted mb-2">{t.fromLabel}</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {unitKeys.map((u) => (
              <button
                key={u}
                onClick={() => setFromUnit(u)}
                className={`
                  px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  border
                  ${
                    fromUnit === u
                      ? "border-white/20 bg-white/[0.08] text-text-primary"
                      : "border-white/[0.06] bg-white/[0.02] text-text-muted hover:bg-white/[0.05] hover:text-text-secondary"
                  }
                `}
              >
                {units[u].label[lang]}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Results grid */}
      {conversions && inputNum > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-3xl mx-auto">
          {conversions.map((c, i) => (
            <motion.div
              key={c.unit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4, ease: "easeOut" }}
              className="
                flex flex-col items-center gap-3 p-5 sm:p-6 rounded-2xl
                bg-[rgba(17,17,40,0.5)] backdrop-blur-sm
                border border-white/[0.06]
                hover:border-white/[0.12] hover:bg-[rgba(17,17,40,0.7)]
                transition-all duration-300 group
              "
            >
              {/* Unit icon circle */}
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold"
                style={{
                  background: `${units[c.unit].color}15`,
                  color: units[c.unit].color,
                }}
              >
                {units[c.unit].short}
              </div>

              {/* Unit name */}
              <p className="text-xs font-medium text-text-muted group-hover:text-text-secondary transition-colors">
                {units[c.unit].label[lang]}
              </p>

              {/* Converted value */}
              <p
                className="text-xl sm:text-2xl font-bold tabular-nums text-center break-all"
                style={{ color: units[c.unit].color }}
              >
                {formatNumber(c.value)}
              </p>
            </motion.div>
          ))}
        </div>
      )}

      {/* Fun fact */}
      {inputNum > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="
            max-w-2xl mx-auto p-5 rounded-2xl
            bg-neon-blue/[0.06] border border-neon-blue/15
            flex items-start gap-3
          "
        >
          <span className="shrink-0 w-8 h-8 rounded-lg bg-neon-blue/15 flex items-center justify-center text-neon-blue text-sm">
            ?
          </span>
          <div>
            <p className="text-xs font-semibold text-neon-blue mb-1">{t.funFact}</p>
            <p className="text-sm text-text-secondary leading-relaxed">{t.factText}</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
