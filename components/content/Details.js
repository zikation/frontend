import Section from '@/components/content/Section/Section'

const WriteAllDetails = ({ detail, hl }) => {
    if (hl && !detail.highlight) return null
    if (!hl && detail.highlight) return null

    return <Section title={detail.title} subtitle={detail.subtitle} 
        content={detail.details} contentType={detail.type} />
}



const Details = ({details, highlights = false}) => {
    if (!details || !Array.isArray(details)) return null

    return (
        <>
            {details.map((detail, i) => {
                return <WriteAllDetails key={i} detail={detail} hl={highlights}  />
            })}
        </>
    )
}

export default Details