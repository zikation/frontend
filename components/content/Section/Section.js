import ReactMarkdown from 'react-markdown'
import styles from './Section.module.css'

const normalizeContent = (content) => {
    if (!content) return ""
    if (typeof content === "string") return content
  
    if (Array.isArray(content)) {
        return content.map(item => {
            if (typeof item === "string") return item
            if (typeof item === "object" && item !== null)
                return item.text
            return ""
        }).join("\n\n")
    }
  
    return ""
  }

const Paragraph = ({ content }) => {
    if (!content) return null

    const markdown = normalizeContent(content)
    if (!markdown) return null

    return (
        <ReactMarkdown components={{ p: ({ children }) => (<p>{children}</p>)}}>
            {markdown}
        </ReactMarkdown>
    )
}

const Bullet = ({ content }) => {
    if (!content || !Array.isArray(content)) return null

    return (
        <ul>
        {
            content.map((c, i) => {
                return <li key={i}><ReactMarkdown>{c}</ReactMarkdown></li>
            })
        }
        </ul>    
    )
}

const SectionHeader = ({ title, subtitle, tag}) => {
    const HeadingTag = tag

    return title ? (
        <div className={styles.SectionHeader}>
            <HeadingTag>{title}</HeadingTag>
            <p>{subtitle}</p>
        </div>
    ) : null
}

const SectionBody = ({ content, contentType = null }) => {
    if (!content) return null

    return (
        <div className={styles.SectionBody}>
            {
                (contentType?.toLowerCase() === 'component') ? content : 
                (contentType?.toLowerCase() === 'bullet') ? <Bullet content={content} /> :
                <Paragraph content={content} />
            }
        </div>
    )
}

const Section = ({ title, subtitle = null, tag = 'h2', content, contentType = null}) => {
    return (
        <div className={styles.Section}>
            <SectionHeader title={title} subtitle={subtitle} tag={tag} />
            <SectionBody content={content} contentType={contentType} />
        </div>
    )
}

export default Section
