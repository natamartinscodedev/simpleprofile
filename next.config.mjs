/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  webpack: (config, { isServer }) => {
    config.resolve.alias['aws-s3-upload-ash'] =
      require.resolve('aws-s3-upload-ash')
    return config
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '*.ico'
      },
      {
        protocol: 'https',
        hostname: '*.com'
      },
      {
        protocol: 'https',
        hostname: '*.svg'
      },
      {
        protocol: 'https',
        hostname: '*.png'
      }
    ],
    minimumCacheTTL: 1500000
  },
  turbo: {
    swcMinify: true,
    optimizeFonts: true
  },
  async rewrites() {
    return [
      {
        source: '/linkPersonalize',
        destination: '/Components/CreateSingUp/Index' // ou 'pages/login'
      }
    ]
  },
}

export default withNextIntl(nextConfig)
