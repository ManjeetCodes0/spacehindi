"use client";

import { motion } from "framer-motion";
import { Navbar, Footer } from "@/components/layout";
import { useLang } from "@/context/LanguageContext";

export default function TermsOfServicePage() {
  const { lang } = useLang();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-space-black pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1
              className="text-3xl sm:text-4xl font-bold text-text-primary mb-2"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              {lang === "en" ? "Terms of Service" : "सेवा की शर्तें"}
            </h1>
            <p className="text-sm text-text-muted mb-10">
              {lang === "en" ? "Last updated: March 20, 2026" : "अंतिम अपडेट: 20 मार्च, 2026"}
            </p>
          </motion.div>

          <motion.article
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="
              prose prose-invert prose-lg max-w-none
              prose-headings:font-bold prose-headings:tracking-tight
              prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:text-text-primary
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-text-primary
              prose-p:text-text-secondary prose-p:leading-relaxed
              prose-strong:text-text-primary prose-strong:font-semibold
              prose-blockquote:border-neon-violet/40 prose-blockquote:bg-neon-violet/[0.03]
              prose-blockquote:rounded-r-xl prose-blockquote:py-4 prose-blockquote:px-6
              prose-blockquote:not-italic prose-blockquote:text-text-secondary
              prose-a:text-neon-violet prose-a:no-underline hover:prose-a:underline
              prose-li:text-text-secondary
              prose-hr:border-white/[0.06]
            "
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {lang === "en" ? <TermsEN /> : <TermsHI />}
          </motion.article>
        </div>
      </main>
      <Footer />
    </>
  );
}

function TermsEN() {
  return (
    <>
      <p>
        Welcome to <strong>ScienceHindi 360</strong>. By accessing and using our website at <strong>sciencehindi.in</strong>, you agree to comply with and be bound by the following terms and conditions of use. Please review these terms carefully before using our platform.
      </p>

      <h2>1. Acceptance of Terms</h2>
      <p>
        By accessing or using ScienceHindi 360, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
      </p>

      <h2>2. Use License</h2>
      <p>
        Permission is granted to temporarily access the materials (information, tools, and content) on ScienceHindi 360 for personal, non-commercial, educational use only. This is the grant of a license, not a transfer of title, and under this license you may not:
      </p>
      <ul>
        <li>Modify or copy the materials for commercial purposes;</li>
        <li>Use the materials for any commercial purpose, or for any public display (commercial or non-commercial) without attribution;</li>
        <li>Attempt to decompile or reverse engineer any software contained on ScienceHindi 360;</li>
        <li>Remove any copyright or other proprietary notations from the materials;</li>
        <li>Transfer the materials to another person or &quot;mirror&quot; the materials on any other server.</li>
      </ul>
      <p>
        This license shall automatically terminate if you violate any of these restrictions and may be terminated by ScienceHindi 360 at any time.
      </p>

      <h2>3. Educational Content Disclaimer</h2>
      <p>
        The content on ScienceHindi 360 is provided for <strong>educational and informational purposes only</strong>. While we strive for scientific accuracy by sourcing data from reputable organizations such as NASA, ESA, and ISRO, the materials on this website are provided on an &quot;as is&quot; basis.
      </p>
      <p>
        ScienceHindi 360 makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
      </p>

      <h2>4. Interactive Tools</h2>
      <p>
        ScienceHindi 360 provides various interactive tools (calculators, converters, simulators, and trackers). These tools are designed for educational exploration and should not be used for professional scientific calculations, navigation, or any purpose where inaccurate data could cause harm.
      </p>
      <ul>
        <li>Calculations are based on simplified models and publicly available data.</li>
        <li>Real-time data (e.g., ISS position) is fetched from third-party APIs and may be subject to delays or inaccuracies.</li>
        <li>We do not guarantee the uninterrupted availability of any tool or API-dependent feature.</li>
      </ul>

      <h2>5. Third-Party Services</h2>
      <p>
        ScienceHindi 360 uses third-party services including but not limited to:
      </p>
      <ul>
        <li><strong>Google AdSense</strong> for advertising;</li>
        <li><strong>Third-party APIs</strong> (Where The ISS At, Open Notify) for live data;</li>
        <li><strong>Google Fonts</strong> for typography.</li>
      </ul>
      <p>
        Your use of these third-party services is subject to their respective terms of service and privacy policies. ScienceHindi 360 is not responsible for the content, privacy practices, or availability of these third-party services.
      </p>

      <h2>6. User Conduct</h2>
      <p>
        When using ScienceHindi 360, you agree not to:
      </p>
      <ul>
        <li>Use the website for any unlawful purpose;</li>
        <li>Attempt to gain unauthorized access to any portion of the website;</li>
        <li>Interfere with or disrupt the website or servers;</li>
        <li>Use automated tools (bots, scrapers) to access the website at scale without permission;</li>
        <li>Submit false or misleading information through our contact form.</li>
      </ul>

      <h2>7. Intellectual Property</h2>
      <p>
        All original content on ScienceHindi 360, including but not limited to text, graphics, logos, icons, images, code, and the overall design, is the property of ScienceHindi 360 and is protected by applicable intellectual property laws.
      </p>
      <p>
        Scientific data sourced from public domain databases (NASA, ESA, ISRO) is used under their respective data usage policies and is credited accordingly.
      </p>

      <h2>8. Limitation of Liability</h2>
      <p>
        In no event shall ScienceHindi 360 or its contributors be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on ScienceHindi 360, even if ScienceHindi 360 has been notified orally or in writing of the possibility of such damage.
      </p>

      <h2>9. Governing Law</h2>
      <p>
        These terms and conditions are governed by and construed in accordance with the laws of India, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
      </p>

      <h2>10. Changes to Terms</h2>
      <p>
        ScienceHindi 360 may revise these Terms of Service at any time without notice. By using this website, you are agreeing to be bound by the then current version of these Terms of Service. We encourage you to periodically review this page.
      </p>

      <h2>11. Contact Us</h2>
      <p>
        If you have any questions about these Terms of Service, please contact us at <strong>sciencehindi360@gmail.com</strong>.
      </p>
    </>
  );
}

function TermsHI() {
  return (
    <>
      <p>
        <strong>ScienceHindi 360</strong> में आपका स्वागत है। <strong>sciencehindi.in</strong> पर हमारी वेबसाइट को एक्सेस और उपयोग करके, आप निम्नलिखित उपयोग की शर्तों का पालन करने और उनसे बाध्य होने के लिए सहमत हैं। कृपया हमारे प्लेटफ़ॉर्म का उपयोग करने से पहले इन शर्तों की सावधानीपूर्वक समीक्षा करें।
      </p>

      <h2>1. शर्तों की स्वीकृति</h2>
      <p>
        ScienceHindi 360 को एक्सेस या उपयोग करके, आप इन सेवा की शर्तों और सभी लागू कानूनों और विनियमों से बाध्य होने के लिए सहमत हैं। यदि आप इनमें से किसी भी शर्त से सहमत नहीं हैं, तो आपको इस साइट का उपयोग या एक्सेस करने से प्रतिबंधित किया गया है।
      </p>

      <h2>2. उपयोग लाइसेंस</h2>
      <p>
        ScienceHindi 360 पर सामग्री (जानकारी, टूल्स और कंटेंट) को केवल व्यक्तिगत, गैर-व्यावसायिक, शैक्षिक उपयोग के लिए अस्थायी रूप से एक्सेस करने की अनुमति दी गई है। यह लाइसेंस का अनुदान है, स्वामित्व का हस्तांतरण नहीं, और इस लाइसेंस के तहत आप:
      </p>
      <ul>
        <li>व्यावसायिक उद्देश्यों के लिए सामग्री को संशोधित या कॉपी नहीं कर सकते;</li>
        <li>बिना एट्रिब्यूशन के किसी भी व्यावसायिक उद्देश्य के लिए सामग्री का उपयोग नहीं कर सकते;</li>
        <li>ScienceHindi 360 पर निहित किसी भी सॉफ़्टवेयर को डीकंपाइल या रिवर्स इंजीनियर करने का प्रयास नहीं कर सकते;</li>
        <li>सामग्री से कोई कॉपीराइट या अन्य मालिकाना नोटेशन नहीं हटा सकते।</li>
      </ul>

      <h2>3. शैक्षिक सामग्री अस्वीकरण</h2>
      <p>
        ScienceHindi 360 पर सामग्री <strong>केवल शैक्षिक और सूचनात्मक उद्देश्यों</strong> के लिए प्रदान की गई है। हम NASA, ESA और ISRO जैसे प्रतिष्ठित संगठनों से डेटा प्राप्त करके वैज्ञानिक सटीकता के लिए प्रयास करते हैं, लेकिन इस वेबसाइट पर सामग्री &quot;जैसी है&quot; के आधार पर प्रदान की गई है।
      </p>

      <h2>4. इंटरैक्टिव टूल्स</h2>
      <p>
        ScienceHindi 360 विभिन्न इंटरैक्टिव टूल्स (कैलकुलेटर, कनवर्टर, सिम्युलेटर और ट्रैकर) प्रदान करता है। ये टूल्स शैक्षिक अन्वेषण के लिए डिज़ाइन किए गए हैं और पेशेवर वैज्ञानिक गणनाओं, नेविगेशन, या किसी ऐसे उद्देश्य के लिए उपयोग नहीं किए जाने चाहिए जहाँ गलत डेटा नुकसान पहुँचा सकता है।
      </p>
      <ul>
        <li>गणनाएँ सरलीकृत मॉडल और सार्वजनिक रूप से उपलब्ध डेटा पर आधारित हैं।</li>
        <li>रियल-टाइम डेटा (जैसे, ISS स्थिति) तृतीय-पक्ष API से प्राप्त किया जाता है और देरी या अशुद्धियों के अधीन हो सकता है।</li>
        <li>हम किसी भी टूल या API-निर्भर सुविधा की निर्बाध उपलब्धता की गारंटी नहीं देते।</li>
      </ul>

      <h2>5. तृतीय-पक्ष सेवाएँ</h2>
      <p>
        ScienceHindi 360 तृतीय-पक्ष सेवाओं का उपयोग करता है जिनमें शामिल हैं लेकिन इन्हीं तक सीमित नहीं हैं:
      </p>
      <ul>
        <li>विज्ञापन के लिए <strong>Google AdSense</strong>;</li>
        <li>लाइव डेटा के लिए <strong>तृतीय-पक्ष API</strong> (Where The ISS At, Open Notify);</li>
        <li>टाइपोग्राफी के लिए <strong>Google Fonts</strong>।</li>
      </ul>

      <h2>6. उपयोगकर्ता आचरण</h2>
      <p>
        ScienceHindi 360 का उपयोग करते समय, आप सहमत हैं कि:
      </p>
      <ul>
        <li>किसी भी गैरकानूनी उद्देश्य के लिए वेबसाइट का उपयोग नहीं करेंगे;</li>
        <li>वेबसाइट के किसी भी हिस्से में अनधिकृत पहुँच प्राप्त करने का प्रयास नहीं करेंगे;</li>
        <li>वेबसाइट या सर्वर में हस्तक्षेप या बाधा नहीं डालेंगे;</li>
        <li>बिना अनुमति के स्वचालित टूल्स (बॉट्स, स्क्रैपर्स) का उपयोग नहीं करेंगे;</li>
        <li>हमारे संपर्क फ़ॉर्म के माध्यम से झूठी या भ्रामक जानकारी प्रस्तुत नहीं करेंगे।</li>
      </ul>

      <h2>7. बौद्धिक संपदा</h2>
      <p>
        ScienceHindi 360 पर सभी मूल सामग्री, जिसमें टेक्स्ट, ग्राफ़िक्स, लोगो, आइकन, इमेज, कोड और समग्र डिज़ाइन शामिल है लेकिन इन्हीं तक सीमित नहीं है, ScienceHindi 360 की संपत्ति है।
      </p>

      <h2>8. दायित्व की सीमा</h2>
      <p>
        किसी भी स्थिति में ScienceHindi 360 या इसके योगदानकर्ता ScienceHindi 360 पर सामग्री के उपयोग या उपयोग करने में असमर्थता से उत्पन्न होने वाले किसी भी नुकसान के लिए उत्तरदायी नहीं होंगे।
      </p>

      <h2>9. शासी कानून</h2>
      <p>
        ये नियम और शर्तें भारत के कानूनों द्वारा शासित और निर्मित हैं, और आप उस स्थान के न्यायालयों के विशेष अधिकार क्षेत्र में अपरिवर्तनीय रूप से प्रस्तुत करते हैं।
      </p>

      <h2>10. शर्तों में परिवर्तन</h2>
      <p>
        ScienceHindi 360 बिना किसी सूचना के किसी भी समय इन सेवा की शर्तों को संशोधित कर सकता है। इस वेबसाइट का उपयोग करके, आप इन सेवा की शर्तों के तत्कालीन वर्तमान संस्करण से बाध्य होने के लिए सहमत हैं।
      </p>

      <h2>11. हमसे संपर्क करें</h2>
      <p>
        यदि इन सेवा की शर्तों के बारे में आपका कोई प्रश्न है, तो कृपया <strong>sciencehindi360@gmail.com</strong> पर हमसे संपर्क करें।
      </p>
    </>
  );
}
