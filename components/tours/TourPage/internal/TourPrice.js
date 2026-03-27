import React, { useState } from "react"
import TourPriceDetails from "./TourPriceDetails"
import styles from '../TourPage.module.css'
import FullScreenOverlay from "@/components/common/FullScreenOverlay/FullScreenOverlay"
import CloseButton from "@/components/common/CloseButton/CloseButton"

function GroupTourPrice({tour}) {
    return (
        <TourPriceDetails tour={tour} type='group' />
    )
}

function CustomTourPrice({tour}) {
    return (
        <TourPriceDetails tour={tour} type='custom' />
    )
}

function ShowAllTourPrice({tour}) {
    return (
        <>
            <h3>Show All Prices</h3>
            { tour.price.custom.length ? <TourPriceDetails tour={tour} type='custom' /> : null }
            { tour.price.group.length ? <TourPriceDetails tour={tour} type='group' /> : null }
        </>
    )
}

const priceMenu = [
    { label: 'ShowAll', text: 'Show All Prices', component: ShowAllTourPrice},
    { label: 'CT', text: 'Customised Tour Prices', component: CustomTourPrice},
    { label: 'GT', text: 'Group Tour Prices', component: GroupTourPrice},
]

function GetActiveComponent(activeTab) {
    for (var i=0; i<priceMenu.length; i++)
        if (activeTab === priceMenu[i].label)
            return priceMenu[i].component
    return null
}

function TourPriceMenuItem({activeTab, setActiveTab}) {
    return (
        priceMenu.map((pm, i) => {
            return (
                <div key={i} className={activeTab === pm.label ? styles.PriceActiveMenu :  styles.PriceInactiveMenu}
                    onClick={() => setActiveTab(pm.label)}>
                    <p>{pm.text}</p>
                </div>
            )
        })
    )
}

function TourPriceMenu({activeTab, setActiveTab}) {
    return (
        <div className={styles.TourPriceMenu}>
            <TourPriceMenuItem activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
    )
}

export default function TourPrice({ tour, onClose }) {
    const [activeTab, setActiveTab] = useState('ShowAll')
    const ShowActiveMenuDetails = GetActiveComponent(activeTab)

    return (
        <FullScreenOverlay showClose={false}>
            <div className={styles.TourPrice}>
                <CloseButton onClose={onClose} />
                <h2>Price for {tour.title}</h2>
                <TourPriceMenu activeTab={activeTab} setActiveTab={setActiveTab} />
                <ShowActiveMenuDetails tour={tour} />
            </div>
        </FullScreenOverlay>
    )
}
