"use client";

import { motion } from "framer-motion";
import { Navbar, Footer } from "@/components/layout";
import { useLang } from "@/context/LanguageContext";

export default function AffiliateDisclosurePage() {
  const { lang } = useLang();

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16" style={{ background: "var(--bg-primary)" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1
              className="text-3xl sm:text-4xl font-bold mb-2"
              style={{ fontFamily: "var(--font-space-grotesk)", color: "var(--text-primary)" }}
            >
              {lang === "en" ? "Affiliate Disclosure" : "एफिलिएट प्रकटीकरण"}
            </h1>
            <p className="text-sm mb-10" style={{ color: "var(--text-muted)" }}>
              {lang === "en" ? "Last updated: March 21, 2026" : "अंतिम अपडेट: 21 मार्च, 2026"}
            </p>
          </motion.div>

          <motion.article
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="
              prose prose-invert prose-lg max-w-none
              prose-headings:font-bold prose-headings:tracking-tight
              prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
              prose-p:leading-relaxed
              prose-strong:font-semibold
              prose-li:leading-relaxed
            "
            style={{
              fontFamily: "var(--font-inter)",
              color: "var(--text-secondary)",
            }}
          >
            {lang === "en" ? <DisclosureEN /> : <DisclosureHI />}
          </motion.article>
        </div>
      </main>
      <Footer />
    </>
  );
}

function DisclosureEN() {
  return (
    <>
      <p>
        <strong style={{ color: "var(--text-primary)" }}>ScienceHindi 360</strong> (accessible at <strong style={{ color: "var(--text-primary)" }}>sciencehindi.in</strong>) is a participant in the <strong style={{ color: "var(--text-primary)" }}>Amazon Services LLC Associates Program</strong>, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to <strong style={{ color: "var(--text-primary)" }}>Amazon.in</strong> and affiliated sites.
      </p>

      <h2 style={{ color: "var(--text-primary)" }}>What This Means for You</h2>
      <p>
        When you click on product links on our website and make a purchase on Amazon, we may earn a small commission at <strong style={{ color: "var(--text-primary)" }}>no additional cost to you</strong>. This commission helps us maintain the website, create free educational content, and develop interactive space tools.
      </p>

      <h2 style={{ color: "var(--text-primary)" }}>Our Commitment</h2>
      <ul>
        <li>We only recommend products that we genuinely believe are valuable to science enthusiasts and space lovers.</li>
        <li>Our editorial content is not influenced by affiliate partnerships. Product recommendations are based on quality, relevance, and educational value.</li>
        <li>We are transparent about our affiliate relationships as required by the Federal Trade Commission (FTC) guidelines.</li>
        <li>Product prices and availability are subject to change. Prices displayed on our site may differ from actual prices on Amazon at the time of purchase.</li>
      </ul>

      <h2 style={{ color: "var(--text-primary)" }}>Amazon Trademark</h2>
      <p>
        Amazon and the Amazon logo are trademarks of Amazon.com, Inc. or its affiliates. As an Amazon Associate, ScienceHindi 360 earns from qualifying purchases.
      </p>

      <h2 style={{ color: "var(--text-primary)" }}>Questions?</h2>
      <p>
        If you have any questions about our affiliate relationships, please contact us at <strong style={{ color: "var(--text-primary)" }}>sciencehindi360@gmail.com</strong>.
      </p>
    </>
  );
}

function DisclosureHI() {
  return (
    <>
      <p>
        <strong style={{ color: "var(--text-primary)" }}>ScienceHindi 360</strong> (<strong style={{ color: "var(--text-primary)" }}>sciencehindi.in</strong> पर उपलब्ध) <strong style={{ color: "var(--text-primary)" }}>Amazon Services LLC Associates Program</strong> में एक प्रतिभागी है, जो एक एफिलिएट विज्ञापन कार्यक्रम है जो साइटों को <strong style={{ color: "var(--text-primary)" }}>Amazon.in</strong> और संबद्ध साइटों पर विज्ञापन और लिंक करके विज्ञापन शुल्क अर्जित करने का साधन प्रदान करता है।
      </p>

      <h2 style={{ color: "var(--text-primary)" }}>आपके लिए इसका क्या मतलब है</h2>
      <p>
        जब आप हमारी वेबसाइट पर उत्पाद लिंक पर क्लिक करते हैं और Amazon पर खरीदारी करते हैं, तो हम <strong style={{ color: "var(--text-primary)" }}>आपको बिना किसी अतिरिक्त लागत के</strong> एक छोटा कमीशन कमा सकते हैं। यह कमीशन हमें वेबसाइट बनाए रखने, मुफ्त शैक्षिक सामग्री बनाने और इंटरैक्टिव स्पेस टूल्स विकसित करने में मदद करता है।
      </p>

      <h2 style={{ color: "var(--text-primary)" }}>हमारी प्रतिबद्धता</h2>
      <ul>
        <li>हम केवल उन उत्पादों की सिफारिश करते हैं जो हमें वास्तव में विज्ञान उत्साही और अंतरिक्ष प्रेमियों के लिए मूल्यवान लगते हैं।</li>
        <li>हमारी संपादकीय सामग्री एफिलिएट साझेदारी से प्रभावित नहीं है। उत्पाद सिफारिशें गुणवत्ता, प्रासंगिकता और शैक्षिक मूल्य पर आधारित हैं।</li>
        <li>हम FTC दिशानिर्देशों के अनुसार अपने एफिलिएट संबंधों के बारे में पारदर्शी हैं।</li>
        <li>उत्पाद की कीमतें और उपलब्धता परिवर्तन के अधीन हैं। हमारी साइट पर प्रदर्शित कीमतें खरीदारी के समय Amazon पर वास्तविक कीमतों से भिन्न हो सकती हैं।</li>
      </ul>

      <h2 style={{ color: "var(--text-primary)" }}>Amazon ट्रेडमार्क</h2>
      <p>
        Amazon और Amazon लोगो Amazon.com, Inc. या इसके सहयोगियों के ट्रेडमार्क हैं। एक Amazon Associate के रूप में, ScienceHindi 360 योग्य खरीदारी से कमाई करता है।
      </p>

      <h2 style={{ color: "var(--text-primary)" }}>प्रश्न?</h2>
      <p>
        यदि आपके पास हमारे एफिलिएट संबंधों के बारे में कोई प्रश्न है, तो कृपया <strong style={{ color: "var(--text-primary)" }}>sciencehindi360@gmail.com</strong> पर हमसे संपर्क करें।
      </p>
    </>
  );
}
