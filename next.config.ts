import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Standalone output for Docker / Cloud Run (copies only needed files)
  output: "standalone",

  // Allow Sanity CDN images if you ever switch to next/image
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "graph.facebook.com",
      },
    ],
  },
};

export default nextConfig;
