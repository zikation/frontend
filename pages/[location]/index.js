import backend from '@/utils/backend'
import TourListPage from '@/travel-components/TourListPage/TourListPage'
import { GetTours } from '@/utils/actions'
import RedirectOnError from '@/travel-components/Error/RedirectOnError'

/* For now, we list only tours */
export default function LocationListingPage({ tours, location, error }) {
    if (error)
        return <RedirectOnError />
    return <TourListPage tours={tours} location={location} />
}

export async function getStaticPaths() {
    let paths = []
    try {
        const res = await fetch(`${backend.fullTourURL}/all-locations`)
        const {locations} = await res.json()

        paths = locations.map(loc => ({
            params: { location: loc }
        }))
    } catch (error) {
        console.log("Error getting all locations - using empty paths", error)
    }

    return {
        paths,
        fallback: "blocking"
    }
}

export async function getStaticProps({ params }) {
    const { location } = params
    const url = backend.fullSearchTourURL + '/' + location.toLowerCase()
    try {
        var res = await fetch(`${backend.validateURL}?location=${location}`)
        if (res.status === 404)
            return {notFound: true}

        var tours = await GetTours(url, "Could not get the tours for " + location)
        return {
            props: {
            location,
            tours: tours.map(t=>({
                        price: t.price,
                        location: t.location,
                        sublocation: t.sublocation,
                        slug: t.slug,
                        price: t.price ?? null,
                        bkgd: t.bkgd,
                        title: t.title,
                        summary: t.summary
                    }))
            },
            revalidate: 60 * 60
        }
    } catch (error) {
        console.log("Error while generating ", location, error)
        return {
            props: {
                location, error: true, tours: []
            }, revalidate: 60 * 60
        }
    }
}
