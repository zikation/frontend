import { WhatsAppURL, BrandName } from "./constants"

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
        return data.tours
    }
    catch (e) {
        console.error('Could not fetch from backend: ' + errstr + ' Error: ' + e)
        return null
    }
}

export function SendWhatsAppMessage(text, tourSlug=null) {
    var url = WhatsAppURL + "&text=" 
    url += tourSlug ? encodeURIComponent("Hey " + BrandName + "! Interested in Tour ID: " + tourSlug + "\n" + text) : encodeURIComponent(text)
    window.open(url, "_blank")
}

