export interface SpaceTool {
  id: string;
  slug: string;
  name: { en: string; hi: string };
  description: { en: string; hi: string };
  icon: string; // SVG path(s)
  accentColor: string; // tailwind color token
  glowColor: string; // rgba for shadow
  available: boolean;
}

export const spaceTools: SpaceTool[] = [
  {
    id: "weight-calculator",
    slug: "weight-calculator",
    name: { en: "Weight on Planets", hi: "ग्रहों पर वज़न" },
    description: {
      en: "Discover how much you'd weigh on every planet in our solar system.",
      hi: "जानें कि सौरमंडल के हर ग्रह पर आपका वज़न कितना होगा।",
    },
    icon: "M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z",
    accentColor: "neon-pink",
    glowColor: "rgba(236, 72, 153, 0.3)",
    available: true,
  },
  {
    id: "space-age",
    slug: "space-age",
    name: { en: "Space Age Calculator", hi: "अंतरिक्ष आयु कैलकुलेटर" },
    description: {
      en: "Find out how old you'd be on Mars, Jupiter, or any other planet.",
      hi: "जानें कि मंगल, बृहस्पति या किसी अन्य ग्रह पर आपकी आयु कितनी होगी।",
    },
    icon: "M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
    accentColor: "neon-violet",
    glowColor: "rgba(139, 92, 246, 0.3)",
    available: true,
  },
  {
    id: "light-year-converter",
    slug: "light-year-converter",
    name: { en: "Light-Year Converter", hi: "प्रकाश-वर्ष कनवर्टर" },
    description: {
      en: "Convert between light-years, parsecs, astronomical units, and kilometers.",
      hi: "प्रकाश-वर्ष, पारसेक, खगोलीय इकाइयों और किलोमीटर के बीच रूपांतरण करें।",
    },
    icon: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z",
    accentColor: "neon-blue",
    glowColor: "rgba(59, 130, 246, 0.3)",
    available: true,
  },
  {
    id: "orbit-simulator",
    slug: "orbit-simulator",
    name: { en: "Orbit Simulator", hi: "कक्षा सिम्युलेटर" },
    description: {
      en: "Visualize planetary orbits and understand Kepler's laws interactively.",
      hi: "ग्रहों की कक्षाओं को देखें और केप्लर के नियमों को समझें।",
    },
    icon: "M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5a17.92 17.92 0 0 1-8.716-2.247m0 0A8.966 8.966 0 0 1 3 12c0-1.264.26-2.467.732-3.558",
    accentColor: "neon-cyan",
    glowColor: "rgba(6, 182, 212, 0.3)",
    available: true,
  },
  {
    id: "escape-velocity",
    slug: "escape-velocity",
    name: { en: "Escape Velocity", hi: "पलायन वेग" },
    description: {
      en: "Calculate the speed needed to escape the gravitational pull of any celestial body.",
      hi: "किसी भी खगोलीय पिंड के गुरुत्वाकर्षण से बचने के लिए आवश्यक गति की गणना करें।",
    },
    icon: "M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z",
    accentColor: "neon-green",
    glowColor: "rgba(16, 185, 129, 0.3)",
    available: true,
  },
  {
    id: "iss-tracker",
    slug: "iss-tracker",
    name: { en: "ISS Live Tracker", hi: "ISS लाइव ट्रैकर" },
    description: {
      en: "Track the International Space Station's position in real-time over Earth.",
      hi: "पृथ्वी पर अंतर्राष्ट्रीय अंतरिक्ष स्टेशन की स्थिति को रियल-टाइम ट्रैक करें।",
    },
    icon: "M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z",
    accentColor: "neon-violet",
    glowColor: "rgba(139, 92, 246, 0.3)",
    available: true,
  },
];
