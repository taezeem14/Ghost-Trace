import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "urlscan.io",
      },
    ],
  },
  experimental: {
    serverComponentsExternalPackages: ["whois-json", "ssl-checker", "exiftool-vendored"],
  },
};

export default nextConfig;
