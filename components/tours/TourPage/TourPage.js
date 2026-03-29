import dynamic from "next/dynamic"
import TourItinerary from "./internal/TourItinerary"
import TourSummary from "./internal/TourSummary"
import AddHeadSection from '@/components/content/AddHeadSection'
import Title from "@/components/content/Title"
import Summary from "@/components/content/Summary"
import Details from "@/components/content/Details"
import Itinerary from "@/components/content/Itinerary"
import ParentCategory from "@/components/content/ParentCategory"
import PriceFloater from "@/components/content/PriceFloater"
import TourPrice from "./internal/TourPrice"
import { GetLowestPrice } from "./TourUtils"

const TourPage = ({tour, category, skipHeadSection = false}) => {
    const price = GetLowestPrice(tour.price)
    return (
        <>
            {/* Add <Head> Section */}
            <AddHeadSection item={tour} category={category} skip={skipHeadSection} />

            {/* Add Title */}
            <Title title={tour.title} subtitle={tour.subtitle} content={tour.desc} />

            {/* Add Summary */}
            <Summary summary={tour.summary} content={<TourSummary summary={tour.summary} />} contentType='component' />

            {/* Add Highlights */}
            <Details details={tour.sections} highlights={true} />

            {/* Add Itinerary */}
            <Itinerary details={tour.itinerary} content={<TourItinerary details={tour.itinerary.details} />} contentType='component' />
            
            {/* Add non-highlight sections} */}
            <Details details={tour.sections} />

            {/* Parent Page /> */}
            <ParentCategory item={tour} category={category} />

            {/* Add the price floater */}
            <PriceFloater price={price} label='Per Person' PriceDetails={TourPrice} priceDetailProps={{tour}} />
        </>
    )
}

export default TourPage
