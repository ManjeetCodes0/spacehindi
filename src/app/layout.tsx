import type { Metadata } from "next";
import { inter, montserrat, notoDevanagari, playfairDisplay, spaceGrotesk } from "@/lib/fonts";
import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "ScienceHindi 360 — अंतरिक्ष विज्ञान | Explore the Cosmos",
  description:
    "Premium interactive science education platform — space tools, quizzes, live event tracking, and deep science stories in Hindi & English.",
  keywords: [
    "space science",
    "hindi science",
    "अंतरिक्ष विज्ञान",
    "space tools",
    "ISRO",
    "NASA",
    "science education",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${montserrat.variable} ${notoDevanagari.variable} ${playfairDisplay.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <ThemeProvider>
          <AuthProvider>
            <LanguageProvider>{children}</LanguageProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
