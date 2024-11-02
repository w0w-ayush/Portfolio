/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  experimental: {
    serverComponentsExternalPackages: ["cheerio"],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.resolve.alias.undici = "node-fetch";
    }
    return config;
  },
};

module.exports = nextConfig;
