import { BrandName } from '@/utils/constants'
import styles from './LoadingIndicator.module.css'

export default function LoadingIndicator({loading}) {
    if (!loading) return null

    return (
        <div className={styles.LoadingIndicator}>
            <div className={styles.LoaderCircle}>
                <img src='/zikation.png' alt={BrandName} />
            </div>
        </div>
    )
}