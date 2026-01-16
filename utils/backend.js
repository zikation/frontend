const backendURL = 'http://localhost:2500'
const apiPrefix = 'api'
const tourPrefix = 'tour'
const orderPrefix = 'v1/order'
const searchPrefix = 'search'

// The URLs have to be of the following format
// For any react/Next.js runtime code, backend URLs should begin with /api/...
// For any build time code (e.g., getStaticProps/getStaticPaths/sitemap), it should be
//    of the format localhost:port/... (note, there is no /api)
const backend = {
    backendURL,
    apiPrefix,
    tourPrefix,
    tourUrl: `/${apiPrefix}/${tourPrefix}`,
    fullTourURL: `${backendURL}/${tourPrefix}`,
    searchTourURL: `/${apiPrefix}/${tourPrefix}/${searchPrefix}`,
    fullSearchTourURL: `${backendURL}/${tourPrefix}/${searchPrefix}`,
    orderURL: `/${apiPrefix}/${orderPrefix}/new`,
    menuURL: `/${apiPrefix}/${tourPrefix}/menuitems`,
    tagsURL: `/${apiPrefix}/${tourPrefix}/tags`,
    sitemaptoursURL: `${backendURL}/internal/sitemap.xml`,
    validateURL: `${backendURL}/${tourPrefix}/validate-tour`
}

export default backend
