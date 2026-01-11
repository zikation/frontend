import ReactMarkdown from 'react-markdown'
import styles from '../TourPage.module.css'

function TourHead({title, subtitle, heading=false}) {
    if (!title) return null

    return (
        <div className={styles.TourHead}>
            {heading ? <h1>{title}</h1> : <h2>{title}</h2>}
            {subtitle ? <p>{subtitle}</p> : null }
        </div>
    )
}

function TourBody({ content, type = "none" }) {
    if (!content) return null
  
    const isArray = Array.isArray(content)
    return (
        <div className={styles.TourBody}>
            {type === "bullet" ? (
                <ul>
                    {isArray ? content.map((c, i) => <li key={i}>{c}</li>) : <li>{content}</li>}
                </ul>
            ) : type === "numbered" ? (
                <ol>
                    {isArray ? content.map((c, i) => <li key={i}>{c}</li>) : <li>{content}</li>}
                </ol>
            ) : type === "component" ? (
                content
            ) : (
            <div>
                {isArray ? content.map((c, i) => <ReactMarkdown key={i}>{c}</ReactMarkdown>) : <ReactMarkdown>{content}</ReactMarkdown>}
            </div>
            )}
        </div>
    )
}

export default function TourSection({ title, subtitle, heading = false, content, type = 'none'}) {
    return (
        <>
            <TourHead title={title} subtitle={subtitle} heading={heading} />
            <TourBody content={content} type={type} />
        </>
    )
}
