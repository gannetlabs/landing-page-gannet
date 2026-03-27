/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  compress: true,
  experimental: {
    optimizeCss: true,
  },
};

export default nextConfig;
