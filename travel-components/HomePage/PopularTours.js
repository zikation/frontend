import SlideShow from "@/travel-components/SlideShow/SlideShow"

const tourSlides = [
    {
        type: "promo",
        image: "/tours/images/kerala/keralatour.webp",
        title: "Explore Kerala",
        subtitle: "God's Own Country",
        link: "/india/kerala/tours/kochi-munnar-thekkady-alleppey-tour",
        linkText: "Book Tour"
    },
    {
        type: "promo",
        image: "/tours/images/kashmir/kashmir.webp",
        title: "Visit Kashmir",
        subtitle: "Mountains, Lakes, Meadows",
        caption: "Discover paradise on Earth",
        link: "/india/jammu-and-kashmir/tours",
        linkText: "View Packages"
    },
    {
        type: "promo",
        image: "/tours/images/goa/goastandard.webp",
        title: "Quick Goa Getaway",
        subtitle: "Sun, sand, and sunsets - Goa is calling",
        caption: "Beach days, palm shades, and carefree Goa vibes",
        link: "/india/goa/tours/goa-tour-package",
        linkText: "Let's Goa"
    },
    {
        type: "promo",
        image: "/tours/images/karnataka/hampi.webp",
        title: "Explore Hampi",
        subtitle: "Ruins of a lost empire",
        caption: "Discover the richest kingdom of the past",
        link: "/india/karnataka/tours/hampi-tour",
        linkText: "Back to history"
    },
    {
        type: "promo",
        image: "/tours/images/sikkim/sikkimdarjeeling.webp",
        title: "Sikkim Darjeeling",
        subtitle: "Hills, clouds, and Himalayan views",
        caption: "Cloud-kissed hills of Sikkim and Darjeeling",
        link: "/india/sikkim/tours",
        linkText: "Choose Package"
    }
]

export default function PopularTours() {
    return <SlideShow slides={tourSlides} interval={3000} />
}