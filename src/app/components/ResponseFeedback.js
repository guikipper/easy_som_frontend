import styles from '../styles/ResponseFeeback.module.css'

export function ResponseFeedback({message, type, details}) {
    return (
        <div className={`${styles.responseContainer} ${type === 'success' ? styles.successDiv : styles.errorDiv}`}>
            <ul>
            <li className={`${type === 'success' ? styles.success : styles.error}`}>{message}</li>
            { details.length > 1 && (
                <li className={`${type === 'success' ? styles.success : styles.error}`}>{details}</li>
            )}
            </ul>
            
            
        </div>
    )
}