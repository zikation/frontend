// next.config.mjs
import redirectsMap from './utils/Redirects.json' assert { type: 'json' }

const API_BASE =
  typeof window === "undefined"
    ? "http://127.0.0.1:2500"   // server (Next.js, sitemap, SSG)
    : "";                     // browser (goes via Nginx /api)

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,

    // ✅ 1️⃣ Redirects (old → new URLs)
    async redirects() {
        const tourRedirects = redirectsMap.filter(({ old }) => old.startsWith('/tour-package'))
            .map(({ old, new: dest }) => ({
                source: old,
                destination: dest,
                permanent: true, // 301
            }))

        const extraRedirects = [
            {
                source: '/awesome-india-tours',
                destination: '/india',
                permanent: true,
            }
        ]
        return [...tourRedirects, ...extraRedirects]
    },

    async rewrites() {
        return [{
            source: '/api/:path*',
            destination: 'http://localhost:2500/:path*',
        }]
    }
}

export default nextConfig
