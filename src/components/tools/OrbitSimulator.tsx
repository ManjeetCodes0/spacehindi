"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { planets } from "@/data/planets";

interface OrbitSimulatorProps {
  lang: "en" | "hi";
}

// Orbital data: semi-major axis in AU, orbital period in Earth years
const orbitalData: Record<
  string,
  { semiMajorAU: number; period: number; eccentricity: number }
> = {
  mercury: { semiMajorAU: 0.387, period: 0.24, eccentricity: 0.206 },
  venus: { semiMajorAU: 0.723, period: 0.615, eccentricity: 0.007 },
  earth: { semiMajorAU: 1.0, period: 1.0, eccentricity: 0.017 },
  mars: { semiMajorAU: 1.524, period: 1.881, eccentricity: 0.093 },
  jupiter: { semiMajorAU: 5.203, period: 11.86, eccentricity: 0.049 },
  saturn: { semiMajorAU: 9.537, period: 29.45, eccentricity: 0.054 },
  uranus: { semiMajorAU: 19.19, period: 84.01, eccentricity: 0.047 },
  neptune: { semiMajorAU: 30.07, period: 164.8, eccentricity: 0.009 },
};

type ViewMode = "inner" | "outer" | "all";

const text = {
  en: {
    title: "Orbit Simulator",
    subtitle:
      "Visualize planetary orbits and watch planets move according to Kepler's laws",
    speed: "Speed",
    pause: "Pause",
    play: "Play",
    reset: "Reset",
    innerPlanets: "Inner",
    outerPlanets: "Outer",
    allPlanets: "All",
    orbitalPeriod: "Orbital Period",
    years: "yrs",
    distance: "Distance",
    au: "AU",
    keplerTitle: "Kepler's Laws",
    kepler1: "Planets orbit in ellipses with the Sun at one focus.",
    kepler2: "A planet sweeps equal areas in equal times — moving faster near the Sun.",
    kepler3: "The square of the orbital period is proportional to the cube of the semi-major axis.",
  },
  hi: {
    title: "कक्षा सिम्युलेटर",
    subtitle:
      "ग्रहों की कक्षाओं को देखें और केप्लर के नियमों के अनुसार ग्रहों की गति देखें",
    speed: "गति",
    pause: "रोकें",
    play: "चलाएं",
    reset: "रीसेट",
    innerPlanets: "भीतरी",
    outerPlanets: "बाहरी",
    allPlanets: "सभी",
    orbitalPeriod: "कक्षीय अवधि",
    years: "वर्ष",
    distance: "दूरी",
    au: "AU",
    keplerTitle: "केप्लर के नियम",
    kepler1: "ग्रह सूर्य को एक फोकस पर रखते हुए दीर्घवृत्त में परिक्रमा करते हैं।",
    kepler2: "एक ग्रह समान समय में समान क्षेत्रफल तय करता है — सूर्य के पास तेज़ चलता है।",
    kepler3: "कक्षीय अवधि का वर्ग अर्ध-दीर्घ अक्ष के घन के समानुपाती होता है।",
  },
};

const orbitPlanets = planets.filter((p) => p.id in orbitalData);

export default function OrbitSimulator({ lang }: OrbitSimulatorProps) {
  const [speed, setSpeed] = useState(1);
  const [paused, setPaused] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("inner");
  const [time, setTime] = useState(0);
  const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null);
  const rafRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const t = text[lang];

  useEffect(() => {
    const animate = (timestamp: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const delta = (timestamp - lastTimeRef.current) / 1000;
      lastTimeRef.current = timestamp;

      if (!paused) {
        setTime((prev) => prev + delta * speed * 0.5);
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [speed, paused]);

  // Determine which planets to show and scaling
  const visiblePlanets = orbitPlanets.filter((p) => {
    if (viewMode === "inner")
      return ["mercury", "venus", "earth", "mars"].includes(p.id);
    if (viewMode === "outer")
      return ["jupiter", "saturn", "uranus", "neptune"].includes(p.id);
    return true;
  });

  const maxAU =
    viewMode === "inner"
      ? 2.0
      : viewMode === "outer"
        ? 32
        : 32;

  const canvasSize = 400;
  const center = canvasSize / 2;
  const scale = (center - 30) / maxAU;

  const selectedData = selectedPlanet
    ? {
        planet: orbitPlanets.find((p) => p.id === selectedPlanet)!,
        orbit: orbitalData[selectedPlanet],
      }
    : null;

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

      {/* Controls */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="max-w-lg mx-auto flex flex-wrap items-center justify-center gap-3"
      >
        {/* View mode toggle */}
        <div className="flex rounded-lg border border-white/[0.06] overflow-hidden">
          {(["inner", "outer", "all"] as ViewMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`px-4 py-2 text-sm font-medium transition-all duration-200 ${
                viewMode === mode
                  ? "bg-white/[0.08] text-text-primary"
                  : "text-text-muted hover:bg-white/[0.04] hover:text-text-secondary"
              }`}
            >
              {mode === "inner"
                ? t.innerPlanets
                : mode === "outer"
                  ? t.outerPlanets
                  : t.allPlanets}
            </button>
          ))}
        </div>

        {/* Speed control */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-text-muted">{t.speed}:</span>
          {[0.5, 1, 2, 5].map((s) => (
            <button
              key={s}
              onClick={() => setSpeed(s)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 border ${
                speed === s
                  ? "border-neon-cyan/30 bg-neon-cyan/10 text-neon-cyan"
                  : "border-white/[0.06] text-text-muted hover:bg-white/[0.04]"
              }`}
            >
              {s}x
            </button>
          ))}
        </div>

        {/* Play/Pause & Reset */}
        <div className="flex gap-2">
          <button
            onClick={() => setPaused(!paused)}
            className="px-4 py-2 rounded-lg text-sm font-medium border border-white/[0.06] text-text-secondary hover:bg-white/[0.04] transition-all"
          >
            {paused ? t.play : t.pause}
          </button>
          <button
            onClick={() => {
              setTime(0);
              lastTimeRef.current = 0;
            }}
            className="px-4 py-2 rounded-lg text-sm font-medium border border-white/[0.06] text-text-muted hover:bg-white/[0.04] transition-all"
          >
            {t.reset}
          </button>
        </div>
      </motion.div>

      {/* Orbit visualization */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="
          max-w-[500px] mx-auto p-4 rounded-2xl
          bg-[rgba(17,17,40,0.5)] backdrop-blur-sm
          border border-white/[0.06]
        "
      >
        <svg
          viewBox={`0 0 ${canvasSize} ${canvasSize}`}
          className="w-full h-auto"
          style={{ maxHeight: "500px" }}
        >
          {/* Background stars */}
          {Array.from({ length: 40 }, (_, i) => (
            <circle
              key={`star-${i}`}
              cx={((i * 97 + 23) % canvasSize)}
              cy={((i * 53 + 71) % canvasSize)}
              r={i % 3 === 0 ? 1 : 0.5}
              fill="white"
              opacity={0.2 + (i % 5) * 0.1}
            />
          ))}

          {/* Sun */}
          <circle cx={center} cy={center} r={viewMode === "inner" ? 10 : 6} fill="#fbbf24" />
          <circle
            cx={center}
            cy={center}
            r={viewMode === "inner" ? 16 : 10}
            fill="none"
            stroke="#fbbf24"
            strokeWidth={0.5}
            opacity={0.2}
          />

          {/* Orbit paths and planets */}
          {visiblePlanets.map((planet) => {
            const data = orbitalData[planet.id];
            const orbitRadius = data.semiMajorAU * scale;
            // Angular position based on time and orbital period
            const angle = (time * 2 * Math.PI) / data.period;
            // Simplified elliptical orbit
            const rx = orbitRadius;
            const ry = orbitRadius * (1 - data.eccentricity * 0.5);
            const px = center + rx * Math.cos(angle);
            const py = center + ry * Math.sin(angle);
            const planetRadius =
              planet.size === "lg" ? 6 : planet.size === "md" ? 4 : 3;
            const isSelected = selectedPlanet === planet.id;

            return (
              <g key={planet.id}>
                {/* Orbit ellipse */}
                <ellipse
                  cx={center}
                  cy={center}
                  rx={rx}
                  ry={ry}
                  fill="none"
                  stroke={planet.color}
                  strokeWidth={isSelected ? 1 : 0.5}
                  opacity={isSelected ? 0.5 : 0.15}
                  strokeDasharray={isSelected ? "none" : "4 4"}
                />
                {/* Planet dot */}
                <circle
                  cx={px}
                  cy={py}
                  r={planetRadius}
                  fill={planet.color}
                  stroke={isSelected ? "white" : "none"}
                  strokeWidth={isSelected ? 1.5 : 0}
                  className="cursor-pointer"
                  onClick={() =>
                    setSelectedPlanet(
                      selectedPlanet === planet.id ? null : planet.id
                    )
                  }
                />
                {/* Glow */}
                <circle
                  cx={px}
                  cy={py}
                  r={planetRadius + 4}
                  fill={planet.color}
                  opacity={0.1}
                />
                {/* Label */}
                <text
                  x={px}
                  y={py - planetRadius - 5}
                  textAnchor="middle"
                  fill={planet.color}
                  fontSize={viewMode === "all" ? 8 : 10}
                  opacity={0.8}
                >
                  {planet.name[lang]}
                </text>
              </g>
            );
          })}
        </svg>
      </motion.div>

      {/* Selected planet info */}
      {selectedData && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="
            max-w-md mx-auto p-5 rounded-2xl
            bg-[rgba(17,17,40,0.5)] backdrop-blur-sm
            border border-white/[0.06]
            flex items-center gap-5
          "
        >
          {/* Planet sphere */}
          <div
            className="w-14 h-14 rounded-full shrink-0"
            style={{
              background: selectedData.planet.gradient,
              boxShadow: `0 0 20px ${selectedData.planet.color}30`,
            }}
          />
          <div className="space-y-1.5">
            <h3
              className="text-lg font-semibold"
              style={{ color: selectedData.planet.color }}
            >
              {selectedData.planet.name[lang]}
            </h3>
            <div className="flex gap-4 text-xs text-text-muted">
              <span>
                {t.orbitalPeriod}: <strong className="text-text-secondary">{selectedData.orbit.period} {t.years}</strong>
              </span>
              <span>
                {t.distance}: <strong className="text-text-secondary">{selectedData.orbit.semiMajorAU} {t.au}</strong>
              </span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Kepler's Laws */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="
          max-w-2xl mx-auto p-5 rounded-2xl
          bg-neon-cyan/[0.06] border border-neon-cyan/15
        "
      >
        <p className="text-xs font-semibold text-neon-cyan mb-3">{t.keplerTitle}</p>
        <div className="space-y-2">
          {[t.kepler1, t.kepler2, t.kepler3].map((law, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="shrink-0 w-5 h-5 rounded-full bg-neon-cyan/15 flex items-center justify-center text-neon-cyan text-[10px] font-bold mt-0.5">
                {i + 1}
              </span>
              <p className="text-sm text-text-secondary leading-relaxed">{law}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
