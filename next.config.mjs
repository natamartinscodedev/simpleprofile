// next.config.mjs
import { createRequire } from 'module'
const require = createRequire(import.meta.url)

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'simpleprofileoffice.s3.amazonaws.com',
        port: '', // vazio usualmente
        pathname: '/**' // permite qualquer arquivo no bucket
      }
    ]
  },
  // webpack: (config, { isServer }) => {
  //   // Cria um alias para o módulo 'aws-s3-upload-ash'
  //   config.resolve.alias['aws-s3-upload-ash'] = require.resolve('aws-s3-upload-ash');
  //   return config;
  // },
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
  }
}

export default nextConfig
