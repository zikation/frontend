import backend from '@/utils/backend'
import TourListPage from '@/travel-components/TourListPage/TourListPage'
import RedirectOnError from '@/travel-components/Error/RedirectOnError'
import { GetTours } from '@/utils/actions'
import { notFound } from 'next/navigation'
import { handleInvalidLocationPair, isValidLocationPair } from '@/utils/PlacesMenuDetails'

export default function CategoryListingPage({ tours, location, sublocation, category, error }) {
    var message = 'We do not have ' + category + ' at this location'
    if (category !== 'tours') 
        return <RedirectOnError message={message} />

    if (error)
        return <RedirectOnError />

    return <TourListPage tours={tours} location={location} sublocation={sublocation} />
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
                        sublocation: sub,
                        category: 'tours'
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
    const { location, sublocation, category } = params

    // Is this pair valid?
    if (!isValidLocationPair(location, sublocation)) {
        return handleInvalidLocationPair(location, sublocation, category)
    }
    
    const url = backend.fullGetSubLocationURL + '/' + sublocation.toLowerCase() + '/' + category.toLowerCase()
    try {
        var res = await fetch(`${backend.validateURL}?location=${location}&sublocation=${sublocation}&category=${category}`)
        if (res.status === 404)
            return {notFound: true}

        var data = await GetTours(url, "Could not get the tours for " + sublocation)
        if (!data.location || !data.tours || !Array.isArray(data.tours))
            return {notFound: true}
        
        var tours = data.tours
        return {
            props: {
                location,
                sublocation,
                category,
                error: false,
                locationDesc: data.location,
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
        console.log("Error while generating ", location, sublocation, category, error)
        return {
            props: {
                location, sublocation, category, error: true, tours: []
            }, revalidate: 60 * 60
        }
    }
}
