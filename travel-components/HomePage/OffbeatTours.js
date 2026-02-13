import SlideShow from "@/travel-components/SlideShow/SlideShow"

const tourSlides = [
    {
        type: "promo",
        image: "/tours/images/lakshadweep/lakshadweep.webp",
        title: "Lakshadweep Wonders",
        subtitle: "India's hidden island gem",
        caption: "Turquoise waters, untouched paradise",
        link: "/india/lakshadweep/tours/lakshadweep-tour",
        linkText: "Explore Island"
    },
    {
        type: "promo",
        image: "/tours/images/arunachal/anini.webp",
        title: "Anini",
        subtitle: "Nature in its purest form",
        caption: "The road less traveled",
        link: "/india/arunachal-pradesh/tours/anini-mayodia-dibang-valley-tour-from-dibrugarh",
        linkText: "Book Now"
    },
    {
        type: "promo",
        image: "/tours/images/tripura/agartala.webp",
        title: "Agartala - Tripura",
        subtitle: "Agartala's timeless elegance",
        caption: "Discover the heart of Tripura",
        link: "/india/tripura/tours",
        linkText: "Let's Go"
    },
    {
        type: "promo",
        image: "/tours/images/sikkim/northsikkim.webp",
        title: "North Sikkim",
        subtitle: "Frozen lakes, endless horizons",
        caption: "A journey above the clouds",
        link: "/india/sikkim/tours",
        linkText: "Explore"
    },
    {
        type: "promo",
        image: "/tours/images/goa/offbeatgoa.webp",
        title: "Offbeat Goa",
        subtitle: "Goa beyond the beaches",
        caption: "Slow down in offbeat Goa",
        link: "/india/goa/tours/offbeat-goa-tour",
        linkText: "Book Now"
    }
]

export default function OffbeatTours() {
    return <SlideShow slides={tourSlides} interval={4000} />
}