/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['us-west-2.graphassets.com'],
  },
}

module.exports = nextConfig
