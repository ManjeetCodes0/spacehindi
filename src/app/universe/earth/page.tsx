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

export default function EarthCustomPage() {
  const { lang } = useLang();
  const body = getCelestialBody("earth");
  if (!body) notFound();

  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const heroImages = [
    "/universe/planets/earth/earth1.png",
    "/universe/planets/earth/earth_art1.webp",
    "/universe/planets/earth/earth_art2.webp"
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

        {/* HERO SECTION 1 */}
        <section className="relative w-full overflow-hidden px-4 sm:px-8 bg-[#020509] pt-4 lg:pt-0 pb-16 lg:pb-24">
          <div className="max-w-[1400px] mx-auto w-full flex flex-col lg:flex-row items-center lg:items-start justify-between relative z-20">
            {/* Left Content: Title and Intro */}
            <div className="w-full lg:w-[55%] flex flex-col items-start text-left z-20 pt-2 lg:pt-4">
              <h1 className="text-[15vw] lg:text-[6.5rem] xl:text-[8.5rem] font-bold tracking-[0.02em] uppercase text-white leading-none whitespace-nowrap drop-shadow-xl" style={{ fontFamily: "Arial, sans-serif" }}>
                 EARTH
              </h1>
              <p className="mt-6 lg:mt-8 text-lg sm:text-xl xl:text-2xl leading-relaxed text-gray-200 font-light max-w-xl" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.8)" }}>
                पृथ्वी (Earth) — हमारा अपना ग्रह, अंतरिक्ष के अनंत अंधेरे में टिमटिमाता एक नीला बिंदु। यह सौरमंडल का एकमात्र ग्रह है जहाँ पानी तरल रूप में बहता है और जीवन फलता-फूलता है।
              </p>

              {/* Stats Grid */}
              <div className="w-full grid grid-cols-2 gap-x-4 sm:gap-x-8 gap-y-6 sm:gap-y-8 pt-8 sm:pt-12 mt-6 sm:mt-10 border-t border-white/20">
                <div className="flex flex-col gap-1 sm:gap-3">
                  <span className="text-[10px] sm:text-xs tracking-[0.1em] text-white/70 uppercase font-semibold">दिन (Day)</span>
                  <span className="text-xl sm:text-2xl lg:text-3xl font-light">24 घंटे</span>
                </div>
                <div className="flex flex-col gap-1 sm:gap-3">
                  <span className="text-[10px] sm:text-xs tracking-[0.1em] text-white/70 uppercase font-semibold">रेडियस (Radius)</span>
                  <span className="text-xl sm:text-2xl lg:text-3xl font-light">6,371 किमी</span>
                </div>
                <div className="flex flex-col gap-1 sm:gap-3">
                  <span className="text-[10px] sm:text-xs tracking-[0.1em] text-white/70 uppercase font-semibold">चाँद (Moons)</span>
                  <span className="text-xl sm:text-2xl lg:text-3xl font-light">1 (चंद्रमा)</span>
                </div>
                <div className="flex flex-col gap-1 sm:gap-3">
                  <span className="text-[10px] sm:text-xs tracking-[0.1em] text-white/70 uppercase font-semibold">ग्रह का प्रकार</span>
                  <span className="text-xl sm:text-2xl lg:text-3xl font-light">रॉकी (Rocky) ग्रह</span>
                </div>
              </div>
            </div>

            {/* Right Media: The Planet */}
            <div className="w-full lg:w-[45%] flex items-center justify-center lg:justify-end relative mt-12 lg:mt-4 z-10">
              <div className="relative w-full max-w-[400px] lg:max-w-[480px] xl:max-w-[550px] aspect-square flex items-center justify-center lg:translate-x-[5%]">

                 {/* Background Glowing Rings */}
                 <div className="absolute w-[120%] h-[120%] bg-blue-500/10 rounded-full blur-[70px] xl:blur-[90px] pointer-events-none z-0 transition-opacity duration-1000"></div>
                 <div className="absolute w-[85%] h-[85%] rounded-full border border-white/20 pointer-events-none z-0 animate-pulse"></div>
                 <div className="absolute w-[110%] h-[110%] rounded-full border border-white/10 border-dashed animate-[spin_25s_linear_infinite] pointer-events-none z-0"></div>
                 <div className="absolute w-[135%] h-[135%] rounded-full border border-white/5 pointer-events-none z-0"></div>

                 {heroImages.map((src, index) => (
                    <Image
                      key={src}
                      src={src}
                      alt={`पृथ्वी ग्रह (Earth Planet) Visual ${index + 1}`}
                      fill
                      className={`object-contain drop-shadow-[0_0_80px_rgba(59,130,246,0.2)] transition-all duration-[1500ms] ease-in-out ${
                        currentHeroImage === index ? "opacity-100 scale-100" : "opacity-0 scale-95"
                      }`}
                      priority={index === 0}
                    />
                 ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: BASIC INFO (01 नीला ग्रह) */}
        <section className="relative w-full py-20 lg:py-32 bg-[#050a12] overflow-hidden flex flex-col justify-center px-4 sm:px-8">
          <div className="absolute top-0 right-0 w-full h-full z-0 opacity-30 pointer-events-none bg-gradient-to-l from-blue-900/10 to-transparent"></div>
          <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 items-center relative z-10 gap-12 lg:gap-24">
            <div className="flex flex-col gap-6 lg:gap-8 order-2 lg:order-1 relative z-20">
               <div className="flex items-center gap-4 sm:gap-6">
                 <span className="text-[70px] sm:text-[100px] lg:text-[140px] font-bold text-[#b4b4bb] leading-none drop-shadow-2xl opacity-50">01</span>
                 <div className="flex flex-col">
                   <div className="w-[50px] sm:w-[80px] h-[2px] bg-white/60 mb-2 sm:mb-4"></div>
                   <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.1em] uppercase">नीला ग्रह</h2>
                 </div>
               </div>
               <div className="lg:pl-[120px] space-y-6 text-gray-200 text-lg sm:text-xl font-light leading-relaxed max-w-2xl">
                 <p>
                   अंतरिक्ष से देखने पर पृथ्वी किसी नीले रत्न की तरह चमकती है। इसकी सतह का 71% हिस्सा विशाल महासागरों से ढका हुआ है—इसीलिए इसे &apos;Blue Planet&apos; (नीला ग्रह) कहा जाता है।
                 </p>
                 <p>
                   सूरज से बिल्कुल सही दूरी पर बसा यह ग्रह न ज़्यादा गर्म है, न ज़्यादा ठंडा। वैज्ञानिक इसे &apos;Goldilocks Zone&apos; (गोल्डीलॉक्स ज़ोन) कहते हैं — वह एकदम परफेक्ट जगह जहाँ पानी तरल रूप में बह सकता है और जीवन पनप सकता है। पूरे ब्रह्मांड में आज तक ऐसा कोई दूसरा ठिकाना नहीं मिला।
                 </p>
               </div>
            </div>
            <div className="order-1 lg:order-2 w-full relative z-10 flex items-center justify-center">
              <div className="relative w-full aspect-square max-w-[500px] rounded-[30px] overflow-hidden group">
                 <div className="absolute inset-0 z-0 shadow-inner">
                    <Image src="/universe/planets/earth/bg01_earth_blue_marble.webp" alt="Earth from space — the Blue Marble" fill className="object-cover opacity-100 contrast-125 saturate-50 scale-110 group-hover:scale-105 transition-transform duration-1000" />
                    <div className="absolute inset-0 bg-gradient-to-bl from-transparent to-[#050a12]/50 z-10"></div>
                 </div>
                 <div className="relative w-[80%] h-[80%] m-[10%] z-20 group-hover:scale-[1.02] transition-transform duration-700">
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: ATMOSPHERE (02 सुरक्षा का कवच) */}
        <section className="relative w-full py-20 lg:py-32 min-h-[700px] overflow-hidden px-4 sm:px-8 bg-black">
           <div className="absolute inset-0 z-0">
             <Image src="/universe/planets/earth/bg02_earth_atmosphere.webp" alt="Earth atmosphere layers from orbit" fill className="object-cover opacity-90" />
             <div className="absolute inset-0 bg-black/30 pointer-events-none"></div>
           </div>
           <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 items-center relative z-10 gap-12">
              <div className="hidden lg:block order-1"></div>
              <div className="flex flex-col gap-6 lg:gap-8 order-2 lg:order-1 relative z-20">
                 <div className="flex items-center gap-4 sm:gap-6">
                   <span className="text-[70px] sm:text-[100px] lg:text-[140px] font-bold text-white/30 leading-none">02</span>
                   <div className="flex flex-col">
                     <div className="w-[50px] sm:w-[80px] h-[2px] bg-cyan-400/80 mb-2 sm:mb-4"></div>
                     <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.1em] uppercase text-white">सुरक्षा का कवच</h2>
                   </div>
                 </div>
                 <div className="lg:ml-[120px] space-y-6 text-gray-100 text-lg sm:text-xl font-light leading-relaxed max-w-2xl bg-black/70 p-6 sm:p-10 rounded-3xl backdrop-blur-md border border-white/10 shadow-2xl">
                   <p className="text-shadow-md">
                     पृथ्वी का वायुमंडल (atmosphere) एक अदृश्य कवच की तरह काम करता है। 78% नाइट्रोजन और 21% ऑक्सीजन से बना यह ढाल हमें अंतरिक्ष की भयानक विकिरण (radiation) और घातक उल्कापिंडों से बचाता है।
                   </p>
                   <p className="text-shadow-md">
                     यही वायुमंडल ओज़ोन (O₃) की एक पतली लेकिन बेहद ताकतवर परत बनाता है जो सूरज की खतरनाक पराबैंगनी किरणों (UV rays) को सतह पर पहुँचने से पहले ही सोख लेती है। बिना इस कवच के, पृथ्वी की सतह पर कोई भी जीव कुछ ही मिनटों में जलकर राख हो जाता।
                   </p>
                 </div>
              </div>
           </div>
        </section>

        {/* SECTION 4: OCEAN (03 गहरे समुद्र का रहस्य) */}
        <section className="relative w-full py-20 lg:py-32 bg-[#020509] overflow-hidden px-4 sm:px-8">
           <div className="absolute inset-0 z-0">
             <Image src="/universe/planets/earth/bg03_earth_ocean_deep.webp" alt="Deep ocean abyss" fill className="object-cover opacity-80" />
             <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>
           </div>
           <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 items-center relative z-10 gap-12">
              <div className="lg:col-span-6 order-2 lg:order-2 flex flex-col gap-6 lg:gap-8 justify-center">
                 <div className="flex items-center gap-4 sm:gap-6 justify-start lg:justify-end">
                   <div className="flex flex-col text-left lg:text-right w-full">
                     <div className="w-[50px] sm:w-[80px] h-[2px] bg-white/40 mb-2 sm:mb-4 lg:self-end"></div>
                     <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.1em] uppercase">गहरे समुद्र का रहस्य</h2>
                   </div>
                   <span className="text-[70px] sm:text-[100px] lg:text-[140px] font-bold text-white/30 leading-none">03</span>
                 </div>

                 <div className="text-gray-200 text-lg sm:text-xl font-light leading-relaxed space-y-6 bg-black/80 p-6 sm:p-10 rounded-3xl backdrop-blur-md border border-white/10 text-left lg:text-right lg:ml-auto max-w-2xl shadow-2xl">
                    <p>
                      पृथ्वी के महासागर इतने विशाल और गहरे हैं कि आज तक हम उनका सिर्फ 5% हिस्सा ही खोज पाए हैं! सबसे गहरी जगह &apos;मारियाना ट्रेंच&apos; (Mariana Trench) है जो लगभग 11,034 मीटर गहरी है — माउंट एवरेस्ट को उल्टा डुबो दें तो भी उसकी चोटी तल तक नहीं पहुँचेगी।
                    </p>
                    <p>
                      इन अंधेरी गहराइयों में ऐसे अजीबोगरीब जीव रहते हैं जो बिना सूरज की रोशनी के जीवित हैं। ज्वालामुखी छिद्रों (hydrothermal vents) से निकलने वाली गर्मी और रसायनों पर पलने वाले ये जीव इस बात का सबूत हैं कि जीवन कितनी कठिन परिस्थितियों में भी पनप सकता है।
                    </p>
                 </div>
              </div>
           </div>
        </section>

        {/* SECTION 5: MAGNETIC FIELD (04 चुम्बकीय ढाल) */}
        <section className="relative w-full py-20 lg:py-32 bg-[#010204] overflow-hidden flex flex-col justify-center px-4 sm:px-8">
          <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 items-center relative z-10 gap-12 lg:gap-24">
            <div className="order-2 lg:order-1 w-full relative z-10 flex items-center justify-center">
              <div className="relative w-full aspect-square max-w-[600px] group rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                 <Image src="/universe/planets/earth/bg04_earth_magnetic_field.webp" alt="Earth magnetic field protecting from solar wind" fill className="object-cover opacity-100 group-hover:scale-105 transition-transform duration-1000" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30"></div>
              </div>
            </div>
            <div className="flex flex-col gap-6 lg:gap-8 order-1 lg:order-2 relative z-20">
               <div className="flex items-center gap-4 sm:gap-6">
                 <span className="text-[70px] sm:text-[100px] lg:text-[140px] font-bold text-emerald-500/30 leading-none drop-shadow-2xl">04</span>
                 <div className="flex flex-col">
                   <div className="w-[50px] sm:w-[80px] h-[2px] bg-emerald-500/60 mb-2 sm:mb-4"></div>
                   <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.1em] uppercase">चुम्बकीय ढाल</h2>
                 </div>
               </div>
               <div className="lg:pl-[120px] space-y-6 text-gray-200 text-lg sm:text-xl font-light leading-relaxed max-w-2xl">
                 <p>
                   पृथ्वी के अंदर पिघले हुए लोहे (molten iron) का एक विशाल समंदर लगातार घूम रहा है। इसी घूमते हुए तरल लोहे से एक शक्तिशाली चुम्बकीय क्षेत्र (Magnetosphere) पैदा होता है जो हज़ारों किलोमीटर तक अंतरिक्ष में फैला हुआ है।
                 </p>
                 <p>
                   यह अदृश्य ढाल सूरज से लगातार आने वाली भयानक सौर-हवाओं (solar winds) और घातक charged particles को पृथ्वी की सतह तक पहुँचने से रोकती है। जब ये सौर कण चुम्बकीय क्षेत्र से टकराते हैं, तो ध्रुवों पर रंग-बिरंगी रोशनी बिखेर देते हैं — जिसे हम <strong>Aurora (उत्तरी/दक्षिणी ध्रुवीय ज्योति)</strong> कहते हैं।
                 </p>
               </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: MOON (05 चंद्रमा — हमारा वफादार साथी) */}
        <section className="relative w-full py-20 lg:py-32 min-h-[700px] overflow-hidden px-4 sm:px-8 bg-black">
           <div className="absolute inset-0 z-0">
             <Image src="/universe/planets/earth/bg05_earth_moon.webp" alt="Earth and Moon together in space" fill className="object-cover opacity-90" />
             <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>
           </div>
           <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 items-center relative z-10 gap-12">
              <div className="flex flex-col gap-6 lg:gap-8 relative z-20">
                 <div className="flex items-center gap-4 sm:gap-6">
                   <span className="text-[70px] sm:text-[100px] lg:text-[140px] font-bold text-blue-500/20 leading-none">05</span>
                   <div className="flex flex-col">
                     <div className="w-[50px] sm:w-[80px] h-[2px] bg-blue-500/60 mb-2 sm:mb-4"></div>
                     <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.1em] uppercase">चंद्रमा — वफादार साथी</h2>
                   </div>
                 </div>
                 <div className="lg:ml-[120px] space-y-6 text-gray-100 text-lg sm:text-xl font-light leading-relaxed max-w-2xl bg-black/80 p-6 sm:p-10 rounded-3xl backdrop-blur-md border border-white/10 shadow-2xl">
                   <p className="text-shadow-md">
                     लगभग 4.5 अरब साल पहले, मंगल ग्रह जितने बड़े एक विशाल पिंड &apos;Theia&apos; ने पृथ्वी से ज़बरदस्त टक्कर मारी। उस महाप्रलय से बिखरे मलबे ने मिलकर हमारे चंद्रमा (Moon) को जन्म दिया।
                   </p>
                   <p className="text-shadow-md">
                     चंद्रमा सिर्फ आसमान की शोभा नहीं है — यह पृथ्वी के अक्षीय झुकाव (axial tilt) को 23.5° पर स्थिर रखता है, जिससे हमें ऋतुएँ (seasons) मिलती हैं। इसी की गुरुत्वाकर्षण खिंचाव से समुद्रों में ज्वार-भाटा (tides) आते हैं। बिना चंद्रमा के, पृथ्वी पर जटिल जीवन शायद कभी संभव ही नहीं होता।
                   </p>
                 </div>
              </div>
           </div>
        </section>

        {/* SECTION 7: TECTONIC PLATES (06 हिलती-डुलती ज़मीन) */}
        <section className="relative w-full py-20 lg:py-32 bg-[#020509] overflow-hidden px-4 sm:px-8">
           <div className="absolute inset-0 z-0 flex justify-end pointer-events-none">
             <Image src="/universe/planets/earth/bg06_earth_tectonic.webp" alt="Tectonic plates and volcanic activity" fill className="object-cover opacity-70" />
             <div className="absolute inset-0 bg-gradient-to-l from-[#020509]/20 via-[#020509]/60 to-[#020509]"></div>
           </div>
           <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 items-center relative z-10 gap-12">
              <div className="lg:col-span-6 lg:col-start-7 order-2 lg:order-2 flex flex-col gap-6 lg:gap-8 justify-center">
                 <div className="flex items-center gap-4 sm:gap-6 lg:flex-row-reverse text-right">
                   <div className="flex flex-col items-end">
                     <div className="w-[50px] sm:w-[80px] h-[2px] bg-orange-500/60 mb-2 sm:mb-4"></div>
                     <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.1em] uppercase text-white">हिलती-डुलती ज़मीन</h2>
                   </div>
                   <span className="text-[70px] sm:text-[100px] lg:text-[140px] font-bold text-orange-500/20 leading-none">06</span>
                 </div>
                 <div className="space-y-6 text-gray-200 text-lg sm:text-xl font-light leading-relaxed bg-black/80 p-6 sm:p-10 rounded-3xl backdrop-blur-md border border-white/10 text-left lg:text-right max-w-2xl lg:ml-auto shadow-2xl">
                    <p>
                      पृथ्वी सौरमंडल का इकलौता ग्रह है जिसकी सतह विशाल टेक्टोनिक प्लेट्स (tectonic plates) में बँटी हुई है। ये प्लेट्स हर साल कुछ सेंटीमीटर खिसकती रहती हैं — इतनी धीमी कि आप महसूस भी नहीं कर सकते।
                    </p>
                    <p>
                      लेकिन जब दो प्लेट्स एक-दूसरे से टकराती या रगड़ खाती हैं, तो भयानक भूकंप (earthquakes) आते हैं और ज्वालामुखी (volcanoes) फटते हैं। करोड़ों सालों में इन्हीं प्लेट्स ने महाद्वीपों को तोड़ा और जोड़ा है — एक ज़माने में सारे महाद्वीप जुड़कर <strong>&apos;Pangaea&apos;</strong> नाम का एक विशाल भूखंड बनाते थे।
                    </p>
                 </div>
              </div>
           </div>
        </section>

        {/* SECTION 8: AURORA (07 आसमान की रंगोली) */}
        <section className="relative w-full py-20 lg:py-32 bg-[#010204] overflow-hidden flex flex-col justify-center px-4 sm:px-8">
          <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 items-center relative z-10 gap-12 lg:gap-24">
            <div className="order-2 lg:order-1 w-full relative z-10 flex items-center justify-center">
              <div className="relative w-full aspect-[4/3] max-w-[600px] rounded-3xl overflow-hidden group shadow-2xl border border-white/10">
                 <Image src="/universe/planets/earth/bg07_earth_aurora.webp" alt="Northern Lights Aurora from space" fill className="object-cover opacity-100 group-hover:scale-105 transition-transform duration-1000" />
                 <div className="absolute inset-0 bg-black/30 z-10"></div>
              </div>
            </div>
            <div className="flex flex-col gap-6 lg:gap-8 order-1 lg:order-2 relative z-20">
               <div className="flex items-center gap-4 sm:gap-6">
                 <span className="text-[70px] sm:text-[100px] lg:text-[140px] font-bold text-green-400/20 leading-none drop-shadow-2xl">07</span>
                 <div className="flex flex-col">
                   <div className="w-[50px] sm:w-[80px] h-[2px] bg-green-400/60 mb-2 sm:mb-4"></div>
                   <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.1em] uppercase">आसमान की रंगोली</h2>
                 </div>
               </div>
               <div className="lg:pl-[120px] space-y-6 text-gray-200 text-lg sm:text-xl font-light leading-relaxed max-w-2xl">
                 <p>
                   Aurora (ध्रुवीय ज्योति) — यह प्रकृति का सबसे अद्भुत और जादुई नज़ारा है। जब सूरज से करोड़ों मील दूर से आने वाले charged particles पृथ्वी के मैग्नेटिक फील्ड से टकराते हैं, तो वे ध्रुवों की ओर खिंच जाते हैं।
                 </p>
                 <p>
                   वहाँ वायुमंडल की गैसों से इनकी टक्कर होती है और आसमान में हरे, बैंगनी, गुलाबी और नीले रंग की लहराती चादरें बिछ जाती हैं। उत्तरी ध्रुव पर इसे <strong>Aurora Borealis</strong> और दक्षिणी ध्रुव पर <strong>Aurora Australis</strong> कहते हैं। यह दृश्य इतना भव्य होता है कि इसे देखकर लगता है जैसे आसमान ज़िंदा हो उठा हो।
                 </p>
               </div>
            </div>
          </div>
        </section>

        {/* SECTION 9: LIFE (08 जीवन का चमत्कार) */}
        <section className="relative w-full py-20 lg:py-32 min-h-[700px] overflow-hidden px-4 sm:px-8 bg-black">
           <div className="absolute inset-0 z-0">
             <Image src="/universe/planets/earth/bg08_earth_life.webp" alt="Earth teeming with life" fill className="object-cover opacity-90" />
             <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>
           </div>
           <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 items-center relative z-10 gap-12">
              <div className="flex flex-col gap-6 lg:gap-8 relative z-20">
                 <div className="flex items-center gap-4 sm:gap-6">
                   <span className="text-[70px] sm:text-[100px] lg:text-[140px] font-bold text-emerald-400/20 leading-none">08</span>
                   <div className="flex flex-col">
                     <div className="w-[50px] sm:w-[80px] h-[2px] bg-emerald-400/60 mb-2 sm:mb-4"></div>
                     <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.1em] uppercase text-white">जीवन का चमत्कार</h2>
                   </div>
                 </div>
                 <div className="lg:ml-[120px] space-y-6 text-gray-100 text-lg sm:text-xl font-light leading-relaxed max-w-2xl bg-black/80 p-6 sm:p-10 rounded-3xl backdrop-blur-md border border-white/10 shadow-2xl">
                   <p className="text-shadow-md">
                     लगभग 3.8 अरब साल पहले, पृथ्वी के गर्म समुद्रों में पहली बार सूक्ष्म जीवन (microbes) ने जन्म लिया। वहाँ से शुरू हुई एक अनोखी यात्रा ने आज 87 लाख से ज़्यादा प्रजातियों को जन्म दिया है।
                   </p>
                   <p className="text-shadow-md">
                     समुद्र की सबसे गहरी खाई से लेकर हिमालय की सबसे ऊँची चोटी तक, ज्वालामुखी के खौलते पानी से लेकर अंटार्कटिका की बर्फीली चट्टानों तक — जीवन ने हर असंभव जगह अपना रास्ता खोज लिया। पृथ्वी यह साबित करती है कि <strong>जीवन ब्रह्मांड की सबसे ज़िद्दी ताकत है।</strong>
                   </p>
                 </div>
              </div>
           </div>
        </section>

        {/* SECTION 10: PALE BLUE DOT (09 अंतरिक्ष से पृथ्वी) */}
        <section className="relative w-full py-20 lg:py-32 bg-[#020509] overflow-hidden px-4 sm:px-8 border-b border-white/5">
           <div className="absolute inset-0 z-0">
             <Image src="/universe/planets/earth/bg09_earth_pale_blue_dot.webp" alt="Pale Blue Dot — Earth from deep space" fill className="object-cover opacity-80" />
             <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>
           </div>
           <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 items-center relative z-10 gap-12">
              <div className="lg:col-span-8 lg:col-start-5 order-2 lg:order-2 flex flex-col gap-6 lg:gap-8 justify-center z-20">
                 <div className="flex items-center gap-4 sm:gap-6 justify-start lg:justify-end">
                   <div className="flex flex-col text-left lg:text-right w-full">
                     <div className="w-[50px] sm:w-[80px] h-[2px] bg-blue-400/60 mb-2 sm:mb-4 lg:self-end"></div>
                     <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.1em] uppercase">अंतरिक्ष से पृथ्वी: Pale Blue Dot</h2>
                   </div>
                   <span className="text-[70px] sm:text-[100px] lg:text-[140px] font-bold text-blue-400/20 leading-none">09</span>
                 </div>
                 <div className="text-gray-200 text-lg sm:text-xl font-light leading-relaxed space-y-6 bg-black/80 p-6 sm:p-10 rounded-3xl backdrop-blur-md border border-white/10 text-left lg:text-right lg:ml-auto max-w-3xl shadow-2xl">
                    <p className="text-shadow-md">
                      1990 में, Voyager 1 अंतरिक्ष यान ने 6 अरब किलोमीटर की दूरी से पीछे मुड़कर पृथ्वी की एक तस्वीर ली। उस तस्वीर में पृथ्वी सूरज की एक किरण में तैरता हुआ एक हल्का नीला बिंदु (Pale Blue Dot) नज़र आया।
                    </p>
                    <p className="text-shadow-md">
                      महान वैज्ञानिक <strong>Carl Sagan</strong> ने इस तस्वीर को देखकर कहा — &quot;इस बिंदु को फिर से देखो। यही यहाँ है। यही घर है। यही हम हैं।&quot; वो नन्हा सा बिंदु — उस पर हर वो इंसान जिसने कभी प्यार किया, युद्ध लड़ा, खोज की, और सपने देखे — सब वहीं एक धूल के कण जितनी जगह पर हुए। यह तस्वीर हमें याद दिलाती है कि ब्रह्मांड के इस विशाल अंधेरे में, <strong>हमारा यह छोटा सा नीला ग्रह ही सब कुछ है।</strong>
                    </p>
                 </div>
              </div>
           </div>
        </section>

        {/* YOUTUBE FEATURED VIDEO */}
        <FeaturedVideo videoId="Fy0dOL81qWs" />

        {/* RELATED PLANETS WIDGET */}
        <NextPlanets currentPlanetId="earth" />

        {/* RELATED TOOLS SECTION */}
        <section className="bg-[#020509] border-t border-white/5 py-16 lg:py-24">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Explore More Space Tools</h2>
                <p className="text-gray-400 text-sm md:text-base">Continue your interactive journey across the cosmos.</p>
              </div>
              <Link href="/tools" className="mt-4 md:mt-0 text-blue-400 font-bold hover:text-blue-300 transition-colors uppercase text-xs tracking-wider">
                VIEW ALL TOOLS &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
              {[
                { title: "Space Age Calculator", desc: "How old are you on Earth or Neptune?", img: "/tools/tool-hero-bac1.webp", link: "/tools/space-age" },
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
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{tool.title}</h3>
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
                    className="flex-1 px-6 py-4 rounded-full bg-white/5 backdrop-blur-md border border-white/20 text-white placeholder:text-gray-400 outline-none focus:border-blue-500 transition-all text-base w-full shadow-inner"
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
