import { useState, useEffect } from "react"
import { findIntervalByNotes } from "@/app/utils/findInterval"
import { onlyNotes } from "@/app/utils/notes"
import styles from '../styles/NoteIdentifier.module.css'
import { intervalConverter } from "../utils/intervalConverter"

export default function NoteIdentifier() {

    const [note1, setNote1] = useState()
    const [note2, setNote2] = useState()
    const [interval, setInterval] = useState()

    useEffect(() => {
        if(note1 && note2) {
            const interval = findIntervalByNotes(note1, note2)
            const formatedInterval = intervalConverter(interval)
            setInterval(formatedInterval)
        }
    }, [note1, note2])

    return (
    <>
        <p className={styles.title}>Identifique um intervalo a partir de duas notas</p>
        
        <div className={styles.container}>

        {/* 1 Item */}
                <div className={styles.item}>
                    <p>Nota 1</p>
                    <div className="dropdown">
                        <button
                        className={`btn btn-secondary dropdown-toggle ${styles.optionNoteButton}`}
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        >
                        {note1}
                        </button>
                        
                        <ul className={`dropdown-menu ${styles.dropDrownNotes}`}>
                        {onlyNotes.map((note, index) => {
                            return (
                            <li className={styles.li} key={index}>
                            <a className="dropdown-item" onClick={() => {
                                setNote1(note)
                            }}>
                                {note}
                            </a>
                            </li>)
                        })} 
                        </ul>
                    </div>
                </div>

        {/* 2 Item */}

        <div className={styles.line}></div>
                
                <div className={styles.item}>
                    <p>Nota 2</p>
                    <div className="dropdown">
                        <button
                        className={`btn btn-secondary dropdown-toggle ${styles.optionNoteButton}`}
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        >
                        {note2}
                        </button>
                        
                        <ul className={`dropdown-menu ${styles.dropDrownNotes}`}>
                        {onlyNotes.map((note, index) => {
                            return (
                            <li className={styles.li} key={index}>
                            <a className="dropdown-item" onClick={() => {
                                setNote2(note)
                            }}>
                                {note}
                            </a>
                            </li>)
                        })} 
                        </ul>
                    </div>
                </div>
                
        {/* 3 Item */}
        <div className={styles.line}></div>

            <div className={`${styles.result} ${styles.item}`}>
                <p>Intervalo: <span>{interval}</span></p>
            </div>

        </div>
    </>
        

    )
}