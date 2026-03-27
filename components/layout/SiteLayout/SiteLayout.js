import { useRef, useEffect } from 'react'
import { useRouter } from 'next/router'
import ChatOnWhatsApp from '@/components/layout/ChatOnWhatsApp/ChatOnWhatsApp'
import Footer from '@/components/layout/Footer/Footer'
import Header from '@/components/layout/Header/Header'
import PlacesMenu from '@/components/layout/PlacesMenu/PlacesMenu'
import styles from './SiteLayout.module.css'

const SiteLayout = ({ children }) => {
    const contentRef = useRef(null)
    const router = useRouter()

    useEffect(() => {
        const handleRouteChange = () => {
            if (contentRef.current) {
                contentRef.current.scrollTo({ top: 0, behavior: "instant" })
            }
        }
        router.events.on("routeChangeComplete", handleRouteChange)
        return () => {
            router.events.off("routeChangeComplete", handleRouteChange)
        }
    }, [router.events])

    return (
        <>
            <Header />
            <PlacesMenu />
            <div className={styles.SiteLayout}>
                <main ref={contentRef} className={styles.MainContentArea}>
                    {children}
                </main>
            </div>
            <ChatOnWhatsApp />
            <Footer />
        </>
    )
}

export default SiteLayout
