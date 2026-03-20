"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui";

interface YouTubeVideosProps {
  lang: "en" | "hi";
  channelId: string;
}

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
}

const text = {
  en: {
    badge: "Latest from YouTube",
    title: "Our Recent Videos",
    subtitle: "Watch our latest space science explainers and deep dives",
    watchNow: "Watch Now",
    viewChannel: "Visit YouTube Channel",
    loading: "Loading videos...",
    error: "Unable to load videos right now",
  },
  hi: {
    badge: "YouTube से नवीनतम",
    title: "हमारे हालिया वीडियो",
    subtitle: "हमारे नवीनतम अंतरिक्ष विज्ञान एक्सप्लेनर और डीप डाइव देखें",
    watchNow: "अभी देखें",
    viewChannel: "YouTube चैनल पर जाएं",
    loading: "वीडियो लोड हो रहे हैं...",
    error: "अभी वीडियो लोड करने में असमर्थ",
  },
};

export default function YouTubeVideos({ lang, channelId }: YouTubeVideosProps) {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const t = text[lang];

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch(`/api/youtube?channelId=${channelId}`);
        if (!res.ok) throw new Error("API error");
        const data = await res.json();
        setVideos(data.videos || []);
        setLoading(false);
      } catch {
        setError(true);
        setLoading(false);
      }
    };

    fetchVideos();
  }, [channelId]);

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString(lang === "hi" ? "hi-IN" : "en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <section className="py-16 sm:py-24">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
            bg-red-500/10 border border-red-500/20 mb-5"
        >
          <svg className="w-3.5 h-3.5 text-red-500" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
          <span className="text-xs font-medium text-red-400 tracking-wide">
            {t.badge}
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-4"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          {t.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-text-secondary text-base sm:text-lg"
        >
          {t.subtitle}
        </motion.p>
      </div>

      {/* Videos grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden animate-pulse"
            >
              <div className="aspect-video bg-white/[0.04]" />
              <div className="p-4 space-y-2">
                <div className="h-4 bg-white/[0.06] rounded w-3/4" />
                <div className="h-3 bg-white/[0.04] rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : error || videos.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-text-muted">{t.error}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {videos.map((video, i) => (
            <motion.a
              key={video.id}
              href={`https://www.youtube.com/watch?v=${video.id}`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.08, duration: 0.45 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              className="
                group rounded-2xl overflow-hidden
                bg-[rgba(17,17,40,0.55)] backdrop-blur-xl
                border border-white/[0.07]
                hover:border-red-500/20
                transition-all duration-300
              "
            >
              {/* Thumbnail */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Play overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center shadow-[0_0_25px_rgba(239,68,68,0.4)]">
                    <svg className="w-6 h-6 text-white ml-1" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
                {/* Duration-like badge */}
                <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/70 text-[10px] text-white font-medium">
                  {t.watchNow}
                </div>
              </div>
              {/* Info */}
              <div className="p-4">
                <h3 className="text-sm font-medium text-text-primary line-clamp-2 group-hover:text-white transition-colors leading-snug">
                  {video.title}
                </h3>
                <p className="text-xs text-text-muted mt-2">
                  {formatDate(video.publishedAt)}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      )}

      {/* View channel CTA */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="text-center mt-10"
      >
        <a
          href={`https://www.youtube.com/channel/${channelId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="
            inline-flex items-center gap-2 px-6 py-3 rounded-xl
            text-sm font-semibold
            text-red-400 border border-red-500/30
            bg-red-500/[0.05]
            hover:bg-red-500/[0.1] hover:border-red-500/50
            shadow-[0_0_15px_rgba(239,68,68,0.1)]
            hover:shadow-[0_0_25px_rgba(239,68,68,0.2)]
            transition-all duration-300
          "
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
          {t.viewChannel}
        </a>
      </motion.div>
    </section>
  );
}
