/**
 * ScienceHindi 360 — Interactive Auto News Post Pipeline
 *
 * Fetches RSS feeds, presents top topics for selection,
 * asks for word count, generates bilingual sectioned articles
 * with hyper-realistic image prompts via Vertex AI Gemini, publishes to Sanity.
 *
 * Usage: npm run post-news
 */

import "dotenv/config";
import * as readline from "readline";
import * as path from "path";
import * as fs from "fs";
import Parser from "rss-parser";
import { createClient } from "@sanity/client";
import { VertexAI } from "@google-cloud/vertexai";
import { GoogleAuth } from "google-auth-library";

// ─── Config ────────────────────────────────────────────────────────────────────

const RSS_FEEDS = [
  { name: "Space.com", url: "https://www.space.com/feeds/all" },
  { name: "NASA Breaking News", url: "https://www.nasa.gov/rss/dyn/breaking_news.rss" },
  { name: "Phys.org Space", url: "https://phys.org/rss-feed/space-news/" },
];

const SANITY_DOC_TYPE = "deepDivePost";
const GEMINI_MODEL = "gemini-2.5-flash";
const IMAGEN_MODEL = "imagen-3.0-generate-002";
const RATE_LIMIT_DELAY_MS = 10_000; // 10s delay between AI gen and Sanity upload
const DEFAULT_SPACE_DIR = path.resolve("./public/default-space");

// ─── Clients ───────────────────────────────────────────────────────────────────

let sanity: ReturnType<typeof createClient>;
let vertexAI: VertexAI;
let googleAuth: GoogleAuth;

function initClients() {
  sanity = createClient({
    projectId: process.env.SANITY_PROJECT_ID!,
    dataset: process.env.SANITY_DATASET || "production",
    token: process.env.SANITY_TOKEN!,
    apiVersion: "2024-01-01",
    useCdn: false,
  });

  // Set GOOGLE_APPLICATION_CREDENTIALS for the GCP SDK
  process.env.GOOGLE_APPLICATION_CREDENTIALS = path.resolve("./gcp-key.json");

  vertexAI = new VertexAI({
    project: process.env.GCP_PROJECT_ID!,
    location: process.env.GCP_LOCATION || "us-central1",
  });

  googleAuth = new GoogleAuth({
    keyFile: path.resolve("./gcp-key.json"),
    scopes: ["https://www.googleapis.com/auth/cloud-platform"],
  });
}

// ─── Interactive Prompt Helper ─────────────────────────────────────────────────

function ask(question: string): Promise<string> {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ─── Types ─────────────────────────────────────────────────────────────────────

interface FeedItem {
  title: string;
  link: string;
  contentSnippet?: string;
  content?: string;
  pubDate?: string;
  isoDate?: string;
  enclosure?: { url?: string };
  "media:content"?: { $: { url: string } };
  source: string;
}

interface ArticleSection {
  headingEn: string;
  headingHi: string;
  contentEn: string;
  contentHi: string;
  imagePrompt: string;
}

interface FAQItem {
  questionEn: string;
  questionHi: string;
  answerEn: string;
  answerHi: string;
}

interface GeminiResponse {
  titleHindi: string;
  titleEnglish: string;
  slug: string;
  metaDescriptionEn: string;
  metaDescriptionHi: string;
  heroImagePrompt: string;
  sections: ArticleSection[];
  infographicFacts: string[];
  infographicFactsEnglish: string[];
  scienceCorner: Array<{
    term: string;
    definitionHi: string;
    definitionEn: string;
  }>;
  conclusion: string;
  conclusionEnglish: string;
  faq: FAQItem[];
  tags: string[];
}

// ─── Gemini System Prompt ──────────────────────────────────────────────────────

function buildSystemPrompt(minWords: number): string {
  return `You are a friendly, passionate science educator for the website ScienceHindi. Imagine you are explaining the mysteries of space to a curious 20-year-old friend over chai. Don't be a robot — be a storyteller. Make them go "whoa, seriously?!" while reading.

Your job: Take a space news article and turn it into a LONG, exciting, story-like deep-dive article in BOTH Hindi and English. Minimum ${minWords} words PER LANGUAGE.

═══ LANGUAGE RULES ═══

ENGLISH TONE:
- Use simple, everyday English. Write like you're texting a smart friend, not writing a research paper.
- BAD: "The celestial body exhibited significant gravitational anomalies."
- GOOD: "This planet has a very strange pull of gravity — like, weirdly strong."
- Use short sentences. Ask questions to the reader. Add excitement naturally.
- It's okay to say "pretty cool", "insane", "mind-blowing" — be real.

HINDI TONE:
- Write in natural, simple Hindi that an Indian reader speaks daily. NOT Shuddh/Sanskrit Hindi, and NOT Hinglish full of English words.
- Use HINDI words for common concepts. Only use English for proper nouns (NASA, ISRO, SpaceX, James Webb) or terms that have no simple Hindi equivalent.
- BAD (too much English): "Space Science के हिसाब से ये Star बहुत ही अजीब है!"
- BAD (too Shuddh): "खगोलभौतिकी के अनुसार यह नक्षत्र अत्यंत विलक्षण है।"
- GOOD: "अंतरिक्ष विज्ञान के हिसाब से ये तारा बहुत ही अजीब है!"
- Use Hindi words: ग्रह (not Planet), तारा (not Star), चाँद (not Moon), सूरज (not Sun), धरती (not Earth), रॉकेट (not Rocket — this is fine as it's commonly used in Hindi), उपग्रह (not Satellite), गुरुत्वाकर्षण (not Gravity), आकाशगंगा (not Galaxy), दूरबीन (not Telescope), कक्षा (not Orbit), ब्लैक होल (accepted — no simple Hindi word)
- Reference India: mention ISRO achievements, compare distances/sizes with Indian landmarks (e.g., "ये इतना बड़ा है कि दिल्ली से मुंबई की दूरी इसके सामने कुछ नहीं"), use Indian units where relatable.
- Write like a friendly Indian science teacher — "तो चलिए समझते हैं...", "अब यहाँ मज़ा आता है...", "सोचो ज़रा..."
- Keep it conversational. Use "आप", "हम", "दोस्तों" — talk TO the reader.

═══ OUTPUT FORMAT ═══

Output ONLY valid JSON with this exact structure:

{
  "titleHindi": "Catchy, exciting Hindi headline (60-70 chars). Use natural Hindi, not English words.",
  "titleEnglish": "Catchy, clear English headline — simple words, big curiosity (60-70 chars)",
  "slug": "url-friendly-slug-lowercase-hyphens",
  "metaDescriptionEn": "155-char English description that makes you want to read more",
  "metaDescriptionHi": "155-char Hindi description in natural Hindi — minimal English words",
  "heroImagePrompt": "A hyper-realistic, cinematic 8K image prompt for the hero banner. Describe a breathtaking space scene related to the article. Include: lighting, camera angle, atmosphere, textures, scientific accuracy. Style: NASA photography meets sci-fi concept art. NO text/words in image.",

  "sections": [
    {
      "headingEn": "Short, punchy section heading in English",
      "headingHi": "Short, punchy section heading in natural Hindi",
      "contentEn": "3-5 paragraphs. Write like you're telling a story to a friend. Use short sentences. Ask questions. Add 'wow' moments. Minimum 150 words.",
      "contentHi": "3-5 paragraphs. Same energy in natural Hindi. Use Hindi words (ग्रह, तारा, अंतरिक्ष, रॉकेट). Only English for proper nouns (NASA, ISRO). Add India-relatable examples. Minimum 150 words.",
      "imagePrompt": "Hyper-realistic, cinematic 8K image prompt specific to THIS section. Describe the exact space scene, equipment, or phenomenon. Include: dramatic lighting, photorealistic textures, volumetric atmosphere. Style: NASA/ESA photography quality. NO text in image."
    }
  ],

  "infographicFacts": ["5-7 mind-blowing facts in natural Hindi — short, punchy, shareable. Use Hindi words."],
  "infographicFactsEnglish": ["Same 5-7 facts in simple English — like tweet-sized wow moments"],

  "scienceCorner": [
    {
      "term": "Scientific Term (in English)",
      "definitionHi": "Simple Hindi explanation — like explaining to a friend, use Hindi words",
      "definitionEn": "Simple English explanation — no jargon, just clarity"
    }
  ],

  "conclusion": "Inspiring closing paragraph in natural Hindi (50+ words). End with a thought that stays with the reader.",
  "conclusionEnglish": "Inspiring closing paragraph in simple English (50+ words). Leave them thinking about the universe.",

  "faq": [
    {
      "questionEn": "A question a curious reader would actually Google about this topic",
      "questionHi": "Same question in natural Hindi",
      "answerEn": "Clear 2-3 sentence answer in simple English",
      "answerHi": "Clear 2-3 sentence answer in natural Hindi"
    }
  ],

  "tags": ["Use ONLY broad, general tags from this list: space news, universe, solar system, planet, mars, moon, sun, earth, stars, galaxy, black hole, nasa, isro, spacex, rocket, satellite, telescope, asteroid, space exploration, astrophysics, cosmos, venus, jupiter, saturn, mercury. Pick 3-5 that match the topic. Do NOT invent specific or niche tags."]
}

═══ CRITICAL RULES ═══

1. Generate 4-6 sections. Each section MUST have 150+ words per language.
2. Total content MUST be ${minWords}+ words per language across all sections combined.
3. Each section gets a UNIQUE, detailed hyper-realistic image prompt (50+ words each).
4. Image prompts must be photorealistic — describe as if directing a NASA photographer. Include camera specs, lighting, atmosphere.
5. Generate 3-5 FAQ items — questions people would actually search on Google.
6. Both languages must feel NATIVE — English should not feel translated from Hindi, and Hindi should not feel translated from English. Write each independently.
7. Hindi MUST be natural Hindi. Use Hindi words: अंतरिक्ष (not Space), विज्ञान (not Science), ग्रह (not Planet), तारा (not Star), ब्रह्मांड (not Universe), आकाशगंगा (not Galaxy), दूरबीन (not Telescope). Only use English for proper nouns like NASA, ISRO, SpaceX, James Webb, Chandrayaan, Mangalyaan.
8. NEVER use Shuddh Hindi like "खगोलभौतिकी", "नक्षत्रमंडल", "अत्यंत विलक्षण". Keep it simple and relatable.
9. Add India-specific references: compare with Indian landmarks, mention ISRO missions, use Indian examples to make content relatable for Indian readers.
10. Write for the web: short paragraphs, hooks at the start of each section, scannable structure.
11. Be a storyteller, not a textbook. Every section should have at least one "wow" moment or surprising detail.
12. Tags: ONLY use broad, general tags like "space news", "universe", "planet", "nasa", "isro", "galaxy" etc. Maximum 5 tags. NO specific/niche tags.
13. Output ONLY valid JSON. No markdown, no code blocks, no extra text.`;
}

// ─── Step 1: Fetch RSS Feeds ───────────────────────────────────────────────────

async function fetchAllFeeds(): Promise<FeedItem[]> {
  const parser = new Parser({
    customFields: {
      item: [["media:content", "media:content"]],
    },
  });

  const allItems: FeedItem[] = [];

  for (const feed of RSS_FEEDS) {
    try {
      console.log(`  Fetching: ${feed.name}...`);
      const result = await parser.parseURL(feed.url);
      const items = (result.items || []).slice(0, 10).map((item) => ({
        title: item.title || "Untitled",
        link: item.link || "",
        contentSnippet: item.contentSnippet || "",
        content: item.content || item.contentSnippet || "",
        pubDate: item.pubDate,
        isoDate: item.isoDate,
        enclosure: item.enclosure as FeedItem["enclosure"],
        "media:content": item["media:content"] as FeedItem["media:content"],
        source: feed.name,
      }));
      allItems.push(...items);
      console.log(`   Got ${items.length} items from ${feed.name}`);
    } catch (err) {
      console.error(`   Failed: ${feed.name}:`, (err as Error).message);
    }
  }

  return allItems;
}

// ─── Step 2: Deduplicate ────────────────────────────────────────────────────────

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

async function filterNewItems(items: FeedItem[]): Promise<FeedItem[]> {
  const existingSlugs: string[] = await sanity.fetch(
    `*[_type == "${SANITY_DOC_TYPE}"]{ "slug": slug.current }.slug`
  );
  const slugSet = new Set(existingSlugs);

  const existingUrls: string[] = await sanity.fetch(
    `*[_type == "${SANITY_DOC_TYPE}"]{ sourceUrl }.sourceUrl`
  );
  const urlSet = new Set(existingUrls.filter(Boolean));

  return items.filter((item) => {
    const slug = generateSlug(item.title);
    if (slugSet.has(slug)) return false;
    if (urlSet.has(item.link)) return false;
    return true;
  });
}

// ─── Step 3: Score & Pick Top 4 ─────────────────────────────────────────────────

function scoreAndRank(items: FeedItem[]): Array<{ item: FeedItem; score: number }> {
  const viralKeywords = [
    "discover", "breakthrough", "first", "new", "record", "ancient",
    "life", "water", "mars", "moon", "james webb", "jwst", "black hole",
    "exoplanet", "asteroid", "launch", "nasa", "isro", "spacex",
    "artemis", "hubble", "galaxy", "supernova", "dark matter", "dark energy",
    "europa", "titan", "venus", "jupiter", "saturn", "rocket", "crew",
  ];

  const scored = items.map((item) => {
    const text = `${item.title} ${item.contentSnippet}`.toLowerCase();
    let score = 0;

    for (const kw of viralKeywords) {
      if (text.includes(kw)) score += 2;
    }

    if (item.isoDate) {
      const ageHours = (Date.now() - new Date(item.isoDate).getTime()) / (1000 * 60 * 60);
      if (ageHours < 6) score += 10;
      else if (ageHours < 12) score += 7;
      else if (ageHours < 24) score += 4;
      else if (ageHours < 48) score += 2;
    }

    if ((item.contentSnippet?.length || 0) > 200) score += 3;

    return { item, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored;
}

// ─── Step 4: Process with Vertex AI Gemini ──────────────────────────────────────

async function processWithGemini(item: FeedItem, minWords: number): Promise<GeminiResponse> {
  const MAX_RETRIES = 2;

  const systemPrompt = buildSystemPrompt(minWords);

  const userPrompt = `Transform this space news article into a ScienceHindi 360 premium deep-dive post.

Title: ${item.title}
Source: ${item.source}
Published: ${item.pubDate || "Unknown"}
URL: ${item.link}

Article Content:
${item.content || item.contentSnippet || item.title}

IMPORTANT:
- Minimum ${minWords} words PER LANGUAGE across all sections combined.
- Generate 4-6 rich sections with detailed image prompts.
- Generate 3-5 FAQ items for SEO.
- Output ONLY valid JSON. No markdown code blocks.`;

  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      if (attempt > 0) {
        const delay = attempt * 15;
        console.log(`   Retry ${attempt}/${MAX_RETRIES} in ${delay}s...`);
        await sleep(delay * 1000);
      }

      console.log(`\n  Sending to Vertex AI ${GEMINI_MODEL}${attempt > 0 ? ` (attempt ${attempt + 1})` : ""}...`);

      const model = vertexAI.getGenerativeModel({
        model: GEMINI_MODEL,
        systemInstruction: {
          role: "system",
          parts: [{ text: systemPrompt }],
        },
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 16384,
          responseMimeType: "application/json",
        },
      });

      const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: userPrompt }] }],
      });

      const candidate = result.response?.candidates?.[0];
      if (!candidate?.content?.parts?.[0]?.text) {
        throw new Error("Empty response from Vertex AI");
      }

      const responseText = candidate.content.parts[0].text;
      const cleaned = responseText
        .replace(/^```json\s*/i, "")
        .replace(/^```\s*/i, "")
        .replace(/\s*```$/i, "")
        .trim();

      const parsed: GeminiResponse = JSON.parse(cleaned);

      if (!parsed.titleHindi || !parsed.titleEnglish || !parsed.slug || !parsed.sections?.length) {
        throw new Error("Gemini response missing required fields");
      }

      parsed.slug = parsed.slug
        .toLowerCase()
        .replace(/[^a-z0-9-]/g, "")
        .replace(/-+/g, "-");

      // Count words
      const enWords = parsed.sections.reduce((sum, s) => sum + s.contentEn.split(/\s+/).length, 0);
      const hiWords = parsed.sections.reduce((sum, s) => sum + s.contentHi.split(/\s+/).length, 0);

      console.log(`   Generated: "${parsed.titleEnglish}"`);
      console.log(`   Slug: ${parsed.slug}`);
      console.log(`   Sections: ${parsed.sections.length}`);
      console.log(`   English words: ~${enWords}`);
      console.log(`   Hindi words: ~${hiWords}`);
      console.log(`   Image prompts: ${parsed.sections.length + 1} (hero + ${parsed.sections.length} sections)`);
      console.log(`   FAQ items: ${parsed.faq?.length || 0}`);
      console.log(`   Tags: ${parsed.tags?.join(", ")}`);

      return parsed;
    } catch (err) {
      lastError = err as Error;
      const statusCode = (err as { code?: number; status?: number }).code || (err as { status?: number }).status;
      const is429 = statusCode === 429;
      const isRetryable = is429 || lastError instanceof SyntaxError;

      if (isRetryable && attempt < MAX_RETRIES) {
        console.log(`   ${is429 ? "Rate limited" : "Bad JSON response"}, will retry...`);
        continue;
      }
      if (!isRetryable) {
        throw err;
      }
    }
  }

  throw new Error(`All retries failed. Last error: ${lastError?.message || "Unknown"}`);
}

// ─── Step 5: Imagen 3 Image Generation & Upload ────────────────────────────────

type SanityImageRef = { _type: "image"; asset: { _type: "reference"; _ref: string } };

/**
 * Pick a random fallback image from public/default-space/ and upload it to Sanity.
 */
async function uploadFallbackImage(label: string): Promise<SanityImageRef | null> {
  try {
    const files = fs.readdirSync(DEFAULT_SPACE_DIR).filter((f) =>
      /\.(jpe?g|png|webp)$/i.test(f)
    );
    if (files.length === 0) {
      console.log(`   ⚠ No fallback images found in ${DEFAULT_SPACE_DIR}`);
      return null;
    }
    const pick = files[Math.floor(Math.random() * files.length)];
    console.log(`   Using fallback image for ${label}: ${pick}`);
    const buffer = fs.readFileSync(path.join(DEFAULT_SPACE_DIR, pick));
    const ext = path.extname(pick).replace(".", "");
    const contentType = ext === "png" ? "image/png" : ext === "webp" ? "image/webp" : "image/jpeg";

    const asset = await sanity.assets.upload("image", buffer, {
      filename: `fallback-${label}-${Date.now()}.${ext}`,
      contentType,
    });
    console.log(`   Fallback uploaded: ${asset._id}`);
    return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
  } catch (err) {
    console.error(`   Fallback upload failed for ${label}:`, (err as Error).message);
    return null;
  }
}

/**
 * Call the Imagen 3 API once and return the response.
 */
async function callImagenAPI(
  prompt: string,
  aspectRatio: "16:9" | "4:3" | "1:1",
  endpoint: string
): Promise<Response> {
  const client = await googleAuth.getClient();
  const accessToken = (await client.getAccessToken()).token;

  return fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      instances: [{ prompt }],
      parameters: {
        sampleCount: 1,
        aspectRatio,
        safetyFilterLevel: "block_few", // High safety for AdSense compliance
        personGeneration: "dont_allow",
      },
    }),
  });
}

/**
 * Generate an image using Vertex AI Imagen 3 and upload the result to Sanity.
 * On 429 rate-limit: waits 30s and retries once before falling back.
 * On other errors: falls back to a random default-space image immediately.
 */
async function generateAndUploadImage(
  prompt: string,
  aspectRatio: "16:9" | "4:3" | "1:1",
  label: string
): Promise<SanityImageRef | null> {
  const project = process.env.GCP_PROJECT_ID!;
  const location = process.env.GCP_LOCATION || "us-central1";
  const endpoint = `https://${location}-aiplatform.googleapis.com/v1/projects/${project}/locations/${location}/publishers/google/models/${IMAGEN_MODEL}:predict`;

  const MAX_429_RETRIES = 1;

  for (let attempt = 0; attempt <= MAX_429_RETRIES; attempt++) {
    try {
      console.log(`\n  Generating image [${label}] (${aspectRatio})${attempt > 0 ? ` — retry ${attempt}` : ""}...`);

      const response = await callImagenAPI(prompt, aspectRatio, endpoint);

      if (response.status === 429) {
        if (attempt < MAX_429_RETRIES) {
          console.log(`   Rate limited (429). Waiting 30s before retry...`);
          await sleep(30_000);
          continue;
        }
        throw new Error("Imagen API 429: Rate limit exceeded after retry");
      }

      if (!response.ok) {
        const errBody = await response.text();
        throw new Error(`Imagen API ${response.status}: ${errBody.slice(0, 300)}`);
      }

      const result = await response.json();
      const base64Data = result.predictions?.[0]?.bytesBase64Encoded;

      if (!base64Data) {
        throw new Error("Imagen returned no image data (possibly blocked by safety filter)");
      }

      const buffer = Buffer.from(base64Data, "base64");
      console.log(`   Image generated (${(buffer.length / 1024).toFixed(0)} KB). Uploading to Sanity...`);

      const asset = await sanity.assets.upload("image", buffer, {
        filename: `imagen-${label}-${Date.now()}.png`,
        contentType: "image/png",
      });

      console.log(`   Uploaded: ${asset._id}`);
      return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
    } catch (err) {
      console.error(`   Image generation failed for ${label}:`, (err as Error).message);
      console.log(`   Falling back to default-space image...`);
      return uploadFallbackImage(label);
    }
  }

  return uploadFallbackImage(label);
}

/**
 * Generate all images (1 hero + up to 4 sections = 5 total) and return refs.
 * Waits 15s after each successful generation to stay within GCP quota.
 */
const IMAGE_COOLDOWN_MS = 15_000; // 15s between successful generations
const MAX_SECTION_IMAGES = 4;

async function generateAllImages(
  data: GeminiResponse
): Promise<{ heroImage: SanityImageRef | null; sectionImages: (SanityImageRef | null)[] }> {
  const sectionCount = Math.min(data.sections.length, MAX_SECTION_IMAGES);
  const totalImages = 1 + sectionCount;

  console.log("\n── Imagen 3: Generating Images ──");
  console.log(`  Total images to generate: ${totalImages} (1 hero + ${sectionCount} sections)`);
  console.log(`  Estimated time: ~${Math.ceil((totalImages * IMAGE_COOLDOWN_MS) / 60_000)} minutes (15s cooldown per image)\n`);

  // Hero image — 16:9
  const heroImage = await generateAndUploadImage(
    data.heroImagePrompt,
    "16:9",
    "hero"
  );

  // Section images — 4:3, sequentially with 15s cooldown
  const sectionImages: (SanityImageRef | null)[] = [];
  for (let i = 0; i < sectionCount; i++) {
    // 15s cooldown after previous successful generation
    console.log(`\n  Cooling down 15s before next image (${i + 1}/${sectionCount})...`);
    await sleep(IMAGE_COOLDOWN_MS);

    const ref = await generateAndUploadImage(
      data.sections[i].imagePrompt,
      "4:3",
      `section-${i}`
    );
    sectionImages.push(ref);
  }

  const generated = [heroImage, ...sectionImages].filter(Boolean).length;
  console.log(`\n  Image generation complete: ${generated}/${totalImages} successful`);

  return { heroImage, sectionImages };
}

// ─── Step 6: Create Sanity Document ─────────────────────────────────────────────

async function createSanityPost(
  data: GeminiResponse,
  sourceItem: FeedItem,
  imageRefs: { heroImage: SanityImageRef | null; sectionImages: (SanityImageRef | null)[] }
) {
  console.log(`\n  Creating Sanity document...`);

  const doc = {
    _type: SANITY_DOC_TYPE,
    titleHindi: data.titleHindi,
    titleEnglish: data.titleEnglish,
    slug: { _type: "slug", current: data.slug },
    metaDescriptionEn: data.metaDescriptionEn || "",
    metaDescriptionHi: data.metaDescriptionHi || "",
    heroImagePrompt: data.heroImagePrompt || "",
    sections: (data.sections || []).map((s, i) => ({
      _key: `sec-${i}`,
      headingEn: s.headingEn,
      headingHi: s.headingHi,
      contentEn: s.contentEn,
      contentHi: s.contentHi,
      imagePrompt: s.imagePrompt,
      ...(imageRefs.sectionImages[i] ? { sectionImage: imageRefs.sectionImages[i] } : {}),
    })),
    // Keep flat content for backward compat / excerpts
    content: data.sections.map((s) => `## ${s.headingHi}\n\n${s.contentHi}`).join("\n\n"),
    contentEnglish: data.sections.map((s) => `## ${s.headingEn}\n\n${s.contentEn}`).join("\n\n"),
    infographicFacts: data.infographicFacts || [],
    infographicFactsEnglish: data.infographicFactsEnglish || [],
    scienceCorner: (data.scienceCorner || []).map((item, i) => ({
      _key: `sc-${i}`,
      term: item.term,
      definitionHi: item.definitionHi,
      definitionEn: item.definitionEn,
    })),
    conclusion: data.conclusion,
    conclusionEnglish: data.conclusionEnglish || "",
    faq: (data.faq || []).map((item, i) => ({
      _key: `faq-${i}`,
      questionEn: item.questionEn,
      questionHi: item.questionHi,
      answerEn: item.answerEn,
      answerHi: item.answerHi,
    })),
    tags: data.tags || [],
    sourceUrl: sourceItem.link,
    sourceName: sourceItem.source,
    authorName: "Manjeet Singh",
    publishedAt: new Date().toISOString(),
    ...(imageRefs.heroImage ? { mainImage: imageRefs.heroImage } : {}),
  };

  const created = await sanity.create(doc);
  console.log(`   Document created: ${created._id}`);
  console.log(`   Slug: /blog/${data.slug}`);

  return created;
}

// ─── Step: Process Custom Topic with Gemini ─────────────────────────────────────

async function processCustomTopicWithGemini(topic: string, minWords: number): Promise<GeminiResponse> {
  const MAX_RETRIES = 2;
  const systemPrompt = buildSystemPrompt(minWords);

  const userPrompt = `Create a ScienceHindi 360 premium deep-dive post on this topic:

Topic: ${topic}

IMPORTANT:
- Research this topic thoroughly and write a comprehensive, accurate article.
- Minimum ${minWords} words PER LANGUAGE across all sections combined.
- Generate 4-6 rich sections with detailed image prompts.
- Generate 3-5 FAQ items for SEO.
- Output ONLY valid JSON. No markdown code blocks.`;

  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      if (attempt > 0) {
        const delay = attempt * 15;
        console.log(`   Retry ${attempt}/${MAX_RETRIES} in ${delay}s...`);
        await sleep(delay * 1000);
      }

      console.log(`\n  Sending to Vertex AI ${GEMINI_MODEL}${attempt > 0 ? ` (attempt ${attempt + 1})` : ""}...`);

      const model = vertexAI.getGenerativeModel({
        model: GEMINI_MODEL,
        systemInstruction: {
          role: "system",
          parts: [{ text: systemPrompt }],
        },
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 16384,
          responseMimeType: "application/json",
        },
      });

      const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: userPrompt }] }],
      });

      const candidate = result.response?.candidates?.[0];
      if (!candidate?.content?.parts?.[0]?.text) {
        throw new Error("Empty response from Vertex AI");
      }

      const responseText = candidate.content.parts[0].text;
      const cleaned = responseText
        .replace(/^```json\s*/i, "")
        .replace(/^```\s*/i, "")
        .replace(/\s*```$/i, "")
        .trim();

      const parsed: GeminiResponse = JSON.parse(cleaned);

      if (!parsed.titleHindi || !parsed.titleEnglish || !parsed.slug || !parsed.sections?.length) {
        throw new Error("Gemini response missing required fields");
      }

      parsed.slug = parsed.slug
        .toLowerCase()
        .replace(/[^a-z0-9-]/g, "")
        .replace(/-+/g, "-");

      const enWords = parsed.sections.reduce((sum, s) => sum + s.contentEn.split(/\s+/).length, 0);
      const hiWords = parsed.sections.reduce((sum, s) => sum + s.contentHi.split(/\s+/).length, 0);

      console.log(`   Generated: "${parsed.titleEnglish}"`);
      console.log(`   Slug: ${parsed.slug}`);
      console.log(`   Sections: ${parsed.sections.length}`);
      console.log(`   English words: ~${enWords}`);
      console.log(`   Hindi words: ~${hiWords}`);
      console.log(`   Image prompts: ${parsed.sections.length + 1} (hero + ${parsed.sections.length} sections)`);
      console.log(`   FAQ items: ${parsed.faq?.length || 0}`);
      console.log(`   Tags: ${parsed.tags?.join(", ")}`);

      return parsed;
    } catch (err) {
      lastError = err as Error;
      const statusCode = (err as { code?: number; status?: number }).code || (err as { status?: number }).status;
      const is429 = statusCode === 429;
      const isRetryable = is429 || lastError instanceof SyntaxError;

      if (isRetryable && attempt < MAX_RETRIES) {
        console.log(`   ${is429 ? "Rate limited" : "Bad JSON response"}, will retry...`);
        continue;
      }
      if (!isRetryable) {
        throw err;
      }
    }
  }

  throw new Error(`All retries failed. Last error: ${lastError?.message || "Unknown"}`);
}

// ─── Main Pipeline ─────────────────────────────────────────────────────────────

async function main() {
  console.log("\n╔══════════════════════════════════════════════════════════╗");
  console.log("║   ScienceHindi 360 — Interactive News Post Pipeline     ║");
  console.log("║   Powered by Vertex AI (Gemini 2.5 Flash + Imagen 3)   ║");
  console.log("╚══════════════════════════════════════════════════════════╝\n");

  // Validate environment
  const requiredEnv = ["GCP_PROJECT_ID", "SANITY_PROJECT_ID", "SANITY_TOKEN"];
  const missing = requiredEnv.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    console.error(`Missing env vars: ${missing.join(", ")}`);
    process.exit(1);
  }

  initClients();

  // ── Step 1: Choose mode ──
  console.log("── Step 1: What do you want to create? ──\n");
  console.log("  [1] Write on my own topic");
  console.log("  [2] Pick from RSS feeds (Space.com, NASA, Phys.org)\n");

  const modeStr = await ask("  Enter your choice (1 or 2): ");
  const mode = parseInt(modeStr, 10);

  if (mode !== 1 && mode !== 2) {
    console.log("Invalid choice. Exiting.");
    process.exit(1);
  }

  let selected: FeedItem;
  let geminiData: GeminiResponse;

  // ── Step 2: Article length ──
  console.log("\n── Step 2: Article Length ──\n");
  const wordsStr = await ask("  Minimum words per language (e.g. 800, 1200, 1500): ");
  const minWords = parseInt(wordsStr, 10) || 800;
  console.log(`  Target: ${minWords}+ words per language\n`);

  if (mode === 1) {
    // ── Custom topic flow ──
    console.log("── Step 3: Enter Your Topic ──\n");
    const topic = await ask("  Type your space topic: ");
    if (!topic) {
      console.log("No topic entered. Exiting.");
      process.exit(1);
    }
    console.log(`\n  Topic: "${topic}"\n`);

    // Create a dummy FeedItem for the custom topic
    selected = {
      title: topic,
      link: "",
      source: "Custom Topic",
    };

    console.log("── Step 4: Generating Article with Vertex AI Gemini ──");
    geminiData = await processCustomTopicWithGemini(topic, minWords);
  } else {
    // ── RSS feed flow ──
    console.log("── Step 3: Fetching RSS Feeds ──\n");
    const allItems = await fetchAllFeeds();
    if (allItems.length === 0) {
      console.log("\nNo items fetched. Exiting.");
      process.exit(0);
    }
    console.log(`\nTotal items fetched: ${allItems.length}`);

    // Filter duplicates
    const newItems = await filterNewItems(allItems);
    if (newItems.length === 0) {
      console.log("\nAll articles already in Sanity. Nothing new.");
      process.exit(0);
    }
    console.log(`New (unposted) items: ${newItems.length}`);

    // Score and show top 4 topics
    const ranked = scoreAndRank(newItems);
    const topN = ranked.slice(0, 4);

    console.log("\n── Step 3b: Pick Your Topic ──\n");
    topN.forEach((r, i) => {
      const age = r.item.isoDate
        ? `${Math.round((Date.now() - new Date(r.item.isoDate).getTime()) / (1000 * 60 * 60))}h ago`
        : "unknown";
      console.log(`  [${i + 1}] ${r.item.title}`);
      console.log(`      Source: ${r.item.source} | Score: ${r.score} | Age: ${age}`);
      if (r.item.contentSnippet) {
        console.log(`      ${r.item.contentSnippet.slice(0, 120)}...`);
      }
      console.log();
    });

    const choiceStr = await ask(`  Enter your choice (1-${topN.length}): `);
    const choice = parseInt(choiceStr, 10);
    if (isNaN(choice) || choice < 1 || choice > topN.length) {
      console.log("Invalid choice. Exiting.");
      process.exit(1);
    }
    selected = topN[choice - 1].item;
    console.log(`\n  Selected: "${selected.title}"\n`);

    console.log("── Step 4: Generating Article with Vertex AI Gemini ──");
    geminiData = await processWithGemini(selected, minWords);
  }

  // ── Step 5: Rate limit cooldown ──
  console.log(`\n  Cooling down ${RATE_LIMIT_DELAY_MS / 1000}s before image generation...`);
  await sleep(RATE_LIMIT_DELAY_MS);

  // ── Step 6: Generate images with Imagen 3 ──
  const imageRefs = await generateAllImages(geminiData);

  // ── Step 7: Publish to Sanity ──
  console.log("\n── Step 7: Publishing to Sanity ──");
  const doc = await createSanityPost(geminiData, selected, imageRefs);

  console.log("\n╔══════════════════════════════════════════════════════════╗");
  console.log("║   PIPELINE COMPLETE                                     ║");
  console.log("╠══════════════════════════════════════════════════════════╣");
  console.log(`║  Mode: ${mode === 1 ? "Custom Topic" : "RSS Feed"}`);
  console.log(`║  ID: ${doc._id}`);
  console.log(`║  Title: ${geminiData.titleEnglish}`);
  console.log(`║  Slug: /blog/${geminiData.slug}`);
  console.log(`║  Sections: ${geminiData.sections.length}`);
  console.log(`║  Images: ${[imageRefs.heroImage, ...imageRefs.sectionImages].filter(Boolean).length}/${1 + imageRefs.sectionImages.length}`);
  console.log(`║  FAQ: ${geminiData.faq?.length || 0} items`);
  console.log(`║  Tags: ${geminiData.tags?.join(", ")}`);
  console.log("╚══════════════════════════════════════════════════════════╝\n");
}

main().catch((err) => {
  console.error("\nPipeline failed:", err);
  process.exit(1);
});
