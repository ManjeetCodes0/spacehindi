"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { CelestialBody } from "@/data/universe/planets";
import GlassPanel from "@/components/ui/GlassPanel";

interface PlanetMediaProps {
  body: CelestialBody;
  lang: "en" | "hi";
}

export default function PlanetMedia({ body, lang }: PlanetMediaProps) {
  const [activeTab, setActiveTab] = useState<"video" | "gallery">(
    body.videoId ? "video" : "gallery"
  );
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const hasVideo = !!body.videoId;
  const hasGallery = body.gallery && body.gallery.length > 0;

  if (!hasVideo && !hasGallery) return null;

  return (
    <section>
      <div className="flex items-center gap-4 mb-4">
        <h3
          className="text-xl font-bold text-text-primary"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          {lang === "en" ? "Media" : "मीडिया"}
        </h3>

        {/* Tabs */}
        {hasVideo && hasGallery && (
          <div className="flex gap-1 bg-white/[0.04] rounded-lg p-0.5">
            <button
              onClick={() => setActiveTab("video")}
              className={`px-3 py-1 text-xs rounded-md transition-all cursor-pointer ${
                activeTab === "video"
                  ? "bg-white/[0.1] text-text-primary"
                  : "text-text-muted hover:text-text-secondary"
              }`}
            >
              {lang === "en" ? "Video" : "वीडियो"}
            </button>
            <button
              onClick={() => setActiveTab("gallery")}
              className={`px-3 py-1 text-xs rounded-md transition-all cursor-pointer ${
                activeTab === "gallery"
                  ? "bg-white/[0.1] text-text-primary"
                  : "text-text-muted hover:text-text-secondary"
              }`}
            >
              {lang === "en" ? "Gallery" : "गैलरी"}
            </button>
          </div>
        )}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "video" && hasVideo && (
          <motion.div
            key="video"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <GlassPanel intensity="light" className="overflow-hidden">
              <div className="relative w-full aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${body.videoId}?rel=0`}
                  title={`${body.name[lang]} video`}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </GlassPanel>
          </motion.div>
        )}

        {activeTab === "gallery" && hasGallery && (
          <motion.div
            key="gallery"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {body.gallery!.map((src, i) => (
                <motion.button
                  key={i}
                  onClick={() => setSelectedImage(src)}
                  className="relative aspect-video rounded-xl overflow-hidden group cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <img
                    src={src}
                    alt={`${body.name[lang]} ${i + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.img
              src={selectedImage}
              alt={body.name[lang]}
              className="max-w-full max-h-full rounded-xl object-contain"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors cursor-pointer"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
