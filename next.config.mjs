/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint:{
        ignoreDuringBuilds: true,
    },
    reactStrictMode: true,

    webpack: (config) =>{
        config.resolve.alias.canvas = false;
        return config;
    },

    experimental: {
        serverActions: {
            bodySizeLimit: '2mb', // Set the body size limit to 2 MB
          },
        },
}



export default nextConfig;
