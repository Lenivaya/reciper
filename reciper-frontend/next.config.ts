import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */

  eslint: {
    ignoreDuringBuilds: true
  },

  images: {
    domains: ['localhost', '127.0.0.1', 'res.cloudinary.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*' // Allow images from all domains
      }
    ]
  }
}

export default nextConfig
