import TourSection from "./TourSection"
import styles from '../TourPage.module.css'

function TourSummaryContent({tour}) {
    let summary = tour.summary
    if (!summary) return

    return (
        <table className={styles.TourSummaryTable}>
            <tbody>
                <tr>
                    <td>Starting From</td>
                    <td><b>{summary.start}</b></td>
                    <td>Ending at</td>
                    <td><b>{summary.end}</b></td>
                </tr>
                <tr>
                    <td>No of days</td>
                    <td>{summary.days}</td>
                    <td>Number of nights</td>
                    <td>{summary.nights}</td>
                </tr>
                <tr>
                    <td colSpan={1}>Night stays at</td>
                    <td colSpan={3}>{summary.staysat.map((at, i) => {return <p key={i}><b>{at}</b></p>})}</td>
                </tr>
            </tbody>
        </table>
    )
}

export default function TourSummary({ tour }) {
    if (!tour.summary) return null

    return <TourSection title={tour.summary.title} content={<TourSummaryContent tour={tour} />} type="component" />
}
