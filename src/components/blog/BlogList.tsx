"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type { DeepDivePost } from "@/types/deep-dive";

const heroItems = [
  { img: "/universe/moons/earth/Moon-earth.png", color: "rgba(200, 200, 210, 0.5)" },
  { img: "/universe/planets/earth/earth1.png", color: "rgba(75, 156, 211, 0.6)" },
  { img: "/universe/planets/jupiter/jupiter1.png", color: "rgba(211, 156, 126, 0.6)" },
  { img: "/universe/planets/mars/mars1.png", color: "rgba(193, 68, 14, 0.6)" },
  { img: "/universe/planets/mercury/mercury1.png", color: "rgba(150, 150, 150, 0.5)" },
  { img: "/universe/planets/neptune/neptune1.png", color: "rgba(39, 70, 135, 0.6)" },
  { img: "/universe/planets/saturn/saturn1.png", color: "rgba(234, 214, 184, 0.5)" },
  { img: "/universe/planets/uranus/uranus1.png", color: "rgba(75, 112, 221, 0.6)" },
  { img: "/universe/planets/venus/venus1.png", color: "rgba(238, 187, 119, 0.6)" }
];

// Helper for formatting the date to match the "14 Feb" badge style
function formatDay(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", { day: "2-digit" });
}
function formatMonth(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", { month: "short" });
}

function PostCard({ post, index }: { post: DeepDivePost; index: number }) {
  const imageUrl = post.mainImage?.asset?.url || "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=600";
  const excerpt = (post.metaDescriptionHi || post.content || "Dive into the fascinating depths of the cosmos. Read our detailed explainers and stay informed on space science...").slice(0, 110) + "...";

  return (
    <Link href={`/blog/${post.slug?.current || "#"}`} className="group block">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        className="flex flex-col h-full bg-transparent"
      >
        <div className="relative h-[250px] overflow-hidden rounded-sm border border-bg-border/50 group-hover:border-accent/40 transition-colors">
          <img
            src={imageUrl}
            alt={post.titleEnglish || post.titleHindi || "Blog Post Image"}
            className="w-full h-full object-cover transition duration-700 opacity-90 group-hover:opacity-100 group-hover:scale-105"
          />
          {/* Date Badge - kept strictly black and white by design choice to match image mockup */}
          <div className="absolute bottom-4 left-4 bg-white text-black w-[50px] h-[50px] rounded-full flex flex-col items-center justify-center shadow-md pointer-events-none">
            <span className="font-extrabold text-[18px] leading-none tracking-tight">{formatDay(post.publishedAt || new Date().toISOString())}</span>
            <span className="text-[9px] uppercase font-bold tracking-widest">{formatMonth(post.publishedAt || new Date().toISOString())}</span>
          </div>
        </div>

        <div className="flex flex-1 flex-col pt-6 pb-2">
          <h3 className="mb-3 text-[18px] font-bold text-text-primary transition group-hover:text-accent leading-snug">
            {post.titleEnglish || post.titleHindi || "Space is Full Of Surprises"}
          </h3>
          <p className="mb-5 text-[13px] text-text-secondary font-normal leading-relaxed">
            {excerpt}
          </p>
          <div className="mt-auto text-[12px] text-text-primary font-bold transition-colors group-hover:text-accent uppercase tracking-wider relative inline-flex items-center">
            read more
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

export default function BlogList() {
  const [posts, setPosts] = useState<DeepDivePost[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroItems.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("/api/deep-dive");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) setPosts(data);
        }
      } catch {
        // Silent fail
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  // For visual consistency with the design when less data is present, mock data if needed
  const placeholderPosts = Array(6).fill(null).map((_, i) => ({
    _id: `mock-${i}`,
    titleEnglish: i === 0 ? "Space is Full Of Surprises" : i === 1 ? "Space is What Matters The Most" : i === 2 ? "Let's Measure The Space" : i === 3 ? "Decoding Black Holes" : i === 4 ? "Earth is Just The Beginning" : "The Stars Are Calling Us",
    titleHindi: "",
    publishedAt: new Date(new Date().setDate(new Date().getDate() - i*2)).toISOString(),
    slug: { current: "#" },
    mainImage: {
      asset: {
        url: [
          "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=600",
          "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600",
          "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?q=80&w=600",
          "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?q=80&w=600",
          "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=600",
          "https://images.unsplash.com/photo-1543722530-d2c3201371e7?q=80&w=600"
        ][i]
      }
    }
  } as unknown as DeepDivePost));

  const displayPosts = loading ? [] : (posts.length >= 3 ? posts : placeholderPosts);

  return (
    <div className="bg-transparent min-h-screen text-text-primary w-full transition-colors duration-300">
      {/* Top Hero Section */}
      <section className="relative px-6 pt-4 pb-8 lg:pt-8 lg:pb-10 max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-8">
        <div className="space-y-6 lg:pl-10 z-10 text-center lg:text-left">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[64px] md:text-[80px] font-thin tracking-[0.2em] text-text-primary leading-none mb-6"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Blog
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-text-secondary max-w-[400px] mx-auto lg:mx-0 text-[15px] leading-snug"
          >
            Explore our deep dives into the cosmos, planetary science, and the most captivating celestial events across the universe.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-[12px] text-text-muted font-medium tracking-wide mt-4"
          >
            Home &nbsp;&nbsp;&gt;&nbsp;&nbsp; <span className="text-text-secondary">Blog</span>
          </motion.div>
        </div>
        
        {/* Rotating Moon Area */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative flex justify-center items-center lg:justify-end lg:pr-10"
        >
          <div className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px]">
            {/* Outline rings */}
            <div className="absolute inset-[15px] rounded-full border border-bg-border pointer-events-none transition-colors duration-300" style={{ borderStyle: "dashed" }} />
            <div className="absolute inset-[10%] rounded-full border border-bg-border opacity-70 pointer-events-none transition-colors duration-300" />
            <div className="absolute inset-[2%] rounded-full border border-bg-border opacity-40 animate-[spin_100s_linear_infinite] pointer-events-none transition-colors duration-300" />
            
            {/* The Planet/Moon Loop */}
            <div className="absolute inset-[10%] w-[80%] h-[80%] rounded-full">
              <AnimatePresence mode="popLayout">
                <motion.img 
                  key={currentImageIndex}
                  src={heroItems[currentImageIndex].img} 
                  alt="Celestial Body" 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full rounded-full object-cover grayscale-[10%] contrast-125 pointer-events-none"
                  style={{ 
                    filter: `drop-shadow(0 0 25px ${heroItems[currentImageIndex].color})`,
                    boxShadow: `inset -20px -20px 40px rgba(0,0,0,0.6)`
                  }}
                />
              </AnimatePresence>
            </div>

            {/* Orbiting Statistics Labels */}
            <div className="absolute top-[8%] left-1/2 -translate-x-1/2 text-[11px] font-medium text-text-muted whitespace-nowrap bg-bg-primary px-2 tracking-wider transition-colors duration-300 shadow-sm border border-bg-border rounded-sm">
              27 Day
            </div>
            <div className="absolute top-[45%] right-[-20px] -translate-y-1/2 text-[11px] font-medium text-text-muted whitespace-nowrap bg-bg-primary px-2 tracking-wider transition-colors duration-300 shadow-sm border border-bg-border rounded-sm">
              3474.8 km
            </div>
            <div className="absolute bottom-[18%] left-[0%] text-[11px] font-medium text-text-muted whitespace-nowrap bg-bg-primary px-2 tracking-wider transition-colors duration-300 shadow-sm border border-bg-border rounded-sm">
              16.7 km/s
            </div>
          </div>
        </motion.div>
      </section>

      {/* Blog Section Header */}
      <section className="text-center px-6 max-w-3xl mx-auto mb-10 pt-2">
        <h4 className="text-text-muted text-[13px] font-semibold italic mb-2 transition-colors duration-300" style={{ fontFamily: "Georgia, serif" }}>Our Blog</h4>
        <h2 className="text-3xl md:text-[40px] font-bold mb-4 tracking-wide text-text-primary transition-colors duration-300">News & Blog</h2>
        <p className="text-text-secondary text-[15px] leading-relaxed max-w-[600px] mx-auto transition-colors duration-300">
          Discover hand-curated editorial pieces, deep dives into mission updates, and expert explanations of modern astrophysics.
        </p>
      </section>

      {/* Grid of Posts */}
      <section className="max-w-[1200px] mx-auto px-6 mb-32">
        {loading ? (
          <div className="text-center py-20 flex justify-center">
            <div className="w-8 h-8 rounded-full border-2 border-bg-border border-t-accent animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-[70px]">
            {displayPosts.map((post, i) => (
              <PostCard key={post._id || i} post={post} index={i} />
            ))}
          </div>
        )}
      </section>

      {/* Bottom CTA Banner */}
      <section className="max-w-[1240px] mx-auto px-6 mb-32">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden h-[300px] md:h-[400px] flex flex-col items-center justify-center text-center p-6 bg-bg-elevated border border-bg-border rounded-xl group"
        >
          {/* Keep banner dark-themed even in light mode for readability against space images */}
          <div className="absolute inset-0 bg-black/60 z-10 transition-colors duration-300" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
          
          <img 
            src="https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2000" 
            alt="Space Background" 
            className="absolute inset-0 w-full h-full object-cover scale-105 transition-all duration-700 opacity-100 group-hover:scale-110"
          />
          
          <div className="relative z-20 max-w-[700px] px-4">
            <h2 className="text-3xl md:text-[42px] font-bold tracking-wide mb-6" style={{ color: "white" }}>
              Let's Explore With Us
            </h2>
            <p className="text-[14px] md:text-[15px] leading-relaxed mb-10 max-w-[600px] mx-auto" style={{ color: "#e2e2e2" }}>
              Ready to learn more about the universe? Join our newsletter and get insightful guides delivered straight to your inbox.
            </p>
            <button className="bg-white text-black px-10 py-[14px] rounded-full font-bold text-[13px] hover:scale-105 transition-all duration-300 shadow-xl uppercase tracking-wider">
              Join Us Now
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

