import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "**.supabase.co",
      },
      {
        protocol: "https",
        hostname: "www.ayana.best",
      },
      {
        protocol: "https",
        hostname: "media.licdn.com",
      },
      {
        // Catch-all for other trusted https image sources
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
