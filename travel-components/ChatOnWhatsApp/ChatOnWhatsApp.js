import { BrandName } from '@/utils/constants'
import styles from './WhatsApp.module.css'
import { SendWhatsAppMessage } from '@/utils/actions'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'


export function ChatOnWhatsApp() {
    const [isClient, setIsClient] = useState(false)
    const router = useRouter()

    useEffect(() => {
        setIsClient(true)
    }, [])
    
    function renderWhatsAppIcon() {
        if (!isClient) return null

        const alttext = "WhatsApp " + BrandName
        return (
            <div className={styles.WhatsAppDiv} onClick={() => SendWhatsAppMessage(router)}>
                <img src="/icons/WhatsApp.svg" alt={alttext} />
            </div>
        )
    }

    return (
        <>
            {renderWhatsAppIcon()}
        </>
    )
}

