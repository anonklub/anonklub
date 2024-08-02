import million from 'million/compiler'

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  webpack: (config, options) => {
    if (!options.isServer) {
      config.resolve.fallback.fs = false
      config.resolve.fallback.readline = false
    }
    config.experiments = { asyncWebAssembly: true, layers: true }

    return config
  },
}

const millionConfig = {
  auto: true,
}

export default million.next(nextConfig, millionConfig)
