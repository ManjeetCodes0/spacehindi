# SpaceHindi — Project Context for Claude

## Project Overview
SpaceHindi is a Next.js (App Router) space education website in Hindi. It features a Universe Explorer section with custom planet pages, space tools, a blog, and a shop. Firebase is used for auth, Sanity for CMS.

## Tech Stack
- **Framework:** Next.js (App Router) with TypeScript
- **Styling:** Tailwind CSS with dark space theme (`bg-[#020509]`, glass-morphism)
- **Components:** React client components with `"use client"` directive
- **Data:** `src/data/universe/planets.ts` — planet stats, colors, gradients
- **Language:** Bilingual (Hindi/English) via `useLang()` from `src/context/LanguageContext.tsx`
- **Images:** next/image with `fill` prop, all images in `/public/`
- **Deployment:** Firebase + GCP Cloud Build

## Planet Pages Architecture

### Location
- Custom planet pages: `src/app/universe/[planet]/page.tsx` (e.g., `mercury/page.tsx`)
- Dynamic fallback: `src/app/universe/[id]/page.tsx`
- Planet data: `src/data/universe/planets.ts`

### Template Structure (Every Planet Page)
1. Hero section with 3 rotating images (3500ms interval)
2. 9 Hindi content sections with background images
3. FeaturedVideo component (YouTube)
4. Tools section links
5. Subscribe CTA
6. NextPlanets navigation
7. Footer

### Image Convention Per Planet
Images go in `/public/universe/planets/[planet]/`:
- `[planet]1.png` — Main hero image (already exists for all planets)
- `[planet]_art1.webp` — Hero rotation art 1
- `[planet]_art2.webp` — Hero rotation art 2
- `bg01_[planet]_[topic].webp` through `bg09_[planet]_[topic].webp` — Section backgrounds
- `[planet]_mythology_art.webp` — Bonus mythology artwork

### How Image Prompts Are Created
Detailed documentation in `docs/planet-pages/image-prompt-guide.md`. Key points:
1. Each prompt is **cinematic, movie-quality** (Interstellar/Gravity style)
2. Prompt structure: Scene setup → Key details → Mood → Technical quality → Color palette → Resolution
3. Always specify 4-5 specific colors, lighting technique, and film reference
4. Scientific accuracy with real facts (temperatures, distances, mission names)
5. All images: 1920x1080+, landscape, .webp format

### Planet Page Prompts Location
All image prompts are saved in `docs/planet-pages/`:
- `mercury-prompts.md` — Mercury replacement image prompts
- `venus-prompts.md` — Venus replacement image prompts
- `earth-prompts.md` — Earth image prompts
- `mars-prompts.md` — Mars image prompts
- `jupiter-prompts.md` — Jupiter image prompts
- `saturn-prompts.md` — Saturn image prompts
- `uranus-prompts.md` — Uranus image prompts
- `neptune-prompts.md` — Neptune image prompts

### Current Status
- **Completed pages:** Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune
- **Pending:** Pluto (dwarf planet, last in planets.ts)
- **Pending:** Image generation for all planets
- See `docs/planet-pages/progress.md` for full tracker

## Design System
- Background: `bg-[#020509]`, `bg-[#050a12]`
- Glass cards: `bg-black/70 backdrop-blur-md border border-white/10 rounded-3xl`
- Section separators: `h-px bg-gradient-to-r from-transparent via-[accent]/30 to-transparent`
- Text: `text-gray-300` for body, gradient `bg-clip-text text-transparent` for headings
- Each planet has unique accent colors (see docs/planet-pages/README.md)
