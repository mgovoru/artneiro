import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  /* config options here */
  images: {
    loader: 'custom',
    imageSizes: [320, 1280],
    deviceSizes: [320, 1280],
  },
  output: "export",
  distDir: "build",
  transpilePackages: ['next-image-export-optimizer'],
  env: {
    nextImageExportOptimizer_imageFolderPath: 'public/assets',
    nextImageExportOptimizer_exportFolderPath: 'out',
    nextImageExportOptimizer_quality: '75',
    nextImageExportOptimizer_storePicturesInWEBP: 'true',
    nextImageExportOptimizer_generateAndUseBlurImages: 'true',
  },
};

export default nextConfig;
