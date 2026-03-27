import Head from "next/head"
import { BrandName, DefaultTourImage, SiteBaseURL } from '@/utils/constants'

const AddHeadSection = ({item, skip = false}) => {
    if (skip || !item) return null

    const canonicalUrl = item.isVariantOf ? `${SiteBaseURL}/${item.location}/${item.sublocation}/${item.isVariantOf}` :
        `${SiteBaseURL}/${item.location}/${item.sublocation}/${item.slug}`
    const canonicalKeywords = item.variantKeywords && Array.isArray(item.variantKeywords) ? item.variantKeywords.join(', ') : null
    const seotitle = item.seotitle ? `${item.seotitle} - ${BrandName}` : `${item.title} - ${BrandName}`
    const image = item.bkgd?.path || DefaultTourImage

    return (
        <Head>
            <title>{seotitle}</title>
            <meta name='description' content={item.metadesc ? item.metadesc : `Book ${item.title} with ${BrandName}`} />
            <link rel="canonical" href={canonicalUrl} />
            {canonicalKeywords && (<meta property="keywords" content={canonicalKeywords} />)}
            <meta property="og:title" content={item.title} />
            <meta property="og:description" content={item.metadesc ? item.metadesc : `Book ${item.title} with ${BrandName}`} />
            <meta property="og:image" content={image} />
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content={BrandName} />
            <meta name="twitter:title" content={item.title} />
            <meta name="twitter:description" content={item.metadesc ? item.metadesc : `Book ${item.title} with ${BrandName}`} />
            <meta name="twitter:image" content={image} />
            <meta name="twitter:site" content="@ZikationIndia" />
            <img src={image} alt={item.title} style={{ display: "none" }} />
        </Head>
    )
}

export default AddHeadSection
