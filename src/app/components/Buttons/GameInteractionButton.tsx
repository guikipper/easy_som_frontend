import React from 'react';
import styles from '../../styles/GameInteractionButton.module.css';

interface GameInteractionButtonProps {
  children: React.ReactNode;
}

const GameInteractionButton: React.FC<GameInteractionButtonProps> = ({ children }) => {
  return (
    <button className={styles.gameInteractionButton}>
      {children}
    </button>
  );
};

export default GameInteractionButton; 