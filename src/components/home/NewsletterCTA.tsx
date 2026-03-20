"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface NewsletterCTAProps {
  lang: "en" | "hi";
}

const text = {
  en: {
    title: "Stay Connected with the Cosmos",
    subtitle: "Get weekly space updates, tool launches, and exclusive content delivered to your inbox.",
    placeholder: "Enter your email",
    button: "Subscribe",
    success: "You're in! Welcome aboard.",
    privacy: "We respect your privacy. Unsubscribe anytime.",
    features: [
      "Weekly space news digest",
      "New tool launch alerts",
      "Exclusive Hindi science content",
    ],
  },
  hi: {
    title: "ब्रह्मांड से जुड़े रहें",
    subtitle: "साप्ताहिक अंतरिक्ष अपडेट, टूल लॉन्च और विशेष सामग्री अपने इनबॉक्स में पाएं।",
    placeholder: "अपना ईमेल दर्ज करें",
    button: "सदस्यता लें",
    success: "आप शामिल हो गए! स्वागत है।",
    privacy: "हम आपकी गोपनीयता का सम्मान करते हैं। कभी भी सदस्यता रद्द करें।",
    features: [
      "साप्ताहिक अंतरिक्ष समाचार सारांश",
      "नए टूल लॉन्च अलर्ट",
      "विशेष हिंदी विज्ञान सामग्री",
    ],
  },
};

export default function NewsletterCTA({ lang }: NewsletterCTAProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const t = text[lang];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section className="py-16 sm:py-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="
          relative max-w-4xl mx-auto rounded-3xl overflow-hidden
          border border-white/[0.07]
        "
      >
        {/* BG gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 30% 20%, rgba(139,92,246,0.15) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(236,72,153,0.1) 0%, transparent 50%), rgba(17,17,40,0.7)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 p-8 sm:p-12 md:p-16">
          <div className="max-w-2xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-4"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              {t.title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-text-secondary text-base sm:text-lg mb-8"
            >
              {t.subtitle}
            </motion.p>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="flex flex-wrap items-center justify-center gap-4 mb-8"
            >
              {t.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <svg
                    className="w-4 h-4 text-neon-green shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                  <span className="text-sm text-text-secondary">{feature}</span>
                </div>
              ))}
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center justify-center gap-2 text-neon-green py-4"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                  <span className="font-medium">{t.success}</span>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.placeholder}
                    required
                    className="
                      flex-1 px-5 py-3.5 rounded-xl text-sm
                      bg-space-elevated border border-space-border
                      text-text-primary placeholder:text-text-muted
                      outline-none
                      transition-all duration-250 ease-out
                      focus:border-neon-violet/50 focus:shadow-[0_0_20px_rgba(139,92,246,0.15)]
                    "
                  />
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="
                      px-8 py-3.5 rounded-xl text-sm font-semibold text-white cursor-pointer
                      bg-gradient-to-r from-neon-violet to-neon-pink
                      shadow-[0_0_25px_rgba(139,92,246,0.3)]
                      hover:shadow-[0_0_35px_rgba(139,92,246,0.5)]
                      transition-shadow duration-300
                    "
                  >
                    {t.button}
                  </motion.button>
                </form>
              )}

              <p className="text-xs text-text-muted mt-3">{t.privacy}</p>
            </motion.div>
          </div>
        </div>

        {/* Decorative stars */}
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white pointer-events-none"
            style={{
              width: i % 3 === 0 ? 2 : 1,
              height: i % 3 === 0 ? 2 : 1,
              top: `${(i * 37 + 13) % 100}%`,
              left: `${(i * 53 + 7) % 100}%`,
              opacity: 0.1 + (i % 5) * 0.05,
            }}
          />
        ))}
      </motion.div>
    </section>
  );
}
