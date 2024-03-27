'use client'
import { useState, useEffect } from "react"
import { accidents, naturalNotes, intervalsList } from "@/app/utils/notes"
import { findNoteByIntervalAndStart } from "../utils/findInterval"
import { removeAccents } from "../utils/removeAccents"
import styles from '../styles/IntervalIdentifier.module.css'

export default function IntervalIdentifier() {

    const [naturalNote, setNaturalNote] = useState('C')
    const [accident, setAccident] = useState()
    const [interval, setInterval] = useState('Uníssono')
    const [targetNote, setTargetNote] = useState()

    useEffect(() => {
        if (naturalNote, accident, interval) {  
            let note = naturalNote
            switch (accident) {
                case '\u266E':
                    break;
                case '\u266F':
                    note = note + '#'
                    break
                case '\u266D': 
                    note = note + 'b'
                    break

            }
            const formatedInterval = removeAccents(interval)
            const target = findNoteByIntervalAndStart(note, formatedInterval)
            if(target != "Nota desconhecida") {
                setTargetNote(target)
            }
        }
    }, [naturalNote, accident, interval])

    return (
        <>
        
        <p className={styles.title}>Determine a nota alvo a partir de uma nota de referência e um intervalo específico</p>
            <div className={styles.container}>
            
            <div className={styles.dropdownButtons}>   
                <div className={styles.item}>
                    <div className="dropdown">
                        <button
                        className={`btn btn-secondary dropdown-toggle ${styles.optionNoteButton}`}
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        >
                        {naturalNote}
                        </button>
                        
                        <ul className={`dropdown-menu`}>
                        {naturalNotes.map((note, index) => {
                            return (
                            <li className={styles.li} key={index}>
                            <a className="dropdown-item" onClick={() => {
                                setNaturalNote(note)
                            }}>
                                {note}
                            </a>
                            </li>)
                        })} 
                        </ul>
                    </div>
                </div>

                <div className={styles.item}>
                    <div className="dropdown">
                        <button
                        className={`btn btn-secondary dropdown-toggle ${styles.noteTypeButton}`}
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        >
                        {accident}
                        </button>
                        <ul className={`dropdown-menu`}>
                        {accidents.map((item, index) => {
                            return (
                            <li className={styles.li} key={index}>
                            <a className="dropdown-item" onClick={() => {
                                setAccident(item)
                            }}>
                                {item}
                            </a>
                            </li>)
                        })} 
                        </ul>
                    </div>
                </div>

                <div className={styles.item}>
                    <div className="dropdown">
                        <button
                        className={`btn btn-secondary dropdown-toggle ${styles.intervalButton}`}
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        >
                        {interval}
                        </button>
                        
                        <ul className={`dropdown-menu ${styles.dropDrownIntervals}`}>
                        {intervalsList.map((item, index) => {
                            return (
                            <li className={styles.li} key={index}>
                            <a className="dropdown-item" onClick={() => {
                                setInterval(item)
                            }}>
                                {item}
                            </a>
                            </li>)
                        })} 
                        </ul>
                    </div>
                </div>
            </div>    
            
            <div className={styles.result}>
                <p>Nota alvo do intervalo: <span>{targetNote}</span></p>
            </div>
            

        </div>
        </>
    )
}