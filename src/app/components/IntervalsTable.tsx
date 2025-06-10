import React from 'react';
import styles from '../styles/IntervalsTable.module.css';

interface IntervalInfo {
  name: string;
  tones: string;
}

const intervals: IntervalInfo[] = [
  { name: '1ª Justa', tones: '0 Tom' },
  { name: '2ª Menor', tones: '0,5 Tom' },
  { name: '2ª Maior', tones: '1 Tom' },
  { name: '3ª Menor', tones: '1,5 Tom' },
  { name: '3ª Maior', tones: '2 Tons' },
  { name: '4ª Justa', tones: '2,5 Tons' },
  { name: '4ª Aumentada', tones: '3 Tons' },
  { name: '5ª Diminuta', tones: '3 Tons' },
  { name: '5ª Justa', tones: '3,5 Tons' },
  { name: '5ª Aumentada', tones: '4 Tons' },
  { name: '6ª Menor', tones: '4 Tons' },
  { name: '6ª Maior', tones: '4,5 Tons' },
  { name: '7ª Diminuta', tones: '4,5 Tons' },
  { name: '7ª Menor', tones: '5 Tons' },
  { name: '7ª Maior', tones: '5,5 Tons' },
  { name: '8ª Justa', tones: '6 Tons' },
];

const IntervalsTable: React.FC = () => {
  return (
    <div className={styles.main}>
      <div className={styles.left}>
        <ul>
          {intervals.map((interval, index) => (
            <li key={index}>{interval.name}</li>
          ))}
        </ul>
      </div>
      <div className={styles.right}>
        <ul>
          {intervals.map((interval, index) => (
            <li key={index}>{interval.tones}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default IntervalsTable; 