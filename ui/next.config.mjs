import million from 'million/compiler'

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  // TODO: restrict to only discord bot server origin
  async headers() {
    return [
      {
        source: '/api/verify',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'POST, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'X-Requested-With, Content-Type, Accept',
          },
        ],
      },
    ]
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
