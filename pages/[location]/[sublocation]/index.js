import backend from '@/utils/backend'
import TourListPage from '@/travel-components/TourListPage/TourListPage'
import { GetTours } from '@/utils/actions'
import { isValidLocationPair, findRealLocation } from '@/utils/PlacesMenuDetails'
import RedirectOnError from '@/travel-components/Error/RedirectOnError'

/* For now, we list only tours */
export default function SublocationListingPage({ tours, location, sublocation, error }) {
    if (error)
        return <RedirectOnError />
        
    return <TourListPage tours={tours} location={location} sublocation={sublocation} />
}

export async function getStaticPaths() {
    let paths = []

    try {
        const res = await fetch(`${backend.tourUrl}/all-sublocations`)
        const {data} = await res.json()
        if (!data) return

        for (const loc of data) {
            for (const sub of loc.sublocations) {
                paths.push({
                    params: {
                        location: loc.location,
                        sublocation: sub
                    }
                })
            }
        }
    } catch (error) {
        console.log("Error getting all sublocations - using empty paths", error)
    }

    return { paths, fallback: "blocking" }
}

export async function getStaticProps({ params }) {
    const { location, sublocation } = params;
    const url = backend.searchTourURL + '/' + sublocation.toLowerCase()

    // Is this pair valid?
    if (!isValidLocationPair(location, sublocation)) {
        console.log('Invalid Pair')
        const realLocation = findRealLocation(sublocation);

        if (realLocation) {
            return {
                redirect: {
                destination: `/${realLocation}/${sublocation}`,
                permanent: true
                }
            }
        }
        return { notFound: true }
    }

    try {
        var tours = await GetTours(url, "Could not get the tours for " + sublocation)
        return {
            props: {
                location,
                sublocation,
                error: false,
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
        console.log("Error while generating ", location, sublocation, error)
        return {
            props: {
                location, sublocation, error: true, tours: []
            }, revalidate: 60 * 60
        }
    }
}
