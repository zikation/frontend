export const GetLowestPrice = price => {
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
