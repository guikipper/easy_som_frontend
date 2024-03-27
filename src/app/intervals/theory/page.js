'use client'
import styles from '../../styles/Dictionary.module.css'
import NoteIdentifier from "../../components/noteIdentifier"
import IntervalIdentifier from '@/app/components/IntervalIdentifier'

export default function Theory() {

    return (
        <div className={styles.dictionary}>
            <NoteIdentifier/>
            <div className={styles.line}></div>
            <IntervalIdentifier/>
        </div>
    )
}