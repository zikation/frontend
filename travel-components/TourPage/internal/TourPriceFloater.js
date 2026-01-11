import React, { useState } from 'react'
import TourPrice from './TourPrice'
import { GetLowestPrice } from '@/utils/actions';
import styles from '../TourPage.module.css'

function ShowContactForPrice() {
    return (
        <div className={styles.TourPriceFloater}>
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
                </div> : <div className={styles.TourPriceFloater}>
                    <p className={styles.TourPriceFloaterPrice}>Contact for Price</p>
                </div>

            }
            {showDetails && <TourPrice tour={tour} onClose={toggleShowDetails} />}
        </>
    );
}

