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

    config.module.rules.push({
      test: /\.wasm$/,
      type: "javascript/auto",
      use: {
        loader: 'wasm-loader',
      },
    });
    
    return config
  },
}

module.exports = nextConfig
