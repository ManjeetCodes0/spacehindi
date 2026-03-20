"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { spaceEvents } from "@/data/events";

interface UpcomingEventsProps {
  lang: "en" | "hi";
}

const typeIcons: Record<string, string> = {
  launch: "M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z",
  landing: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126Z",
  flyby: "M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5",
  docking: "M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244",
};

const text = {
  en: {
    badge: "Mission Calendar",
    title: "Upcoming Space Events",
    subtitle: "Don't miss these historic launches and cosmic milestones",
    viewAll: "View Full Calendar",
    at: "at",
  },
  hi: {
    badge: "मिशन कैलेंडर",
    title: "आगामी अंतरिक्ष कार्यक्रम",
    subtitle: "इन ऐतिहासिक प्रक्षेपणों और ब्रह्मांडीय मील के पत्थरों को न चूकें",
    viewAll: "पूरा कैलेंडर देखें",
    at: "पर",
  },
};

export default function UpcomingEvents({ lang }: UpcomingEventsProps) {
  const t = text[lang];
  const events = spaceEvents.slice(0, 4);

  return (
    <section className="py-16 sm:py-24">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
            bg-neon-green/10 border border-neon-green/20 mb-5"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
          <span className="text-xs font-medium text-neon-green tracking-wide">{t.badge}</span>
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

      {/* Events timeline */}
      <div className="max-w-3xl mx-auto space-y-4">
        {events.map((event, i) => {
          const date = new Date(event.date);
          const iconPath = typeIcons[event.type] || typeIcons.launch;

          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.45 }}
              className="
                relative group p-5 rounded-2xl
                bg-[rgba(17,17,40,0.55)] backdrop-blur-xl
                border border-white/[0.07]
                hover:border-white/[0.15]
                transition-all duration-300
              "
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ boxShadow: `inset 0 0 30px ${event.agencyColor}10` }}
              />

              <div className="flex items-start gap-4">
                {/* Date block */}
                <div className="shrink-0 w-14 text-center">
                  <p className="text-2xl font-bold text-text-primary" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                    {date.getDate()}
                  </p>
                  <p className="text-xs text-text-muted uppercase">
                    {date.toLocaleDateString(lang === "hi" ? "hi-IN" : "en-US", { month: "short" })}
                  </p>
                  <p className="text-[10px] text-text-muted">{date.getFullYear()}</p>
                </div>

                {/* Divider */}
                <div className="shrink-0 w-px self-stretch bg-white/[0.06] mx-1" />

                {/* Event info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    {/* Agency badge */}
                    <span
                      className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: `${event.agencyColor}20`,
                        color: event.agencyColor,
                      }}
                    >
                      {event.agency}
                    </span>
                    {/* Type icon */}
                    <svg
                      className="w-3.5 h-3.5 text-text-muted"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d={iconPath} />
                    </svg>
                  </div>

                  <h3 className="text-sm sm:text-base font-semibold text-text-primary group-hover:text-white transition-colors">
                    {event.title[lang]}
                  </h3>
                  <p className="text-xs text-text-muted mt-1 line-clamp-1">
                    {event.description[lang]}
                  </p>
                  <p className="text-[11px] text-text-muted mt-2">
                    {event.location[lang]}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* View all CTA */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="text-center mt-10"
      >
        <Link
          href="/events"
          className="
            inline-flex items-center gap-2 px-6 py-3 rounded-xl
            text-sm font-semibold
            text-neon-green border border-neon-green/30
            bg-neon-green/[0.05]
            hover:bg-neon-green/[0.1] hover:border-neon-green/50
            shadow-[0_0_15px_rgba(16,185,129,0.1)]
            hover:shadow-[0_0_25px_rgba(16,185,129,0.2)]
            transition-all duration-300
          "
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
          </svg>
          {t.viewAll}
        </Link>
      </motion.div>
    </section>
  );
}
