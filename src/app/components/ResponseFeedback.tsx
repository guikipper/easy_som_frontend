import React from 'react';
import styles from '../styles/ResponseFeeback.module.css';

interface ResponseFeedbackProps {
  message: string;
  type: 'success' | 'error';
  details: string;
}

export const ResponseFeedback: React.FC<ResponseFeedbackProps> = ({ message, type, details }) => {
  return (
    <div className={`${styles.responseContainer} ${type === 'success' ? styles.successDiv : (type === 'error' ? styles.errorDiv : '')}`}>
      <ul>
        <li className={`${styles.responseContainer} ${type === 'success' ? styles.success : (type === 'error' ? styles.error : '')}`}>{message}</li>
        {details.length > 1 && (
          <li className={`${styles.responseContainer} ${type === 'success' ? styles.success : (type === 'error' ? styles.error : '')}`}>{details}</li>
        )}
      </ul>            
    </div>
  );
}; 