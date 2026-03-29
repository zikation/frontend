import Title from '@/components/content/Title'
import TrekSummary from './TrekSummary'
import TrekItinerary from './TrekItinerary'
import AddHeadSection from '@/components/content/AddHeadSection'
import Summary from '@/components/content/Summary'
import Details from '@/components/content/Details'
import Itinerary from '@/components/content/Itinerary'
import ParentCategory from '@/components/content/ParentCategory'
import PriceFloater from '@/components/content/PriceFloater'
import TrekPriceDetails from './TrekPriceDetails'

const GetLowestTrekPrice = price => {
    if (!price) return 0
                    
    let lprice = 10000000
    price.forEach(p => {
        if (p.oprice < lprice) lprice = p.oprice;
        if (p.price < lprice) lprice = p.price;
    })
    return (lprice === 10000000) ? 0 : lprice
}


const TrekPage = ({ trek, category, skipHeadSection = false }) => {
    const price = GetLowestTrekPrice(trek.price)
    return (
        <>
            {/* Add <Head> Section */}
            <AddHeadSection item={trek} category={category} skip={skipHeadSection} />

            {/* Add Title */}
            <Title title={trek.title} subtitle={trek.subtitle} content={trek.desc} />

            {/* Add Summary */}
            <Summary summary={trek.summary} content={<TrekSummary summary={trek.summary} />} contentType='component' />

            {/* Add Highlights */}
            <Details details={trek.sections} highlights={true} />

            {/* Add Itinerary */}
            <Itinerary details={trek.itinerary} content={<TrekItinerary details={trek.itinerary.details} />} contentType='component' />

            {/* Add non-highlight sections} */}
            <Details details={trek.sections} />

            {/* Parent Page /> */}
            <ParentCategory item={trek} category={category} />

            {/* Add Price Floater */}
            <PriceFloater price={price} label='Per Person' PriceDetails={TrekPriceDetails} priceDetailProps={{trek}} />
        </>
    )
}

export default TrekPage