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

export default function MercuryCustomPage() {
  const { lang } = useLang();
  const body = getCelestialBody("mercury");
  if (!body) notFound();

  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const heroImages = [
    "/universe/planets/mercury/mercury1.png",
    "/universe/planets/mercury/mercury_art1.png",
    "/universe/planets/mercury/mercury_art3.png"
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
                 MERCURY
              </h1>
              <p className="mt-6 lg:mt-8 text-lg sm:text-xl xl:text-2xl leading-relaxed text-gray-200 font-light max-w-xl" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.8)" }}>
                बुध ग्रह (Mercury) हमारे सौरमंडल का सबसे छोटा और सूरज के सबसे करीब का ग्रह है। वायुमंडल ना होने की वजह से यहाँ दिन बहुत ज़्यादा गर्म और रातें बहुत ठंडी होती हैं।
              </p>
              
              {/* Stats Grid */}
              <div className="w-full grid grid-cols-2 gap-x-4 sm:gap-x-8 gap-y-6 sm:gap-y-8 pt-8 sm:pt-12 mt-6 sm:mt-10 border-t border-white/20">
                <div className="flex flex-col gap-1 sm:gap-3">
                  <span className="text-[10px] sm:text-xs tracking-[0.1em] text-white/70 uppercase font-semibold">दिन (Day)</span>
                  <span className="text-xl sm:text-2xl lg:text-3xl font-light">59 पृथ्वी दिन</span>
                </div>
                <div className="flex flex-col gap-1 sm:gap-3">
                  <span className="text-[10px] sm:text-xs tracking-[0.1em] text-white/70 uppercase font-semibold">रेडियस (Radius)</span>
                  <span className="text-xl sm:text-2xl lg:text-3xl font-light">2,439 किमी</span>
                </div>
                <div className="flex flex-col gap-1 sm:gap-3">
                  <span className="text-[10px] sm:text-xs tracking-[0.1em] text-white/70 uppercase font-semibold">चाँद (Moons)</span>
                  <span className="text-xl sm:text-2xl lg:text-3xl font-light">0 (शून्य)</span>
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
                 
                 {/* Background Glowing Rings anchored perfectly to the planet core */}
                 <div className="absolute w-[120%] h-[120%] bg-orange-600/10 rounded-full blur-[70px] xl:blur-[90px] pointer-events-none z-0 transition-opacity duration-1000"></div>
                 <div className="absolute w-[85%] h-[85%] rounded-full border border-white/20 pointer-events-none z-0 animate-pulse"></div>
                 <div className="absolute w-[110%] h-[110%] rounded-full border border-white/10 border-dashed animate-[spin_25s_linear_infinite] pointer-events-none z-0"></div>
                 <div className="absolute w-[135%] h-[135%] rounded-full border border-white/5 pointer-events-none z-0"></div>

                 {heroImages.map((src, index) => (
                    <Image
                      key={src}
                      src={src}
                      alt={`बुध ग्रह (Mercury Planet) Visual ${index + 1}`}
                      fill
                      className={`object-contain drop-shadow-[0_0_80px_rgba(255,255,255,0.15)] transition-all duration-[1500ms] ease-in-out ${
                        currentHeroImage === index ? "opacity-100 scale-100" : "opacity-0 scale-95"
                      }`}
                      priority={index === 0}
                    />
                 ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: BASIC INFO (01 ग्रह की जानकारी) */}
        <section className="relative w-full py-20 lg:py-32 bg-[#050a12] overflow-hidden flex flex-col justify-center px-4 sm:px-8">
          <div className="absolute top-0 right-0 w-full h-full z-0 opacity-30 pointer-events-none bg-gradient-to-l from-indigo-900/10 to-transparent"></div>
          <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 items-center relative z-10 gap-12 lg:gap-24">
            <div className="flex flex-col gap-6 lg:gap-8 order-2 lg:order-1 relative z-20">
               <div className="flex items-center gap-4 sm:gap-6">
                 <span className="text-[70px] sm:text-[100px] lg:text-[140px] font-bold text-[#b4b4bb] leading-none drop-shadow-2xl opacity-50">01</span>
                 <div className="flex flex-col">
                   <div className="w-[50px] sm:w-[80px] h-[2px] bg-white/60 mb-2 sm:mb-4"></div>
                   <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.1em] uppercase">ग्रह की जानकारी</h2>
                 </div>
               </div>
               <div className="lg:pl-[120px] space-y-6 text-gray-200 text-lg sm:text-xl font-light leading-relaxed max-w-2xl">
                 <p>
                   बुध ग्रह देखने में बिल्कुल हमारे चाँद जैसा लगता है। यह पूरी तरह से भारी चट्टानों और ठोस पत्थरों से बना है। इसकी पूरी सतह पर आपको बड़े-बड़े गड्ढे (craters) दिखाई देंगे। 
                 </p>
                 <p>
                   इसका सीधा सा मतलब है कि यहाँ करोड़ों सालों से कोई भी बड़ी भौगोलिक हलचल (तबाही, भूकंप, या ज्वालामुखी) नहीं हुई है जो इन निशानों को मिटा सके। तेज़ी से सूरज का चक्कर लगाने की वजह से ही इसका नाम रोमन सभ्यता के सबसे तेज़ देवता 'Mercury' के नाम पर रखा गया है।
                 </p>
               </div>
            </div>
            <div className="order-1 lg:order-2 w-full relative z-10 flex items-center justify-center">
              <div className="relative w-full aspect-square max-w-[500px] rounded-[30px] overflow-hidden group">
                 <div className="absolute inset-0 z-0 shadow-inner">
                    <Image src="/universe/planets/mercury/bg01_mercury_overview.webp" alt="Space Art" fill className="object-cover opacity-100 contrast-125 saturate-50 scale-110 group-hover:scale-105 transition-transform duration-1000" />
                    <div className="absolute inset-0 bg-gradient-to-bl from-transparent to-[#050a12]/50 z-10"></div>
                 </div>
                 <div className="relative w-[80%] h-[80%] m-[10%] z-20 group-hover:scale-[1.02] transition-transform duration-700">
                    {/* The messenger spacecraft image was causing missing file errors. Removed or you can specify a new file later */}
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: TEMPERATURE (02 तापमान का खेल) */}
        <section className="relative w-full py-20 lg:py-32 min-h-[700px] overflow-hidden px-4 sm:px-8 bg-black">
           <div className="absolute inset-0 z-0">
             <Image src="/universe/planets/mercury/bg02_mercury_temperature.webp" alt="Cinematic High Contrast" fill className="object-cover opacity-90" />
             <div className="absolute inset-0 bg-black/30 pointer-events-none"></div>
           </div>
           <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 items-center relative z-10 gap-12">
              <div className="hidden lg:block order-1"></div>
              <div className="flex flex-col gap-6 lg:gap-8 order-2 lg:order-1 relative z-20">
                 <div className="flex items-center gap-4 sm:gap-6">
                   <span className="text-[70px] sm:text-[100px] lg:text-[140px] font-bold text-white/30 leading-none">02</span>
                   <div className="flex flex-col">
                     <div className="w-[50px] sm:w-[80px] h-[2px] bg-red-500/80 mb-2 sm:mb-4"></div>
                     <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.1em] uppercase text-white">तापमान का खेल</h2>
                   </div>
                 </div>
                 <div className="lg:ml-[120px] space-y-6 text-gray-100 text-lg sm:text-xl font-light leading-relaxed max-w-2xl bg-black/70 p-6 sm:p-10 rounded-3xl backdrop-blur-md border border-white/10 shadow-2xl">
                   <p className="text-shadow-md">
                     सुनने में यह बहुत अजीब लगता है पर बुध की सुबह आग उगलती है और रातें बर्फ जमा देती हैं। 
                   </p>
                   <p className="text-shadow-md">
                     सूरज के ठीक सामने वाले हिस्से का तापमान 430°C तक पहुँच जाता है—इतना ज़्यादा गर्म कि वहाँ रखा सीसा (lead) भी पिघलकर बह जाए! लेकिन चूँकि बुध पर उस गर्मी को रोक कर रखने वाला कोई वायुमंडल (atmosphere) नहीं है, तो रात के समय यही तापमान अचानक से गिरकर -180°C तक चला जाता है।
                   </p>
                 </div>
              </div>
           </div>
        </section>

        {/* SECTION 4: SURFACE (03 सतह के राज़) */}
        <section className="relative w-full py-20 lg:py-32 bg-[#020509] overflow-hidden px-4 sm:px-8">
           <div className="absolute inset-0 z-0">
             <Image src="/universe/planets/mercury/bg03_mercury_surface_closeup.webp" alt="Mercury Surface" fill className="object-cover opacity-80" />
             <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>
           </div>
           <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 items-center relative z-10 gap-12">
              <div className="lg:col-span-6 order-2 lg:order-2 flex flex-col gap-6 lg:gap-8 justify-center">
                 <div className="flex items-center gap-4 sm:gap-6 justify-start lg:justify-end">
                   <div className="flex flex-col text-left lg:text-right w-full">
                     <div className="w-[50px] sm:w-[80px] h-[2px] bg-white/40 mb-2 sm:mb-4 lg:self-end"></div>
                     <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.1em] uppercase">सतह के राज़</h2>
                   </div>
                   <span className="text-[70px] sm:text-[100px] lg:text-[140px] font-bold text-white/30 leading-none">03</span>
                 </div>
                 
                 <div className="text-gray-200 text-lg sm:text-xl font-light leading-relaxed space-y-6 bg-black/80 p-6 sm:p-10 rounded-3xl backdrop-blur-md border border-white/10 text-left lg:text-right lg:ml-auto max-w-2xl shadow-2xl">
                    <p>
                      अनगिनत क्षुद्रग्रहों (asteroids) और उल्कापिंडों की लगातार टक्कर ने बुध की ज़मीन पर बड़े-बड़े गड्ढे कर दिए हैं।
                    </p>
                    <p>
                      यहाँ का सबसे विशाल गढ्ढा 'कैलोरिस बेसिन' (Caloris Basin) है जो लगभग 1,550 किलोमीटर चौड़ा है। चोटें इतनी गहरी हैं कि आपको यहाँ 3 किलोमीटर तक ऊँची टूटी-फूटी चट्टानें (cliffs) देखने को मिलेंगी, जिन्हें विज्ञान की भाषा में 'Lobate scarps' कहा जाता है।
                    </p>
                 </div>
              </div>
           </div>
        </section>

        {/* SECTION 5: CORE (04 लोहे का विशाल कोर) */}
        <section className="relative w-full py-20 lg:py-32 bg-[#010204] overflow-hidden flex flex-col justify-center px-4 sm:px-8">
          <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 items-center relative z-10 gap-12 lg:gap-24">
            <div className="order-2 lg:order-1 w-full relative z-10 flex items-center justify-center">
              <div className="relative w-full aspect-square max-w-[600px] group rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                 <Image src="/universe/planets/mercury/bg04_mercury_core.webp" alt="Mercury Core Structure" fill className="object-cover opacity-100 group-hover:scale-105 transition-transform duration-1000" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30"></div>
              </div>
            </div>
            <div className="flex flex-col gap-6 lg:gap-8 order-1 lg:order-2 relative z-20">
               <div className="flex items-center gap-4 sm:gap-6">
                 <span className="text-[70px] sm:text-[100px] lg:text-[140px] font-bold text-orange-500/30 leading-none drop-shadow-2xl">04</span>
                 <div className="flex flex-col">
                   <div className="w-[50px] sm:w-[80px] h-[2px] bg-orange-500/60 mb-2 sm:mb-4"></div>
                   <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.1em] uppercase">लोहे का विशाल कोर</h2>
                 </div>
               </div>
               <div className="lg:pl-[120px] space-y-6 text-gray-200 text-lg sm:text-xl font-light leading-relaxed max-w-2xl">
                 <p>
                   देखने में बुध भले ही नन्हा ग्रह लगता हो, लेकिन अंदर से यह भारी और ठोस है। हैरानी की बात यह है कि इसका 85% हिस्सा सिर्फ एक विशालकाय लोहे के गोले (Iron Core) से बना है। 
                 </p>
                 <p>
                   कुछ अंतरिक्ष वैज्ञानिकों का यह मानना है कि अरबों साल पहले शायद किसी अन्य बड़े ग्रह की टक्कर से इसकी ऊपर की परत (crust) पूरी तरह से उड़ गई होगी, और जो बच गया, वह है महज़ यह भारी लोहे का कोर। ये ब्रह्मांड के महान रहस्यों में से एक है।
                 </p>
               </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: MISSIONS (05 अंतरिक्ष मिशन) */}
        <section className="relative w-full py-20 lg:py-32 min-h-[700px] overflow-hidden px-4 sm:px-8 bg-black">
           <div className="absolute inset-0 z-0">
             <Image src="/universe/planets/mercury/bg05_mercury_messenger_mission.webp" alt="Futuristic Spacecraft" fill className="object-cover opacity-90" />
             <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>
           </div>
           <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 items-center relative z-10 gap-12">
              <div className="flex flex-col gap-6 lg:gap-8 relative z-20">
                 <div className="flex items-center gap-4 sm:gap-6">
                   <span className="text-[70px] sm:text-[100px] lg:text-[140px] font-bold text-blue-500/20 leading-none">05</span>
                   <div className="flex flex-col">
                     <div className="w-[50px] sm:w-[80px] h-[2px] bg-blue-500/60 mb-2 sm:mb-4"></div>
                     <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.1em] uppercase">अंतरिक्ष मिशन</h2>
                   </div>
                 </div>
                 <div className="lg:ml-[120px] space-y-6 text-gray-100 text-lg sm:text-xl font-light leading-relaxed max-w-2xl bg-black/80 p-6 sm:p-10 rounded-3xl backdrop-blur-md border border-white/10 shadow-2xl">
                   <p className="text-shadow-md">
                     सूरज के बेहद भारी गुरुत्वाकर्षण (gravity force) और भयानक गर्मी को चीरते हुए बुध तक पहुँचना किसी स्पेसक्राफ्ट (Spacecraft) के लिए लोहे के चने चबाना जैसा है।
                   </p>
                   <p className="text-shadow-md">
                     फिर भी, <strong>NASA का MESSENGER</strong> मिशन आज तक का सबसे कामयाब प्रयास साबित हुआ जिसने पूरे ग्रह का बारीकी से नक़्शा तैयार किया। अब <strong>BepiColombo</strong> नाम का एक नया सुपर एडवांस मिशन इस अनसुलझे ग्रह के बाकी राज़ों से पर्दा उठाने के लिए रवाना हो चुका है।
                   </p>
                 </div>
              </div>
           </div>
        </section>

        {/* SECTION 7: ORBIT AND ROTATION (06 समय की अजीब चाल) */}
        <section className="relative w-full py-20 lg:py-32 bg-[#020509] overflow-hidden px-4 sm:px-8">
           <div className="absolute inset-0 z-0 flex justify-end pointer-events-none">
             <Image src="/universe/planets/mercury/bg06_mercury_orbit_bg.webp" alt="Mercury Orbit Lines" fill className="object-cover opacity-70" />
             <div className="absolute inset-0 bg-gradient-to-l from-[#020509]/20 via-[#020509]/60 to-[#020509]"></div>
           </div>
           <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 items-center relative z-10 gap-12">
              <div className="lg:col-span-6 lg:col-start-7 order-2 lg:order-2 flex flex-col gap-6 lg:gap-8 justify-center">
                 <div className="flex items-center gap-4 sm:gap-6 lg:flex-row-reverse text-right">
                   <div className="flex flex-col items-end">
                     <div className="w-[50px] sm:w-[80px] h-[2px] bg-purple-500/60 mb-2 sm:mb-4"></div>
                     <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.1em] uppercase text-white">समय की अजीब चाल</h2>
                   </div>
                   <span className="text-[70px] sm:text-[100px] lg:text-[140px] font-bold text-purple-500/20 leading-none">06</span>
                 </div>
                 <div className="space-y-6 text-gray-200 text-lg sm:text-xl font-light leading-relaxed bg-black/80 p-6 sm:p-10 rounded-3xl backdrop-blur-md border border-white/10 text-left lg:text-right max-w-2xl lg:ml-auto shadow-2xl">
                    <p>
                      बुध पर समय बिल्कुल किसी साइंस-फिक्शन फ़िल्म की तरह काम करता है। यहाँ एक साल (सूरज का एक चक्कर) सिर्फ 88 पृथ्वी-दिनों में पलक झपकते ही पूरा हो जाता है। 
                    </p>
                    <p>
                      लेकिन हैरान कर देने वाली बात ये है कि अपनी धुरी पर काफी धीमे घूमने के कारण, यहाँ सूरज के उगने से लेकर अगले दिन सूरज उगने तक (एक पूरा दिन), पूरे 176 पृथ्वी-दिन लग जाते हैं! मतलब बुध पर <strong>एक दिन इसके एक साल से भी ज़्यादा लम्बा</strong> होता है।
                    </p>
                 </div>
              </div>
           </div>
        </section>

        {/* SECTION 8: MAGNETIC FIELD (07 चुम्बकीय कवच) */}
        <section className="relative w-full py-20 lg:py-32 bg-[#010204] overflow-hidden flex flex-col justify-center px-4 sm:px-8">
          <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 items-center relative z-10 gap-12 lg:gap-24">
            <div className="order-2 lg:order-1 w-full relative z-10 flex items-center justify-center">
              <div className="relative w-full aspect-[4/3] max-w-[600px] rounded-3xl overflow-hidden group shadow-2xl border border-white/10">
                 <Image src="/universe/planets/mercury/bg07_mercury_magnetic.webp" alt="Mercury Magnetic Field" fill className="object-cover opacity-100 group-hover:scale-105 transition-transform duration-1000" />
                 <div className="absolute inset-0 bg-black/30 z-10"></div>
              </div>
            </div>
            <div className="flex flex-col gap-6 lg:gap-8 order-1 lg:order-2 relative z-20">
               <div className="flex items-center gap-4 sm:gap-6">
                 <span className="text-[70px] sm:text-[100px] lg:text-[140px] font-bold text-teal-500/20 leading-none drop-shadow-2xl">07</span>
                 <div className="flex flex-col">
                   <div className="w-[50px] sm:w-[80px] h-[2px] bg-teal-500/60 mb-2 sm:mb-4"></div>
                   <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.1em] uppercase">चुम्बकीय कवच</h2>
                 </div>
               </div>
               <div className="lg:pl-[120px] space-y-6 text-gray-200 text-lg sm:text-xl font-light leading-relaxed max-w-2xl">
                 <p>
                   अक्सर छोटे और धीमी गति से घूमने वाले ग्रहों में कोई भी 'मैग्नेटिक फील्ड' (चुम्बकीय शक्ति) नहीं पाई जाती। वैज्ञानिकों ने तो ये मान ही लिया था कि बुध पूरी तरह से शांत और मृत ग्रह है। 
                 </p>
                 <p>
                   परन्तु जब जांच की गई तो पता चला कि इसके पास ख़ुद का एक सक्रीय चुम्बकीय क्षेत्र है! हालाँकि ये पृथ्वी के मैग्नेटिक फील्ड से लगभग 100 गुना कमज़ोर है, फिर भी यह तेज़ और विनाशकारी सौर-हवाओं (solar winds) से बुध को काफी हद तक बचाता है।
                 </p>
               </div>
            </div>
          </div>
        </section>

        {/* SECTION 9: ICE AT POLES (08 आग के पास बर्फ) */}
        <section className="relative w-full py-20 lg:py-32 min-h-[700px] overflow-hidden px-4 sm:px-8 bg-black">
           <div className="absolute inset-0 z-0">
             <Image src="/universe/planets/mercury/bg08_mercury_polar_ice.webp.webp" alt="Ice on Mercury Poles" fill className="object-cover opacity-90" />
             <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>
           </div>
           <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 items-center relative z-10 gap-12">
              <div className="flex flex-col gap-6 lg:gap-8 relative z-20">
                 <div className="flex items-center gap-4 sm:gap-6">
                   <span className="text-[70px] sm:text-[100px] lg:text-[140px] font-bold text-cyan-500/20 leading-none">08</span>
                   <div className="flex flex-col">
                     <div className="w-[50px] sm:w-[80px] h-[2px] bg-cyan-500/60 mb-2 sm:mb-4"></div>
                     <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.1em] uppercase text-white">आग के पास बर्फ</h2>
                   </div>
                 </div>
                 <div className="lg:ml-[120px] space-y-6 text-gray-100 text-lg sm:text-xl font-light leading-relaxed max-w-2xl bg-black/80 p-6 sm:p-10 rounded-3xl backdrop-blur-md border border-white/10 shadow-2xl">
                   <p className="text-shadow-md">
                     ये एक ऐसा सच है जो पहली बार सुनने पर मज़ाक लगता है! सवाल ये है कि जिस ग्रह से आग बरसती हो, वहाँ बर्फ कैसे हो सकती है? 
                   </p>
                   <p className="text-shadow-md">
                     जवाब है—अंधेरे गड्ढे। बुध के उत्तरी और दक्षिणी ध्रुवों (Poles) पर कुछ ऐसे गहरे गड्ढे मौजूद हैं, जहाँ सूरज की एक भी किरण कभी पहुंच ही नहीं पाती। वहाँ हमेशा पिच-ब्लैक अंधेरा होता है। उस अंधेरे में तापमान इतना बर्फीला रहता है कि वहाँ आज भी पानी की बर्फ के विशाल भण्डार बिलकुल सुरक्षित रूप में मौजूद हैं।
                   </p>
                 </div>
              </div>
           </div>
        </section>

        {/* SECTION 10: SKY VIEW (09 बुध का आसमान) */}
        <section className="relative w-full py-20 lg:py-32 bg-[#020509] overflow-hidden px-4 sm:px-8 border-b border-white/5">
           <div className="absolute inset-0 z-0">
             <Image src="/universe/planets/mercury/bg09_mercury_sky_view.webp.webp" alt="Mercury Sky without atmosphere" fill className="object-cover opacity-80" />
             <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>
           </div>
           <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 items-center relative z-10 gap-12">
              <div className="lg:col-span-8 lg:col-start-5 order-2 lg:order-2 flex flex-col gap-6 lg:gap-8 justify-center z-20">
                 <div className="flex items-center gap-4 sm:gap-6 justify-start lg:justify-end">
                   <div className="flex flex-col text-left lg:text-right w-full">
                     <div className="w-[50px] sm:w-[80px] h-[2px] bg-yellow-400/60 mb-2 sm:mb-4 lg:self-end"></div>
                     <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.1em] uppercase">बुध का आसमान: एक अलग ही नज़ारा</h2>
                   </div>
                   <span className="text-[70px] sm:text-[100px] lg:text-[140px] font-bold text-yellow-400/20 leading-none">09</span>
                 </div>
                 <div className="text-gray-200 text-lg sm:text-xl font-light leading-relaxed space-y-6 bg-black/80 p-6 sm:p-10 rounded-3xl backdrop-blur-md border border-white/10 text-left lg:text-right lg:ml-auto max-w-3xl shadow-2xl">
                    <p className="text-shadow-md">
                      कल्पना कीजिए कि आप स्पेस-सूट पहन कर बुध ग्रह की ज़बान पर खड़े होकर ऊपर सूरज की तरफ देख रहे हैं। 
                    </p>
                    <p className="text-shadow-md">
                      वहाँ से आपको सूरज हमारी पृथ्वी के मुकाबले <strong>3 गुना से भी ज़्यादा बड़ा</strong> और 11 गुना ज़्यादा चमकदार दिखाई देगा! और सबसे बड़ी बात, चूँकि वहाँ रोशनी को फैलाने वाली कोई हवा या वायुमंडल (atmosphere) नहीं है, तो वहाँ का आसमान पृथ्वी जैसा नीला नहीं, बल्कि चिलचिलाती धूप और भयानक गर्मी के दिन में भी बिल्कुल <strong>काला (Pitch Black)</strong> दिखाई देगा।
                    </p>
                 </div>
              </div>
           </div>
        </section>

        {/* YOUTUBE FEATURED VIDEO */}
        <FeaturedVideo videoId="dG2CGf5B1bI" />

        {/* RELATED PLANETS WIDGET */}
        <NextPlanets currentPlanetId="mercury" />

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
                { title: "Space Age Calculator", desc: "How old are you on Mercury or Neptune?", img: "/tools/tool-hero-bac1.webp", link: "/tools/space-age" },
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
              {/* Dark Overlays */}
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
