import { useState, useEffect } from "react"
import Link from "next/link"
import styles from "./SlideShow.module.css"

export default function SlideShow({ slides = [], interval = 5000 }) {
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
        <div className={styles.promoSlide}>
            <img src={slide.image} alt={slide.title || "Slide"} className={styles.slideImage} />
            <div className={styles.overlay}>
                {slide.title && <h2 className={styles.title}>{slide.title}</h2>}
                {slide.subtitle && <h3 className={styles.subtitle}>{slide.subtitle}</h3>}
                {slide.caption && <p className={styles.caption}>{slide.caption}</p>}
                {slide.link && slide.linkText && (
                <Link href={slide.link} className={styles.button}>
                    {slide.linkText}
                </Link>

                )}
            </div>
        </div>
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
        <div
            className={styles.slideShow}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {currentSlide.type === "promo"
                ? renderPromoSlide(currentSlide)
                : renderTestimonialSlide(currentSlide)}

            {/* Navigation dots */}
            {slides.length > 1 && (
                <div className={styles.dots}>
                    {slides.map((_, idx) => (
                        <span
                        key={idx}
                        className={`${styles.dot} ${idx === currentIndex ? styles.active : ""}`}
                        onClick={() => setCurrentIndex(idx)}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}
