'use client'

import { useState, ChangeEvent, KeyboardEvent } from 'react'
import styles from '../styles/ResendEmailVerification.module.css'
import { resendEmailVerification } from '../api/services/apiFunctions'
import { ResponseFeedback } from '../components/ResponseFeedback'
import Loading from '../components/Loading'

interface ApiResponse {
  success?: {
    message: string;
  };
  error?: {
    message: string;
    details: Array<{
      message: string;
    }>;
  };
}

type ResponseType = 'success' | 'error' | null;

const ResendEmailVerification: React.FC = () => {
  const [email, setEmail] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const [type, setType] = useState<ResponseType>(null)
  const [details, setDetails] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [disabled, setDisabled] = useState<boolean>(true)

  const callApi = async (): Promise<void> => {
    setDisabled(true)
    setLoading(true)
    setType(null)
    setMessage('')
    setDetails('')

    if (email) {
      const response: ApiResponse = await resendEmailVerification(email)
      if (response.success) {
        setLoading(false)
        setType('success')
        setMessage(response.success.message)
      }
      if (response.error) {
        setDisabled(false)
        setLoading(false)
        setType('error')
        setMessage(response.error.message)
        setDetails(response.error.details[0].message)
      }
    } else {
      setLoading(false)
      setType('error')
      setMessage('Informe o email.')
    }
  }

  const handleEmail = (value: string): void => {
    setEmail(value)
    if (value.length > 5) {
      setDisabled(false)
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      callApi()
    }
  }

  return (
    <div className={styles.mainContainer}>
      <h4>Informe seu email para que o link seja reenviado.</h4>
      <div className={styles.resendEmailVerification}>
        <input
          type="text"
          placeholder="E-mail"
          aria-label="Email"
          className={styles.emailInput}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            handleEmail(e.target.value)
          }}
          onKeyDown={handleKeyDown}
        />

        <button
          type="button"
          className="btn btn-primary"
          disabled={disabled}
          onClick={callApi}
        >
          Enviar
        </button>
      </div>
      {type && <ResponseFeedback type={type} message={message} details={details} />}

      <div className={styles.loadingWrapper}>
        {loading && (
          <div className={styles.loadingImage}>
            <Loading />
          </div>
        )}
      </div>
    </div>
  )
}

export default ResendEmailVerification 