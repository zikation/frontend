// next.config.mjs
import redirectsMap from './utils/Redirects.json' assert { type: 'json' }

const API_BASE = process.env.NODE_ENV === 'development'
    ? 'http://localhost:2500'
    : 'https://api.zikation.com'

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
        return tourRedirects
    },

    // ✅ 2️⃣ Rewrites (frontend → backend passthrough)
        async rewrites() {
            return [{
                source: '/sitemap.xml',
                destination: `${API_BASE}/internal/sitemap.xml`,
            }]
        }
}

export default nextConfig
