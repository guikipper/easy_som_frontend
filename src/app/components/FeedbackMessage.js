import styles from '../styles/FeedbackMessage.module.css'
import { intervalConverter } from '../utils/intervalConverter'

export function FeedbackMessage({isRightAnswer, showFeedback, actualInterval}) {
    const intervalToShow = intervalConverter(actualInterval)
    return (
        <div className={styles.feedbackDiv}>
            {isRightAnswer ? (
                showFeedback && (
                    <div className={styles.correctDiv}>
                        <p className={styles.correctText}>
                            Resposta correta!
                        </p>
                        <p className={styles.actualInterval}>Alternativa correta: {intervalToShow}</p>
                    </div>
                )
            ): (
                showFeedback && (
                    <div className={styles.incorrectDiv}>
                        <p className={styles.incorrectText}>
                            Resposta incorreta!
                        </p>
                        <p className={styles.actualInterval}>Alternativa correta: {intervalToShow}</p>
                    </div>
                )
            )}
        </div>
    )
}