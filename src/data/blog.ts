export type BlogCategory = "space" | "physics" | "technology" | "isro" | "nasa";

export interface BlogPost {
  slug: string;
  title: { en: string; hi: string };
  excerpt: { en: string; hi: string };
  category: BlogCategory;
  categoryLabel: { en: string; hi: string };
  readingTime: number; // minutes
  date: string;
  image: string; // placeholder path or gradient
  featured?: boolean;
  author: { name: string; avatar?: string };
}

export interface SpaceStory {
  id: string;
  title: { en: string; hi: string };
  image: string; // gradient placeholder
  type: "fact" | "affiliate";
  cta?: { en: string; hi: string };
  affiliateLink?: string;
}

export const categoryColors: Record<BlogCategory, { badge: "violet" | "blue" | "pink" | "cyan" | "green"; glow: string }> = {
  space: { badge: "violet", glow: "rgba(139, 92, 246, 0.3)" },
  physics: { badge: "blue", glow: "rgba(59, 130, 246, 0.3)" },
  technology: { badge: "cyan", glow: "rgba(6, 182, 212, 0.3)" },
  isro: { badge: "green", glow: "rgba(16, 185, 129, 0.3)" },
  nasa: { badge: "pink", glow: "rgba(236, 72, 153, 0.3)" },
};

export const blogPosts: BlogPost[] = [
  {
    slug: "james-webb-deep-field-2026",
    title: {
      en: "James Webb's Newest Deep Field Image Reveals Ancient Galaxies",
      hi: "जेम्स वेब की नवीनतम डीप फील्ड छवि से प्राचीन आकाशगंगाओं का खुलासा",
    },
    excerpt: {
      en: "NASA's flagship telescope captures light from galaxies formed just 300 million years after the Big Bang, rewriting our understanding of early cosmic evolution.",
      hi: "NASA के प्रमुख टेलीस्कोप ने बिग बैंग के केवल 300 मिलियन वर्ष बाद बनी आकाशगंगाओं से प्रकाश कैप्चर किया, जो प्रारंभिक ब्रह्मांडीय विकास की हमारी समझ को बदल रहा है।",
    },
    category: "space",
    categoryLabel: { en: "Deep Space", hi: "गहन अंतरिक्ष" },
    readingTime: 8,
    date: "2026-03-12",
    image: "linear-gradient(135deg, #1a0533 0%, #0c1445 50%, #050510 100%)",
    featured: true,
    author: { name: "Dr. Priya Sharma" },
  },
  {
    slug: "isro-gaganyaan-update",
    title: {
      en: "ISRO's Gaganyaan: India's First Crewed Mission Nears Launch",
      hi: "ISRO का गगनयान: भारत का पहला मानव मिशन लॉन्च के करीब",
    },
    excerpt: {
      en: "India's ambitious crewed spaceflight program reaches a critical milestone with the final test flight scheduled for next quarter.",
      hi: "भारत का महत्वाकांक्षी मानव अंतरिक्ष उड़ान कार्यक्रम अगली तिमाही के लिए निर्धारित अंतिम परीक्षण उड़ान के साथ एक महत्वपूर्ण मील का पत्थर पर पहुँचता है।",
    },
    category: "isro",
    categoryLabel: { en: "ISRO", hi: "इसरो" },
    readingTime: 6,
    date: "2026-03-10",
    image: "linear-gradient(135deg, #0a2e1a 0%, #0c1445 50%, #050510 100%)",
    author: { name: "Arjun Patel" },
  },
  {
    slug: "quantum-gravity-breakthrough",
    title: {
      en: "Quantum Gravity: Scientists Detect Gravitational Effects at Subatomic Scale",
      hi: "क्वांटम गुरुत्वाकर्षण: वैज्ञानिकों ने परमाणु स्तर पर गुरुत्वाकर्षण प्रभाव का पता लगाया",
    },
    excerpt: {
      en: "A landmark experiment bridges quantum mechanics and general relativity, potentially opening the door to a unified theory of physics.",
      hi: "एक ऐतिहासिक प्रयोग क्वांटम यांत्रिकी और सामान्य सापेक्षता को जोड़ता है, जो भौतिकी के एकीकृत सिद्धांत का मार्ग प्रशस्त कर सकता है।",
    },
    category: "physics",
    categoryLabel: { en: "Physics", hi: "भौतिकी" },
    readingTime: 10,
    date: "2026-03-08",
    image: "linear-gradient(135deg, #0c1445 0%, #1a0533 50%, #050510 100%)",
    author: { name: "Dr. Ananya Desai" },
  },
  {
    slug: "nasa-artemis-iii-moon-landing",
    title: {
      en: "Artemis III: NASA Prepares for the First Woman on the Moon",
      hi: "आर्टेमिस III: NASA चंद्रमा पर पहली महिला के लिए तैयार",
    },
    excerpt: {
      en: "After multiple delays, NASA's Artemis III mission is now on track for a historic crewed lunar landing using SpaceX's Starship HLS.",
      hi: "कई देरी के बाद, NASA का आर्टेमिस III मिशन अब SpaceX के स्टारशिप HLS का उपयोग करके ऐतिहासिक चंद्र लैंडिंग के लिए तैयार है।",
    },
    category: "nasa",
    categoryLabel: { en: "NASA", hi: "नासा" },
    readingTime: 7,
    date: "2026-03-06",
    image: "linear-gradient(135deg, #2d0a3e 0%, #0c1445 50%, #050510 100%)",
    author: { name: "Rahul Verma" },
  },
  {
    slug: "spacex-starship-mars-fuel-depot",
    title: {
      en: "SpaceX Starship: Orbital Fuel Depot Test Brings Mars Closer",
      hi: "SpaceX स्टारशिप: कक्षीय ईंधन डिपो परीक्षण मंगल को करीब लाता है",
    },
    excerpt: {
      en: "SpaceX successfully demonstrates orbital refueling between two Starship vehicles, a key technology for deep space missions.",
      hi: "SpaceX ने दो स्टारशिप वाहनों के बीच कक्षीय रिफ्यूलिंग का सफल प्रदर्शन किया, जो गहन अंतरिक्ष मिशनों के लिए एक प्रमुख तकनीक है।",
    },
    category: "technology",
    categoryLabel: { en: "Technology", hi: "प्रौद्योगिकी" },
    readingTime: 5,
    date: "2026-03-04",
    image: "linear-gradient(135deg, #0a1a2e 0%, #1a0533 50%, #050510 100%)",
    author: { name: "Meera Krishnan" },
  },
  {
    slug: "dark-matter-map-euclid",
    title: {
      en: "ESA's Euclid Telescope Creates the Largest Dark Matter Map Ever",
      hi: "ESA के यूक्लिड टेलीस्कोप ने अब तक का सबसे बड़ा डार्क मैटर मैप बनाया",
    },
    excerpt: {
      en: "The Euclid space telescope reveals the hidden cosmic web of dark matter across a billion light-years of space.",
      hi: "यूक्लिड स्पेस टेलीस्कोप एक अरब प्रकाश-वर्ष के अंतरिक्ष में डार्क मैटर के छिपे ब्रह्मांडीय जाल को प्रकट करता है।",
    },
    category: "space",
    categoryLabel: { en: "Deep Space", hi: "गहन अंतरिक्ष" },
    readingTime: 9,
    date: "2026-03-01",
    image: "linear-gradient(135deg, #050520 0%, #1a0533 50%, #0c1445 100%)",
    author: { name: "Dr. Priya Sharma" },
  },
];

export const spaceStories: SpaceStory[] = [
  {
    id: "story-1",
    title: { en: "The Sun is 4.6 billion years old", hi: "सूर्य 4.6 अरब वर्ष पुराना है" },
    image: "linear-gradient(180deg, #f59e0b 0%, #92400e 60%, #050510 100%)",
    type: "fact",
  },
  {
    id: "story-2",
    title: { en: "Saturn could float in water", hi: "शनि पानी में तैर सकता है" },
    image: "linear-gradient(180deg, #a78bfa 0%, #4c1d95 60%, #050510 100%)",
    type: "fact",
  },
  {
    id: "story-3",
    title: { en: "Best Telescope for Beginners", hi: "शुरुआती लोगों के लिए बेस्ट टेलीस्कोप" },
    image: "linear-gradient(180deg, #ec4899 0%, #831843 60%, #050510 100%)",
    type: "affiliate",
    cta: { en: "Shop Now", hi: "अभी खरीदें" },
    affiliateLink: "/shop",
  },
  {
    id: "story-4",
    title: { en: "A day on Venus is longer than its year", hi: "शुक्र पर एक दिन उसके वर्ष से लंबा है" },
    image: "linear-gradient(180deg, #e8a84c 0%, #78350f 60%, #050510 100%)",
    type: "fact",
  },
  {
    id: "story-5",
    title: { en: "Neutron stars spin 600 times/sec", hi: "न्यूट्रॉन तारे 600 बार/सेकंड घूमते हैं" },
    image: "linear-gradient(180deg, #3b82f6 0%, #1e3a5f 60%, #050510 100%)",
    type: "fact",
  },
  {
    id: "story-6",
    title: { en: "ISRO Space Kit for Students", hi: "छात्रों के लिए ISRO स्पेस किट" },
    image: "linear-gradient(180deg, #10b981 0%, #064e3b 60%, #050510 100%)",
    type: "affiliate",
    cta: { en: "Learn More", hi: "और जानें" },
    affiliateLink: "/shop",
  },
  {
    id: "story-7",
    title: { en: "Olympus Mons is 3x the height of Everest", hi: "ओलंपस मॉन्स एवरेस्ट से 3 गुना ऊंचा है" },
    image: "linear-gradient(180deg, #ef4444 0%, #7f1d1d 60%, #050510 100%)",
    type: "fact",
  },
  {
    id: "story-8",
    title: { en: "Space smells like burnt steak", hi: "अंतरिक्ष जले हुए स्टेक जैसा महकता है" },
    image: "linear-gradient(180deg, #8b5cf6 0%, #3b0764 60%, #050510 100%)",
    type: "fact",
  },
  {
    id: "story-9",
    title: { en: "Night Vision Astronomy Goggles", hi: "नाइट विज़न एस्ट्रोनॉमी गॉगल्स" },
    image: "linear-gradient(180deg, #06b6d4 0%, #164e63 60%, #050510 100%)",
    type: "affiliate",
    cta: { en: "Swipe Up to Buy", hi: "खरीदने के लिए स्वाइप करें" },
    affiliateLink: "/shop",
  },
];

// Sample article content for the blog post template
export const sampleArticleContent = {
  en: `
## The Discovery That Changed Everything

When the James Webb Space Telescope turned its 6.5-meter golden mirror toward a seemingly empty patch of sky, astronomers weren't expecting what came next.

The resulting image — JWST Deep Field 2026 — reveals over **45,000 galaxies** in an area of sky no larger than a grain of sand held at arm's length. Among them, researchers have identified several galaxies that formed just 300 million years after the Big Bang.

### Why This Matters

These ancient galaxies are far more massive and structured than current cosmological models predicted. This challenges our understanding of how the first stars and galaxies assembled in the young universe.

> "We expected faint, chaotic blobs. Instead, we found spiral structures and organized star formation. The early universe was far more advanced than we thought." — Dr. Maria Chen, STScI

### The Technology Behind the Image

The Near Infrared Camera (NIRCam) captured light that has been traveling for over **13.4 billion years**. Due to the expansion of the universe, this light has been stretched from visible wavelengths into the infrared spectrum — invisible to telescopes like Hubble, but perfectly suited for Webb.

### Key Numbers

The exposure time for this image was 72 hours — three times longer than the original Hubble Deep Field. The result is the deepest and sharpest infrared image of the distant universe ever captured.

### What Comes Next

The research team has been granted 200 additional hours of observation time to follow up on the most distant galaxy candidates. Spectroscopic analysis will confirm their distances and reveal the chemical composition of their stars.

This data will be crucial in refining models of galaxy formation and potentially reshaping our understanding of dark matter's role in the early universe.
  `,
  hi: `
## वह खोज जिसने सब कुछ बदल दिया

जब जेम्स वेब स्पेस टेलीस्कोप ने अपने 6.5 मीटर के सुनहरे दर्पण को आकाश के एक खाली दिखने वाले हिस्से की ओर मोड़ा, तो खगोलविदों को उम्मीद नहीं थी कि आगे क्या होगा।

परिणामी छवि — JWST डीप फील्ड 2026 — आकाश के एक ऐसे क्षेत्र में **45,000 से अधिक आकाशगंगाओं** को प्रकट करती है जो हाथ की लंबाई पर रखे रेत के दाने से बड़ा नहीं है। उनमें से, शोधकर्ताओं ने कई ऐसी आकाशगंगाओं की पहचान की है जो बिग बैंग के केवल 300 मिलियन वर्ष बाद बनी थीं।

### यह क्यों मायने रखता है

ये प्राचीन आकाशगंगाएं वर्तमान ब्रह्मांडीय मॉडलों की भविष्यवाणी से कहीं अधिक विशाल और संरचित हैं। यह युवा ब्रह्मांड में पहले तारों और आकाशगंगाओं के निर्माण की हमारी समझ को चुनौती देता है।

> "हमें धुंधले, अव्यवस्थित धब्बों की उम्मीद थी। इसके बजाय, हमने सर्पिल संरचनाएं और संगठित तारा निर्माण पाया। प्रारंभिक ब्रह्मांड हमारी सोच से कहीं अधिक उन्नत था।" — डॉ. मारिया चेन, STScI

### छवि के पीछे की तकनीक

नियर इन्फ्रारेड कैमरा (NIRCam) ने **13.4 अरब वर्षों** से यात्रा कर रहे प्रकाश को कैप्चर किया। ब्रह्मांड के विस्तार के कारण, यह प्रकाश दृश्य तरंगदैर्ध्य से इन्फ्रारेड स्पेक्ट्रम में खिंच गया है।

### प्रमुख संख्याएं

इस छवि के लिए एक्सपोज़र समय 72 घंटे था — मूल हबल डीप फील्ड से तीन गुना अधिक। परिणाम दूर के ब्रह्मांड की अब तक की सबसे गहरी और तेज इन्फ्रारेड छवि है।

### आगे क्या होगा

शोध टीम को सबसे दूर की आकाशगंगा उम्मीदवारों पर फॉलो-अप के लिए 200 अतिरिक्त घंटे का अवलोकन समय प्रदान किया गया है। स्पेक्ट्रोस्कोपिक विश्लेषण उनकी दूरियों की पुष्टि करेगा और उनके तारों की रासायनिक संरचना प्रकट करेगा।
  `,
};
