import RedirectOnError from "@/travel-components/Error/RedirectOnError"
import TourPage from "@/travel-components/TourPage/TourPage"
import backend from "@/utils/backend"
import { handleInvalidLocationPair, isValidLocationPair } from "@/utils/PlacesMenuDetails"

export default function TourSlug({ data }) {
    if (data.err || !data.success)
        return <RedirectOnError message={data.str} />
    return <TourPage tour={data} />
}

export async function getStaticProps(context) {
    const { location, sublocation, slug } = context.params
    try {
        const res = await fetch(`${backend.fullTourDetailURL}/${slug}`);
        if (!res.ok)
            return { props: {data: {err: res.status, str: "Could not get the tour details" }}}

        // Is this pair valid?
        if (!isValidLocationPair(location, sublocation)) {
            return handleInvalidLocationPair(location, sublocation, 'tours', slug)
        }

        const data = await res.json()

        // Check if tour's location / sublocation matches the URL
        if (location !== data.location || sublocation !== data.sublocation) {
            let destinationURL = `/${data.location}/${data.sublocation}/tours/${slug}`
            return {
                redirect: {
                    destination: destinationURL,
                    permanent: true
                }
            }
        }
        return { props: {data}, revalidate: 3600}
    } catch (error) {
        console.error('ERROR!! Could not get slugs: ', error)
        return { props: {data: {err: 500, str: "Could not get the tour details" }}}
    }
}

export async function getStaticPaths() {
    let paths = []
    try {
        const res = await fetch(`${backend.fullTourURL}/all-tours`) // TODO: Should be all-slugs
        const slugs = await res.json()
        if (!slugs) return

        paths = slugs.tours.map(({ location, sublocation, slug }) => ({
            params: { location, sublocation, slug, category: "tours" }, // TODO: Fix this when other categories are added
        }))
    } catch (error) {
        console.log('Error getting all slugs - using empty paths', error)
    }
    return { paths: [], fallback: "blocking" }
}
