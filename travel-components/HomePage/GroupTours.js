import SlideShow from "@/travel-components/SlideShow/SlideShow"

const tourSlides = [
    {
        type: "promo",
        image: "/tours/images/bhutan/bhutangrouptour.webp",
        title: "Bhutan with Pobjikha",
        subtitle: "Get more with Our Bhutan Tours",
        caption: "Explore popular and offbeat places of Bhutan",
        link: "/asia/bhutan/tours/bhutan-group-tour-with-phobjikha-valley",
        linkText: "Join Now"
    },
    {
        type: "promo",
        image: "/tours/images/arunachal/ziro.webp",
        title: "Ziro Music Festival",
        subtitle: "Biggest Music Festival of India",
        link: "/india/arunachal-pradesh/tours/ziro-music-festival-tour",
        linkText: "Book Now"
    },
    {
        type: "promo",
        image: "/tours/images/nagaland/hornbill.webp",
        title: "Hornbill Festival Tour",
        subtitle: "One if its kind festival",
        caption: "Visit to experience the vibes",
        link: "/india/nagaland/tours/hornbill-festival-nagaland-tour",
        linkText: "I'm in"
    }
]

export default function GroupTours() {
    return <SlideShow slides={tourSlides} interval={3500} />
}