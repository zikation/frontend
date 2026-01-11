import RedirectOnError from "@/travel-components/Error/RedirectOnError"
import TourPage from "@/travel-components/TourPage/TourPage"
import backend from "@/utils/backend"

export default function TourSlug({ data }) {
    if (data.err || !data.success)
        return <RedirectOnError message={data.str} />

    return <TourPage tour={data} />
}

export async function getStaticProps(context) {
    const { location, sublocation, slug } = context.params;
    try {
        const res = await fetch(`${backend.tourUrl}/${location}/${sublocation}/${slug}`);
        if (!res.ok)
            return { props: {data: {err: res.status, str: "Could not get the tour details" }}}

        const data = await res.json()
        return { props: {data}, revalidate: 3600} // ISR: Regenerate this page at most once every one hour
    } catch (error) {
        console.error('ERROR!! Could not get slugs: ', error);
        return { props: {data: {err: 500, str: "Could not get the tour details" }}}
    }
}

export async function getStaticPaths() {
    try {
        const res = await fetch(`${backend.tourUrl}/all-tours`) // TODO: Should be all-slugs
        const slugs = await res.json()
        if (!slugs) return

        const paths = slugs.tours.map(({ location, sublocation, slug }) => ({
            params: { location, sublocation, slug, category: "tours" }, // TODO: Fix this when other categories are added
        }));
        
        return { paths, fallback: false } // Generate missing pages on-demand at first request 
    } catch (error) {
        console.error('Error getting all slugs:', error)
        return { paths: [], fallback: 'blocking' }
    }
}
