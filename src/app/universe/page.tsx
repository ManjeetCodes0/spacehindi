"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { Navbar, Footer } from "@/components/layout";
import { celestialBodies } from "@/data/universe/planets";
import GlassPanel from "@/components/ui/GlassPanel";
import { useLang } from "@/context/LanguageContext";

export default function UniverseHub() {
  const { lang } = useLang();
  const sorted = [...celestialBodies].sort((a, b) => a.order - b.order);
  const planetsWithImages = new Set(["mercury", "venus", "earth", "mars", "jupiter", "saturn"]);

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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
              {sorted.map((body, i) => {
                const hasImage = planetsWithImages.has(body.id);
                return (
                  <Link key={body.id} href={`/universe/${body.id}`}>
                    <GlassPanel
                      intensity="medium"
                      className="p-8 pb-10 flex flex-col items-center justify-center text-center group hover:border-white/[0.15] transition-all duration-500 cursor-pointer h-full relative overflow-hidden"
                      style={{
                        background: "rgba(10, 15, 25, 0.4)",
                        backdropFilter: "blur(24px)",
                        border: "1px solid rgba(255,255,255,0.05)",
                        boxShadow: "0 30px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
                        borderRadius: "24px",
                      }}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      whileHover={{ y: -8 }}
                    >
                      {/* Subdued background glow on hover */}
                      <div
                        className="absolute w-[150%] h-[150%] rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none"
                        style={{
                          background: `radial-gradient(circle, ${body.color} 0%, transparent 60%)`,
                          filter: "blur(40px)",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                        }}
                      />

                      {/* Planet Image Container */}
                      <div className="relative flex justify-center items-center w-full min-h-[160px] sm:min-h-[220px] mb-8 mt-4">
                        {/* Ambient base glow mirroring the Theronix HUD effect */}
                        <div
                          className="absolute bottom-0 w-[60%] h-[40%] rounded-full opacity-30 group-hover:opacity-70 transition-opacity duration-500 pointer-events-none"
                          style={{
                            background: `radial-gradient(ellipse at center, ${body.color}80 0%, transparent 70%)`,
                            filter: "blur(40px)",
                            transform: "translateY(50%)",
                          }}
                        />

                        {/* Outer Glow */}
                        <div
                          className="absolute rounded-full pointer-events-none opacity-50 group-hover:opacity-80 transition-opacity duration-500"
                          style={{
                            width: "120%",
                            height: "120%",
                            background: `radial-gradient(circle, ${body.color}20 0%, transparent 70%)`,
                            filter: "blur(30px)",
                          }}
                        />

                        {/* Planet Sphere */}
                        <div className="relative w-40 h-40 sm:w-56 sm:h-56 group-hover:scale-105 transition-transform duration-700 ease-out z-10">
                          {hasImage ? (
                            <Image
                              src={`/universe/planets/${body.id}/${body.id}1.png`}
                              alt={body.name[lang]}
                              fill
                              priority
                              unoptimized
                              sizes="(max-width: 768px) 60vw, 30vw"
                              style={{ objectFit: "contain", filter: `drop-shadow(0 20px 40px ${body.color}60)` }}
                            />
                          ) : (
                            /* Fallback CSS Sphere */
                            <div className="relative w-full h-full flex items-center justify-center">
                              {body.ring && (
                                <div
                                  className="absolute rounded-[50%] border opacity-60"
                                  style={{
                                    width: "140%",
                                    height: "30%",
                                    borderColor: body.color,
                                    transform: "rotateX(75deg)",
                                    boxShadow: `0 0 20px ${body.color}40`,
                                  }}
                                />
                              )}
                              <div
                                className="w-full h-full rounded-full"
                                style={{
                                  background: body.gradient,
                                  boxShadow: `
                                    inset -20px -15px 40px rgba(0,0,0,0.8),
                                    inset 10px 10px 20px rgba(255,255,255,0.1),
                                    0 0 50px ${body.color}40
                                  `,
                                }}
                              />
                            </div>
                          )}
                        </div>
                      </div>

                      <h3
                        className="text-2xl sm:text-3xl font-bold tracking-[0.15em] uppercase text-text-primary z-10"
                        style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                      >
                        {body.name[lang]}
                      </h3>
                      <p className="text-xs sm:text-sm text-text-muted mt-2 uppercase tracking-[0.2em] font-medium z-10">
                        {body.type[lang]}
                      </p>
                      
                      <div className="w-12 h-px bg-white/20 my-6 z-10" />

                      <p
                        className="text-sm line-clamp-3 leading-relaxed mb-6 z-10"
                        style={{ color: `${body.color}cc` }}
                      >
                        {body.tagline[lang]}
                      </p>

                      {/* Quick stats matching the new HUD format */}
                      <div className="flex justify-center gap-6 sm:gap-10 opacity-70 group-hover:opacity-100 transition-opacity z-10">
                        <div className="flex flex-col">
                          <span className="text-[10px] text-text-muted tracking-widest uppercase mb-1">
                            {lang === "en" ? "Gravity" : "गुरुत्व"}
                          </span>
                          <span className="text-sm font-semibold text-text-primary">
                            {body.stats.gravity.value} <span className="text-[10px] font-normal">m/s²</span>
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[10px] text-text-muted tracking-widest uppercase mb-1">
                            {lang === "en" ? "Temp" : "तापमान"}
                          </span>
                          <span className="text-sm font-semibold text-text-primary">
                            {body.stats.temperature.value} <span className="text-[10px] font-normal">°C</span>
                          </span>
                        </div>
                      </div>

                      {/* Hover Explore Indicator */}
                      <div className="absolute top-6 right-6 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 z-10">
                        <div 
                          className="w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md"
                          style={{ background: `${body.color}20`, border: `1px solid ${body.color}40` }}
                        >
                          <svg className="w-4 h-4" style={{ color: body.color }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </GlassPanel>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
