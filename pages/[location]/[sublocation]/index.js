import backend from '@/utils/backend'
import { isValidLocationPair, handleInvalidLocationPair } from '@/utils/PlacesMenuDetails'
import ListPage from '@/components/common/ListPage/ListPage'

export async function getStaticPaths() {
    let paths = []

    try {
        const res = await fetch(`${backend.staticAllSublocations}`)
        const data = await res.json()
        if (!data || !data.result || data.result.length === 0) {
            return { notFound: true }
        }

        paths = data.result.map(({ location, sublocation }) => ({
            params: {location, sublocation}
        }))
    } catch (error) {
        console.log(`Error getting all sublocations - using empty paths: ${error}`)
    }
    return { paths, fallback: "blocking" }
}

export async function getStaticProps({ params }) {
    const { location, sublocation } = params
    const bkgd = '/tourhub/images/' + sublocation + '.webp'
    
    // Is this pair valid?
    if (!isValidLocationPair(location, sublocation)) {
        return handleInvalidLocationPair(location, sublocation)
    }

    const url = `${backend.staticAllPrefix}/${location}/${sublocation}`
    const errorText = 'Could not get details for this sublocation'

    try {
        var res = await fetch(url)
        var data = await res.json()

        if (!res.ok)
            return { props: {data: {err: res.status, msg: errorText }}}

        return {
            props: {
                location,
                sublocation,
                categories: data.result,
                background: bkgd
                // subLocationDesc: data.subLocationDesc // TODO: How to do this?
            },
            revalidate: 60 * 60
        }
    } catch (error) {
        console.log(`Error while generating page for ${location} / ${sublocation}: ${error}`)
        return {
            props: { location, sublocation, categories: [] }, 
            revalidate: 60 * 60
        }
    }
}

const SublocationListingPage = ({ location, sublocation, categories, subLocationDesc }) => 
    <ListPage location={location} sublocation={sublocation} categories={categories} hub={subLocationDesc} isCategoryList={false} />

export default SublocationListingPage
