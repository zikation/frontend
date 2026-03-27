import React from 'react'
import styles from './Background.module.css'

const PhotoIcon = ({ inverted }) => (
    <svg viewBox="0 0 100 100" className={styles.bgIcon}>
        <circle cx="50" cy="50" r="48"
            fill={inverted ? "#B4121B" : "#DBA658"}
            stroke={inverted ? "#DBA658" : "#B4121B"}
            strokeWidth="3"
        />
  
        <rect x="25" y="30" width="50" height="40" rx="6"
            fill="none" stroke={inverted ? "#DBA658" : "#B4121B"}
            strokeWidth="4"
        />
  
      <circle cx="65" cy="38" r="4" fill={inverted ? "#DBA658" : "#B4121B"} />
  
      <path d="M30 65 L45 50 L55 60 L65 50 L70 65 Z" fill={inverted ? "#DBA658" : "#B4121B"} />
    </svg>
)

const BackgroundToggle = ({ showBackgroundOnly, onToggle }) => {
    return (
        <div className={styles.bgToggle} onClick={onToggle}>
            <PhotoIcon inverted={!showBackgroundOnly} />
        </div>
    )
}

export default BackgroundToggle