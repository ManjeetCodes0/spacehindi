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

export default function VenusCustomPage() {
  const { lang } = useLang();
  const body = getCelestialBody("venus");
  if (!body) notFound();

  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const heroImages = [
    "/universe/planets/venus/venus1.png",
    "/universe/planets/venus/venus2.png", // Assuming these will be created
    "/universe/planets/venus/venus3.png"
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
                 VENUS
              </h1>
              <p className="mt-6 lg:mt-8 text-lg sm:text-xl xl:text-2xl leading-relaxed text-gray-200 font-light max-w-xl" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.8)" }}>
                शुक्र ग्रह (Venus) सौरमंडल का सबसे गर्म और ख़तरनाक ग्रह है। आकार में यह पृथ्वी की जुड़वां बहन जैसा है, लेकिन इसका वातावरण ज़हरीले बादलों और भयंकर गर्मी से भरा हुआ है।
              </p>
              
              {/* Stats Grid */}
              <div className="w-full grid grid-cols-2 gap-x-4 sm:gap-x-8 gap-y-6 sm:gap-y-8 pt-8 sm:pt-12 mt-6 sm:mt-10 border-t border-white/20">
                <div className="flex flex-col gap-1 sm:gap-3">
                  <span className="text-[10px] sm:text-xs tracking-[0.1em] text-white/70 uppercase font-semibold">दिन (Day)</span>
                  <span className="text-xl sm:text-2xl lg:text-3xl font-light">243 पृथ्वी दिन</span>
                </div>
                <div className="flex flex-col gap-1 sm:gap-3">
                  <span className="text-[10px] sm:text-xs tracking-[0.1em] text-white/70 uppercase font-semibold">रेडियस (Radius)</span>
                  <span className="text-xl sm:text-2xl lg:text-3xl font-light">6,051 किमी</span>
                </div>
                <div className="flex flex-col gap-1 sm:gap-3">
                  <span className="text-[10px] sm:text-xs tracking-[0.1em] text-white/70 uppercase font-semibold">चाँद (Moons)</span>
                  <span className="text-xl sm:text-2xl lg:text-3xl font-light">0 (शून्य)</span>
                </div>
                <div className="flex flex-col gap-1 sm:gap-3">
                  <span className="text-[10px] sm:text-xs tracking-[0.1em] text-white/70 uppercase font-semibold">औसत तापमान</span>
                  <span className="text-xl sm:text-2xl lg:text-3xl font-light">475°C</span>
                </div>
              </div>
            </div>

            {/* Right Media: The Planet */}
            <div className="w-full lg:w-[45%] flex items-center justify-center lg:justify-end relative mt-12 lg:mt-4 z-10">
              <div className="relative w-full max-w-[400px] lg:max-w-[480px] xl:max-w-[550px] aspect-square flex items-center justify-center lg:translate-x-[5%]">
                 
                 {/* Background Glowing Rings anchored perfectly to the planet core - Venus themed (Yellow/Orange) */}
                 <div className="absolute w-[120%] h-[120%] bg-yellow-600/20 rounded-full blur-[70px] xl:blur-[90px] pointer-events-none z-0 transition-opacity duration-1000"></div>
                 <div className="absolute w-[85%] h-[85%] rounded-full border border-orange-500/30 pointer-events-none z-0 animate-pulse"></div>
                 <div className="absolute w-[110%] h-[110%] rounded-full border border-yellow-500/20 border-dashed animate-[spin_25s_linear_infinite] pointer-events-none z-0"></div>
                 <div className="absolute w-[135%] h-[135%] rounded-full border border-white/5 pointer-events-none z-0"></div>

                 {heroImages.map((src, index) => (
                    <Image
                      key={src}
                      src={src}
                      alt={`शुक्र ग्रह (Venus Planet) Visual ${index + 1}`}
                      fill
                      className={`object-contain drop-shadow-[0_0_80px_rgba(255,150,0,0.15)] transition-all duration-[1500ms] ease-in-out ${
                        currentHeroImage === index ? "opacity-100 scale-100" : "opacity-0 scale-95"
                      }`}
                      priority={index === 0}
                    />
                 ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: BASIC INFO (01 नर्क जैसा ग्रह) */}
        <section className="relative w-full py-20 lg:py-32 bg-[#050a12] overflow-hidden flex flex-col justify-center px-4 sm:px-8">
          <div className="absolute top-0 right-0 w-full h-full z-0 opacity-30 pointer-events-none bg-gradient-to-l from-orange-900/10 to-transparent"></div>
          <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 items-center relative z-10 gap-12 lg:gap-24">
            <div className="flex flex-col gap-6 lg:gap-8 order-2 lg:order-1 relative z-20">
               <div className="flex items-center gap-4 sm:gap-6">
                 <span className="text-[70px] sm:text-[100px] lg:text-[140px] font-bold text-[#b4b4bb] leading-none drop-shadow-2xl opacity-50">01</span>
                 <div className="flex flex-col">
                   <div className="w-[50px] sm:w-[80px] h-[2px] bg-white/60 mb-2 sm:mb-4"></div>
                   <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.1em] uppercase">नर्क जैसा ग्रह</h2>
                 </div>
               </div>
               <div className="lg:pl-[120px] space-y-6 text-gray-200 text-lg sm:text-xl font-light leading-relaxed max-w-2xl">
                 <p>
                   शुक्र ग्रह को अक्सर हमारी पृथ्वी की "जुड़वां बहन" (Twin Sister) कहा जाता है क्योंकि इसका आकार, द्रव्यमान (mass) और घनत्व बिल्कुल हमारी पृथ्वी के ही समान है। 
                 </p>
                 <p>
                   लेकिन यह बहन काफी क्रूर और जानलेवा है! एक समय वैज्ञानिकों को लगता था कि यहाँ जीवन हो सकता है, लेकिन आज हम जानते हैं कि यह पूरे सौरमंडल का सबसे भयानक और नर्क जैसा ग्रह है जहाँ का वातावरण किसी भी जीव को सेकंडों में खतम कर देगा।
                 </p>
               </div>
            </div>
            <div className="order-1 lg:order-2 w-full relative z-10 flex items-center justify-center">
              <div className="relative w-full aspect-square max-w-[500px] rounded-[30px] overflow-hidden group">
                 <div className="absolute inset-0 z-0">
                    <Image src="/universe/planets/venus/bg01_venus_hellish.webp" alt="Hellish Venus Surface" fill className="object-cover opacity-100 scale-110 group-hover:scale-105 transition-transform duration-1000" />
                    <div className="absolute inset-0 bg-gradient-to-bl from-transparent to-[#050a12]/50 z-10"></div>
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: GREENHOUSE (02 सबसे गर्म ग्रह) */}
        <section className="relative w-full py-20 lg:py-32 min-h-[700px] overflow-hidden px-4 sm:px-8 bg-black">
           <div className="absolute inset-0 z-0">
             <Image src="/universe/planets/venus/bg02_venus_hottest.webp" alt="Venus Greenhouse Effect" fill className="object-cover opacity-90" />
             <div className="absolute inset-0 bg-black/30 pointer-events-none"></div>
           </div>
           <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 items-center relative z-10 gap-12">
              <div className="hidden lg:block order-1"></div>
              <div className="flex flex-col gap-6 lg:gap-8 order-2 lg:order-1 relative z-20">
                 <div className="flex items-center gap-4 sm:gap-6">
                   <span className="text-[70px] sm:text-[100px] lg:text-[140px] font-bold text-orange-500/30 leading-none">02</span>
                   <div className="flex flex-col">
                     <div className="w-[50px] sm:w-[80px] h-[2px] bg-orange-500/80 mb-2 sm:mb-4"></div>
                     <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.1em] uppercase text-white">सबसे गर्म ग्रह</h2>
                   </div>
                 </div>
                 <div className="lg:ml-[120px] space-y-6 text-gray-100 text-lg sm:text-xl font-light leading-relaxed max-w-2xl bg-black/70 p-6 sm:p-10 rounded-3xl backdrop-blur-md border border-white/10 shadow-2xl">
                   <p className="text-shadow-md">
                     दिलचस्प बात यह है कि सूरज के सबसे नज़दीक होने के बावजूद बुध (Mercury) सौरमंडल का सबसे गर्म ग्रह नहीं है। यह खिताब शुक्र (Venus) के पास है।
                   </p>
                   <p className="text-shadow-md">
                     शुक्र के वायुमंडल में 96% से ज़्यादा कार्बन डाइऑक्साइड (Carbon Dioxide) गैस मौजूद है। यह गैस एक मोटे कंबल की तरह काम करती है जो सूरज की गर्मी को अंदर तो आने देती है, लेकिन वापस बाहर अंतरिक्ष में नहीं निकलने देती। इस 'भगोड़े ग्रीनहाउस प्रभाव' (Runaway Greenhouse Effect) के कारण यहाँ का तापमान 475°C तक रहता है—इतना गर्म कि भारी धातु 'सीसा' (Lead) भी पिघलकर पानी बन जाए।
                   </p>
                 </div>
              </div>
           </div>
        </section>

        {/* SECTION 4: ACID RAIN (03 ज़हरीले बादल) */}
        <section className="relative w-full py-20 lg:py-32 bg-[#020509] overflow-hidden px-4 sm:px-8">
           <div className="absolute inset-0 z-0">
             <Image src="/universe/planets/venus/bg03_venus_acid_clouds.webp" alt="Acid Clouds" fill className="object-cover opacity-80" />
             <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>
           </div>
           <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 items-center relative z-10 gap-12">
              <div className="lg:col-span-6 order-2 lg:order-2 flex flex-col gap-6 lg:gap-8 justify-center">
                 <div className="flex items-center gap-4 sm:gap-6 justify-start lg:justify-end">
                   <div className="flex flex-col text-left lg:text-right w-full">
                     <div className="w-[50px] sm:w-[80px] h-[2px] bg-yellow-400/40 mb-2 sm:mb-4 lg:self-end"></div>
                     <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.1em] uppercase">ज़हरीले बादल</h2>
                   </div>
                   <span className="text-[70px] sm:text-[100px] lg:text-[140px] font-bold text-yellow-500/30 leading-none">03</span>
                 </div>
                 
                 <div className="text-gray-200 text-lg sm:text-xl font-light leading-relaxed space-y-6 bg-black/80 p-6 sm:p-10 rounded-3xl backdrop-blur-md border border-white/10 text-left lg:text-right lg:ml-auto max-w-2xl shadow-2xl">
                    <p>
                      सफ़ेद और सुंदर दिखने वाला यह ग्रह असल में गहरे पीले रंग के बादलों से ढका है। ये बादल पानी के नहीं, बल्कि <strong>सल्फ्यूरिक एसिड (तेज़ाब)</strong> के बने हैं!
                    </p>
                    <p>
                      इन बादलों से लगातार जानलेवा तेज़ाब की बारिश होती रहती है। लेकिन मज़े की बात तो ये है कि यहाँ की ज़मीन इतनी भयंकर रूप से गर्म है कि तेज़ाब की बूंदें ज़मीन पर गिरने से कई किलोमीटर बहुत पहले ही भाप (evaporate) बनकर फिर से उड़ जाती हैं।
                    </p>
                 </div>
              </div>
           </div>
        </section>

        {/* SECTION 5: RETROGRADE SPIN (04 सूरज पश्चिम से उगता है) */}
        <section className="relative w-full py-20 lg:py-32 bg-[#010204] overflow-hidden flex flex-col justify-center px-4 sm:px-8">
          <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 items-center relative z-10 gap-12 lg:gap-24">
            <div className="order-2 lg:order-1 w-full relative z-10 flex items-center justify-center">
              <div className="relative w-full aspect-square max-w-[600px] group rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                 <Image src="/universe/planets/venus/bg04_venus_retrograde.webp" alt="Venus Rotation" fill className="object-cover opacity-100 group-hover:scale-105 transition-transform duration-1000" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30"></div>
              </div>
            </div>
            <div className="flex flex-col gap-6 lg:gap-8 order-1 lg:order-2 relative z-20">
               <div className="flex items-center gap-4 sm:gap-6">
                 <span className="text-[70px] sm:text-[100px] lg:text-[140px] font-bold text-red-500/30 leading-none drop-shadow-2xl">04</span>
                 <div className="flex flex-col">
                   <div className="w-[50px] sm:w-[80px] h-[2px] bg-red-500/60 mb-2 sm:mb-4"></div>
                   <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.1em] uppercase">सूरज पश्चिम से उगता है</h2>
                 </div>
               </div>
               <div className="lg:pl-[120px] space-y-6 text-gray-200 text-lg sm:text-xl font-light leading-relaxed max-w-2xl">
                 <p>
                   पूरे सौरमंडल में केवल दो ग्रह ऐसे हैं जो विपरीत (उल्टी) दिशा में घूमते हैं: शुक्र और अरुण (Uranus)। हमारी पृथ्वी जहाँ पश्चिम से पूर्व की ओर घूमती है, वहीं शुक्र पूर्व से पश्चिम की ओर अपनी धुरी (axis) पर घूमता है, जिसे Retrograde Rotation कहते हैं।
                 </p>
                 <p>
                   अगर आप किसी तरह शुक्र के घने बादलों को चीर कर उस नर्क की ज़मीन पर ज़िंदा खड़े रह पायें, तो आपको वहां <strong>सूरज पश्चिम (West) से उगता हुआ और पूर्व (East) में डूबता हुआ</strong> दिखाई देगा!
                 </p>
               </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: SLOW SPIN (05 दिन, साल से भी बड़ा) */}
        <section className="relative w-full py-20 lg:py-32 min-h-[700px] overflow-hidden px-4 sm:px-8 bg-black">
           <div className="absolute inset-0 z-0">
             <Image src="/universe/planets/venus/bg05_venus_slow_spin.webp" alt="Slow Rotation" fill className="object-cover opacity-90" />
             <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>
           </div>
           <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 items-center relative z-10 gap-12">
              <div className="flex flex-col gap-6 lg:gap-8 relative z-20">
                 <div className="flex items-center gap-4 sm:gap-6">
                   <span className="text-[70px] sm:text-[100px] lg:text-[140px] font-bold text-gray-500/40 leading-none">05</span>
                   <div className="flex flex-col">
                     <div className="w-[50px] sm:w-[80px] h-[2px] bg-gray-500/60 mb-2 sm:mb-4"></div>
                     <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.1em] uppercase">दिन, साल से भी बड़ा</h2>
                   </div>
                 </div>
                 <div className="lg:ml-[120px] space-y-6 text-gray-100 text-lg sm:text-xl font-light leading-relaxed max-w-2xl bg-black/80 p-6 sm:p-10 rounded-3xl backdrop-blur-md border border-white/10 shadow-2xl">
                   <p className="text-shadow-md">
                     उल्टी दिशा में घूमने के साथ-साथ यह ब्रह्मांड का सबसे आलसी ग्रह भी है। शुक्र अपनी धुरी पर इतनी धीमी गति से घूमता है कि इसे अपना एक चक्कर पूरा करने में पूरे 243 पृथ्वी-दिन लग जाते हैं। 
                   </p>
                   <p className="text-shadow-md">
                     जबकि सूरज का एक चक्कर (एक वर्ष) ये महज़ 225 पृथ्वी-दिनों में पूरा कर लेता है। इसका अनोखा मतलब यह निकलता है कि <strong>शुक्र ग्रह पर उसका एक दिन, उसके एक साल से भी ज़्यादा लंबा होता है!</strong>
                   </p>
                 </div>
              </div>
           </div>
        </section>

        {/* SECTION 7: CRUSHING PRESSURE (06 कुचल देने वाला दबाव) */}
        <section className="relative w-full py-20 lg:py-32 bg-[#020509] overflow-hidden px-4 sm:px-8">
           <div className="absolute inset-0 z-0 flex justify-end pointer-events-none">
             <Image src="/universe/planets/venus/bg06_venus_pressure.webp" alt="Crushing Pressure" fill className="object-cover opacity-70" />
             <div className="absolute inset-0 bg-gradient-to-l from-[#020509]/20 via-[#020509]/60 to-[#020509]"></div>
           </div>
           <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 items-center relative z-10 gap-12">
              <div className="lg:col-span-6 lg:col-start-7 order-2 lg:order-2 flex flex-col gap-6 lg:gap-8 justify-center">
                 <div className="flex items-center gap-4 sm:gap-6 lg:flex-row-reverse text-right">
                   <div className="flex flex-col items-end">
                     <div className="w-[50px] sm:w-[80px] h-[2px] bg-purple-500/60 mb-2 sm:mb-4"></div>
                     <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.1em] uppercase text-white">कुचल देने वाला दबाव</h2>
                   </div>
                   <span className="text-[70px] sm:text-[100px] lg:text-[140px] font-bold text-purple-500/20 leading-none">06</span>
                 </div>
                 <div className="space-y-6 text-gray-200 text-lg sm:text-xl font-light leading-relaxed bg-black/80 p-6 sm:p-10 rounded-3xl backdrop-blur-md border border-white/10 text-left lg:text-right max-w-2xl lg:ml-auto shadow-2xl">
                    <p>
                      अगर आप कैसे भी करके शुक्र की भयंकर गर्मी से बच जाएँ, तो वहाँ का दबाव (Atmospheric Pressure) आपको बचने नहीं देगा। 
                    </p>
                    <p>
                      शुक्र पर हवा का दबाव पृथ्वी की तुलना में 90 गुना ज़्यादा भारी है! यह दबाव बिल्कुल वैसा ही है जैसा <strong>पृथ्वी पर पानी के अंदर 1 किलोमीटर (3000 फीट) गहराई में</strong> महसूस होता है। यहाँ खड़ा कोई भी इंसान सेकेंडों के भीतर एक खाली कैन (crushed can) की तरह पिचक कर ख़त्म हो जाएगा।
                    </p>
                 </div>
              </div>
           </div>
        </section>

        {/* SECTION 8: VOLCANO WORLD (07 ज्‍वालामुखियों की दुनिया) */}
        <section className="relative w-full py-20 lg:py-32 bg-[#010204] overflow-hidden flex flex-col justify-center px-4 sm:px-8">
          <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 items-center relative z-10 gap-12 lg:gap-24">
            <div className="order-2 lg:order-1 w-full relative z-10 flex items-center justify-center">
              <div className="relative w-full aspect-[4/3] max-w-[600px] rounded-3xl overflow-hidden group shadow-2xl border border-white/10">
                 <Image src="/universe/planets/venus/bg07_venus_volcano.webp" alt="Venus Volcanoes" fill className="object-cover opacity-100 group-hover:scale-105 transition-transform duration-1000" />
                 <div className="absolute inset-0 bg-black/30 z-10"></div>
              </div>
            </div>
            <div className="flex flex-col gap-6 lg:gap-8 order-1 lg:order-2 relative z-20">
               <div className="flex items-center gap-4 sm:gap-6">
                 <span className="text-[70px] sm:text-[100px] lg:text-[140px] font-bold text-[#ce4108]/30 leading-none drop-shadow-2xl">07</span>
                 <div className="flex flex-col">
                   <div className="w-[50px] sm:w-[80px] h-[2px] bg-[#ce4108] mb-2 sm:mb-4"></div>
                   <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.1em] uppercase">ज्‍वालामुखियों की दुनिया</h2>
                 </div>
               </div>
               <div className="lg:pl-[120px] space-y-6 text-gray-200 text-lg sm:text-xl font-light leading-relaxed max-w-2xl">
                 <p>
                   रडार (Radar) स्कैनिंग से पता चला है कि शुक्र की सतह पर हमारी पूरी आकाशगंगा के किसी भी ग्रह से सबसे ज़्यादा ज्वालामुखी (Volcanoes) मौजूद हैं।
                 </p>
                 <p>
                   यहाँ 1 लाख से ज़्यादा छोटे-बड़े ज्वालामुखी फैले हुए हैं, जिनमें से बहुत सारे अभी भी जीवित (Active) हैं और लगातार ज़हरीली गैसें उगल रहे हैं। शुक्र की सतह पर हर तरफ सिर्फ पिघले हुए लावे की नदियाँ और कठोर बेसाल्ट चट्टानें ही दिखाई देती हैं।
                 </p>
               </div>
            </div>
          </div>
        </section>

        {/* SECTION 9: VENERA MISSIONS (08 रूस का वेनेरा मिशन) */}
        <section className="relative w-full py-20 lg:py-32 min-h-[700px] overflow-hidden px-4 sm:px-8 bg-black">
           <div className="absolute inset-0 z-0">
             <Image src="/universe/planets/venus/bg08_venus_venera.webp" alt="Soviet Venera Mission" fill className="object-cover opacity-90" />
             <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>
           </div>
           <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 items-center relative z-10 gap-12">
              <div className="flex flex-col gap-6 lg:gap-8 relative z-20">
                 <div className="flex items-center gap-4 sm:gap-6">
                   <span className="text-[70px] sm:text-[100px] lg:text-[140px] font-bold text-red-700/40 leading-none">08</span>
                   <div className="flex flex-col">
                     <div className="w-[50px] sm:w-[80px] h-[2px] bg-red-700 mb-2 sm:mb-4"></div>
                     <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.1em] uppercase text-white">रूस का वेनेरा मिशन</h2>
                   </div>
                 </div>
                 <div className="lg:ml-[120px] space-y-6 text-gray-100 text-lg sm:text-xl font-light leading-relaxed max-w-2xl bg-black/80 p-6 sm:p-10 rounded-3xl backdrop-blur-md border border-white/10 shadow-2xl">
                   <p className="text-shadow-md">
                     इतने ख़तरनाक ग्रह पर जाना नामुमकिन सा लगता है, लेकिन शीत-युद्ध (Cold War) के दौरान सोवियत संघ (रूस) ने यह कमाल कर दिखाया।
                   </p>
                   <p className="text-shadow-md">
                     उनके शक्तिशाली <strong>'Venera' (वेनेरा)</strong> रोवर्स ने शुक्र की धरती पर ऐतिहासिक लैंडिंग की। हालाँकि वहां के विनाशकारी दबाव और पिघला देने वाली गर्मी ने उन रोबोट्स को महज़ दो घंटों के अंदर ही पिघलाकर हमेशा के लिए ख़त्म कर दिया, लेकिन ख़त्म होने से पहले वेनेरा ने शुक्र की ज़मीन की पहली और इकलौती असली तस्वीरें पृथ्वी तक भेज दीं!
                   </p>
                 </div>
              </div>
           </div>
        </section>

        {/* SECTION 10: LIFE? (09 क्या शुक्र पर जीवन हो सकता है?) */}
        <section className="relative w-full py-20 lg:py-32 bg-[#020509] overflow-hidden px-4 sm:px-8 border-b border-white/5">
           <div className="absolute inset-0 z-0">
             <Image src="/universe/planets/venus/bg09_venus_life.webp" alt="Life in Venus Clouds" fill className="object-cover opacity-80" />
             <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>
           </div>
           <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 items-center relative z-10 gap-12">
              <div className="lg:col-span-8 lg:col-start-5 order-2 lg:order-2 flex flex-col gap-6 lg:gap-8 justify-center z-20">
                 <div className="flex items-center gap-4 sm:gap-6 justify-start lg:justify-end">
                   <div className="flex flex-col text-left lg:text-right w-full">
                     <div className="w-[50px] sm:w-[80px] h-[2px] bg-cyan-400/60 mb-2 sm:mb-4 lg:self-end"></div>
                     <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.1em] uppercase">क्या शुक्र पर जीवन हो सकता है?</h2>
                   </div>
                   <span className="text-[70px] sm:text-[100px] lg:text-[140px] font-bold text-cyan-400/20 leading-none">09</span>
                 </div>
                 <div className="text-gray-200 text-lg sm:text-xl font-light leading-relaxed space-y-6 bg-black/80 p-6 sm:p-10 rounded-3xl backdrop-blur-md border border-white/10 text-left lg:text-right lg:ml-auto max-w-3xl shadow-2xl">
                    <p className="text-shadow-md">
                      भले ही इसकी सतह नर्क जैसी है, लेकिन शुक्र की ज़मीन से 50 किलोमीटर ऊपर, बादलों के बीच का वातावरण रहस्यमय रूप से काफी शांत है। 
                    </p>
                    <p className="text-shadow-md">
                      हाल ही में वैज्ञानिकों ने शुक्र के इन बादलों में <strong>'फॉस्फीन' (Phosphine)</strong> नाम की एक गैस की खोज की है। पृथ्वी पर यह गैस केवल सूक्ष्म जीवों (Microbes) द्वारा बनाई जाती है। इस खोज ने विज्ञान जगत में तहलका मचा दिया है क्योंकि इसका मतलब हो सकता है कि शुक्र के उन घने बादलों के बीच कोई एलियन जीवन पनप रहा है!
                    </p>
                 </div>
              </div>
           </div>
        </section>

        {/* YOUTUBE FEATURED VIDEO */}
        <FeaturedVideo videoId="OCql4mA07d8" />

        {/* RELATED PLANETS WIDGET */}
        <NextPlanets currentPlanetId="venus" />

        {/* RELATED TOOLS SECTION */}
        <section className="bg-[#020509] border-t border-white/5 py-16 lg:py-24">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Explore More Space Tools</h2>
                <p className="text-gray-400 text-sm md:text-base">Continue your interactive journey across the cosmos.</p>
              </div>
              <Link href="/tools" className="mt-4 md:mt-0 text-orange-400 font-bold hover:text-orange-300 transition-colors uppercase text-xs tracking-wider">
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
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">{tool.title}</h3>
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
                    className="flex-1 px-6 py-4 rounded-full bg-white/5 backdrop-blur-md border border-white/20 text-white placeholder:text-gray-400 outline-none focus:border-orange-500 transition-all text-base w-full shadow-inner"
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
