/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'api.specinspect.com' }],
  },
};
export default nextConfig;
