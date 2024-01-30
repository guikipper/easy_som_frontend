"use client";

import styles from "../styles/Intervals.module.css";
import Link from "next/link";


export default function Intervals() {
  return (
    <>
      <div className={styles.intervals}>
        <div className={styles.intervalsOptions}>
          <h1>Escolha uma opção:</h1>
          <div className={styles.buttons}>
            <Link href="./intervals/theory" legacyBehavior>
              <button type="button" className="btn btn-primary">
                <a>Teoria</a>
              </button>
            </Link>

            <Link href="./intervals/exercise-config">
              <button type="button" className="btn btn-primary" legacyBehavior>
                <a>Exercícios</a>
              </button>
            </Link>
          </div>
        </div>
      </div>

    </>
  );
}
