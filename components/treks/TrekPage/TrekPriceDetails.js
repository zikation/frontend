import React, { useState } from "react"
import styles from './TrekPage.module.css'
import { useRouter } from "next/router"
import FullScreenOverlay from "@/components/common/FullScreenOverlay/FullScreenOverlay"
import CloseButton from "@/components/common/CloseButton/CloseButton"

const NoTrekPrice = () => {
    return (
        <div className={styles.TrekPriceDetails}>
            <p>We do not have any batches for this trek.</p>
            <p>We can arrange one if there are enough number of people interested.</p>
            <p>Please contact us and let us know your preferred dates of travel.</p>
            <p>We will get back if a group is formed.</p>
        </div>
    )
}

const ShowAdditionalInformation = ({option}) => {
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

const ShowOptionalPackage = ({option}) => {
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

const ShowPriceSections = ({option}) => {
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


const ShowOptionDetails = ({ option }) => {
    return (
        <div className={styles.PriceOptionDetails}>
            <ShowAdditionalInformation option={option} />
            <ShowOptionalPackage option={option} />
            <ShowPriceSections option={option} />
        </div>
    )
}

const ShowTableHeaders = () => {
    const tableHeaders = ['Batch Name', 'Batch Date', 'Price', 'Details', 'Booking']
    return (
        <thead><tr>
        {
            tableHeaders.map((th, i) => {return <th key={i}>{th}</th>})
        }
        </tr></thead>
    )
}

const BookNowButton = ({trek, priceid}) => {
    const router = useRouter()
    return (
        <button className={styles.BookNow} onClick={() => router.push(
            `/book/trek/${trek.slug}?priceid=${priceid}` //location=${tour.location}&sublocation=${tour.sublocation}&`
          )}>
            Book Now
        </button>
    )
}


const ShowTableBodyForTreks = ({trek, activeTrek, setActiveTrek, onOptionClick}) => {
    return (
        <tbody>
        {
            trek.price
                .sort((a, b) => a.batch.date > b.batch.date ? 1 : -1)
                .map((batch, i) => {
                var finalprice = batch.price < batch.oprice ? batch.price : batch.oprice
                var oprice = (batch.oprice != finalprice) ? <p className={styles.PriceStrikeThrough}>₹{batch.oprice}</p> : null
                const formattedDate = new Date(batch.batch.date).toLocaleDateString('en-IN', {year: 'numeric', month: 'long', day: 'numeric'})
                        
                return (
                    <React.Fragment key={i}>
                        <tr className={activeTrek === i ? styles.PriceMenuDetailActive : styles.PriceMenuDetailInactive}>
                            <td>{batch.batch.info}</td>
                            <td>{formattedDate}</td>
                            <td>
                                {oprice}
                                <p className={styles.FinalPrice}>₹{finalprice}</p>
                            </td>
                            <td className={styles.PriceLink} onClick={() => {setActiveTrek(i); onOptionClick(batch)}}><p>View Details</p></td>
                            <td onClick={() => {setActiveTrek(i); onOptionClick(batch)}}><BookNowButton trek={trek} priceid={batch._id} /></td>
                        </tr>
                    </React.Fragment>
                )
            })
        }
        </tbody>
    )
}


const ShowTableBody = ({trek, activeTrek, setActiveTrek, onOptionClick}) =>
    <ShowTableBodyForTreks trek={trek} activeTrek={activeTrek} setActiveTrek={setActiveTrek} onOptionClick={onOptionClick} />



const GetPriceTable = ({trek, onOptionClick}) => {
    var [activeTrek, setActiveTrek] = useState(null)

    return (
        <table className={styles.GetAllPriceTable}>
            <ShowTableHeaders />
            <ShowTableBody trek={trek} activeTrek={activeTrek} setActiveTrek={setActiveTrek} onOptionClick={onOptionClick} />
        </table>
    )
}

const PriceShowDetails = ({trek}) => {
    const [selectedOption, setSelectedOption] = useState(null)
    return (
        <>
            <GetPriceTable trek={trek} onOptionClick={(touroption) => setSelectedOption(touroption)} />
            {selectedOption && (<ShowOptionDetails option={selectedOption} />)}
        </>
    )
}

const TrekPriceDetails = ({trek, onClose}) => {
    var arr = trek.price
    if (!arr || !Array.isArray(arr) || arr.length <= 0) 
        return <NoTrekPrice />

    return (
        <FullScreenOverlay showClose={false}>
            <div className={styles.TrekPrice}>
                <CloseButton onClose={onClose} />
                <h2>Price for {trek.title}</h2>
                <div className={styles.TrekPriceDetails}>
                    {PriceShowDetails({trek})}
                </div>
            </div>
        </FullScreenOverlay>
    )
}

export default TrekPriceDetails