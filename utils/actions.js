import { FooterContent } from "@/travel-components/Footer/FooterContent";
import { WhatsAppURL, BrandName } from "./constants"
import FooterContentView from "@/travel-components/Footer/FooterContentView";

export function GetLowestPrice(price) {
    if (!price) return 0
                    
    let lprice = 10000000;
    price.custom?.forEach(ct => {
        if (ct.oprice < lprice) lprice = ct.oprice;
        if (ct.price < lprice) lprice = ct.price;
    })
                
    price.group?.forEach(gt => {
        if (gt.oprice < lprice) lprice = gt.oprice;
        if (gt.price < lprice) lprice = gt.price;
    })
                    
    return (lprice === 10000000) ? 0 : lprice
}

export async function GetTours(url, errstr) {
    try {
        const res = await fetch(url)
        if (!res.ok)
            return { props: {data: {err: res.status, errstr }}}
    
        const data = await res.json()
        return data
    }
    catch (e) {
        console.error('Could not fetch from backend: ' + errstr + ' Error: ' + e)
        return null
    }
}

export function SendWhatsAppMessage(router = null, text) {
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

export function SendGAEvent(type, eventProps) {
    if (window.gtag) {
        window.gtag('event', type, eventProps)
    }
}

export function ShowPages({router, page}) {
    const contentInfo = FooterContent.policies.find(p => p.name === page) || null
    return ( 
        <>
        {
            contentInfo && <FooterContentView content={contentInfo} onClose={() => router.push('/')} /> 
        }
        </>
    )
}