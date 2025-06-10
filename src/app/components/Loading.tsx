import React from 'react';
import loading from '../../../public/images/loading.svg';
import styles from '../styles/Loading.module.css';
import Image from 'next/image';

const Loading: React.FC = () => {
  return (
    <div className={styles.loading}>
      <Image src={loading} alt="Loading"/>
    </div>
  );
};

export default Loading; 