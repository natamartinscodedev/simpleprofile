import createNextIntlPlugin from 'next-intl/plugin'
const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbo: {
    swcMinify: true,
    optimizeFonts: true,
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
    async rewrites() {
      return [
        {
          source: '/linkPersonalize',
          destination: '/Components/CreateSingUp/Index' // ou 'pages/login'
        }
      ]
    },
    // typescript: {
    //   ignoreBuildErrors: true
    // },
    env: {
      // auth login and create account user
      GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
      GITHUB_ID: process.env.GITHUB_ID,
      GITHUB_SECRET: process.env.GITHUB_SECRET

      // NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      // NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN:
      //   process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      // NEXT_PUBLIC_FIREBASE_PROJECT_ID:
      //   process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      // NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET:
      //   process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      // NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID:
      //   process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      // NEXT_PUBLIC_FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
    }
  }
}

export default withNextIntl(nextConfig)
