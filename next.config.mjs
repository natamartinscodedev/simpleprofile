// next.config.mjs
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const nextConfig = {
  // webpack: (config, { isServer }) => {
  //   // Cria um alias para o módulo 'aws-s3-upload-ash'
  //   config.resolve.alias['aws-s3-upload-ash'] = require.resolve('aws-s3-upload-ash');
  //   return config;
  // },
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
