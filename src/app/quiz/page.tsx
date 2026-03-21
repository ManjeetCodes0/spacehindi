"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Navbar, Footer } from "@/components/layout";
import { useLang } from "@/context/LanguageContext";

export default function QuizPage() {
  const { lang } = useLang();

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16" style={{ background: "var(--bg-primary)" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center py-20"
          >
            {/* Icon */}
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8"
              style={{ background: "var(--accent-muted)" }}
            >
              <svg
                className="w-10 h-10"
                style={{ color: "var(--accent)" }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
              </svg>
            </div>

            <h1
              className="text-3xl sm:text-4xl font-bold mb-4"
              style={{
                fontFamily: "var(--font-space-grotesk)",
                color: "var(--text-primary)",
              }}
            >
              {lang === "en" ? "Space Quizzes" : "स्पेस क्विज़"}
            </h1>

            <p
              className="text-lg sm:text-xl font-medium mb-3"
              style={{
                fontFamily: lang === "hi" ? "var(--font-noto-sans-devanagari), system-ui" : "var(--font-space-grotesk)",
                color: "var(--accent)",
              }}
            >
              {lang === "en" ? "Coming Soon" : "जल्द आ रहा है"}
            </p>

            <p
              className="text-base max-w-md mx-auto mb-10 leading-relaxed"
              style={{
                color: "var(--text-secondary)",
                fontFamily: lang === "hi"
                  ? "var(--font-noto-sans-devanagari), system-ui"
                  : "var(--font-inter), system-ui",
              }}
            >
              {lang === "en"
                ? "We're building interactive bilingual quizzes to test your space knowledge — from planets to black holes. Stay tuned!"
                : "हम आपके अंतरिक्ष ज्ञान को परखने के लिए इंटरैक्टिव द्विभाषी क्विज़ बना रहे हैं — ग्रहों से लेकर ब्लैक होल तक। बने रहें!"}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/tools"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-300"
                style={{
                  background: "var(--accent)",
                  boxShadow: "0 0 16px rgba(139,92,246,0.25)",
                }}
              >
                {lang === "en" ? "Explore Tools" : "टूल्स एक्सप्लोर करें"}
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300"
                style={{
                  color: "var(--text-primary)",
                  border: "1px solid var(--glass-border)",
                  background: "var(--glass-bg)",
                }}
              >
                {lang === "en" ? "Read Blog" : "ब्लॉग पढ़ें"}
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
