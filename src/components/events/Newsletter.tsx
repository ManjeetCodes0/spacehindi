"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface NewsletterProps {
  lang: "en" | "hi";
  onSubscribe?: (email: string) => void;
}

const text = {
  en: {
    title: "Join the Space Community",
    subtitle: "Get the universe delivered to your inbox every week.",
    perks: [
      { icon: "🌌", label: "Free HD Space Wallpapers" },
      { icon: "📰", label: "Weekly Science News Digest" },
      { icon: "🔭", label: "Exclusive Tool Early Access" },
      { icon: "🎁", label: "Member-Only Shop Deals" },
    ],
    placeholder: "your@email.com",
    cta: "Subscribe Free",
    privacy: "No spam. Unsubscribe anytime.",
    thanks: "Welcome aboard! Check your inbox.",
    supportTitle: "Support ScienceHindi 360",
    supportText: "Help us keep science free, accessible, and ad-light. Every contribution powers new tools and stories.",
    buyMeCoffee: "Buy Me a Coffee",
    patreon: "Support on Patreon",
  },
  hi: {
    title: "स्पेस कम्युनिटी से जुड़ें",
    subtitle: "हर हफ्ते अपने इनबॉक्स में ब्रह्मांड प्राप्त करें।",
    perks: [
      { icon: "🌌", label: "मुफ्त HD स्पेस वॉलपेपर" },
      { icon: "📰", label: "साप्ताहिक विज्ञान समाचार" },
      { icon: "🔭", label: "एक्सक्लूसिव टूल अर्ली एक्सेस" },
      { icon: "🎁", label: "सदस्य-विशेष शॉप डील" },
    ],
    placeholder: "your@email.com",
    cta: "मुफ्त सब्सक्राइब करें",
    privacy: "कोई स्पैम नहीं। कभी भी अनसब्सक्राइब करें।",
    thanks: "स्वागत है! अपना इनबॉक्स चेक करें।",
    supportTitle: "ScienceHindi 360 को सपोर्ट करें",
    supportText: "विज्ञान को मुफ्त, सुलभ और कम-विज्ञापन रखने में हमारी मदद करें। हर योगदान नए टूल और कहानियों को शक्ति देता है।",
    buyMeCoffee: "बाय मी अ कॉफी",
    patreon: "Patreon पर सपोर्ट करें",
  },
};

export default function Newsletter({ lang, onSubscribe }: NewsletterProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const t = text[lang];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    onSubscribe?.(email);
    setSubmitted(true);
    setEmail("");
  };

  return (
    <section className="py-16 sm:py-20">
      {/* Newsletter */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="
          relative overflow-hidden rounded-3xl p-8 sm:p-12
          border border-neon-violet/15
        "
        style={{
          background: "linear-gradient(135deg, rgba(139,92,246,0.08) 0%, rgba(59,130,246,0.06) 50%, rgba(139,92,246,0.04) 100%)",
        }}
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-neon-violet/5 blur-[80px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-neon-blue/5 blur-[60px] pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <h2
            className="text-3xl sm:text-4xl font-bold text-text-primary mb-3"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            {t.title}
          </h2>
          <p className="text-text-secondary mb-8">{t.subtitle}</p>

          {/* Perks grid */}
          <div className="grid grid-cols-2 gap-3 mb-8 max-w-md mx-auto">
            {t.perks.map((perk, i) => (
              <div
                key={i}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.03] border border-white/[0.05]"
              >
                <span className="text-lg">{perk.icon}</span>
                <span className="text-xs font-medium text-text-secondary">{perk.label}</span>
              </div>
            ))}
          </div>

          {/* Form */}
          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.placeholder}
                className="
                  flex-1 px-5 py-3 rounded-xl text-sm
                  bg-space-elevated border border-space-border
                  text-text-primary placeholder:text-text-muted
                  outline-none
                  focus:border-neon-violet/50 focus:shadow-[0_0_15px_rgba(139,92,246,0.15)]
                  transition-all duration-250
                "
              />
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="
                  px-6 py-3 rounded-xl text-sm font-semibold text-white cursor-pointer
                  bg-gradient-to-r from-neon-violet to-neon-blue
                  shadow-[0_0_20px_rgba(139,92,246,0.3)]
                  hover:shadow-[0_0_30px_rgba(139,92,246,0.5)]
                  transition-shadow duration-300
                "
              >
                {t.cta}
              </motion.button>
            </form>
          ) : (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-neon-green font-medium"
            >
              {t.thanks}
            </motion.p>
          )}

          <p className="text-[11px] text-text-muted mt-3">{t.privacy}</p>
        </div>
      </motion.div>

      {/* Support Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="mt-8 text-center"
      >
        <h3
          className="text-xl font-bold text-text-primary mb-2"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          {t.supportTitle}
        </h3>
        <p className="text-sm text-text-muted max-w-lg mx-auto mb-6">
          {t.supportText}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href="#"
            className="
              inline-flex items-center gap-2 px-6 py-3 rounded-xl
              text-sm font-semibold text-white cursor-pointer
              bg-gradient-to-r from-neon-pink to-neon-pink-glow
              shadow-[0_0_20px_rgba(236,72,153,0.3)]
              hover:shadow-[0_0_35px_rgba(236,72,153,0.5)]
              transition-shadow duration-300
            "
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
            {t.buyMeCoffee}
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href="#"
            className="
              inline-flex items-center gap-2 px-6 py-3 rounded-xl
              text-sm font-semibold cursor-pointer
              text-neon-violet border border-neon-violet/40
              bg-neon-violet/[0.05]
              hover:bg-neon-violet/[0.1] hover:border-neon-violet/60
              shadow-[0_0_15px_rgba(139,92,246,0.1)]
              hover:shadow-[0_0_25px_rgba(139,92,246,0.25)]
              transition-all duration-300
            "
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
            </svg>
            {t.patreon}
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}
