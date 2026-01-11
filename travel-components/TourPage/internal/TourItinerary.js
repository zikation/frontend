import ReactMarkdown from 'react-markdown'
import TourSection from "./TourSection"

function TourItineraryDetails({details}) {
    if (!details || !Array.isArray(details)) return null

    return (
        <>
        {
            details.map((detail, i) => {
                return (
                    <div key={i}>
                        <h3>{"Day " + detail.day + ": " + detail.title}</h3>
                        <p><b>{detail.subtitle ? detail.subtitle : null}</b></p>
                        {
                            detail.desc.map((d, i) => {
                                return (<ReactMarkdown key={i}>{d}</ReactMarkdown>)
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

