const backendURL = 'http://localhost:2500'
const apiPrefix = 'api'
const tourPrefix = 'tour'
const orderPrefix = 'v1/order'
const searchPrefix = 'search'

const backend = {
    backendURL,
    apiPrefix,
    tourPrefix,
    tourUrl: `${backendURL}/${tourPrefix}`,
    searchTourURL: `${backendURL}/${tourPrefix}/${searchPrefix}`,
    orderURL: `${backendURL}/${orderPrefix}/new`,
    menuURL: `${backendURL}/${tourPrefix}/menuitems`,
    tagsURL: `${backendURL}/${tourPrefix}/tags`,
    sitemaptoursURL: `${backendURL}/${tourPrefix}/sitemap`,
}

export default backend
