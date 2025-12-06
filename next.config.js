/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['us-west-2.graphassets.com', 'i.ytimg.com', 'img.youtube.com'],
  },
}

module.exports = nextConfig
// teste123ds