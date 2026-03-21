"use client";

import Link from "next/link";
import { useLang } from "@/context/LanguageContext";

const footerLinks = {
  explore: [
    { href: "/tools", label: { en: "Space Tools", hi: "स्पेस टूल्स" } },
    { href: "/quiz", label: { en: "Quizzes", hi: "क्विज़" } },
    { href: "/events", label: { en: "Live Events", hi: "लाइव इवेंट्स" } },
  ],
  learn: [
    { href: "/blog", label: { en: "Blog", hi: "ब्लॉग" } },
    { href: "/shop", label: { en: "Shop", hi: "शॉप" } },
    { href: "/about", label: { en: "About Us", hi: "हमारे बारे में" } },
    { href: "/contact", label: { en: "Contact Us", hi: "हमसे संपर्क करें" } },
  ],
  legal: [
    { href: "/privacy", label: { en: "Privacy Policy", hi: "गोपनीयता नीति" } },
    { href: "/terms", label: { en: "Terms of Service", hi: "सेवा की शर्तें" } },
    { href: "/affiliate-disclosure", label: { en: "Affiliate Disclosure", hi: "एफिलिएट प्रकटीकरण" } },
  ],
};

const socialLinks = [
  {
    name: "YouTube",
    href: "https://www.youtube.com/@ScienceHindi-360",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/Sciencehindi360/",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/sciencehindi_360/",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const { lang } = useLang();
  return (
    <footer className="relative border-t border-white/[0.06] bg-space-deep">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <span
              className="text-lg font-bold text-text-primary"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              ScienceHindi<span className="text-gradient-violet"> 360</span>
            </span>
            <p className="mt-3 text-sm text-text-muted leading-relaxed max-w-xs">
              {lang === "en"
                ? "Making the universe accessible through interactive tools, deep science storytelling, and a passionate community."
                : "इंटरैक्टिव टूल्स, गहन विज्ञान कहानियों और एक जुनूनी समुदाय के माध्यम से ब्रह्मांड को सुलभ बनाना।"}
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-2 mt-5">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  className="
                    w-8 h-8 rounded-lg flex items-center justify-center
                    bg-space-elevated border border-space-border
                    text-text-muted hover:text-text-primary
                    hover:border-neon-violet/30 hover:shadow-[0_0_12px_rgba(139,92,246,0.12)]
                    transition-all duration-200
                  "
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-4">
              {lang === "en" ? "Explore" : "खोजें"}
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.explore.map((link) => (
                <li key={link.href + link.label.en}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-muted hover:text-text-secondary transition-colors"
                  >
                    {link.label[lang]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Learn */}
          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-4">
              {lang === "en" ? "Learn" : "सीखें"}
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.learn.map((link) => (
                <li key={link.href + link.label.en}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-muted hover:text-text-secondary transition-colors"
                  >
                    {link.label[lang]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-4">
              {lang === "en" ? "Legal" : "कानूनी"}
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.legal.map((link) => (
                <li key={link.href + link.label.en}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-muted hover:text-text-secondary transition-colors"
                  >
                    {link.label[lang]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Amazon Affiliate Disclaimer */}
        <div className="mt-10 pt-6 border-t border-white/[0.06]">
          <p className="text-[11px] text-text-muted text-center max-w-2xl mx-auto leading-relaxed">
            {lang === "en"
              ? "As an Amazon Associate, I earn from qualifying purchases. Product prices and availability are subject to change."
              : "एक Amazon Associate के रूप में, मैं योग्य खरीदारी से कमाई करता/करती हूँ। उत्पाद की कीमतें और उपलब्धता परिवर्तन के अधीन हैं।"}
          </p>
        </div>

        {/* Bottom bar */}
        <div className="mt-6 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-muted">
            © {new Date().getFullYear()} ScienceHindi 360.{" "}
            {lang === "en" ? "All rights reserved." : "सर्वाधिकार सुरक्षित।"}
          </p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-xs text-text-muted">
              <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
              {lang === "en" ? "Systems operational" : "सिस्टम चालू"}
            </span>
            <span className="text-xs text-text-muted">
              {lang === "en" ? "Made with" : "बनाया गया"}{" "}
              <span className="text-neon-pink">♥</span>{" "}
              {lang === "en" ? "for science" : "विज्ञान के लिए"}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
