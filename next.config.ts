import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // outputFileTracingRoot: path.resolve(__dirname, '../../'),  // Uncomment and add 'import path from "path"' if needed
  /* config options here */
  allowedDevOrigins: ['*.dev.coze.site'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
        pathname: '/**',
      },
    ],
     unoptimized: true
  },
  // 适配 github pages 二级路径 /xingnang/
  basePath: '/xingnang',
  // 静态导出，禁用服务端渲染
  output: 'export',
  // 静态资源路径
  assetPrefix: '/xingnang/'
};

export default nextConfig;
