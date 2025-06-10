import React from 'react';
import styles from '../styles/Redirecting.module.css';
import Link from 'next/link';

interface RedirectingProps {
  email: string;
}

const Redirecting: React.FC<RedirectingProps> = ({ email }) => {
  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <h1>Confirme seu email</h1>
        <p>Enviamos um email para <strong>{email}</strong></p>
        <p>Clique no link no corpo do email para validar sua conta.</p>
        <button className={styles.loginButton}>
          <Link href="./login" legacyBehavior>
            <a className={styles.loginLink}>
              <p>Login</p>
            </a>
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Redirecting; 