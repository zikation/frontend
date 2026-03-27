import Head from "next/head"
import { BrandName } from "@/utils/constants"
import TourCard from "./TourCard"
import Section from "@/components/content/Section/Section"
import styles from './TourListPage.module.css'

const TourListPageTitle = ({title}) => {
    return <Head><title>{`${title} - ${BrandName}`}</title><meta property="og:title" content={title} /></Head>
}

const TourListPageMetaDesc = ({metaDesc}) => {
    return <Head><meta name='description' content={metaDesc} /><meta property="og:description" content={metaDesc} /></Head>
}

const TourCards = ({tours}) => {
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

const TourListPageSections = ({content}) => {
    return (
        <>
            {
                content?.map((section, i) => {
                    return <Section key={i} title={section.title} content={section.desc} contentType={section.type} />
                })
            }
        </>
    )
}

const TourListPage = ({ items, location, sublocation = null, search = null, hub, isCategoryList }) => {
    var place = sublocation ? sublocation : location ? location : search
    place = place?.replace(/-/g, ' ')?.replace(/\b\w/g, (c) => c.toUpperCase())

    var title = search ? place + " Tours" : hub?.seo.title ? hub?.seo.title : "Book the Best Tour Packages to " + place
    var desc = "Browse through the list of tours to " + place + " and book the tour of your choice!"

    return (
        <>
            {isCategoryList ? <TourListPageTitle title={hub?.seo.title ? hub?.seo.title : title} /> : null}
            {isCategoryList ? <TourListPageMetaDesc metaDesc={hub?.seo.metaDescription ? hub?.seo.metaDescription : desc} /> : null}
            <Section title={hub?.seo.title ? hub?.seo.title : title} tag={isCategoryList ? 'h1' : 'h2'} 
                content={<TourCards tours={items} />}  contentType="component" />
            <TourListPageSections content={hub?.content} />
        </>
    )
}

export default TourListPage