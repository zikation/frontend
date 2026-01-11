import TourSection from "./TourSection"

export function TourTitle({ tour }) {
    if (!tour || !tour.title) return null

    return <TourSection title={tour.title} subtitle={tour.subtitle} 
        heading={true} content={tour.desc} type='none' />
}