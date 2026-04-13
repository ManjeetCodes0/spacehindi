import type { Metadata } from "next";
import HomeClient from "./HomeClient";

const SITE_URL = "https://sciencehindi.in";

export const metadata: Metadata = {
  title: "ScienceHindi 360 — अंतरिक्ष विज्ञान हिंदी में | Space Science & Astronomy in Hindi",
  description:
    "ScienceHindi 360 — हिंदी में अंतरिक्ष विज्ञान सीखें। Interactive space tools, planet explorer, orbit simulator, space age calculator, ISRO & NASA missions, और गहन विज्ञान कहानियाँ।",
  keywords: [
    "space science in hindi",
    "अंतरिक्ष विज्ञान",
    "hindi science education",
    "ISRO",
    "NASA",
    "solar system in hindi",
    "सौरमंडल",
    "space tools",
    "planet explorer",
    "astronomy hindi",
    "खगोल विज्ञान",
    "science hindi 360",
    "sciencehindi",
  ],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: "hi_IN",
    url: SITE_URL,
    siteName: "ScienceHindi 360",
    title: "ScienceHindi 360 — अंतरिक्ष विज्ञान | Space Science & Astronomy in Hindi",
    description:
      "हिंदी में अंतरिक्ष विज्ञान सीखें — Interactive space tools, planet explorer, ISRO & NASA missions, orbit simulator और गहन विज्ञान कहानियाँ।",
    images: [
      {
        url: `${SITE_URL}/core/og-cover.webp`,
        width: 1200,
        height: 630,
        alt: "ScienceHindi 360 — Space Science & Astronomy Education in Hindi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ScienceHindi 360 — अंतरिक्ष विज्ञान | Space Science in Hindi",
    description:
      "हिंदी में अंतरिक्ष विज्ञान — Interactive tools, planet explorer, ISRO & NASA missions और गहन विज्ञान कहानियाँ।",
    images: [`${SITE_URL}/core/og-cover.webp`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// JSON-LD structured data for Organization + EducationalOrganization
const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "EducationalOrganization"],
  name: "ScienceHindi 360",
  url: SITE_URL,
  logo: `${SITE_URL}/core/og-cover.webp`,
  description:
    "India's premier Hindi-language space science education platform — interactive tools, planet explorer, astronomy articles, and ISRO/NASA mission coverage.",
  sameAs: [
    "https://www.youtube.com/@ScienceHindi360",
  ],
  foundingDate: "2024",
  knowsAbout: [
    "Space Science",
    "Astronomy",
    "ISRO Missions",
    "NASA Missions",
    "Solar System",
    "Astrophysics",
  ],
  inLanguage: ["hi", "en"],
};

// WebSite schema for sitelinks search box
const webSiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "ScienceHindi 360",
  url: SITE_URL,
  description: "हिंदी में अंतरिक्ष विज्ञान — Space Science Education in Hindi",
  inLanguage: ["hi", "en"],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }}
      />
      <HomeClient />
    </>
  );
}
