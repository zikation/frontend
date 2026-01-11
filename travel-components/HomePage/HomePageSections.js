const { default: TourSearch } = require("@/travel-components/TourSearch/TourSearch");
const { default: FeaturedTours } = require("./FeaturedTours");
const { default: Testimonials } = require("./Testimonials");

const HomePageSections = [{
    component: FeaturedTours 
}, {
    style: 'SearchSection',
    component: TourSearch
}, {
    component: Testimonials,
    title: 'What our customers say'
}]

export default HomePageSections