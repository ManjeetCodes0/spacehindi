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

export default function PlutoCustomPage() {
  const { lang } = useLang();
  const body = getCelestialBody("pluto");
  if (!body) notFound();

  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const heroImages = [
    "/universe/planets/pluto/pluto1.png",
    "/universe/planets/pluto/pluto_art1.webp",
    "/universe/planets/pluto/pluto_art2.webp"
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
            <div className="w-full lg:w-[55%] flex flex-col items-start text-left z-20 pt-2 lg:pt-4">
              <h1 className="text-[15vw] lg:text-[6.5rem] xl:text-[8.5rem] font-bold tracking-[0.02em] uppercase text-white leading-none whitespace-nowrap drop-shadow-xl" style={{ fontFamily: "Arial, sans-serif" }}>
                PLUTO
              </h1>
              <p className="mt-6 lg:mt-8 text-lg sm:text-xl xl:text-2xl leading-relaxed text-gray-200 font-light max-w-xl" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.8)" }}>
                प्लूटो — सौरमंडल का सबसे प्रसिद्ध बौना ग्रह, कुइपर बेल्ट की बर्फीली गहराइयों में बसा एक रहस्यमय संसार। दिल के आकार के ग्लेशियर और बर्फ के पहाड़ों से सजा यह छोटा पिंड इंसानी कल्पना में हमेशा जीवित रहेगा।
              </p>

              {/* Stats Grid */}
              <div className="w-full grid grid-cols-2 gap-x-4 sm:gap-x-8 gap-y-6 sm:gap-y-8 pt-8 sm:pt-12 mt-6 sm:mt-10 border-t border-white/20">
                <div className="flex flex-col gap-1 sm:gap-3">
                  <span className="text-[10px] sm:text-xs tracking-[0.1em] text-white/70 uppercase font-semibold">दिन (Day)</span>
                  <span className="text-xl sm:text-2xl lg:text-3xl font-light">153 घंटे</span>
                </div>
                <div className="flex flex-col gap-1 sm:gap-3">
                  <span className="text-[10px] sm:text-xs tracking-[0.1em] text-white/70 uppercase font-semibold">व्यास (Diameter)</span>
                  <span className="text-xl sm:text-2xl lg:text-3xl font-light">2,376 किमी</span>
                </div>
                <div className="flex flex-col gap-1 sm:gap-3">
                  <span className="text-[10px] sm:text-xs tracking-[0.1em] text-white/70 uppercase font-semibold">चाँद (Moons)</span>
                  <span className="text-xl sm:text-2xl lg:text-3xl font-light">5 (ज्ञात)</span>
                </div>
                <div className="flex flex-col gap-1 sm:gap-3">
                  <span className="text-[10px] sm:text-xs tracking-[0.1em] text-white/70 uppercase font-semibold">ग्रह का प्रकार</span>
                  <span className="text-xl sm:text-2xl lg:text-3xl font-light">बौना ग्रह (Dwarf Planet)</span>
                </div>
              </div>
            </div>

            {/* Right Media: The Planet */}
            <div className="w-full lg:w-[45%] flex items-center justify-center lg:justify-end relative mt-12 lg:mt-4 z-10">
              <div className="relative w-full max-w-[400px] lg:max-w-[480px] xl:max-w-[550px] aspect-square flex items-center justify-center lg:translate-x-[5%]">

                {/* Background Glowing Rings — Pluto themed (Pearl/Slate) */}
                <div className="absolute w-[120%] h-[120%] bg-slate-400/10 rounded-full blur-[70px] xl:blur-[90px] pointer-events-none z-0 transition-opacity duration-1000"></div>
                <div className="absolute w-[85%] h-[85%] rounded-full border border-slate-300/20 pointer-events-none z-0 animate-pulse"></div>
                <div className="absolute w-[110%] h-[110%] rounded-full border border-slate-400/15 border-dashed animate-[spin_25s_linear_infinite] pointer-events-none z-0"></div>
                <div className="absolute w-[135%] h-[135%] rounded-full border border-white/5 pointer-events-none z-0"></div>

                {heroImages.map((src, index) => (
                  <Image
                    key={src}
                    src={src}
                    alt={`प्लूटो बौना ग्रह (Pluto Dwarf Planet) Visual ${index + 1}`}
                    fill
                    className={`object-contain drop-shadow-[0_0_80px_rgba(203,213,225,0.25)] transition-all duration-[1500ms] ease-in-out ${
                      currentHeroImage === index ? "opacity-100 scale-100" : "opacity-0 scale-95"
                    }`}
                    priority={index === 0}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: DISCOVERY (01 खोज — एक युवा की जिद) */}
        <section className="relative w-full py-20 lg:py-32 bg-[#050a12] overflow-hidden flex flex-col justify-center px-4 sm:px-8">
          <div className="absolute top-0 right-0 w-full h-full z-0 opacity-30 pointer-events-none bg-gradient-to-l from-slate-800/20 to-transparent"></div>
          <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 items-center relative z-10 gap-12 lg:gap-24">
            <div className="flex flex-col gap-6 lg:gap-8 order-2 lg:order-1 relative z-20">
              <div className="flex items-center gap-4 sm:gap-6">
                <span className="text-[70px] sm:text-[100px] lg:text-[140px] font-bold text-[#b4b4bb] leading-none drop-shadow-2xl opacity-50">01</span>
                <div className="flex flex-col">
                  <div className="w-[50px] sm:w-[80px] h-[2px] bg-white/60 mb-2 sm:mb-4"></div>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.1em] uppercase">खोज — एक युवा की जिद</h2>
                </div>
              </div>
              <div className="lg:pl-[120px] space-y-6 text-gray-200 text-lg sm:text-xl font-light leading-relaxed max-w-2xl">
                <p>
                  18 फ़रवरी 1930 को <strong>Clyde Tombaugh</strong> — एक 24 वर्षीय अमेरिकी खगोलविद — ने Arizona के Lowell Observatory से एक फ़ीकी, गतिशील बिंदु देखी। यह था <strong>प्लूटो</strong>, सौरमंडल का नौवाँ पिंड। Tombaugh ने हज़ारों तस्वीरों की तुलना करते हुए यह खोज की — एक ऐसे काम में जिसमें अथाह धैर्य और लगन चाहिए थी।
                </p>
                <p>
                  प्लूटो का नाम एक 11 साल की ब्रिटिश लड़की <strong>Venetia Burney</strong> ने सुझाया था — रोमन अधोलोक के देवता के नाम पर। यह नाम इसलिए भी सटीक था क्योंकि पहले दो अक्षर PL — <strong>Percival Lowell</strong> के आद्याक्षर थे, जिन्होंने इस ग्रह की खोज की कल्पना की थी।
                </p>
              </div>
            </div>
            <div className="order-1 lg:order-2 w-full relative z-10 flex items-center justify-center">
              <div className="relative w-full aspect-square max-w-[500px] rounded-[30px] overflow-hidden group">
                <div className="absolute inset-0 z-0 shadow-inner">
                  <Image src="/universe/planets/pluto/bg01_pluto_discovery.webp" alt="Pluto discovery — Clyde Tombaugh 1930" fill className="object-cover opacity-100 contrast-125 saturate-50 scale-110 group-hover:scale-105 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-bl from-transparent to-[#050a12]/50 z-10"></div>
                </div>
                <div className="relative w-[80%] h-[80%] m-[10%] z-20 group-hover:scale-[1.02] transition-transform duration-700">
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: TOMBAUGH REGIO (02 दिल जो गया — Tombaugh Regio) */}
        <section className="relative w-full py-20 lg:py-32 min-h-[700px] overflow-hidden px-4 sm:px-8 bg-black">
          <div className="absolute inset-0 z-0">
            <Image src="/universe/planets/pluto/bg02_pluto_heart.webp" alt="Pluto heart-shaped Tombaugh Regio glacier" fill className="object-cover opacity-90" />
            <div className="absolute inset-0 bg-black/30 pointer-events-none"></div>
          </div>
          <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 items-center relative z-10 gap-12">
            <div className="hidden lg:block order-1"></div>
            <div className="flex flex-col gap-6 lg:gap-8 order-2 lg:order-1 relative z-20">
              <div className="flex items-center gap-4 sm:gap-6">
                <span className="text-[70px] sm:text-[100px] lg:text-[140px] font-bold text-slate-300/30 leading-none">02</span>
                <div className="flex flex-col">
                  <div className="w-[50px] sm:w-[80px] h-[2px] bg-slate-300/80 mb-2 sm:mb-4"></div>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.1em] uppercase text-white">दिल जो गया — Tombaugh Regio</h2>
                </div>
              </div>
              <div className="lg:ml-[120px] space-y-6 text-gray-100 text-lg sm:text-xl font-light leading-relaxed max-w-2xl bg-black/70 p-6 sm:p-10 rounded-3xl backdrop-blur-md border border-white/10 shadow-2xl">
                <p className="text-shadow-md">
                  14 जुलाई 2015 को New Horizons यान ने जब प्लूटो की पहली स्पष्ट तस्वीरें भेजीं तो दुनिया हैरान रह गई। प्लूटो की सतह पर एक <strong>विशाल दिल के आकार की सफ़ेद आकृति</strong> नज़र आई — जो पूरी तरह से नाइट्रोजन बर्फ़ का बना एक ग्लेशियर था!
                </p>
                <p className="text-shadow-md">
                  इसे <strong>Tombaugh Regio</strong> नाम दिया गया — प्लूटो की खोज करने वाले Clyde Tombaugh के सम्मान में। यह दिल-नुमा क्षेत्र लगभग <strong>1,600 किलोमीटर चौड़ा</strong> है — भारत के पूर्व से पश्चिम जितना। इस ग्लेशियर में नाइट्रोजन, कार्बन मोनोऑक्साइड और मीथेन बर्फ़ की परतें हैं जो हर प्लूटो-वर्ष में धीरे-धीरे अपना रूप बदलती हैं।
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: DEMOTION (03 ग्रह से बौना ग्रह — 2006 का विवाद) */}
        <section className="relative w-full py-20 lg:py-32 bg-[#020509] overflow-hidden px-4 sm:px-8">
          <div className="absolute inset-0 z-0">
            <Image src="/universe/planets/pluto/bg03_pluto_demotion.webp" alt="Pluto demotion — IAU 2006 debate" fill className="object-cover opacity-80" />
            <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>
          </div>
          <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 items-center relative z-10 gap-12">
            <div className="lg:col-span-6 order-2 lg:order-2 flex flex-col gap-6 lg:gap-8 justify-center">
              <div className="flex items-center gap-4 sm:gap-6 justify-start lg:justify-end">
                <div className="flex flex-col text-left lg:text-right w-full">
                  <div className="w-[50px] sm:w-[80px] h-[2px] bg-slate-400/40 mb-2 sm:mb-4 lg:self-end"></div>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.1em] uppercase">ग्रह से बौना ग्रह</h2>
                </div>
                <span className="text-[70px] sm:text-[100px] lg:text-[140px] font-bold text-slate-400/30 leading-none">03</span>
              </div>
              <div className="text-gray-200 text-lg sm:text-xl font-light leading-relaxed space-y-6 bg-black/80 p-6 sm:p-10 rounded-3xl backdrop-blur-md border border-white/10 text-left lg:text-right lg:ml-auto max-w-2xl shadow-2xl">
                <p>
                  2006 में International Astronomical Union (IAU) ने एक ऐसा निर्णय लिया जिसने पूरी दुनिया को हिला दिया — <strong>प्लूटो को ग्रहों की सूची से हटा दिया गया!</strong> 76 साल तक ग्रह रहने के बाद प्लूटो को &quot;Dwarf Planet&quot; (बौना ग्रह) का दर्जा मिला।
                </p>
                <p>
                  IAU के अनुसार एक ग्रह को तीन शर्तें पूरी करनी होती हैं: (1) सूर्य की परिक्रमा करे, (2) गोल आकार हो, (3) अपनी कक्षा के आस-पास के क्षेत्र को साफ़ करे। प्लूटो पहली दो शर्तें पूरी करता है लेकिन <strong>कुइपर बेल्ट में हज़ारों अन्य पिंडों के बीच होने के कारण</strong> तीसरी शर्त नहीं पूरी करता। यह निर्णय आज भी वैज्ञानिकों में बहस का विषय है।
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: MOUNTAINS (04 बर्फ के पहाड़ — Hillary & Tenzing Montes) */}
        <section className="relative w-full py-20 lg:py-32 bg-[#010204] overflow-hidden flex flex-col justify-center px-4 sm:px-8">
          <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 items-center relative z-10 gap-12 lg:gap-24">
            <div className="order-2 lg:order-1 w-full relative z-10 flex items-center justify-center">
              <div className="relative w-full aspect-square max-w-[600px] group rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                <Image src="/universe/planets/pluto/bg04_pluto_mountains.webp" alt="Pluto ice mountains Hillary and Tenzing Montes" fill className="object-cover opacity-100 group-hover:scale-105 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30"></div>
              </div>
            </div>
            <div className="flex flex-col gap-6 lg:gap-8 order-1 lg:order-2 relative z-20">
              <div className="flex items-center gap-4 sm:gap-6">
                <span className="text-[70px] sm:text-[100px] lg:text-[140px] font-bold text-gray-400/30 leading-none drop-shadow-2xl">04</span>
                <div className="flex flex-col">
                  <div className="w-[50px] sm:w-[80px] h-[2px] bg-gray-300/60 mb-2 sm:mb-4"></div>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.1em] uppercase">बर्फ के पहाड़</h2>
                </div>
              </div>
              <div className="lg:pl-[120px] space-y-6 text-gray-200 text-lg sm:text-xl font-light leading-relaxed max-w-2xl">
                <p>
                  New Horizons की तस्वीरों ने खुलासा किया कि प्लूटो की सतह पर <strong>3,500 मीटर (3.5 किलोमीटर) ऊँचे पहाड़</strong> हैं — लगभग यूरोप के आल्प्स पहाड़ों जितने ऊँचे! इन्हें <strong>Hillary Montes</strong> और <strong>Tenzing Montes</strong> नाम दिया गया — एवरेस्ट को पहली बार फतह करने वालों के नाम पर।
                </p>
                <p>
                  सबसे हैरान करने वाली बात यह है कि ये पहाड़ <strong>ठोस पानी की बर्फ़ (water ice)</strong> से बने हैं! -225°C पर पानी की बर्फ़ इतनी कठोर हो जाती है कि वह चट्टान की तरह व्यवहार करती है। नाइट्रोजन बर्फ़ बहुत मुलायम होती है और इतने बड़े पहाड़ नहीं बना सकती — इसीलिए ये पानी-बर्फ की संरचनाएँ प्लूटो पर खड़ी हैं।
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: CHARON (05 शारोन — प्लूटो का जुड़वाँ) */}
        <section className="relative w-full py-20 lg:py-32 min-h-[700px] overflow-hidden px-4 sm:px-8 bg-black">
          <div className="absolute inset-0 z-0">
            <Image src="/universe/planets/pluto/bg05_pluto_charon.webp" alt="Charon — Pluto twin moon binary system" fill className="object-cover opacity-90" />
            <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>
          </div>
          <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 items-center relative z-10 gap-12">
            <div className="flex flex-col gap-6 lg:gap-8 relative z-20">
              <div className="flex items-center gap-4 sm:gap-6">
                <span className="text-[70px] sm:text-[100px] lg:text-[140px] font-bold text-slate-300/20 leading-none">05</span>
                <div className="flex flex-col">
                  <div className="w-[50px] sm:w-[80px] h-[2px] bg-slate-300/60 mb-2 sm:mb-4"></div>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.1em] uppercase">शारोन — प्लूटो का जुड़वाँ</h2>
                </div>
              </div>
              <div className="lg:ml-[120px] space-y-6 text-gray-100 text-lg sm:text-xl font-light leading-relaxed max-w-2xl bg-black/80 p-6 sm:p-10 rounded-3xl backdrop-blur-md border border-white/10 shadow-2xl">
                <p className="text-shadow-md">
                  प्लूटो का सबसे बड़ा चाँद <strong>शारोन (Charon)</strong> इतना बड़ा है कि वैज्ञानिक इन दोनों को एक <strong>Double Dwarf Planet System</strong> मानते हैं। शारोन का व्यास प्लूटो का लगभग <strong>52%</strong> है — किसी भी अन्य ग्रह-चाँद जोड़ी में यह अनुपात इतना बड़ा नहीं है।
                </p>
                <p className="text-shadow-md">
                  सबसे अनोखी बात यह है कि प्लूटो और शारोन दोनों एक <strong>साझे गुरुत्वीय केंद्र (Barycenter)</strong> के इर्द-गिर्द घूमते हैं — जो दोनों के बीच खाली अंतरिक्ष में स्थित है! यह Barycenter किसी के भी अंदर नहीं है। इसीलिए यह सौरमंडल का एकमात्र ऐसा तंत्र है जहाँ दोनों पिंड एक-दूसरे का चक्कर लगाते दिखते हैं।
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: NEW HORIZONS (06 New Horizons — पहली नज़दीकी झलक) */}
        <section className="relative w-full py-20 lg:py-32 bg-[#020509] overflow-hidden px-4 sm:px-8">
          <div className="absolute inset-0 z-0 flex justify-end pointer-events-none">
            <Image src="/universe/planets/pluto/bg06_pluto_new_horizons.webp" alt="New Horizons spacecraft Pluto flyby 2015" fill className="object-cover opacity-70" />
            <div className="absolute inset-0 bg-gradient-to-l from-[#020509]/20 via-[#020509]/60 to-[#020509]"></div>
          </div>
          <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 items-center relative z-10 gap-12">
            <div className="lg:col-span-6 lg:col-start-7 order-2 lg:order-2 flex flex-col gap-6 lg:gap-8 justify-center">
              <div className="flex items-center gap-4 sm:gap-6 lg:flex-row-reverse text-right">
                <div className="flex flex-col items-end">
                  <div className="w-[50px] sm:w-[80px] h-[2px] bg-slate-200/60 mb-2 sm:mb-4"></div>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.1em] uppercase text-white">New Horizons — पहली झलक</h2>
                </div>
                <span className="text-[70px] sm:text-[100px] lg:text-[140px] font-bold text-slate-200/20 leading-none">06</span>
              </div>
              <div className="space-y-6 text-gray-200 text-lg sm:text-xl font-light leading-relaxed bg-black/80 p-6 sm:p-10 rounded-3xl backdrop-blur-md border border-white/10 text-left lg:text-right max-w-2xl lg:ml-auto shadow-2xl">
                <p>
                  19 जनवरी 2006 को NASA का <strong>New Horizons</strong> यान प्लूटो की ओर रवाना हुआ — 9.5 साल की यात्रा पर! <strong>14 जुलाई 2015</strong> को यह प्लूटो से मात्र <strong>12,500 किलोमीटर</strong> की दूरी से गुज़रा — इतना नज़दीक कि पहली बार हमें प्लूटो का असली चेहरा दिखा।
                </p>
                <p>
                  इस मुलाक़ात ने सब कुछ बदल दिया। हमें पता चला कि प्लूटो भूगर्भीय रूप से <strong>सक्रिय है</strong> — इसकी सतह पर ताज़ा बर्फ़, ऊँचे पहाड़ और नाइट्रोजन के बहाव के निशान हैं। New Horizons अभी भी चल रहा है और <strong>Kuiper Belt</strong> के अन्य पिंडों का अन्वेषण कर रहा है।
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 8: ATMOSPHERE (07 जादुई वायुमंडल) */}
        <section className="relative w-full py-20 lg:py-32 bg-[#010204] overflow-hidden flex flex-col justify-center px-4 sm:px-8">
          <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 items-center relative z-10 gap-12 lg:gap-24">
            <div className="order-2 lg:order-1 w-full relative z-10 flex items-center justify-center">
              <div className="relative w-full aspect-[4/3] max-w-[600px] rounded-3xl overflow-hidden group shadow-2xl border border-white/10">
                <Image src="/universe/planets/pluto/bg07_pluto_atmosphere.webp" alt="Pluto thin blue haze atmosphere backlit by Sun" fill className="object-cover opacity-100 group-hover:scale-105 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-black/30 z-10"></div>
              </div>
            </div>
            <div className="flex flex-col gap-6 lg:gap-8 order-1 lg:order-2 relative z-20">
              <div className="flex items-center gap-4 sm:gap-6">
                <span className="text-[70px] sm:text-[100px] lg:text-[140px] font-bold text-slate-300/20 leading-none drop-shadow-2xl">07</span>
                <div className="flex flex-col">
                  <div className="w-[50px] sm:w-[80px] h-[2px] bg-slate-200/60 mb-2 sm:mb-4"></div>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.1em] uppercase">जादुई वायुमंडल</h2>
                </div>
              </div>
              <div className="lg:pl-[120px] space-y-6 text-gray-200 text-lg sm:text-xl font-light leading-relaxed max-w-2xl">
                <p>
                  प्लूटो के पास एक <strong>पतला लेकिन आश्चर्यजनक वायुमंडल</strong> है — मुख्यतः नाइट्रोजन, मीथेन और कार्बन मोनोऑक्साइड से बना। जब New Horizons ने पीछे मुड़कर सूर्य की तरफ प्लूटो को देखा तो उन्हें <strong>नीली रंग की धुंध (blue haze)</strong> की कई परतें दिखीं!
                </p>
                <p>
                  प्लूटो का वायुमंडल एक अनोखी घटना करता है — जब प्लूटो सूर्य के पास आता है तो सतह की बर्फ़ वाष्प बनकर वायुमंडल बनाती है। जब दूर जाता है तो यही वायुमंडल <strong>वापस जम जाता है!</strong> पूरा वायुमंडल सतह पर बर्फ़ बनकर गिर जाता है — जैसे पूरा आसमान ही ज़मीन पर आ जाए।
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 9: KUIPER BELT (08 कुइपर बेल्ट का राजा) */}
        <section className="relative w-full py-20 lg:py-32 min-h-[700px] overflow-hidden px-4 sm:px-8 bg-black">
          <div className="absolute inset-0 z-0">
            <Image src="/universe/planets/pluto/bg08_pluto_kuiper_belt.webp" alt="Kuiper Belt region — Pluto's frozen kingdom" fill className="object-cover opacity-90" />
            <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>
          </div>
          <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 items-center relative z-10 gap-12">
            <div className="flex flex-col gap-6 lg:gap-8 relative z-20">
              <div className="flex items-center gap-4 sm:gap-6">
                <span className="text-[70px] sm:text-[100px] lg:text-[140px] font-bold text-slate-400/20 leading-none">08</span>
                <div className="flex flex-col">
                  <div className="w-[50px] sm:w-[80px] h-[2px] bg-slate-400/60 mb-2 sm:mb-4"></div>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.1em] uppercase text-white">कुइपर बेल्ट का राजा</h2>
                </div>
              </div>
              <div className="lg:ml-[120px] space-y-6 text-gray-100 text-lg sm:text-xl font-light leading-relaxed max-w-2xl bg-black/80 p-6 sm:p-10 rounded-3xl backdrop-blur-md border border-white/10 shadow-2xl">
                <p className="text-shadow-md">
                  प्लूटो <strong>कुइपर बेल्ट (Kuiper Belt)</strong> का सबसे प्रसिद्ध सदस्य है — वह विशाल बर्फीला क्षेत्र जो नेप्च्यून की कक्षा से परे फैला हुआ है। इस क्षेत्र में लाखों छोटे-बड़े बर्फीले पिंड हैं जो सौरमंडल के शुरुआती दौर के अवशेष हैं।
                </p>
                <p className="text-shadow-md">
                  प्लूटो की कक्षा बाकी ग्रहों से बेहद अलग है — यह <strong>अत्यधिक अण्डाकार (eccentric)</strong> है और <strong>17 डिग्री झुकी</strong> हुई है। इसकी वजह से प्लूटो कभी-कभी सूर्य के इतना पास आ जाता है कि नेप्च्यून की कक्षा के अंदर चला जाता है! 1979 से 1999 तक प्लूटो नेप्च्यून से भी सूर्य के ज़्यादा नज़दीक था।
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 10: FUTURE (09 प्लूटो का भविष्य) */}
        <section className="relative w-full py-20 lg:py-32 bg-[#020509] overflow-hidden px-4 sm:px-8 border-b border-white/5">
          <div className="absolute inset-0 z-0">
            <Image src="/universe/planets/pluto/bg09_pluto_future.webp" alt="Pluto future — next mission beyond New Horizons" fill className="object-cover opacity-80" />
            <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>
          </div>
          <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 items-center relative z-10 gap-12">
            <div className="lg:col-span-8 lg:col-start-5 order-2 lg:order-2 flex flex-col gap-6 lg:gap-8 justify-center z-20">
              <div className="flex items-center gap-4 sm:gap-6 justify-start lg:justify-end">
                <div className="flex flex-col text-left lg:text-right w-full">
                  <div className="w-[50px] sm:w-[80px] h-[2px] bg-slate-300/60 mb-2 sm:mb-4 lg:self-end"></div>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.1em] uppercase">प्लूटो का भविष्य</h2>
                </div>
                <span className="text-[70px] sm:text-[100px] lg:text-[140px] font-bold text-slate-300/20 leading-none">09</span>
              </div>
              <div className="text-gray-200 text-lg sm:text-xl font-light leading-relaxed space-y-6 bg-black/80 p-6 sm:p-10 rounded-3xl backdrop-blur-md border border-white/10 text-left lg:text-right lg:ml-auto max-w-3xl shadow-2xl">
                <p className="text-shadow-md">
                  New Horizons ने 2015 में हमें प्लूटो की एक झलक दी — लेकिन वह महज़ कुछ घंटों का flyby था। वैज्ञानिक अब एक <strong>Pluto Orbiter Mission</strong> की योजना बना रहे हैं जो वर्षों तक प्लूटो की कक्षा में रहे और इसका विस्तृत अध्ययन करे। NASA और ESA दोनों इस संभावना पर काम कर रहे हैं।
                </p>
                <p className="text-shadow-md">
                  प्लूटो चाहे &quot;ग्रह&quot; हो या &quot;बौना ग्रह&quot; — यह इंसानी दिलों में हमेशा एक ख़ास जगह रखता है। इसका वह <strong>दिल-नुमा ग्लेशियर</strong> जैसे ब्रह्मांड खुद अपनी भाषा में कह रहा हो — &quot;मुझे भूलना मत।&quot; कुइपर बेल्ट की बर्फीली सीमा पर यह छोटा पिंड सौरमंडल के सबसे गहरे रहस्यों को छुपाए बैठा है।
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* YOUTUBE FEATURED VIDEO */}
        <FeaturedVideo videoId="5Hq4G50EO2k" />

        {/* RELATED PLANETS WIDGET */}
        <NextPlanets currentPlanetId="pluto" />

        {/* RELATED TOOLS SECTION */}
        <section className="bg-[#020509] border-t border-white/5 py-16 lg:py-24">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Explore More Space Tools</h2>
                <p className="text-gray-400 text-sm md:text-base">Continue your interactive journey across the cosmos.</p>
              </div>
              <Link href="/tools" className="mt-4 md:mt-0 text-slate-400 font-bold hover:text-slate-300 transition-colors uppercase text-xs tracking-wider">
                VIEW ALL TOOLS &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
              {[
                { title: "Space Age Calculator", desc: "How old are you on Pluto? (248 Earth years = 1 Pluto year!)", img: "/tools/tool-hero-bac1.webp", link: "/tools/space-age" },
                { title: "Planet Weight Calculator", desc: "How much would you weigh on Pluto's low gravity?", img: "/tools/tool2.webp", link: "/tools/weight-calculator" },
                { title: "Orbit Simulator", desc: "Play with gravity by simulating orbital physics.", img: "/tools/tool3.png", link: "/tools/orbit-simulator" }
              ].map((tool, i) => (
                <Link href={tool.link} key={i} className="group block">
                  <div className="bg-[#050a12] border border-white/5 rounded-[2rem] overflow-hidden shadow-lg hover:border-white/20 transition-all duration-300 hover:-translate-y-1">
                    <div className="h-48 overflow-hidden relative">
                      <img src={tool.img} alt={tool.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050a12] via-[#050a12]/40 to-transparent" />
                    </div>
                    <div className="p-6 pt-0 relative z-10">
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-slate-300 transition-colors">{tool.title}</h3>
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
                    className="flex-1 px-6 py-4 rounded-full bg-white/5 backdrop-blur-md border border-white/20 text-white placeholder:text-gray-400 outline-none focus:border-slate-400 transition-all text-base w-full shadow-inner"
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
