import Link from 'next/link'
import { GetLowestPrice } from '@/components/tours/TourPage/TourUtils'
import styles from './TourListPage.module.css'
import Image from 'next/image'

export default function TourCard({tour, priority}) {
    var price = GetLowestPrice(tour.price)
    var priceText =  price ? "Starting from ₹" + price : "Contact for price"

    return (
        <Link href={`/${tour.location}/${tour.sublocation}/tours/${tour.slug}`} passHref>
            <div className={styles.TourCard}>
                <div className={styles.TourCardImagePart}>
                    <Image
                        src={tour.bkgd.path}
                        alt={tour.title}
                        priority={priority}
                        sizes="(max-width: 768px) 100vw, 33vw"
                        width={300}
                        height={300}
                        className={styles.TourCardImage}
                    />
                    <div className={styles.TourCardTitleOverlay}>
                        <h2 className={styles.TourCardTitle}>{tour.title}</h2>
                    </div>
                </div>

                <div className={styles.TourCardDetailsPart}>
                    <p className={styles.TourCardPrice}>{priceText}</p>
                    <p className={styles.TourCardDetails}><strong>Duration:</strong> {tour.summary?.days} days</p>
                    <p className={styles.TourCardDetails}><strong> {tour.summary?.start} -&gt; {tour.summary?.end}</strong></p>
                </div>
            </div>
        </Link>
    )
}
