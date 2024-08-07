import million from 'million/compiler'

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  // https://github.com/chungwu/combat-lander/commit/a22a0d2b302b623696b3e95d85566d3a7f1f6e3b
  webpack: (config, { isServer }) => ({
    ...config,
    experiments: { asyncWebAssembly: true, layers: true },
  }),
}

const millionConfig = {
  auto: true,
}

export default million.next(nextConfig, millionConfig)
