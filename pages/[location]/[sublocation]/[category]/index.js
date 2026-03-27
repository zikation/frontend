import backend from '@/utils/backend'
import RedirectOnError from '@/components/common/Error/RedirectOnError'
import { handleInvalidLocationPair, isValidLocationPair } from '@/utils/PlacesMenuDetails'
import ListPage from '@/components/common/ListPage/ListPage'

export default function CategoryListingPage({ items, location, sublocation, category, categoryHub }) {
    var message = `We do not have ${category} at ${location} / ${sublocation}`
    if (category !== 'tours' && category !== 'treks') 
        return <RedirectOnError message={message} />

    var categories = [{type: category, items}]
    return <ListPage location={location} sublocation={sublocation} categories={categories} hub={categoryHub} isCategoryList={true} />
}  

export async function getStaticPaths() {
    let paths = []
    const errorText = 'Could not get paths for categories'
    
    try {
        const res = await fetch(`${backend.staticAllCategories}`)
        const {data} = await res.json()
        if (!res.ok || !data) {
            console.error('ERROR: ' + errorText)
            console.error(data?.msg)
            return { paths: [], fallback: 'blocking' }
        }
        
        paths = data.map(item => ({
            params: {
                location: item.location,
                sublocation: item.sublocation,
                category: item.category
            }
        }))
    } catch (error) {
        console.error(`${errorText}: ${error}`)
    }
    return { paths, fallback: "blocking" }
}

export async function getStaticProps({ params }) {
    const { location, sublocation, category } = params
    const place = sublocation ? sublocation : location
    const errorText = 'Could not get ' + category + place ? ' for ' + place : '' 

    // Is this pair valid?
    if (!isValidLocationPair(location, sublocation)) {
        return handleInvalidLocationPair(location, sublocation, category)
    }

    try {
        const res = await fetch(`${backend.staticCategoryPrefix}/${location}/${sublocation}/${category}`)
        if (res.status === 404)
            return {notFound: true}

        if (!res.ok)
            return { props: {data: {err: res.status, msg: errorText }}}

        const data = await res.json()
        if (!data || !Array.isArray(data.items) || data.items.length === 0)
            return { notFound: true }
        return {props: {
                location: data.location,
                sublocation: data.sublocation,
                category: data.category,
                categoryHub: data.categoryHub,
                items: data.items,
                background: data.categoryHub.bkgd
            }, revalidate: 60}
    } catch (err) {
        console.error(`${errorText}: ${err}`)
        throw err
    }
}
