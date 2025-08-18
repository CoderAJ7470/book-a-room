/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'nyc.cloud.appwrite.io',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;

