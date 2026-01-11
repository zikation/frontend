import RedirectOnError from "@/travel-components/Error/RedirectOnError"
import TourCard from "./TourCard"
import styles from './TourListPage.module.css'
import Head from "next/head"
import Image from "next/image"

export default function TourListPage({ tours, location, sublocation = null, search = null }) {
    var place = sublocation ? sublocation : location ? location : search
    place = place.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())

    var alt = place + " Tour Packages"

    if (!tours || !Array.isArray(tours) || tours.length === 0) {
        const str = "It's surprising to us, but we don't have tours to " + place
        return <RedirectOnError message={str} />
    }

    var bkgd = sublocation ? '/background/' + sublocation +'.jpg' :
        location ? '/background/' + location+'.jpg' : '/background/' + search + '.jpg'

    var title = "Book the Best Tour Packages to " + place
    var desc = "Browse through the list of tours to " + place + " and book the tour of your choice!"

    return (
        <div className={styles.TourListWrapper}>
            {bkgd && (
                    <div className={styles.FullScreenBackground}>
                        <Image
                            src={bkgd}
                            alt={alt}
                            fill
                            priority
                            sizes="100vw"
                            className={styles.BackgroundImage}
                        />
                    </div>
            )}
            <main className={styles.TourListPage}>
                <Head>
                    <title>{title}</title>
                    <meta name='description' content={desc} />
                    <meta property="og:title" content={title} />
                    <meta property="og:description" content={desc} />
                    <meta property="og:image" content={bkgd} />
                </Head>
                {
                    tours.map((tour, i) => {
                        return <TourCard key={i} tour={tour} priority={i === 0} />
                    })
                }
            </main>
        </div>
    )
}
  