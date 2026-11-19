import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 90],
    deviceSizes: [640, 828, 1080, 1280, 1920, 2560, 3840],
  },
  experimental: { optimizePackageImports: ["@phosphor-icons/react"] },
  poweredByHeader: false,
};

export default nextConfig;
