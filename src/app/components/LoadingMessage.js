import Loading from "./Loading"
import styles from '../styles/LoadingMessage.module.css'

export default function LoadingMessage({message}) {
    return (
        <div className={styles.loadingImage}>
                <div className={styles.loadingImageContent}>
                  <h3>{message}</h3>
                  <Loading/>
                </div> 
        </div>
    )
}