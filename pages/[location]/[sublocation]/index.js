import backend from '@/utils/backend'
import TourListPage from '@/travel-components/TourListPage/TourListPage'
import { GetTours } from '@/utils/actions'
import { isValidLocationPair, handleInvalidLocationPair } from '@/utils/PlacesMenuDetails'
import RedirectOnError from '@/travel-components/Error/RedirectOnError'

/* For now, we list only tours */
export default function SublocationListingPage({ tours, location, sublocation, error, locationDesc }) {
    console.log(locationDesc)
    if (error)
        return <RedirectOnError />
    return <TourListPage tours={tours} location={location} sublocation={sublocation} locationDesc={locationDesc} />
}

export async function getStaticPaths() {
    let paths = []

    try {
        const res = await fetch(`${backend.fullTourURL}/all-sublocations`)
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
    const url = backend.fullGetSubLocationURL + '/' + sublocation.toLowerCase()
    
    // Is this pair valid?
    if (!isValidLocationPair(location, sublocation)) {
        return handleInvalidLocationPair(location, sublocation)
    }

    try {
        var res = await fetch(`${backend.validateURL}?location=${location}&sublocation=${sublocation}`)
        if (res.status === 404)
            return {notFound: true}

        var details = await GetTours(url, "Could not get the tours for " + sublocation)
        if (!details.location || !details.tours || !Array.isArray(details.tours))
            return {notFound: true}
        
        return {
            props: {
                location,
                sublocation,
                error: false,
                tours: details.tours?.map(t=>({
                            price: t.price,
                            location: t.location,
                            sublocation: t.sublocation,
                            slug: t.slug,
                            price: t.price ?? null,
                            bkgd: t.bkgd,
                            title: t.title,
                            summary: t.summary
                        })),
                locationDesc: details.location
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
