import GroupTours from "./GroupTours";
import OffbeatTours from "./OffbeatTours";

const { default: TourSearch } = require("@/travel-components/TourSearch/TourSearch");
const { default: PopularTours } = require("./PopularTours");
const { default: Testimonials } = require("./Testimonials");

const HomePageSections = [{
    style: 'SearchSection',
    component: TourSearch,
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
}]

export default HomePageSections