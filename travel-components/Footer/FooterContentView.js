import FullScreenOverlay from '@/travel-components/FullScreenOverlay/FullScreenOverlay'
import styles from './FooterContentView.module.css'

function FooterContentTitle({content}) {
    return content.title ? (
        <div className={styles.FooterContentTitle}>
            <p>{content.title}</p>
        </div>
    ) : null
}

function FooterContentSection({section}) {
    return (
        <div className={styles.FooterContentSection}>
            <p className={styles.SectionTitle}>{section.title}</p>
            <ul>
            {
                section.details.map((d, i) => {
                    return <li className={styles.SectionLi} key={i}>{d}</li>
                })
            }
            </ul>
        </div>
    )
}

function FooterContentSections({content}) {
    var sections = content.sections
    return sections.map((s, i) => (
        <FooterContentSection key={i} section={s} />
    ))
}

export default function FooterContentView({content, onClose}) {
    return content ? (
        <FullScreenOverlay onClose={onClose}>
            <div className={styles.FooterContentView}>
                <FooterContentTitle content={content} />
                <FooterContentSections content={content} />
            </div>
        </FullScreenOverlay>
    ) : null
}
