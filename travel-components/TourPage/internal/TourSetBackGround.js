import Image from "next/image"

export default function TourSetBackGround({tour}) {
    if (!tour.bkgd) return null
    console.log(tour.bkgd.path)

    return (<div className="Hero">
        {tour.bkgd.path && (
          <Image
            src={tour.bkgd.path}
            alt={tour.bkgd.alt}
            fill
            priority
            sizes="100vw"
            className="HeroImage"
          />
        )}
    </div>)
}