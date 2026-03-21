"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar, Footer } from "@/components/layout";
import { GlassPanel, Input, Button } from "@/components/ui";
import { useLang } from "@/context/LanguageContext";

export default function ContactPage() {
  const { lang } = useLang();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const t = lang === "en" ? en : hi;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // No backend yet — just show success state
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-space-black pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                bg-neon-cyan/10 border border-neon-cyan/20 mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan" />
              <span className="text-xs font-medium text-neon-cyan tracking-wide">
                {t.badge}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl font-bold text-text-primary mb-4"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              {t.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-lg text-text-secondary max-w-xl mx-auto"
            >
              {t.subtitle}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {/* Contact form */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="md:col-span-3"
            >
              <GlassPanel intensity="medium" className="p-6 sm:p-8">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 rounded-full bg-neon-green/15 flex items-center justify-center mx-auto mb-5">
                      <svg className="w-8 h-8 text-neon-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                    </div>
                    <h3
                      className="text-2xl font-bold text-text-primary mb-2"
                      style={{ fontFamily: "var(--font-space-grotesk)" }}
                    >
                      {t.successTitle}
                    </h3>
                    <p className="text-text-secondary">{t.successText}</p>
                    <Button
                      variant="ghost"
                      className="mt-6"
                      onClick={() => {
                        setSubmitted(false);
                        setForm({ name: "", email: "", subject: "", message: "" });
                      }}
                    >
                      {t.sendAnother}
                    </Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <h2
                      className="text-xl font-semibold text-text-primary mb-1"
                      style={{ fontFamily: "var(--font-space-grotesk)" }}
                    >
                      {t.formTitle}
                    </h2>
                    <p className="text-sm text-text-muted mb-4">{t.formSub}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        label={t.nameLabel}
                        placeholder={t.namePlaceholder}
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        required
                      />
                      <Input
                        label={t.emailLabel}
                        type="email"
                        placeholder={t.emailPlaceholder}
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        required
                      />
                    </div>

                    <Input
                      label={t.subjectLabel}
                      placeholder={t.subjectPlaceholder}
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      required
                    />

                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-medium text-text-secondary">
                        {t.messageLabel}
                      </label>
                      <textarea
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder={t.messagePlaceholder}
                        rows={5}
                        required
                        className="
                          w-full px-4 py-2.5 rounded-xl text-sm
                          bg-space-elevated border border-space-border
                          text-text-primary placeholder:text-text-muted
                          outline-none resize-none
                          transition-all duration-250 ease-out
                          focus:border-neon-violet/50 focus:shadow-[0_0_15px_rgba(139,92,246,0.15)]
                          hover:border-space-border/80
                        "
                      />
                    </div>

                    <Button type="submit" variant="primary" size="lg" className="w-full">
                      {t.sendButton}
                    </Button>
                  </form>
                )}
              </GlassPanel>
            </motion.div>

            {/* Contact info sidebar */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="md:col-span-2 space-y-4"
            >
              {/* Email card */}
              <GlassPanel intensity="light" className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-neon-violet/15 flex items-center justify-center">
                    <svg className="w-4.5 h-4.5 text-neon-violet" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-primary">{t.emailTitle}</p>
                    <p className="text-xs text-text-muted">sciencehindi360@gmail.com</p>
                  </div>
                </div>
              </GlassPanel>

              {/* Response time */}
              <GlassPanel intensity="light" className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-neon-cyan/15 flex items-center justify-center">
                    <svg className="w-4.5 h-4.5 text-neon-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-primary">{t.responseTitle}</p>
                    <p className="text-xs text-text-muted">{t.responseText}</p>
                  </div>
                </div>
              </GlassPanel>

              {/* Topics */}
              <GlassPanel intensity="light" className="p-5">
                <p className="text-sm font-medium text-text-primary mb-3">{t.topicsTitle}</p>
                <div className="flex flex-wrap gap-2">
                  {t.topics.map((topic) => (
                    <span
                      key={topic}
                      className="text-xs px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.06] text-text-muted"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </GlassPanel>

              {/* Social hint */}
              <GlassPanel intensity="light" className="p-5">
                <div className="flex items-start gap-3">
                  <span className="shrink-0 w-9 h-9 rounded-lg bg-neon-pink/15 flex items-center justify-center text-neon-pink">
                    <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-sm font-medium text-text-primary">{t.socialTitle}</p>
                    <p className="text-xs text-text-muted mt-0.5">{t.socialText}</p>
                  </div>
                </div>
              </GlassPanel>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

const en = {
  badge: "Get in Touch",
  title: "Contact Us",
  subtitle: "Have a question, suggestion, or just want to talk about space? We'd love to hear from you.",
  formTitle: "Send us a message",
  formSub: "Fill out the form below and we'll get back to you as soon as possible.",
  nameLabel: "Your Name",
  namePlaceholder: "Enter your name",
  emailLabel: "Email Address",
  emailPlaceholder: "you@example.com",
  subjectLabel: "Subject",
  subjectPlaceholder: "What's this about?",
  messageLabel: "Message",
  messagePlaceholder: "Tell us what's on your mind...",
  sendButton: "Send Message",
  successTitle: "Message Sent!",
  successText: "Thank you for reaching out. We'll respond within 24-48 hours.",
  sendAnother: "Send Another Message",
  emailTitle: "Email Us",
  responseTitle: "Response Time",
  responseText: "We typically respond within 24-48 hours",
  topicsTitle: "We can help with",
  topics: ["Content Suggestions", "Bug Reports", "Collaborations", "Scientific Corrections", "General Feedback"],
  socialTitle: "Follow Our Journey",
  socialText: "Stay updated with our latest tools, articles, and space events on social media.",
};

const hi = {
  badge: "संपर्क करें",
  title: "हमसे संपर्क करें",
  subtitle: "कोई सवाल, सुझाव, या बस अंतरिक्ष के बारे में बात करना चाहते हैं? हम आपसे सुनना पसंद करेंगे।",
  formTitle: "हमें संदेश भेजें",
  formSub: "नीचे दिया गया फ़ॉर्म भरें और हम जल्द से जल्द आपसे संपर्क करेंगे।",
  nameLabel: "आपका नाम",
  namePlaceholder: "अपना नाम दर्ज करें",
  emailLabel: "ईमेल पता",
  emailPlaceholder: "you@example.com",
  subjectLabel: "विषय",
  subjectPlaceholder: "यह किस बारे में है?",
  messageLabel: "संदेश",
  messagePlaceholder: "हमें बताएं आपके मन में क्या है...",
  sendButton: "संदेश भेजें",
  successTitle: "संदेश भेजा गया!",
  successText: "संपर्क करने के लिए धन्यवाद। हम 24-48 घंटों के भीतर जवाब देंगे।",
  sendAnother: "एक और संदेश भेजें",
  emailTitle: "ईमेल करें",
  responseTitle: "प्रतिक्रिया समय",
  responseText: "हम आमतौर पर 24-48 घंटों के भीतर जवाब देते हैं",
  topicsTitle: "हम इनमें मदद कर सकते हैं",
  topics: ["सामग्री सुझाव", "बग रिपोर्ट", "सहयोग", "वैज्ञानिक सुधार", "सामान्य प्रतिक्रिया"],
  socialTitle: "हमारी यात्रा का अनुसरण करें",
  socialText: "सोशल मीडिया पर हमारे नवीनतम टूल्स, लेखों और अंतरिक्ष कार्यक्रमों से अपडेट रहें।",
};
