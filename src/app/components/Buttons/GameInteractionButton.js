import styles from '../../styles/GameInteractionButton.module.css'

export default function GameInteractionButton({ children }) {
    return (
        <button 
        className={styles.gameInteractionButton}>
           { children  }
        </button>
    )
}