import withPWA from 'next-pwa';

const nextConfig = {
  experimental: {
    turbo: {
      enabled: true,
    },
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

module.exports = withPWA(nextConfig);