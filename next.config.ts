import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  turbopack: {},
  experimental: {
    turbopackFileSystemCacheForDev: false,
  },
}

export default nextConfig
