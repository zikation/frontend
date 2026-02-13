import "@/styles/TravelApp.css"
import Header from "../travel-components/Header/Header"
import Footer from "../travel-components/Footer/Footer"
import PlacesMenu from "@/travel-components/PlacesMenu/PlacesMenu"
import Head from "next/head"
import { useRouter } from "next/router"
import { ChatOnWhatsApp } from "@/travel-components/ChatOnWhatsApp/ChatOnWhatsApp"
import GoogleAnalytics from '@/travel-components/analytics/GoogleAnalytics'
import { useEffect, useState } from 'react'
import LoadingIndicator from '@/travel-components/LoadingIndicator/LoadingIndicator'

function AddSEOForPage({isNoIndexPage}) {
    return (
        <Head> <meta name="robots" content={isNoIndexPage ? "noindex, follow" : "index, follow"}  /></Head>
    )
}

export default function App({ Component, pageProps }) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const isNoIndexPage = router.pathname.startsWith("/book") || router.pathname.startsWith("/search")

    useEffect(() => {
        const handleStart = () => setLoading(true)
        const handleComplete = () => setLoading(false)
    
        router.events.on('routeChangeStart', handleStart)
        router.events.on('routeChangeComplete', handleComplete)
        router.events.on('routeChangeError', handleComplete)
    
        return () => {
          router.events.off('routeChangeStart', handleStart)
          router.events.off('routeChangeComplete', handleComplete)
          router.events.off('routeChangeError', handleComplete)
        }
    }, [router])

    return (
        <>
            <GoogleAnalytics id={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID} />
            <AddSEOForPage isNoIndexPage={isNoIndexPage} />
            <LoadingIndicator loading={loading} />
            <Header />
            <PlacesMenu />
            <Component {...pageProps} />
            <ChatOnWhatsApp />
            <Footer />
        </>
    )
}
