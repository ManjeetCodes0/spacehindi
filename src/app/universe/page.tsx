"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Navbar, Footer } from "@/components/layout";
import { celestialBodies } from "@/data/universe/planets";
import GlassPanel from "@/components/ui/GlassPanel";
import { useLang } from "@/context/LanguageContext";

export default function UniverseHub() {
  const { lang } = useLang();
  const sorted = [...celestialBodies].sort((a, b) => a.order - b.order);

  return (
    <>
      <Navbar />
      <main className="bg-space-black min-h-screen pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              {lang === "en" ? "Universe Explorer" : "ब्रह्मांड एक्सप्लोरर"}
            </h1>
            <p className="mt-4 text-lg text-text-secondary max-w-2xl mx-auto">
              {lang === "en"
                ? "Journey through our solar system. Explore each planet's secrets, moons, and wonders."
                : "हमारे सौरमंडल की यात्रा। हर ग्रह के रहस्य, चंद्रमा और अजूबों का अन्वेषण करें।"}
            </p>
          </motion.div>

          {/* Solar system visualization */}
          <div className="relative mb-16">
            {/* Sun */}
            <motion.div
              className="flex justify-center mb-8"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <div
                className="w-20 h-20 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle at 35% 30%, #fef08a 0%, #facc15 30%, #f59e0b 60%, #b45309 90%)",
                  boxShadow:
                    "0 0 40px #f59e0b60, 0 0 80px #f59e0b30, 0 0 120px #f59e0b15",
                }}
              />
            </motion.div>

            {/* Planet grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {sorted.map((body, i) => (
                <Link key={body.id} href={`/universe/${body.id}`}>
                  <GlassPanel
                    intensity="light"
                    className="p-5 text-center group hover:border-white/[0.15] transition-all duration-300 cursor-pointer h-full"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    whileHover={{ y: -4 }}
                  >
                    {/* Planet sphere */}
                    <div className="flex justify-center mb-3">
                      <div className="relative">
                        {body.ring && (
                          <div
                            className="absolute rounded-[50%] border opacity-30"
                            style={{
                              width: 80,
                              height: 18,
                              borderColor: body.color,
                              top: "50%",
                              left: "50%",
                              transform: "translate(-50%, -50%) rotateX(75deg)",
                            }}
                          />
                        )}
                        <div
                          className="w-14 h-14 rounded-full group-hover:scale-110 transition-transform duration-500"
                          style={{
                            background: body.gradient,
                            boxShadow: `
                              inset -6px -3px 12px rgba(0,0,0,0.5),
                              0 0 20px ${body.color}25
                            `,
                          }}
                        />
                      </div>
                    </div>

                    <h3
                      className="text-base font-bold text-text-primary"
                      style={{ fontFamily: "var(--font-space-grotesk)" }}
                    >
                      {body.name[lang]}
                    </h3>
                    <p className="text-[10px] text-text-muted mt-0.5 uppercase tracking-wider">
                      {body.type[lang]}
                    </p>
                    <p
                      className="text-xs mt-2 line-clamp-2"
                      style={{ color: `${body.color}cc` }}
                    >
                      {body.tagline[lang]}
                    </p>

                    {/* Quick stats */}
                    <div className="mt-3 flex justify-center gap-3">
                      <div>
                        <p className="text-[10px] text-text-muted">
                          {lang === "en" ? "Gravity" : "गुरुत्व"}
                        </p>
                        <p className="text-xs font-semibold text-text-primary">
                          {body.stats.gravity.value} m/s²
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] text-text-muted">
                          {lang === "en" ? "Temp" : "तापमान"}
                        </p>
                        <p className="text-xs font-semibold text-text-primary">
                          {body.stats.temperature.value}°C
                        </p>
                      </div>
                    </div>

                    {/* Hover arrow */}
                    <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span
                        className="text-xs font-medium"
                        style={{ color: body.color }}
                      >
                        {lang === "en" ? "Explore →" : "खोजें →"}
                      </span>
                    </div>
                  </GlassPanel>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
