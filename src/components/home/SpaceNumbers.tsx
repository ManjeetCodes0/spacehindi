"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface SpaceNumbersProps {
  lang: "en" | "hi";
}

interface SpaceStat {
  value: number;
  suffix: string;
  label: { en: string; hi: string };
  description: { en: string; hi: string };
  color: string;
  icon: string;
}

const stats: SpaceStat[] = [
  {
    value: 100,
    suffix: "B+",
    label: { en: "Galaxies", hi: "आकाशगंगाएँ" },
    description: {
      en: "Estimated galaxies in the observable universe",
      hi: "अवलोकन योग्य ब्रह्मांड में अनुमानित आकाशगंगाएँ",
    },
    color: "#8b5cf6",
    icon: "M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z",
  },
  {
    value: 13.8,
    suffix: "B yrs",
    label: { en: "Age of Universe", hi: "ब्रह्मांड की आयु" },
    description: {
      en: "Years since the Big Bang created space and time",
      hi: "बिग बैंग द्वारा स्थान और समय बनाए जाने के बाद के वर्ष",
    },
    color: "#f59e0b",
    icon: "M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
  },
  {
    value: 299792,
    suffix: " km/s",
    label: { en: "Speed of Light", hi: "प्रकाश की गति" },
    description: {
      en: "Nothing in the universe can travel faster",
      hi: "ब्रह्मांड में कुछ भी इससे तेज यात्रा नहीं कर सकता",
    },
    color: "#06b6d4",
    icon: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z",
  },
  {
    value: 4.24,
    suffix: " ly",
    label: { en: "Nearest Star", hi: "निकटतम तारा" },
    description: {
      en: "Light-years to Proxima Centauri, our closest stellar neighbor",
      hi: "प्रॉक्सिमा सेंटॉरी, हमारे निकटतम तारकीय पड़ोसी तक प्रकाश-वर्ष",
    },
    color: "#ec4899",
    icon: "M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z",
  },
];

const text = {
  en: {
    badge: "The Universe in Numbers",
    title: "Mind-Blowing Space Facts",
    subtitle: "Numbers that put the vastness of our cosmos into perspective",
  },
  hi: {
    badge: "संख्याओं में ब्रह्मांड",
    title: "अद्भुत अंतरिक्ष तथ्य",
    subtitle: "संख्याएँ जो हमारे ब्रह्मांड की विशालता को परिप्रेक्ष्य में रखती हैं",
  },
};

function AnimatedCounter({
  target,
  suffix,
  color,
  inView,
}: {
  target: number;
  suffix: string;
  color: string;
  inView: boolean;
}) {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [display, setDisplay] = useState(target); // Start with real value for SSR/crawlers

  useEffect(() => {
    if (!inView || hasAnimated) return;

    // Reset to 0 for animation start
    setDisplay(0);
    setHasAnimated(true);

    const duration = 2000;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(target * eased);
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [inView, target, hasAnimated]);

  // Use explicit "en-US" locale to avoid server/client hydration mismatch
  const formatted =
    target >= 1000
      ? Math.round(display).toLocaleString("en-US")
      : display < 10
        ? display.toFixed(1)
        : display.toFixed(1);

  return (
    <span className="text-3xl sm:text-4xl md:text-5xl font-bold tabular-nums" style={{ color }}>
      {formatted}
      <span className="text-lg sm:text-xl ml-1">{suffix}</span>
    </span>
  );
}

export default function SpaceNumbers({ lang }: SpaceNumbersProps) {
  const t = text[lang];
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-16 sm:py-24" ref={ref}>
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
            bg-neon-pink/10 border border-neon-pink/20 mb-5"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-neon-pink" />
          <span className="text-xs font-medium text-neon-pink tracking-wide">{t.badge}</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-4"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          {t.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-text-secondary text-base sm:text-lg"
        >
          {t.subtitle}
        </motion.p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label.en}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="
              relative group p-6 rounded-2xl
              bg-[rgba(17,17,40,0.55)] backdrop-blur-xl
              border border-white/[0.07]
              hover:border-white/[0.15]
              transition-all duration-300 overflow-hidden
            "
          >
            {/* Glow */}
            <div
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ boxShadow: `inset 0 0 40px ${stat.color}15` }}
            />

            {/* Icon */}
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
              style={{ backgroundColor: `${stat.color}15` }}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
                style={{ color: stat.color }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d={stat.icon} />
              </svg>
            </div>

            {/* Counter */}
            <AnimatedCounter
              target={stat.value}
              suffix={stat.suffix}
              color={stat.color}
              inView={inView}
            />

            {/* Label */}
            <p
              className="text-base font-semibold text-text-primary mt-2"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              {stat.label[lang]}
            </p>
            <p className="text-xs text-text-muted mt-1 leading-relaxed">
              {stat.description[lang]}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
