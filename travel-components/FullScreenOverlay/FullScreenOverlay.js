import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import styles from "./FullScreenOverlay.module.css"

export default function FullScreenOverlay({ children, onClose, showClose = true }) {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return createPortal(
        <div className={styles.Overlay}>
            {
                showClose && (<button className={styles.CloseButton} onClick={onClose} aria-label="Close">X</button>)
            }
            {children}
        </div>,
        document.body
    )
}
