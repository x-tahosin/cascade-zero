/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  basePath: '/cascade-zero',
  assetPrefix: '/cascade-zero/',
  trailingSlash: true,
};

export default nextConfig;
