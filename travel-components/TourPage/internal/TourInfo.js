import TourSection from "./TourSection"

function WriteTourSection({ section, hl }) {
    if (hl && !section.highlights) return null
    if (!hl && section.highlights) return null

    return <TourSection title={section.title} subtitle={section.subtitle} 
        content={section.details} type={section.type} />
}

export default function TourInfo({ tour, highlights = false }) {
    var sections = tour.sections
    if (!sections || !Array.isArray(sections)) return null

    return (
        <>
            {sections.map((section, i) => {
                return <WriteTourSection key={i} section={section} hl={highlights}  />
            })}
        </>
    )
}
