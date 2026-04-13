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

export default function MarsCustomPage() {
  const { lang } = useLang();
  const body = getCelestialBody("mars");
  if (!body) notFound();

  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const heroImages = [
    "/universe/planets/mars/mars1.png",
    "/universe/planets/mars/mars_art1.webp",
    "/universe/planets/mars/mars_art2.webp"
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
                 MARS
              </h1>
              <p className="mt-6 lg:mt-8 text-lg sm:text-xl xl:text-2xl leading-relaxed text-gray-200 font-light max-w-xl" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.8)" }}>
                मंगल ग्रह (Mars) — सौरमंडल का वो लाल रंग का रहस्यमयी ग्रह जिसने हज़ारों सालों से इंसानों को अपनी ओर खींचा है। यह पृथ्वी के बाद सबसे ज़्यादा खोजा गया ग्रह है और इंसानों की अगली बड़ी मंज़िल।
              </p>

              {/* Stats Grid */}
              <div className="w-full grid grid-cols-2 gap-x-4 sm:gap-x-8 gap-y-6 sm:gap-y-8 pt-8 sm:pt-12 mt-6 sm:mt-10 border-t border-white/20">
                <div className="flex flex-col gap-1 sm:gap-3">
                  <span className="text-[10px] sm:text-xs tracking-[0.1em] text-white/70 uppercase font-semibold">दिन (Day)</span>
                  <span className="text-xl sm:text-2xl lg:text-3xl font-light">24.6 घंटे</span>
                </div>
                <div className="flex flex-col gap-1 sm:gap-3">
                  <span className="text-[10px] sm:text-xs tracking-[0.1em] text-white/70 uppercase font-semibold">रेडियस (Radius)</span>
                  <span className="text-xl sm:text-2xl lg:text-3xl font-light">3,389 किमी</span>
                </div>
                <div className="flex flex-col gap-1 sm:gap-3">
                  <span className="text-[10px] sm:text-xs tracking-[0.1em] text-white/70 uppercase font-semibold">चाँद (Moons)</span>
                  <span className="text-xl sm:text-2xl lg:text-3xl font-light">2 (फोबोस, डीमोस)</span>
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

                 {/* Background Glowing Rings — Mars themed (Red/Orange) */}
                 <div className="absolute w-[120%] h-[120%] bg-red-600/15 rounded-full blur-[70px] xl:blur-[90px] pointer-events-none z-0 transition-opacity duration-1000"></div>
                 <div className="absolute w-[85%] h-[85%] rounded-full border border-red-500/25 pointer-events-none z-0 animate-pulse"></div>
                 <div className="absolute w-[110%] h-[110%] rounded-full border border-orange-500/15 border-dashed animate-[spin_25s_linear_infinite] pointer-events-none z-0"></div>
                 <div className="absolute w-[135%] h-[135%] rounded-full border border-white/5 pointer-events-none z-0"></div>

                 {heroImages.map((src, index) => (
                    <Image
                      key={src}
                      src={src}
                      alt={`मंगल ग्रह (Mars Planet) Visual ${index + 1}`}
                      fill
                      className={`object-contain drop-shadow-[0_0_80px_rgba(239,68,68,0.2)] transition-all duration-[1500ms] ease-in-out ${
                        currentHeroImage === index ? "opacity-100 scale-100" : "opacity-0 scale-95"
                      }`}
                      priority={index === 0}
                    />
                 ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: BASIC INFO (01 लाल ग्रह) */}
        <section className="relative w-full py-20 lg:py-32 bg-[#050a12] overflow-hidden flex flex-col justify-center px-4 sm:px-8">
          <div className="absolute top-0 right-0 w-full h-full z-0 opacity-30 pointer-events-none bg-gradient-to-l from-red-900/10 to-transparent"></div>
          <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 items-center relative z-10 gap-12 lg:gap-24">
            <div className="flex flex-col gap-6 lg:gap-8 order-2 lg:order-1 relative z-20">
               <div className="flex items-center gap-4 sm:gap-6">
                 <span className="text-[70px] sm:text-[100px] lg:text-[140px] font-bold text-[#b4b4bb] leading-none drop-shadow-2xl opacity-50">01</span>
                 <div className="flex flex-col">
                   <div className="w-[50px] sm:w-[80px] h-[2px] bg-white/60 mb-2 sm:mb-4"></div>
                   <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.1em] uppercase">लाल ग्रह</h2>
                 </div>
               </div>
               <div className="lg:pl-[120px] space-y-6 text-gray-200 text-lg sm:text-xl font-light leading-relaxed max-w-2xl">
                 <p>
                   मंगल ग्रह को &apos;Red Planet&apos; (लाल ग्रह) कहा जाता है और इसकी वजह है इसकी मिट्टी में भारी मात्रा में मौजूद आयरन ऑक्साइड (Iron Oxide) — यानी साधारण भाषा में कहें तो जंग (Rust)। हाँ, पूरा ग्रह शाब्दिक रूप से जंग लगी लोहे की धूल से ढका हुआ है!
                 </p>
                 <p>
                   यही लाल धूल हवा में भी उड़ती रहती है, जिससे मंगल का आसमान भी गुलाबी-लाल रंग का दिखाई देता है। प्राचीन रोमन सभ्यता में इसके खूनी लाल रंग को देखकर इसका नाम युद्ध के देवता &apos;Mars&apos; के नाम पर रखा गया। भारतीय ज्योतिष में भी मंगल को योद्धा ग्रह माना जाता है।
                 </p>
               </div>
            </div>
            <div className="order-1 lg:order-2 w-full relative z-10 flex items-center justify-center">
              <div className="relative w-full aspect-square max-w-[500px] rounded-[30px] overflow-hidden group">
                 <div className="absolute inset-0 z-0 shadow-inner">
                    <Image src="/universe/planets/mars/bg01_mars_red_planet.webp" alt="Mars red surface landscape" fill className="object-cover opacity-100 contrast-125 saturate-50 scale-110 group-hover:scale-105 transition-transform duration-1000" />
                    <div className="absolute inset-0 bg-gradient-to-bl from-transparent to-[#050a12]/50 z-10"></div>
                 </div>
                 <div className="relative w-[80%] h-[80%] m-[10%] z-20 group-hover:scale-[1.02] transition-transform duration-700">
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: OLYMPUS MONS (02 सबसे ऊँचा पहाड़) */}
        <section className="relative w-full py-20 lg:py-32 min-h-[700px] overflow-hidden px-4 sm:px-8 bg-black">
           <div className="absolute inset-0 z-0">
             <Image src="/universe/planets/mars/bg02_mars_olympus_mons.webp" alt="Olympus Mons — tallest volcano in solar system" fill className="object-cover opacity-90" />
             <div className="absolute inset-0 bg-black/30 pointer-events-none"></div>
           </div>
           <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 items-center relative z-10 gap-12">
              <div className="hidden lg:block order-1"></div>
              <div className="flex flex-col gap-6 lg:gap-8 order-2 lg:order-1 relative z-20">
                 <div className="flex items-center gap-4 sm:gap-6">
                   <span className="text-[70px] sm:text-[100px] lg:text-[140px] font-bold text-red-500/30 leading-none">02</span>
                   <div className="flex flex-col">
                     <div className="w-[50px] sm:w-[80px] h-[2px] bg-red-500/80 mb-2 sm:mb-4"></div>
                     <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.1em] uppercase text-white">सबसे ऊँचा पहाड़</h2>
                   </div>
                 </div>
                 <div className="lg:ml-[120px] space-y-6 text-gray-100 text-lg sm:text-xl font-light leading-relaxed max-w-2xl bg-black/70 p-6 sm:p-10 rounded-3xl backdrop-blur-md border border-white/10 shadow-2xl">
                   <p className="text-shadow-md">
                     मंगल ग्रह पर &apos;ओलम्पस मोन्स&apos; (Olympus Mons) नाम का एक ज्वालामुखी खड़ा है जो पूरे सौरमंडल की सबसे ऊँची चोटी है। इसकी ऊँचाई लगभग 21.9 किलोमीटर है — हमारे माउंट एवरेस्ट (8.8 किमी) से लगभग ढाई गुना ज़्यादा!
                   </p>
                   <p className="text-shadow-md">
                     यह इतना विशाल है कि इसका आधार (base) पूरे फ्रांस देश के बराबर फैला हुआ है। अगर आप इसके किनारे पर खड़े हों तो इसकी ढलान इतनी धीमी है कि आपको पता ही नहीं चलेगा कि आप एक पहाड़ पर चढ़ रहे हैं। यह ज्वालामुखी अरबों सालों से शांत (dormant) है लेकिन वैज्ञानिक मानते हैं कि यह पूरी तरह मरा नहीं है।
                   </p>
                 </div>
              </div>
           </div>
        </section>

        {/* SECTION 4: VALLES MARINERIS (03 ब्रह्मांड की सबसे बड़ी खाई) */}
        <section className="relative w-full py-20 lg:py-32 bg-[#020509] overflow-hidden px-4 sm:px-8">
           <div className="absolute inset-0 z-0">
             <Image src="/universe/planets/mars/bg03_mars_valles_marineris.webp" alt="Valles Marineris canyon system" fill className="object-cover opacity-80" />
             <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>
           </div>
           <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 items-center relative z-10 gap-12">
              <div className="lg:col-span-6 order-2 lg:order-2 flex flex-col gap-6 lg:gap-8 justify-center">
                 <div className="flex items-center gap-4 sm:gap-6 justify-start lg:justify-end">
                   <div className="flex flex-col text-left lg:text-right w-full">
                     <div className="w-[50px] sm:w-[80px] h-[2px] bg-orange-400/40 mb-2 sm:mb-4 lg:self-end"></div>
                     <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.1em] uppercase">ब्रह्मांड की सबसे बड़ी खाई</h2>
                   </div>
                   <span className="text-[70px] sm:text-[100px] lg:text-[140px] font-bold text-orange-400/30 leading-none">03</span>
                 </div>

                 <div className="text-gray-200 text-lg sm:text-xl font-light leading-relaxed space-y-6 bg-black/80 p-6 sm:p-10 rounded-3xl backdrop-blur-md border border-white/10 text-left lg:text-right lg:ml-auto max-w-2xl shadow-2xl">
                    <p>
                      जिस तरह मंगल पर सबसे ऊँचा पहाड़ है, उसी तरह यहाँ सौरमंडल की सबसे गहरी और लम्बी खाई भी मौजूद है — &apos;वैलेस मैरिनेरिस&apos; (Valles Marineris)।
                    </p>
                    <p>
                      यह विशाल घाटी प्रणाली लगभग 4,000 किलोमीटर लम्बी, 200 किलोमीटर चौड़ी और 7 किलोमीटर गहरी है। तुलना के लिए, अमेरिका का मशहूर Grand Canyon सिर्फ 446 किमी लम्बा और 1.8 किमी गहरा है। वैलेस मैरिनेरिस इतनी विशाल है कि इसे <strong>अंतरिक्ष से भी नंगी आँखों से देखा जा सकता है।</strong>
                    </p>
                 </div>
              </div>
           </div>
        </section>

        {/* SECTION 5: WATER (04 पानी की खोज) */}
        <section className="relative w-full py-20 lg:py-32 bg-[#010204] overflow-hidden flex flex-col justify-center px-4 sm:px-8">
          <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 items-center relative z-10 gap-12 lg:gap-24">
            <div className="order-2 lg:order-1 w-full relative z-10 flex items-center justify-center">
              <div className="relative w-full aspect-square max-w-[600px] group rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                 <Image src="/universe/planets/mars/bg04_mars_ancient_water.webp" alt="Ancient river beds on Mars" fill className="object-cover opacity-100 group-hover:scale-105 transition-transform duration-1000" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30"></div>
              </div>
            </div>
            <div className="flex flex-col gap-6 lg:gap-8 order-1 lg:order-2 relative z-20">
               <div className="flex items-center gap-4 sm:gap-6">
                 <span className="text-[70px] sm:text-[100px] lg:text-[140px] font-bold text-cyan-500/30 leading-none drop-shadow-2xl">04</span>
                 <div className="flex flex-col">
                   <div className="w-[50px] sm:w-[80px] h-[2px] bg-cyan-500/60 mb-2 sm:mb-4"></div>
                   <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.1em] uppercase">पानी की खोज</h2>
                 </div>
               </div>
               <div className="lg:pl-[120px] space-y-6 text-gray-200 text-lg sm:text-xl font-light leading-relaxed max-w-2xl">
                 <p>
                   आज मंगल एक सूखा और बंजर रेगिस्तान है, लेकिन अरबों साल पहले यहाँ का नज़ारा बिल्कुल अलग था। वैज्ञानिकों को मंगल की सतह पर सूखी नदियों के निशान, झीलों के पुराने किनारे, और बहते पानी से बने गोल पत्थर (rounded pebbles) मिले हैं।
                 </p>
                 <p>
                   2018 में European Space Agency ने मंगल के दक्षिणी ध्रुव के नीचे एक <strong>विशाल भूमिगत तरल पानी की झील</strong> खोजी — लगभग 20 किलोमीटर चौड़ी! इसके अलावा ध्रुवों पर आज भी पानी की बर्फ (water ice) और सूखी बर्फ (CO₂ ice) की मोटी चादरें मौजूद हैं। जहाँ पानी है, वहाँ जीवन की उम्मीद है।
                 </p>
               </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: DUST STORMS (05 भयानक धूल भरी आँधी) */}
        <section className="relative w-full py-20 lg:py-32 min-h-[700px] overflow-hidden px-4 sm:px-8 bg-black">
           <div className="absolute inset-0 z-0">
             <Image src="/universe/planets/mars/bg05_mars_dust_storm.webp" alt="Massive dust storm engulfing Mars" fill className="object-cover opacity-90" />
             <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>
           </div>
           <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 items-center relative z-10 gap-12">
              <div className="flex flex-col gap-6 lg:gap-8 relative z-20">
                 <div className="flex items-center gap-4 sm:gap-6">
                   <span className="text-[70px] sm:text-[100px] lg:text-[140px] font-bold text-amber-600/20 leading-none">05</span>
                   <div className="flex flex-col">
                     <div className="w-[50px] sm:w-[80px] h-[2px] bg-amber-600/60 mb-2 sm:mb-4"></div>
                     <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.1em] uppercase">भयानक धूल भरी आँधी</h2>
                   </div>
                 </div>
                 <div className="lg:ml-[120px] space-y-6 text-gray-100 text-lg sm:text-xl font-light leading-relaxed max-w-2xl bg-black/80 p-6 sm:p-10 rounded-3xl backdrop-blur-md border border-white/10 shadow-2xl">
                   <p className="text-shadow-md">
                     मंगल ग्रह पर सौरमंडल के सबसे भयंकर धूल के तूफ़ान (Dust Storms) आते हैं। ये तूफ़ान इतने विशाल होते हैं कि कभी-कभी पूरे ग्रह को हफ्तों-महीनों तक पूरी तरह ढक लेते हैं — इसे &apos;Global Dust Storm&apos; कहते हैं।
                   </p>
                   <p className="text-shadow-md">
                     2018 में आए एक ऐसे ही ग्लोबल तूफ़ान ने NASA के <strong>Opportunity रोवर</strong> की सोलर पैनलों को इतनी धूल से ढक दिया कि उसे सूरज की रोशनी मिलनी बंद हो गई और 15 साल से काम कर रहा यह बहादुर रोबोट हमेशा के लिए बंद हो गया। उसका आखिरी संदेश था — &quot;मेरी बैटरी कम हो रही है और अंधेरा छा रहा है।&quot;
                   </p>
                 </div>
              </div>
           </div>
        </section>

        {/* SECTION 7: SUNSET (06 नीला सूर्यास्त) */}
        <section className="relative w-full py-20 lg:py-32 bg-[#020509] overflow-hidden px-4 sm:px-8">
           <div className="absolute inset-0 z-0 flex justify-end pointer-events-none">
             <Image src="/universe/planets/mars/bg06_mars_blue_sunset.webp" alt="Blue sunset on Mars" fill className="object-cover opacity-70" />
             <div className="absolute inset-0 bg-gradient-to-l from-[#020509]/20 via-[#020509]/60 to-[#020509]"></div>
           </div>
           <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 items-center relative z-10 gap-12">
              <div className="lg:col-span-6 lg:col-start-7 order-2 lg:order-2 flex flex-col gap-6 lg:gap-8 justify-center">
                 <div className="flex items-center gap-4 sm:gap-6 lg:flex-row-reverse text-right">
                   <div className="flex flex-col items-end">
                     <div className="w-[50px] sm:w-[80px] h-[2px] bg-blue-400/60 mb-2 sm:mb-4"></div>
                     <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.1em] uppercase text-white">नीला सूर्यास्त</h2>
                   </div>
                   <span className="text-[70px] sm:text-[100px] lg:text-[140px] font-bold text-blue-400/20 leading-none">06</span>
                 </div>
                 <div className="space-y-6 text-gray-200 text-lg sm:text-xl font-light leading-relaxed bg-black/80 p-6 sm:p-10 rounded-3xl backdrop-blur-md border border-white/10 text-left lg:text-right max-w-2xl lg:ml-auto shadow-2xl">
                    <p>
                      पृथ्वी पर सूर्यास्त नारंगी और लाल रंग का होता है, लेकिन मंगल ग्रह पर बिल्कुल उल्टा है — यहाँ सूर्यास्त <strong>नीले रंग</strong> का होता है!
                    </p>
                    <p>
                      इसकी वजह है मंगल की हवा में तैरती बारीक धूल के कण। ये कण सूरज की रोशनी में से लाल रंग को तो चारों ओर बिखेर देते हैं (जिससे दिन में आसमान गुलाबी-लाल दिखता है), लेकिन शाम को जब सूरज क्षितिज के पास पहुँचता है तो सिर्फ <strong>नीली रोशनी</strong> ही हमारी आँखों तक पहुँचती है। NASA के Curiosity रोवर ने यह अद्भुत नज़ारा कैमरे में कैद किया है।
                    </p>
                 </div>
              </div>
           </div>
        </section>

        {/* SECTION 8: ROVERS & MISSIONS (07 रोबोट खोजी) */}
        <section className="relative w-full py-20 lg:py-32 bg-[#010204] overflow-hidden flex flex-col justify-center px-4 sm:px-8">
          <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 items-center relative z-10 gap-12 lg:gap-24">
            <div className="order-2 lg:order-1 w-full relative z-10 flex items-center justify-center">
              <div className="relative w-full aspect-[4/3] max-w-[600px] rounded-3xl overflow-hidden group shadow-2xl border border-white/10">
                 <Image src="/universe/planets/mars/bg07_mars_rovers.webp" alt="Mars rovers exploring the surface" fill className="object-cover opacity-100 group-hover:scale-105 transition-transform duration-1000" />
                 <div className="absolute inset-0 bg-black/30 z-10"></div>
              </div>
            </div>
            <div className="flex flex-col gap-6 lg:gap-8 order-1 lg:order-2 relative z-20">
               <div className="flex items-center gap-4 sm:gap-6">
                 <span className="text-[70px] sm:text-[100px] lg:text-[140px] font-bold text-orange-500/20 leading-none drop-shadow-2xl">07</span>
                 <div className="flex flex-col">
                   <div className="w-[50px] sm:w-[80px] h-[2px] bg-orange-500/60 mb-2 sm:mb-4"></div>
                   <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.1em] uppercase">रोबोट खोजी</h2>
                 </div>
               </div>
               <div className="lg:pl-[120px] space-y-6 text-gray-200 text-lg sm:text-xl font-light leading-relaxed max-w-2xl">
                 <p>
                   मंगल ग्रह पर अब तक कई देशों ने अपने रोवर और ऑर्बिटर भेजे हैं। NASA का <strong>Perseverance</strong> रोवर 2021 से मंगल की मिट्टी के नमूने इकट्ठा कर रहा है और उसका छोटा हेलीकॉप्टर <strong>Ingenuity</strong> ने किसी दूसरे ग्रह पर पहली बार उड़ान भरने का इतिहास रचा।
                 </p>
                 <p>
                   भारत का <strong>ISRO</strong> भी इस दौड़ में शामिल है — 2014 में भारत के <strong>Mars Orbiter Mission (MOM / मंगलयान)</strong> ने अपने पहले ही प्रयास में मंगल की कक्षा में प्रवेश करके इतिहास रच दिया। भारत ऐसा करने वाला एशिया का पहला और दुनिया का चौथा देश बना, वो भी सबसे कम बजट में!
                 </p>
               </div>
            </div>
          </div>
        </section>

        {/* SECTION 9: PHOBOS & DEIMOS (08 डरावने चाँद) */}
        <section className="relative w-full py-20 lg:py-32 min-h-[700px] overflow-hidden px-4 sm:px-8 bg-black">
           <div className="absolute inset-0 z-0">
             <Image src="/universe/planets/mars/bg08_mars_moons.webp" alt="Phobos and Deimos — Mars moons" fill className="object-cover opacity-90" />
             <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>
           </div>
           <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 items-center relative z-10 gap-12">
              <div className="flex flex-col gap-6 lg:gap-8 relative z-20">
                 <div className="flex items-center gap-4 sm:gap-6">
                   <span className="text-[70px] sm:text-[100px] lg:text-[140px] font-bold text-purple-500/20 leading-none">08</span>
                   <div className="flex flex-col">
                     <div className="w-[50px] sm:w-[80px] h-[2px] bg-purple-500/60 mb-2 sm:mb-4"></div>
                     <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.1em] uppercase text-white">डरावने चाँद</h2>
                   </div>
                 </div>
                 <div className="lg:ml-[120px] space-y-6 text-gray-100 text-lg sm:text-xl font-light leading-relaxed max-w-2xl bg-black/80 p-6 sm:p-10 rounded-3xl backdrop-blur-md border border-white/10 shadow-2xl">
                   <p className="text-shadow-md">
                     मंगल के दो छोटे चाँद हैं — <strong>फोबोस (Phobos)</strong> यानी &apos;डर&apos; और <strong>डीमोस (Deimos)</strong> यानी &apos;आतंक&apos;। ये नाम ग्रीक पौराणिक कथाओं में युद्ध के देवता Ares (Mars) के दो बेटों के नाम पर रखे गए हैं।
                   </p>
                   <p className="text-shadow-md">
                     हमारे गोल और सुंदर चंद्रमा से अलग, ये दोनों चाँद टेढ़े-मेढ़े, बदसूरत और आलू जैसे आकार के हैं — शायद ये किसी asteroid belt से आकर मंगल की गुरुत्वाकर्षण में फँस गए। फोबोस हर 100 साल में मंगल के 2 मीटर करीब आ रहा है और लगभग <strong>5 करोड़ साल बाद यह मंगल से टकराकर चूर-चूर</strong> हो जाएगा या एक रिंग बन जाएगा।
                   </p>
                 </div>
              </div>
           </div>
        </section>

        {/* SECTION 10: HUMAN COLONIZATION (09 इंसानों की अगली मंज़िल) */}
        <section className="relative w-full py-20 lg:py-32 bg-[#020509] overflow-hidden px-4 sm:px-8 border-b border-white/5">
           <div className="absolute inset-0 z-0">
             <Image src="/universe/planets/mars/bg09_mars_colony.webp" alt="Future human colony on Mars" fill className="object-cover opacity-80" />
             <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>
           </div>
           <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 items-center relative z-10 gap-12">
              <div className="lg:col-span-8 lg:col-start-5 order-2 lg:order-2 flex flex-col gap-6 lg:gap-8 justify-center z-20">
                 <div className="flex items-center gap-4 sm:gap-6 justify-start lg:justify-end">
                   <div className="flex flex-col text-left lg:text-right w-full">
                     <div className="w-[50px] sm:w-[80px] h-[2px] bg-emerald-400/60 mb-2 sm:mb-4 lg:self-end"></div>
                     <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.1em] uppercase">इंसानों की अगली मंज़िल</h2>
                   </div>
                   <span className="text-[70px] sm:text-[100px] lg:text-[140px] font-bold text-emerald-400/20 leading-none">09</span>
                 </div>
                 <div className="text-gray-200 text-lg sm:text-xl font-light leading-relaxed space-y-6 bg-black/80 p-6 sm:p-10 rounded-3xl backdrop-blur-md border border-white/10 text-left lg:text-right lg:ml-auto max-w-3xl shadow-2xl">
                    <p className="text-shadow-md">
                      मंगल ग्रह वो इकलौता ग्रह है जहाँ इंसानों के बसने की असली संभावना है। इसका दिन पृथ्वी जैसा (24.6 घंटे) है, ध्रुवों पर पानी की बर्फ है, और मिट्टी से ऑक्सीजन और ईंधन बनाया जा सकता है।
                    </p>
                    <p className="text-shadow-md">
                      <strong>SpaceX</strong> का Starship रॉकेट मंगल पर इंसानों को भेजने के लिए तैयार हो रहा है। NASA का <strong>Artemis</strong> प्रोग्राम भी चाँद के रास्ते मंगल तक पहुँचने की योजना बना रहा है। वैज्ञानिकों का अनुमान है कि <strong>2040 के दशक में पहला इंसान मंगल की लाल मिट्टी पर अपना कदम रखेगा।</strong> यह पल इंसानी सभ्यता के इतिहास का सबसे बड़ा कदम होगा — चाँद पर उतरने से भी बड़ा।
                    </p>
                 </div>
              </div>
           </div>
        </section>

        {/* YOUTUBE FEATURED VIDEO */}
        <FeaturedVideo videoId="CLm0eluuUHs" />

        {/* RELATED PLANETS WIDGET */}
        <NextPlanets currentPlanetId="mars" />

        {/* RELATED TOOLS SECTION */}
        <section className="bg-[#020509] border-t border-white/5 py-16 lg:py-24">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Explore More Space Tools</h2>
                <p className="text-gray-400 text-sm md:text-base">Continue your interactive journey across the cosmos.</p>
              </div>
              <Link href="/tools" className="mt-4 md:mt-0 text-red-400 font-bold hover:text-red-300 transition-colors uppercase text-xs tracking-wider">
                VIEW ALL TOOLS &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
              {[
                { title: "Space Age Calculator", desc: "How old are you on Mars or Neptune?", img: "/tools/tool-hero-bac1.webp", link: "/tools/space-age" },
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
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors">{tool.title}</h3>
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
                    className="flex-1 px-6 py-4 rounded-full bg-white/5 backdrop-blur-md border border-white/20 text-white placeholder:text-gray-400 outline-none focus:border-red-500 transition-all text-base w-full shadow-inner"
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
