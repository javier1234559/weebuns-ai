/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config')

const isProd = process.env.NODE_ENV === 'production'

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig = {
  i18n,
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  images: {
    domains: ['www.launchuicomponents.com'],
  },
  experimental: {
    serverActions: true,
  },
  webpack: (config) => {
    config.externals = [...(config.externals || []), 'undici'];
    return config;
  },
}

// @ts-ignore
module.exports = isProd ? nextConfig : withBundleAnalyzer(nextConfig)
