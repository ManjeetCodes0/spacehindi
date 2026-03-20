export interface Planet {
  id: string;
  name: { en: string; hi: string };
  gravity: number; // relative to Earth (1.0)
  color: string; // tailwind-compatible color
  gradient: string; // CSS gradient for the planet sphere
  ring?: boolean;
  size: "sm" | "md" | "lg"; // visual size class
}

export const planets: Planet[] = [
  {
    id: "mercury",
    name: { en: "Mercury", hi: "बुध" },
    gravity: 0.38,
    color: "#a0a0a0",
    gradient: "radial-gradient(circle at 35% 30%, #c8c8c8 0%, #8a8a8a 40%, #5a5a5a 80%)",
    size: "sm",
  },
  {
    id: "venus",
    name: { en: "Venus", hi: "शुक्र" },
    gravity: 0.91,
    color: "#e8a84c",
    gradient: "radial-gradient(circle at 35% 30%, #f0c060 0%, #d4903a 40%, #a06020 80%)",
    size: "md",
  },
  {
    id: "earth",
    name: { en: "Earth", hi: "पृथ्वी" },
    gravity: 1.0,
    color: "#10b981",
    gradient: "radial-gradient(circle at 35% 30%, #34d399 0%, #059669 40%, #064e3b 80%)",
    size: "md",
  },
  {
    id: "mars",
    name: { en: "Mars", hi: "मंगल" },
    gravity: 0.38,
    color: "#ec4899",
    gradient: "radial-gradient(circle at 35% 30%, #f87171 0%, #dc2626 40%, #7f1d1d 80%)",
    size: "sm",
  },
  {
    id: "jupiter",
    name: { en: "Jupiter", hi: "बृहस्पति" },
    gravity: 2.53,
    color: "#f59e0b",
    gradient: "radial-gradient(circle at 35% 30%, #fbbf24 0%, #d97706 35%, #92400e 70%, #5a3010 90%)",
    size: "lg",
  },
  {
    id: "saturn",
    name: { en: "Saturn", hi: "शनि" },
    gravity: 1.07,
    color: "#a78bfa",
    gradient: "radial-gradient(circle at 35% 30%, #ddd6b0 0%, #c4a86c 40%, #8a7040 80%)",
    ring: true,
    size: "lg",
  },
  {
    id: "uranus",
    name: { en: "Uranus", hi: "अरुण" },
    gravity: 0.89,
    color: "#06b6d4",
    gradient: "radial-gradient(circle at 35% 30%, #67e8f9 0%, #0891b2 40%, #164e63 80%)",
    ring: true,
    size: "md",
  },
  {
    id: "neptune",
    name: { en: "Neptune", hi: "वरुण" },
    gravity: 1.14,
    color: "#3b82f6",
    gradient: "radial-gradient(circle at 35% 30%, #60a5fa 0%, #2563eb 40%, #1e3a5f 80%)",
    size: "md",
  },
  {
    id: "moon",
    name: { en: "Moon", hi: "चंद्रमा" },
    gravity: 0.166,
    color: "#9ca3af",
    gradient: "radial-gradient(circle at 35% 30%, #e5e7eb 0%, #9ca3af 40%, #4b5563 80%)",
    size: "sm",
  },
];
