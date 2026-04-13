/**
 * ScienceHindi 360 — Interactive Auto News Post Pipeline (Hindi-Only)
 *
 * Fetches RSS feeds, presents top topics for selection,
 * asks for word count, generates Hindi-only sectioned articles
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
  headingHi: string;
  contentHi: string;
  imagePrompt: string;
}

interface FAQItem {
  questionHi: string;
  answerHi: string;
}

interface GeminiResponse {
  titleHindi: string;
  slug: string;
  metaDescriptionHi: string;
  heroImagePrompt: string;
  sections: ArticleSection[];
  infographicFacts: string[];
  scienceCorner: Array<{
    term: string;
    definitionHi: string;
  }>;
  conclusion: string;
  faq: FAQItem[];
  tags: string[];
}

// ─── Gemini System Prompt (Hindi-Only) ────────────────────────────────────────

function buildSystemPrompt(minWords: number): string {
  return `You are a professional, knowledgeable science educator and journalist for the website ScienceHindi. Your goal is to educate and inform readers about the mysteries of space with clarity and authority. 

Your job: Take a space news article and turn it into a LONG, structured, informative, and engaging deep-dive article in HINDI ONLY. Minimum \${minWords} words.

═══ HINDI TONE & LANGUAGE RULES ═══

IMPORTANT: Write in SIMPLE, EVERYDAY Hindi that a normal Indian person uses daily. DO NOT use deep, heavy, Sanskritized Hindi words. Instead, freely use common English words written in Devanagari script (Hindi transliteration).

LANGUAGE STYLE:
- Use simple, easy-to-read Hindi mixed with common English words written in Hindi script.
- For scientific/technical terms: ALWAYS use the English word written in Hindi (Devanagari). Do NOT translate them into deep Hindi equivalents.
- The tone should be like an educated Indian person explaining science to a friend — professional but accessible.

WORD CHOICES — USE THESE (English in Hindi script), NOT deep Hindi:
- Use "स्पेस" NOT "अंतरिक्ष", Use "प्लैनेट" NOT "ग्रह", Use "स्टार" NOT "तारा" or "नक्षत्र"
- Use "साइंटिस्ट" NOT "वैज्ञानिक", Use "डिस्कवरी" NOT "खोज" or "अन्वेषण"
- Use "ग्रैविटी" NOT "गुरुत्वाकर्षण", Use "ऑर्बिट" NOT "कक्षा"
- Use "टेलीस्कोप" NOT "दूरदर्शी", Use "गैलेक्सी" NOT "आकाशगंगा"
- Use "एस्ट्रोनॉट" NOT "अंतरिक्षयात्री", Use "मिशन" NOT "अभियान"
- Use "रिसर्च" NOT "अनुसंधान", Use "डेटा" NOT "आंकड़े"
- Use "टेक्नोलॉजी" NOT "प्रौद्योगिकी", Use "एनर्जी" NOT "ऊर्जा"
- Use "एटमॉस्फ़ियर" NOT "वायुमंडल", Use "सरफ़ेस" NOT "सतह" (both okay)
- Use "सोलर सिस्टम" NOT "सौरमंडल", Use "ब्लैक होल" as-is
- Use "रेडिएशन" NOT "विकिरण", Use "यूनिवर्स" NOT "ब्रह्मांड"
- Use "लाइट ईयर" NOT "प्रकाश वर्ष", Use "ऑक्सीजन" as-is
- Use "इम्पैक्ट" NOT "प्रभाव", Use "डिस्टेंस" or "दूरी" (both okay)
- Use "रॉकेट", "सैटेलाइट", "NASA", "ISRO", "SpaceX" directly

EXAMPLES:
- BAD (too deep Hindi): "अंतरिक्ष विज्ञान के दृष्टिकोण से, यह तारा कई अद्वितीय विशेषताएँ प्रस्तुत करता है।"
- BAD (too casual): "दोस्तों, सोचो ज़रा, ये तारा बहुत ही अजीब है!"
- GOOD: "स्पेस साइंस के हिसाब से, यह स्टार काफ़ी यूनिक फ़ीचर्स रखता है जो साइंटिस्ट्स को हैरान कर रहे हैं।"
- GOOD: "NASA के रिसर्चर्स ने इस प्लैनेट पर वॉटर के साइन्स डिटेक्ट किए हैं, जो एक बड़ी डिस्कवरी है।"
- GOOD: "यह ब्लैक होल हमारे सोलर सिस्टम से करोड़ों लाइट ईयर दूर है और इसकी ग्रैविटी बेहद पावरफ़ुल है।"

AVOID:
- Deep/heavy Hindi words like: दृष्टिकोण, अद्वितीय, विशेषताएँ, प्रस्तुत, अन्वेषण, गुरुत्वाकर्षण, अंतरिक्षयात्री, प्रौद्योगिकी, विकिरण, सौरमंडल, वायुमंडल, अनुसंधान
- Casual filler words like: "अरे", "दोस्तों", "यार", "मज़ा आता है", "सोचो ज़रा"
- Writing English words in English script mid-sentence (write them in Devanagari instead)

KEEP THESE IN HINDI (don't convert to English):
- Basic Hindi grammar words: है, हैं, का, की, के, में, से, पर, और, लेकिन, क्योंकि, इसलिए
- Common Hindi words everyone knows: बड़ा, छोटा, नया, पुराना, दूर, करीब, तेज़, धीमा, ज़्यादा, कम, पहला, आखिरी
- Simple Hindi verbs: मिला, देखा, बताया, किया, हुआ, दिखाया, भेजा, बनाया

TONE:
- Professional but easy to understand — like a Hindi news anchor on a science show
- Reference India: Mention ISRO's contributions where relevant, use comparative metrics Indians can relate to
- Use "आप" (respectful you) — maintain professional tone, not casual

═══ OUTPUT FORMAT ═══

Output ONLY valid JSON with this exact structure:

{
  "titleHindi": "Catchy, clear Hindi headline (60-70 chars). Use simple Hindi + English words in Devanagari. Example: 'NASA ने खोजा नया प्लैनेट — वॉटर के मिले संकेत'",
  "slug": "url-friendly-slug-lowercase-hyphens-in-english",
  "metaDescriptionHi": "155-char Hindi description using simple Hindi — summarizing the key points",
  "heroImagePrompt": "A hyper-realistic, cinematic 8K image prompt for the hero banner. Describe a breathtaking space scene related to the article. Include: lighting, camera angle, atmosphere, textures, scientific accuracy. Style: NASA photography meets sci-fi concept art. NO text/words in image.",

  "sections": [
    {
      "headingHi": "Clear, informative section heading in simple Hindi + English terms in Devanagari",
      "contentHi": "3-5 paragraphs. Simple, accessible Hindi with English scientific terms in Devanagari. Minimum 150 words.",
      "imagePrompt": "Hyper-realistic, cinematic 8K image prompt specific to THIS section. Describe the exact space scene, equipment, or phenomenon. Include: dramatic lighting, photorealistic textures, volumetric atmosphere. Style: NASA/ESA photography quality. NO text in image."
    }
  ],

  "infographicFacts": ["5-7 fascinating scientific facts in simple Hindi — concise, impactful, and educational. Use English terms in Devanagari."],

  "scienceCorner": [
    {
      "term": "Scientific Term (in English)",
      "definitionHi": "Clear, simple Hindi explanation using English words in Devanagari where needed"
    }
  ],

  "conclusion": "An insightful closing paragraph in simple Hindi (50+ words). Summarize the significance of the discovery or topic.",

  "faq": [
    {
      "questionHi": "A relevant question in simple Hindi that a reader might search on Google about this topic",
      "answerHi": "Clear 2-3 sentence answer in simple Hindi"
    }
  ],

  "tags": ["Use ONLY broad, general tags from this list: space news, universe, solar system, planet, mars, moon, sun, earth, stars, galaxy, black hole, nasa, isro, spacex, rocket, satellite, telescope, asteroid, space exploration, astrophysics, cosmos, venus, jupiter, saturn, mercury. Pick 3-5 that match the topic. Do NOT invent specific or niche tags."]
}

═══ CRITICAL RULES ═══

1. Generate 4-6 sections. Each section MUST have 150+ words.
2. Total content MUST be \${minWords}+ words across all sections combined.
3. Each section gets a UNIQUE, detailed hyper-realistic image prompt (50+ words each).
4. Image prompts must be photorealistic — describe as if directing a NASA photographer. Include camera specs, lighting, atmosphere.
5. Generate 3-5 FAQ items — questions people would actually search on Google, in Hindi.
6. USE SIMPLE HINDI. Use English words written in Devanagari for all scientific/technical terms. DO NOT use deep Sanskritized Hindi words.
7. Avoid casual filler words (अरे, दोस्तों, यार) but also avoid overly formal/heavy words (दृष्टिकोण, अद्वितीय, प्रस्तुत, अन्वेषण).
8. Write for the web: short paragraphs, engaging hooks, and a scannable structure.
9. Maintain a professional but accessible tone throughout — like a Hindi science news show.
10. Tags: ONLY use broad, general tags. Maximum 5 tags. NO specific/niche tags.
11. The slug MUST be in English (lowercase, hyphens) for URL-friendliness.
12. Output ONLY valid JSON. No markdown, no code blocks, no extra text.`;
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

  const userPrompt = `Transform this space news article into a ScienceHindi 360 premium deep-dive post (HINDI ONLY).

Title: ${item.title}
Source: ${item.source}
Published: ${item.pubDate || "Unknown"}
URL: ${item.link}

Article Content:
${item.content || item.contentSnippet || item.title}

IMPORTANT:
- Minimum ${minWords} words across all sections combined (Hindi).
- Generate 4-6 rich sections with detailed image prompts.
- Generate 3-5 FAQ items for SEO (in Hindi).
- Slug must be in English for URL.
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

      if (!parsed.titleHindi || !parsed.slug || !parsed.sections?.length) {
        throw new Error("Gemini response missing required fields");
      }

      parsed.slug = parsed.slug
        .toLowerCase()
        .replace(/[^a-z0-9-]/g, "")
        .replace(/-+/g, "-");

      // Count words
      const hiWords = parsed.sections.reduce((sum, s) => sum + s.contentHi.split(/\s+/).length, 0);

      console.log(`   Generated: "${parsed.titleHindi}"`);
      console.log(`   Slug: ${parsed.slug}`);
      console.log(`   Sections: ${parsed.sections.length}`);
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

// ─── Step 6: Create Sanity Document (Hindi-Only) ────────────────────────────────

async function createSanityPost(
  data: GeminiResponse,
  sourceItem: FeedItem,
  imageRefs: { heroImage: SanityImageRef | null; sectionImages: (SanityImageRef | null)[] }
) {
  console.log(`\n  Creating Sanity document...`);

  const doc = {
    _type: SANITY_DOC_TYPE,
    titleHindi: data.titleHindi,
    titleEnglish: "", // No English title
    slug: { _type: "slug", current: data.slug },
    metaDescriptionHi: data.metaDescriptionHi || "",
    metaDescriptionEn: "",
    heroImagePrompt: data.heroImagePrompt || "",
    sections: (data.sections || []).map((s, i) => ({
      _key: `sec-${i}`,
      headingHi: s.headingHi,
      headingEn: "",
      contentHi: s.contentHi,
      contentEn: "",
      imagePrompt: s.imagePrompt,
      ...(imageRefs.sectionImages[i] ? { sectionImage: imageRefs.sectionImages[i] } : {}),
    })),
    // Flat content for backward compat / excerpts
    content: data.sections.map((s) => `## ${s.headingHi}\n\n${s.contentHi}`).join("\n\n"),
    contentEnglish: "",
    infographicFacts: data.infographicFacts || [],
    infographicFactsEnglish: [],
    scienceCorner: (data.scienceCorner || []).map((item, i) => ({
      _key: `sc-${i}`,
      term: item.term,
      definitionHi: item.definitionHi,
      definitionEn: "",
    })),
    conclusion: data.conclusion,
    conclusionEnglish: "",
    faq: (data.faq || []).map((item, i) => ({
      _key: `faq-${i}`,
      questionHi: item.questionHi,
      questionEn: "",
      answerHi: item.answerHi,
      answerEn: "",
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

// ─── Gemini System Prompt for Link-Based Articles ────────────────────────────

function buildLinkSystemPrompt(minWords: number): string {
  return `You are a professional, knowledgeable science educator and journalist for the website ScienceHindi. Your goal is to educate and inform readers about the mysteries of space with clarity and authority.

Your job: You will be given a URL of an article from another website. You MUST:
1. Visit and read the article at the given URL thoroughly.
2. Understand the core topic, facts, and information presented.
3. Write a COMPLETELY NEW, ORIGINAL article in HINDI ONLY — do NOT copy or translate the source article. Rewrite everything in your own words with fresh perspective.
4. ADD NEW KNOWLEDGE: Use Google Search to find the LATEST information, recent developments, and additional facts about this topic that the source article may not have covered. Enrich the article with this new data.
5. The final article must be significantly more informative and detailed than the source. Minimum \${minWords} words.

═══ HINDI TONE & LANGUAGE RULES ═══

IMPORTANT: Write in SIMPLE, EVERYDAY Hindi that a normal Indian person uses daily. DO NOT use deep, heavy, Sanskritized Hindi words. Instead, freely use common English words written in Devanagari script (Hindi transliteration).

LANGUAGE STYLE:
- Use simple, easy-to-read Hindi mixed with common English words written in Hindi script.
- For scientific/technical terms: ALWAYS use the English word written in Hindi (Devanagari). Do NOT translate them into deep Hindi equivalents.
- The tone should be like an educated Indian person explaining science to a friend — professional but accessible.

WORD CHOICES — USE THESE (English in Hindi script), NOT deep Hindi:
- Use "स्पेस" NOT "अंतरिक्ष", Use "प्लैनेट" NOT "ग्रह", Use "स्टार" NOT "तारा" or "नक्षत्र"
- Use "साइंटिस्ट" NOT "वैज्ञानिक", Use "डिस्कवरी" NOT "खोज" or "अन्वेषण"
- Use "ग्रैविटी" NOT "गुरुत्वाकर्षण", Use "ऑर्बिट" NOT "कक्षा"
- Use "टेलीस्कोप" NOT "दूरदर्शी", Use "गैलेक्सी" NOT "आकाशगंगा"
- Use "एस्ट्रोनॉट" NOT "अंतरिक्षयात्री", Use "मिशन" NOT "अभियान"
- Use "रिसर्च" NOT "अनुसंधान", Use "डेटा" NOT "आंकड़े"
- Use "टेक्नोलॉजी" NOT "प्रौद्योगिकी", Use "एनर्जी" NOT "ऊर्जा"
- Use "एटमॉस्फ़ियर" NOT "वायुमंडल", Use "सरफ़ेस" NOT "सतह" (both okay)
- Use "सोलर सिस्टम" NOT "सौरमंडल", Use "ब्लैक होल" as-is
- Use "रेडिएशन" NOT "विकिरण", Use "यूनिवर्स" NOT "ब्रह्मांड"
- Use "लाइट ईयर" NOT "प्रकाश वर्ष", Use "ऑक्सीजन" as-is
- Use "इम्पैक्ट" NOT "प्रभाव", Use "डिस्टेंस" or "दूरी" (both okay)
- Use "रॉकेट", "सैटेलाइट", "NASA", "ISRO", "SpaceX" directly

EXAMPLES:
- BAD (too deep Hindi): "अंतरिक्ष विज्ञान के दृष्टिकोण से, यह तारा कई अद्वितीय विशेषताएँ प्रस्तुत करता है।"
- BAD (too casual): "दोस्तों, सोचो ज़रा, ये तारा बहुत ही अजीब है!"
- GOOD: "स्पेस साइंस के हिसाब से, यह स्टार काफ़ी यूनिक फ़ीचर्स रखता है जो साइंटिस्ट्स को हैरान कर रहे हैं।"
- GOOD: "NASA के रिसर्चर्स ने इस प्लैनेट पर वॉटर के साइन्स डिटेक्ट किए हैं, जो एक बड़ी डिस्कवरी है।"
- GOOD: "यह ब्लैक होल हमारे सोलर सिस्टम से करोड़ों लाइट ईयर दूर है और इसकी ग्रैविटी बेहद पावरफ़ुल है।"

AVOID:
- Deep/heavy Hindi words like: दृष्टिकोण, अद्वितीय, विशेषताएँ, प्रस्तुत, अन्वेषण, गुरुत्वाकर्षण, अंतरिक्षयात्री, प्रौद्योगिकी, विकिरण, सौरमंडल, वायुमंडल, अनुसंधान
- Casual filler words like: "अरे", "दोस्तों", "यार", "मज़ा आता है", "सोचो ज़रा"
- Writing English words in English script mid-sentence (write them in Devanagari instead)

KEEP THESE IN HINDI (don't convert to English):
- Basic Hindi grammar words: है, हैं, का, की, के, में, से, पर, और, लेकिन, क्योंकि, इसलिए
- Common Hindi words everyone knows: बड़ा, छोटा, नया, पुराना, दूर, करीब, तेज़, धीमा, ज़्यादा, कम, पहला, आखिरी
- Simple Hindi verbs: मिला, देखा, बताया, किया, हुआ, दिखाया, भेजा, बनाया

TONE:
- Professional but easy to understand — like a Hindi news anchor on a science show
- Reference India: Mention ISRO's contributions where relevant, use comparative metrics Indians can relate to
- Use "आप" (respectful you) — maintain professional tone, not casual
- Write like a HUMAN writer, not like AI. Use natural flow, varied sentence lengths, and conversational transitions.

═══ OUTPUT FORMAT ═══

Output ONLY valid JSON with this exact structure:

{
  "titleHindi": "Catchy, clear Hindi headline (60-70 chars). Use simple Hindi + English words in Devanagari. Example: 'NASA ने खोजा नया प्लैनेट — वॉटर के मिले संकेत'",
  "slug": "url-friendly-slug-lowercase-hyphens-in-english",
  "metaDescriptionHi": "155-char Hindi description using simple Hindi — summarizing the key points",
  "heroImagePrompt": "A hyper-realistic, cinematic 8K image prompt for the hero banner. Describe a breathtaking space scene related to the article. Include: lighting, camera angle, atmosphere, textures, scientific accuracy. Style: NASA photography meets sci-fi concept art. NO text/words in image.",

  "sections": [
    {
      "headingHi": "Clear, informative section heading in simple Hindi + English terms in Devanagari",
      "contentHi": "3-5 paragraphs. Simple, accessible Hindi with English scientific terms in Devanagari. Minimum 150 words.",
      "imagePrompt": "Hyper-realistic, cinematic 8K image prompt specific to THIS section. Describe the exact space scene, equipment, or phenomenon. Include: dramatic lighting, photorealistic textures, volumetric atmosphere. Style: NASA/ESA photography quality. NO text in image."
    }
  ],

  "infographicFacts": ["5-7 fascinating scientific facts in simple Hindi — concise, impactful, and educational. Use English terms in Devanagari."],

  "scienceCorner": [
    {
      "term": "Scientific Term (in English)",
      "definitionHi": "Clear, simple Hindi explanation using English words in Devanagari where needed"
    }
  ],

  "conclusion": "An insightful closing paragraph in simple Hindi (50+ words). Summarize the significance of the discovery or topic.",

  "faq": [
    {
      "questionHi": "A relevant question in simple Hindi that a reader might search on Google about this topic",
      "answerHi": "Clear 2-3 sentence answer in simple Hindi"
    }
  ],

  "tags": ["Use ONLY broad, general tags from this list: space news, universe, solar system, planet, mars, moon, sun, earth, stars, galaxy, black hole, nasa, isro, spacex, rocket, satellite, telescope, asteroid, space exploration, astrophysics, cosmos, venus, jupiter, saturn, mercury. Pick 3-5 that match the topic. Do NOT invent specific or niche tags."]
}

═══ CRITICAL RULES ═══

1. Generate 4-6 sections. Each section MUST have 150+ words.
2. Total content MUST be \${minWords}+ words across all sections combined.
3. Each section gets a UNIQUE, detailed hyper-realistic image prompt (50+ words each).
4. Image prompts must be photorealistic — describe as if directing a NASA photographer. Include camera specs, lighting, atmosphere.
5. Generate 3-5 FAQ items — questions people would actually search on Google, in Hindi.
6. USE SIMPLE HINDI. Use English words written in Devanagari for all scientific/technical terms. DO NOT use deep Sanskritized Hindi words.
7. Avoid casual filler words (अरे, दोस्तों, यार) but also avoid overly formal/heavy words (दृष्टिकोण, अद्वितीय, प्रस्तुत, अन्वेषण).
8. Write for the web: short paragraphs, engaging hooks, and a scannable structure.
9. Maintain a professional but accessible tone throughout — like a Hindi science news show.
10. Tags: ONLY use broad, general tags. Maximum 5 tags. NO specific/niche tags.
11. The slug MUST be in English (lowercase, hyphens) for URL-friendliness.
12. Output ONLY valid JSON. No markdown, no code blocks, no extra text.
13. DO NOT copy the source article. Write a COMPLETELY ORIGINAL article with fresh perspective and additional knowledge.
14. Write in a natural HUMAN tone — vary sentence lengths, use conversational transitions, avoid robotic patterns.`;
}

// ─── Step: Process Link with Gemini (Google Search Grounding) ─────────────────

async function processLinkWithGemini(url: string, minWords: number): Promise<GeminiResponse> {
  const MAX_RETRIES = 2;
  const systemPrompt = buildLinkSystemPrompt(minWords);

  const userPrompt = `I am giving you a URL of an article. Your job:

1. VISIT this URL and READ the full article: ${url}
2. UNDERSTAND the topic, key facts, data, and context from that article.
3. SEARCH THE WEB using Google Search to find the LATEST updates, new developments, recent research, and additional facts about this topic.
4. Write a COMPLETELY NEW, ORIGINAL deep-dive article in HINDI for ScienceHindi 360. Do NOT copy or translate — rewrite everything from scratch with your own analysis and the extra knowledge you found.

Source URL: ${url}

IMPORTANT:
- DO NOT just paraphrase the source article. Add significant NEW information from your web search.
- Include latest data, recent discoveries, and current developments that the source might not cover.
- Write a much more detailed and informative article than the source.
- Minimum ${minWords} words across all sections combined (Hindi).
- Generate 4-6 rich sections with detailed image prompts.
- Generate 3-5 FAQ items for SEO (in Hindi).
- Slug must be in English for URL.
- Write in natural human tone — not robotic AI tone.
- Output ONLY valid JSON. No markdown code blocks.`;

  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      if (attempt > 0) {
        const delay = attempt * 15;
        console.log(`   Retry ${attempt}/${MAX_RETRIES} in ${delay}s...`);
        await sleep(delay * 1000);
      }

      console.log(`\n  Sending to Vertex AI ${GEMINI_MODEL} (with Google Search grounding)${attempt > 0 ? ` (attempt ${attempt + 1})` : ""}...`);

      const model = vertexAI.getGenerativeModel({
        model: GEMINI_MODEL,
        systemInstruction: {
          role: "system",
          parts: [{ text: systemPrompt }],
        },
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 16384,
        },
        // @ts-ignore - Vertex AI SDK typings are missing the googleSearch property, but the API accepts it at runtime.
        tools: [{ googleSearch: {} }],
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

      if (!parsed.titleHindi || !parsed.slug || !parsed.sections?.length) {
        throw new Error("Gemini response missing required fields");
      }

      parsed.slug = parsed.slug
        .toLowerCase()
        .replace(/[^a-z0-9-]/g, "")
        .replace(/-+/g, "-");

      const hiWords = parsed.sections.reduce((sum, s) => sum + s.contentHi.split(/\s+/).length, 0);

      console.log(`   Generated: "${parsed.titleHindi}"`);
      console.log(`   Slug: ${parsed.slug}`);
      console.log(`   Sections: ${parsed.sections.length}`);
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

// ─── Step: Process Custom Topic with Gemini ─────────────────────────────────────

async function processCustomTopicWithGemini(topic: string, minWords: number): Promise<GeminiResponse> {
  const MAX_RETRIES = 2;
  const systemPrompt = buildSystemPrompt(minWords);

  const userPrompt = `Create a ScienceHindi 360 premium deep-dive post on this topic (HINDI ONLY):

Topic: ${topic}

IMPORTANT:
- Research this topic thoroughly and write a comprehensive, accurate article in Hindi.
- Minimum ${minWords} words across all sections combined.
- Generate 4-6 rich sections with detailed image prompts.
- Generate 3-5 FAQ items for SEO (in Hindi).
- Slug must be in English for URL.
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

      if (!parsed.titleHindi || !parsed.slug || !parsed.sections?.length) {
        throw new Error("Gemini response missing required fields");
      }

      parsed.slug = parsed.slug
        .toLowerCase()
        .replace(/[^a-z0-9-]/g, "")
        .replace(/-+/g, "-");

      const hiWords = parsed.sections.reduce((sum, s) => sum + s.contentHi.split(/\s+/).length, 0);

      console.log(`   Generated: "${parsed.titleHindi}"`);
      console.log(`   Slug: ${parsed.slug}`);
      console.log(`   Sections: ${parsed.sections.length}`);
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
  console.log("║   ScienceHindi 360 — Hindi-Only News Post Pipeline     ║");
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
  console.log("  [2] Write from a website link (analyzes & creates original article)");
  console.log("  [3] Pick from RSS feeds (Space.com, NASA, Phys.org)\n");

  const modeStr = await ask("  Enter your choice (1, 2 or 3): ");
  const mode = parseInt(modeStr, 10);

  if (mode !== 1 && mode !== 2 && mode !== 3) {
    console.log("Invalid choice. Exiting.");
    process.exit(1);
  }

  let selected: FeedItem;
  let geminiData: GeminiResponse;

  // ── Step 2: Article length ──
  console.log("\n── Step 2: Article Length ──\n");
  const wordsStr = await ask("  Minimum words (e.g. 800, 1200, 1500): ");
  const minWords = parseInt(wordsStr, 10) || 800;
  console.log(`  Target: ${minWords}+ words (Hindi)\n`);

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

    console.log("── Step 4: Generating Hindi Article with Vertex AI Gemini ──");
    geminiData = await processCustomTopicWithGemini(topic, minWords);
  } else if (mode === 2) {
    // ── Link-based flow ──
    console.log("── Step 3: Enter Article URL ──\n");
    const url = await ask("  Paste the article link: ");
    if (!url) {
      console.log("No URL entered. Exiting.");
      process.exit(1);
    }
    console.log(`\n  URL: "${url}"\n`);
    console.log("  Gemini will visit this link, analyze it, search for latest info,");
    console.log("  and write a completely original Hindi article.\n");

    // Create a dummy FeedItem for the link-based article
    selected = {
      title: url,
      link: url,
      source: "Website Link",
    };

    console.log("── Step 4: Generating Original Hindi Article from Link ──");
    geminiData = await processLinkWithGemini(url, minWords);
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

    console.log("── Step 4: Generating Hindi Article with Vertex AI Gemini ──");
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
  console.log(`║  Mode: ${mode === 1 ? "Custom Topic" : mode === 2 ? "Website Link" : "RSS Feed"}`);
  console.log(`║  ID: ${doc._id}`);
  console.log(`║  Title (Hindi): ${geminiData.titleHindi}`);
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
