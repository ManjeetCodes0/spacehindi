"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Navbar, Footer } from "@/components/layout";
import SpaceAgeCalculator from "@/components/tools/SpaceAgeCalculator";
import { useLang } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import type { DeepDivePost } from "@/types/deep-dive";

export default function SpaceAgePage() {
  const { lang } = useLang();
  const [posts, setPosts] = useState<DeepDivePost[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("/api/deep-dive");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            setPosts(data.slice(0, 3));
          }
        }
      } catch {
        // Silent fail
      }
    }
    fetchPosts();
  }, []);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-bg-primary transition-colors duration-300">
        
        {/* 1. HERO SECTION (Compact) */}
        <section className="relative w-full h-[50vh] md:h-[55vh] flex items-center justify-center overflow-hidden">
          {/* Background Image & Overlays */}
          <div className="absolute inset-0 z-0">
            <img 
              src="/tools/tool1.webp" 
              alt="Space Age Background" 
              className="w-full h-full object-cover grayscale-[20%]"
            />
            {/* Dark gradient for readability, fading to bg-primary at bottom */}
            <div className="absolute inset-0 bg-black/70 z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/40 to-transparent z-10" />
          </div>

          <div className="relative z-20 text-center px-4 max-w-4xl pb-24 md:pb-32">
             <motion.h1 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6, delay: 0.1 }}
               className="text-4xl md:text-6xl font-black text-white tracking-tight leading-[1.1] drop-shadow-2xl"
               style={{ fontFamily: "'Playfair Display', serif" }}
             >
               {lang === "en" ? "Space Age Calculator" : "अंतरिक्ष आयु कैलकुलेटर"}
             </motion.h1>
          </div>
        </section>

        {/* 2. THE CALCULATOR TOOL */}
        <section className="relative z-30 -mt-32 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto mb-20">
          <SpaceAgeCalculator lang={lang} />
        </section>

        {/* 3. EDITORIAL ARTICLE */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto mb-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-5xl font-extrabold text-text-primary mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              अंतरिक्ष में उम्र कैसे बदलती है?
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-accent to-transparent mx-auto rounded-full" />
          </div>

          <article className="prose prose-lg prose-invert max-w-none text-text-secondary">
            <p className="text-xl leading-relaxed text-text-primary font-medium border-l-4 border-accent pl-6 bg-bg-surface/50 py-4 rounded-r-2xl shadow-sm">
              पृथ्वी पर हम अपना साल 365 दिनों का मानते हैं क्योंकि हमें सूर्य का एक चक्कर लगाने में इतना समय लगता है। 
              लेकिन क्या आप जानते हैं कि ब्रह्मांड के हर ग्रह पर समय अलग गति से चलता है? 
              अगर आप मंगल या नेप्च्यून पर रहते हैं, तो आपकी उम्र पृथ्वी की तुलना में बिल्कुल अलग होगी!
            </p>

            <div className="grid md:grid-cols-2 gap-8 mt-12 mb-12 items-center">
              <div>
                <h3 className="text-2xl font-bold text-text-primary mb-3">समय सापेक्ष है (Time is Relative)</h3>
                <p>
                  ब्रह्मांड में समय दो मुख्य चीज़ों पर निर्भर करता है: ग्रह की सूर्य से दूरी और उसके परिक्रमा करने की गति। 
                  जो ग्रह सूर्य के जितने करीब होते हैं, उनका साल उतना ही छोटा होता है। इसके अलावा, ग्रहों के अपनी धुरी पर 
                  घूमने की गति तय करती है कि वहां का एक दिन कितना लंबा होगा।
                </p>
              </div>
              <div className="relative h-56 rounded-3xl overflow-hidden shadow-2xl group">
                <img src="/universe/planets/mercury/mercury1.png" alt="Mercury planet" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white font-bold tracking-widest uppercase bg-black/50 px-6 py-2 rounded-full backdrop-blur-md border border-white/20">Orbital Speed</span>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-text-primary mb-3 mt-8">बुध ग्रह (Mercury): लगातार जन्मदिन</h3>
            <p className="mb-8">
              चूंकि बुध सूर्य के सबसे करीब है, यह मात्र <strong>88 पृथ्वी दिनों</strong> में ही अपना एक वर्ष पूरा कर लेता है। 
              इसका मतलब है कि अगर आप बुध पर रहते, तो आप पृथ्वी की तुलना में 4 गुना ज़्यादा जल्दी जन्मदिन मनाते!
            </p>

            <h3 className="text-2xl font-bold text-text-primary mb-3 mt-8">नेप्च्यून (Neptune): एक लंबी सदी की प्रतीक्षा</h3>
            <p>
              नेप्च्यून सौरमंडल का सबसे बाहरी ग्रह है। इसे सूर्य का एक चक्कर लगाने में लगभग 
              <strong className="text-accent"> 165 पृथ्वी वर्ष</strong> लगते हैं। पृथ्वी पर रहने वाला कोई भी इंसान 
              नेप्च्यून पर अपना पहला जन्मदिन भी नहीं मना पाएगा, क्योंकि एक नेप्च्यून वर्ष की प्रतीक्षा कई पीढ़ियों के बराबर है!
            </p>

            <div className="bg-bg-elevated border border-bg-border p-6 rounded-3xl mt-12 shadow-inner text-center">
              <h4 className="text-xl font-bold text-text-primary mb-2">क्या आप जानते हैं?</h4>
              <p className="text-text-secondary m-0 text-sm">शुक्र (Venus) अपनी धुरी पर बहुत धीरे घूमता है, इतना धीरे कि उसका एक दिन (अपनी ही धुरी का चक्कर) उसके एक साल (सूर्य का चक्कर) से भी लंबा होता है!</p>
            </div>
          </article>
        </section>

        {/* 4. RELATED TOOLS */}
        <section className="bg-bg-surface border-y border-bg-border py-16 mb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-10">
              <div>
                <h2 className="text-3xl font-bold text-text-primary mb-1">Explore More Space Tools</h2>
                <p className="text-text-secondary text-sm">Continue your interactive journey across the cosmos.</p>
              </div>
              <Link href="/tools" className="mt-4 md:mt-0 text-accent font-bold hover:underline underline-offset-4 tracking-wide uppercase text-xs">
                View All Tools &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { title: "Interplanetary Weight Calculator", desc: "Check how gravity shifts your weight.", img: "/tools/tool-hero-bac1.webp", link: "/tools/weight-calculator" },
                { title: "Escape Velocity Tool", desc: "Calculate the speed needed to leave any planet.", img: "/tools/tool2.webp", link: "/tools/escape-velocity" },
                { title: "Orbit Simulator", desc: "Play with gravity by simulating orbital physics.", img: "/tools/tool3.png", link: "/tools/orbit-simulator" }
              ].map((tool, i) => (
                <Link href={tool.link} key={i} className="group block">
                  <div className="bg-bg-elevated border border-bg-border rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="h-40 overflow-hidden relative">
                       <img src={tool.img} alt={tool.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                       <div className="absolute inset-0 bg-gradient-to-t from-bg-elevated to-transparent" />
                    </div>
                    <div className="p-5 pt-1">
                      <h3 className="text-lg font-bold text-text-primary mb-1 group-hover:text-accent transition-colors">{tool.title}</h3>
                      <p className="text-text-secondary text-xs">{tool.desc}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 5. LATEST ARTICLES */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-20">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold text-text-primary mb-1">Latest Space Articles</h2>
              <p className="text-text-secondary text-sm">Dive deeper into the mysteries of the universe.</p>
            </div>
            <Link href="/blog" className="mt-4 md:mt-0 text-accent font-bold hover:underline underline-offset-4 tracking-wide uppercase text-xs">
              View All Articles &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(posts.length > 0 ? posts : Array(3).fill(null)).map((post, i) => {
              const isSkeleton = !post;
              const title = isSkeleton ? "Loading Space Article..." : (lang === "en" ? post.titleEnglish || post.titleHindi : post.titleHindi || post.titleEnglish);
              const desc = isSkeleton ? "Loading description..." : (lang === "en" ? post.metaDescriptionEn : post.metaDescriptionHi);
              const date = isSkeleton ? "..." : new Date(post.publishedAt || Date.now()).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
              const category = isSkeleton ? "Loading" : (post.tags?.[0] || "Deep Space");
              const imageUrl = isSkeleton ? `/universe/planets/earth/earth1.png` : (post.mainImage?.asset?.url || "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=600");
              const link = isSkeleton ? "#" : `/blog/${post.slug?.current || "#"}`;

              return (
                <Link href={link} key={post?._id || i} className="group block">
                  <div className="bg-bg-surface border border-bg-border rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="h-48 overflow-hidden relative">
                      <img src={imageUrl} alt={title} className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ${isSkeleton ? "blur-md grayscale" : ""}`} />
                      <div className="absolute top-4 left-4">
                        <span className="bg-bg-primary/80 backdrop-blur-md border border-bg-border text-text-primary text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                          {category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <span className="text-text-muted text-xs font-semibold mb-2 block tracking-wider uppercase min-h-[16px]">{date}</span>
                      <h3 className="text-xl font-bold text-text-primary mb-3 leading-tight group-hover:text-accent transition-colors line-clamp-2 min-h-[56px]">{title}</h3>
                      <p className="text-text-secondary text-sm leading-relaxed line-clamp-3">{desc || (isSkeleton ? "" : "Explore the fascinating physics behind the universe's most enigmatic objects.")}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* 6. SUBSCRIBE CTA BANNER */}
        <section className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="relative overflow-hidden flex flex-col items-center justify-center text-center p-8 md:p-14 bg-bg-elevated border border-bg-border rounded-[2.5rem] group">
            {/* Dark Overlays */}
            <div className="absolute inset-0 bg-black/60 z-10" />
            
            <img 
              src="/tools/tool2.webp" 
              alt="Space Subscribe Background" 
              className="absolute inset-0 w-full h-full object-cover grayscale-[30%] opacity-80 transition-all duration-700 group-hover:scale-105"
            />
            
            <div className="relative z-20 max-w-2xl px-4">
              <h2 className="text-3xl md:text-4xl font-black mb-4 leading-tight" style={{ color: "white" }}>
                Unravel The Universe In Your Inbox
              </h2>
              <p className="text-base text-white/70 mb-8 max-w-lg mx-auto">
                Get astrophysical deep-dives, tool updates, and spectacular phenomena delivered.
              </p>
              
              <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="flex-1 px-5 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder:text-white/40 outline-none focus:border-accent transition-all text-sm"
                />
                <button className="bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-accent hover:text-white transition-all text-sm uppercase tracking-wider">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
