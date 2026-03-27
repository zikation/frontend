import HomePageSections from './HomePageSections'
import Head from 'next/head'
import { BrandName, DefaultImage } from '@/utils/constants'
import FullScreenBackground from '../common/BkgdImage/FullScreenBackground'
import styles from './Home.module.css'

const Home = () => {
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
            <FullScreenBackground bkgd={bkgd} alt={BrandName} />
            {
                HomePageSections.map((s, i) => {
                    const className = s.style && styles[s.style] ? styles[s.style] : styles.HomePageSection
                    const Component = s.component
                    
                    return (
                        <section key={i} className={className}>
                            {s.title && <h2>{s.title}</h2>}
                            <Component />
                        </section>
                    )
                })
            }
        </>
    )
}

export default Home
