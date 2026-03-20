"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/tools", label: { en: "Tools", hi: "उपकरण" } },
  { href: "/shop", label: { en: "Shop", hi: "शॉप" } },
  { href: "/blog", label: { en: "Blog", hi: "ब्लॉग" } },
  { href: "/events", label: { en: "Live Events", hi: "लाइव इवेंट्स" } },
];

interface NavbarProps {
  lang: "en" | "hi";
  onToggleLang: () => void;
}

export default function Navbar({ lang, onToggleLang }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-300 ease-out
        ${
          scrolled
            ? "bg-[rgba(5,5,16,0.75)] backdrop-blur-2xl border-b border-white/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
            : "bg-transparent"
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative w-8 h-8 flex items-center justify-center">
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-neon-violet to-neon-blue opacity-80 group-hover:opacity-100 transition-opacity" />
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="relative w-5 h-5 text-white"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
              </svg>
            </div>
            <span
              className="text-lg font-bold tracking-tight text-text-primary"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
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
                className="
                  relative px-4 py-2 text-sm font-medium text-text-secondary
                  hover:text-text-primary transition-colors duration-200
                  rounded-lg hover:bg-white/[0.04]
                  group
                "
              >
                {link.label[lang]}
                <span className="absolute bottom-0.5 left-4 right-4 h-px bg-neon-violet scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Language Toggle */}
            <button
              onClick={onToggleLang}
              className="
                relative flex items-center w-[72px] h-8 rounded-full
                bg-space-elevated border border-space-border
                hover:border-neon-violet/30 transition-all duration-300
                cursor-pointer overflow-hidden
              "
              aria-label="Toggle language"
            >
              <motion.div
                className="absolute w-[34px] h-[26px] rounded-full bg-neon-violet/20 border border-neon-violet/40"
                animate={{ x: lang === "en" ? 2 : 36 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
              <span
                className={`relative z-10 flex-1 text-center text-xs font-semibold transition-colors duration-200 ${
                  lang === "en" ? "text-neon-violet" : "text-text-muted"
                }`}
              >
                EN
              </span>
              <span
                className={`relative z-10 flex-1 text-center text-xs font-semibold transition-colors duration-200 ${
                  lang === "hi" ? "text-neon-violet" : "text-text-muted"
                }`}
              >
                हि
              </span>
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-white/[0.04] transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className="block w-5 h-0.5 bg-text-secondary"
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                className="block w-5 h-0.5 bg-text-secondary"
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className="block w-5 h-0.5 bg-text-secondary"
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
            className="md:hidden overflow-hidden bg-[rgba(5,5,16,0.95)] backdrop-blur-2xl border-b border-white/[0.06]"
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
                    className="block px-4 py-3 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-white/[0.04] rounded-xl transition-colors"
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
