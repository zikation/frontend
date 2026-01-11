import React, { useState } from "react"
import { useRouter } from 'next/router'
import styles from '../TourPage.module.css'

function NoTourPrice({type}) {
    if (type === 'group')
        return (
            <div className={styles.TourPriceDetails}>
                <p>We do not have any group tours planned for this itinerary.</p>
                <p>We can arrange one if there are enough number of people interested.</p>
                <p>Please contact us and let us know your preferred dates of travel.</p>
                <p>We will get back if a group is formed.</p>
            </div>
        )

    if (type === 'custom')
        return (
            <div className={styles.TourPriceDetails}>
                <p>We haven't updated the site with the prices for customised / private tours to this location.</p>
                <p>If you want a quote, please contact us and let us know your preferred dates of travel and the number of people travelling.</p>
                <p>We will get back to you with a quote.</p>
            </div>
        )
    
    return null
}

function BookNowButton({tour, priceid}) {
    const router = useRouter()
    return (
        <button className={styles.BookNow} onClick={() => router.push(
            `/book/tour/${tour.slug}?location=${tour.location}&sublocation=${tour.sublocation}&priceid=${priceid}`
          )}>
            Book Now
        </button>
    )
}

function ShowTableBodyForGroupTours({tour, activeTour, setActiveTour, onOptionClick}) {
    return (
        <tbody>
        {
            tour.price.group
                .sort((a, b) => a.batch.date > b.batch.date ? 1 : -1)
                .map((batch, i) => {
                var finalprice = batch.price < batch.oprice ? batch.price : batch.oprice
                var oprice = (batch.oprice != finalprice) ? <p className={styles.PriceStrikeThrough}>₹{batch.oprice}</p> : null
                const formattedDate = new Date(batch.batch.date).toLocaleDateString('en-IN', {year: 'numeric', month: 'long', day: 'numeric'})
                        
                return (
                    <React.Fragment key={i}>
                        <tr className={activeTour === i ? styles.PriceMenuDetailActive : styles.PriceMenuDetailInactive}>
                            <td>{batch.batch.info}</td>
                            <td>{formattedDate}</td>
                            <td>
                                {oprice}
                                <p className={styles.FinalPrice}>₹{finalprice}</p>
                            </td>
                            <td className={styles.PriceLink} onClick={() => {setActiveTour(i); onOptionClick(batch)}}><p>View Details</p></td>
                            <td onClick={() => {setActiveTour(i); onOptionClick(batch)}}><BookNowButton tour={tour} priceid={batch._id} /></td>
                        </tr>
                    </React.Fragment>
                )
            })
        }
        </tbody>
    )
}

function ShowTableBodyForCustomTours({tour, activeTour, setActiveTour, onOptionClick}) {
    return (
        <tbody>
        {
            tour.price.custom
                .sort((a, b) => a.adults > b.adults ? 1 : -1)
                .map((option, i) => {
                var finalprice = option.price < option.oprice ? option.price : option.oprice
                var oprice = (option.oprice != finalprice) ? <p className={styles.PriceStrikeThrough}>₹{option.oprice}</p> : null
                        
                return (
                    <React.Fragment key={i}>
                        <tr className={activeTour === i ? styles.PriceMenuDetailActive : styles.PriceMenuDetailInactive}>
                            <td>{option.adults}</td>
                            <td>{option.name}</td>
                            <td>
                                {oprice}
                                <p className={styles.FinalPrice}>₹{finalprice}</p>
                            </td>
                            <td className={styles.PriceLink} onClick={() => {setActiveTour(i); onOptionClick(option)}}><p>View Details</p></td>
                            <td onClick={() => {setActiveTour(i); onOptionClick(option)}}><BookNowButton tour={tour} priceid={option._id} /></td>
                        </tr>
                    </React.Fragment>
                )
            })
        }
        </tbody>
    )
}

function ShowTableHeaders({type}) {
    const tableHeaders = (type === 'custom') ? ['No. of persons', 'Name', 'Price', 'Details', 'Booking'] :
        ['Batch Name', 'Batch Date', 'Price', 'Details', 'Booking']

    return (
        <thead><tr>
        {
            tableHeaders.map((th, i) => {return <th key={i}>{th}</th>})
        }
        </tr></thead>
    )
}

function ShowTableBody({tour, type, activeTour, setActiveTour, onOptionClick}) {
    if (type === 'group')
        return <ShowTableBodyForGroupTours tour={tour} activeTour={activeTour} setActiveTour={setActiveTour} onOptionClick={onOptionClick} />

    if (type === 'custom')
        return <ShowTableBodyForCustomTours tour={tour} activeTour={activeTour} setActiveTour={setActiveTour} onOptionClick={onOptionClick} />

    return null
}

function GetPriceTable({tour, type, onOptionClick}) {
    var [activeTour, setActiveTour] = useState(null)

    return (
        <table className={styles.GetAllPriceTable}>
            <ShowTableHeaders type={type} />
            <ShowTableBody tour={tour} type={type} activeTour={activeTour} setActiveTour={setActiveTour} onOptionClick={onOptionClick} />
        </table>
    )
}

function ShowOptionDetails({ option }) {
    return (
        <div className={styles.PriceOptionDetails}>
            <ShowAdditionalInformation option={option} />
            <ShowOptionalPackage option={option} />
            <ShowPriceSections option={option} />
        </div>
    );
}

function PriceShowDetails({tour, type}) {
    const [selectedOption, setSelectedOption] = useState(null)
    return (
        <>
            <GetPriceTable tour={tour} type={type} onOptionClick={(touroption) => setSelectedOption(touroption)} />
            {selectedOption && (<ShowOptionDetails option={selectedOption} />)}
        </>
    )
}

function ShowAdditionalInformation({option}) {
    if (!option.info || !Array.isArray(option.info) || option.info.length < 1) return null

    return (
        <>
            <h3>Additional Information</h3>
            {
                option.info.map((inf, i) => (
                    <p key={i}>{inf}</p>
                ))
            }
        </>
    )
}

function ShowOptionalPackage({option}) {
    if (!option.extra || !Array.isArray(option.extra) || option.extra.length < 1) return null

    return (
        <>
            <h3>Optional Package</h3>
            <table className={styles.OptionalPackage}>
                <tbody>
                    {
                        option.extra.map((ex, i) => {
                            return (
                                <tr key={i}>
                                    <td>{ex.for}</td>
                                    <td>₹{ex.price}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </>
    )
}

function ShowPriceSections({option}) {
    var priceSections = option.priceSections
    if (!priceSections || !Array.isArray(priceSections || priceSections.length < 1)) return null

    return (
        <>
            {
                priceSections.map((section, i) => {
                    let content = null
                    let type = section.type
                    if (!type || type === "none")
                        content = section.details.map((d, i) => {return <p key={i}>{d}</p>})
                    else if (type === "bullet")
                        content = (
                                <ul>
                                    {section.details.map((d, j) => (
                                        <li key={j}>{d}</li>
                                    ))}
                                </ul>
                            )
                        else if (type === "numbered") {
                            content = (
                                <ol>
                                    {section.details.map((d, j) => (
                                        <li key={j}>{d}</li>
                                    ))}
                                </ol>
                            )
                        } else {
                            content = null
                        }
                    return (
                        <React.Fragment key={i}>
                            <h3>{section.title}</h3>
                            {content}
                        </React.Fragment>
                    )
                })
            }
        </>
    )
}

function ShowTourTypeDetails(tour, type) {
    var heading = (type ==='group') ? 'Group Tour Batches' : 'Customised Tour Options'
    return (
        <>
            <h3>{heading}</h3>
            <PriceShowDetails tour={tour} type={type} />
        </>
    )
}

export default function TourPriceDetails({tour, type}) {
    var arr = type === 'group' ? tour.price.group : tour.price.custom
    if (!arr || !Array.isArray(arr) || arr.length <= 0) 
        return <NoTourPrice type={type} />

    return (
        <div className={styles.TourPriceDetails}>
            {ShowTourTypeDetails(tour, type)}
        </div>
    )
}
