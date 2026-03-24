import { Inter, Montserrat, Noto_Sans_Devanagari, Playfair_Display, Space_Grotesk } from "next/font/google";

export const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const notoDevanagari = Noto_Sans_Devanagari({
  variable: "--font-noto-sans-devanagari",
  subsets: ["devanagari"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
  weight: ["200", "400", "600"],
});

export const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk-real",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});
