import Section from "@/components/content/Section/Section"

const TrekItinerary = ({details}) => {
    if (!details || !Array.isArray(details)) return null

    return (
        <>
        {
            details.map((detail, i) => {
                var title = `Day ${detail.day}: ${detail.title}`
                return <Section key={i} title={title} subtitle={detail.subtitle} tag='h3' content={detail.desc} />
            })
        }
        </>
    )
}

export default TrekItinerary

