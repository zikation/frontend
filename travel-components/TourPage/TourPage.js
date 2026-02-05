import Head from 'next/head'
import TourInfo from "./internal/TourInfo"
import TourItinerary from "./internal/TourItinerary"
import TourSummary from "./internal/TourSummary"
import { TourTitle } from "./internal/TourTitle"
import { BrandName, SiteBaseURL } from '@/utils/constants'
import styles from './TourPage.module.css'
import TourParent from './internal/TourParent'
import Image from 'next/image'
import dynamic from "next/dynamic"

const TourPriceFloater = dynamic(() => import("./internal/TourPriceFloater"), { ssr: false})

export default function TourPage({tour}) {
    var canonicalUrl = tour.isVariantOf ? `${SiteBaseURL}/${tour.location}/${tour.sublocation}/${tour.isVariantOf}` :
        `${SiteBaseURL}/${tour.location}/${tour.sublocation}/${tour.slug}`
    var canonicalKeywords = tour.variantKeywords && Array.isArray(tour.variantKeywords) ? tour.variantKeywords.join(', ') : null
    var pagetitle = tour.pagetitle ? tour.pagetitle : tour.title
    pagetitle = pagetitle + ' - ' + BrandName
    return (
        <>
            <Head>
                <title>{pagetitle}</title>
                <meta name='description' content={tour.metadesc ? tour.metadesc : `Book ${tour.title} with ${BrandName}`} />
                <link rel="canonical" href={canonicalUrl} />
                {canonicalKeywords && (<meta property="keywords" content={canonicalKeywords} />)}
                <meta property="og:title" content={tour.title} />
                <meta property="og:description" content={tour.metadesc ? tour.metadesc : `Book ${tour.title} with ${BrandName}`} />
                <meta property="og:image" content={tour.bkgd.path} />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content={BrandName} />
                <meta name="twitter:title" content={tour.title} />
                <meta name="twitter:description" content={tour.metadesc ? tour.metadesc : `Book {tour.title} with {BrandName}`} />
                <meta name="twitter:image" content={tour.bkgd.path} />
                <meta name="twitter:site" content="@ZikationIndia" />
                <img src={tour.bkgd.path} alt={tour.title} style={{ display: "none" }} />
            </Head>
            <div className={styles.TourPageWrapper}>
                {tour.bkgd?.path && (
                    <div className={styles.FullScreenBackground}>
                        <Image src={tour.bkgd.path} alt={tour.bkgd.alt} fill priority sizes="100vw" className={styles.BackgroundImage} />
                    </div>
                )}
                <main className={styles.TourPage}>
                    <TourTitle tour={tour} />
                    <TourSummary tour={tour} />
                    <TourInfo tour={tour} highlights={true} />
                    <TourItinerary tour={tour} />
                    <TourInfo tour={tour} />
                    <TourParent tour={tour} />
                </main>
                <TourPriceFloater tour={tour} />
            </div>
        </>
    )
}
