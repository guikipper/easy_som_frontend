'use client'

import styles from '../styles/Login.module.css'
import Link from 'next/link'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { useState, useEffect, KeyboardEvent, ChangeEvent } from 'react'
import { login } from '../api/services/apiFunctions'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import Loading from '../components/Loading'
import RecoverPassword from '../components/ForgetPassword'
import ErrorFeedback from '../components/ErrorFeedback'

interface LoginResponse {
  error?: {
    message: string;
  };
  success?: {
    data: {
      token: string;
    };
  };
}

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [feedback, setFeedback] = useState<string>('')
  const [disableButton, setDisableButton] = useState<boolean>(true)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showLoading, setShowLoading] = useState<boolean>(false)
  const router = useRouter()

  const handleLoginButton = async (): Promise<void> => {
    try {
      setShowLoading(true)
      const response: LoginResponse = await login(email, password)
      if (response) {
        setShowLoading(false)
      }
      if (response.error) {
        handleErrorFeedback(response.error.message)
      }
      if (response.success) {
        Cookies.set('token', response.success.data.token)
        router.push('/')
      }
    } catch (error) {
      console.log('Ocorreu um erro: ', error)
    }
  }

  const handleErrorFeedback = (error: string): void => {
    setFeedback('')
    setFeedback(error)
  }

  const togglePasswordVisibility = (): void => {
    setShowPassword(!showPassword)
  }

  const validateInputs = (): void => {
    if (email && password) {
      setDisableButton(false)
    } else {
      setDisableButton(true)
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter' && !disableButton) {
      handleLoginButton()
    }
  }

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value)
  }

  useEffect(() => {
    validateInputs()
  }, [email, password])

  return (
    <div className={styles.loginMain}>
      <div className={styles.inputsCard}>
        <div className={styles.inputs}>
          <div>
            <input
              className={styles.username}
              type="text"
              placeholder="E-mail"
              aria-label="Email"
              onChange={handleEmailChange}
              onKeyDown={handleKeyDown}
            />
          </div>

          <div className="form-floating">
            <input
              type={showPassword ? 'text' : 'password'}
              className={styles.password}
              placeholder="Password"
              onChange={handlePasswordChange}
              onKeyDown={handleKeyDown}
            />
            <span
              className="password-toggle-btn position-absolute end-0 top-50 translate-middle-y"
              style={{ marginRight: '10px' }}
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash style={{ cursor: 'pointer' }} /> : <FaEye style={{ cursor: 'pointer' }} />}
            </span>
          </div>

          <div>
            <button
              disabled={disableButton}
              style={{
                fontWeight: 'bold',
                outline: 'none',
                border: 'none',
                backgroundColor: disableButton ? '#ccc' : '#00A2FF',
                color: 'white',
                borderRadius: '8px',
                cursor: disableButton ? 'not-allowed' : 'pointer',
              }}
              onClick={handleLoginButton}
            >
              Entrar
            </button>
          </div>
        </div>

        <div className={styles.errorFeedbackDiv}>
          {feedback !== '' && <ErrorFeedback feedback={feedback} />}
        </div>

        <div className={styles.loadingWrapper}>
          {showLoading && (
            <div className={styles.loadingImage}>
              <Loading />
            </div>
          )}
        </div>

        <div className={styles.forgetPassword}>
          <RecoverPassword />
        </div>

        <p>
          Não tem uma conta?
          <Link href="./signup" className={styles.signUpLink}>
            <span className={styles.signUpLink}> Cadastrar agora.</span>
          </Link>
        </p>

        <div className={styles.forgetPassword}>
          <Link href="./resendEmailVerification" className={styles.resendEmailLink}>
            <span className={styles.resendEmailLink}> Reenviar link de email</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login 