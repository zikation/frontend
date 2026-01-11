import { BrandName } from '@/utils/constants'
import styles from './WhatsApp.module.css'
import { SendWhatsAppMessage } from '@/utils/actions'
import { useState, useEffect } from 'react'


export function ChatOnWhatsApp() {
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])
    
    function renderWhatsAppIcon() {
        if (!isClient) return null

        const text = "Hey " + BrandName + "! Please help me book my tour."

        const alttext = "WhatsApp " + BrandName
        return (
            <div className={styles.WhatsAppDiv} onClick={() => SendWhatsAppMessage(text)}>
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

