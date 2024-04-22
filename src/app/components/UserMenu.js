import styles from '../styles/UserMenu.module.css'
import Link from "next/link";
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function UserMenu({name, email, setShowUserMenu}) {
    const router = useRouter()
    
    const clearCookies = () => {
        const allCookies = Cookies.get();
        for (let cookie in allCookies) {
            Cookies.remove(cookie);
        }
    };

    const handleLogout = ()=> {
        clearCookies()
        router.push('/login')
      }

      const formatUsername = (name) => {
        if (name.length > 20) {
          return name.slice(0,20).trim()+'...'
        } else {
          return name
        }
      } 

    return (
        <>
      

<div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog" style={{ position: 'fixed', top: '40px', right: '10px' }}>
                        <div className={`modal-content ${styles.modal}`}>
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">{formatUsername(name)}</h1>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowUserMenu(false)} // Fecha o modal
                                ></button>
                            </div>
                            <div className={`modal-body ${styles.modal_body}`}>
                            <p>{email}</p>
                            <Link href="/account" legacyBehavior>
                                <a className={styles.link} onClick={() => {setShowUserMenu(false)}}>
                                    <p>Dados da conta</p>
                                </a>
                            </Link>
                            
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowUserMenu(false)}>Fechar</button>
                            </div>
                           
                            
                        </div>
                    </div>
                </div>
            </>
        
    )
}