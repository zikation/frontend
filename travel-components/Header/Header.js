import Link from 'next/link'
import styles from './Header.module.css'
import { BrandName, Email } from '@/utils/constants'
import { SendGAEvent, SendWhatsAppMessage } from '@/utils/actions'
import { useRouter } from 'next/router'

function PhoneCell({router}) {
    return (
        <div className={styles.HeaderCellCentered}>
            <p><strong>+91 821 762 6812</strong>{' '}(
                    <a href="tel:+918217626812" className={styles.InlineLink}
                        onClick={() => {SendGAEvent('phone_click', {
                            event_category: 'contact',
                            event_label: 'header_phone'
                            })
                        }}
                    >
                        Call
                    </a>{' '}
                    / <a className={styles.WhatsAppLink} onClick={(e) => {e.preventDefault();SendWhatsAppMessage(router)}}>WhatsApp</a>)
                </p>
            </div>
    )
}

function EmailCell() {
    return (
        <div className={`${styles.HeaderCellCentered} ${styles.EmailCell}`}>
            <Link href={`mailto:${Email}`}>{Email}</Link>
        </div>
    )
}

function LogoCell() {
    return (
        <div className={styles.HeaderCell}>
            <Link href='/'><img src='/zikation.png' alt={BrandName} className={styles.Logo} /></Link>
        </div>
    )
}

export default function Header() {
    const router = useRouter()

    return (
        <div className={styles.Header}>
            <LogoCell />
            <PhoneCell router={router} />
            <EmailCell />
        </div>
    )
}
