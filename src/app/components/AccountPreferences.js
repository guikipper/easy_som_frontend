import React, { useState, useEffect } from "react";
import styles from "../styles/AccountPreferences.module.css";
import Link from "next/link";
import UserMenu from "./UserMenu";
import Cookies from 'js-cookie'
import { useRouter } from "next/navigation";
import { authenticateWithToken } from "../api/services/apiFunctions";
import { usePathname } from "next/navigation";
import Loading from "./Loading";

export default function AccountPreferences() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("")
  const [path, setPath] = useState();
  const [showUserMenu, setShowUserMenu] = useState(false)

  const AUTH_STATUS = {
    CHECKING: 'checking', // Antes de verificar o token
    AUTHENTICATED: 'authenticated', // Token válido e usuário autenticado
    UNAUTHENTICATED: 'unauthenticated', // Sem token ou token inválido
  };
  const [authStatus, setAuthStatus] = useState(AUTH_STATUS.CHECKING);
  const pathname = usePathname();

  useEffect(()=>{
    setPath(pathname)
  },[pathname])

  useEffect(() => {
    const token = Cookies.get('token')
    if (token && token != undefined && token != 'undefined') {
      setAuthStatus(AUTH_STATUS.AUTHENTICATED)
      authenticate(token)
    } else if (!token) {
      setAuthStatus(AUTH_STATUS.UNAUTHENTICATED)
    }
  }, [path]);

  const handleUserValues = (email, name) => {
    setEmail(email)
    setUsername(name)
  }

  const authenticate = async (token) => {
    try {
      const userData = await authenticateWithToken(token)
      handleUserValues(userData.userData.email, userData.userData.name)
    } catch (error) {
      console.log("Ocorreu um erro na tentativa de autenticação: ", error)
    }
  }

  const handleUserMenuClick = () => {
    setShowUserMenu(!showUserMenu)
  }

  return (
    <>
      {authStatus === AUTH_STATUS.AUTHENTICATED ? (
        <div className={styles.mainAcc}>
        <div 
        className={styles.userMenuIndicator}
        onClick={handleUserMenuClick}>
          <p>{username}</p>
        </div>
        <div className={`${styles.userMenu} ${showUserMenu ? styles.userMenuVisible : styles.userMenuHidden}`}>
            <UserMenu name={username} email={email} setShowUserMenu={setShowUserMenu}/>
        </div>
        
      </div>
      ) : (
        path != "/login" && path != "/signup" ? (
          <div className={styles.mainAcc}>
          <Link href="/login" legacyBehavior>
            <a className={styles.loginLink}>
            {authStatus === AUTH_STATUS.CHECKING && <></>}
            {authStatus === AUTH_STATUS.UNAUTHENTICATED && <div className={styles.loginDivText}><p>Entrar</p></div>}
            </a>
          </Link>
        </div>
        ) : (
          <div>
          </div>
        )
      )}
    </>
  );
}
