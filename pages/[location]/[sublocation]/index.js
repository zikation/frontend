import backend from '@/utils/backend'
import TourListPage from '@/travel-components/TourListPage/TourListPage'
import { GetTours } from '@/utils/actions'
import { isValidLocationPair, findRealLocation } from '@/utils/PlacesMenuDetails'

/* For now, we list only tours */
export default function SublocationListingPage({ tours, location, sublocation }) {
    return <TourListPage tours={tours} location={location} sublocation={sublocation} />
}

export async function getStaticPaths() {
    const res = await fetch(`${backend.tourUrl}/all-sublocations`)
    const {data} = await res.json()
    if (!data) return

    const paths = []
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
    return { paths, fallback: 'blocking' }
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
    var tours = await GetTours(url, "Could not get the tours for " + sublocation)
    return {
        props: {
            location,
            sublocation,
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
        revalidate: 60 * 60   // 1 hour ISR
    }
}
