import React, { useState, useEffect } from 'react';
import styles from '../styles/AccountPreferences.module.css';
import Link from 'next/link';
import UserMenu from './UserMenu';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { authenticateWithToken } from '../api/services/apiFunctions';
import { usePathname } from 'next/navigation';
import Loading from './Loading';

interface AuthResponse {
  error?: {
    message: string;
  };
  success?: {
    data: {
      email: string;
      name: string;
    };
  };
}

enum AUTH_STATUS {
  CHECKING = 'checking',
  AUTHENTICATED = 'authenticated',
  UNAUTHENTICATED = 'unauthenticated',
}

const AccountPreferences: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [path, setPath] = useState<string>();
  const [showUserMenu, setShowUserMenu] = useState<boolean>(false);
  const [authStatus, setAuthStatus] = useState<AUTH_STATUS>(AUTH_STATUS.CHECKING);
  const pathname = usePathname();

  useEffect(() => {
    setPath(pathname);
  }, [pathname]);

  useEffect(() => {
    const token = Cookies.get('token');
    if (token && token !== 'undefined') {
      setAuthStatus(AUTH_STATUS.AUTHENTICATED);
      authenticate(token);
    } else if (!token) {
      setAuthStatus(AUTH_STATUS.UNAUTHENTICATED);
    }
  }, [path]);

  const handleUserValues = (email: string, name: string): void => {
    setEmail(email);
    setUsername(name);
  };

  const clearCookies = (): void => {
    const allCookies = Cookies.get();
    for (let cookie in allCookies) {
      Cookies.remove(cookie);
    }
  };

  const authenticate = async (token: string): Promise<void> => {
    try {
      const userData: AuthResponse = await authenticateWithToken(token);
      if (userData.error) {
        setAuthStatus(AUTH_STATUS.UNAUTHENTICATED);
        clearCookies();
        router.push('/login');
      } else if (userData.success) {
        handleUserValues(userData.success.data.email, userData.success.data.name);
      }
    } catch (error) {
      console.log('Ocorreu um erro na tentativa de autenticação: ', error);
    }
  };

  const handleUserMenuClick = (): void => {
    setShowUserMenu(!showUserMenu);
  };

  const formatUsername = (username: string): string => {
    if (username.length > 20) {
      return username.slice(0, 20).trim() + '...';
    }
    return username;
  };

  return (
    <>
      {authStatus === AUTH_STATUS.AUTHENTICATED ? (
        <div className={styles.mainAcc}>
          <div className={styles.userMenuIndicator} onClick={handleUserMenuClick}>
            <p>{formatUsername(username)}</p>
          </div>
          <div
            className={`${styles.userMenu} ${
              showUserMenu ? styles.userMenuVisible : styles.userMenuHidden
            }`}
          >
            <UserMenu name={username} email={email} setShowUserMenu={setShowUserMenu} />
          </div>
        </div>
      ) : path !== '/login' && path !== '/signup' ? (
        <div className={styles.mainAcc}>
          <Link href="/login" legacyBehavior>
            <a className={styles.loginLink}>
              {authStatus === AUTH_STATUS.CHECKING && <></>}
              {authStatus === AUTH_STATUS.UNAUTHENTICATED && (
                <div className={styles.loginDivText}>
                  <p>Entrar</p>
                </div>
              )}
            </a>
          </Link>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default AccountPreferences; 