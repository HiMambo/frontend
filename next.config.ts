import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gjxwdbcptqkcxmdkosph.supabase.co",
        pathname: "/storage/v1/object/public/images-experiences/**",
      },
    ],
  },
};

export default nextConfig;