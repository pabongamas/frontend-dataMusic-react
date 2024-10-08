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
  };

export default nextConfig;
