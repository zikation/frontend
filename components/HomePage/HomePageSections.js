import SlideShow from "@/components/common/SlideShow/SlideShow"
import Search from "./Search"
import * as sc from "./SlideContent"

const PopularTours = () => <SlideShow slides={sc.PopularTourSlides} interval={3000} />

const GroupTours = () =>  <SlideShow slides={sc.GroupTourSlides} interval={3500} />

const OffbeatTours = () => <SlideShow slides={sc.OffbestTourSlides} interval={4000} />

const Testimonials = () => <SlideShow slides={sc.TestimonialSlides} interval={3000} />

const HomePageSections = [
    {
        style: 'SearchSection',
        component: Search,
        title: "Explore the World, One Journey at a Time"
    }, {
        component: PopularTours,
        title: "Popular Tours"
    }, {
        component: GroupTours,
        title: "Join Our Group Tours"
    }, {
        component: OffbeatTours,
        title: "Explore Offbeat Locations"
    }, {
        component: Testimonials,
        title: 'What our customers say'
    }
]

export default HomePageSections
