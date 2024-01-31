import styles from '../styles/UserMenu.module.css'
import Link from "next/link";
import Cookies from 'js-cookie';

export default function UserMenu({name, email}) {

    const clearCookies = () => {
        const allCookies = Cookies.get();
        for (let cookie in allCookies) {
            Cookies.remove(cookie);
        }
    };

    const handleLogout = ()=> {
        clearCookies()
        localStorage.clear();
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
                        <a>
                            <p>Prefrências de conta</p>
                        </a>
                    </Link>
                </div>

                <div className={styles.logout}>
                    <Link href="/login" legacyBehavior>
                        <a>
                            <p onClick={handleLogout}>Logout</p>
                        </a>
                    </Link>
                </div>
            </div>
        </div>
        
    )
}