import TourSection from "./TourSection"
import styles from "../TourPage.module.css"
import { Para } from '@/travel-components/Content/Content'

function TourItineraryDetails({details}) {
    if (!details || !Array.isArray(details)) return null

    return (
        <>
        {
            details.map((detail, i) => {
                return (
                    <div key={i} className={styles.TourItineraryDetail}>
                        <h3>{"Day " + detail.day + ": " + detail.title}</h3>
                        <p><b>{detail.subtitle ? detail.subtitle : null}</b></p>
                        {
                            detail.desc.map((d, j) => {
                                return <Para key={j} content={d} />
                            })
                        }
                    </div>
                )
            })
        }
        </>
    )
}

export default function TourItinerary({ tour }) {
    var itinerary = tour.itinerary
    if (!itinerary) return null

    return <TourSection title={itinerary.title} subtitle={itinerary.subtitle} type="component"
        content={<TourItineraryDetails details={itinerary.details} /> } />
}

