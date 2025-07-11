/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable source maps for better debugging
  productionBrowserSourceMaps: true,
  reactStrictMode: true,
  swcMinify: true,
  // App directory is enabled by default in Next.js 14
  webpack: (config, { dev, isServer }) => {
    // Handle node modules polyfills for Solana
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      crypto: require.resolve("crypto-browserify"),
      stream: require.resolve("stream-browserify"),
      url: require.resolve("url"),
      zlib: require.resolve("browserify-zlib"),
      http: require.resolve("stream-http"),
      https: require.resolve("https-browserify"),
      assert: require.resolve("assert"),
      os: require.resolve("os-browserify"),
      path: require.resolve("path-browserify"),
    };

    // Handle ESM modules
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
      topLevelAwait: true,
    };

    return config;
  },
  async rewrites() {
    return [
      {
        source: "/api/backend/:path*",
        destination: "http://localhost:8000/api/v1/:path*",
      },
    ];
  },
  env: {
    SOLANA_NETWORK: process.env.SOLANA_NETWORK || "devnet",
    BACKEND_URL: process.env.BACKEND_URL || "http://localhost:8000",
  },
};

module.exports = nextConfig;
