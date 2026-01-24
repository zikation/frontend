import Image from "next/image"
import { useState } from "react"

const DEFAULT_BKGD = "/images/default-tour.jpg"

export const TourImage = ({ src, alt, ...props }) => {
    const [imgSrc, setImgSrc] = useState(src || DEFAULT_BKGD)
    return (
        <Image
            {...props}
            src={imgSrc}
            alt={alt}
            onError={() => setImgSrc(DEFAULT_BKGD)}
        />
    )
}
