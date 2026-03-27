import styles from './CloseButton.module.css'

const CloseButton = ({onClose}) => <button className={styles.CloseButton} onClick={onClose} aria-label="Close">X</button>

export default CloseButton
