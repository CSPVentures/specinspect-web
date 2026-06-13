/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'api.specinspect.com' }],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.specinspect.com/api/:path*',
      },
    ];
  },
};
export default nextConfig;
