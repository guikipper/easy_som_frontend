import React from 'react';
import styles from '../styles/Alert.module.css';

interface AlertProps {
  type: 'success' | 'danger' | 'warning' | 'info';
  message: string;
}

const Alert: React.FC<AlertProps> = ({ type, message }) => {
  return (
    <div className={`alert alert-${type} ${styles.alert}`} role="alert"> 
      {message}
    </div>
  );
};

export default Alert; 