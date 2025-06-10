'use client'

import styles from '../styles/RecoverPassword.module.css'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { useState, useEffect, ChangeEvent } from 'react'
import Alert from '../components/Alert'
import Loading from '../components/Loading'
import { recoverPasswordRoute } from '../api/services/apiFunctions'
import { useSearchParams, useRouter } from 'next/navigation'

interface ApiResponse {
  success?: {
    message: string;
  };
  error?: {
    message: string;
  };
}

const RecoverPassword: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)
  const [newPassword, setNewPassword] = useState<string>('')
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>('')
  const [validPassword, setValidPassword] = useState<boolean>(false)
  const [validConfirmPassword, setValidConfirmPassword] = useState<boolean>(false)
  const [matchPasswords, setMatchPasswords] = useState<boolean>(false)
  const searchParams = useSearchParams()
  const [token, setToken] = useState<string | null>(null)
  const router = useRouter()

  const [showAlert, setShowAlert] = useState<boolean>(false)
  const [alertType, setAlertType] = useState<'success' | 'danger'>('danger')
  const [alertMessage, setAlertMessage] = useState<string>('')
  const [showLoading, setShowLoading] = useState<boolean>(false)

  useEffect(() => {
    const tokenFromParams = searchParams.get('token')
    if (tokenFromParams) {
      setToken(tokenFromParams)
    }
  }, [searchParams])

  const handleConfirmPasswordPaste = (e: React.ClipboardEvent): void => {
    e.preventDefault()
  }

  const togglePasswordVisibility = (): void => {
    setShowPassword(!showPassword)
  }

  const toggleConfirmPasswordVisibility = (): void => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  const confirmChangePassword = async (): Promise<void> => {
    if (newPassword && validPassword && confirmNewPassword && validConfirmPassword && matchPasswords && token) {
      setShowAlert(false)
      setShowLoading(true)
      const response: ApiResponse = await recoverPasswordRoute(newPassword, token)
      if (response.success) {
        setShowLoading(false)
        setShowAlert(true)
        setAlertMessage(response.success.message)
        setAlertType('success')
        setTimeout(() => {
          router.push('/login')
        }, 1500)
      } else if (response.error) {
        setShowLoading(false)
        setShowAlert(true)
        setAlertMessage(response.error.message)
        setAlertType('danger')
      }
    }
  }

  const regexPasswordValidator = (password: string): boolean => {
    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{9,}$/
    return regexPassword.test(password)
  }

  const validatePassword = (password: string): void => {
    if (password === confirmNewPassword) {
      setMatchPasswords(true)
    } else {
      setMatchPasswords(false)
    }
    const result = regexPasswordValidator(password)
    setValidPassword(result)
  }

  const validateConfirmPassword = (confirmPassword: string): void => {
    if (confirmPassword === newPassword) {
      setValidConfirmPassword(true)
      setMatchPasswords(true)
    } else {
      setValidConfirmPassword(false)
      setMatchPasswords(false)
    }
  }

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setNewPassword(e.target.value)
    validatePassword(e.target.value)
  }

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setConfirmNewPassword(e.target.value)
    validateConfirmPassword(e.target.value)
  }

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>Defina uma nova senha</h1>
        {/* New Password */}
        <div className={`input-group mb-3 ${styles.inputData}`}>
          <span className="input-group-text" id="inputGroup-sizing-default">
            Nova Senha
          </span>
          <input
            type={showPassword ? 'text' : 'password'}
            className={`form-control ${
              validPassword && newPassword ? styles.validInput : newPassword && !validPassword ? styles.invalidInput : ''
            }`}
            value={newPassword}
            autoComplete="off"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
            onPaste={handleConfirmPasswordPaste}
            onChange={handlePasswordChange}
          />
          <span
            className={`${styles.eyeIcon} password-toggle-btn position-absolute end-0 top-50 translate-middle-y`}
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {/* Confirm New Password */}
        <div className={`input-group mb-3 ${styles.inputData}`}>
          <span className="input-group-text" id="inputGroup-sizing-default">
            Confirmar Nova Senha
          </span>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            className={`form-control ${
              validConfirmPassword && confirmNewPassword && matchPasswords
                ? styles.validInput
                : confirmNewPassword && !matchPasswords
                ? styles.invalidInput
                : ''
            }`}
            value={confirmNewPassword}
            autoComplete="off"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
            onPaste={handleConfirmPasswordPaste}
            onChange={handleConfirmPasswordChange}
          />
          <span
            className={`${styles.eyeIcon} password-toggle-btn position-absolute end-0 top-50 translate-middle-y`}
            onClick={toggleConfirmPasswordVisibility}
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <div className={styles.passwordRules}>
          <p>
            A senha deve possuir, no mínimo, 9 caracteres, incluindo pelo menos uma letra maiúscula, uma letra minúscula e
            um número.
          </p>
        </div>

        {/* FeedBack */}
        <div className={styles.feedbackDiv}>
          {!matchPasswords && newPassword && confirmNewPassword !== undefined && confirmNewPassword !== null && confirmNewPassword !== '' && (
            <p className={styles.feedbackMessage}>As senhas não coincidem.</p>
          )}

          {matchPasswords && newPassword && confirmNewPassword && validPassword !== undefined && confirmNewPassword !== null && confirmNewPassword !== '' && (
            <p className={styles.positiveFeedbackMessage}>As senhas coincidem.</p>
          )}
        </div>

        {/* Confirm Button */}
        <button
          disabled={!(newPassword && validPassword && confirmNewPassword && validConfirmPassword && matchPasswords)}
          type="button"
          className={`btn btn-success ${styles.confirmButton}`}
          onClick={confirmChangePassword}
        >
          Confirmar
        </button>
        <div className={styles.alertContainer}>
          {showLoading && <Loading />}
          {showAlert && <Alert type={alertType} message={alertMessage} />}
        </div>
      </div>
    </div>
  )
}

export default RecoverPassword 