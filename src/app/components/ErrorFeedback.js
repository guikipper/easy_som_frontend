
import styles from '../styles/ErrorFeedback.module.css'
export default function ErrorFeedback({feedback}) {
    return (
        <div className={styles.feedbackDiv}>
            <h2 className={styles.feedback}>{feedback}</h2>
        </div>
    )
}