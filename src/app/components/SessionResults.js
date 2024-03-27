import React, { useEffect, useState } from 'react';
import styles from '../styles/SessionResults.module.css'
import Link from "next/link"
import { saveTrainingData, authenticateWithToken } from '../api/services/apiFunctions';
import Cookies from 'js-cookie';

const SessionResults = ({ results }) => { 
  
  const [feedbackMessage, setFeedbackMessage] = useState('')
  const [time, setTime] = useState('')
  const [totalRightAnswers, setTotalRightAnswers] = useState(0)
  const [totalQuestions, setTotalQuestions] = useState(0)
  const [accuracyPercentage, setAccuracyPercentage] = useState(0)
  const [message, setMessage] = useState('')

  const calculateData = () => {
    calculateTime(results.sessionData.timeInMiliseconds)
    const totalRightAnswers = results.sessionData.totalRightAnswers
    setTotalRightAnswers(totalRightAnswers)
    const totalQuestions = results.rounds.length
    setTotalQuestions(totalQuestions)
    const accuracyPercentage = (totalRightAnswers / totalQuestions) * 100;
    setAccuracyPercentage(accuracyPercentage)
  
    if (accuracyPercentage >= 90) {
      setFeedbackMessage('Excelente trabalho!')
    } else if (accuracyPercentage >= 70) {
      setFeedbackMessage('Muito bom, continue assim!')
    } else {
      setFeedbackMessage('Continue praticando para melhorar!')
    }
  }

  const calculateTime = (timeInMiliseconds) => {
    console.log('o tempo que ta vindo: ', timeInMiliseconds)
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
    console.log("As partes formatadas: ", formatedParts)
    setTime(formatedParts)
}

  useEffect(() => {
    if (results) {
    calculateData()
    const token = Cookies.get('token');
    if (token) {
      checkUserAuthentication(token)
    } else {
      console.log("Token não encontrado.")
      setMessage("Para salvar seu progresso, é necessário ter uma conta e estar conectado.")
    }
  } else {
    console.log("Resultados não encontrados.")
  }
  }, [results])

  const checkUserAuthentication = async (token) => {
    const authenticated = await authenticateWithToken(token)
    if (authenticated.statusCode === 201) {
      handleSaveData()
    } else {
      console.log("Token encontrado, porém inválido.")
    }
  }

  const handleSaveData = async () => {
    const token = Cookies.get('token');
    if (token) {
      const saveData = await saveTrainingData(results, token)
      console.log(saveData)
      if (saveData.ok) {
        setMessage("Dados salvos com sucesso!")
      }
    }
  }

  return (
    <div className={styles.sessionSummary}>
      <h1>Resultados</h1>
      <p>Tempo total: {time} </p>
      <p>Total de acertos: {totalRightAnswers} de {totalQuestions}</p>
      <p>Porcentagem de acertos: {accuracyPercentage.toFixed(2)}%</p>
      <p className={styles.feedback}>{feedbackMessage}</p>
      
        <Link href="/intervals/exercise-config">
          <button type="button" class="btn btn-primary">
            Continue Praticando
          </button>
        </Link>  

        <p className={styles.message}>{message}</p>
    </div>
  );
};
export default SessionResults;
