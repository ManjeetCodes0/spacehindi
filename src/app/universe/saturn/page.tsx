"use client";

import Image from "next/image";
import { Navbar, Footer } from "@/components/layout";
import { useLang } from "@/context/LanguageContext";
import { getCelestialBody } from "@/data/universe/planets";
import { notFound } from "next/navigation";
import { useState, useEffect } from "react";
import NextPlanets from "@/components/universe/NextPlanets";
import FeaturedVideo from "@/components/universe/FeaturedVideo";
import Link from "next/link";

export default function SaturnCustomPage() {
  const { lang } = useLang();
  const body = getCelestialBody("saturn");
  if (!body) notFound();

  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const heroImages = [
    "/universe/planets/saturn/saturn1.png",
    "/universe/planets/saturn/saturn_art1.webp",
    "/universe/planets/saturn/saturn_art2.webp"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Navbar />
      <main className="bg-[#020509] text-white min-h-screen relative overflow-x-hidden font-sans pt-[80px]">

        {/* HERO SECTION */}
        <section className="relative w-full overflow-hidden px-4 sm:px-8 bg-[#020509] pt-4 lg:pt-0 pb-16 lg:pb-24">
          <div className="max-w-[1400px] mx-auto w-full flex flex-col lg:flex-row items-center lg:items-start justify-between relative z-20">
            {/* Left Content */}
            <div className="w-full lg:w-[55%] flex flex-col items-start text-left z-20 pt-2 lg:pt-4">
              <h1 className="text-[15vw] lg:text-[6.5rem] xl:text-[8.5rem] font-bold tracking-[0.02em] uppercase text-white leading-none whitespace-nowrap drop-shadow-xl" style={{ fontFamily: "Arial, sans-serif" }}>
                 SATURN
              </h1>
              <p className="mt-6 lg:mt-8 text-lg sm:text-xl xl:text-2xl leading-relaxed text-gray-200 font-light max-w-xl" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.8)" }}>
                शनि ग्रह (Saturn) — सौरमंडल का सबसे खूबसूरत ग्रह जिसके चमकदार छल्लों ने सदियों से इंसानों को मंत्रमुग्ध किया है। यह इतना हल्का है कि अगर कोई विशाल बाथटब मिल जाए तो यह पानी में तैर जाएगा!
              </p>

              {/* Stats Grid */}
              <div className="w-full grid grid-cols-2 gap-x-4 sm:gap-x-8 gap-y-6 sm:gap-y-8 pt-8 sm:pt-12 mt-6 sm:mt-10 border-t border-white/20">
                <div className="flex flex-col gap-1 sm:gap-3">
                  <span className="text-[10px] sm:text-xs tracking-[0.1em] text-white/70 uppercase font-semibold">दिन (Day)</span>
                  <span className="text-xl sm:text-2xl lg:text-3xl font-light">10.7 घंटे</span>
                </div>
                <div className="flex flex-col gap-1 sm:gap-3">
                  <span className="text-[10px] sm:text-xs tracking-[0.1em] text-white/70 uppercase font-semibold">व्यास (Diameter)</span>
                  <span className="text-xl sm:text-2xl lg:text-3xl font-light">1,16,460 किमी</span>
                </div>
                <div className="flex flex-col gap-1 sm:gap-3">
                  <span className="text-[10px] sm:text-xs tracking-[0.1em] text-white/70 uppercase font-semibold">चाँद (Moons)</span>
                  <span className="text-xl sm:text-2xl lg:text-3xl font-light">146 (ज्ञात)</span>
                </div>
                <div className="flex flex-col gap-1 sm:gap-3">
                  <span className="text-[10px] sm:text-xs tracking-[0.1em] text-white/70 uppercase font-semibold">ग्रह का प्रकार</span>
                  <span className="text-xl sm:text-2xl lg:text-3xl font-light">गैस विशाल (Gas Giant)</span>
                </div>
              </div>
            </div>

            {/* Right Media: The Planet */}
            <div className="w-full lg:w-[45%] flex items-center justify-center lg:justify-end relative mt-12 lg:mt-4 z-10">
              <div className="relative w-full max-w-[400px] lg:max-w-[480px] xl:max-w-[550px] aspect-square flex items-center justify-center lg:translate-x-[5%]">

                 {/* Background Glowing Rings — Saturn themed (Gold/Lavender) */}
                 <div className="absolute w-[120%] h-[120%] bg-amber-300/10 rounded-full blur-[70px] xl:blur-[90px] pointer-events-none z-0 transition-opacity duration-1000"></div>
                 <div className="absolute w-[85%] h-[85%] rounded-full border border-amber-400/20 pointer-events-none z-0 animate-pulse"></div>
                 <div className="absolute w-[140%] h-[70%] rounded-full border border-amber-300/15 border-dashed animate-[spin_30s_linear_infinite] pointer-events-none z-0"></div>
                 <div className="absolute w-[160%] h-[80%] rounded-full border border-white/5 pointer-events-none z-0"></div>

                 {heroImages.map((src, index) => (
                    <Image
                      key={src}
                      src={src}
                      alt={`शनि ग्रह (Saturn Planet) Visual ${index + 1}`}
                      fill
                      className={`object-contain drop-shadow-[0_0_80px_rgba(167,139,250,0.2)] transition-all duration-[1500ms] ease-in-out ${
                        currentHeroImage === index ? "opacity-100 scale-100" : "opacity-0 scale-95"
                      }`}
                      priority={index === 0}
                    />
                 ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: BASIC INFO (01 सौरमंडल का रत्न) */}
        <section className="relative w-full py-20 lg:py-32 bg-[#050a12] overflow-hidden flex flex-col justify-center px-4 sm:px-8">
          <div className="absolute top-0 right-0 w-full h-full z-0 opacity-30 pointer-events-none bg-gradient-to-l from-amber-900/10 to-transparent"></div>
          <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 items-center relative z-10 gap-12 lg:gap-24">
            <div className="flex flex-col gap-6 lg:gap-8 order-2 lg:order-1 relative z-20">
               <div className="flex items-center gap-4 sm:gap-6">
                 <span className="text-[70px] sm:text-[100px] lg:text-[140px] font-bold text-[#b4b4bb] leading-none drop-shadow-2xl opacity-50">01</span>
                 <div className="flex flex-col">
                   <div className="w-[50px] sm:w-[80px] h-[2px] bg-white/60 mb-2 sm:mb-4"></div>
                   <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.1em] uppercase">सौरमंडल का रत्न</h2>
                 </div>
               </div>
               <div className="lg:pl-[120px] space-y-6 text-gray-200 text-lg sm:text-xl font-light leading-relaxed max-w-2xl">
                 <p>
                   शनि ग्रह सौरमंडल का दूसरा सबसे बड़ा ग्रह है — सिर्फ बृहस्पति से छोटा। इसका व्यास 1,16,460 किलोमीटर है यानी इसके अंदर लगभग 764 पृथ्वियाँ समा सकती हैं। बृहस्पति की तरह यह भी एक &apos;गैस जायंट&apos; है — 96% हाइड्रोजन और 3% हीलियम गैस से बना, कोई ठोस ज़मीन नहीं।
                 </p>
                 <p>
                   लेकिन शनि की सबसे अनोखी बात इसका घनत्व (density) है — यह पूरे सौरमंडल का <strong>सबसे हल्का ग्रह</strong> है। इसका घनत्व पानी से भी कम (0.687 g/cm³) है! इसका मतलब अगर ब्रह्मांड में कोई इतना विशाल बाथटब हो तो शनि ग्रह उसमें <strong>तैर जाएगा</strong> — डूबेगा नहीं। यह बात सुनने में मज़ाक लगती है पर विज्ञान की सच्चाई है।
                 </p>
               </div>
            </div>
            <div className="order-1 lg:order-2 w-full relative z-10 flex items-center justify-center">
              <div className="relative w-full aspect-square max-w-[500px] rounded-[30px] overflow-hidden group">
                 <div className="absolute inset-0 z-0 shadow-inner">
                    <Image src="/universe/planets/saturn/bg01_saturn_jewel.webp" alt="Saturn — Jewel of the Solar System" fill className="object-cover opacity-100 contrast-125 saturate-50 scale-110 group-hover:scale-105 transition-transform duration-1000" />
                    <div className="absolute inset-0 bg-gradient-to-bl from-transparent to-[#050a12]/50 z-10"></div>
                 </div>
                 <div className="relative w-[80%] h-[80%] m-[10%] z-20 group-hover:scale-[1.02] transition-transform duration-700">
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: RINGS (02 अद्भुत छल्ले) */}
        <section className="relative w-full py-20 lg:py-32 min-h-[700px] overflow-hidden px-4 sm:px-8 bg-black">
           <div className="absolute inset-0 z-0">
             <Image src="/universe/planets/saturn/bg02_saturn_rings_closeup.webp" alt="Saturn rings close-up detail" fill className="object-cover opacity-90" />
             <div className="absolute inset-0 bg-black/30 pointer-events-none"></div>
           </div>
           <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 items-center relative z-10 gap-12">
              <div className="hidden lg:block order-1"></div>
              <div className="flex flex-col gap-6 lg:gap-8 order-2 lg:order-1 relative z-20">
                 <div className="flex items-center gap-4 sm:gap-6">
                   <span className="text-[70px] sm:text-[100px] lg:text-[140px] font-bold text-amber-400/30 leading-none">02</span>
                   <div className="flex flex-col">
                     <div className="w-[50px] sm:w-[80px] h-[2px] bg-amber-400/80 mb-2 sm:mb-4"></div>
                     <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.1em] uppercase text-white">अद्भुत छल्ले</h2>
                   </div>
                 </div>
                 <div className="lg:ml-[120px] space-y-6 text-gray-100 text-lg sm:text-xl font-light leading-relaxed max-w-2xl bg-black/70 p-6 sm:p-10 rounded-3xl backdrop-blur-md border border-white/10 shadow-2xl">
                   <p className="text-shadow-md">
                     शनि के छल्ले (Rings) ब्रह्मांड की सबसे खूबसूरत संरचनाओं में से एक हैं। ये छल्ले 2,82,000 किलोमीटर तक फैले हुए हैं — पृथ्वी से चंद्रमा की दूरी (3,84,000 किमी) के लगभग 3/4!
                   </p>
                   <p className="text-shadow-md">
                     लेकिन सबसे चौंकाने वाली बात यह है कि इतने विशाल छल्ले सिर्फ़ <strong>10 मीटर (33 फीट) मोटे</strong> हैं — एक तीन मंज़िली इमारत जितने! ये अरबों बर्फ के टुकड़ों और चट्टानों से बने हैं — कुछ धूल के कण जितने छोटे, कुछ एक पूरे घर जितने बड़े। ये टुकड़े 70,000 किमी/घंटा की रफ्तार से शनि का चक्कर लगाते हैं।
                   </p>
                 </div>
              </div>
           </div>
        </section>

        {/* SECTION 4: RING GAPS (03 छल्लों के रहस्यमय गैप) */}
        <section className="relative w-full py-20 lg:py-32 bg-[#020509] overflow-hidden px-4 sm:px-8">
           <div className="absolute inset-0 z-0">
             <Image src="/universe/planets/saturn/bg03_saturn_cassini_division.webp" alt="Cassini Division gap in rings" fill className="object-cover opacity-80" />
             <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>
           </div>
           <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 items-center relative z-10 gap-12">
              <div className="lg:col-span-6 order-2 lg:order-2 flex flex-col gap-6 lg:gap-8 justify-center">
                 <div className="flex items-center gap-4 sm:gap-6 justify-start lg:justify-end">
                   <div className="flex flex-col text-left lg:text-right w-full">
                     <div className="w-[50px] sm:w-[80px] h-[2px] bg-white/40 mb-2 sm:mb-4 lg:self-end"></div>
                     <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.1em] uppercase">छल्लों के रहस्यमय गैप</h2>
                   </div>
                   <span className="text-[70px] sm:text-[100px] lg:text-[140px] font-bold text-white/30 leading-none">03</span>
                 </div>

                 <div className="text-gray-200 text-lg sm:text-xl font-light leading-relaxed space-y-6 bg-black/80 p-6 sm:p-10 rounded-3xl backdrop-blur-md border border-white/10 text-left lg:text-right lg:ml-auto max-w-2xl shadow-2xl">
                    <p>
                      शनि के छल्ले एक सतत चादर नहीं हैं — इनमें कई रहस्यमय खाली जगहें (gaps) हैं। सबसे मशहूर &apos;कैसिनी डिवीज़न&apos; (Cassini Division) है — 4,800 किलोमीटर चौड़ा एक विशाल अंधेरा गैप जो दो मुख्य छल्लों (A और B) के बीच में है।
                    </p>
                    <p>
                      ये गैप खाली नहीं हैं — इनमें बहुत कम मात्रा में धूल और बर्फ मौजूद है। ये गैप शनि के चाँदों की गुरुत्वाकर्षण खिंचाव से बनते हैं — खासकर <strong>Mimas</strong> चाँद की gravity कैसिनी डिवीज़न में मौजूद हर कण को बार-बार खींचकर बाहर फेंक देती है, जिससे यह गैप हमेशा खाली बना रहता है। इन्हें &apos;Shepherd Moons&apos; (चरवाहा चाँद) कहते हैं।
                    </p>
                 </div>
              </div>
           </div>
        </section>

        {/* SECTION 5: TITAN (04 टाइटन — दूसरी पृथ्वी?) */}
        <section className="relative w-full py-20 lg:py-32 bg-[#010204] overflow-hidden flex flex-col justify-center px-4 sm:px-8">
          <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 items-center relative z-10 gap-12 lg:gap-24">
            <div className="order-2 lg:order-1 w-full relative z-10 flex items-center justify-center">
              <div className="relative w-full aspect-square max-w-[600px] group rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                 <Image src="/universe/planets/saturn/bg04_saturn_titan.webp" alt="Titan — Saturn's largest moon with methane lakes" fill className="object-cover opacity-100 group-hover:scale-105 transition-transform duration-1000" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30"></div>
              </div>
            </div>
            <div className="flex flex-col gap-6 lg:gap-8 order-1 lg:order-2 relative z-20">
               <div className="flex items-center gap-4 sm:gap-6">
                 <span className="text-[70px] sm:text-[100px] lg:text-[140px] font-bold text-orange-400/30 leading-none drop-shadow-2xl">04</span>
                 <div className="flex flex-col">
                   <div className="w-[50px] sm:w-[80px] h-[2px] bg-orange-400/60 mb-2 sm:mb-4"></div>
                   <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.1em] uppercase">टाइटन — दूसरी पृथ्वी?</h2>
                 </div>
               </div>
               <div className="lg:pl-[120px] space-y-6 text-gray-200 text-lg sm:text-xl font-light leading-relaxed max-w-2xl">
                 <p>
                   शनि का सबसे बड़ा चाँद <strong>टाइटन (Titan)</strong> पूरे सौरमंडल में पृथ्वी के बाद इकलौता ऐसा पिंड है जिसकी सतह पर तरल पदार्थ की नदियाँ, झीलें और समंदर मौजूद हैं! लेकिन ये पानी नहीं — ये <strong>तरल मीथेन और ईथेन</strong> (liquid methane/ethane) से बने हैं।
                 </p>
                 <p>
                   टाइटन के पास एक घना नारंगी वायुमंडल है जो पृथ्वी से भी ज़्यादा मोटा है — मुख्य रूप से नाइट्रोजन गैस से बना, बिल्कुल हमारी पृथ्वी की तरह! यहाँ मीथेन की बारिश होती है, मीथेन की नदियाँ बहती हैं, और विशाल मीथेन के समंदर लहराते हैं। वैज्ञानिक मानते हैं कि टाइटन शायद वैसा ही दिखता है <strong>जैसी हमारी पृथ्वी अरबों साल पहले दिखती थी</strong> — जीवन पनपने से ठीक पहले।
                 </p>
               </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: HEXAGON STORM (05 उत्तरी ध्रुव का षट्कोण) */}
        <section className="relative w-full py-20 lg:py-32 min-h-[700px] overflow-hidden px-4 sm:px-8 bg-black">
           <div className="absolute inset-0 z-0">
             <Image src="/universe/planets/saturn/bg05_saturn_hexagon.webp" alt="Saturn north pole hexagonal storm" fill className="object-cover opacity-90" />
             <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>
           </div>
           <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 items-center relative z-10 gap-12">
              <div className="flex flex-col gap-6 lg:gap-8 relative z-20">
                 <div className="flex items-center gap-4 sm:gap-6">
                   <span className="text-[70px] sm:text-[100px] lg:text-[140px] font-bold text-cyan-400/20 leading-none">05</span>
                   <div className="flex flex-col">
                     <div className="w-[50px] sm:w-[80px] h-[2px] bg-cyan-400/60 mb-2 sm:mb-4"></div>
                     <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.1em] uppercase">उत्तरी ध्रुव का षट्कोण</h2>
                   </div>
                 </div>
                 <div className="lg:ml-[120px] space-y-6 text-gray-100 text-lg sm:text-xl font-light leading-relaxed max-w-2xl bg-black/80 p-6 sm:p-10 rounded-3xl backdrop-blur-md border border-white/10 shadow-2xl">
                   <p className="text-shadow-md">
                     शनि के उत्तरी ध्रुव पर एक ऐसी चीज़ मौजूद है जो पूरे ब्रह्मांड में कहीं और नहीं देखी गई — एक विशाल <strong>षट्कोण (Hexagon)</strong> आकार का तूफ़ान! यह परफेक्ट छह-भुजा वाली ज्यामितीय आकृति लगभग 30,000 किलोमीटर चौड़ी है — इसके अंदर <strong>चार पृथ्वियाँ</strong> आराम से फिट हो जाएँ।
                   </p>
                   <p className="text-shadow-md">
                     यह हेक्सागन कोई स्थिर संरचना नहीं — यह एक ज़बरदस्त तूफ़ान है जिसके अंदर हवाएँ 320 किमी/घंटा की रफ्तार से चलती हैं। वैज्ञानिक आज तक पूरी तरह नहीं समझ पाए कि प्रकृति में इतनी सटीक ज्यामितीय आकृति कैसे बन गई। यह <strong>सौरमंडल के सबसे बड़े अनसुलझे रहस्यों</strong> में से एक है।
                   </p>
                 </div>
              </div>
           </div>
        </section>

        {/* SECTION 7: ENCELADUS (06 एन्सेलेडस — बर्फीला फव्वारा) */}
        <section className="relative w-full py-20 lg:py-32 bg-[#020509] overflow-hidden px-4 sm:px-8">
           <div className="absolute inset-0 z-0 flex justify-end pointer-events-none">
             <Image src="/universe/planets/saturn/bg06_saturn_enceladus.webp" alt="Enceladus water geysers" fill className="object-cover opacity-70" />
             <div className="absolute inset-0 bg-gradient-to-l from-[#020509]/20 via-[#020509]/60 to-[#020509]"></div>
           </div>
           <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 items-center relative z-10 gap-12">
              <div className="lg:col-span-6 lg:col-start-7 order-2 lg:order-2 flex flex-col gap-6 lg:gap-8 justify-center">
                 <div className="flex items-center gap-4 sm:gap-6 lg:flex-row-reverse text-right">
                   <div className="flex flex-col items-end">
                     <div className="w-[50px] sm:w-[80px] h-[2px] bg-blue-400/60 mb-2 sm:mb-4"></div>
                     <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.1em] uppercase text-white">एन्सेलेडस — बर्फीला फव्वारा</h2>
                   </div>
                   <span className="text-[70px] sm:text-[100px] lg:text-[140px] font-bold text-blue-400/20 leading-none">06</span>
                 </div>
                 <div className="space-y-6 text-gray-200 text-lg sm:text-xl font-light leading-relaxed bg-black/80 p-6 sm:p-10 rounded-3xl backdrop-blur-md border border-white/10 text-left lg:text-right max-w-2xl lg:ml-auto shadow-2xl">
                    <p>
                      शनि का छोटा चाँद <strong>एन्सेलेडस (Enceladus)</strong> — सिर्फ 500 किमी चौड़ा — अंतरिक्ष विज्ञान का सुपरस्टार बन चुका है। Cassini अंतरिक्ष यान ने खोजा कि इसके दक्षिणी ध्रुव की बर्फीली दरारों (Tiger Stripes) से <strong>विशाल पानी के फव्वारे</strong> सैकड़ों किलोमीटर ऊँचाई तक अंतरिक्ष में उगलते हैं!
                    </p>
                    <p>
                      ये फव्वारे सिर्फ पानी नहीं — इनमें नमक, ऑर्गेनिक मॉलिक्यूल्स, और हाइड्रोजन गैस मिली है। इसका मतलब है कि एन्सेलेडस की बर्फ के नीचे एक <strong>गर्म खारे पानी का समंदर</strong> है जहाँ हाइड्रोथर्मल वेंट्स सक्रिय हैं — ठीक वैसे ही जैसे पृथ्वी के गहरे समंदर में जीवन पनपता है। यह बृहस्पति के यूरोपा के साथ <strong>एलियन जीवन खोजने की सबसे संभावित जगह</strong> है।
                    </p>
                 </div>
              </div>
           </div>
        </section>

        {/* SECTION 8: WINDS (07 सबसे तेज़ हवाएँ) */}
        <section className="relative w-full py-20 lg:py-32 bg-[#010204] overflow-hidden flex flex-col justify-center px-4 sm:px-8">
          <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 items-center relative z-10 gap-12 lg:gap-24">
            <div className="order-2 lg:order-1 w-full relative z-10 flex items-center justify-center">
              <div className="relative w-full aspect-[4/3] max-w-[600px] rounded-3xl overflow-hidden group shadow-2xl border border-white/10">
                 <Image src="/universe/planets/saturn/bg07_saturn_winds.webp" alt="Saturn extreme wind bands" fill className="object-cover opacity-100 group-hover:scale-105 transition-transform duration-1000" />
                 <div className="absolute inset-0 bg-black/30 z-10"></div>
              </div>
            </div>
            <div className="flex flex-col gap-6 lg:gap-8 order-1 lg:order-2 relative z-20">
               <div className="flex items-center gap-4 sm:gap-6">
                 <span className="text-[70px] sm:text-[100px] lg:text-[140px] font-bold text-yellow-500/20 leading-none drop-shadow-2xl">07</span>
                 <div className="flex flex-col">
                   <div className="w-[50px] sm:w-[80px] h-[2px] bg-yellow-500/60 mb-2 sm:mb-4"></div>
                   <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.1em] uppercase">सबसे तेज़ हवाएँ</h2>
                 </div>
               </div>
               <div className="lg:pl-[120px] space-y-6 text-gray-200 text-lg sm:text-xl font-light leading-relaxed max-w-2xl">
                 <p>
                   शनि ग्रह पर सौरमंडल की सबसे तेज़ हवाएँ चलती हैं। भूमध्यरेखा (equator) के पास हवा की रफ्तार <strong>1,800 किलोमीटर प्रति घंटा</strong> तक पहुँच जाती है — पृथ्वी के सबसे भयानक तूफ़ान से 6 गुना ज़्यादा तेज़, और ध्वनि की गति (speed of sound) से भी ज़्यादा!
                 </p>
                 <p>
                   ये हवाएँ इसलिए इतनी तेज़ हैं क्योंकि शनि अपनी धुरी पर बेहद तेज़ी से घूमता है — हर 10.7 घंटे में एक चक्कर। इतनी तेज़ रोटेशन से कोरिओलिस बल (Coriolis force) बहुत शक्तिशाली हो जाता है, जो गैसों को विशाल क्षैतिज धाराओं में बाँध देता है। ये हवाएँ शनि की सतह पर सोने और मटमैले रंग की खूबसूरत पट्टियाँ बनाती हैं।
                 </p>
               </div>
            </div>
          </div>
        </section>

        {/* SECTION 9: CASSINI MISSION (08 कैसिनी — महान यात्रा) */}
        <section className="relative w-full py-20 lg:py-32 min-h-[700px] overflow-hidden px-4 sm:px-8 bg-black">
           <div className="absolute inset-0 z-0">
             <Image src="/universe/planets/saturn/bg08_saturn_cassini.webp" alt="Cassini spacecraft at Saturn" fill className="object-cover opacity-90" />
             <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>
           </div>
           <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 items-center relative z-10 gap-12">
              <div className="flex flex-col gap-6 lg:gap-8 relative z-20">
                 <div className="flex items-center gap-4 sm:gap-6">
                   <span className="text-[70px] sm:text-[100px] lg:text-[140px] font-bold text-violet-500/20 leading-none">08</span>
                   <div className="flex flex-col">
                     <div className="w-[50px] sm:w-[80px] h-[2px] bg-violet-500/60 mb-2 sm:mb-4"></div>
                     <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.1em] uppercase text-white">कैसिनी — महान यात्रा</h2>
                   </div>
                 </div>
                 <div className="lg:ml-[120px] space-y-6 text-gray-100 text-lg sm:text-xl font-light leading-relaxed max-w-2xl bg-black/80 p-6 sm:p-10 rounded-3xl backdrop-blur-md border border-white/10 shadow-2xl">
                   <p className="text-shadow-md">
                     <strong>Cassini-Huygens</strong> मिशन अंतरिक्ष अन्वेषण के इतिहास का सबसे सफल और भव्य मिशनों में से एक था। 1997 में लॉन्च हुआ यह यान 7 साल की यात्रा के बाद 2004 में शनि की कक्षा में पहुँचा और 13 साल तक इस अद्भुत ग्रह का अध्ययन किया।
                   </p>
                   <p className="text-shadow-md">
                     2017 में जब Cassini का ईंधन ख़त्म होने लगा तो NASA ने इसे शनि और उसके छल्लों के बीच की संकरी जगह से 22 बार गुज़ारा — &apos;Grand Finale&apos; — और अंत में <strong>शनि के वायुमंडल में उतार दिया जहाँ यह जलकर ख़त्म हो गया।</strong> ऐसा इसलिए किया गया ताकि Cassini गलती से टाइटन या एन्सेलेडस पर गिरकर वहाँ के संभावित जीवन को दूषित न कर दे। यह विज्ञान का सबसे भव्य और भावनात्मक विदाई था।
                   </p>
                 </div>
              </div>
           </div>
        </section>

        {/* SECTION 10: RINGS DISAPPEARING (09 छल्ले ग़ायब हो रहे हैं!) */}
        <section className="relative w-full py-20 lg:py-32 bg-[#020509] overflow-hidden px-4 sm:px-8 border-b border-white/5">
           <div className="absolute inset-0 z-0">
             <Image src="/universe/planets/saturn/bg09_saturn_rings_vanishing.webp" alt="Saturn losing its rings" fill className="object-cover opacity-80" />
             <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>
           </div>
           <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 items-center relative z-10 gap-12">
              <div className="lg:col-span-8 lg:col-start-5 order-2 lg:order-2 flex flex-col gap-6 lg:gap-8 justify-center z-20">
                 <div className="flex items-center gap-4 sm:gap-6 justify-start lg:justify-end">
                   <div className="flex flex-col text-left lg:text-right w-full">
                     <div className="w-[50px] sm:w-[80px] h-[2px] bg-rose-400/60 mb-2 sm:mb-4 lg:self-end"></div>
                     <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.1em] uppercase">छल्ले ग़ायब हो रहे हैं!</h2>
                   </div>
                   <span className="text-[70px] sm:text-[100px] lg:text-[140px] font-bold text-rose-400/20 leading-none">09</span>
                 </div>
                 <div className="text-gray-200 text-lg sm:text-xl font-light leading-relaxed space-y-6 bg-black/80 p-6 sm:p-10 rounded-3xl backdrop-blur-md border border-white/10 text-left lg:text-right lg:ml-auto max-w-3xl shadow-2xl">
                    <p className="text-shadow-md">
                      यह सुनकर दिल टूट सकता है — शनि के ये भव्य छल्ले हमेशा के लिए नहीं रहेंगे। NASA के वैज्ञानिकों ने खोजा है कि शनि की गुरुत्वाकर्षण शक्ति धीरे-धीरे छल्लों की बर्फ को अपनी ओर खींच रही है। यह बर्फ शनि के वायुमंडल में &apos;Ring Rain&apos; (छल्लों की बारिश) के रूप में गिर रही है।
                    </p>
                    <p className="text-shadow-md">
                      हर 30 मिनट में इतनी बर्फ शनि में गिर रही है कि उससे एक ओलंपिक स्विमिंग पूल भर जाए। इस रफ्तार से <strong>लगभग 10 से 30 करोड़ साल में शनि के सभी छल्ले पूरी तरह ग़ायब हो जाएँगे।</strong> हम इंसान बेहद भाग्यशाली हैं कि हम उस दौर में जी रहे हैं जब ये छल्ले अपने सबसे शानदार रूप में मौजूद हैं। ब्रह्मांड के पैमाने पर, यह नज़ारा क्षणभंगुर है।
                    </p>
                 </div>
              </div>
           </div>
        </section>

        {/* YOUTUBE FEATURED VIDEO */}
        <FeaturedVideo videoId="xVQEHip7Z4s" />

        {/* RELATED PLANETS WIDGET */}
        <NextPlanets currentPlanetId="saturn" />

        {/* RELATED TOOLS SECTION */}
        <section className="bg-[#020509] border-t border-white/5 py-16 lg:py-24">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Explore More Space Tools</h2>
                <p className="text-gray-400 text-sm md:text-base">Continue your interactive journey across the cosmos.</p>
              </div>
              <Link href="/tools" className="mt-4 md:mt-0 text-amber-400 font-bold hover:text-amber-300 transition-colors uppercase text-xs tracking-wider">
                VIEW ALL TOOLS &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
              {[
                { title: "Space Age Calculator", desc: "How old are you on Saturn or Neptune?", img: "/tools/tool-hero-bac1.webp", link: "/tools/space-age" },
                { title: "Escape Velocity Tool", desc: "Calculate the speed needed to leave any planet.", img: "/tools/tool2.webp", link: "/tools/escape-velocity" },
                { title: "Orbit Simulator", desc: "Play with gravity by simulating orbital physics.", img: "/tools/tool3.png", link: "/tools/orbit-simulator" }
              ].map((tool, i) => (
                <Link href={tool.link} key={i} className="group block">
                  <div className="bg-[#050a12] border border-white/5 rounded-[2rem] overflow-hidden shadow-lg hover:border-white/20 transition-all duration-300 hover:-translate-y-1">
                    <div className="h-48 overflow-hidden relative">
                       <img src={tool.img} alt={tool.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80" />
                       <div className="absolute inset-0 bg-gradient-to-t from-[#050a12] via-[#050a12]/40 to-transparent" />
                    </div>
                    <div className="p-6 pt-0 relative z-10">
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">{tool.title}</h3>
                      <p className="text-gray-400 text-sm">{tool.desc}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* SUBSCRIBE CTA WIDGET */}
        <section className="bg-[#020509] pb-20">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
            <div className="relative overflow-hidden flex flex-col items-center justify-center text-center p-8 md:p-16 border border-white/10 rounded-[3rem] group">
              <div className="absolute inset-0 bg-black/70 z-10" />

              <img
                src="/tools/tool2.webp"
                alt="Space Subscribe Background"
                className="absolute inset-0 w-full h-full object-cover grayscale-[30%] opacity-60 transition-all duration-1000 group-hover:scale-105"
              />

              <div className="relative z-20 max-w-2xl px-4 w-full">
                <h2 className="text-3xl md:text-5xl font-black mb-4 text-white leading-tight">
                  Unravel The Universe In Your Inbox
                </h2>
                <p className="text-base md:text-lg text-gray-300 mb-8 max-w-lg mx-auto">
                  Get astrophysical deep-dives, tool updates, and spectacular phenomena delivered to you.
                </p>

                <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto w-full" onSubmit={(e) => e.preventDefault()}>
                  <input
                    type="email"
                    placeholder="Your email"
                    className="flex-1 px-6 py-4 rounded-full bg-white/5 backdrop-blur-md border border-white/20 text-white placeholder:text-gray-400 outline-none focus:border-amber-500 transition-all text-base w-full shadow-inner"
                  />
                  <button className="bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-gray-200 transition-all text-sm uppercase tracking-widest whitespace-nowrap">
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
