/** @type {import('next').NextConfig} */
const nextConfig = {
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
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
