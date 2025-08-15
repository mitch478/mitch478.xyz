/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Optimize for Cloudflare Pages
  experimental: {
    optimizeCss: true,
  },
  // Ensure consistent routing for CF Pages
  assetPrefix: '',
  // Disable server-side features for static export
  reactStrictMode: true,
}

module.exports = nextConfig 