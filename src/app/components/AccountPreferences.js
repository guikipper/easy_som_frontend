import React, { useState, useEffect } from "react";
import styles from "../styles/AccountPreferences.module.css";
import Link from "next/link";
import UserMenu from "./UserMenu";

import { usePathname } from "next/navigation";

export default function AccountPreferences() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("")
  const [path, setPath] = useState();
  const [showUserMenu, setShowUserMenu] = useState(false)

  const pathname = usePathname();

  useEffect(()=>{
    setPath(pathname)
  },[pathname])

  useEffect(() => {
    const handleStorageChange = () => {
      const name = localStorage.getItem("name");
      const email = localStorage.getItem("email")
      setPath(pathname);
      setUsername(name);
      setEmail(email)
    };
   handleStorageChange();
  }, []);

  useEffect(() => {
    const savedData = localStorage.getItem("name");
    if (savedData !== username) {
      setUsername(savedData);
    }
    setPath(pathname);
  }, [pathname, username]);

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
