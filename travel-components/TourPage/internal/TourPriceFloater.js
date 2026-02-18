import React, { useState } from 'react'
import TourPrice from './TourPrice'
import { GetLowestPrice, SendWhatsAppMessage } from '@/utils/actions';
import styles from '../TourPage.module.css'
import { useRouter } from 'next/router';

function ShowContactForPrice() {
    const router = useRouter()
    return (
        <div className={styles.TourPriceFloater} onClick={() => SendWhatsAppMessage(router)}>
            <p className={styles.TourPriceCFP}>Contact for Price</p>
        </div>
    )
}

export default function TourPriceFloater({ tour }) {
    if (!tour.price) return <ShowContactForPrice />

    const [showDetails, setShowDetails] = useState(false);
    const startingfrom = GetLowestPrice(tour.price);

    function toggleShowDetails() {
        setShowDetails(!showDetails)
    }

    return (
        <>
            {
                startingfrom ? 
                <div className={styles.TourPriceFloater} onClick={() => setShowDetails(!showDetails)}>
                    <p className={styles.TourPriceFloaterLabel}>Starting From</p>
                    <p className={styles.TourPriceFloaterPrice}>₹{startingfrom}</p>
                    <p className={styles.TourPriceFloaterLabel}>Per Person</p>
                </div> : <ShowContactForPrice />
            }
            {showDetails && <TourPrice tour={tour} onClose={toggleShowDetails} />}
        </>
    );
}

