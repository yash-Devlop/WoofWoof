/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    nodeMiddleware: true, // ✅ enable Node.js middleware runtime support
  },
  reactStrictMode: true,
};

export default nextConfig;
