import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-346443e037884128baef7c2a9dc3e366.r2.dev",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
