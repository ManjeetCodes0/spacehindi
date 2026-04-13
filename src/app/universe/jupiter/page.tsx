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

export default function JupiterCustomPage() {
  const { lang } = useLang();
  const body = getCelestialBody("jupiter");
  if (!body) notFound();

  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const heroImages = [
    "/universe/planets/jupiter/jupiter1.png",
    "/universe/planets/jupiter/jupiter_art1.webp",
    "/universe/planets/jupiter/jupiter_art2.webp"
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
            {/* Left Content: Title and Intro */}
            <div className="w-full lg:w-[55%] flex flex-col items-start text-left z-20 pt-2 lg:pt-4">
              <h1 className="text-[15vw] lg:text-[6.5rem] xl:text-[8.5rem] font-bold tracking-[0.02em] uppercase text-white leading-none whitespace-nowrap drop-shadow-xl" style={{ fontFamily: "Arial, sans-serif" }}>
                 JUPITER
              </h1>
              <p className="mt-6 lg:mt-8 text-lg sm:text-xl xl:text-2xl leading-relaxed text-gray-200 font-light max-w-xl" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.8)" }}>
                बृहस्पति (Jupiter) — सौरमंडल का सबसे विशाल और शक्तिशाली ग्रह, जिसे &apos;ग्रहों का राजा&apos; कहा जाता है। इसके अंदर 1,300 से ज़्यादा पृथ्वियाँ समा सकती हैं और इसकी भयानक गुरुत्वाकर्षण शक्ति पूरे सौरमंडल को नियंत्रित करती है।
              </p>

              {/* Stats Grid */}
              <div className="w-full grid grid-cols-2 gap-x-4 sm:gap-x-8 gap-y-6 sm:gap-y-8 pt-8 sm:pt-12 mt-6 sm:mt-10 border-t border-white/20">
                <div className="flex flex-col gap-1 sm:gap-3">
                  <span className="text-[10px] sm:text-xs tracking-[0.1em] text-white/70 uppercase font-semibold">दिन (Day)</span>
                  <span className="text-xl sm:text-2xl lg:text-3xl font-light">9.9 घंटे</span>
                </div>
                <div className="flex flex-col gap-1 sm:gap-3">
                  <span className="text-[10px] sm:text-xs tracking-[0.1em] text-white/70 uppercase font-semibold">व्यास (Diameter)</span>
                  <span className="text-xl sm:text-2xl lg:text-3xl font-light">1,39,820 किमी</span>
                </div>
                <div className="flex flex-col gap-1 sm:gap-3">
                  <span className="text-[10px] sm:text-xs tracking-[0.1em] text-white/70 uppercase font-semibold">चाँद (Moons)</span>
                  <span className="text-xl sm:text-2xl lg:text-3xl font-light">95 (ज्ञात)</span>
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

                 {/* Background Glowing Rings — Jupiter themed (Amber/Gold) */}
                 <div className="absolute w-[120%] h-[120%] bg-amber-500/15 rounded-full blur-[70px] xl:blur-[90px] pointer-events-none z-0 transition-opacity duration-1000"></div>
                 <div className="absolute w-[85%] h-[85%] rounded-full border border-amber-500/25 pointer-events-none z-0 animate-pulse"></div>
                 <div className="absolute w-[110%] h-[110%] rounded-full border border-orange-400/15 border-dashed animate-[spin_25s_linear_infinite] pointer-events-none z-0"></div>
                 <div className="absolute w-[135%] h-[135%] rounded-full border border-white/5 pointer-events-none z-0"></div>

                 {heroImages.map((src, index) => (
                    <Image
                      key={src}
                      src={src}
                      alt={`बृहस्पति ग्रह (Jupiter Planet) Visual ${index + 1}`}
                      fill
                      className={`object-contain drop-shadow-[0_0_80px_rgba(245,158,11,0.2)] transition-all duration-[1500ms] ease-in-out ${
                        currentHeroImage === index ? "opacity-100 scale-100" : "opacity-0 scale-95"
                      }`}
                      priority={index === 0}
                    />
                 ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: BASIC INFO (01 ग्रहों का राजा) */}
        <section className="relative w-full py-20 lg:py-32 bg-[#050a12] overflow-hidden flex flex-col justify-center px-4 sm:px-8">
          <div className="absolute top-0 right-0 w-full h-full z-0 opacity-30 pointer-events-none bg-gradient-to-l from-amber-900/10 to-transparent"></div>
          <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 items-center relative z-10 gap-12 lg:gap-24">
            <div className="flex flex-col gap-6 lg:gap-8 order-2 lg:order-1 relative z-20">
               <div className="flex items-center gap-4 sm:gap-6">
                 <span className="text-[70px] sm:text-[100px] lg:text-[140px] font-bold text-[#b4b4bb] leading-none drop-shadow-2xl opacity-50">01</span>
                 <div className="flex flex-col">
                   <div className="w-[50px] sm:w-[80px] h-[2px] bg-white/60 mb-2 sm:mb-4"></div>
                   <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.1em] uppercase">ग्रहों का राजा</h2>
                 </div>
               </div>
               <div className="lg:pl-[120px] space-y-6 text-gray-200 text-lg sm:text-xl font-light leading-relaxed max-w-2xl">
                 <p>
                   बृहस्पति इतना विशाल है कि सौरमंडल के बाकी सभी ग्रहों को मिला दें तो भी बृहस्पति उनसे ढाई गुना भारी रहेगा! इसका व्यास (diameter) लगभग 1,39,820 किलोमीटर है — पृथ्वी का 11 गुना।
                 </p>
                 <p>
                   लेकिन सबसे हैरान करने वाली बात यह है कि इतना विशाल होते हुए भी बृहस्पति के पास कोई ठोस ज़मीन (solid surface) नहीं है। यह पूरी तरह से गैसों — 90% हाइड्रोजन और 10% हीलियम — से बना है। अगर आप इसमें गिरें तो नीचे उतरते जाएँगे — गैस से तरल में, तरल से धातु में — लेकिन कहीं कोई ज़मीन नहीं मिलेगी।
                 </p>
               </div>
            </div>
            <div className="order-1 lg:order-2 w-full relative z-10 flex items-center justify-center">
              <div className="relative w-full aspect-square max-w-[500px] rounded-[30px] overflow-hidden group">
                 <div className="absolute inset-0 z-0 shadow-inner">
                    <Image src="/universe/planets/jupiter/bg01_jupiter_king.webp" alt="Jupiter — King of Planets" fill className="object-cover opacity-100 contrast-125 saturate-50 scale-110 group-hover:scale-105 transition-transform duration-1000" />
                    <div className="absolute inset-0 bg-gradient-to-bl from-transparent to-[#050a12]/50 z-10"></div>
                 </div>
                 <div className="relative w-[80%] h-[80%] m-[10%] z-20 group-hover:scale-[1.02] transition-transform duration-700">
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: GREAT RED SPOT (02 महान लाल धब्बा) */}
        <section className="relative w-full py-20 lg:py-32 min-h-[700px] overflow-hidden px-4 sm:px-8 bg-black">
           <div className="absolute inset-0 z-0">
             <Image src="/universe/planets/jupiter/bg02_jupiter_red_spot.webp" alt="Great Red Spot storm" fill className="object-cover opacity-90" />
             <div className="absolute inset-0 bg-black/30 pointer-events-none"></div>
           </div>
           <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 items-center relative z-10 gap-12">
              <div className="hidden lg:block order-1"></div>
              <div className="flex flex-col gap-6 lg:gap-8 order-2 lg:order-1 relative z-20">
                 <div className="flex items-center gap-4 sm:gap-6">
                   <span className="text-[70px] sm:text-[100px] lg:text-[140px] font-bold text-red-500/30 leading-none">02</span>
                   <div className="flex flex-col">
                     <div className="w-[50px] sm:w-[80px] h-[2px] bg-red-500/80 mb-2 sm:mb-4"></div>
                     <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.1em] uppercase text-white">महान लाल धब्बा</h2>
                   </div>
                 </div>
                 <div className="lg:ml-[120px] space-y-6 text-gray-100 text-lg sm:text-xl font-light leading-relaxed max-w-2xl bg-black/70 p-6 sm:p-10 rounded-3xl backdrop-blur-md border border-white/10 shadow-2xl">
                   <p className="text-shadow-md">
                     बृहस्पति पर एक विशाल तूफ़ान 350 से ज़्यादा सालों से लगातार गरज रहा है — इसे &apos;Great Red Spot&apos; (महान लाल धब्बा) कहते हैं। यह तूफ़ान इतना बड़ा है कि इसके अंदर <strong>पूरी पृथ्वी को दो बार से ज़्यादा फिट किया जा सकता है!</strong>
                   </p>
                   <p className="text-shadow-md">
                     इसके अंदर हवाएँ 680 किलोमीटर प्रति घंटे की रफ़्तार से चलती हैं — पृथ्वी के सबसे भयानक तूफ़ान से भी कई गुना तेज़। इस तूफ़ान का लाल रंग शायद सूरज की पराबैंगनी किरणों (UV rays) से टूटते रासायनिक यौगिकों (chemical compounds) की वजह से है, लेकिन वैज्ञानिक आज तक इसके सटीक कारण का पता नहीं लगा पाए हैं।
                   </p>
                 </div>
              </div>
           </div>
        </section>

        {/* SECTION 4: CLOUD BANDS (03 रंगीन बादलों की पट्टियाँ) */}
        <section className="relative w-full py-20 lg:py-32 bg-[#020509] overflow-hidden px-4 sm:px-8">
           <div className="absolute inset-0 z-0">
             <Image src="/universe/planets/jupiter/bg03_jupiter_bands.webp" alt="Jupiter cloud bands" fill className="object-cover opacity-80" />
             <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>
           </div>
           <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 items-center relative z-10 gap-12">
              <div className="lg:col-span-6 order-2 lg:order-2 flex flex-col gap-6 lg:gap-8 justify-center">
                 <div className="flex items-center gap-4 sm:gap-6 justify-start lg:justify-end">
                   <div className="flex flex-col text-left lg:text-right w-full">
                     <div className="w-[50px] sm:w-[80px] h-[2px] bg-amber-400/40 mb-2 sm:mb-4 lg:self-end"></div>
                     <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.1em] uppercase">रंगीन बादलों की पट्टियाँ</h2>
                   </div>
                   <span className="text-[70px] sm:text-[100px] lg:text-[140px] font-bold text-amber-400/30 leading-none">03</span>
                 </div>

                 <div className="text-gray-200 text-lg sm:text-xl font-light leading-relaxed space-y-6 bg-black/80 p-6 sm:p-10 rounded-3xl backdrop-blur-md border border-white/10 text-left lg:text-right lg:ml-auto max-w-2xl shadow-2xl">
                    <p>
                      बृहस्पति की सतह पर जो खूबसूरत भूरी, सफ़ेद, नारंगी और लाल रंग की धारियाँ दिखती हैं, वे असल में अमोनिया और पानी के बर्फीले बादलों की विशाल पट्टियाँ (bands) हैं जो अलग-अलग ऊँचाइयों और तापमान पर बहती हैं।
                    </p>
                    <p>
                      हल्के रंग की पट्टियाँ &apos;Zones&apos; कहलाती हैं — जहाँ गैस ऊपर उठती है, और गहरे रंग की पट्टियाँ &apos;Belts&apos; — जहाँ गैस नीचे गिरती है। ये पट्टियाँ एक-दूसरे के विपरीत दिशा में बहती हैं और जहाँ मिलती हैं वहाँ <strong>भयानक तूफ़ान और भँवर (vortices)</strong> पैदा होते हैं जो हज़ारों किलोमीटर तक फैले होते हैं।
                    </p>
                 </div>
              </div>
           </div>
        </section>

        {/* SECTION 5: COSMIC SHIELD (04 पृथ्वी का रक्षक) */}
        <section className="relative w-full py-20 lg:py-32 bg-[#010204] overflow-hidden flex flex-col justify-center px-4 sm:px-8">
          <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 items-center relative z-10 gap-12 lg:gap-24">
            <div className="order-2 lg:order-1 w-full relative z-10 flex items-center justify-center">
              <div className="relative w-full aspect-square max-w-[600px] group rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                 <Image src="/universe/planets/jupiter/bg04_jupiter_shield.webp" alt="Jupiter deflecting asteroids" fill className="object-cover opacity-100 group-hover:scale-105 transition-transform duration-1000" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30"></div>
              </div>
            </div>
            <div className="flex flex-col gap-6 lg:gap-8 order-1 lg:order-2 relative z-20">
               <div className="flex items-center gap-4 sm:gap-6">
                 <span className="text-[70px] sm:text-[100px] lg:text-[140px] font-bold text-blue-500/30 leading-none drop-shadow-2xl">04</span>
                 <div className="flex flex-col">
                   <div className="w-[50px] sm:w-[80px] h-[2px] bg-blue-500/60 mb-2 sm:mb-4"></div>
                   <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.1em] uppercase">पृथ्वी का रक्षक</h2>
                 </div>
               </div>
               <div className="lg:pl-[120px] space-y-6 text-gray-200 text-lg sm:text-xl font-light leading-relaxed max-w-2xl">
                 <p>
                   बृहस्पति सिर्फ सबसे बड़ा ग्रह नहीं है — यह हमारी पृथ्वी का &apos;Cosmic Bodyguard&apos; (ब्रह्मांडीय अंगरक्षक) भी है। इसकी भयानक गुरुत्वाकर्षण शक्ति एक विशाल &apos;Vacuum Cleaner&apos; (वैक्यूम क्लीनर) की तरह काम करती है।
                 </p>
                 <p>
                   अंतरिक्ष से पृथ्वी की तरफ़ आने वाले ख़तरनाक क्षुद्रग्रहों (asteroids) और धूमकेतुओं (comets) को बृहस्पति अपनी ताकतवर gravity से या तो अपनी ओर खींच लेता है, या उनकी दिशा मोड़कर सौरमंडल से बाहर फेंक देता है। 1994 में <strong>Shoemaker-Levy 9</strong> धूमकेतु बृहस्पति से सीधा टकराया — अगर यह पृथ्वी से टकराता तो विनाश हो जाता। बृहस्पति ने वह प्रहार अपने ऊपर ले लिया।
                 </p>
               </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: GALILEAN MOONS (05 गैलीलियो के चार चाँद) */}
        <section className="relative w-full py-20 lg:py-32 min-h-[700px] overflow-hidden px-4 sm:px-8 bg-black">
           <div className="absolute inset-0 z-0">
             <Image src="/universe/planets/jupiter/bg05_jupiter_galilean_moons.webp" alt="Galilean moons — Io, Europa, Ganymede, Callisto" fill className="object-cover opacity-90" />
             <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>
           </div>
           <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 items-center relative z-10 gap-12">
              <div className="flex flex-col gap-6 lg:gap-8 relative z-20">
                 <div className="flex items-center gap-4 sm:gap-6">
                   <span className="text-[70px] sm:text-[100px] lg:text-[140px] font-bold text-yellow-500/20 leading-none">05</span>
                   <div className="flex flex-col">
                     <div className="w-[50px] sm:w-[80px] h-[2px] bg-yellow-500/60 mb-2 sm:mb-4"></div>
                     <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.1em] uppercase">गैलीलियो के चार चाँद</h2>
                   </div>
                 </div>
                 <div className="lg:ml-[120px] space-y-6 text-gray-100 text-lg sm:text-xl font-light leading-relaxed max-w-2xl bg-black/80 p-6 sm:p-10 rounded-3xl backdrop-blur-md border border-white/10 shadow-2xl">
                   <p className="text-shadow-md">
                     1610 में महान वैज्ञानिक गैलीलियो गैलीली ने अपनी दूरबीन से बृहस्पति के चार सबसे बड़े चाँद खोजे — <strong>Io (आयो), Europa (यूरोपा), Ganymede (गेनीमीड), और Callisto (कैलिस्टो)</strong>। इस खोज ने साबित कर दिया कि सब कुछ पृथ्वी के चक्कर नहीं लगाता — और खगोलविज्ञान हमेशा के लिए बदल गया।
                   </p>
                   <p className="text-shadow-md">
                     इनमें <strong>गेनीमीड</strong> सौरमंडल का सबसे बड़ा चाँद है — बुध ग्रह से भी बड़ा! <strong>आयो</strong> सबसे ज्वालामुखी-सक्रिय पिंड है जहाँ सैकड़ों ज्वालामुखी हर वक्त फटते रहते हैं। और <strong>यूरोपा</strong> — इसकी बर्फीली सतह के नीचे एक विशाल खारे पानी का समंदर छुपा है जहाँ एलियन जीवन की सबसे ज़्यादा उम्मीद है।
                   </p>
                 </div>
              </div>
           </div>
        </section>

        {/* SECTION 7: EUROPA (06 बर्फ के नीचे समंदर) */}
        <section className="relative w-full py-20 lg:py-32 bg-[#020509] overflow-hidden px-4 sm:px-8">
           <div className="absolute inset-0 z-0 flex justify-end pointer-events-none">
             <Image src="/universe/planets/jupiter/bg06_jupiter_europa.webp" alt="Europa subsurface ocean" fill className="object-cover opacity-70" />
             <div className="absolute inset-0 bg-gradient-to-l from-[#020509]/20 via-[#020509]/60 to-[#020509]"></div>
           </div>
           <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 items-center relative z-10 gap-12">
              <div className="lg:col-span-6 lg:col-start-7 order-2 lg:order-2 flex flex-col gap-6 lg:gap-8 justify-center">
                 <div className="flex items-center gap-4 sm:gap-6 lg:flex-row-reverse text-right">
                   <div className="flex flex-col items-end">
                     <div className="w-[50px] sm:w-[80px] h-[2px] bg-cyan-400/60 mb-2 sm:mb-4"></div>
                     <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.1em] uppercase text-white">बर्फ के नीचे समंदर</h2>
                   </div>
                   <span className="text-[70px] sm:text-[100px] lg:text-[140px] font-bold text-cyan-400/20 leading-none">06</span>
                 </div>
                 <div className="space-y-6 text-gray-200 text-lg sm:text-xl font-light leading-relaxed bg-black/80 p-6 sm:p-10 rounded-3xl backdrop-blur-md border border-white/10 text-left lg:text-right max-w-2xl lg:ml-auto shadow-2xl">
                    <p>
                      बृहस्पति का चाँद यूरोपा (Europa) अंतरिक्ष विज्ञान की सबसे रोमांचक जगहों में से एक है। इसकी सतह 15-25 किलोमीटर मोटी ठोस बर्फ की चादर से ढकी है, लेकिन उसके नीचे एक विशाल तरल खारे पानी का महासागर छुपा है।
                    </p>
                    <p>
                      वैज्ञानिकों का अनुमान है कि इस छुपे हुए समंदर में पृथ्वी के सभी महासागरों से <strong>दोगुने से भी ज़्यादा पानी</strong> है! बृहस्पति की ज़बरदस्त गुरुत्वाकर्षण खिंचाव से यूरोपा का अंदरूनी हिस्सा गर्म रहता है, जिससे समुद्र तल पर हाइड्रोथर्मल वेंट्स हो सकते हैं — ठीक वैसे ही जैसे पृथ्वी के गहरे समुद्र में जीवन पनपता है। NASA का <strong>Europa Clipper</strong> मिशन इसी रहस्य को सुलझाने के लिए भेजा गया है।
                    </p>
                 </div>
              </div>
           </div>
        </section>

        {/* SECTION 8: MAGNETIC FIELD & RADIATION (07 विनाशकारी विकिरण) */}
        <section className="relative w-full py-20 lg:py-32 bg-[#010204] overflow-hidden flex flex-col justify-center px-4 sm:px-8">
          <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 items-center relative z-10 gap-12 lg:gap-24">
            <div className="order-2 lg:order-1 w-full relative z-10 flex items-center justify-center">
              <div className="relative w-full aspect-[4/3] max-w-[600px] rounded-3xl overflow-hidden group shadow-2xl border border-white/10">
                 <Image src="/universe/planets/jupiter/bg07_jupiter_radiation.webp" alt="Jupiter radiation belts" fill className="object-cover opacity-100 group-hover:scale-105 transition-transform duration-1000" />
                 <div className="absolute inset-0 bg-black/30 z-10"></div>
              </div>
            </div>
            <div className="flex flex-col gap-6 lg:gap-8 order-1 lg:order-2 relative z-20">
               <div className="flex items-center gap-4 sm:gap-6">
                 <span className="text-[70px] sm:text-[100px] lg:text-[140px] font-bold text-purple-500/20 leading-none drop-shadow-2xl">07</span>
                 <div className="flex flex-col">
                   <div className="w-[50px] sm:w-[80px] h-[2px] bg-purple-500/60 mb-2 sm:mb-4"></div>
                   <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.1em] uppercase">विनाशकारी विकिरण</h2>
                 </div>
               </div>
               <div className="lg:pl-[120px] space-y-6 text-gray-200 text-lg sm:text-xl font-light leading-relaxed max-w-2xl">
                 <p>
                   बृहस्पति का चुम्बकीय क्षेत्र (magnetic field) पृथ्वी की तुलना में <strong>20,000 गुना ज़्यादा शक्तिशाली</strong> है — पूरे सौरमंडल में सबसे ताकतवर। यह सूरज से भी ज़्यादा शक्तिशाली radiation belts बनाता है।
                 </p>
                 <p>
                   इन radiation belts में फँसे charged particles इतनी ऊर्जा रखते हैं कि बृहस्पति के पास जाने वाले किसी भी अंतरिक्ष यान की इलेक्ट्रॉनिक्स को मिनटों में जला सकते हैं। NASA के <strong>Juno</strong> मिशन को इस विकिरण से बचने के लिए एक विशेष टाइटेनियम कवच (vault) में रखा गया है जो 200 किलो का है। बिना इस कवच के Juno कुछ ही घंटों में ख़त्म हो जाता।
                 </p>
               </div>
            </div>
          </div>
        </section>

        {/* SECTION 9: IO VOLCANO WORLD (08 आयो — ज्वालामुखियों का नर्क) */}
        <section className="relative w-full py-20 lg:py-32 min-h-[700px] overflow-hidden px-4 sm:px-8 bg-black">
           <div className="absolute inset-0 z-0">
             <Image src="/universe/planets/jupiter/bg08_jupiter_io.webp" alt="Io volcanic moon" fill className="object-cover opacity-90" />
             <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>
           </div>
           <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 items-center relative z-10 gap-12">
              <div className="flex flex-col gap-6 lg:gap-8 relative z-20">
                 <div className="flex items-center gap-4 sm:gap-6">
                   <span className="text-[70px] sm:text-[100px] lg:text-[140px] font-bold text-orange-600/20 leading-none">08</span>
                   <div className="flex flex-col">
                     <div className="w-[50px] sm:w-[80px] h-[2px] bg-orange-600/60 mb-2 sm:mb-4"></div>
                     <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.1em] uppercase text-white">आयो — ज्वालामुखियों का नर्क</h2>
                   </div>
                 </div>
                 <div className="lg:ml-[120px] space-y-6 text-gray-100 text-lg sm:text-xl font-light leading-relaxed max-w-2xl bg-black/80 p-6 sm:p-10 rounded-3xl backdrop-blur-md border border-white/10 shadow-2xl">
                   <p className="text-shadow-md">
                     बृहस्पति का सबसे नज़दीकी गैलिलियन चाँद &apos;आयो&apos; (Io) पूरे सौरमंडल का सबसे ज्वालामुखी-सक्रिय पिंड है। इसकी सतह पर 400 से ज़्यादा सक्रिय ज्वालामुखी हर वक़्त फटते रहते हैं!
                   </p>
                   <p className="text-shadow-md">
                     बृहस्पति की भयानक गुरुत्वाकर्षण शक्ति आयो को लगातार खींचती और दबाती रहती है (tidal heating) — जिससे इसका अंदरूनी हिस्सा हमेशा पिघला रहता है। यहाँ के ज्वालामुखी 500 किलोमीटर ऊँचाई तक गंधक (sulfur) के फव्वारे उगलते हैं। आयो की पूरी सतह पीले, नारंगी और लाल रंग के गंधक से ढकी है — यह दूर से किसी <strong>विशाल ज़हरीले पिज़्ज़ा</strong> जैसा दिखता है।
                   </p>
                 </div>
              </div>
           </div>
        </section>

        {/* SECTION 10: JUNO MISSION & RINGS (09 जूनो मिशन और छुपी हुई रिंग) */}
        <section className="relative w-full py-20 lg:py-32 bg-[#020509] overflow-hidden px-4 sm:px-8 border-b border-white/5">
           <div className="absolute inset-0 z-0">
             <Image src="/universe/planets/jupiter/bg09_jupiter_juno_rings.webp" alt="Juno mission and Jupiter rings" fill className="object-cover opacity-80" />
             <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>
           </div>
           <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 items-center relative z-10 gap-12">
              <div className="lg:col-span-8 lg:col-start-5 order-2 lg:order-2 flex flex-col gap-6 lg:gap-8 justify-center z-20">
                 <div className="flex items-center gap-4 sm:gap-6 justify-start lg:justify-end">
                   <div className="flex flex-col text-left lg:text-right w-full">
                     <div className="w-[50px] sm:w-[80px] h-[2px] bg-amber-400/60 mb-2 sm:mb-4 lg:self-end"></div>
                     <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.1em] uppercase">जूनो मिशन और छुपी रिंग</h2>
                   </div>
                   <span className="text-[70px] sm:text-[100px] lg:text-[140px] font-bold text-amber-400/20 leading-none">09</span>
                 </div>
                 <div className="text-gray-200 text-lg sm:text-xl font-light leading-relaxed space-y-6 bg-black/80 p-6 sm:p-10 rounded-3xl backdrop-blur-md border border-white/10 text-left lg:text-right lg:ml-auto max-w-3xl shadow-2xl">
                    <p className="text-shadow-md">
                      NASA का <strong>Juno</strong> अंतरिक्ष यान 2016 से बृहस्पति की परिक्रमा कर रहा है और हर चक्कर में इस विशाल ग्रह के नए-नए राज़ खोल रहा है। Juno ने खोजा कि बृहस्पति का कोर वैज्ञानिकों की सोच से बहुत अलग है — यह एक ठोस गेंद नहीं बल्कि भारी तत्वों का एक &apos;फज़ी&apos; (fuzzy/धुंधला) मिश्रण है जो धीरे-धीरे आसपास की धातु हाइड्रोजन में घुलता जाता है।
                    </p>
                    <p className="text-shadow-md">
                      और हैरानी की बात — शनि की तरह बृहस्पति के पास भी छल्ले (rings) हैं! हालाँकि ये बेहद हल्के, पतले और धुंधले हैं — धूल के कणों से बने ये छल्ले इतने मद्धम हैं कि <strong>सिर्फ़ तभी दिखते हैं जब सूरज इनके पीछे हो।</strong> Voyager 1 ने 1979 में इन्हें पहली बार देखा और दुनिया हैरान रह गई।
                    </p>
                 </div>
              </div>
           </div>
        </section>

        {/* YOUTUBE FEATURED VIDEO */}
        <FeaturedVideo videoId="RlS-S8oDzzY" />

        {/* RELATED PLANETS WIDGET */}
        <NextPlanets currentPlanetId="jupiter" />

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
                { title: "Space Age Calculator", desc: "How old are you on Jupiter or Neptune?", img: "/tools/tool-hero-bac1.webp", link: "/tools/space-age" },
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
