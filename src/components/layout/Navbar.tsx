"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

const navLinks = [
  { href: "/", label: { en: "Home", hi: "होम" } },
  { href: "/universe", label: { en: "Universe", hi: "ब्रह्मांड" } },
  { href: "/tools", label: { en: "Tools", hi: "उपकरण" } },
  { href: "/shop", label: { en: "Shop", hi: "शॉप" } },
  { href: "/blog", label: { en: "Blog", hi: "ब्लॉग" } },
  { href: "/events", label: { en: "Live Events", hi: "लाइव इवेंट्स" } },
];

export default function Navbar() {
  const { lang, toggleLang } = useLang();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isDark = theme === "dark";

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-300 ease-out
        ${
          scrolled
            ? "backdrop-blur-2xl shadow-sm"
            : "bg-transparent"
        }
      `}
      style={{
        backgroundColor: scrolled
          ? isDark ? "rgba(0,0,0,0.85)" : "rgba(255,255,255,0.9)"
          : "transparent",
        borderBottom: scrolled ? `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}` : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span
              className="text-lg font-bold tracking-tight"
              style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                color: "var(--text-primary)",
              }}
            >
              ScienceHindi
              <span className="text-gradient-violet"> 360</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-lg group"
                style={{ color: "var(--text-secondary)" }}
              >
                <span className="group-hover:text-[var(--text-primary)] transition-colors">
                  {link.label[lang]}
                </span>
                <span
                  className="absolute bottom-0.5 left-4 right-4 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                  style={{ background: "var(--accent)" }}
                />
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 cursor-pointer"
              style={{
                background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
                color: "var(--text-secondary)",
              }}
              aria-label="Toggle theme"
            >
              {isDark ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                </svg>
              )}
            </button>

            {/* Language Toggle */}
            <button
              onClick={toggleLang}
              className="relative flex items-center w-[64px] h-8 rounded-full transition-all duration-300 cursor-pointer overflow-hidden"
              style={{
                background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
                border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
              }}
              aria-label="Toggle language"
            >
              <motion.div
                className="absolute w-[30px] h-[24px] rounded-full"
                style={{
                  background: "var(--accent-muted)",
                  border: "1px solid var(--accent)",
                }}
                animate={{ x: lang === "en" ? 2 : 32 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
              <span
                className={`relative z-10 flex-1 text-center text-xs font-semibold transition-colors duration-200`}
                style={{ color: lang === "en" ? "var(--accent)" : "var(--text-muted)" }}
              >
                EN
              </span>
              <span
                className={`relative z-10 flex-1 text-center text-xs font-semibold transition-colors duration-200`}
                style={{ color: lang === "hi" ? "var(--accent)" : "var(--text-muted)" }}
              >
                हि
              </span>
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className="block w-5 h-0.5"
                style={{ background: "var(--text-secondary)" }}
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                className="block w-5 h-0.5"
                style={{ background: "var(--text-secondary)" }}
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className="block w-5 h-0.5"
                style={{ background: "var(--text-secondary)" }}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden backdrop-blur-2xl"
            style={{
              backgroundColor: isDark ? "rgba(0,0,0,0.95)" : "rgba(255,255,255,0.97)",
              borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
            }}
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-3 text-sm font-medium rounded-xl transition-colors"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {link.label[lang]}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
