import Section from '@/components/content/Section/Section'

const Itinerary = ({ details, content, contentType = null }) => {
    if (!details || !content) return null

    return contentType.toLowerCase() === 'component' 
        ? <Section title={details.title} subtitle={details.subtitle} content={content} contentType={contentType} />
        : <Section title={details.title} subtitle={details.subtitle} content={details.content} contentType={contentType} />
}

export default Itinerary