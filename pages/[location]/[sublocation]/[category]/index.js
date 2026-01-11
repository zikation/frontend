import backend from '@/utils/backend'
import TourListPage from '@/travel-components/TourListPage/TourListPage'
import RedirectOnError from '@/travel-components/Error/RedirectOnError'
import { GetTours } from '@/utils/actions'

export default function CategoryListingPage({ tours, location, sublocation, category }) {
    var message = 'We do not have ' + category + ' at this location'
    if (category !== 'tours') 
        return <RedirectOnError message={message} />

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
                    sublocation: sub,
                    category: 'tours'
                }
            })
        }
    }
    return { paths, fallback: 'blocking' }
}

export async function getStaticProps({ params }) {
    const { location, sublocation, category } = params;
    const url = backend.searchTourURL + '/' + sublocation.toLowerCase()
    var tours = await GetTours(url, "Could not get the tours for " + sublocation)
    return {
        props: {
            location,
            sublocation,
            category,
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
