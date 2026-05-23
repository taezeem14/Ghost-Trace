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
};

export default nextConfig;
