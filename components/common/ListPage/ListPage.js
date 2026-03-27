import Head from 'next/head'
import styles from './ListPage.module.css'
import TourListPage from '@/components/tours/TourListPage/TourListPage'
import { BrandName } from '@/utils/constants'
import FullScreenBackground from '../BkgdImage/FullScreenBackground'
import TrekListPage from '@/components/treks/TrekList/TrekList'

// const TrekListPage1 = ({location, sublocation, items, search, hub, isCategoryList}) => {
// <TrekListPage
//     console.log(items)
//     return (
//         <div>
//             <p>{items.title}</p>
//         </div>
//     )
// }

/**
 * Order in which categories should appear
 * Controls presentation, not data.
 */
const CATEGORY_ORDER = [
    "tours", "treks"
//   "activities", "cabs"
]

const CATEGORY_CONFIG = {
    tours: {
        component: TourListPage,
        // previewLimit: 6
    },
    treks: {
        component: TrekListPage
    }
}

const ListPageTitle = ({title}) => {
    return <Head><title>{`${title} - ${BrandName}`}</title><meta property="og:title" content={title} /></Head>
}

const ListPageMetaDesc = ({metaDesc}) => {
    return <Head><meta name='description' content={metaDesc} /><meta property="og:description" content={metaDesc} /></Head>
}

const ListPageHeaders = ({isCategoryList, title, metaDesc}) => {
    return isCategoryList ? null : <><ListPageTitle title={title} /><ListPageMetaDesc metaDesc={metaDesc} /></>
}

const DisplayAllCategories = ({categories, location, sublocation, search, hub, isCategoryList}) => {
    return (
        <>
            {
                categories.map((category, i) => {
                    const config = CATEGORY_CONFIG[category.type]
                    if (!config)
                        return null

                    const Component = config.component
                    return (
                        <Component key={i} location={location} sublocation={sublocation} items={category.items} search={search} hub={hub} isCategoryList={isCategoryList} />
                )})
            }
        </>
    )
}

const ListPage = ({location, sublocation, search, categories = [], hub=null, isCategoryList=false}) => {
    const safeCategories = Array.isArray(categories) ? categories : []

    // Sort based on defined order
    const sortedCategories = [...safeCategories].sort((a, b) => {
        const aIndex = CATEGORY_ORDER.indexOf(a.type)
        const bIndex = CATEGORY_ORDER.indexOf(b.type)

        return aIndex - bIndex
    })
    var place = sublocation ? sublocation : location ? location : search
    var bkgd = hub ? hub.bkgd : "/tourhub/images/" + place + ".webp"
    place = place?.replace(/-/g, ' ')?.replace(/\b\w/g, (c) => c.toUpperCase())

    var title = `${place} - ${BrandName}`
    var metaDesc = "Browse through the list of tours to " + place + " and book the service of your choice!"
    return (
        <>
            <ListPageHeaders isCategoryList={isCategoryList} title={title} metaDesc={metaDesc} />
            <DisplayAllCategories categories={sortedCategories} location={location} sublocation={sublocation} search={search} hub={hub} isCategoryList={isCategoryList} />
        </>
    )
}

ListPage.background = {image: "/tourhub/images/goa.webp", alt: BrandName}

export default ListPage