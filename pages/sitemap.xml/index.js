import backend from '@/utils/backend'

export async function getServerSideProps({ res }) {
    const response = await fetch(`${backend.staticSitemapURL}`)
    const xml = await response.text()

    res.setHeader("Content-Type", "text/xml; charset=utf-8")
    res.setHeader("X-Content-Type-Options", "nosniff")
    res.setHeader("Cache-Control", "public, max-age=3600")
    res.write(xml)
    res.end()
  
    return { props: {} }
}
  
export default function Sitemap() {
    return null
}