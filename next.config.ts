import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https' as const,
        hostname: '**.public.blob.vercel-storage.com',
      },
      {
        protocol: 'https' as const,
        hostname: 'vercel-blob.com',
      },
    ],
  },
};

module.exports = withNextIntl(nextConfig);
