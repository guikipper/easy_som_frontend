import React, { useState, useEffect } from "react";
import styles from "../styles/AccountPreferences.module.css";
import Link from "next/link";
import UserMenu from "./UserMenu";
import Cookies from 'js-cookie'
import { authenticateWithToken } from "../api/services/apiFunctions";

import { usePathname } from "next/navigation";

export default function AccountPreferences() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("")
  const [path, setPath] = useState();
  const [showUserMenu, setShowUserMenu] = useState(false)

  const pathname = usePathname();

  //useEffect(()=>{
  //  setPath(pathname)
  //},[pathname])

  useEffect(() => {
    const token = Cookies.get('token')
    console.log("O token do fulano é: ", token)
    if (token && token != undefined && token != 'undefined') {
      console.log("Tem token, entrou na chamada da função para autenticar: ", token)
      authenticate(token)
    }
  }, [path]);

  const handleUserValues = (email, name) => {
    console.log("Entrou na função aqui parsa")
    setEmail(email)
    setUsername(name)
  }

  const authenticate = async (token) => {
    try {
      const userData = await authenticateWithToken(token)
      console.log(userData)
      handleUserValues(userData.userData.email, userData.userData.name)
    } catch (error) {
      console.log("Deu erro na tentativa de autenticação: ", error)
    }
  }

  console.log(username, email)

  //useEffect(() => {
  //  const savedData = localStorage.getItem("name");
  //  if (savedData !== username) {
  //    setUsername(savedData);
  //  }
  //  setPath(pathname);
  //}, [pathname, username]);

  const handleUserMenuClick = () => {
    setShowUserMenu(!showUserMenu)
  }

  return (
    <>
      {username !== "" && username !== null ? (
        <div className={styles.mainAcc}>
        <div 
        className={styles.userMenuIndicator}
        onClick={handleUserMenuClick}>
          <p>{username}</p>
        </div>
        <div className={`${styles.userMenu} ${showUserMenu ? styles.userMenuVisible : styles.userMenuHidden}`}>
            <UserMenu name={username} email={email}/>
        </div>
        
      </div>
      ) : (
        path != "/login" && path != "/signup" ? (
          <div className={styles.mainAcc}>
          <Link href="./login" legacyBehavior>
            <a className={styles.loginLink}>
              <p>Entrar</p>
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
