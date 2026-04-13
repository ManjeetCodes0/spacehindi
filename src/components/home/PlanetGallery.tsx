"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { planets } from "@/data/planets";

interface PlanetGalleryProps {
  lang: "en" | "hi";
}

// Extended planet data with real facts for the gallery
const planetFacts: Record<
  string,
  {
    fact: { en: string; hi: string };
    diameter: string;
    moons: string;
    dayLength: string;
    type: { en: string; hi: string };
  }
> = {
  mercury: {
    fact: {
      en: "The smallest planet and closest to the Sun, with extreme temperature swings of over 600°C.",
      hi: "सबसे छोटा ग्रह और सूर्य के सबसे करीब, 600°C से अधिक के तापमान के उतार-चढ़ाव के साथ।",
    },
    diameter: "4,879 km",
    moons: "0",
    dayLength: "59 Earth days",
    type: { en: "Rocky", hi: "चट्टानी" },
  },
  venus: {
    fact: {
      en: "The hottest planet in our solar system with a thick toxic atmosphere and surface pressure 90x Earth's.",
      hi: "हमारे सौरमंडल का सबसे गर्म ग्रह, घने जहरीले वातावरण और पृथ्वी से 90 गुना सतह दबाव के साथ।",
    },
    diameter: "12,104 km",
    moons: "0",
    dayLength: "243 Earth days",
    type: { en: "Rocky", hi: "चट्टानी" },
  },
  earth: {
    fact: {
      en: "The only known planet with liquid water oceans and life. Its magnetic field shields us from solar radiation.",
      hi: "तरल पानी के महासागरों और जीवन वाला एकमात्र ज्ञात ग्रह। इसका चुंबकीय क्षेत्र हमें सौर विकिरण से बचाता है।",
    },
    diameter: "12,742 km",
    moons: "1",
    dayLength: "24 hours",
    type: { en: "Rocky", hi: "चट्टानी" },
  },
  mars: {
    fact: {
      en: "Home to Olympus Mons, the tallest volcano in the solar system at 21.9 km — nearly 3x Mount Everest.",
      hi: "ओलंपस मॉन्स का घर, सौरमंडल का सबसे ऊंचा ज्वालामुखी — लगभग माउंट एवरेस्ट से 3 गुना ऊंचा।",
    },
    diameter: "6,779 km",
    moons: "2",
    dayLength: "24.6 hours",
    type: { en: "Rocky", hi: "चट्टानी" },
  },
  jupiter: {
    fact: {
      en: "The Great Red Spot is a storm larger than Earth that has been raging for over 350 years.",
      hi: "द ग्रेट रेड स्पॉट पृथ्वी से बड़ा एक तूफान है जो 350 से अधिक वर्षों से चल रहा है।",
    },
    diameter: "139,820 km",
    moons: "95",
    dayLength: "9.9 hours",
    type: { en: "Gas Giant", hi: "गैस विशाल" },
  },
  saturn: {
    fact: {
      en: "Its iconic rings are made of billions of chunks of ice and rock, spanning 282,000 km wide but only 10m thick.",
      hi: "इसके प्रतिष्ठित वलय अरबों बर्फ और चट्टान के टुकड़ों से बने हैं, 2,82,000 km चौड़े लेकिन केवल 10m मोटे।",
    },
    diameter: "116,460 km",
    moons: "146",
    dayLength: "10.7 hours",
    type: { en: "Gas Giant", hi: "गैस विशाल" },
  },
  uranus: {
    fact: {
      en: "Uranus rotates on its side with an axial tilt of 98°, likely caused by a massive ancient collision.",
      hi: "यूरेनस 98° के अक्षीय झुकाव के साथ अपनी तरफ घूमता है, संभवतः एक विशाल प्राचीन टक्कर के कारण।",
    },
    diameter: "50,724 km",
    moons: "28",
    dayLength: "17.2 hours",
    type: { en: "Ice Giant", hi: "बर्फ विशाल" },
  },
  neptune: {
    fact: {
      en: "The windiest planet with speeds reaching 2,100 km/h — faster than the speed of sound on Earth.",
      hi: "सबसे तेज हवाओं वाला ग्रह, 2,100 km/h तक की गति — पृथ्वी पर ध्वनि की गति से भी तेज।",
    },
    diameter: "49,244 km",
    moons: "16",
    dayLength: "16.1 hours",
    type: { en: "Ice Giant", hi: "बर्फ विशाल" },
  },
  moon: {
    fact: {
      en: "The Moon is slowly drifting away from Earth at 3.8 cm per year. It was once much closer to us.",
      hi: "चंद्रमा हर साल 3.8 cm की दर से पृथ्वी से दूर जा रहा है। यह कभी हमारे बहुत करीब था।",
    },
    diameter: "3,474 km",
    moons: "0",
    dayLength: "27.3 Earth days",
    type: { en: "Satellite", hi: "उपग्रह" },
  },
  pluto: {
    fact: {
      en: "A complex dwarf planet in the Kuiper Belt with mountains of water ice and a heart-shaped glacier.",
      hi: "कुइपर बेल्ट में एक जटिल बौना ग्रह जिसमें पानी की बर्फ के पहाड़ और दिल के आकार का ग्लेशियर है।",
    },
    diameter: "2,376 km",
    moons: "5",
    dayLength: "153 hours",
    type: { en: "Dwarf Planet", hi: "बौना ग्रह" },
  },
};

const sizeMap = {
  sm: 80,
  md: 110,
  lg: 150,
};

const text = {
  en: {
    badge: "Solar System Gallery",
    title: "Our Cosmic Neighborhood",
    subtitle: "Explore each planet with stunning visuals and fascinating facts",
    diameter: "Diameter",
    moons: "Moons",
    dayLength: "Day Length",
    type: "Type",
    gravity: "Gravity",
    clickToExplore: "Click a planet to explore",
  },
  hi: {
    badge: "सौरमंडल गैलरी",
    title: "हमारा ब्रह्मांडीय पड़ोस",
    subtitle: "शानदार दृश्यों और रोचक तथ्यों के साथ हर ग्रह की खोज करें",
    diameter: "व्यास",
    moons: "उपग्रह",
    dayLength: "दिन की लंबाई",
    type: "प्रकार",
    gravity: "गुरुत्वाकर्षण",
    clickToExplore: "खोजने के लिए ग्रह पर क्लिक करें",
  },
};

export default function PlanetGallery({ lang }: PlanetGalleryProps) {
  const [selected, setSelected] = useState<string>("earth");
  const t = text[lang];

  const selectedPlanet = planets.find((p) => p.id === selected)!;
  const facts = planetFacts[selected];
  
  const planetsWithImages = new Set([
    "mercury", "venus", "earth", "mars", "jupiter", "saturn", "uranus", "neptune", "moon", "pluto"
  ]);
  const hasSelectedImage = planetsWithImages.has(selected);

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
            bg-neon-violet/10 border border-neon-violet/20 mb-5"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-neon-violet" />
          <span className="text-xs font-medium text-neon-violet tracking-wide">
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

      {/* Planet selector — horizontal scroll */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex items-end justify-center gap-4 sm:gap-6 mb-4 overflow-x-auto pb-4 px-4 scrollbar-hide"
      >
        {planets.map((planet) => {
          const isSelected = selected === planet.id;
          const size = sizeMap[planet.size];
          const displaySize = isSelected ? size * 1.2 : size * 0.7;

          return (
            <motion.button
              key={planet.id}
              onClick={() => setSelected(planet.id)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              animate={{ scale: isSelected ? 1 : 0.85, opacity: isSelected ? 1 : 0.5 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center gap-2 shrink-0 cursor-pointer group"
              aria-label={`Explore ${planet.name.en} — ${planet.name.hi}`}
              aria-pressed={isSelected}
            >
              <div
                className="rounded-full relative transition-all duration-300 pointer-events-none flex items-center justify-center"
                style={{
                  width: displaySize,
                  height: displaySize,
                  background: planetsWithImages.has(planet.id) ? "transparent" : planet.gradient,
                  boxShadow: planetsWithImages.has(planet.id)
                    ? "none" 
                    : isSelected
                      ? `0 0 40px ${planet.color}40, 0 0 80px ${planet.color}15`
                      : `inset -4px -2px 8px rgba(0,0,0,0.4)`,
                }}
              >
                {planetsWithImages.has(planet.id) ? (
                  <Image
                    src={planet.id === "moon" ? "/universe/moons/earth/Moon-earth.png" : `/universe/planets/${planet.id}/${planet.id}1.png`}
                    alt={`3D render of planet ${planet.name.en} — ${planetFacts[planet.id]?.fact.en || planet.name.en} in our solar system`}
                    fill
                    unoptimized
                    style={{ objectFit: "contain", filter: isSelected ? `drop-shadow(0 0 20px ${planet.color}80)` : 'none' }}
                  />
                ) : (
                  <>
                    {/* Light reflection */}
                    <div
                      className="absolute top-[15%] left-[20%] w-[30%] h-[25%] rounded-full"
                      style={{
                        background: "radial-gradient(ellipse, rgba(255,255,255,0.2) 0%, transparent 70%)",
                        filter: "blur(2px)",
                      }}
                    />
                    {planet.ring && (
                      <div
                        className="absolute inset-[-30%] rounded-full border border-white/10 pointer-events-none"
                        style={{ transform: "rotateX(75deg)" }}
                      />
                    )}
                  </>
                )}
              </div>
              <span
                className={`text-xs font-medium transition-colors duration-200 ${
                  isSelected ? "text-text-primary" : "text-text-muted"
                }`}
              >
                {planet.name[lang]}
              </span>
            </motion.button>
          );
        })}
      </motion.div>

      <p className="text-center text-xs text-text-muted mb-8">{t.clickToExplore}</p>

      {/* Selected planet detail card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selected}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35 }}
          className="
            max-w-3xl mx-auto p-6 sm:p-8 rounded-2xl
            bg-[rgba(17,17,40,0.55)] backdrop-blur-xl
            border border-white/[0.07]
          "
        >
          <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
            {/* Large planet sphere */}
            <div className="shrink-0 relative">
              <motion.div
                animate={hasSelectedImage ? { y: [0, -8, 0] } : { rotate: 360 }}
                transition={hasSelectedImage ? { duration: 6, repeat: Infinity, ease: "easeInOut" } : { duration: 60, repeat: Infinity, ease: "linear" }}
                className="relative flex items-center justify-center rounded-full"
                style={{
                  width: 140,
                  height: 140,
                  background: hasSelectedImage ? "transparent" : selectedPlanet.gradient,
                  boxShadow: hasSelectedImage ? "none" : `inset -6px -3px 12px rgba(0,0,0,0.5), 0 0 50px ${selectedPlanet.color}25`,
                }}
              >
                {hasSelectedImage ? (
                  <Image
                    src={selected === "moon" ? "/universe/moons/earth/Moon-earth.png" : `/universe/planets/${selected}/${selected}1.png`}
                    alt={`Detailed 3D view of ${selectedPlanet.name.en} — diameter ${facts.diameter}, ${facts.moons} moons, ${facts.type.en} planet`}
                    fill
                    unoptimized
                    style={{ objectFit: "contain", filter: `drop-shadow(0 15px 30px ${selectedPlanet.color}80)` }}
                    className="pointer-events-none z-10"
                  />
                ) : (
                  <>
                    <div
                      className="absolute top-[12%] left-[18%] w-[35%] h-[28%] rounded-full"
                      style={{
                        background: "radial-gradient(ellipse, rgba(255,255,255,0.2) 0%, transparent 70%)",
                        filter: "blur(3px)",
                      }}
                    />
                    {selectedPlanet.ring && (
                      <div
                        className="absolute inset-[-30%] rounded-full border-2 border-white/10 pointer-events-none"
                        style={{ transform: "rotateX(75deg)" }}
                      />
                    )}
                  </>
                )}
              </motion.div>
              {/* Ambient glow */}
              <div
                className="absolute inset-0 rounded-full blur-2xl -z-10"
                style={{
                  background: `radial-gradient(circle, ${selectedPlanet.color}20 0%, transparent 70%)`,
                  transform: "scale(2)",
                }}
              />
            </div>

            {/* Info */}
            <div className="flex-1 text-center sm:text-left">
              <h3
                className="text-2xl sm:text-3xl font-bold mb-2"
                style={{ color: selectedPlanet.color, fontFamily: "var(--font-space-grotesk)" }}
              >
                {selectedPlanet.name[lang]}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-5">
                {facts.fact[lang]}
              </p>

              {/* Stats grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: t.diameter, value: facts.diameter },
                  { label: t.moons, value: facts.moons },
                  { label: t.dayLength, value: facts.dayLength },
                  { label: t.gravity, value: `${selectedPlanet.gravity}x` },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.04] text-center"
                  >
                    <p className="text-xs text-text-muted mb-0.5">{stat.label}</p>
                    <p className="text-sm font-semibold text-text-primary">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
