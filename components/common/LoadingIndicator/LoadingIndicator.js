import { BrandName, LogoImage } from '@/utils/constants'
import styles from './LoadingIndicator.module.css'

const LoadingIndicator = ({loading}) => {
    if (!loading) return null

    return (
        <div className={styles.LoadingIndicator}>
            <div className={styles.LoaderCircle}>
                <img src={LogoImage} alt={BrandName} />
            </div>
        </div>
    )
}

export default LoadingIndicator
