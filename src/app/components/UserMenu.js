import styles from '../styles/UserMenu.module.css'

export default function UserMenu({name, email}) {
    return (
        <div className={styles.userMenuMain}>
            <div className={styles.header}>
                <p className={styles.name}>{name}</p>
                <p className={styles.email}>{email}</p>
            </div>
        </div>
    )
}