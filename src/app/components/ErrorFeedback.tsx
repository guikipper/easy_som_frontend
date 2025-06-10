import React from 'react';
import styles from '../styles/ErrorFeedback.module.css';

interface ErrorFeedbackProps {
  feedback: string;
}

const ErrorFeedback: React.FC<ErrorFeedbackProps> = ({ feedback }) => {
  return (
    <div className={styles.feedbackDiv}>
      <h2 className={styles.feedback}>{feedback}</h2>
    </div>
  );
};

export default ErrorFeedback; 