import SendGAEvent from "@/components/common/analytics/GAUtils"
import { BrandName, WhatsAppURL } from "@/utils/constants"

const SendWhatsAppMessage = (router = null, text) => {
    const path = router?.asPath || '/'
    const fullUrl = typeof window !== 'undefined' ? window.location.origin + path : path

    if (typeof window !== 'undefined')
        SendGAEvent('whatsapp_click', {
            event_category: 'contact',
            event_label: path,
            page_url: fullUrl
        })

    const message = text ? text : encodeURIComponent(`Hey ${BrandName}, I'm interested in this page:\n${fullUrl}`)
    const waUrl = `${WhatsAppURL}?text=${message}`
    window.open(waUrl, '_blank')
}

export default SendWhatsAppMessage
