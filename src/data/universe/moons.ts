export interface Moon {
  id: string;
  planetId: string;
  name: { en: string; hi: string };
  diameter: string; // km
  discovery: string; // year or description
  fact: { en: string; hi: string };
  color: string;
  gradient: string;
}

export const moons: Moon[] = [
  // Earth
  {
    id: "luna",
    planetId: "earth",
    name: { en: "The Moon", hi: "चंद्रमा" },
    diameter: "3,474",
    discovery: "Prehistoric",
    fact: {
      en: "Drifting away from Earth at 3.8 cm/year. Its gravity creates ocean tides and stabilizes Earth's axial tilt.",
      hi: "हर साल 3.8 cm पृथ्वी से दूर जा रहा है। इसका गुरुत्वाकर्षण समुद्री ज्वार बनाता है और पृथ्वी के अक्षीय झुकाव को स्थिर करता है।",
    },
    color: "#9ca3af",
    gradient: "radial-gradient(circle at 35% 30%, #e5e7eb 0%, #9ca3af 40%, #4b5563 80%)",
  },
  // Mars
  {
    id: "phobos",
    planetId: "mars",
    name: { en: "Phobos", hi: "फोबोस" },
    diameter: "22.4",
    discovery: "1877",
    fact: {
      en: "Orbits Mars in just 7.6 hours — rising in the west and setting in the east. It's slowly spiraling inward and will crash into Mars in ~50 million years.",
      hi: "केवल 7.6 घंटे में मंगल की परिक्रमा करता है — पश्चिम में उगता और पूर्व में अस्त होता है। यह धीरे-धीरे अंदर की ओर सर्पिल हो रहा है।",
    },
    color: "#a0a0a0",
    gradient: "radial-gradient(circle at 35% 30%, #b0b0b0 0%, #808080 50%, #505050 80%)",
  },
  {
    id: "deimos",
    planetId: "mars",
    name: { en: "Deimos", hi: "डीमोस" },
    diameter: "12.4",
    discovery: "1877",
    fact: {
      en: "The smaller of Mars's two moons. So small that its escape velocity is only 20 km/h — you could throw a ball into orbit.",
      hi: "मंगल के दो चंद्रमाओं में छोटा। इतना छोटा कि इसका पलायन वेग केवल 20 km/h है — आप एक गेंद को कक्षा में फेंक सकते हैं।",
    },
    color: "#8a8a8a",
    gradient: "radial-gradient(circle at 35% 30%, #a0a0a0 0%, #707070 50%, #404040 80%)",
  },
  // Jupiter
  {
    id: "io",
    planetId: "jupiter",
    name: { en: "Io", hi: "आयो" },
    diameter: "3,643",
    discovery: "1610 — Galileo",
    fact: {
      en: "The most volcanically active body in the solar system, with over 400 active volcanoes. Tidal forces from Jupiter constantly knead its interior.",
      hi: "सौरमंडल में सबसे ज्वालामुखीय रूप से सक्रिय पिंड, 400 से अधिक सक्रिय ज्वालामुखियों के साथ।",
    },
    color: "#f59e0b",
    gradient: "radial-gradient(circle at 35% 30%, #fcd34d 0%, #f59e0b 40%, #92400e 80%)",
  },
  {
    id: "europa",
    planetId: "jupiter",
    name: { en: "Europa", hi: "यूरोपा" },
    diameter: "3,122",
    discovery: "1610 — Galileo",
    fact: {
      en: "Has a subsurface ocean beneath its icy crust that contains more water than all of Earth's oceans combined. Top candidate for extraterrestrial life.",
      hi: "इसकी बर्फीली परत के नीचे एक उपसतही महासागर है जिसमें पृथ्वी के सभी महासागरों से अधिक पानी है। अलौकिक जीवन का शीर्ष उम्मीदवार।",
    },
    color: "#93c5fd",
    gradient: "radial-gradient(circle at 35% 30%, #dbeafe 0%, #93c5fd 40%, #1e40af 80%)",
  },
  {
    id: "ganymede",
    planetId: "jupiter",
    name: { en: "Ganymede", hi: "गैनीमीड" },
    diameter: "5,268",
    discovery: "1610 — Galileo",
    fact: {
      en: "The largest moon in the solar system — even bigger than Mercury. The only moon with its own magnetic field.",
      hi: "सौरमंडल का सबसे बड़ा चंद्रमा — बुध से भी बड़ा। अपने स्वयं के चुंबकीय क्षेत्र वाला एकमात्र चंद्रमा।",
    },
    color: "#a78bfa",
    gradient: "radial-gradient(circle at 35% 30%, #c4b5fd 0%, #8b5cf6 40%, #4c1d95 80%)",
  },
  {
    id: "callisto",
    planetId: "jupiter",
    name: { en: "Callisto", hi: "कैलिस्टो" },
    diameter: "4,821",
    discovery: "1610 — Galileo",
    fact: {
      en: "The most heavily cratered object in the solar system. May also harbor a subsurface ocean. A potential base for future Jupiter exploration.",
      hi: "सौरमंडल में सबसे अधिक क्रेटर वाला पिंड। संभवतः उपसतही महासागर भी है। भविष्य के बृहस्पति अन्वेषण के लिए संभावित आधार।",
    },
    color: "#78716c",
    gradient: "radial-gradient(circle at 35% 30%, #a8a29e 0%, #78716c 40%, #44403c 80%)",
  },
  // Saturn
  {
    id: "titan",
    planetId: "saturn",
    name: { en: "Titan", hi: "टाइटन" },
    diameter: "5,150",
    discovery: "1655 — Huygens",
    fact: {
      en: "The only moon with a thick atmosphere and the only body besides Earth with stable surface liquids — lakes of liquid methane and ethane.",
      hi: "घने वायुमंडल वाला एकमात्र चंद्रमा और पृथ्वी के अलावा स्थिर सतही तरल वाला एकमात्र पिंड — तरल मीथेन और ईथेन की झीलें।",
    },
    color: "#f59e0b",
    gradient: "radial-gradient(circle at 35% 30%, #fbbf24 0%, #b45309 40%, #78350f 80%)",
  },
  {
    id: "enceladus",
    planetId: "saturn",
    name: { en: "Enceladus", hi: "एन्सेलेडस" },
    diameter: "504",
    discovery: "1789 — Herschel",
    fact: {
      en: "Shoots enormous geysers of water ice into space from its south pole, feeding Saturn's E ring. Has hydrothermal vents on its ocean floor — conditions for life.",
      hi: "अपने दक्षिणी ध्रुव से अंतरिक्ष में पानी की बर्फ के विशाल गीज़र छोड़ता है। इसके महासागर तल पर हाइड्रोथर्मल वेंट हैं — जीवन की स्थितियाँ।",
    },
    color: "#e2e8f0",
    gradient: "radial-gradient(circle at 35% 30%, #f8fafc 0%, #cbd5e1 40%, #64748b 80%)",
  },
  // Neptune
  {
    id: "triton",
    planetId: "neptune",
    name: { en: "Triton", hi: "ट्राइटन" },
    diameter: "2,707",
    discovery: "1846 — Lassell",
    fact: {
      en: "Orbits Neptune backward — the only large moon to do so. Likely a captured Kuiper Belt dwarf planet. Has nitrogen ice geysers and a thin atmosphere.",
      hi: "वरुण की उल्टी परिक्रमा करता है — ऐसा करने वाला एकमात्र बड़ा चंद्रमा। संभवतः कुइपर बेल्ट का कैप्चर किया गया बौना ग्रह।",
    },
    color: "#a5b4fc",
    gradient: "radial-gradient(circle at 35% 30%, #c7d2fe 0%, #818cf8 40%, #3730a3 80%)",
  },
];

export function getMoonsByPlanet(planetId: string): Moon[] {
  return moons.filter((m) => m.planetId === planetId);
}
