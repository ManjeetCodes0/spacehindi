"use client";

import { useState } from "react";
import { Navbar, Space3DHero, Footer } from "@/components/layout";
import {
  SpaceNumbers,
  PlanetGallery,
  ToolsShowcase,
  SpaceQuote,
  YouTubeVideos,
  FeaturedBlog,
  UpcomingEvents,
  NewsletterCTA,
} from "@/components/home";

// Replace with your actual YouTube channel ID
const YOUTUBE_CHANNEL_ID = "UC-RlDqNNv7hCl2cEgi8ux8A";

export default function Home() {
  const [lang, setLang] = useState<"en" | "hi">("en");

  return (
    <>
      <Navbar lang={lang} onToggleLang={() => setLang(lang === "en" ? "hi" : "en")} />
      <main className="bg-space-black">
        <Space3DHero lang={lang} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 1. Cosmic numbers counter */}
          <SpaceNumbers lang={lang} />

          {/* 2. Interactive planet gallery */}
          <PlanetGallery lang={lang} />

          {/* 3. Inspirational space quote */}
          <SpaceQuote lang={lang} />

          {/* 4. Tools showcase */}
          <ToolsShowcase lang={lang} />

          {/* 5. YouTube latest videos */}
          <YouTubeVideos lang={lang} channelId={YOUTUBE_CHANNEL_ID} />

          {/* 6. Featured blog posts */}
          <FeaturedBlog lang={lang} />

          {/* 7. Upcoming space events */}
          <UpcomingEvents lang={lang} />

          {/* 8. Newsletter CTA */}
          <NewsletterCTA lang={lang} />
        </div>
      </main>
      <Footer lang={lang} />
    </>
  );
}
