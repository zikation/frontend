import RedirectOnError from "@/travel-components/Error/RedirectOnError"
import TourCard from "./TourCard"
import styles from './TourListPage.module.css'
import Head from "next/head"
import { TourImage } from "./TourImage"
import { BrandName } from "@/utils/constants"

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
        <>
            {
                tours.map((tour, i) => {
                    return <TourCard key={i} tour={tour} priority={i === 0} />
                })
            }
        </>
    )
}

function TourListPageSectionStringArray({section}) {
    return (
        section.desc.map((s, i) => {
            return <p key={i}>{s}</p>
        })
    )
}

function TourListPageSectionBullet({section}) {
    return (
        <ul>
            {
                section.desc.map((s, i) => {
                    return <li key={i}>{s}</li>
                })
            }
        </ul>
    )
}

function TourListFAQ({qna}) {
    return (
        <>
            <h4>{qna.question}</h4>
            {
                qna.answer.map((a, i) => {
                    return <p key={i}>{a}</p>
                })
            }
        </>
    )
}

function TourListPageSectionQnA({section}) {
    return (
        <>
            {
                section.desc.map((s, i) => {
                    return <TourListFAQ key={i} qna={s} />
                })
            }
        </>
    )
}

function TourListPageSection({section}) {
    return (
        <div className={styles.TourListPageSection}>
            <h3>{section.title}</h3>
            {
                section.type === "StringArray" ? 
                    <TourListPageSectionStringArray section={section} /> :
                section.type === "Bullet" ?
                    <TourListPageSectionBullet section={section} /> :
                section.type === "QnA" ?
                    <TourListPageSectionQnA section={section} /> :
                null
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

export default function TourListPage({ tours, location, sublocation = null, search = null, locationDesc }) {
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
                        <TourImage
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
                    <meta property="og:image" content={bkgd} />
                </Head>
                <TourListPageHeading h1={locationDesc?.seo.h1} />
                <TourListPageTitle title={locationDesc?.seo.title ? locationDesc?.seo.title : title} />
                <TourListPageMetaDesc metaDesc={locationDesc?.seo.metaDescription ? locationDesc?.seo.metaDescription : desc} />
                <div className={styles.TourCardsWrapper}>
                    <TourCards tours={tours} />
                </div>
                <TourListPageSections content={locationDesc?.content} />
            </main>
        </div>
    )
}
  