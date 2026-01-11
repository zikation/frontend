import backend from '@/utils/backend'
import TourListPage from '@/travel-components/TourListPage/TourListPage'
import { GetTours } from '@/utils/actions'

/* For now, we list only tours */
export default function LocationListingPage({ tours, location }) {
    return <TourListPage tours={tours} location={location} />
}

export async function getStaticPaths() {
    const res = await fetch(`${backend.tourUrl}/all-locations`)
    const {locations} = await res.json()

    const paths = locations.map(loc => ({
        params: { location: loc }
    }))

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    const { location } = params
    const url = backend.searchTourURL + '/' + location.toLowerCase()
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
        revalidate: 60 * 60   // refresh once per hour
    }
}
