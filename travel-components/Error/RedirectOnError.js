import { useState } from 'react'
import { useRouter } from 'next/router'
import styles from './RedirectOnError.module.css'

export default function RedirectOnError({ message = 'Oops! Something went wrong!', url = '/', buttonText = 'Go To Homepage'}) {
    const [visible, setVisible] = useState(true)
    const router = useRouter()

    const redirectOnError = () => {
        setVisible(false)
        router.push(url)
    }

    if (!visible) return null

    return (
        <div className={styles.ErrorOverlay}>
            <div className={styles.ErrorBox}>
                <p className={styles.ErrorMessage}>{message}</p>
                <button className={styles.ErrorButton} onClick={redirectOnError}>{buttonText}</button>
            </div>
        </div>
    )
}
