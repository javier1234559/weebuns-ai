/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cms.youpass.vn", "weebuns.blog", "images.pexels.com", "utfs.io"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
}

module.exports = nextConfig
