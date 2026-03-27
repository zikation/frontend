import { useState, useEffect } from "react"
import Link from "next/link"
import styles from "./SlideShow.module.css"

const SlideShow = ({ slides = [], interval = 5000 }) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isPaused, setIsPaused] = useState(false)

    useEffect(() => {
        if (!slides || slides.length <= 1) return

        const timer = setInterval(() => {
            if (!isPaused) {
                setCurrentIndex((prev) => (prev + 1) % slides.length)
            }
        }, interval)

        return () => clearInterval(timer)
    }, [slides, interval, isPaused])

    if (!slides || slides.length === 0) return null

    const currentSlide = slides[currentIndex]

    const renderPromoSlide = (slide) => (
        <Link href={slide.link} className={styles.promoSlide}>
            <img src={slide.image} alt={slide.title || "Slide"} className={styles.slideImage} />
            <div className={styles.overlay}>
                {slide.title && <h2 className={styles.title}>{slide.title}</h2>}
                {slide.subtitle && <h3 className={styles.subtitle}>{slide.subtitle}</h3>}
                {slide.caption && <p className={styles.caption}>{slide.caption}</p>}
                {slide.link && slide.linkText && (<p className={styles.button}>{slide.linkText}</p>)}
            </div>
        </Link>
    )

    const renderTestimonialSlide = (slide) => (
        <div
            className={styles.testimonialSlide}
            style={{
                backgroundImage: slide.image ? `url(${slide.image})` : undefined,
            }}
        >
            <div className={styles.testimonialContent}>
                {slide.text && <p className={styles.text}>"{slide.text}"</p>}
                {slide.name && <p className={styles.name}>{slide.name}</p>}
                {slide.location && <p className={styles.location}>{slide.location}</p>}
            </div>
        </div>
    )

    return (
        <div className={styles.slideShow} onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
            {slides.map((slide, idx) => (
                <div key={idx} className={`${styles.slide} ${idx === currentIndex ? styles.active : ""}`}>
                    {
                        slide.type === "promo" ? renderPromoSlide(slide) : renderTestimonialSlide(slide)
                    }
                </div>
            ))}
    
            {slides.length > 1 && (
                <div className={styles.dots}>
                    {slides.map((_, idx) => (
                        <span key={idx} className={`${styles.dot} ${ idx === currentIndex ? styles.active : "" }`}
                            onClick={() => setCurrentIndex(idx)} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default SlideShow
