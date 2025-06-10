"use client";

import React from 'react';
import styles from "../styles/Navbar.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar: React.FC = () => {
  const router = useRouter();

  return (
    <div className={styles.navbar}>
      <Link href="/" legacyBehavior>
        <a>
          <h1 className={styles.title}>EasySom</h1>
        </a>
      </Link>  

      <ul className={styles.linksList}>
        <li>
          <Link href="/" legacyBehavior>
            <a>
              <p>Home</p>
            </a>
          </Link>  
        </li>

        <li>
          <Link href="/intervals/exercise-config" legacyBehavior>
            <a>
              <p>Intervalos</p>
            </a>
          </Link>  
        </li>

        <li>
          <Link href="/intervals/theory" legacyBehavior>
            <a>
              <p>Dicionário</p>
            </a>
          </Link>  
        </li>

        <li>
          <Link href="/about" legacyBehavior>
            <a>
              <p>Sobre</p>
            </a>
          </Link>  
        </li>
      </ul>
    </div>
  );
}

export default Navbar; 