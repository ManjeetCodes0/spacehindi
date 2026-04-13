import type { Metadata } from "next";
import { inter, montserrat, notoDevanagari, playfairDisplay, spaceGrotesk } from "@/lib/fonts";
import { LanguageProvider } from "@/context/LanguageContext";
import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "ScienceHindi 360 — अंतरिक्ष विज्ञान हिंदी में | Space Science in Hindi",
    template: "%s | ScienceHindi 360",
  },
  description:
    "ScienceHindi 360 — हिंदी में अंतरिक्ष विज्ञान। Interactive space tools, planet explorer, ISRO & NASA missions, और गहन विज्ञान कहानियाँ।",
  keywords: [
    "space science in hindi",
    "अंतरिक्ष विज्ञान",
    "hindi science education",
    "ISRO",
    "NASA",
    "solar system",
    "सौरमंडल",
    "space tools",
    "planet explorer",
    "astronomy",
    "खगोल विज्ञान",
    "sciencehindi 360",
  ],
  metadataBase: new URL("https://sciencehindi.in"),
  openGraph: {
    type: "website",
    locale: "hi_IN",
    siteName: "ScienceHindi 360",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hi">
      <body
        className={`${inter.variable} ${montserrat.variable} ${notoDevanagari.variable} ${playfairDisplay.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <AuthProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
