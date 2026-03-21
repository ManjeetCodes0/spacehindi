"use client";

import { motion } from "framer-motion";
import { Navbar, Footer } from "@/components/layout";
import { useLang } from "@/context/LanguageContext";

export default function PrivacyPolicyPage() {
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
              {lang === "en" ? "Privacy Policy" : "गोपनीयता नीति"}
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
            {lang === "en" ? <PrivacyEN /> : <PrivacyHI />}
          </motion.article>
        </div>
      </main>
      <Footer />
    </>
  );
}

function PrivacyEN() {
  return (
    <>
      <p>
        At <strong>ScienceHindi 360</strong> (accessible at <strong>sciencehindi.in</strong>), we are committed to protecting the privacy of our visitors. This Privacy Policy document outlines the types of information that is collected and recorded by ScienceHindi 360 and how we use it.
      </p>
      <p>
        If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us at <strong>contact@sciencehindi.in</strong>.
      </p>

      <h2>Information We Collect</h2>
      <p>
        ScienceHindi 360 does not require user registration to access its content. However, we may collect the following types of information:
      </p>
      <ul>
        <li><strong>Log Data:</strong> When you visit our website, our servers may automatically log standard data provided by your web browser. This may include your device&apos;s Internet Protocol (IP) address, browser type and version, the pages you visit, the time and date of your visit, and other statistics.</li>
        <li><strong>Contact Form Data:</strong> If you use our contact form, we collect the information you voluntarily provide, such as your name, email address, and message content. This information is used solely to respond to your inquiry.</li>
      </ul>

      <h2>Google AdSense and the DoubleClick DART Cookie</h2>
      <p>
        Google, as a third-party vendor, uses cookies to serve ads on ScienceHindi 360. Google&apos;s use of the DART cookie enables it to serve ads to our users based on their visit to sciencehindi.in and other sites on the Internet.
      </p>
      <p>
        Users may opt out of the use of the DART cookie by visiting the Google Ad and Content Network Privacy Policy at the following URL: <strong>https://policies.google.com/technologies/ads</strong>.
      </p>
      <h3>How Google Uses Information</h3>
      <ul>
        <li>Google AdSense uses cookies to serve ads based on a user&apos;s prior visits to our website or other websites.</li>
        <li>Google&apos;s use of advertising cookies enables it and its partners to serve ads based on visits to our site and/or other sites on the Internet.</li>
        <li>Users may opt out of personalized advertising by visiting <strong>Google Ads Settings</strong>.</li>
        <li>Alternatively, users can opt out of third-party vendor cookies by visiting the <strong>Network Advertising Initiative opt-out page</strong>.</li>
      </ul>

      <h2>Third-Party Advertising Partners</h2>
      <p>
        Our advertising partners, including Google, may use cookies, web beacons, and similar technologies to collect or receive information from our website and elsewhere on the Internet and use that information to provide measurement services and target ads. These third-party ad servers or ad networks use technology to display advertisements and links that appear on ScienceHindi 360, which are sent directly to your browser.
      </p>
      <p>
        You can consult the respective privacy policies of these third-party ad servers for more detailed information on their practices. ScienceHindi 360&apos;s Privacy Policy does not apply to, and we cannot control the activities of, other advertisers or websites.
      </p>

      <h2>Cookies and Web Beacons</h2>
      <p>
        Like many websites, ScienceHindi 360 uses cookies. Cookies are used to store information including visitors&apos; preferences and the pages on the website that the visitor accessed or visited. The information is used to optimize the users&apos; experience by customizing our web page content based on visitors&apos; browser type and/or other information.
      </p>
      <p>You can choose to disable cookies through your individual browser options. More detailed information about cookie management with specific web browsers can be found at the browsers&apos; respective websites.</p>

      <h2>Third-Party APIs</h2>
      <p>
        ScienceHindi 360 uses third-party APIs to provide interactive tools (e.g., ISS Live Tracker). These APIs may collect IP addresses and usage data as described in their respective privacy policies. We use the following external services:
      </p>
      <ul>
        <li><strong>Where The ISS At API</strong> — for ISS tracking data</li>
        <li><strong>Open Notify API</strong> — for ISS crew information</li>
      </ul>

      <h2>Children&apos;s Privacy</h2>
      <p>
        ScienceHindi 360 is an educational platform suitable for all ages. We do not knowingly collect any personally identifiable information from children under the age of 13. If you believe that your child has provided such information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.
      </p>

      <h2>Changes to This Privacy Policy</h2>
      <p>
        We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date at the top. You are advised to review this Privacy Policy periodically for any changes.
      </p>

      <h2>Contact Us</h2>
      <p>
        If you have any questions about this Privacy Policy, you can contact us at <strong>contact@sciencehindi.in</strong>.
      </p>
    </>
  );
}

function PrivacyHI() {
  return (
    <>
      <p>
        <strong>ScienceHindi 360</strong> (<strong>sciencehindi.in</strong> पर उपलब्ध) में, हम अपने आगंतुकों की गोपनीयता की रक्षा के लिए प्रतिबद्ध हैं। यह गोपनीयता नीति दस्तावेज़ ScienceHindi 360 द्वारा एकत्र और रिकॉर्ड की जाने वाली जानकारी के प्रकारों और हम उसका उपयोग कैसे करते हैं, इसकी रूपरेखा प्रस्तुत करता है।
      </p>
      <p>
        यदि आपके पास अतिरिक्त प्रश्न हैं या हमारी गोपनीयता नीति के बारे में अधिक जानकारी चाहते हैं, तो <strong>contact@sciencehindi.in</strong> पर हमसे संपर्क करने में संकोच न करें।
      </p>

      <h2>हम कौन सी जानकारी एकत्र करते हैं</h2>
      <p>
        ScienceHindi 360 की सामग्री तक पहुँचने के लिए उपयोगकर्ता पंजीकरण की आवश्यकता नहीं है। हालाँकि, हम निम्नलिखित प्रकार की जानकारी एकत्र कर सकते हैं:
      </p>
      <ul>
        <li><strong>लॉग डेटा:</strong> जब आप हमारी वेबसाइट पर आते हैं, तो हमारे सर्वर स्वचालित रूप से आपके वेब ब्राउज़र द्वारा प्रदान किया गया मानक डेटा लॉग कर सकते हैं। इसमें आपके डिवाइस का IP पता, ब्राउज़र प्रकार और संस्करण, आपके द्वारा देखे गए पृष्ठ, आपकी यात्रा का समय और तारीख, और अन्य आँकड़े शामिल हो सकते हैं।</li>
        <li><strong>संपर्क फ़ॉर्म डेटा:</strong> यदि आप हमारे संपर्क फ़ॉर्म का उपयोग करते हैं, तो हम वह जानकारी एकत्र करते हैं जो आप स्वेच्छा से प्रदान करते हैं, जैसे आपका नाम, ईमेल पता और संदेश सामग्री।</li>
      </ul>

      <h2>Google AdSense और DoubleClick DART कुकी</h2>
      <p>
        Google, एक तृतीय-पक्ष विक्रेता के रूप में, ScienceHindi 360 पर विज्ञापन प्रदर्शित करने के लिए कुकीज़ का उपयोग करता है। Google का DART कुकी का उपयोग उसे sciencehindi.in और इंटरनेट पर अन्य साइटों पर उनकी यात्रा के आधार पर हमारे उपयोगकर्ताओं को विज्ञापन प्रदर्शित करने में सक्षम बनाता है।
      </p>
      <p>
        उपयोगकर्ता निम्नलिखित URL पर Google विज्ञापन और सामग्री नेटवर्क गोपनीयता नीति पर जाकर DART कुकी के उपयोग से ऑप्ट आउट कर सकते हैं: <strong>https://policies.google.com/technologies/ads</strong>
      </p>
      <h3>Google जानकारी का उपयोग कैसे करता है</h3>
      <ul>
        <li>Google AdSense उपयोगकर्ता की हमारी वेबसाइट या अन्य वेबसाइटों पर पूर्व यात्राओं के आधार पर विज्ञापन प्रदर्शित करने के लिए कुकीज़ का उपयोग करता है।</li>
        <li>Google के विज्ञापन कुकीज़ का उपयोग उसे और उसके भागीदारों को हमारी साइट और/या इंटरनेट पर अन्य साइटों पर यात्राओं के आधार पर विज्ञापन प्रदर्शित करने में सक्षम बनाता है।</li>
        <li>उपयोगकर्ता <strong>Google Ads Settings</strong> पर जाकर वैयक्तिकृत विज्ञापन से ऑप्ट आउट कर सकते हैं।</li>
        <li>वैकल्पिक रूप से, उपयोगकर्ता <strong>Network Advertising Initiative ऑप्ट-आउट पृष्ठ</strong> पर जाकर तृतीय-पक्ष विक्रेता कुकीज़ से ऑप्ट आउट कर सकते हैं।</li>
      </ul>

      <h2>तृतीय-पक्ष विज्ञापन भागीदार</h2>
      <p>
        Google सहित हमारे विज्ञापन भागीदार, हमारी वेबसाइट और इंटरनेट पर अन्यत्र से जानकारी एकत्र या प्राप्त करने के लिए कुकीज़, वेब बीकन और समान तकनीकों का उपयोग कर सकते हैं और उस जानकारी का उपयोग माप सेवाएँ प्रदान करने और विज्ञापन लक्षित करने के लिए कर सकते हैं।
      </p>

      <h2>कुकीज़ और वेब बीकन</h2>
      <p>
        कई वेबसाइटों की तरह, ScienceHindi 360 कुकीज़ का उपयोग करता है। कुकीज़ का उपयोग आगंतुकों की प्राथमिकताओं और वेबसाइट के उन पृष्ठों सहित जानकारी संग्रहीत करने के लिए किया जाता है जिन्हें आगंतुक ने एक्सेस किया या देखा।
      </p>
      <p>आप अपने व्यक्तिगत ब्राउज़र विकल्पों के माध्यम से कुकीज़ अक्षम कर सकते हैं।</p>

      <h2>तृतीय-पक्ष API</h2>
      <p>
        ScienceHindi 360 इंटरैक्टिव टूल्स (जैसे ISS लाइव ट्रैकर) प्रदान करने के लिए तृतीय-पक्ष API का उपयोग करता है। ये API अपनी संबंधित गोपनीयता नीतियों में वर्णित अनुसार IP पते और उपयोग डेटा एकत्र कर सकते हैं।
      </p>
      <ul>
        <li><strong>Where The ISS At API</strong> — ISS ट्रैकिंग डेटा के लिए</li>
        <li><strong>Open Notify API</strong> — ISS चालक दल की जानकारी के लिए</li>
      </ul>

      <h2>बच्चों की गोपनीयता</h2>
      <p>
        ScienceHindi 360 सभी उम्र के लिए उपयुक्त एक शैक्षिक प्लेटफ़ॉर्म है। हम जानबूझकर 13 वर्ष से कम आयु के बच्चों से कोई व्यक्तिगत रूप से पहचान योग्य जानकारी एकत्र नहीं करते हैं।
      </p>

      <h2>इस गोपनीयता नीति में परिवर्तन</h2>
      <p>
        हम समय-समय पर अपनी गोपनीयता नीति को अपडेट कर सकते हैं। हम इस पृष्ठ पर नई गोपनीयता नीति पोस्ट करके और शीर्ष पर &quot;अंतिम अपडेट&quot; तारीख को अपडेट करके किसी भी बदलाव की सूचना देंगे।
      </p>

      <h2>हमसे संपर्क करें</h2>
      <p>
        यदि इस गोपनीयता नीति के बारे में आपका कोई प्रश्न है, तो आप <strong>contact@sciencehindi.in</strong> पर हमसे संपर्क कर सकते हैं।
      </p>
    </>
  );
}
