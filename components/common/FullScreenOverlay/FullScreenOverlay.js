import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import CloseButton from "../CloseButton/CloseButton"
import styles from "./FullScreenOverlay.module.css"

const FullScreenOverlay = ({ children, onClose, showClose = true }) => {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return createPortal(
        <div className={styles.Overlay}>
            {
                showClose && (<CloseButton onClose={onClose} />)
            }
            {children}
        </div>,
        document.body
    )
}

export default FullScreenOverlay
