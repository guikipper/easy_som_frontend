import React, { useEffect, useState } from 'react';
import styles from '../styles/SessionResults.module.css';
import Link from "next/link";
import { saveTrainingData, authenticateWithToken } from '../api/services/apiFunctions';
import Cookies from 'js-cookie';

interface Round {
  interval: string;
  isCorrect: boolean;
  userAnswer?: string;
}

interface SessionData {
  timeInMiliseconds: number;
  totalRightAnswers: number;
}

interface Results {
  sessionData: SessionData;
  rounds: Round[];
}

interface SessionResultsProps {
  results: Results;
}

const SessionResults: React.FC<SessionResultsProps> = ({ results }) => {
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [totalRightAnswers, setTotalRightAnswers] = useState<number>(0);
  const [totalQuestions, setTotalQuestions] = useState<number>(0);
  const [accuracyPercentage, setAccuracyPercentage] = useState<number>(0);
  const [message, setMessage] = useState<string>('');

  const calculateData = (): void => {
    calculateTime(results.sessionData.timeInMiliseconds);
    const totalRight = results.sessionData.totalRightAnswers;
    setTotalRightAnswers(totalRight);
    const total = results.rounds.length;
    setTotalQuestions(total);
    const accuracy = (totalRight / total) * 100;
    setAccuracyPercentage(accuracy);

    if (accuracy >= 90) {
      setFeedbackMessage('Excelente trabalho!');
    } else if (accuracy >= 70) {
      setFeedbackMessage('Muito bom, continue assim!');
    } else {
      setFeedbackMessage('Continue praticando para melhorar!');
    }
  };

  const calculateTime = (timeInMiliseconds: number): void => {
    const parts: string[] = [];
    let totalSeconds = Math.floor(timeInMiliseconds / 1000);
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = totalSeconds % 60;

    if (hours > 0) {
      parts.push(hours + "h");
    }
    if (minutes > 0 || hours > 0) {
      parts.push(minutes + "min");
    }
    if (seconds > 0) {
      parts.push(seconds + "s");
    }
    let formatedParts = parts.join(" ");
    setTime(formatedParts);
  };

  useEffect(() => {
    if (results) {
      calculateData();
      const token = Cookies.get('token');
      if (token) {
        checkUserAuthentication(token);
      } else {
        setMessage("Para salvar seu progresso, é necessário ter uma conta e estar conectado.");
      }
    } else {
      console.log("Resultados não encontrados.");
    }
  }, [results]);

  const checkUserAuthentication = async (token: string): Promise<void> => {
    const authenticated = await authenticateWithToken(token);
    if (authenticated.success) {
      handleSaveData();
    } else {
      console.log(authenticated.error.message);
    }
  };

  const handleSaveData = async (): Promise<void> => {
    const token = Cookies.get('token');
    if (token) {
      try {
        const saveData = await saveTrainingData(results, token);
        if (saveData?.ok) {
          setMessage("Dados salvos com sucesso!");
        }
      } catch (error) {
        console.error("Erro ao salvar dados:", error);
        setMessage("Erro ao salvar os dados.");
      }
    }
  };

  return (
    <div className={styles.sessionSummary}>
      <h1>Resultados</h1>
      <p>Tempo total: {time}</p>
      <p>Total de acertos: {totalRightAnswers} de {totalQuestions}</p>
      <p>Porcentagem de acertos: {accuracyPercentage.toFixed(2)}%</p>
      <p className={styles.feedback}>{feedbackMessage}</p>
      
      <Link href="/intervals/exercise-config">
        <button type="button" className="btn btn-primary">
          Continue Praticando
        </button>
      </Link>

      <p className={styles.message}>{message}</p>
    </div>
  );
};

export default SessionResults; 