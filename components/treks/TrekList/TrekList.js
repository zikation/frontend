import Section from "@/components/content/Section/Section"
import styles from './TrekList.module.css'
import Head from "next/head"
import { BrandName } from "@/utils/constants"
import TrekCard from "./TrekCard"

const TrekListPageTitle = ({title}) => {
    return <Head><title>{`${title} - ${BrandName}`}</title><meta property="og:title" content={title} /></Head>
}

const TrekListPageMetaDesc = ({metaDesc}) => {
    return <Head><meta name='description' content={metaDesc} /><meta property="og:description" content={metaDesc} /></Head>
}

const TrekCards = ({treks}) => {
    return (
        <div className={styles.TrekCardsWrapper}>
            {
                treks.map((trek, i) => {
                    return <TrekCard key={i} trek={trek} priority={i === 0} />
                })
            }
        </div>
    )
}

const TrekListPageSections = ({content}) => {
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

const TrekListPage = ({ items, location, sublocation = null, search = null, hub, isCategoryList }) => {
    var place = sublocation ? sublocation : location ? location : search
    place = place?.replace(/-/g, ' ')?.replace(/\b\w/g, (c) => c.toUpperCase())

    var title = search ? place + " Tours" : hub?.seo.title ? hub?.seo.title : "Book the Best Trek Packages to " + place
    var desc = "Browse through the list of trek to " + place + " and book the tour of your choice!"

    return (
        <>
            {isCategoryList ? <TrekListPageTitle title={hub?.seo.title ? hub?.seo.title : title} /> : null}
            {isCategoryList ? <TrekListPageMetaDesc metaDesc={hub?.seo.metaDescription ? hub?.seo.metaDescription : desc} /> : null}
            <Section title={hub?.seo.title ? hub?.seo.title : title} tag={isCategoryList ? 'h1' : 'h2'} content={<TrekCards treks={items} />}  contentType="component" />
            <TrekListPageSections content={hub?.content} />
        </>
    )
}

export default TrekListPage