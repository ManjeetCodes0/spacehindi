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

export default function NeptuneCustomPage() {
  const { lang } = useLang();
  const body = getCelestialBody("neptune");
  if (!body) notFound();

  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const heroImages = [
    "/universe/planets/neptune/neptune1.png",
    "/universe/planets/neptune/neptune_art1.webp",
    "/universe/planets/neptune/neptune_art2.webp"
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
                 NEPTUNE
              </h1>
              <p className="mt-6 lg:mt-8 text-lg sm:text-xl xl:text-2xl leading-relaxed text-gray-200 font-light max-w-xl" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.8)" }}>
                वरुण ग्रह (Neptune) — सौरमंडल का आखिरी विशाल ग्रह, अंधेरे की गहराइयों में बसा एक गहरे नीले रंग का बर्फीला संसार। यहाँ ध्वनि की गति से भी तेज़ हवाएँ चलती हैं और इसकी खोज ने विज्ञान का इतिहास बदल दिया।
              </p>

              {/* Stats Grid */}
              <div className="w-full grid grid-cols-2 gap-x-4 sm:gap-x-8 gap-y-6 sm:gap-y-8 pt-8 sm:pt-12 mt-6 sm:mt-10 border-t border-white/20">
                <div className="flex flex-col gap-1 sm:gap-3">
                  <span className="text-[10px] sm:text-xs tracking-[0.1em] text-white/70 uppercase font-semibold">दिन (Day)</span>
                  <span className="text-xl sm:text-2xl lg:text-3xl font-light">16.1 घंटे</span>
                </div>
                <div className="flex flex-col gap-1 sm:gap-3">
                  <span className="text-[10px] sm:text-xs tracking-[0.1em] text-white/70 uppercase font-semibold">व्यास (Diameter)</span>
                  <span className="text-xl sm:text-2xl lg:text-3xl font-light">49,244 किमी</span>
                </div>
                <div className="flex flex-col gap-1 sm:gap-3">
                  <span className="text-[10px] sm:text-xs tracking-[0.1em] text-white/70 uppercase font-semibold">चाँद (Moons)</span>
                  <span className="text-xl sm:text-2xl lg:text-3xl font-light">16 (ज्ञात)</span>
                </div>
                <div className="flex flex-col gap-1 sm:gap-3">
                  <span className="text-[10px] sm:text-xs tracking-[0.1em] text-white/70 uppercase font-semibold">ग्रह का प्रकार</span>
                  <span className="text-xl sm:text-2xl lg:text-3xl font-light">बर्फ विशाल (Ice Giant)</span>
                </div>
              </div>
            </div>

            {/* Right Media: The Planet */}
            <div className="w-full lg:w-[45%] flex items-center justify-center lg:justify-end relative mt-12 lg:mt-4 z-10">
              <div className="relative w-full max-w-[400px] lg:max-w-[480px] xl:max-w-[550px] aspect-square flex items-center justify-center lg:translate-x-[5%]">

                 {/* Background Glowing Rings — Neptune themed (Deep Blue) */}
                 <div className="absolute w-[120%] h-[120%] bg-blue-600/10 rounded-full blur-[70px] xl:blur-[90px] pointer-events-none z-0 transition-opacity duration-1000"></div>
                 <div className="absolute w-[85%] h-[85%] rounded-full border border-blue-500/20 pointer-events-none z-0 animate-pulse"></div>
                 <div className="absolute w-[110%] h-[110%] rounded-full border border-blue-400/15 border-dashed animate-[spin_25s_linear_infinite] pointer-events-none z-0"></div>
                 <div className="absolute w-[135%] h-[135%] rounded-full border border-white/5 pointer-events-none z-0"></div>

                 {heroImages.map((src, index) => (
                    <Image
                      key={src}
                      src={src}
                      alt={`वरुण ग्रह (Neptune Planet) Visual ${index + 1}`}
                      fill
                      className={`object-contain drop-shadow-[0_0_80px_rgba(59,130,246,0.25)] transition-all duration-[1500ms] ease-in-out ${
                        currentHeroImage === index ? "opacity-100 scale-100" : "opacity-0 scale-95"
                      }`}
                      priority={index === 0}
                    />
                 ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: BASIC INFO (01 गणित से खोजा गया ग्रह) */}
        <section className="relative w-full py-20 lg:py-32 bg-[#050a12] overflow-hidden flex flex-col justify-center px-4 sm:px-8">
          <div className="absolute top-0 right-0 w-full h-full z-0 opacity-30 pointer-events-none bg-gradient-to-l from-blue-900/10 to-transparent"></div>
          <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 items-center relative z-10 gap-12 lg:gap-24">
            <div className="flex flex-col gap-6 lg:gap-8 order-2 lg:order-1 relative z-20">
               <div className="flex items-center gap-4 sm:gap-6">
                 <span className="text-[70px] sm:text-[100px] lg:text-[140px] font-bold text-[#b4b4bb] leading-none drop-shadow-2xl opacity-50">01</span>
                 <div className="flex flex-col">
                   <div className="w-[50px] sm:w-[80px] h-[2px] bg-white/60 mb-2 sm:mb-4"></div>
                   <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.1em] uppercase">गणित से खोजा गया ग्रह</h2>
                 </div>
               </div>
               <div className="lg:pl-[120px] space-y-6 text-gray-200 text-lg sm:text-xl font-light leading-relaxed max-w-2xl">
                 <p>
                   वरुण (Neptune) इंसानी इतिहास का पहला ग्रह है जो <strong>पहले दूरबीन से देखने से नहीं, बल्कि गणित के सूत्रों से खोजा गया!</strong> 1846 में वैज्ञानिकों ने देखा कि अरुण (Uranus) अपनी गणना की गई कक्षा से थोड़ा भटक रहा है — जैसे कोई अनदेखी शक्ति उसे खींच रही हो।
                 </p>
                 <p>
                   फ्रांस के गणितज्ञ <strong>Urbain Le Verrier</strong> ने सिर्फ़ गणित और न्यूटन के गुरुत्वाकर्षण नियमों का इस्तेमाल करके भविष्यवाणी की कि ठीक किस जगह एक अनजान ग्रह होना चाहिए। जब खगोलविदों ने उस दिशा में दूरबीन लगाई — वरुण ठीक वहीं मिला! यह <strong>गणित की सबसे शानदार विजय</strong> और विज्ञान की ताकत का सबसे बड़ा सबूत था।
                 </p>
               </div>
            </div>
            <div className="order-1 lg:order-2 w-full relative z-10 flex items-center justify-center">
              <div className="relative w-full aspect-square max-w-[500px] rounded-[30px] overflow-hidden group">
                 <div className="absolute inset-0 z-0 shadow-inner">
                    <Image src="/universe/planets/neptune/bg01_neptune_discovery.webp" alt="Neptune — discovered by mathematics" fill className="object-cover opacity-100 contrast-125 saturate-50 scale-110 group-hover:scale-105 transition-transform duration-1000" />
                    <div className="absolute inset-0 bg-gradient-to-bl from-transparent to-[#050a12]/50 z-10"></div>
                 </div>
                 <div className="relative w-[80%] h-[80%] m-[10%] z-20 group-hover:scale-[1.02] transition-transform duration-700">
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: SUPERSONIC WINDS (02 सुपरसोनिक तूफ़ान) */}
        <section className="relative w-full py-20 lg:py-32 min-h-[700px] overflow-hidden px-4 sm:px-8 bg-black">
           <div className="absolute inset-0 z-0">
             <Image src="/universe/planets/neptune/bg02_neptune_supersonic_storms.webp" alt="Neptune supersonic winds" fill className="object-cover opacity-90" />
             <div className="absolute inset-0 bg-black/30 pointer-events-none"></div>
           </div>
           <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 items-center relative z-10 gap-12">
              <div className="hidden lg:block order-1"></div>
              <div className="flex flex-col gap-6 lg:gap-8 order-2 lg:order-1 relative z-20">
                 <div className="flex items-center gap-4 sm:gap-6">
                   <span className="text-[70px] sm:text-[100px] lg:text-[140px] font-bold text-blue-500/30 leading-none">02</span>
                   <div className="flex flex-col">
                     <div className="w-[50px] sm:w-[80px] h-[2px] bg-blue-500/80 mb-2 sm:mb-4"></div>
                     <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.1em] uppercase text-white">सुपरसोनिक तूफ़ान</h2>
                   </div>
                 </div>
                 <div className="lg:ml-[120px] space-y-6 text-gray-100 text-lg sm:text-xl font-light leading-relaxed max-w-2xl bg-black/70 p-6 sm:p-10 rounded-3xl backdrop-blur-md border border-white/10 shadow-2xl">
                   <p className="text-shadow-md">
                     वरुण ग्रह <strong>सौरमंडल का सबसे तूफ़ानी ग्रह</strong> है। यहाँ हवाएँ <strong>2,100 किलोमीटर प्रति घंटा</strong> की रफ्तार से चलती हैं — ध्वनि की गति (1,235 किमी/घंटा) से लगभग दोगुनी तेज़!
                   </p>
                   <p className="text-shadow-md">
                     यह बात विज्ञान की सबसे बड़ी पहेलियों में से एक है। वरुण सूरज से 4.5 अरब किलोमीटर दूर है — यहाँ सूरज की ऊर्जा पृथ्वी के मुकाबले 900 गुना कम पहुँचती है। फिर भी इतनी भयंकर हवाएँ कैसे? वैज्ञानिकों का अनुमान है कि वरुण का गर्म कोर बेहद शक्तिशाली ऊष्मा बाहर फेंकता है जो इन <strong>सुपरसोनिक तूफ़ानों</strong> को ईंधन देती है।
                   </p>
                 </div>
              </div>
           </div>
        </section>

        {/* SECTION 4: GREAT DARK SPOT (03 महान अंधेरा धब्बा) */}
        <section className="relative w-full py-20 lg:py-32 bg-[#020509] overflow-hidden px-4 sm:px-8">
           <div className="absolute inset-0 z-0">
             <Image src="/universe/planets/neptune/bg03_neptune_great_dark_spot.webp" alt="Neptune Great Dark Spot" fill className="object-cover opacity-80" />
             <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>
           </div>
           <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 items-center relative z-10 gap-12">
              <div className="lg:col-span-6 order-2 lg:order-2 flex flex-col gap-6 lg:gap-8 justify-center">
                 <div className="flex items-center gap-4 sm:gap-6 justify-start lg:justify-end">
                   <div className="flex flex-col text-left lg:text-right w-full">
                     <div className="w-[50px] sm:w-[80px] h-[2px] bg-indigo-400/40 mb-2 sm:mb-4 lg:self-end"></div>
                     <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.1em] uppercase">महान अंधेरा धब्बा</h2>
                   </div>
                   <span className="text-[70px] sm:text-[100px] lg:text-[140px] font-bold text-indigo-400/30 leading-none">03</span>
                 </div>

                 <div className="text-gray-200 text-lg sm:text-xl font-light leading-relaxed space-y-6 bg-black/80 p-6 sm:p-10 rounded-3xl backdrop-blur-md border border-white/10 text-left lg:text-right lg:ml-auto max-w-2xl shadow-2xl">
                    <p>
                      1989 में जब Voyager 2 वरुण के पास से गुज़रा, तो उसने एक विशाल गहरे नीले रंग का तूफ़ान खोजा — &apos;Great Dark Spot&apos; (महान अंधेरा धब्बा)। यह बृहस्पति के Great Red Spot जैसा दिखता था और <strong>पूरी पृथ्वी जितना बड़ा था!</strong>
                    </p>
                    <p>
                      लेकिन बृहस्पति के 350+ साल पुराने तूफ़ान के विपरीत, जब 1994 में Hubble Telescope ने वरुण को दोबारा देखा — वो तूफ़ान <strong>ग़ायब हो चुका था!</strong> और उसकी जगह उत्तरी गोलार्ध में एक नया Dark Spot प्रकट हो गया। वरुण पर ये विशाल तूफ़ान आते-जाते रहते हैं — कुछ सालों में बनते हैं और कुछ ही सालों में ग़ायब हो जाते हैं। यह ग्रह लगातार बदलता रहता है।
                    </p>
                 </div>
              </div>
           </div>
        </section>

        {/* SECTION 5: DEEP BLUE COLOR (04 गहरा नीला रहस्य) */}
        <section className="relative w-full py-20 lg:py-32 bg-[#010204] overflow-hidden flex flex-col justify-center px-4 sm:px-8">
          <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 items-center relative z-10 gap-12 lg:gap-24">
            <div className="order-2 lg:order-1 w-full relative z-10 flex items-center justify-center">
              <div className="relative w-full aspect-square max-w-[600px] group rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                 <Image src="/universe/planets/neptune/bg04_neptune_deep_blue.webp" alt="Neptune deep blue color mystery" fill className="object-cover opacity-100 group-hover:scale-105 transition-transform duration-1000" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30"></div>
              </div>
            </div>
            <div className="flex flex-col gap-6 lg:gap-8 order-1 lg:order-2 relative z-20">
               <div className="flex items-center gap-4 sm:gap-6">
                 <span className="text-[70px] sm:text-[100px] lg:text-[140px] font-bold text-blue-400/30 leading-none drop-shadow-2xl">04</span>
                 <div className="flex flex-col">
                   <div className="w-[50px] sm:w-[80px] h-[2px] bg-blue-400/60 mb-2 sm:mb-4"></div>
                   <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.1em] uppercase">गहरा नीला रहस्य</h2>
                 </div>
               </div>
               <div className="lg:pl-[120px] space-y-6 text-gray-200 text-lg sm:text-xl font-light leading-relaxed max-w-2xl">
                 <p>
                   वरुण का गहरा नीला (deep azure blue) रंग अरुण (Uranus) के हल्के cyan से काफ़ी अलग और ज़्यादा intense है — हालाँकि दोनों में मीथेन गैस लगभग समान मात्रा में है। सिर्फ़ मीथेन से इतना गहरा नीला रंग नहीं बनता।
                 </p>
                 <p>
                   वैज्ञानिकों का मानना है कि वरुण के वायुमंडल में कोई अज्ञात रासायनिक यौगिक (unknown chemical compound) मौजूद है जो अतिरिक्त लाल रोशनी सोखकर रंग को और गहरा कर देता है। 2023 की रिसर्च बताती है कि वरुण के वायुमंडल में <strong>एक पतली हेज़ (haze) लेयर</strong> कम है जो अरुण में ज़्यादा है — इसीलिए वरुण ज़्यादा &apos;शुद्ध&apos; नीला दिखता है। लेकिन पूरा जवाब अभी भी <strong>अनसुलझा रहस्य</strong> है।
                 </p>
               </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: TRITON (05 ट्राइटन — उल्टा चलने वाला चाँद) */}
        <section className="relative w-full py-20 lg:py-32 min-h-[700px] overflow-hidden px-4 sm:px-8 bg-black">
           <div className="absolute inset-0 z-0">
             <Image src="/universe/planets/neptune/bg05_neptune_triton_retrograde.webp" alt="Triton — Neptune's captured moon" fill className="object-cover opacity-90" />
             <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>
           </div>
           <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 items-center relative z-10 gap-12">
              <div className="flex flex-col gap-6 lg:gap-8 relative z-20">
                 <div className="flex items-center gap-4 sm:gap-6">
                   <span className="text-[70px] sm:text-[100px] lg:text-[140px] font-bold text-teal-400/20 leading-none">05</span>
                   <div className="flex flex-col">
                     <div className="w-[50px] sm:w-[80px] h-[2px] bg-teal-400/60 mb-2 sm:mb-4"></div>
                     <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.1em] uppercase">ट्राइटन — उल्टा चलने वाला चाँद</h2>
                   </div>
                 </div>
                 <div className="lg:ml-[120px] space-y-6 text-gray-100 text-lg sm:text-xl font-light leading-relaxed max-w-2xl bg-black/80 p-6 sm:p-10 rounded-3xl backdrop-blur-md border border-white/10 shadow-2xl">
                   <p className="text-shadow-md">
                     वरुण का सबसे बड़ा चाँद <strong>ट्राइटन (Triton)</strong> सौरमंडल के सबसे अनोखे पिंडों में से एक है। यह एकमात्र बड़ा चाँद है जो अपने ग्रह की <strong>उल्टी दिशा (retrograde orbit)</strong> में घूमता है — यानी वरुण जिस दिशा में घूमता है, ट्राइटन उसके विपरीत दिशा में चक्कर लगाता है।
                   </p>
                   <p className="text-shadow-md">
                     इसका मतलब है कि ट्राइटन वरुण का अपना चाँद नहीं है — यह शायद <strong>Kuiper Belt</strong> से आया एक बौना ग्रह (dwarf planet) था जिसे वरुण ने अपनी भयानक गुरुत्वाकर्षण से पकड़ लिया। प्लूटो और ट्राइटन का आकार लगभग बराबर है और वैज्ञानिक मानते हैं कि दोनों एक ही तरह के पिंड हैं — बस ट्राइटन की किस्मत ख़राब थी और वो वरुण के जाल में फँस गया।
                   </p>
                 </div>
              </div>
           </div>
        </section>

        {/* SECTION 7: TRITON GEYSERS (06 ट्राइटन के बर्फीले फव्वारे) */}
        <section className="relative w-full py-20 lg:py-32 bg-[#020509] overflow-hidden px-4 sm:px-8">
           <div className="absolute inset-0 z-0 flex justify-end pointer-events-none">
             <Image src="/universe/planets/neptune/bg06_neptune_triton_geysers.webp" alt="Triton nitrogen geysers" fill className="object-cover opacity-70" />
             <div className="absolute inset-0 bg-gradient-to-l from-[#020509]/20 via-[#020509]/60 to-[#020509]"></div>
           </div>
           <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 items-center relative z-10 gap-12">
              <div className="lg:col-span-6 lg:col-start-7 order-2 lg:order-2 flex flex-col gap-6 lg:gap-8 justify-center">
                 <div className="flex items-center gap-4 sm:gap-6 lg:flex-row-reverse text-right">
                   <div className="flex flex-col items-end">
                     <div className="w-[50px] sm:w-[80px] h-[2px] bg-cyan-300/60 mb-2 sm:mb-4"></div>
                     <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.1em] uppercase text-white">ट्राइटन के बर्फीले फव्वारे</h2>
                   </div>
                   <span className="text-[70px] sm:text-[100px] lg:text-[140px] font-bold text-cyan-300/20 leading-none">06</span>
                 </div>
                 <div className="space-y-6 text-gray-200 text-lg sm:text-xl font-light leading-relaxed bg-black/80 p-6 sm:p-10 rounded-3xl backdrop-blur-md border border-white/10 text-left lg:text-right max-w-2xl lg:ml-auto shadow-2xl">
                    <p>
                      -235°C तापमान पर ट्राइटन सौरमंडल के सबसे ठंडे पिंडों में से एक है। फिर भी Voyager 2 ने यहाँ एक चौंकाने वाली चीज़ देखी — <strong>सक्रिय गीज़र (geysers)!</strong> ट्राइटन की सतह से नाइट्रोजन गैस के विशाल फव्वारे <strong>8 किलोमीटर ऊँचाई</strong> तक फूटते हैं।
                    </p>
                    <p>
                      वैज्ञानिक मानते हैं कि सूरज की कमज़ोर रोशनी भी ट्राइटन की पारदर्शी नाइट्रोजन बर्फ़ के नीचे फँसकर ग्रीनहाउस प्रभाव बनाती है। दबी हुई नाइट्रोजन गर्म होकर गैस बनती है और ज़बरदस्त दबाव से सतह को तोड़कर अंतरिक्ष में फूट पड़ती है। इन फव्वारों से निकली काली धूल हवा में <strong>150 किमी तक फैलकर</strong> ट्राइटन की सफ़ेद बर्फ़ पर काली धारियाँ (streaks) बनाती है।
                    </p>
                 </div>
              </div>
           </div>
        </section>

        {/* SECTION 8: DIAMOND RAIN (07 हीरों की बारिश — यहाँ भी!) */}
        <section className="relative w-full py-20 lg:py-32 bg-[#010204] overflow-hidden flex flex-col justify-center px-4 sm:px-8">
          <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 items-center relative z-10 gap-12 lg:gap-24">
            <div className="order-2 lg:order-1 w-full relative z-10 flex items-center justify-center">
              <div className="relative w-full aspect-[4/3] max-w-[600px] rounded-3xl overflow-hidden group shadow-2xl border border-white/10">
                 <Image src="/universe/planets/neptune/bg07_neptune_diamond_rain.webp" alt="Diamond rain inside Neptune" fill className="object-cover opacity-100 group-hover:scale-105 transition-transform duration-1000" />
                 <div className="absolute inset-0 bg-black/30 z-10"></div>
              </div>
            </div>
            <div className="flex flex-col gap-6 lg:gap-8 order-1 lg:order-2 relative z-20">
               <div className="flex items-center gap-4 sm:gap-6">
                 <span className="text-[70px] sm:text-[100px] lg:text-[140px] font-bold text-sky-300/20 leading-none drop-shadow-2xl">07</span>
                 <div className="flex flex-col">
                   <div className="w-[50px] sm:w-[80px] h-[2px] bg-sky-300/60 mb-2 sm:mb-4"></div>
                   <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.1em] uppercase">हीरों की बारिश — यहाँ भी!</h2>
                 </div>
               </div>
               <div className="lg:pl-[120px] space-y-6 text-gray-200 text-lg sm:text-xl font-light leading-relaxed max-w-2xl">
                 <p>
                   अरुण की तरह वरुण के अंदर भी <strong>हीरों (diamonds) की बारिश</strong> होती है! वरुण का अंदरूनी दबाव अरुण से भी ज़्यादा है — लाखों वायुमंडलीय दबाव और 7,000°C से ज़्यादा तापमान पर मीथेन के कार्बन परमाणु हीरे के क्रिस्टल में बदल जाते हैं।
                 </p>
                 <p>
                   कुछ वैज्ञानिक तो यह भी मानते हैं कि वरुण के कोर के चारों ओर एक <strong>हीरे का ठोस महासागर</strong> मौजूद हो सकता है — अरबों टन शुद्ध हीरा एक विशाल परत में जमा। यह बारिश वरुण की अंदरूनी गर्मी का एक बड़ा स्रोत भी है — गिरते हुए हीरे घर्षण (friction) से भयानक गर्मी पैदा करते हैं जो शायद उन सुपरसोनिक तूफ़ानों को शक्ति देती है।
                 </p>
               </div>
            </div>
          </div>
        </section>

        {/* SECTION 9: RINGS (08 वरुण के छल्ले) */}
        <section className="relative w-full py-20 lg:py-32 min-h-[700px] overflow-hidden px-4 sm:px-8 bg-black">
           <div className="absolute inset-0 z-0">
             <Image src="/universe/planets/neptune/bg08_neptune_ring_arcs.webp" alt="Neptune ring arcs" fill className="object-cover opacity-90" />
             <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>
           </div>
           <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 items-center relative z-10 gap-12">
              <div className="flex flex-col gap-6 lg:gap-8 relative z-20">
                 <div className="flex items-center gap-4 sm:gap-6">
                   <span className="text-[70px] sm:text-[100px] lg:text-[140px] font-bold text-violet-400/20 leading-none">08</span>
                   <div className="flex flex-col">
                     <div className="w-[50px] sm:w-[80px] h-[2px] bg-violet-400/60 mb-2 sm:mb-4"></div>
                     <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.1em] uppercase text-white">वरुण के छल्ले</h2>
                   </div>
                 </div>
                 <div className="lg:ml-[120px] space-y-6 text-gray-100 text-lg sm:text-xl font-light leading-relaxed max-w-2xl bg-black/80 p-6 sm:p-10 rounded-3xl backdrop-blur-md border border-white/10 shadow-2xl">
                   <p className="text-shadow-md">
                     वरुण के पास भी छल्ले (rings) हैं — लेकिन ये सौरमंडल के सबसे अजीब छल्ले हैं। इनमें <strong>&apos;Ring Arcs&apos; (छल्ला खंड)</strong> पाए जाते हैं — यानी छल्ले का कुछ हिस्सा बाकी हिस्से से ज़्यादा घना और चमकीला है, जो बाक़ी जगह लगभग खाली है।
                   </p>
                   <p className="text-shadow-md">
                     भौतिकी के नियमों के अनुसार ऐसा नहीं होना चाहिए — कणों को समान रूप से फैल जाना चाहिए। वैज्ञानिक मानते हैं कि वरुण का छोटा चाँद <strong>Galatea</strong> अपनी गुरुत्वाकर्षण से इन कणों को एक जगह बाँधे रखता है। 2022 में <strong>James Webb Space Telescope</strong> ने 30 साल बाद पहली बार इन छल्लों की ताज़ा तस्वीरें लीं — और वे अभी भी वहाँ मौजूद थे।
                   </p>
                 </div>
              </div>
           </div>
        </section>

        {/* SECTION 10: VOYAGER 2 & LONELINESS (09 अंतिम सीमा) */}
        <section className="relative w-full py-20 lg:py-32 bg-[#020509] overflow-hidden px-4 sm:px-8 border-b border-white/5">
           <div className="absolute inset-0 z-0">
             <Image src="/universe/planets/neptune/bg09_neptune_last_frontier.webp" alt="Neptune — last frontier, Voyager 2 farewell" fill className="object-cover opacity-80" />
             <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>
           </div>
           <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 items-center relative z-10 gap-12">
              <div className="lg:col-span-8 lg:col-start-5 order-2 lg:order-2 flex flex-col gap-6 lg:gap-8 justify-center z-20">
                 <div className="flex items-center gap-4 sm:gap-6 justify-start lg:justify-end">
                   <div className="flex flex-col text-left lg:text-right w-full">
                     <div className="w-[50px] sm:w-[80px] h-[2px] bg-blue-300/60 mb-2 sm:mb-4 lg:self-end"></div>
                     <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.1em] uppercase">अंतिम सीमा</h2>
                   </div>
                   <span className="text-[70px] sm:text-[100px] lg:text-[140px] font-bold text-blue-300/20 leading-none">09</span>
                 </div>
                 <div className="text-gray-200 text-lg sm:text-xl font-light leading-relaxed space-y-6 bg-black/80 p-6 sm:p-10 rounded-3xl backdrop-blur-md border border-white/10 text-left lg:text-right lg:ml-auto max-w-3xl shadow-2xl">
                    <p className="text-shadow-md">
                      25 अगस्त 1989 — <strong>Voyager 2</strong> वरुण के पास से गुज़रा और इंसानों ने पहली बार इस दूर के ग्रह को करीब से देखा। वो मुलाक़ात सिर्फ़ कुछ घंटों की थी लेकिन उसने ट्राइटन के गीज़र, Great Dark Spot, छल्लों और चुम्बकीय क्षेत्र की खोज की। वरुण <strong>Voyager 2 का आखिरी ग्रह</strong> था — इसके बाद यान हमेशा के लिए सौरमंडल से बाहर अंतरतारकीय अंतरिक्ष (interstellar space) में चला गया।
                    </p>
                    <p className="text-shadow-md">
                      वरुण को सूरज का एक चक्कर लगाने में <strong>164.8 पृथ्वी-वर्ष</strong> लगते हैं। 2011 में वरुण ने अपनी खोज (1846) के बाद पहली बार सूरज का एक पूरा चक्कर पूरा किया! यह ग्रह इतना दूर है कि यहाँ से सूरज की रोशनी को पहुँचने में <strong>4 घंटे से ज़्यादा</strong> लगते हैं। वरुण सौरमंडल के ज्ञात ग्रहों की अंतिम सीमा है — इसके आगे सिर्फ़ अनंत अंधेरा है।
                    </p>
                 </div>
              </div>
           </div>
        </section>

        {/* YOUTUBE FEATURED VIDEO */}
        <FeaturedVideo videoId="3HWHMJwbpQY" />

        {/* RELATED PLANETS WIDGET */}
        <NextPlanets currentPlanetId="neptune" />

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
                { title: "Space Age Calculator", desc: "How old are you on Neptune or Jupiter?", img: "/tools/tool-hero-bac1.webp", link: "/tools/space-age" },
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
