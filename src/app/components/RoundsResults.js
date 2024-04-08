import styles from '../styles/RoundsResults.module.css'

export default function RoundsResults({results}) {
    return (
        <div className={styles.main}>
            <p>Parabéns você chegou ao fim do exercício.</p>
            <p>Seus Resultados</p>
            <ul>
            {results.map((item, index) => (
                <li>{item.round}: {item.rightAnswer ? 'Acertou' : 'Errou'}</li>
            ))}
            </ul>
            
        </div>
    )
}