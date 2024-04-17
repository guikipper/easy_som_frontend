import styles from '../styles/ResponseFeeback.module.css'

export function ResponseFeedback({message, type, details}) {
    return (
        <div className={`${styles.responseContainer} ${type === 'success' ? styles.successDiv : (type === 'error' ? styles.errorDiv : '')}`}>
            <ul>
            <li className={`${styles.responseContainer} ${type === 'success' ? styles.success : (type === 'error' ? styles.error : '')}`}>{message}</li>
            { details.length > 1 && (
                <li className={`${styles.responseContainer} ${type === 'success' ? styles.success : (type === 'error' ? styles.error : '')}`}>{details}</li>
            )}
            </ul>            
        </div>
    )
}