import React from 'react';
import styles from '../styles/RoundsResults.module.css';

interface Result {
  round: number;
  rightAnswer: boolean;
}

interface RoundsResultsProps {
  results: Result[];
}

const RoundsResults: React.FC<RoundsResultsProps> = ({ results }) => {
  return (
    <div className={styles.main}>
      <p>Parabéns você chegou ao fim do exercício.</p>
      <p>Seus Resultados</p>
      <ul>
        {results.map((item, index) => (
          <li key={index}>{item.round}: {item.rightAnswer ? 'Acertou' : 'Errou'}</li>
        ))}
      </ul>
    </div>
  );
};

export default RoundsResults; 