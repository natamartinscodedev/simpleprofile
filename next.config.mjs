// next.config.mjs
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const nextConfig = {
  webpack: (config, { isServer }) => {
    // Cria um alias para o módulo 'aws-s3-upload-ash'
    config.resolve.alias['aws-s3-upload-ash'] = require.resolve('aws-s3-upload-ash');
    return config;
  },
  images: {
    domains: ['firebasestorage.googleapis.com'],
    remotePatterns: [
      { protocol: 'http', hostname: '*.ico' },
      { protocol: 'https', hostname: '*.com' },
      { protocol: 'https', hostname: '*.svg' },
      { protocol: 'https', hostname: '*.png' },
    ],
    minimumCacheTTL: 1500000,
  },
  turbo: {
    swcMinify: true,
    optimizeFonts: true,
  },
  async rewrites() {
    return [
      {
        source: '/linkPersonalize',
        destination: '/Components/CreateSingUp/Index', // ou 'pages/login'
      },
    ];
  },
};

export default nextConfig;
