import Link from 'next/link'
import styles from '../TourPage.module.css'

export default function TourParent({tour}) {
    return (
        <div className={styles.ShowAllTours}>
            <h2><Link href={`/${tour.location}/${tour.sublocation}/tours`}>Show all {tour.sublocation.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())} Tours</Link></h2>
        </div>
    )
}