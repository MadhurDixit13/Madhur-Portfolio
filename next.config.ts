import type { NextConfig } from "next";

const isGitHubActions = process.env.GITHUB_ACTIONS === 'true';

const nextConfig: NextConfig = {
  // Static export only for GitHub Pages; Vercel handles Next.js natively
  ...(isGitHubActions && { output: 'export' }),
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  basePath: isGitHubActions ? '/Madhur_Portfolio' : '',
  assetPrefix: isGitHubActions ? '/Madhur_Portfolio' : '',
};

export default nextConfig;
