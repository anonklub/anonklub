import million from 'million/compiler'

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  // TODO: instead on soft linking files with a script and Dockerfile, do like https://github.com/chungwu/combat-lander/commit/a22a0d2b302b623696b3e95d85566d3a7f1f6e3b
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
