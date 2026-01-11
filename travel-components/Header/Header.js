import Link from 'next/link'
import styles from './Header.module.css'
import { BrandName, Email } from '@/utils/constants'

export default function Header() {
    return (
        <div className={styles.Header}>
            <Link href='/'><img src='/zikation.png' alt={BrandName} className={styles.Logo} /></Link>
            <p><strong>+91 821 762 6812</strong> (Call / WhatsApp)</p>
            <Link href={`mailto:${Email}`}>
                {Email}
            </Link>
        </div>
    )
}