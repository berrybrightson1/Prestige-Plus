const { hostname } = require('os');

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.supabase.co',
            },
            {
                protocol: 'https',
                hostname: 'flagcdn.com',
            },
        ],
    },
    eslint: {
        ignoreDuringBuilds: true, // Temporarily ignore ESLint during builds
    },
    typescript: {
        ignoreBuildErrors: false,
    },
}

module.exports = nextConfig
