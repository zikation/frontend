import RedirectOnError from "@/travel-components/Error/RedirectOnError"
import TourCard from "./TourCard"
import styles from './TourListPage.module.css'
import Head from "next/head"
import { TourImage } from "./TourImage"
import { BrandName } from "@/utils/constants"
import { Bullet, Para } from "../Content/Content"

function TourListPageHeading({h1}) {
    return h1 ? <h1>{h1}</h1> : null
}

function TourListPageTitle({title}) {
    return <Head><title>{`${title} - ${BrandName}`}</title><meta property="og:title" content={title} /></Head>
}

function TourListPageMetaDesc({metaDesc}) {
    return <Head><meta name='description' content={metaDesc} /><meta property="og:description" content={metaDesc} /></Head>
}

function TourCards({tours}) {
    return (
        <div className={styles.TourCardsWrapper}>
            {
                tours.map((tour, i) => {
                    return <TourCard key={i} tour={tour} priority={i === 0} />
                })
            }
        </div>
    )
}

function TourListPageSection({section}) {
    return (
        <div className={styles.TourListPageSection}>
            <h2>{section.title}</h2>
            {
                section.type === "bullet" ?
                    <Bullet content={section.desc} /> :
                    <Para content={section.desc} />
            }
        </div>
    )
}

function TourListPageSections({content}) {
    return (
        <div className={styles.TourListPageSections}>
            {
                content?.map((section, i) => {
                    return <TourListPageSection key={i} section={section} />
                })
            }
        </div>
    )
}

function FullScreenBackground({bkgd, place}) {
    var alt = place + " Tour Packages"
    return !bkgd ? null : 
        <div className={styles.FullScreenBackground}>
            <TourImage key={bkgd} src={bkgd} alt={alt} fill priority sizes="100vw" className={styles.BackgroundImage} />
        </div>
}

export default function TourListPage({ tours, location, sublocation = null, search = null, locationDesc }) {
    var place = sublocation ? sublocation : location ? location : search
    place = place.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())

    if (!tours || !Array.isArray(tours) || tours.length === 0) {
        const str = "It's surprising to us, but we don't have tours to " + place
        return <RedirectOnError message={str} />
    }

    var loc = sublocation ? sublocation : location ? location : search
    var bkgd = locationDesc ? locationDesc.bkgd : "/locations/images/" + loc + ".webp"

    var title = "Book the Best Tour Packages to " + place
    var desc = "Browse through the list of tours to " + place + " and book the tour of your choice!"

    return (
        <div className={styles.TourListWrapper}>
            <FullScreenBackground bkgd={bkgd} place={place} />
            <main className={styles.TourListPage}>
                <Head> <meta property="og:image" content={bkgd} /> </Head>
                <TourListPageHeading h1={locationDesc?.seo.h1} />
                <TourListPageTitle title={locationDesc?.seo.title ? locationDesc?.seo.title : title} />
                <TourListPageMetaDesc metaDesc={locationDesc?.seo.metaDescription ? locationDesc?.seo.metaDescription : desc} />
                <TourCards tours={tours} />
                <TourListPageSections content={locationDesc?.content} />
            </main>
        </div>
    )
}
  