import styles from '../styles/UserMenu.module.css'
import Link from "next/link";
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

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

    return (
        <div className={styles.userMenuMain}>
            <div className={styles.header}>
                <p className={styles.name}>{name}</p>
                <p className={styles.email}>{email}</p>
            </div>
            <div className={styles.userMenuBody}>

                <div className={styles.userAccount}>
                    <Link href="/account" legacyBehavior>
                        <a onClick={() => {setShowUserMenu(false)}}>
                            <p>Prefrências de conta</p>
                        </a>
                    </Link>
                </div>

                <div className={styles.logout}>
                    <p onClick={handleLogout}>Sair</p>
                </div>
            </div>
        </div>
        
    )
}