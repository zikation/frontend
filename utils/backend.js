const backendURL = 'http://localhost:2500'
const apiPrefix = 'api'
const tourPrefix = 'tour'
const trekPrefix = 'trek'
const orderPrefix = 'order/v1'
const searchPrefix = 'search'
const allPrefix = 'all'
const categoryPrefix = 'category'
const staticAllPrefix = `${backendURL}/${allPrefix}`

// The URLs have to be of the following format
// For any react/Next.js runtime code, backend URLs should begin with /api/...
// For any build time code (e.g., getStaticProps/getStaticPaths/sitemap), it should be
//    of the format localhost:port/... (note, there is no /api)
const backend = {
    staticAllPrefix: `${staticAllPrefix}`,
    staticCategoryPrefix: `${backendURL}/${categoryPrefix}`,
    staticTourPrefix: `${backendURL}/${tourPrefix}`,
    staticTrekPrefix: `${backendURL}/${trekPrefix}`,
    staticSitemapURL: `${backendURL}/internal/sitemap.xml`,
    staticAllSlugs: `${staticAllPrefix}/slugs`,
    staticAllCategories: `${staticAllPrefix}/location-sublocation-category`,
    staticAllLocations: `${staticAllPrefix}/locations`,
    staticAllSublocations: `${staticAllPrefix}/sublocations`,
    staticMenuURL: `${staticAllPrefix}/menuitems`,

    runtimeTourURL: `/${apiPrefix}/${tourPrefix}`,
    runtimeTrekURL: `/${apiPrefix}/${trekPrefix}`,
    runtimeOrderURL: `/${apiPrefix}/${orderPrefix}/new`,
    runtimeTagsURL: `/${apiPrefix}/all/tags`,
    runtimeSearchURL: `/${apiPrefix}/all/${searchPrefix}`,
}

export default backend
