import { useState, useRef, useEffect } from "react"
import { forwardRef } from "react"
import { BrandName, FaceBookURL, InstagramURL, xURL, YouTubeURL } from '@/utils/constants'
import FooterMenu from "./FooterMenu"
import styles from './Footer.module.css'

const FooterSocialIcons = () => {
    return (
        <div className={styles.SocialIcons}>
            <a href={FaceBookURL} target="_blank" aria-label="Facebook"><img src="/icons/facebook.svg" alt={BrandName + " Facebook Page"} /></a>
            <a href={InstagramURL} target="_blank" aria-label="Instagram"><img src="/icons/instagram.svg" alt={BrandName + " Instagram Page"} /></a>
            <a href={xURL} target="_blank" aria-label="Twitter"><img src="/icons/x.svg" alt={BrandName + " Twitter / X Page"} /></a>
            {/* <a href={YouTubeURL} target="_blank" aria-label="YouTube"><img src="/icons/youtube.svg" alt={BrandName + " YouTube Link"} /></a> */}
        </div>
    )
}

const FooterCopyright = () => {
    return <p className={styles.Copy}>© {new Date().getFullYear()} {BrandName}</p>
}

const FooterMenuWrapper = forwardRef(function FooterMenuWrapper(
    { open, setOpen, isTouch },
    ref
  ) {
    return (
        <div ref={ref}
            className={`${styles.LeftWrapper} ${open ? styles.Open : ""}`}
            onClick={() => { if (isTouch.current) setOpen(o => !o) }}
        >
            <div className={styles.Left}>More ▾</div>
            <div className={styles.FooterMenu}><FooterMenu /></div>
        </div>
    )
})

const Footer = () => {
    const [open, setOpen] = useState(false)
    const wrapperRef = useRef(null)
    const isTouch = useRef(false)

    // detect touch device once
    useEffect(() => {
        isTouch.current =
        "ontouchstart" in window || navigator.maxTouchPoints > 0
    }, [])

    // close on outside tap (mobile only)
    useEffect(() => {
        function handleOutside(e) {
            if (
                isTouch.current &&
                wrapperRef.current &&
                !wrapperRef.current.contains(e.target)
            ) {
                setOpen(false)
            }
        }
        document.addEventListener("touchstart", handleOutside);
        return () => document.removeEventListener("touchstart", handleOutside);
    }, [])

    return (
        <div className={styles.Footer}>
            <FooterMenuWrapper ref={wrapperRef} open={open} setOpen={setOpen} isTouch={isTouch} />
            <FooterCopyright />
            <FooterSocialIcons />
        </div>
    )
}

export default Footer
