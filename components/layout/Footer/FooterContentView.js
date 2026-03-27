import Image from "next/image"
import ReactMarkdown from "react-markdown"
import FullScreenOverlay from '@/components/common/FullScreenOverlay/FullScreenOverlay'
import { BrandName, LogoImage } from '@/utils/constants'
import styles from './FooterContentView.module.css'

function FooterContentTitle({content}) {
    return content.title ? (
        <div className={styles.FooterContentTitle}>
            <ReactMarkdown>{content.title}</ReactMarkdown>
        </div>
    ) : null
}

function FooterContentSection({section}) {
    return (
        <div className={styles.FooterContentSection}>
            <ReactMarkdown>{section.title}</ReactMarkdown>
            <ul>
            {
                section.details.map((d, i) => {
                    return <li className={styles.SectionLi} key={i}><ReactMarkdown>{d}</ReactMarkdown></li>
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
                <Image src={LogoImage} alt={BrandName} width={300} height={300} />
                <FooterContentTitle content={content} />
                <FooterContentSections content={content} />
            </div>
        </FullScreenOverlay>
    ) : null
}
