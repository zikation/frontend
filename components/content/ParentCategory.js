import Link from 'next/link'
import styles from './Content.module.css'

const ParentCategory = ({item, category}) => {
    let label = `${item.sublocation} ${category}`
    label = label.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
    
    return (
        <div className={styles.ShowParentCategory}>
            <h2><Link href={`/${item.location}/${item.sublocation}/${category}`}>Show all {label}</Link></h2>
        </div>
    )
}

export default ParentCategory