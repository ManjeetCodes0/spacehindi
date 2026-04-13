"use client";

import { useLang } from "@/context/LanguageContext";

interface FeaturedVideoProps {
  videoId: string;
}

export default function FeaturedVideo({ videoId }: FeaturedVideoProps) {
  const { lang } = useLang();

  return (
    <section className="w-full py-16 lg:py-24 bg-[#020509] border-t border-white/5 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] max-w-[800px] h-[80%] bg-red-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-[1000px] mx-auto px-4 sm:px-8 relative z-10 text-center">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 mb-6">
             <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
             <span className="text-xs font-semibold text-red-400 tracking-widest uppercase">
               {lang === "en" ? "Featured Video" : "खास वीडियो"}
             </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-wide uppercase drop-shadow-lg">
            {lang === "en" ? "Watch Full Documentary" : "पूरी डॉक्यूमेंट्री देखें"}
          </h2>
          <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto font-light">
            {lang === "en" 
              ? "Dive deep into the mysteries of the scorching planet with our exclusive video." 
              : "हमारे इस खास वीडियो के साथ धधकते ग्रह के रहस्यों की गहराई में जाएं और अद्भुत दृश्य देखें।"}
          </p>
        </div>

        {/* Video Player Container */}
        <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_80px_rgba(255,0,0,0.1)] group bg-black transition-all duration-700 hover:shadow-[0_0_100px_rgba(255,0,0,0.2)] hover:border-white/20">
          <iframe
            className="w-full h-full scale-[1.01]" // scale slighly to hide iframe micro-borders
            src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&color=red`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
}
