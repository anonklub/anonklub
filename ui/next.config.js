/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  webpack: function (config, options) {
    if (!options.isServer) {
      config.resolve.fallback.fs = false
      config.resolve.fallback.readline = false
    }
    config.experiments = { asyncWebAssembly: true, layers: true, };
    return config
  },
}

module.exports = nextConfig
