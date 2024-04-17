import styles from '../styles/ResponseFeeback.module.css'

export function ResponseFeedback({message, type}) {
    return (
        <div className={styles.responseContainer}>
            <p className={styles.type}>{message}</p>
        </div>
    )
}