'use client';
import Image from 'next/image'
import styles from './styles/HomePage.module.css'
import Link from 'next/link'

export default function Home() {

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
          <button className={styles.getStarted}>
            <Link href="/intervals/exercise-config" legacyBehavior>
              <a className={styles.linkStyle}>Comece Agora</a>
            </Link>
          </button>
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
