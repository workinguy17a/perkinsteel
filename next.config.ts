import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "admin.perkinssteel.com",
      },
    ],
  },
};

export default nextConfig;