import withPWA from 'next-pwa';

const nextConfig = {
  experimental: {
    turbo: {
      enabled: true, // Assure que Turbopack est activé
    },
  },
};

export default withPWA(nextConfig);
