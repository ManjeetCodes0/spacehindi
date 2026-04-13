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

export default function UranusCustomPage() {
  const { lang } = useLang();
  const body = getCelestialBody("uranus");
  if (!body) notFound();

  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const heroImages = [
    "/universe/planets/uranus/uranus1.png",
    "/universe/planets/uranus/uranus_art1.webp",
    "/universe/planets/uranus/uranus_art2.webp"
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
                 URANUS
              </h1>
              <p className="mt-6 lg:mt-8 text-lg sm:text-xl xl:text-2xl leading-relaxed text-gray-200 font-light max-w-xl" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.8)" }}>
                अरुण ग्रह (Uranus) — सौरमंडल का सबसे अजीब और रहस्यमयी ग्रह जो अपनी करवट पर लेटकर सूरज का चक्कर लगाता है। बर्फीले नीले रंग का यह विशाल ग्रह अंधेरे और ठंड की चरम सीमा पर बसा है।
              </p>

              {/* Stats Grid */}
              <div className="w-full grid grid-cols-2 gap-x-4 sm:gap-x-8 gap-y-6 sm:gap-y-8 pt-8 sm:pt-12 mt-6 sm:mt-10 border-t border-white/20">
                <div className="flex flex-col gap-1 sm:gap-3">
                  <span className="text-[10px] sm:text-xs tracking-[0.1em] text-white/70 uppercase font-semibold">दिन (Day)</span>
                  <span className="text-xl sm:text-2xl lg:text-3xl font-light">17.2 घंटे</span>
                </div>
                <div className="flex flex-col gap-1 sm:gap-3">
                  <span className="text-[10px] sm:text-xs tracking-[0.1em] text-white/70 uppercase font-semibold">व्यास (Diameter)</span>
                  <span className="text-xl sm:text-2xl lg:text-3xl font-light">50,724 किमी</span>
                </div>
                <div className="flex flex-col gap-1 sm:gap-3">
                  <span className="text-[10px] sm:text-xs tracking-[0.1em] text-white/70 uppercase font-semibold">चाँद (Moons)</span>
                  <span className="text-xl sm:text-2xl lg:text-3xl font-light">28 (ज्ञात)</span>
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

                 {/* Background Glowing Rings — Uranus themed (Cyan/Teal) */}
                 <div className="absolute w-[120%] h-[120%] bg-cyan-500/10 rounded-full blur-[70px] xl:blur-[90px] pointer-events-none z-0 transition-opacity duration-1000"></div>
                 <div className="absolute w-[85%] h-[85%] rounded-full border border-cyan-400/20 pointer-events-none z-0 animate-pulse"></div>
                 <div className="absolute w-[110%] h-[110%] rounded-full border border-teal-400/15 border-dashed animate-[spin_25s_linear_infinite] pointer-events-none z-0"></div>
                 <div className="absolute w-[135%] h-[135%] rounded-full border border-white/5 pointer-events-none z-0"></div>

                 {heroImages.map((src, index) => (
                    <Image
                      key={src}
                      src={src}
                      alt={`अरुण ग्रह (Uranus Planet) Visual ${index + 1}`}
                      fill
                      className={`object-contain drop-shadow-[0_0_80px_rgba(6,182,212,0.2)] transition-all duration-[1500ms] ease-in-out ${
                        currentHeroImage === index ? "opacity-100 scale-100" : "opacity-0 scale-95"
                      }`}
                      priority={index === 0}
                    />
                 ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: BASIC INFO (01 तिरछा ग्रह) */}
        <section className="relative w-full py-20 lg:py-32 bg-[#050a12] overflow-hidden flex flex-col justify-center px-4 sm:px-8">
          <div className="absolute top-0 right-0 w-full h-full z-0 opacity-30 pointer-events-none bg-gradient-to-l from-cyan-900/10 to-transparent"></div>
          <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 items-center relative z-10 gap-12 lg:gap-24">
            <div className="flex flex-col gap-6 lg:gap-8 order-2 lg:order-1 relative z-20">
               <div className="flex items-center gap-4 sm:gap-6">
                 <span className="text-[70px] sm:text-[100px] lg:text-[140px] font-bold text-[#b4b4bb] leading-none drop-shadow-2xl opacity-50">01</span>
                 <div className="flex flex-col">
                   <div className="w-[50px] sm:w-[80px] h-[2px] bg-white/60 mb-2 sm:mb-4"></div>
                   <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.1em] uppercase">तिरछा ग्रह</h2>
                 </div>
               </div>
               <div className="lg:pl-[120px] space-y-6 text-gray-200 text-lg sm:text-xl font-light leading-relaxed max-w-2xl">
                 <p>
                   अरुण ग्रह पूरे सौरमंडल का सबसे विचित्र ग्रह है। जहाँ बाकी सभी ग्रह अपनी धुरी पर लट्टू की तरह सीधे खड़े होकर घूमते हैं, वहीं अरुण <strong>98 डिग्री झुककर अपनी करवट पर लेटा हुआ</strong> सूरज का चक्कर लगाता है — जैसे कोई गेंद ज़मीन पर लुढ़क रही हो!
                 </p>
                 <p>
                   वैज्ञानिकों का मानना है कि अरबों साल पहले पृथ्वी के आकार के किसी विशाल पिंड ने अरुण से ज़बरदस्त टक्कर मारी जिसने इसे लगभग पूरा उलट दिया। इस अनोखे झुकाव की वजह से अरुण का एक ध्रुव <strong>42 साल तक लगातार सूरज की तरफ़</strong> रहता है और दूसरा ध्रुव 42 साल तक पूरे अंधेरे में डूबा रहता है।
                 </p>
               </div>
            </div>
            <div className="order-1 lg:order-2 w-full relative z-10 flex items-center justify-center">
              <div className="relative w-full aspect-square max-w-[500px] rounded-[30px] overflow-hidden group">
                 <div className="absolute inset-0 z-0 shadow-inner">
                    <Image src="/universe/planets/uranus/bg01_uranus_tilted.webp" alt="Uranus tilted on its side" fill className="object-cover opacity-100 contrast-125 saturate-50 scale-110 group-hover:scale-105 transition-transform duration-1000" />
                    <div className="absolute inset-0 bg-gradient-to-bl from-transparent to-[#050a12]/50 z-10"></div>
                 </div>
                 <div className="relative w-[80%] h-[80%] m-[10%] z-20 group-hover:scale-[1.02] transition-transform duration-700">
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: ICE GIANT (02 बर्फ का विशाल ग्रह) */}
        <section className="relative w-full py-20 lg:py-32 min-h-[700px] overflow-hidden px-4 sm:px-8 bg-black">
           <div className="absolute inset-0 z-0">
             <Image src="/universe/planets/uranus/bg02_uranus_ice_giant.webp" alt="Uranus ice giant interior" fill className="object-cover opacity-90" />
             <div className="absolute inset-0 bg-black/30 pointer-events-none"></div>
           </div>
           <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 items-center relative z-10 gap-12">
              <div className="hidden lg:block order-1"></div>
              <div className="flex flex-col gap-6 lg:gap-8 order-2 lg:order-1 relative z-20">
                 <div className="flex items-center gap-4 sm:gap-6">
                   <span className="text-[70px] sm:text-[100px] lg:text-[140px] font-bold text-cyan-500/30 leading-none">02</span>
                   <div className="flex flex-col">
                     <div className="w-[50px] sm:w-[80px] h-[2px] bg-cyan-500/80 mb-2 sm:mb-4"></div>
                     <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.1em] uppercase text-white">बर्फ का विशाल ग्रह</h2>
                   </div>
                 </div>
                 <div className="lg:ml-[120px] space-y-6 text-gray-100 text-lg sm:text-xl font-light leading-relaxed max-w-2xl bg-black/70 p-6 sm:p-10 rounded-3xl backdrop-blur-md border border-white/10 shadow-2xl">
                   <p className="text-shadow-md">
                     बृहस्पति और शनि को &apos;गैस जायंट&apos; कहते हैं, लेकिन अरुण और वरुण को &apos;Ice Giant&apos; (बर्फ विशाल) कहा जाता है — और इसकी वजह बहुत दिलचस्प है। अरुण का 80% से ज़्यादा हिस्सा पानी, अमोनिया, और मीथेन की बर्फ़ के गर्म घने मिश्रण से बना है।
                   </p>
                   <p className="text-shadow-md">
                     लेकिन यह सामान्य बर्फ़ नहीं है। अरुण के अंदर का तापमान और दबाव इतना भयानक है कि यहाँ की बर्फ़ &apos;Superionic Ice&apos; नामक एक विचित्र अवस्था में बदल जाती है — जहाँ ऑक्सीजन के परमाणु जमे रहते हैं लेकिन हाइड्रोजन के प्रोटॉन तरल की तरह बहते हैं। यह एक ऐसी बर्फ़ है जो <strong>एक ही समय में ठोस भी है और तरल भी!</strong>
                   </p>
                 </div>
              </div>
           </div>
        </section>

        {/* SECTION 4: BLUE COLOR (03 नीला रंग — मीथेन का जादू) */}
        <section className="relative w-full py-20 lg:py-32 bg-[#020509] overflow-hidden px-4 sm:px-8">
           <div className="absolute inset-0 z-0">
             <Image src="/universe/planets/uranus/bg03_uranus_methane_blue.webp" alt="Uranus methane blue atmosphere" fill className="object-cover opacity-80" />
             <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>
           </div>
           <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 items-center relative z-10 gap-12">
              <div className="lg:col-span-6 order-2 lg:order-2 flex flex-col gap-6 lg:gap-8 justify-center">
                 <div className="flex items-center gap-4 sm:gap-6 justify-start lg:justify-end">
                   <div className="flex flex-col text-left lg:text-right w-full">
                     <div className="w-[50px] sm:w-[80px] h-[2px] bg-teal-400/40 mb-2 sm:mb-4 lg:self-end"></div>
                     <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.1em] uppercase">नीला रंग — मीथेन का जादू</h2>
                   </div>
                   <span className="text-[70px] sm:text-[100px] lg:text-[140px] font-bold text-teal-400/30 leading-none">03</span>
                 </div>

                 <div className="text-gray-200 text-lg sm:text-xl font-light leading-relaxed space-y-6 bg-black/80 p-6 sm:p-10 rounded-3xl backdrop-blur-md border border-white/10 text-left lg:text-right lg:ml-auto max-w-2xl shadow-2xl">
                    <p>
                      अरुण का खूबसूरत नीला-हरा (cyan) रंग इसके वायुमंडल में मौजूद 2% <strong>मीथेन (CH₄) गैस</strong> की वजह से है। मीथेन सूरज की रोशनी में से लाल रंग को सोख लेती है और सिर्फ़ नीली-हरी रोशनी को वापस reflect करती है — जिससे हमें यह ग्रह इस मनमोहक रंग में दिखाई देता है।
                    </p>
                    <p>
                      लेकिन 2023 में वैज्ञानिकों ने Voyager 2 के पुराने डेटा को दोबारा प्रोसेस करके खुलासा किया कि अरुण का असली रंग उतना गहरा नीला नहीं है जितना हम सोचते थे — बल्कि यह <strong>हल्का नीला-हरा (pale cyan-green)</strong> है। पहले की तस्वीरों में कंट्रास्ट बढ़ाने से रंग ज़्यादा गहरा दिख रहा था। फिर भी, यह सौरमंडल के सबसे सुंदर रंगों वाला ग्रह है।
                    </p>
                 </div>
              </div>
           </div>
        </section>

        {/* SECTION 5: EXTREME COLD (04 सबसे ठंडा ग्रह) */}
        <section className="relative w-full py-20 lg:py-32 bg-[#010204] overflow-hidden flex flex-col justify-center px-4 sm:px-8">
          <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 items-center relative z-10 gap-12 lg:gap-24">
            <div className="order-2 lg:order-1 w-full relative z-10 flex items-center justify-center">
              <div className="relative w-full aspect-square max-w-[600px] group rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                 <Image src="/universe/planets/uranus/bg04_uranus_coldest.webp" alt="Uranus — coldest planet in solar system" fill className="object-cover opacity-100 group-hover:scale-105 transition-transform duration-1000" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30"></div>
              </div>
            </div>
            <div className="flex flex-col gap-6 lg:gap-8 order-1 lg:order-2 relative z-20">
               <div className="flex items-center gap-4 sm:gap-6">
                 <span className="text-[70px] sm:text-[100px] lg:text-[140px] font-bold text-blue-400/30 leading-none drop-shadow-2xl">04</span>
                 <div className="flex flex-col">
                   <div className="w-[50px] sm:w-[80px] h-[2px] bg-blue-400/60 mb-2 sm:mb-4"></div>
                   <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.1em] uppercase">सबसे ठंडा ग्रह</h2>
                 </div>
               </div>
               <div className="lg:pl-[120px] space-y-6 text-gray-200 text-lg sm:text-xl font-light leading-relaxed max-w-2xl">
                 <p>
                   हैरानी की बात है कि वरुण (Neptune) सूरज से ज़्यादा दूर होने के बावजूद, <strong>अरुण सौरमंडल का सबसे ठंडा ग्रह है!</strong> इसके बादलों का तापमान -224°C तक गिर जाता है — Absolute Zero (-273°C) से सिर्फ़ 49 डिग्री ज़्यादा।
                 </p>
                 <p>
                   इसकी वजह एक अनसुलझा रहस्य है — अरुण अपने अंदर से लगभग <strong>कोई गर्मी बाहर नहीं छोड़ता।</strong> बाकी सभी विशाल ग्रह (बृहस्पति, शनि, वरुण) सूरज से मिलने वाली गर्मी से कहीं ज़्यादा गर्मी अपने अंदर से बाहर फेंकते हैं, लेकिन अरुण ऐसा नहीं करता। वैज्ञानिक नहीं जानते कि इसकी अंदरूनी गर्मी कहाँ गई — शायद वो प्राचीन टक्कर ने इसके कोर को किसी तरह ठंडा कर दिया।
                 </p>
               </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: RINGS (05 अंधेरे में छुपे छल्ले) */}
        <section className="relative w-full py-20 lg:py-32 min-h-[700px] overflow-hidden px-4 sm:px-8 bg-black">
           <div className="absolute inset-0 z-0">
             <Image src="/universe/planets/uranus/bg05_uranus_rings.webp" alt="Uranus dark ring system" fill className="object-cover opacity-90" />
             <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>
           </div>
           <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 items-center relative z-10 gap-12">
              <div className="flex flex-col gap-6 lg:gap-8 relative z-20">
                 <div className="flex items-center gap-4 sm:gap-6">
                   <span className="text-[70px] sm:text-[100px] lg:text-[140px] font-bold text-violet-400/20 leading-none">05</span>
                   <div className="flex flex-col">
                     <div className="w-[50px] sm:w-[80px] h-[2px] bg-violet-400/60 mb-2 sm:mb-4"></div>
                     <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.1em] uppercase">अंधेरे में छुपे छल्ले</h2>
                   </div>
                 </div>
                 <div className="lg:ml-[120px] space-y-6 text-gray-100 text-lg sm:text-xl font-light leading-relaxed max-w-2xl bg-black/80 p-6 sm:p-10 rounded-3xl backdrop-blur-md border border-white/10 shadow-2xl">
                   <p className="text-shadow-md">
                     शनि की तरह अरुण के पास भी छल्ले (rings) हैं — लेकिन ये बिल्कुल उलटे हैं। जहाँ शनि के छल्ले चमकदार बर्फ से बने हैं, वहीं अरुण के 13 छल्ले <strong>बेहद अंधेरे और लगभग अदृश्य</strong> हैं। ये कार्बन-युक्त कणों और गहरे रंग की धूल से बने हैं जो सिर्फ़ 2% रोशनी reflect करते हैं।
                   </p>
                   <p className="text-shadow-md">
                     इन छल्लों की खोज 1977 में तब हुई जब वैज्ञानिक अरुण के पीछे से गुज़रते एक तारे की रोशनी देख रहे थे। तारे की रोशनी ग्रह से पहले और बाद में कई बार टिमटिमाई — जिससे पता चला कि ग्रह के चारों ओर कुछ है। ग्रह के 98° झुकाव की वजह से ये छल्ले लगभग <strong>ऊर्ध्वाधर (vertical)</strong> हैं — सौरमंडल में सबसे अनोखा नज़ारा।
                   </p>
                 </div>
              </div>
           </div>
        </section>

        {/* SECTION 7: EXTREME SEASONS (06 42 साल का मौसम) */}
        <section className="relative w-full py-20 lg:py-32 bg-[#020509] overflow-hidden px-4 sm:px-8">
           <div className="absolute inset-0 z-0 flex justify-end pointer-events-none">
             <Image src="/universe/planets/uranus/bg06_uranus_seasons.webp" alt="Uranus extreme 42-year seasons" fill className="object-cover opacity-70" />
             <div className="absolute inset-0 bg-gradient-to-l from-[#020509]/20 via-[#020509]/60 to-[#020509]"></div>
           </div>
           <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 items-center relative z-10 gap-12">
              <div className="lg:col-span-6 lg:col-start-7 order-2 lg:order-2 flex flex-col gap-6 lg:gap-8 justify-center">
                 <div className="flex items-center gap-4 sm:gap-6 lg:flex-row-reverse text-right">
                   <div className="flex flex-col items-end">
                     <div className="w-[50px] sm:w-[80px] h-[2px] bg-indigo-400/60 mb-2 sm:mb-4"></div>
                     <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.1em] uppercase text-white">42 साल का मौसम</h2>
                   </div>
                   <span className="text-[70px] sm:text-[100px] lg:text-[140px] font-bold text-indigo-400/20 leading-none">06</span>
                 </div>
                 <div className="space-y-6 text-gray-200 text-lg sm:text-xl font-light leading-relaxed bg-black/80 p-6 sm:p-10 rounded-3xl backdrop-blur-md border border-white/10 text-left lg:text-right max-w-2xl lg:ml-auto shadow-2xl">
                    <p>
                      अरुण के 98° झुकाव का सबसे पागल करने वाला नतीजा है — इसके <strong>42 साल लम्बे मौसम!</strong> अरुण को सूरज का एक चक्कर लगाने में 84 पृथ्वी-वर्ष लगते हैं।
                    </p>
                    <p>
                      इस दौरान एक ध्रुव 42 साल तक सीधे सूरज की ओर रहता है (गर्मी) जबकि दूसरा ध्रुव 42 साल तक पूरे अंधेरे में डूबा रहता है (सर्दी)। कल्पना कीजिए — अगर आप अरुण के उत्तरी ध्रुव पर खड़े हों, तो <strong>42 साल तक लगातार दिन</strong> रहेगा और फिर अगले <strong>42 साल तक लगातार रात।</strong> पूरे सौरमंडल में किसी भी ग्रह पर ऐसा चरम मौसम नहीं मिलता।
                    </p>
                 </div>
              </div>
           </div>
        </section>

        {/* SECTION 8: DIAMOND RAIN (07 हीरों की बारिश) */}
        <section className="relative w-full py-20 lg:py-32 bg-[#010204] overflow-hidden flex flex-col justify-center px-4 sm:px-8">
          <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 items-center relative z-10 gap-12 lg:gap-24">
            <div className="order-2 lg:order-1 w-full relative z-10 flex items-center justify-center">
              <div className="relative w-full aspect-[4/3] max-w-[600px] rounded-3xl overflow-hidden group shadow-2xl border border-white/10">
                 <Image src="/universe/planets/uranus/bg07_uranus_diamond_rain.webp" alt="Diamond rain inside Uranus" fill className="object-cover opacity-100 group-hover:scale-105 transition-transform duration-1000" />
                 <div className="absolute inset-0 bg-black/30 z-10"></div>
              </div>
            </div>
            <div className="flex flex-col gap-6 lg:gap-8 order-1 lg:order-2 relative z-20">
               <div className="flex items-center gap-4 sm:gap-6">
                 <span className="text-[70px] sm:text-[100px] lg:text-[140px] font-bold text-sky-300/20 leading-none drop-shadow-2xl">07</span>
                 <div className="flex flex-col">
                   <div className="w-[50px] sm:w-[80px] h-[2px] bg-sky-300/60 mb-2 sm:mb-4"></div>
                   <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.1em] uppercase">हीरों की बारिश</h2>
                 </div>
               </div>
               <div className="lg:pl-[120px] space-y-6 text-gray-200 text-lg sm:text-xl font-light leading-relaxed max-w-2xl">
                 <p>
                   यह सुनने में किसी परीकथा जैसा लगता है, लेकिन वैज्ञानिकों का मानना है कि अरुण (और वरुण) के अंदर <strong>शाब्दिक रूप से हीरों (diamonds) की बारिश होती है!</strong>
                 </p>
                 <p>
                   ग्रह की गहराई में भयानक दबाव (लाखों वायुमंडलीय दबाव) और 5,000°C से ज़्यादा तापमान पर मीथेन गैस के कार्बन परमाणु टूटकर अलग हो जाते हैं और फिर जुड़कर <strong>ठोस हीरे के क्रिस्टल</strong> बन जाते हैं। ये हीरे ग्रह के कोर की तरफ़ बारिश की बूंदों की तरह गिरते रहते हैं। 2017 में वैज्ञानिकों ने लैब में इस प्रक्रिया को दोहराकर साबित भी कर दिया। अरुण के कोर के चारों ओर शायद <strong>हीरों का एक विशाल समंदर</strong> मौजूद है।
                 </p>
               </div>
            </div>
          </div>
        </section>

        {/* SECTION 9: MOONS (08 शेक्सपियर के चाँद) */}
        <section className="relative w-full py-20 lg:py-32 min-h-[700px] overflow-hidden px-4 sm:px-8 bg-black">
           <div className="absolute inset-0 z-0">
             <Image src="/universe/planets/uranus/bg08_uranus_moons.webp" alt="Uranus moons — Miranda, Ariel, Titania" fill className="object-cover opacity-90" />
             <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>
           </div>
           <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 items-center relative z-10 gap-12">
              <div className="flex flex-col gap-6 lg:gap-8 relative z-20">
                 <div className="flex items-center gap-4 sm:gap-6">
                   <span className="text-[70px] sm:text-[100px] lg:text-[140px] font-bold text-purple-400/20 leading-none">08</span>
                   <div className="flex flex-col">
                     <div className="w-[50px] sm:w-[80px] h-[2px] bg-purple-400/60 mb-2 sm:mb-4"></div>
                     <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.1em] uppercase text-white">शेक्सपियर के चाँद</h2>
                   </div>
                 </div>
                 <div className="lg:ml-[120px] space-y-6 text-gray-100 text-lg sm:text-xl font-light leading-relaxed max-w-2xl bg-black/80 p-6 sm:p-10 rounded-3xl backdrop-blur-md border border-white/10 shadow-2xl">
                   <p className="text-shadow-md">
                     अरुण के 28 ज्ञात चाँदों की एक खास बात है — इनके नाम सौरमंडल में अकेले ऐसे हैं जो ग्रीक/रोमन पौराणिक कथाओं से नहीं बल्कि <strong>शेक्सपियर और Alexander Pope की साहित्यिक रचनाओं</strong> के किरदारों पर रखे गए हैं — Titania, Oberon, Ariel, Miranda, Puck, और Cordelia।
                   </p>
                   <p className="text-shadow-md">
                     इनमें सबसे रहस्यमयी है <strong>Miranda (मिरांडा)</strong> — सिर्फ़ 470 किमी चौड़ा यह छोटा चाँद अंतरिक्ष विज्ञान की सबसे विचित्र सतहों में से एक है। इस पर 20 किलोमीटर ऊँची खड़ी चट्टानें (Verona Rupes) हैं — <strong>सौरमंडल की सबसे ऊँची ज्ञात चट्टान!</strong> ऐसा लगता है जैसे इस चाँद को किसी ने तोड़कर गलत तरीके से वापस जोड़ दिया हो।
                   </p>
                 </div>
              </div>
           </div>
        </section>

        {/* SECTION 10: VOYAGER 2 & FUTURE (09 इकलौती मुलाक़ात) */}
        <section className="relative w-full py-20 lg:py-32 bg-[#020509] overflow-hidden px-4 sm:px-8 border-b border-white/5">
           <div className="absolute inset-0 z-0">
             <Image src="/universe/planets/uranus/bg09_uranus_voyager.webp" alt="Voyager 2 flyby of Uranus" fill className="object-cover opacity-80" />
             <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>
           </div>
           <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 items-center relative z-10 gap-12">
              <div className="lg:col-span-8 lg:col-start-5 order-2 lg:order-2 flex flex-col gap-6 lg:gap-8 justify-center z-20">
                 <div className="flex items-center gap-4 sm:gap-6 justify-start lg:justify-end">
                   <div className="flex flex-col text-left lg:text-right w-full">
                     <div className="w-[50px] sm:w-[80px] h-[2px] bg-emerald-400/60 mb-2 sm:mb-4 lg:self-end"></div>
                     <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.1em] uppercase">इकलौती मुलाक़ात</h2>
                   </div>
                   <span className="text-[70px] sm:text-[100px] lg:text-[140px] font-bold text-emerald-400/20 leading-none">09</span>
                 </div>
                 <div className="text-gray-200 text-lg sm:text-xl font-light leading-relaxed space-y-6 bg-black/80 p-6 sm:p-10 rounded-3xl backdrop-blur-md border border-white/10 text-left lg:text-right lg:ml-auto max-w-3xl shadow-2xl">
                    <p className="text-shadow-md">
                      अरुण ग्रह के पास आज तक <strong>सिर्फ़ एक ही अंतरिक्ष यान</strong> गया है — NASA का <strong>Voyager 2</strong>, जो 24 जनवरी 1986 को अरुण के पास से गुज़रा। वह मुलाक़ात सिर्फ़ कुछ घंटों की थी लेकिन उसने 10 नए चाँद, छल्लों की खोज, और अरुण के चुम्बकीय क्षेत्र का पहला नक्शा दिया।
                    </p>
                    <p className="text-shadow-md">
                      वो 1986 की बात है — तब से <strong>लगभग 40 साल बीत गए</strong> और कोई दूसरा मिशन अरुण तक नहीं पहुँचा। लेकिन अब NASA और ESA दोनों एक समर्पित <strong>Uranus Orbiter</strong> मिशन की योजना बना रहे हैं जो 2030 के दशक में लॉन्च हो सकता है। यह मिशन अरुण की कक्षा में रहकर सालों तक इस रहस्यमयी ग्रह, उसके छल्लों और चाँदों का गहन अध्ययन करेगा। <strong>अरुण सौरमंडल का सबसे कम खोजा गया विशाल ग्रह है — और अब उसकी बारी आने वाली है।</strong>
                    </p>
                 </div>
              </div>
           </div>
        </section>

        {/* YOUTUBE FEATURED VIDEO */}
        <FeaturedVideo videoId="xjemYaNDaEI" />

        {/* RELATED PLANETS WIDGET */}
        <NextPlanets currentPlanetId="uranus" />

        {/* RELATED TOOLS SECTION */}
        <section className="bg-[#020509] border-t border-white/5 py-16 lg:py-24">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Explore More Space Tools</h2>
                <p className="text-gray-400 text-sm md:text-base">Continue your interactive journey across the cosmos.</p>
              </div>
              <Link href="/tools" className="mt-4 md:mt-0 text-cyan-400 font-bold hover:text-cyan-300 transition-colors uppercase text-xs tracking-wider">
                VIEW ALL TOOLS &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
              {[
                { title: "Space Age Calculator", desc: "How old are you on Uranus or Neptune?", img: "/tools/tool-hero-bac1.webp", link: "/tools/space-age" },
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
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">{tool.title}</h3>
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
                    className="flex-1 px-6 py-4 rounded-full bg-white/5 backdrop-blur-md border border-white/20 text-white placeholder:text-gray-400 outline-none focus:border-cyan-500 transition-all text-base w-full shadow-inner"
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
