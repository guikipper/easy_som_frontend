'use client'

import styles from '../styles/Intervals.module.css'
import Link from 'next/link'

const Intervals: React.FC = () => {
  return (
    <>
      <div className={styles.intervals}>
        <div className={styles.intervalsOptions}>
          <h1>Escolha uma opção:</h1>
          <div className={styles.buttons}>
            <Link href="./intervals/theory">
              <button type="button" className="btn btn-primary">
                Teoria
              </button>
            </Link>

            <Link href="./intervals/exercise-config">
              <button type="button" className="btn btn-primary">
                Exercícios
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Intervals 