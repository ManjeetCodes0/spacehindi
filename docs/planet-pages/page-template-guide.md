# Planet Page Template Guide

## Page Structure (Every Planet Page Follows This)

Each planet page is a `"use client"` React component with the following structure:

### 1. Imports
```tsx
"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { getCelestialBody } from "@/data/universe/planets";
import { FeaturedVideo } from "@/components/universe";
import NextPlanets from "@/components/universe/NextPlanets";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useLang } from "@/context/LanguageContext";
```

### 2. Component Setup
```tsx
export default function PlanetPage() {
  const planet = getCelestialBody("planet-id");
  const { lang } = useLang();
  const isHindi = lang === "hi";
  
  // Hero image rotation (3500ms interval)
  const heroImages = [
    "/universe/planets/planet/planet1.png",
    "/universe/planets/planet/planet_art1.webp",
    "/universe/planets/planet/planet_art2.webp",
  ];
  const [currentImage, setCurrentImage] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);
```

### 3. Hero Section
- Full-width hero with rotating planet images
- Planet name in large text with gradient color
- Hindi description paragraph
- 4-stat grid showing key planet stats from `planet.stats`
- Glass-morphism card style: `bg-black/70 backdrop-blur-md border border-white/10 rounded-3xl`

### 4. Nine Content Sections
Each section follows this pattern:
```tsx
<section className="relative py-20 md:py-28 overflow-hidden">
  {/* Background image */}
  <div className="absolute inset-0">
    <Image src="/universe/planets/planet/bg0N_planet_topic.webp" alt="..." fill className="object-cover" />
    <div className="absolute inset-0 bg-gradient-to-b from-[#020509] via-[#020509]/80 to-[#020509]" />
  </div>
  {/* Content */}
  <div className="relative z-10 max-w-4xl mx-auto px-4">
    <h2 className="text-3xl md:text-5xl font-bold mb-8 text-center">
      <span className="bg-gradient-to-r from-[accent1] to-[accent2] bg-clip-text text-transparent">
        Section Title in Hindi
      </span>
    </h2>
    <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
      <p>Hindi content paragraph 1...</p>
      <p>Hindi content paragraph 2...</p>
    </div>
  </div>
</section>
```

### 5. After Sections
- **FeaturedVideo** component with planet's YouTube videoId
- **Tools Section** — links to space tools (weight calculator, space age, orbit simulator)
- **Subscribe CTA** — newsletter/notification section
- **NextPlanets** component with `currentPlanetId="planet-id"`
- **Footer** component

### 6. Separator Between Sections
```tsx
<div className="h-px bg-gradient-to-r from-transparent via-[accent-color]/30 to-transparent" />
```

## Image Requirements Per Planet

Each planet needs exactly **12 images**:

| # | Filename Pattern | Use | Size |
|---|-----------------|-----|------|
| 1 | `planet1.png` | Hero (already exists) | Any |
| 2 | `planet_art1.webp` | Hero rotation | 1920x1080+ |
| 3 | `planet_art2.webp` | Hero rotation | 1920x1080+ |
| 4 | `bg01_planet_topic.webp` | Section 1 background | 1920x1080+ |
| 5 | `bg02_planet_topic.webp` | Section 2 background | 1920x1080+ |
| 6 | `bg03_planet_topic.webp` | Section 3 background | 1920x1080+ |
| 7 | `bg04_planet_topic.webp` | Section 4 background | 1920x1080+ |
| 8 | `bg05_planet_topic.webp` | Section 5 background | 1920x1080+ |
| 9 | `bg06_planet_topic.webp` | Section 6 background | 1920x1080+ |
| 10 | `bg07_planet_topic.webp` | Section 7 background | 1920x1080+ |
| 11 | `bg08_planet_topic.webp` | Section 8 background | 1920x1080+ |
| 12 | `bg09_planet_topic.webp` | Section 9 background | 1920x1080+ |
| 13 | `planet_mythology_art.webp` | Bonus mythology art | 1920x1080+ |

## Content Rules
- All text in **Hindi** with scientific accuracy
- Each section has 2-4 paragraphs of engaging, educational content
- Numbers and scientific terms can be in English
- Tone: wonder and amazement, making space accessible
- Include specific facts: distances, temperatures, sizes, mission names
- Compare to Earth or everyday objects for relatability
