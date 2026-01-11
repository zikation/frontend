import "@/styles/TravelApp.css"
import Header from "../travel-components/Header/Header"
import Footer from "../travel-components/Footer/Footer"
import PlacesMenu from "@/travel-components/PlacesMenu/PlacesMenu"
import Head from "next/head"
import { useRouter } from "next/router"
import { ChatOnWhatsApp } from "@/travel-components/ChatOnWhatsApp/ChatOnWhatsApp"

function AddSEOForPage({isBookingPage}) {
    return (
        <Head> <meta name="robots" content={isBookingPage ? "noindex, nofollow" : "index, follow"}  /></Head>
    )
}

export default function App({ Component, pageProps }) {
    const router = useRouter()
    const isBookingPage = router.pathname.startsWith("/book")

    return (
        <>
            <AddSEOForPage isBookingPage={isBookingPage} />
            <Header />
            <PlacesMenu />
            <Component {...pageProps} />
            <ChatOnWhatsApp />
            <Footer />
        </>
    )
}
