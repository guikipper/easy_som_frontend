import styles from '../styles/IntervalsTable.module.css'

export default function IntervalsTable() {
    return (
        <div className={styles.main}>
            <div className={styles.left}>
                <ul>
                    <li>1ª Justa</li>
                    <li>2ª Menor</li>
                    <li>2ª Maior</li>
                    <li>3ª Menor</li>
                    <li>3ª Maior</li>
                    <li>4ª Justa</li>
                    <li>4ª Aumentada</li>
                    <li>5ª Diminuta</li>
                    <li>5ª Justa</li>
                    <li>5ª Aumentada</li>
                    <li>6ª Menor</li>
                    <li>6ª Maior</li>
                    <li>7ª Diminuta</li>
                    <li>7ª Menor</li>
                    <li>7ª Maior</li>
                    <li>8ª Justa</li>
                </ul>
            </div>
            <div className={styles.right}>
                <ul>
                    <li>0 Tom</li>
                    <li>0,5 Tom</li>
                    <li>1 Tom</li>
                    <li>1,5 Tom</li>
                    <li>2 Tons</li>
                    <li>2,5 Tons</li>
                    <li>3 Tons</li>
                    <li>3 Tons</li>
                    <li>3,5 Tons</li>
                    <li>4 Tons</li>
                    <li>4 Tons</li>
                    <li>4,5 Tons</li>
                    <li>4,5 Tons</li>
                    <li>5 Tons</li>
                    <li>5,5 Tons</li>
                    <li>6 Tons</li>
                </ul>
            </div>
        </div>
    )
}