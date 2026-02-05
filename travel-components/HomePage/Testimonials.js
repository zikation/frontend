import SlideShow from "@/travel-components/SlideShow/SlideShow"

const testimonialSlides = [
    {
        type: "testimonial",
        image: "/home/hornbill.jpg",
        text: "Extremely good, professional and prompt service from Sandeep and group, for the Nagaland and Hornbill Highly recommended.",
        name: "DR MS Jayasekhar",
        location: "Kerala, India"
    },
    {
        type: "testimonial",
        image: "/home/bhutantour.jpg",
        text: "I recently have been to bhutan organized by Zikaton. Highly recommend them.",
        name: "Prateek Srivastava",
        location: "Bangalore, India"
    },
    {
        type: "testimonial",
        image: "/home/ziro.jpg",
        text: "I have booked zingaros camp stay through Zikation for Ziro Music Festival in Arunachal pradesh. It was one of the most sorted trips where everything from bus train tickets to stay, food, activities was taken care of. It was a pleasant trip with kind of arrangements done in terms of quality of stay n food. Thanks.",
        name: "Radha Ulhe",
        location: "Nagpur, India"
    },
    {
        type: "testimonial",
        image: "/home/TM2.jpg",
        text: "Thank you Zikation for organising this trek. The Tarsar Marsar trek was well organised, Lead Arfat and basheer and Brothers are well experienced and managed the trek very well. Giving helping hands in risky climbing areas, making the plans so that we could cover the places without much tiredness to body. The food was tasty, (still remembering the 2nd day sandwich...yummy it was).",
        name: "Deepika Bhat",
        location: "Bangalore, India"
    },
    {
        type: "testimonial",
        image: "/home/bhutangrouptour.jpg",
        text: "I booked Bhutan through Zikation, and it was very smooth. I have not had any complaints during the entire trip for any sorts. What they promised in the adv brochure, delivered it with no compromise like super cool guide, good 3star hotels for accommodation and comfortable vehicle for transit etc. initially when I was planning the trip to Bhutan, searching for different tours and agencies, but Sandeep was quite fast in replying my messages and questions, providing suggestion and gave lowest price compare to other service providers made me to book the trip with him even though there was no many reviews. You can book your trip and forget, they will arrange everything. Recommend them for Bhutan!",
        name: "Jegan RS",
        location: "Bangalore, India"
    }
]

export default function Testimonials() {
    return <SlideShow slides={testimonialSlides} interval={3000} />
}