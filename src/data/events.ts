export interface SpaceEvent {
  id: string;
  mission: string;
  agency: "ISRO" | "NASA" | "SpaceX" | "ESA" | "JAXA";
  agencyColor: string;
  title: { en: string; hi: string };
  description: { en: string; hi: string };
  date: string; // ISO date
  location: { en: string; hi: string };
  type: "launch" | "landing" | "flyby" | "docking";
}

export type AdSlot = {
  id: string;
  type: "ad";
  title: { en: string; hi: string };
  cta: { en: string; hi: string };
  href: string;
  gradient: string;
};

export const spaceEvents: SpaceEvent[] = [
  {
    id: "gaganyaan-test-3",
    mission: "Gaganyaan TV-D3",
    agency: "ISRO",
    agencyColor: "#10b981",
    title: {
      en: "Gaganyaan Test Vehicle D3 — Crew Escape System",
      hi: "गगनयान टेस्ट व्हीकल D3 — क्रू एस्केप सिस्टम",
    },
    description: {
      en: "Third and final test of the crew escape system before the uncrewed orbital flight.",
      hi: "मानवरहित कक्षीय उड़ान से पहले क्रू एस्केप सिस्टम का तीसरा और अंतिम परीक्षण।",
    },
    date: "2026-04-15T09:30:00+05:30",
    location: { en: "Sriharikota, India", hi: "श्रीहरिकोटा, भारत" },
    type: "launch",
  },
  {
    id: "artemis-3-launch",
    mission: "Artemis III",
    agency: "NASA",
    agencyColor: "#3b82f6",
    title: {
      en: "Artemis III — First Crewed Lunar Landing Since Apollo",
      hi: "आर्टेमिस III — अपोलो के बाद पहली मानव चंद्र लैंडिंग",
    },
    description: {
      en: "SLS rocket launches Orion with a crew of four for a historic South Pole lunar landing.",
      hi: "SLS रॉकेट ऐतिहासिक दक्षिणी ध्रुव चंद्र लैंडिंग के लिए चार सदस्यीय क्रू के साथ ओरियन लॉन्च करता है।",
    },
    date: "2026-05-20T14:00:00-04:00",
    location: { en: "Kennedy Space Center, USA", hi: "केनेडी स्पेस सेंटर, अमेरिका" },
    type: "launch",
  },
  {
    id: "starship-mars-depot",
    mission: "Starship Fuel Depot 2",
    agency: "SpaceX",
    agencyColor: "#8b5cf6",
    title: {
      en: "Starship Orbital Fuel Depot — Second Transfer Test",
      hi: "स्टारशिप ऑर्बिटल फ्यूल डिपो — दूसरा ट्रांसफर टेस्ट",
    },
    description: {
      en: "SpaceX tests cryogenic propellant transfer between two Starship vehicles in orbit.",
      hi: "SpaceX कक्षा में दो स्टारशिप वाहनों के बीच क्रायोजेनिक प्रोपेलेंट ट्रांसफर का परीक्षण करता है।",
    },
    date: "2026-06-08T18:45:00-05:00",
    location: { en: "Boca Chica, Texas", hi: "बोका चिका, टेक्सास" },
    type: "launch",
  },
  {
    id: "chandrayaan-4",
    mission: "Chandrayaan-4",
    agency: "ISRO",
    agencyColor: "#10b981",
    title: {
      en: "Chandrayaan-4 — Lunar Sample Return Mission",
      hi: "चंद्रयान-4 — चंद्र नमूना वापसी मिशन",
    },
    description: {
      en: "India's first attempt at collecting and returning lunar soil samples to Earth.",
      hi: "चंद्र मिट्टी के नमूने एकत्र करके पृथ्वी पर वापस लाने का भारत का पहला प्रयास।",
    },
    date: "2026-08-12T06:00:00+05:30",
    location: { en: "Sriharikota, India", hi: "श्रीहरिकोटा, भारत" },
    type: "launch",
  },
  {
    id: "juice-jupiter-flyby",
    mission: "JUICE",
    agency: "ESA",
    agencyColor: "#06b6d4",
    title: {
      en: "JUICE — First Jupiter System Flyby",
      hi: "JUICE — पहला बृहस्पति प्रणाली फ्लाईबाई",
    },
    description: {
      en: "ESA's Jupiter Icy Moons Explorer begins its series of flybys around Jupiter's moons.",
      hi: "ESA का जूपिटर आइसी मून्स एक्सप्लोरर बृहस्पति के चंद्रमाओं के चारों ओर फ्लाईबाई की श्रृंखला शुरू करता है।",
    },
    date: "2026-10-01T12:00:00+02:00",
    location: { en: "Jupiter System", hi: "बृहस्पति प्रणाली" },
    type: "flyby",
  },
];

export const adSlots: AdSlot[] = [
  {
    id: "ad-telescope",
    type: "ad",
    title: { en: "See every launch up close", hi: "हर लॉन्च को करीब से देखें" },
    cta: { en: "Shop Telescopes", hi: "टेलीस्कोप खरीदें" },
    href: "/shop",
    gradient: "linear-gradient(135deg, rgba(16,185,129,0.15) 0%, rgba(139,92,246,0.1) 100%)",
  },
  {
    id: "ad-books",
    type: "ad",
    title: { en: "Understand the missions behind the launches", hi: "लॉन्च के पीछे के मिशन को समझें" },
    cta: { en: "Browse Science Books", hi: "विज्ञान पुस्तकें देखें" },
    href: "/shop",
    gradient: "linear-gradient(135deg, rgba(236,72,153,0.15) 0%, rgba(59,130,246,0.1) 100%)",
  },
];
