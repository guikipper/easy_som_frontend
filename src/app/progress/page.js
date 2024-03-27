'use client'
import styles from '../styles/Progress.module.css'
import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { getTrainingSummary } from '../api/services/apiFunctions'

export default function Progress() {
    const [summaryData, setSummaryData] = useState({})
    const [successPercentage, setSuccessPercentage] = useState()
    const [totalTime, setTotalTime] = useState()

    useEffect(() => {
        const token = Cookies.get('token');
        getData(token)
    }, [])

    const getData = async (token) => {
        const response = await getTrainingSummary(token)
        setSummaryData(response)
        return response
    }

    useEffect(() => {
        const percentage = (summaryData.rightAnswers / summaryData.totalRounds) * 100
        setSuccessPercentage(parseFloat(percentage.toFixed(1)))
        calculateTime(summaryData.totalTime)
    }, [summaryData])

    const calculateTime = (timeInMiliseconds) => {
        const parts = []
        let totalSeconds = Math.floor(timeInMiliseconds / 1000);
        let hours = Math.floor(totalSeconds / 3600);
        let minutes = Math.floor((totalSeconds % 3600) / 60);
        let seconds = totalSeconds % 60;

        if (hours > 0) {
            parts.push(hours+"h")
        }
        if (minutes > 0 || hours > 0) {
            parts.push(minutes+"min")
        }
        if (seconds > 0) {
            parts.push(seconds+"s")
        }
        let formatedParts = parts.join(" ")
        setTotalTime(formatedParts)
        
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Painel de Progresso</h1>
                <div className={styles.line}></div>
            </div>

            <div className={styles.progressSection}>
                
                <div className={styles.item}>
                    <h2>Tempo Total de Estudo</h2>
                    <p className={styles.time}>{totalTime}</p>
                </div>
                
                <div className={styles.item}>
                    <h2>Porcentagem de Acerto</h2>
                    <div className={styles.progressBarContainer}>
                        <div className={styles.progressBar} style={{width: `${successPercentage}%`}}></div>
                    </div>
                    <p className={styles.percentage}>{successPercentage}%</p>
                </div>

            </div>
            <div className={styles.footer}>
                <p>&copy; Harmonic Wave. Todos os direitos reservados.</p>
            </div>
    </div>
    )
}