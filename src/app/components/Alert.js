import styles from '../styles/Alert.module.css'

export default function Alert({type, message}) {

    return (
        <div className={`alert alert-${type} ${styles.alert}`} role="alert"> 
            {message}
        </div>
    )
}