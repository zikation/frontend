import styles from './TrekPage.module.css'

const TrekSummary = ({summary}) => {
    return summary ? (
        <table className={styles.TrekSummaryTable}>
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
    ) : null
}

export default TrekSummary