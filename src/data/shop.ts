export type ShopCategory = "Astronaut Statue" | "Keychains" | "Books";

export interface Product {
  id: string;
  title: string;
  hindiTitle: string;
  description: string;
  hindiDescription: string;
  imageURL: string;
  affiliateLink: string;
  category: ShopCategory;
}

export const shopCategories: { id: ShopCategory; label: { en: string; hi: string } }[] = [
  {
    id: "Astronaut Statue",
    label: { en: "Astronaut Statues", hi: "एस्ट्रोनॉट स्टैच्यू" },
  },
  {
    id: "Keychains",
    label: { en: "Keychains", hi: "कीचेन" },
  },
  {
    id: "Books",
    label: { en: "Books", hi: "पुस्तकें" },
  },
];

export const sectionHeadings: Record<ShopCategory, { en: string; hi: string; subtitle: { en: string; hi: string } }> = {
  "Astronaut Statue": {
    en: "Astronaut Statues",
    hi: "एस्ट्रोनॉट स्टैच्यू",
    subtitle: {
      en: "Bring the cosmos to your desk — handpicked space figurines for science lovers.",
      hi: "ब्रह्मांड को अपनी डेस्क पर लाएं — विज्ञान प्रेमियों के लिए चुनिंदा स्पेस फिगरिन।",
    },
  },
  Keychains: {
    en: "Space Keychains",
    hi: "स्पेस कीचेन",
    subtitle: {
      en: "Carry your passion for space everywhere you go.",
      hi: "अपने अंतरिक्ष के जुनून को हर जगह साथ ले जाएं।",
    },
  },
  Books: {
    en: "Must-Read Space Books",
    hi: "ज़रूर पढ़ें स्पेस बुक्स",
    subtitle: {
      en: "Essential reads that will transform how you see the universe.",
      hi: "ज़रूरी किताबें जो ब्रह्मांड को देखने का आपका नज़रिया बदल देंगी।",
    },
  },
};

export const products: Product[] = [
  // ── ASTRONAUT STATUES ──
  {
    id: "resin-astronaut-golden",
    title: "Resin Astronaut Set (3 Pcs) - Golden",
    hindiTitle: "रेज़िन एस्ट्रोनॉट सेट (3 पीस) - गोल्डन",
    description: "Adds a premium cosmic aesthetic to your workspace; perfect for science enthusiasts.",
    hindiDescription: "आपके वर्कस्पेस को प्रीमियम कॉस्मिक लुक देता है; विज्ञान प्रेमियों के लिए बेस्ट।",
    affiliateLink: "https://amzn.to/47XuUli",
    imageURL: "https://m.media-amazon.com/images/I/51k0ihjuRyL.SL1010.jpg",
    category: "Astronaut Statue",
  },
  {
    id: "pvc-blue-astronaut-trio",
    title: "PVC Blue Astronaut Trio",
    hindiTitle: "PVC ब्लू एस्ट्रोनॉट ट्रायो",
    description: "Durable PVC material with vibrant detailing; great for a modern tech-desk setup.",
    hindiDescription: "वाइब्रेंट डिटेल्स के साथ टिकाऊ PVC मटेरियल; मॉडर्न टेक-डेस्क सेटअप के लिए बेहतरीन।",
    affiliateLink: "https://amzn.to/4d2Y463",
    imageURL: "https://m.media-amazon.com/images/I/61zkacH9bRL.SL1500.jpg",
    category: "Astronaut Statue",
  },
  {
    id: "reading-on-moon-figurine",
    title: "Reading on Moon Figurine",
    hindiTitle: "चाँद पर पाठक मूर्ति",
    description: "A symbolic \"Reader on the Moon\" statue that inspires curiosity and peaceful study sessions.",
    hindiDescription: "\"चाँद पर पाठक\" की एक प्रतीकात्मक मूर्ति जो जिज्ञासा और शांत अध्ययन के लिए प्रेरित करती है।",
    affiliateLink: "https://amzn.to/4lGD6fH",
    imageURL: "https://m.media-amazon.com/images/I/81639zuD5tL.SL1500.jpg",
    category: "Astronaut Statue",
  },
  {
    id: "astronaut-phone-stand-blue",
    title: "Astronaut Phone Stand (Blue)",
    hindiTitle: "एस्ट्रोनॉट फोन स्टैंड (ब्लू)",
    description: "Functional space-art that holds your phone while serving as a creative desktop ornament.",
    hindiDescription: "फंक्शनल स्पेस-आर्ट जो आपके फोन को संभालता है और डेस्कटॉप को क्रिएटिव लुक देता है।",
    affiliateLink: "https://amzn.to/4lOveJ8",
    imageURL: "https://m.media-amazon.com/images/I/51O+l3CNNeL.jpg",
    category: "Astronaut Statue",
  },
  {
    id: "vrb-dectm-golden-set",
    title: "VRB DecTM 3Pcs Big Golden Set",
    hindiTitle: "VRB DecTM 3 पीस बड़ा गोल्डन सेट",
    description: "Larger-than-life golden spacemen perfect for home decor or car dashboards.",
    hindiDescription: "होम डेकोर या कार डैशबोर्ड के लिए बड़े आकार के शानदार सुनहरे एस्ट्रोनॉट।",
    affiliateLink: "https://amzn.to/3NTDnzc",
    imageURL: "https://m.media-amazon.com/images/I/71XOUxZJEoL.SL1080.jpg",
    category: "Astronaut Statue",
  },
  {
    id: "accuprints-pvc-golden",
    title: "AccuPrints PVC Statue (Golden)",
    hindiTitle: "AccuPrints PVC स्टैच्यू (गोल्डन)",
    description: "Compact 4.2\" high-quality figurine that fits perfectly in small shelf spaces.",
    hindiDescription: "कॉम्पैक्ट 4.2\" हाई-क्वालिटी मूर्ति जो छोटे शेल्फ स्पेस में पूरी तरह फिट बैठती है।",
    affiliateLink: "https://amzn.to/4dB70Qj",
    imageURL: "https://m.media-amazon.com/images/I/41rM6+jY1kL.jpg",
    category: "Astronaut Statue",
  },

  // ── KEYCHAINS ──
  {
    id: "double-pendant-space-keyring",
    title: "Double Pendant Space Keyring",
    hindiTitle: "डबल पेंडेंट स्पेस कीरिंग",
    description: "Stylish metal hook design with detailed astronaut charms for car and bike keys.",
    hindiDescription: "कार और बाइक की चाबियों के लिए विस्तृत एस्ट्रोनॉट चार्म के साथ स्टाइलिश मेटल हुक डिजाइन।",
    affiliateLink: "https://amzn.to/41jkJE1",
    imageURL: "https://m.media-amazon.com/images/I/61VZzE4cN5L.SX679.jpg",
    category: "Keychains",
  },
  {
    id: "wolpin-spaceman-keyring",
    title: "Wolpin Spaceman Keyring",
    hindiTitle: "Wolpin स्पेसमैन कीरिंग",
    description: "A sleek, lightweight accessory for space lovers to carry their passion everywhere.",
    hindiDescription: "अंतरिक्ष प्रेमियों के लिए अपने जुनून को हर जगह ले जाने के लिए एक स्लीक और हल्का एक्सेसरी।",
    affiliateLink: "https://amzn.to/4smpCYP",
    imageURL: "https://m.media-amazon.com/images/I/71yztCHmoJL.SX679.jpg",
    category: "Keychains",
  },
  {
    id: "3d-silicone-cartoon-keychain",
    title: "3D Silicone Cartoon Keychain",
    hindiTitle: "3D सिलिकॉन कार्टून कीचेन",
    description: "Soft-touch 3D silicone material that is durable and cute for bags or purses.",
    hindiDescription: "सॉफ्ट-टच 3D सिलिकॉन मटेरियल जो बैग या पर्स के लिए टिकाऊ और प्यारा है।",
    affiliateLink: "https://amzn.to/3PmV1vH",
    imageURL: "https://m.media-amazon.com/images/I/81L3RRCwWnL.SX679.jpg",
    category: "Keychains",
  },

  // ── BOOKS ──
  {
    id: "space-encyclopedia-8-book",
    title: "Space Encyclopedia (8-Book Collection)",
    hindiTitle: "स्पेस एनसाइक्लोपीडिया (8-पुस्तक संग्रह)",
    description: "The ultimate guide for young astronomy explorers to master the solar system.",
    hindiDescription: "सौर मंडल में महारत हासिल करने के लिए युवा खगोल विज्ञान खोजकर्ताओं के लिए अंतिम मार्गदर्शिका।",
    affiliateLink: "https://amzn.to/4uJmBDA",
    imageURL: "https://m.media-amazon.com/images/I/81PZEckZAUL.SY342.jpg",
    category: "Books",
  },
  {
    id: "theory-of-everything-hawking",
    title: "The Theory of Everything — Stephen Hawking",
    hindiTitle: "द थ्योरी ऑफ एवरीथिंग — स्टीफन हॉकिंग",
    description: "A must-read journey into the cosmos, black holes, and the origin of our universe.",
    hindiDescription: "ब्रह्मांड, ब्लैक होल और हमारे ब्रह्मांड की उत्पत्ति की एक अनिवार्य यात्रा।",
    affiliateLink: "https://amzn.to/4sjfRL0",
    imageURL: "https://m.media-amazon.com/images/I/61fR6OnVBUL.SL1276.jpg",
    category: "Books",
  },
];
