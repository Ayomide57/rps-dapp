/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["ipfs.io"],
  },

  webpack: (config: { externals: string[]; }) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },

  remotePatterns: [
    {
      protocol: "https",
      hostname: "ipfs.io",
      pathname: "**",
    },
  ],
};

export default nextConfig;
