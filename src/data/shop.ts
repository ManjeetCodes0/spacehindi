export type ShopCategory = "telescopes" | "kits" | "books" | "astrophotography";

export interface Product {
  id: string;
  name: { en: string; hi: string };
  description: { en: string; hi: string };
  category: ShopCategory;
  price: string;
  rating: number; // 1-5
  reviews: number;
  badge?: "choice" | "bestseller" | "new";
  affiliateUrl: string;
  image: string; // gradient placeholder
}

export const shopCategories: { id: ShopCategory; label: { en: string; hi: string }; icon: string }[] = [
  {
    id: "telescopes",
    label: { en: "Telescopes", hi: "टेलीस्कोप" },
    icon: "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z",
  },
  {
    id: "kits",
    label: { en: "Space Kits", hi: "स्पेस किट" },
    icon: "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z",
  },
  {
    id: "books",
    label: { en: "Science Books", hi: "विज्ञान पुस्तकें" },
    icon: "M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25",
  },
  {
    id: "astrophotography",
    label: { en: "Astrophotography", hi: "एस्ट्रोफोटोग्राफी" },
    icon: "M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z",
  },
];

export const products: Product[] = [
  // Telescopes
  // Telescopes
  {
    id: "celestron-nexstar-8se",
    name: { en: "Celestron NexStar 8SE Telescope", hi: "सेलेस्ट्रॉन नेक्सस्टार 8SE टेलीस्कोप" },
    description: {
      en: "Computerized GoTo telescope with 8\" aperture. Perfect for deep-sky and planetary viewing.",
      hi: "8\" अपर्चर के साथ कम्प्यूटराइज़्ड GoTo टेलीस्कोप। डीप-स्काई और ग्रह दर्शन के लिए बेहतरीन।",
    },
    category: "telescopes",
    price: "$1,199",
    rating: 4.7,
    reviews: 2840,
    badge: "choice",
    affiliateUrl: "https://www.amazon.in/dp/B001NB8S4I?tag=yourtag-21",
    image: "linear-gradient(135deg, #0a2e1a 0%, #111128 50%, #1a0533 100%)",
  },
  {
    id: "sky-watcher-dobsonian-8",
    name: { en: "Sky-Watcher 8\" Dobsonian", hi: "स्काई-वॉचर 8\" डॉब्सोनियन" },
    description: {
      en: "Classic Dobsonian design with excellent light-gathering. Best value for serious beginners.",
      hi: "उत्कृष्ट प्रकाश-संग्रहण के साथ क्लासिक डॉब्सोनियन डिज़ाइन। गंभीर शुरुआती लोगों के लिए सर्वोत्तम।",
    },
    category: "telescopes",
    price: "$449",
    rating: 4.5,
    reviews: 1560,
    badge: "bestseller",
    affiliateUrl: "https://www.amazon.in/dp/B07KQZHHM5?tag=yourtag-21",
    image: "linear-gradient(135deg, #1a1a3e 0%, #111128 50%, #0a0a1a 100%)",
  },
  {
    id: "celestron-starsense-explorer",
    name: { en: "Celestron StarSense Explorer DX 130", hi: "सेलेस्ट्रॉन स्टारसेंस एक्सप्लोरर DX 130" },
    description: {
      en: "App-enabled Newtonian with smartphone StarSense technology for effortless navigation.",
      hi: "स्मार्टफोन स्टारसेंस तकनीक के साथ ऐप-सक्षम न्यूटोनियन। आसान नेविगेशन।",
    },
    category: "telescopes",
    price: "$399",
    rating: 4.3,
    reviews: 890,
    affiliateUrl: "https://www.amazon.in/dp/B083QNWVHQ?tag=yourtag-21",
    image: "linear-gradient(135deg, #0c1445 0%, #111128 50%, #050510 100%)",
  },
  // Space Kits
  {
    id: "isro-space-model-kit",
    name: { en: "ISRO GSLV Mk III Model Kit", hi: "ISRO GSLV Mk III मॉडल किट" },
    description: {
      en: "1:100 scale model of India's heaviest rocket. Educational and collectible.",
      hi: "भारत के सबसे भारी रॉकेट का 1:100 स्केल मॉडल। शैक्षिक और संग्रहणीय।",
    },
    category: "kits",
    price: "$34",
    rating: 4.6,
    reviews: 420,
    badge: "choice",
    affiliateUrl: "https://www.amazon.in/dp/B0BXYZ1234?tag=yourtag-21",
    image: "linear-gradient(135deg, #064e3b 0%, #111128 50%, #050510 100%)",
  },
  {
    id: "national-geographic-space-kit",
    name: { en: "National Geographic Space Science Kit", hi: "नेशनल जियोग्राफिक स्पेस साइंस किट" },
    description: {
      en: "Launch rockets, build a solar system, and explore constellations. Ages 8+.",
      hi: "रॉकेट लॉन्च करें, सौरमंडल बनाएं, और तारामंडल खोजें। 8+ आयु।",
    },
    category: "kits",
    price: "$29",
    rating: 4.4,
    reviews: 1120,
    badge: "bestseller",
    affiliateUrl: "https://www.amazon.in/dp/B07ND7NKQP?tag=yourtag-21",
    image: "linear-gradient(135deg, #1a0533 0%, #0c1445 50%, #050510 100%)",
  },
  // Books
  {
    id: "cosmos-carl-sagan",
    name: { en: "Cosmos — Carl Sagan", hi: "कॉस्मोस — कार्ल सेगन" },
    description: {
      en: "The timeless classic that ignited a generation's passion for space and science.",
      hi: "वह कालातीत क्लासिक जिसने एक पीढ़ी का अंतरिक्ष और विज्ञान के प्रति जुनून जगाया।",
    },
    category: "books",
    price: "$14",
    rating: 4.9,
    reviews: 12500,
    badge: "choice",
    affiliateUrl: "https://www.amazon.in/dp/0345539435?tag=yourtag-21",
    image: "linear-gradient(135deg, #2d0a3e 0%, #0c1445 50%, #050510 100%)",
  },
  {
    id: "brief-answers-hawking",
    name: { en: "Brief Answers to Big Questions — Hawking", hi: "बड़े सवालों के संक्षिप्त जवाब — हॉकिंग" },
    description: {
      en: "Stephen Hawking's final book addresses the universe's most fundamental questions.",
      hi: "स्टीफन हॉकिंग की अंतिम पुस्तक ब्रह्मांड के सबसे मौलिक प्रश्नों को संबोधित करती है।",
    },
    category: "books",
    price: "$11",
    rating: 4.8,
    reviews: 8900,
    affiliateUrl: "https://www.amazon.in/dp/1984819194?tag=yourtag-21",
    image: "linear-gradient(135deg, #0a1a2e 0%, #1a0533 50%, #050510 100%)",
  },
  // Astrophotography
  {
    id: "zwo-asi533mc-pro",
    name: { en: "ZWO ASI533MC Pro Camera", hi: "ZWO ASI533MC प्रो कैमरा" },
    description: {
      en: "Cooled color astro camera with zero amp glow. Perfect for deep-sky imaging.",
      hi: "कूल्ड कलर एस्ट्रो कैमरा। डीप-स्काई इमेजिंग के लिए बेहतरीन।",
    },
    category: "astrophotography",
    price: "$799",
    rating: 4.6,
    reviews: 340,
    badge: "new",
    affiliateUrl: "https://www.amazon.in/dp/B08PCZMPX5?tag=yourtag-21",
    image: "linear-gradient(135deg, #0a0a1a 0%, #1a1a3e 50%, #0c1445 100%)",
  },
  {
    id: "star-tracker-mount",
    name: { en: "iOptron SkyGuider Pro", hi: "iOptron स्काईगाइडर प्रो" },
    description: {
      en: "Portable star tracker mount for DSLR astrophotography. Ultra-precise polar alignment.",
      hi: "DSLR एस्ट्रोफोटोग्राफी के लिए पोर्टेबल स्टार ट्रैकर माउंट।",
    },
    category: "astrophotography",
    price: "$458",
    rating: 4.5,
    reviews: 720,
    affiliateUrl: "https://www.amazon.in/dp/B01I2OEORO?tag=yourtag-21",
    image: "linear-gradient(135deg, #111128 0%, #1a0533 50%, #050510 100%)",
  },
];
