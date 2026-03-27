import RedirectOnError from "@/components/common/Error/RedirectOnError"
import TourPage from "@/components/tours/TourPage/TourPage"
import TrekPage from "@/components/treks/TrekPage/TrekPage"
import backend from "@/utils/backend"
import { handleInvalidLocationPair, isValidLocationPair } from "@/utils/PlacesMenuDetails"

export default function TourSlug({ data, category }) {
    if (data.err || !data.success)
        return <RedirectOnError message={data.msg} />
    return (category === 'tours') ? <TourPage tour={data} category={category} /> : <TrekPage trek={data} category={category} />
}

export async function getStaticProps(context) {
    const { location, sublocation, category, slug } = context.params

    const prefix = (category === 'tours') ? `${backend.staticTourPrefix}` : `${backend.staticTrekPrefix}`
    const errorText = 'Could not get the details'
    try {
        const res = await fetch(`${prefix}/${slug}`)
        const detail = await res.json()
        if (!res.ok)
            return { props: {data: {err: res.status, msg: errorText }}}

        // Is this pair valid?
        if (!isValidLocationPair(location, sublocation)) {
            return handleInvalidLocationPair(location, sublocation, category, slug)
        }

        // Check if tour's location / sublocation matches the URL
        if (location !== detail.location || sublocation !== detail.sublocation) {
            let destinationURL = `/${detail.location}/${detail.sublocation}/${category}/${slug}`
            return {
                redirect: {
                    destination: destinationURL,
                    permanent: true
                }
            }
        }
        return { props: {data: detail, category, background: detail.bkgd}, revalidate: 3600}
    } catch (error) {
        console.error('ERROR!! Could not get slugs: ', error)
        return { props: {data: {err: 500, msg: errorText }}}
    }
}

export async function getStaticPaths() {
    let paths = []
    const errorText = 'Error getting all slugs'

    try {
        const res = await fetch(`${backend.staticAllSlugs}`)
        const data = await res.json()
        if (!res.ok || !data) {
            console.error('ERROR: ' + errorText)
            console.error(data.msg)
            return { paths: [], fallback: 'blocking' }
        }

        paths = data.slugs.map(({ location, sublocation, category, slug }) => ({
            params: { location, sublocation, slug, category }
        }))
    } catch (error) {
        console.log(`${errorText}: ${error}`)
    }
    return { paths, fallback: "blocking" }
}
