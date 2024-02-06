'use client';
import React, { useState, useEffect } from 'react';
import Loading from './components/Loading';
import Cookies from 'js-cookie'
import { authenticateWithToken } from './api/services/apiFunctions';
import Image from 'next/image'
import styles from './styles/HomePage.module.css'

export default function Home() {
  const [name, setName] = useState('');
  const [dataLoaded, setDataLoaded] = useState(false);


  return (
    <main>
      <div className={styles.homePageMainDiv}>
        <div className={styles.homePageTitleDiv}>
          <h1>
            Sinta a música de maneira mais profunda, um intervalo de cada vez.
          </h1>
          <h2>
            Melhore sua percepção auditiva com o estudo de intervalos.
          </h2>
        </div>
          
        <div className={styles.imageContainer}>
        <Image
            src="/images/folha-de-notas-musicais.jpg"
            alt="Descrição da imagem"
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
      </div>
      
    </main>
  );
}
