import HomePageSections from './HomePageSections'
import styles from './Home.module.css'
import Head from 'next/head'
import { BrandName, DefaultImage } from '@/utils/constants'

export default function Home() {
    var title = "India Tour Packages, Trekking & Travel Experiences - " + BrandName
    var desc = "Book handpicked India tour packages, trekking activities and cab rentals across Kerala, Himachal, North East and more. Plan your perfect trip with " + BrandName
    var bkgd = DefaultImage
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name='description' content={desc} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={desc} />
                <meta property="og:image" content={bkgd} />
                <meta property="og:type" content="website" />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={desc} />
                <meta name="twitter:image" content={bkgd} />
            </Head>
            <main className={styles.Home}>
            {HomePageSections.map((s, i) => {
                const className = s.style && styles[s.style] ? styles[s.style] : styles.HomePageSection
                const Component = s.component
                
                return (
                    <section key={i} className={className}>
                    {s.title && <h2 className={styles.OverlayTitle}>{s.title}</h2>}
                    <Component />
                </section>
                )
            })}
            </main>
        </>
    )
}
