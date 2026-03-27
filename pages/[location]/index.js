import ListPage from '@/components/common/ListPage/ListPage'
import backend from '@/utils/backend'

export const getStaticPaths = async () => {
    let paths = []
    try {
        const res = await fetch(`${backend.staticAllLocations}`)
        const data = await res.json()

        paths = data.result.map(loc => ({
            params: { location: loc.location }
        }))
    } catch (error) {
        console.error(`Error getting all locations - using empty paths: ${error}`)
    }

    return { paths, fallback: "blocking" }
}

export const getStaticProps = async ({ params }) => {
    const { location } = params
    const bkgd = '/tourhub/images/' + location + '.webp'
    try {
        const res = await fetch(`${backend.staticAllPrefix}/${location}`)
        const data = await res.json()
        if (!data || !Array.isArray(data.result) || data.result.length === 0) 
            return {notFound: true}

        return {
            props: { location, categories: data.result, background: bkgd },
            revalidate: 60 * 60
        }
    } catch (error) {
        console.log(`Error while generating page for ${location}: ${error}`)
        return {
            props: { location, categories: [] }, 
            revalidate: 60 * 60
        }
    }
}

const LocationListingPage = ({ categories, location, locationDesc }) => <ListPage location={location} categories={categories} hub={locationDesc} />

export default LocationListingPage