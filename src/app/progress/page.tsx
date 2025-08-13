'use client'

import styles from '../styles/Progress.module.css'
import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { getTrainingSummary, authenticateWithToken } from '../api/services/apiFunctions'
import { useRouter } from 'next/navigation'

interface SummaryData {
  rightAnswers: number;
  totalRounds: number;
  totalTime: number;
}

interface ApiResponse {
  success?: {
    data: SummaryData;
  };
  error?: boolean;
}

interface AuthResponse {
  failed?: boolean;
}

const Progress: React.FC = () => {
  const router = useRouter()
  const [summaryData, setSummaryData] = useState<SummaryData | null>(null)
  const [successPercentage, setSuccessPercentage] = useState<number>(0)
  const [totalTime, setTotalTime] = useState<string>('')
  const [error, setError] = useState<boolean | undefined>()

  useEffect(() => {
    const token = Cookies.get('token')
    if (token) {
      getData(token)
    }
  }, [])

  const getData = async (token: string): Promise<ApiResponse | undefined> => {
    const auth = await authenticate(token)
    if (auth?.failed) {
      clearCookies()
      router.push('/login')
    } else {
      const response: ApiResponse | undefined = await getTrainingSummary(token)
      if (response) {
        if (response.error) {
          setError(true)
            } else if (response.success) {
          formatData(response.success.data)
        return response
      }
      }
      
    }
  }

  const authenticate = async (token: string): Promise<AuthResponse | undefined> => {
    try {
      const userData = await authenticateWithToken(token)
      return userData
    } catch (error) {
      console.log('Ocorreu um erro na tentativa de autenticação: ', error)
    }
  }

  const formatData = (summaryData: SummaryData): void => {
    const percentage = (summaryData.rightAnswers / summaryData.totalRounds) * 100
    setSuccessPercentage(parseFloat(percentage.toFixed(1)))
    calculateTime(summaryData.totalTime)
  }

  const clearCookies = (): void => {
    const allCookies = Cookies.get()
    for (let cookie in allCookies) {
      Cookies.remove(cookie)
    }
  }

  const calculateTime = (timeInMiliseconds: number): void => {
    const parts: string[] = []
    let totalSeconds = Math.floor(timeInMiliseconds / 1000)
    let hours = Math.floor(totalSeconds / 3600)
    let minutes = Math.floor((totalSeconds % 3600) / 60)
    let seconds = totalSeconds % 60

    if (hours > 0) {
      parts.push(hours + 'h')
    }
    if (minutes > 0 || hours > 0) {
      parts.push(minutes + 'min')
    }
    if (seconds > 0) {
      parts.push(seconds + 's')
    }
    let formatedParts = parts.join(' ')
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
            <div className={styles.progressBar} style={{ width: `${successPercentage}%` }}></div>
          </div>
          <p className={styles.percentage}>{successPercentage}%</p>
        </div>
      </div>
      <div className={styles.footer}>
        <p>&copy; Easy Som. Todos os direitos reservados.</p>
      </div>
    </div>
  )
}

export default Progress 