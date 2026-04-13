# Planet Pages — Build Guide & Image Prompts

## Overview
This folder contains the complete documentation for building planet pages in the SpaceHindi universe section. Each planet has a dedicated page with 9 Hindi-language content sections, a hero section with rotating images, and cinematic image prompts for AI image generation.

## Project Structure

### Planet Pages Location
```
src/app/universe/
├── [id]/page.tsx          # Dynamic fallback page
├── mercury/page.tsx       # Custom Mercury page
├── venus/page.tsx         # Custom Venus page
├── earth/page.tsx         # Custom Earth page
├── mars/page.tsx          # Custom Mars page
├── jupiter/page.tsx       # Custom Jupiter page
├── saturn/page.tsx        # Custom Saturn page
├── uranus/page.tsx        # Custom Uranus page
├── neptune/page.tsx       # Custom Neptune page
└── page.tsx               # Universe explorer main page
```

### Planet Images Location
```
public/universe/planets/
├── mercury/               # Mercury images
├── venus/                 # Venus images
├── earth/                 # Earth images
├── mars/                  # Mars images
├── jupiter/               # Jupiter images
├── saturn/                # Saturn images
├── uranus/                # Uranus images
└── neptune/               # Neptune images
```

### Planet Data
```
src/data/universe/planets.ts   # All planet stats, colors, gradients, videoIds
```

## Files in This Folder
- `README.md` — This file
- `page-template-guide.md` — How each planet page is structured (template)
- `image-prompt-guide.md` — How to write cinematic image prompts
- `mercury-prompts.md` — Mercury image prompts (replacement)
- `venus-prompts.md` — Venus image prompts (replacement)
- `earth-prompts.md` — Earth image prompts
- `mars-prompts.md` — Mars image prompts
- `jupiter-prompts.md` — Jupiter image prompts
- `saturn-prompts.md` — Saturn image prompts
- `uranus-prompts.md` — Uranus image prompts
- `neptune-prompts.md` — Neptune image prompts
- `progress.md` — Planet completion status tracker

## Quick Reference: Planet Colors
| Planet   | Accent Colors           | Glow/Theme              |
|----------|------------------------|-------------------------|
| Mercury  | Grey / Orange          | Warm grey, amber glow   |
| Venus    | Yellow / Orange        | Golden amber, sulfur    |
| Earth    | Blue / Emerald         | Ocean blue, green glow  |
| Mars     | Red / Crimson          | Rusty red, warm orange  |
| Jupiter  | Amber / Gold           | Warm gold, storm bands  |
| Saturn   | Gold / Amber / Lavender| Ring gold, pastel glow  |
| Uranus   | Cyan / Teal            | Ice blue, cool mint     |
| Neptune  | Deep Blue / Indigo     | Royal blue, electric    |

## Quick Reference: Video IDs (YouTube)
| Planet   | videoId          |
|----------|-----------------|
| Mercury  | dG2CGf5B1bI     |
| Venus    | (check planets.ts)|
| Earth    | Fy0dOL81qWs     |
| Mars     | CLm0eluuUHs     |
| Jupiter  | RlS-S8oDzzY     |
| Saturn   | xVQEHip7Z4s     |
| Uranus   | xjemYaNDaEI     |
| Neptune  | 3HWHMJwbpQY     |
