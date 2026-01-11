import React, { useState } from "react"
import TourPriceDetails from "./TourPriceDetails"
import styles from '../TourPage.module.css'

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
            <TourPriceDetails tour={tour} type='custom' />
            <TourPriceDetails tour={tour} type='group' />
        </>
    )
}

const priceMenu = [
    { label: 'ShowAll', text: 'Show All Prices', component: ShowAllTourPrice},
    { label: 'CT', text: 'Customised Tour Prices', component: CustomTourPrice},
    { label: 'GT', text: 'Group Tour Prices', component: GroupTourPrice},
]

const TourPriceCrossButton = ({onClose}) => <p className={styles.TourPriceCrossButton} onClick={onClose}>X</p>

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
        <div className={styles.TourPriceOverlay}>
            <div className={styles.TourPrice}>
                <TourPriceCrossButton onClose={onClose} />
                <h2>Price for {tour.title}</h2>
                <TourPriceMenu activeTab={activeTab} setActiveTab={setActiveTab} />
                <ShowActiveMenuDetails tour={tour} />
            </div>
        </div>
    )
}
