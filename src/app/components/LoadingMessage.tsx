import React from 'react';
import Loading from "./Loading";
import styles from '../styles/LoadingMessage.module.css';

interface LoadingMessageProps {
  message: string;
}

const LoadingMessage: React.FC<LoadingMessageProps> = ({ message }) => {
  return (
    <div className={styles.loadingImage}>
      <div className={styles.loadingImageContent}>
        <h3>{message}</h3>
        <Loading/>
      </div> 
    </div>
  );
};

export default LoadingMessage; 