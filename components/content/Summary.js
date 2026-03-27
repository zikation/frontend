import Section from "./Section/Section"

const Summary = ({summary, content, contentType = null}) => {
    if (!content || !summary) return null

    return contentType.toLowerCase() === 'component' 
        ? <Section title={summary.title} subtitle={summary.subtitle} content={content} contentType={contentType} />
        : <Section title={summary.title} subtitle={summary.subtitle} content={summary.content} contentType={contentType} />
}

export default Summary