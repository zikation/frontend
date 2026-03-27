import { useState } from 'react'
import styles from './FooterMenu.module.css'
import FooterContentView from './FooterContentView'
import { FooterContent } from './FooterContent'

export default function FooterMenu() {
    const [content, setContent] = useState(null)
    const contentInfo = FooterContent.policies.find(p => p.name === content) || null
  
    return (
        <>
            <div className={styles.FooterWrapper}>
                <p className={styles.FooterHeader}>Policies</p>
                <ul>
                    <li className={styles.FooterLinks} onClick={() => setContent("payment")}>Payment Policy</li>
                    <li className={styles.FooterLinks} onClick={() => setContent("cancellation")}>Cancellation Policy</li>
                    <li className={styles.FooterLinks} onClick={() => setContent("privacy")}>Privacy Policy</li>
                    <li className={styles.FooterLinks} onClick={() => setContent("tnc")}>Terms & Conditions</li>
                </ul>
        
                <p className={styles.FooterHeader}>About</p>
                <ul>
                    <li className={styles.FooterLinks} onClick={() => setContent("about")}>About Us</li>
                    <li className={styles.FooterLinks} onClick={() => setContent("contact")}>Contact Us</li>
                </ul>
            </div>
    
            <FooterContentView content={contentInfo} onClose={() => setContent(null)} />
        </>
    )
}
  