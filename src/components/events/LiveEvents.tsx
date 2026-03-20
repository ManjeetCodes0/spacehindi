"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { spaceEvents, adSlots } from "@/data/events";
import CountdownUnit from "./CountdownUnit";

interface LiveEventsProps {
  lang: "en" | "hi";
  onRemind: (mission: string) => void;
}

const text = {
  en: {
    badge: "Real-Time Mission Tracking",
    title: "Live Space Events",
    subtitle: "Upcoming rocket launches, flybys, and milestones from ISRO, NASA, SpaceX, and ESA.",
    remindMe: "Remind Me",
    location: "Location",
    type: { launch: "Launch", landing: "Landing", flyby: "Flyby", docking: "Docking" },
    sponsored: "Sponsored",
  },
  hi: {
    badge: "रियल-टाइम मिशन ट्रैकिंग",
    title: "लाइव स्पेस इवेंट्स",
    subtitle: "ISRO, NASA, SpaceX, और ESA से आगामी रॉकेट लॉन्च, फ्लाईबाई और मील के पत्थर।",
    remindMe: "रिमाइंड करें",
    location: "स्थान",
    type: { launch: "लॉन्च", landing: "लैंडिंग", flyby: "फ्लाईबाई", docking: "डॉकिंग" },
    sponsored: "प्रायोजित",
  },
};

const typeIcons: Record<string, string> = {
  launch: "M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z",
  landing: "M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5",
  flyby: "M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5a17.92 17.92 0 01-8.716-2.247m0 0A8.966 8.966 0 013 12c0-1.264.26-2.467.732-3.558",
  docking: "M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244",
};

export default function LiveEvents({ lang, onRemind }: LiveEventsProps) {
  const t = text[lang];

  // Interleave ads after every 2 events
  const items: Array<{ type: "event"; data: (typeof spaceEvents)[number] } | { type: "ad"; data: (typeof adSlots)[number] }> = [];
  let adIndex = 0;
  spaceEvents.forEach((event, i) => {
    items.push({ type: "event", data: event });
    if ((i + 1) % 2 === 0 && adIndex < adSlots.length) {
      items.push({ type: "ad", data: adSlots[adIndex] });
      adIndex++;
    }
  });

  return (
    <section className="py-12 sm:py-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
            bg-neon-blue/10 border border-neon-blue/20 mb-5"
        >
          <span className="w-2 h-2 rounded-full bg-neon-blue animate-pulse" />
          <span className="text-xs font-medium text-neon-blue tracking-wide">
            {t.badge}
          </span>
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

      {/* Timeline */}
      <div className="max-w-3xl mx-auto space-y-4">
        {items.map((item, i) => {
          if (item.type === "ad") {
            const ad = item.data;
            return (
              <motion.div
                key={ad.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, duration: 0.4 }}
              >
                <Link href={ad.href} className="block group">
                  <div
                    className="relative p-5 rounded-2xl border border-neon-green/15 hover:border-neon-green/30 transition-all duration-300 overflow-hidden"
                    style={{ background: ad.gradient }}
                  >
                    <span className="absolute top-3 right-3 text-[9px] font-semibold text-text-muted uppercase tracking-wider">
                      {t.sponsored}
                    </span>
                    <p className="text-sm font-medium text-text-primary mb-2">{ad.title[lang]}</p>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-neon-green group-hover:gap-2.5 transition-all">
                      {ad.cta[lang]}
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          }

          const event = item.data;
          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04, duration: 0.4 }}
              className="
                group p-5 sm:p-6 rounded-2xl
                bg-[rgba(17,17,40,0.5)] backdrop-blur-xl
                border border-white/[0.07]
                hover:border-white/[0.12]
                transition-all duration-300
              "
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                {/* Left: Agency & type */}
                <div className="flex sm:flex-col items-center sm:items-start gap-3 sm:gap-2 sm:w-28 shrink-0">
                  <span
                    className="px-2.5 py-1 rounded-lg text-xs font-bold border"
                    style={{
                      color: event.agencyColor,
                      borderColor: `${event.agencyColor}40`,
                      backgroundColor: `${event.agencyColor}10`,
                    }}
                  >
                    {event.agency}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-text-muted">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={typeIcons[event.type] || typeIcons.launch} />
                    </svg>
                    {t.type[event.type]}
                  </span>
                </div>

                {/* Center: Content */}
                <div className="flex-1 min-w-0">
                  <h3
                    className="text-base sm:text-lg font-semibold text-text-primary mb-1 group-hover:text-white transition-colors"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    {event.title[lang]}
                  </h3>
                  <p
                    className="text-xs text-text-muted mb-2"
                    style={{ fontFamily: "var(--font-noto-sans-devanagari)" }}
                  >
                    {event.title[lang === "en" ? "hi" : "en"]}
                  </p>
                  <p className="text-sm text-text-muted leading-relaxed mb-3">
                    {event.description[lang]}
                  </p>

                  {/* Location & date */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-text-muted mb-4">
                    <span className="flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                      {event.location[lang]}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                      </svg>
                      {new Date(event.date).toLocaleDateString(lang === "en" ? "en-US" : "hi-IN", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>

                  {/* Countdown */}
                  <CountdownUnit targetDate={event.date} lang={lang} />
                </div>

                {/* Right: Remind button */}
                <div className="sm:self-center shrink-0">
                  <button
                    onClick={() =>
                      onRemind(
                        lang === "en"
                          ? `Reminder set for ${event.mission}!`
                          : `${event.mission} के लिए रिमाइंडर सेट!`
                      )
                    }
                    className="
                      flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer
                      bg-space-elevated border border-space-border
                      text-text-secondary hover:text-text-primary
                      hover:border-neon-violet/30 hover:shadow-[0_0_15px_rgba(139,92,246,0.12)]
                      transition-all duration-200
                    "
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                    </svg>
                    {t.remindMe}
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
