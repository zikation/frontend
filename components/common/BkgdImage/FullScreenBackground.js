import Image from "next/image"
import { useState } from "react"
import styles from "./Background.module.css"
import { BrandName } from "@/utils/constants"

const DEFAULT_BKGD = "/images/default-tour.jpg"

const BkgdImage = ({ src, alt, ...props }) => {
    const [imgSrc, setImgSrc] = useState(src || DEFAULT_BKGD)
    return <Image {...props} src={imgSrc} alt={alt} onError={() => setImgSrc(DEFAULT_BKGD)} />
}

const FullScreenBackground = ({bkgd, alt}) => {
    if (!bkgd) bkgd = DEFAULT_BKGD
    if (!alt) alt = BrandName

    return (
        <div className={styles.FullScreenBackground}>
            <BkgdImage key={bkgd} src={bkgd} alt={alt} fill priority sizes="100vw" className={styles.BackgroundImage} />
        </div>
    )
}

export default FullScreenBackground
