import { Bullet, ParaWithDiv } from '@/travel-components/Content/Content'
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
  
    return (
        <div className={styles.TourBody}>
            {type === "bullet" ? (
                <Bullet content={content} />
            ) : type === "component" ? (
                content
            ) : (
                <ParaWithDiv content={content} />
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
