"use client";

import styles from "../styles/Navbar.module.css";
import Link from "next/link";

export default function Navbar() {

  const handleLogout = ()=> {
    localStorage.clear();
  }

  return (
    <div className={styles.navbar}>
      <h1>Learn Music</h1>

      <ul className={styles.linksList}>
        <li>
          <Link href="./" legacyBehavior>
            <a>
              <p>Home</p>
            </a>
          </Link>  
        </li>

        <li>
          <Link href="/intervals" legacyBehavior>
              <a>
                <p>Intervals</p>
              </a>
          </Link>  
        </li>

        <li>
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
        </li>

        <li>
          <Link href="./login" legacyBehavior>
              <a>
                <p onClick={handleLogout}>Logout</p>
              </a>
          </Link> 
        </li>

      </ul>
    </div>
  );
}
