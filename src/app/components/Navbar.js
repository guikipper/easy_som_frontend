"use client";

import styles from "../styles/Navbar.module.css";
import { useState, useEffect } from "react";
import Link from "next/link";
import Loading from "./Loading";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [showLoading, setShowLoading] = useState(false)

  const router = useRouter()

  useEffect(() => {
  }, [router])

  const handleShowLoading = () => {
    //setShowLoading(true)
  }

  return (
    <div className={styles.navbar}>
      <h1>Harmonic Wave</h1>

      <ul className={styles.linksList}>
        <li>
          <Link href="/" legacyBehavior>
            <a>
              <p onClick={handleShowLoading}>Home</p>
            </a>
          </Link>  
        </li>

        <li>
          <Link href="/intervals/exercise-config" legacyBehavior>
              <a>
                <p onClick={handleShowLoading}>Intervalos</p>
              </a>
          </Link>  
        </li>

        {/* <li>
          <Link href="./intervals" legacyBehavior>
              <a>
                <p>Acordes</p>
              </a>
          </Link> 
        </li>

        <li>
          <Link href="./intervals" legacyBehavior>
              <a>
                <p>Escalas</p>
              </a>
          </Link> 
        </li> */}

        {showLoading && (
          <div className={styles.loading}>
           <Loading/>
          </div>
        )}

      </ul>
    </div>
  );
}
