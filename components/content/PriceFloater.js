import { useRouter } from 'next/router'
import { useState } from 'react'
import SendWhatsAppMessage from '../layout/ChatOnWhatsApp/WAUtils'
import styles from './Content.module.css'

const ContactForPriceFloater = () => {
    const router = useRouter()
    return (
        <div className={styles.PriceFloater} onClick={() => SendWhatsAppMessage(router)}>
            <p className={styles.PriceCFP}>Contact for Price</p>
        </div>
    )
}

const PriceFloater = ({ price, label, PriceDetails, priceDetailProps }) => {
    if (!price) return <ContactForPriceFloater />

    const [showDetails, setShowDetails] = useState(false)
    const toggleShowDetails = () => setShowDetails(!showDetails)

    return (
        <>
        {
            <div className={styles.PriceFloater} onClick={() => setShowDetails(!showDetails)}>
                <p className={styles.PriceFloaterLabel}>Starting From</p>
                <p className={styles.PriceFloaterPrice}>₹{price}</p>
                <p className={styles.PriceFloaterLabel}>{label}</p>
            </div>
        }
        { showDetails && PriceDetails && <PriceDetails {...priceDetailProps} onClose={toggleShowDetails} /> }
        </>
    )
}

export default PriceFloater
