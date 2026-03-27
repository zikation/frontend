import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect, useState } from 'react'
import { BrandName } from "@/utils/constants"
import LoadingIndicator from '@/components/common/LoadingIndicator/LoadingIndicator'
import GoogleAnalytics from '@/components/common/analytics/GoogleAnalytics'
import SiteLayout from "@/components/layout/SiteLayout/SiteLayout"
import BackgroundToggle from "@/components/common/BkgdImage/BackgroundToggle"
import FullScreenBackground from "@/components/common/BkgdImage/FullScreenBackground"
import "@/styles/TravelApp.css"

const AddSEOForPage = ({isNoIndexPage}) => {
    return (
        <Head> <meta name="robots" content={isNoIndexPage ? "noindex, follow" : "index, follow"}  /></Head>
    )
}

const App = ({ Component, pageProps }) => {
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

    const background = pageProps.background || Component.background
    const [showBackgroundOnly, setShowBackgroundOnly] = useState(false)

    return (
        <div className={showBackgroundOnly ? "immersive" : ""}>
            <GoogleAnalytics id={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID} />
            <AddSEOForPage isNoIndexPage={isNoIndexPage} />
            <LoadingIndicator loading={loading} />
            <FullScreenBackground bkgd={background?.path ? background.path : background} alt={background?.alt ? background.alt : BrandName} />
            <BackgroundToggle showBackgroundOnly={showBackgroundOnly} onToggle={() => setShowBackgroundOnly(prev => !prev)} />
            {!showBackgroundOnly && (<SiteLayout><Component {...pageProps} /></SiteLayout>)}
        </div>
    )
}

export default App