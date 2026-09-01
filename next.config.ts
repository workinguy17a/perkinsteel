import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "admin.perkinssteel.com",
      },
    ],
  },
};

export default nextConfig;