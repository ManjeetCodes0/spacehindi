"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SpaceQuoteProps {
  lang: "en" | "hi";
}

interface Quote {
  text: { en: string; hi: string };
  author: string;
  role: { en: string; hi: string };
}

const quotes: Quote[] = [
  {
    text: {
      en: "The Earth is the cradle of humanity, but mankind cannot stay in the cradle forever.",
      hi: "पृथ्वी मानवता का पालना है, लेकिन मानव जाति हमेशा पालने में नहीं रह सकती।",
    },
    author: "Konstantin Tsiolkovsky",
    role: { en: "Father of Rocketry", hi: "रॉकेट विज्ञान के जनक" },
  },
  {
    text: {
      en: "That's one small step for man, one giant leap for mankind.",
      hi: "यह मनुष्य के लिए एक छोटा कदम है, मानव जाति के लिए एक विशाल छलांग है।",
    },
    author: "Neil Armstrong",
    role: { en: "First Human on the Moon", hi: "चंद्रमा पर पहला मनुष्य" },
  },
  {
    text: {
      en: "Somewhere, something incredible is waiting to be known.",
      hi: "कहीं न कहीं, कुछ अद्भुत जानने की प्रतीक्षा कर रहा है।",
    },
    author: "Carl Sagan",
    role: { en: "Astronomer & Author", hi: "खगोलशास्त्री और लेखक" },
  },
  {
    text: {
      en: "The universe is under no obligation to make sense to you.",
      hi: "ब्रह्मांड आपको समझ में आने के लिए बाध्य नहीं है।",
    },
    author: "Neil deGrasse Tyson",
    role: { en: "Astrophysicist", hi: "खगोल भौतिकविद" },
  },
  {
    text: {
      en: "We are all made of star stuff.",
      hi: "हम सब तारों की धूल से बने हैं।",
    },
    author: "Carl Sagan",
    role: { en: "Cosmos", hi: "कॉसमॉस" },
  },
  {
    text: {
      en: "Space exploration is a force of nature unto itself that no other force in society can rival.",
      hi: "अंतरिक्ष अन्वेषण अपने आप में प्रकृति की एक शक्ति है जिसका समाज में कोई अन्य शक्ति मुकाबला नहीं कर सकती।",
    },
    author: "Neil deGrasse Tyson",
    role: { en: "Astrophysicist", hi: "खगोल भौतिकविद" },
  },
];

export default function SpaceQuote({ lang }: SpaceQuoteProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % quotes.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const quote = quotes[index];

  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-3xl mx-auto text-center relative">
        {/* Decorative quotes */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-6xl sm:text-8xl text-neon-violet/10 font-serif select-none pointer-events-none">
          &ldquo;
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="px-4"
          >
            <p className="text-xl sm:text-2xl md:text-3xl text-text-primary font-medium leading-relaxed mb-6 italic">
              &ldquo;{quote.text[lang]}&rdquo;
            </p>
            <div>
              <p className="text-sm font-semibold text-neon-violet">{quote.author}</p>
              <p className="text-xs text-text-muted mt-0.5">{quote.role[lang]}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dots indicator */}
        <div className="flex items-center justify-center gap-1.5 mt-8">
          {quotes.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                i === index
                  ? "bg-neon-violet w-4"
                  : "bg-white/15 hover:bg-white/25"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
