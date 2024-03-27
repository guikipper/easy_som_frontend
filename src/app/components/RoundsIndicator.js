import styles from '../styles/RoundsIndicator.module.css'

export default function RoundsIndicator({rounds, results, showCurrentRound}) {

    const roundsArray = Array.from({length: rounds}, (_, index) => index)
    return (
        <>
            <div className={styles.roundsIndicator}>
                {roundsArray.map((round, index) => {
                    let itemClass = styles.item;
                    const isCurrentRound = index === results.length;
                    const isCorrect = results[index] === true;
                    const isIncorrect = results[index] === false;

                    if (isCurrentRound && showCurrentRound) {
                        itemClass = `${styles.item} ${styles.currentRound}`;
                    } else if (isCorrect) {
                        itemClass = `${styles.item} ${styles.correct}`;
                    } else if (isIncorrect) {
                        itemClass = `${styles.item} ${styles.incorrect}`;
                    }

                    return (
                        <div key={round} className={itemClass}></div>
                    );
                })}
            </div>
        </>
    )
}