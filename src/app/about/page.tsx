"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar, Footer } from "@/components/layout";
import { GlassPanel, Badge } from "@/components/ui";

export default function AboutPage() {
  const [lang, setLang] = useState<"en" | "hi">("en");

  const t = lang === "en" ? en : hi;

  return (
    <>
      <Navbar lang={lang} onToggleLang={() => setLang(lang === "en" ? "hi" : "en")} />
      <main className="min-h-screen bg-space-black pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                bg-neon-violet/10 border border-neon-violet/20 mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-neon-violet" />
              <span className="text-xs font-medium text-neon-violet tracking-wide">
                {t.badge}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-text-primary mb-6"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              {t.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed"
            >
              {t.subtitle}
            </motion.p>
          </div>

          {/* Mission section */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <GlassPanel intensity="medium" className="p-8 sm:p-10 mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-neon-violet/15 flex items-center justify-center">
                  <svg className="w-5 h-5 text-neon-violet" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                  </svg>
                </div>
                <h2
                  className="text-2xl sm:text-3xl font-bold text-text-primary"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {t.missionTitle}
                </h2>
              </div>
              <p className="text-text-secondary leading-relaxed text-base sm:text-lg">
                {t.missionText1}
              </p>
              <p className="text-text-secondary leading-relaxed text-base sm:text-lg mt-4">
                {t.missionText2}
              </p>
            </GlassPanel>
          </motion.div>

          {/* Why We Built This */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <GlassPanel intensity="medium" className="p-8 sm:p-10 mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-neon-cyan/15 flex items-center justify-center">
                  <svg className="w-5 h-5 text-neon-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                  </svg>
                </div>
                <h2
                  className="text-2xl sm:text-3xl font-bold text-text-primary"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {t.whyTitle}
                </h2>
              </div>
              <p className="text-text-secondary leading-relaxed text-base sm:text-lg">
                {t.whyText1}
              </p>
              <p className="text-text-secondary leading-relaxed text-base sm:text-lg mt-4">
                {t.whyText2}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-8">
                {t.stats.map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="text-center p-4 rounded-xl bg-white/[0.03] border border-white/[0.04]"
                  >
                    <p className="text-2xl sm:text-3xl font-bold text-neon-violet mb-1" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                      {stat.value}
                    </p>
                    <p className="text-xs text-text-muted">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </GlassPanel>
          </motion.div>

          {/* Scientific Accuracy */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <GlassPanel intensity="medium" className="p-8 sm:p-10 mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-neon-green/15 flex items-center justify-center">
                  <svg className="w-5 h-5 text-neon-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                  </svg>
                </div>
                <h2
                  className="text-2xl sm:text-3xl font-bold text-text-primary"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {t.accuracyTitle}
                </h2>
              </div>
              <p className="text-text-secondary leading-relaxed text-base sm:text-lg">
                {t.accuracyText1}
              </p>

              {/* Principles */}
              <div className="mt-6 space-y-3">
                {t.principles.map((principle, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02]"
                  >
                    <span className="shrink-0 w-6 h-6 rounded-full bg-neon-green/15 flex items-center justify-center text-neon-green text-xs font-bold mt-0.5">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                    </span>
                    <div>
                      <p className="text-sm font-medium text-text-primary">{principle.title}</p>
                      <p className="text-sm text-text-muted mt-0.5">{principle.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </GlassPanel>
          </motion.div>

          {/* Team / CTA */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center py-12"
          >
            <p className="text-text-secondary text-lg mb-2">{t.ctaText}</p>
            <p className="text-text-muted text-sm">{t.ctaSub}</p>
          </motion.div>
        </div>
      </main>
      <Footer lang={lang} />
    </>
  );
}

const en = {
  badge: "About ScienceHindi 360",
  title: "About Us",
  subtitle:
    "We're on a mission to make astrophysics and space science accessible, interactive, and engaging for the Hindi-speaking world.",
  missionTitle: "Our Mission",
  missionText1:
    "ScienceHindi 360 was created with a singular vision: to break the language barrier in science education. While the world's most exciting discoveries in astrophysics, cosmology, and space exploration are shared widely in English, millions of curious Hindi-speaking learners are left behind. We believe that the language you speak should never limit the science you can learn.",
  missionText2:
    "Our platform delivers premium, bilingual (Hindi & English) science content — from interactive calculators that let you explore planetary physics, to in-depth articles that explain black holes, neutron stars, and the latest ISRO and NASA missions. Every tool, article, and experience on ScienceHindi 360 is designed to spark curiosity and deepen understanding.",
  whyTitle: "Why We Built This",
  whyText1:
    "India has one of the youngest and most curious populations on Earth. Yet, when a student in Varanasi searches for \"How does gravity work on Jupiter?\" in Hindi, the results are sparse, outdated, or inaccurate. We saw this gap and decided to fill it with a world-class platform that treats Hindi-language science education with the same seriousness and quality as any English resource.",
  whyText2:
    "Every interactive tool on our platform — from the Weight on Planets calculator to the ISS Live Tracker — was built from the ground up with scientific data sourced from NASA, ESA, and ISRO databases. We don't just translate; we localize, contextualize, and make the learning experience truly native.",
  stats: [
    { value: "6+", label: "Interactive Tools" },
    { value: "2", label: "Languages" },
    { value: "100%", label: "Free Access" },
  ],
  accuracyTitle: "Scientific Accuracy",
  accuracyText1:
    "We take accuracy seriously. Every number, formula, and fact published on ScienceHindi 360 goes through a rigorous verification process. Here's how we ensure the science is right:",
  principles: [
    {
      title: "Peer-Reviewed Sources",
      desc: "All scientific data is sourced from NASA, ESA, ISRO, and peer-reviewed astrophysics journals.",
    },
    {
      title: "Real Formulas, Not Approximations",
      desc: "Our calculators use the actual physics equations (e.g., v = sqrt(2GM/r) for escape velocity) with real planetary data.",
    },
    {
      title: "Live Data Integration",
      desc: "Tools like our ISS Tracker use real-time APIs to show current, verifiable data — not static placeholders.",
    },
    {
      title: "Continuous Updates",
      desc: "As new discoveries are made and data is revised by space agencies, we update our content accordingly.",
    },
    {
      title: "Transparent Methodology",
      desc: "We show the formulas and data sources behind every calculation so users can verify and learn from the methodology itself.",
    },
  ],
  ctaText: "Built with curiosity, powered by science.",
  ctaSub: "ScienceHindi 360 is a free, open educational platform. No paywalls, no gatekeeping — just pure science.",
};

const hi = {
  badge: "ScienceHindi 360 के बारे में",
  title: "हमारे बारे में",
  subtitle:
    "हम हिंदी भाषी दुनिया के लिए खगोल भौतिकी और अंतरिक्ष विज्ञान को सुलभ, इंटरैक्टिव और रोचक बनाने के मिशन पर हैं।",
  missionTitle: "हमारा मिशन",
  missionText1:
    "ScienceHindi 360 एक अकेली दृष्टि के साथ बनाया गया था: विज्ञान शिक्षा में भाषा की बाधा को तोड़ना। जबकि खगोल भौतिकी, ब्रह्मांड विज्ञान और अंतरिक्ष अन्वेषण में दुनिया की सबसे रोमांचक खोजें अंग्रेजी में व्यापक रूप से साझा की जाती हैं, लाखों जिज्ञासु हिंदी भाषी शिक्षार्थी पीछे रह जाते हैं। हम मानते हैं कि आप जो भाषा बोलते हैं, वह कभी भी उस विज्ञान को सीमित नहीं करनी चाहिए जो आप सीख सकते हैं।",
  missionText2:
    "हमारा प्लेटफ़ॉर्म प्रीमियम, द्विभाषी (हिंदी और अंग्रेजी) विज्ञान सामग्री प्रदान करता है — ग्रहीय भौतिकी की खोज करने वाले इंटरैक्टिव कैलकुलेटर से लेकर ब्लैक होल, न्यूट्रॉन स्टार और नवीनतम ISRO और NASA मिशनों की गहन व्याख्या करने वाले लेखों तक। ScienceHindi 360 पर हर टूल, लेख और अनुभव जिज्ञासा जगाने और समझ को गहरा करने के लिए डिज़ाइन किया गया है।",
  whyTitle: "हमने यह क्यों बनाया",
  whyText1:
    "भारत में पृथ्वी पर सबसे युवा और सबसे जिज्ञासु आबादी में से एक है। फिर भी, जब वाराणसी का कोई छात्र हिंदी में \"बृहस्पति पर गुरुत्वाकर्षण कैसे काम करता है?\" खोजता है, तो परिणाम विरल, पुराने या गलत होते हैं। हमने इस अंतर को देखा और एक विश्व-स्तरीय प्लेटफ़ॉर्म से भरने का फैसला किया जो हिंदी-भाषा विज्ञान शिक्षा को किसी भी अंग्रेजी संसाधन जितनी गंभीरता और गुणवत्ता के साथ मानता है।",
  whyText2:
    "हमारे प्लेटफ़ॉर्म पर हर इंटरैक्टिव टूल — ग्रहों पर वज़न कैलकुलेटर से लेकर ISS लाइव ट्रैकर तक — NASA, ESA और ISRO डेटाबेस से प्राप्त वैज्ञानिक डेटा के साथ शुरू से बनाया गया था। हम सिर्फ अनुवाद नहीं करते; हम स्थानीयकरण करते हैं, संदर्भ देते हैं, और सीखने के अनुभव को वास्तव में मूल बनाते हैं।",
  stats: [
    { value: "6+", label: "इंटरैक्टिव टूल्स" },
    { value: "2", label: "भाषाएँ" },
    { value: "100%", label: "मुफ़्त एक्सेस" },
  ],
  accuracyTitle: "वैज्ञानिक सटीकता",
  accuracyText1:
    "हम सटीकता को गंभीरता से लेते हैं। ScienceHindi 360 पर प्रकाशित हर संख्या, सूत्र और तथ्य एक कठोर सत्यापन प्रक्रिया से गुज़रता है। यहाँ बताया गया है कि हम विज्ञान की सटीकता कैसे सुनिश्चित करते हैं:",
  principles: [
    {
      title: "सहकर्मी-समीक्षित स्रोत",
      desc: "सभी वैज्ञानिक डेटा NASA, ESA, ISRO और सहकर्मी-समीक्षित खगोल भौतिकी पत्रिकाओं से प्राप्त किया जाता है।",
    },
    {
      title: "वास्तविक सूत्र, अनुमान नहीं",
      desc: "हमारे कैलकुलेटर वास्तविक भौतिकी समीकरणों का उपयोग करते हैं (जैसे, पलायन वेग के लिए v = sqrt(2GM/r)) वास्तविक ग्रहीय डेटा के साथ।",
    },
    {
      title: "लाइव डेटा एकीकरण",
      desc: "ISS ट्रैकर जैसे टूल्स वर्तमान, सत्यापन योग्य डेटा दिखाने के लिए रियल-टाइम API का उपयोग करते हैं।",
    },
    {
      title: "निरंतर अपडेट",
      desc: "जैसे-जैसे नई खोजें होती हैं और अंतरिक्ष एजेंसियों द्वारा डेटा संशोधित किया जाता है, हम तदनुसार अपनी सामग्री अपडेट करते हैं।",
    },
    {
      title: "पारदर्शी कार्यप्रणाली",
      desc: "हम हर गणना के पीछे सूत्र और डेटा स्रोत दिखाते हैं ताकि उपयोगकर्ता स्वयं सत्यापित कर सकें और कार्यप्रणाली से सीख सकें।",
    },
  ],
  ctaText: "जिज्ञासा से निर्मित, विज्ञान से संचालित।",
  ctaSub: "ScienceHindi 360 एक मुफ़्त, खुला शैक्षिक प्लेटफ़ॉर्म है। कोई पेवॉल नहीं, कोई गेटकीपिंग नहीं — बस शुद्ध विज्ञान।",
};
