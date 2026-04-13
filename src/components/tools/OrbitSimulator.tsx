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
  const [showOrbits, setShowOrbits] = useState(true);
  const [scaleMode, setScaleMode] = useState<"spaced" | "realistic">("spaced");
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

  // Beautiful non-linear scaling so inner planets aren't utterly squashed
  // We use an exponential squash. 
  const maxAU =
    viewMode === "inner"
      ? 1.8 // Mars is 1.524 
      : viewMode === "outer"
        ? 32
        : 32;

  // Squish the scale logarithmically/exponentially to spread out inner planets, or use linear for pure simulation
  const powerSquash = scaleMode === "spaced" ? (viewMode === "inner" ? 0.7 : 0.45) : 1;
  const maxVisualRadius = Math.pow(maxAU, powerSquash);

  const canvasSize = 800;
  const center = canvasSize / 2;
  const scale = (center - 60) / maxVisualRadius;

  const selectedData = selectedPlanet
    ? {
        planet: orbitPlanets.find((p) => p.id === selectedPlanet)!,
        orbit: orbitalData[selectedPlanet],
      }
    : null;

  return (
    <div className="space-y-8 pb-10">
      {/* Controls Hub */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="max-w-3xl mx-auto flex flex-wrap items-center justify-between gap-6 p-4 rounded-3xl bg-[rgba(10,10,25,0.7)] backdrop-blur-2xl border border-[rgba(255,255,255,0.05)] shadow-[0_0_40px_rgba(0,0,0,0.5)]"
      >
        {/* Scale & Orbits Toggles */}
        <div className="flex flex-col gap-2">
          <div className="flex rounded-xl bg-black/40 border border-white/5 p-1 overflow-hidden">
            {(["inner", "outer", "all"] as ViewMode[]).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-4 py-1.5 text-[10px] uppercase tracking-widest font-bold rounded-lg transition-all duration-300 ${
                  viewMode === mode
                    ? "bg-white/10 text-white shadow-sm"
                    : "text-white/40 hover:text-white/80"
                }`}
              >
                {mode === "inner" ? t.innerPlanets : mode === "outer" ? t.outerPlanets : t.allPlanets}
              </button>
            ))}
          </div>
          <div className="flex rounded-xl bg-black/40 border border-white/5 p-1 overflow-hidden">
             <button
               onClick={() => setScaleMode("spaced")}
               className={`flex-1 px-2 py-1.5 text-[9px] uppercase tracking-widest font-bold rounded-lg transition-all duration-300 ${scaleMode === "spaced" ? "bg-accent/20 text-accent" : "text-white/40 hover:text-white/80"}`}
             >
               Educational View
             </button>
             <button
               onClick={() => setScaleMode("realistic")}
               className={`flex-1 px-2 py-1.5 text-[9px] uppercase tracking-widest font-bold rounded-lg transition-all duration-300 ${scaleMode === "realistic" ? "bg-accent/20 text-accent" : "text-white/40 hover:text-white/80"}`}
             >
               Realistic Scale
             </button>
          </div>
        </div>

        {/* Speed control */}
        <div className="flex items-center gap-2 bg-black/40 border border-white/5 rounded-xl p-1">
          <span className="text-[10px] text-white/40 uppercase tracking-widest px-2 font-bold">{t.speed}</span>
          {[0.1, 0.25, 0.5, 1, 2].map((s) => (
            <button
              key={s}
              onClick={() => { setSpeed(s); setPaused(false); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 ${
                speed === s && !paused
                  ? "bg-accent/20 text-accent"
                  : "text-white/40 hover:bg-white/5 hover:text-white"
              }`}
            >
              {s}x
            </button>
          ))}
        </div>

        {/* Manual Time Slider & Orbit Toggle */}
        <div className="flex flex-col gap-2 px-2 lg:w-48 w-full">
           <div className="flex justify-between text-[10px] text-white/50 uppercase tracking-widest font-bold">
             <span>Time Machine</span>
             <span className="text-accent">
               {new Date(2024, 0, 1 + time * 365.25).toLocaleDateString(lang === "en" ? "en-US" : "hi-IN", { year: "numeric", month: "short", day: "numeric" })}
             </span>
           </div>
           <input 
             type="range"
             min="0"
             max="500"
             step="0.05"
             value={time}
             onChange={(e) => {
               setTime(parseFloat(e.target.value));
               setPaused(true);
             }}
             className="w-full accent-accent bg-white/10 h-1.5 rounded-full appearance-none outline-none cursor-pointer mb-2"
           />
           <button
             onClick={() => setShowOrbits(!showOrbits)}
             className="text-[10px] uppercase tracking-widest font-bold text-white/40 hover:text-white border border-white/10 rounded-lg py-1 transition-all"
           >
             {showOrbits ? "Hide Orbit Lines" : "Show Orbit Lines"}
           </button>
        </div>

        {/* Play/Pause & Reset */}
        <div className="flex gap-2">
          <button
            onClick={() => setPaused(!paused)}
            className="px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-widest border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-all shadow-sm"
          >
            {paused ? t.play : t.pause}
          </button>
          <button
            onClick={() => {
              setTime(0);
              lastTimeRef.current = 0;
            }}
            className="px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-widest border border-white border-transparent text-white/50 hover:bg-white/5 transition-all"
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
          w-full max-w-[900px] mx-auto p-4 sm:p-6 rounded-[2.5rem]
          bg-[rgba(5,5,15,0.7)] backdrop-blur-2xl
          border border-[rgba(255,255,255,0.06)]
          shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden relative
        "
      >
        <svg
          viewBox={`0 0 ${canvasSize} ${canvasSize}`}
          className="w-full h-auto drop-shadow-2xl"
          style={{ maxHeight: "800px" }}
        >
          <defs>
             <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#fffbeb" stopOpacity="1" />
                <stop offset="30%" stopColor="#f59e0b" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#d97706" stopOpacity="0" />
             </radialGradient>
             <filter id="starGlow">
               <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
               <feMerge>
                 <feMergeNode in="coloredBlur"/>
                 <feMergeNode in="SourceGraphic"/>
               </feMerge>
             </filter>
          </defs>

          {/* Deep Space Background stars */}
          {Array.from({ length: 150 }, (_, i) => (
            <circle
              key={`star-${i}`}
              cx={((i * 137 + 53) % canvasSize)}
              cy={((i * 97 + 71) % canvasSize)}
              r={i % 6 === 0 ? 1.5 : (i % 3 === 0 ? 1.0 : 0.6)}
              fill="white"
              opacity={i % 4 === 0 ? 0.8 : 0.2}
              filter={i % 6 === 0 ? "url(#starGlow)" : "none"}
            />
          ))}

          {/* Sun */}
          <circle cx={center} cy={center} r={viewMode === "inner" ? 45 : 25} fill="url(#sunGlow)" />
          <circle
            cx={center}
            cy={center}
            r={viewMode === "inner" ? 22 : 12}
            fill="#fbbf24"
            opacity={0.9}
            filter="drop-shadow(0 0 10px #fbbf24)"
          />

          {/* Orbit paths and planets */}
          {visiblePlanets.map((planet) => {
            const data = orbitalData[planet.id];
            
            // Apply squash power to visual radius computation
            const visualAU = Math.pow(data.semiMajorAU, powerSquash);
            const orbitRadius = visualAU * scale;
            
            // Angular position based on time and orbital period
            const angle = (time * 2 * Math.PI) / data.period;

            // Adding a slight isometric tilt (ry is 90% of rx) for depth
            const rx = orbitRadius;
            const ry = orbitRadius * 0.90;
            const px = center + rx * Math.cos(angle);
            const py = center + ry * Math.sin(angle);
            
            // Increased planet sizes for visibility
            const planetRadius =
              planet.size === "lg" ? 24 : planet.size === "md" ? 18 : 12;
            const isSelected = selectedPlanet === planet.id;

            return (
              <g key={planet.id} className="transition-all duration-300">
                {/* Orbit ellipse */}
                <ellipse
                  cx={center}
                  cy={center}
                  rx={rx}
                  ry={ry}
                  fill="none"
                  stroke={planet.color}
                  strokeWidth={isSelected ? 1.5 : 0.4}
                  opacity={showOrbits ? (isSelected ? 0.7 : 0.2) : 0}
                  strokeDasharray={isSelected ? "none" : "3 8"}
                  style={{ filter: isSelected ? `drop-shadow(0 0 5px ${planet.color})` : "none", transition: "opacity 0.3s" }}
                />
                
                {/* Real Planet Image replacing the primitive dot */}
                <g 
                  className="cursor-pointer"
                  onClick={() => setSelectedPlanet(selectedPlanet === planet.id ? null : planet.id)}
                  style={{ transformOrigin: `${px}px ${py}px`, transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}
                  transform={isSelected ? "scale(1.3)" : "scale(1)"}
                >
                  <circle cx={px} cy={py} r={planetRadius} fill={planet.color} opacity={isSelected ? 0.4 : 0} filter="url(#starGlow)" />
                  <image
                    href={`/universe/planets/${planet.id}/${planet.id}1.png`}
                    x={px - planetRadius}
                    y={py - planetRadius}
                    width={planetRadius * 2}
                    height={planetRadius * 2}
                    style={{ mixBlendMode: 'screen', filter: 'drop-shadow(0 0 3px rgba(255,255,255,0.2))' }}
                  />
                </g>
                {/* Label */}
                <text
                  x={px}
                  y={py - planetRadius - 6}
                  textAnchor="middle"
                  fill={planet.color}
                  fontSize={viewMode === "all" ? 12 : 14}
                  fontWeight="bold"
                  opacity={0.9}
                  style={{ filter: 'drop-shadow(0px 2px 2px rgba(0,0,0,0.8))' }}
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
