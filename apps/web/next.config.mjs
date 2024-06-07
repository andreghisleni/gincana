// import { PrismaPlugin } from '@prisma/nextjs-monorepo-workaround-plugin'

/** @type {import('next').NextConfig} */
const nextConfig = {

  logging: {
    fetches: {
      fullUrl: true,
    },
  },

  experimental: {
    serverComponentsExternalPackages: ['pg'],
  },

  typescript: {
    ignoreBuildErrors: true,
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    remotePatterns: [
      { hostname: 'lh3.googleusercontent.com' },
      { hostname: 'github.com' },
      { hostname: 'gincana.a72a6f120019167e519d34db3c3c75b5.r2.cloudflarestorage.com' },
    ],
  },

  /**
   * @param {import('webpack').Configuration} config
   */
  webpack: (config, { isServer }) => {
    /**
     * Suppress warning about not found modules
     */
    config.resolve.fallback = {
      'aws-crt': false,
      encoding: false,
      '@aws-sdk/signature-v4-crt': false,
      bufferutil: false,
      'utf-8-validate': false,
      bcrypt: false,
    }

    // if (isServer) {
    //   config.plugins = [...config.plugins, new PrismaPlugin({
    //     from: 'teste'
    //   })]
    // }

    return config
  },
}

export default nextConfig
