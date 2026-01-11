import SlideShow from "@/travel-components/SlideShow/SlideShow"

const tourSlides = [
    {
        type: "promo",
        image: "/home/bhutan.jpg",
        title: "Explore Bhutan",
        subtitle: "Join our regular group tours",
        caption: "Measure your happiness quotient",
        link: "/asia/bhutan/tours/bhutan-group-tour-with-pobjikha",
        linkText: "Join Tour"
    },
    {
        type: "promo",
        image: "/home/lakshadweep.jpg",
        title: "Hidden Paradise of Lakshadweep",
        subtitle: "Scuba, Sun, and Sand",
        caption: "Discover paradise on Earth",
        link: "/india/lakshadweep/tours",
        linkText: "View Packages"
    },
    {
        type: "promo",
        image: "/home/dong.jpg",
        title: "Dong Valley",
        subtitle: "Visit the easternmost part of India",
        caption: "Witness the first sun rays that fall on India",
        link: "/india/arunachal-pradesh/tours",
        linkText: "Explore Now"
    },
    {
        type: "promo",
        image: "/home/chigu.jpg",
        title: "Anini",
        subtitle: "Visit the offbeat Wonders of India",
        link: "/india/arunachal-pradesh/tours",
        linkText: "Plan Trip"
    }
]

export default function FeaturedTours() {
    return <SlideShow slides={tourSlides} interval={5000} />
}