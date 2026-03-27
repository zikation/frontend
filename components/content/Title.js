import Section from '@/components/content/Section/Section'

const Title = ({ title, subtitle, content, contentType = null }) => 
    title ? <Section title={title} subtitle={subtitle} tag='h1' content={content} contentType={contentType} /> : null

export default Title