/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
      return [
        {
          source: "/",
          destination: "/main",
          permanent: true,
        },
        
      ];
    },
    images: {
      domains: ['scontent.fvga9-1.fna.fbcdn.net'],
    },
    eslint: {
      // Warning: This allows production builds to successfully complete even if
      // your project has ESLint errors.
      ignoreDuringBuilds: true,
    },
  };

export default nextConfig;
