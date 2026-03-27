import Link from 'next/link'
import styles from './TrekList.module.css'
import Image from 'next/image'

const GetLowestTrekPrice = price => {
    if (!price) return 0
                    
    let lprice = 10000000
    price.forEach(p => {
        if (p.oprice < lprice) lprice = p.oprice;
        if (p.price < lprice) lprice = p.price;
    })
    return (lprice === 10000000) ? 0 : lprice
}

const TrekCard = ({trek, priority}) => {
    var price = GetLowestTrekPrice(trek.price)
    var priceText =  price ? "Starting from ₹" + price : "Contact for price"

    return (
        <Link href={`/${trek.location}/${trek.sublocation}/treks/${trek.slug}`} passHref>
            <div className={styles.TrekCard}>
                <div className={styles.TrekCardImagePart}>
                    <Image
                        src={trek.bkgd.path}
                        alt={trek.title}
                        priority={priority}
                        sizes="(max-width: 768px) 100vw, 33vw"
                        width={300}
                        height={300}
                        className={styles.TrekCardImage}
                    />
                    <div className={styles.TrekCardTitleOverlay}>
                        <h2 className={styles.TrekCardTitle}>{trek.title}</h2>
                    </div>
                </div>

                <div className={styles.TrekCardDetailsPart}>
                    <p className={styles.TrekCardPrice}>{priceText}</p>
                    <p className={styles.TrekCardDetails}><strong>Duration:</strong> {trek.summary?.days} days</p>
                    <p className={styles.TrekCardDetails}><strong> {trek.summary?.start} -&gt; {trek.summary?.end}</strong></p>
                </div>
            </div>
        </Link>
    )
}

export default TrekCard
