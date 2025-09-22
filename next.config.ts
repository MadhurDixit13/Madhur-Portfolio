import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Configure for GitHub Pages deployment
  assetPrefix: process.env.NODE_ENV === 'production' ? '/Madhur_Portfolio' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/Madhur_Portfolio' : '',
};

export default nextConfig;
