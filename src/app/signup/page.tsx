'use client'

import { useState, useEffect, ChangeEvent, KeyboardEvent } from 'react'
import styles from '../styles/Signup.module.css'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import { signUp } from '../api/services/apiFunctions'
import Redirecting from '../components/Redirecting'
import Alert from '../components/Alert'
import Loading from '../components/Loading'

interface UserData {
  name: string;
  email: string;
  password: string;
}

interface SignUpResponse {
  error?: {
    details: Array<{
      message: string;
    }>;
  };
  success?: boolean;
}

const SignUp: React.FC = () => {
  const [nameAndLastName, setNameAndLastName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')

  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)
  const [matchPasswords, setMatchPasswords] = useState<boolean>(false)
  const [validPassword, setValidPassword] = useState<boolean>(false)
  const [disableButton, setDisableButton] = useState<boolean>(true)
  const [validEmail, setValidEmail] = useState<boolean>(false)
  const [redirect, setRedirect] = useState<boolean>(false)
  const [showAlert, setShowAlert] = useState<boolean>(false)
  const [alertMessage, setAlertMessage] = useState<string>('')
  const [showLoading, setShowLoading] = useState<boolean>(false)

  const router = useRouter()

  const handleSignUp = async (): Promise<void> => {
    cleanAlert()
    setShowLoading(true)
    const userData: UserData = {
      name: nameAndLastName.toLowerCase(),
      email: email.toLowerCase(),
      password: password,
    }
    const response: SignUpResponse = await signUp(userData)
    if (response.error) {
      setShowLoading(false)
      setShowAlert(true)
      setAlertMessage(response.error.details[0].message)
    }
    if (response.success) {
      setShowLoading(false)
      setRedirect(true)
      setTimeout(() => {
        router.push('/login')
      }, 2000)
    }
  }

  const cleanAlert = (): void => {
    setShowAlert(false)
    setAlertMessage('')
  }

  useEffect(() => {
    validateInputs()
  }, [validPassword, nameAndLastName, email, matchPasswords])

  const validateEmail = (input: string): boolean => {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const valid = regexEmail.test(input)
    setValidEmail(valid)
    return valid
  }

  const validatePassword = (password: string): void => {
    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{9,}$/
    const valid = regexPassword.test(password)
    handleDivergentPassword(password)
    setValidPassword(valid)
  }

  const handleDivergentPassword = (password: string): void => {
    if (confirmPassword) {
      setMatchPasswords(password === confirmPassword)
    }
  }

  const validateConfirmPassword = (confirmPassword: string): void => {
    setMatchPasswords(password === confirmPassword)
  }

  const validateInputs = (): void => {
    setDisableButton(!(nameAndLastName && validEmail && validPassword && matchPasswords))
  }

  const togglePasswordVisibility = (): void => {
    setShowPassword(!showPassword)
  }

  const toggleConfirmPasswordVisibility = (): void => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  const handleConfirmPasswordPaste = (e: React.ClipboardEvent): void => {
    e.preventDefault()
  }

  useEffect(() => {
    if (password === '') {
      setConfirmPassword('')
    }
  }, [password])

  const handleNameInput = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.value.length <= 60) {
      setNameAndLastName(e.target.value)
    }
  }

  const handleEmailInput = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.value.length <= 60) {
      setEmail(e.target.value)
      validateEmail(e.target.value)
    }
  }

  const handlePasswordInput = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.value.length <= 60) {
      setPassword(e.target.value)
      validatePassword(e.target.value)
    }
  }

  const handleConfirmPasswordInput = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.value.length <= 60) {
      setConfirmPassword(e.target.value)
      validateConfirmPassword(e.target.value)
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter' && !disableButton) {
      handleSignUp()
    }
  }

  return (
    <>
      <div className={styles.signupMain}>
        {redirect && <Redirecting email={email} />}
        {showAlert && <Alert type="danger" message={alertMessage} />}

        <div className={styles.signupCard}>
          <div className={styles.signUpTitle}>
            <p>Preencha os Detalhes Abaixo para Criar sua Conta</p>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              value={nameAndLastName}
              className={`form-control ${styles.inputs} ${nameAndLastName ? styles.validInput : ''}`}
              id="floatingInputName"
              placeholder="Nome e sobrenome"
              onChange={handleNameInput}
              onKeyDown={handleKeyDown}
            />
            <label htmlFor="floatingInput">Nome e sobrenome</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="email"
              value={email}
              className={`form-control ${styles.inputs} ${
                validEmail && email ? styles.validInput : validEmail === false && email ? styles.invalidInput : ''
              }`}
              id="floatingInputEmail"
              placeholder="name@example.com"
              onChange={handleEmailInput}
              onKeyDown={handleKeyDown}
            />
            <label htmlFor="floatingInput">Email</label>
          </div>

          <div className="form-floating">
            <input
              value={password}
              type={showPassword ? 'text' : 'password'}
              className={`form-control ${styles.inputs} ${
                validPassword && password ? styles.validInput : !validPassword && password ? styles.invalidInput : ''
              }`}
              id="floatingPassword"
              placeholder="Password"
              onChange={handlePasswordInput}
              onKeyDown={handleKeyDown}
            />
            <label htmlFor="floatingPassword">Senha</label>
            <span
              className="password-toggle-btn position-absolute end-0 top-50 translate-middle-y"
              style={{ marginRight: '10px' }}
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash style={{ cursor: 'pointer' }} /> : <FaEye style={{ cursor: 'pointer' }} />}
            </span>
            <div className={styles.passwordRules}>
              <p>
                A senha deve possuir, no mínimo, 9 caracteres, incluindo pelo menos uma letra maiúscula, uma letra
                minúscula e um número.
              </p>
            </div>
          </div>

          <div className={`form-floating ${styles.confirmPassword}`}>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              className={`form-control ${styles.inputs} ${styles.confirmPasswordCss} ${
                validPassword && confirmPassword && matchPasswords
                  ? styles.validInput
                  : confirmPassword && !matchPasswords
                  ? styles.invalidInput
                  : ''
              }`}
              id="floatingConfirmPassword"
              placeholder="Password"
              value={confirmPassword}
              disabled={!validPassword}
              onPaste={handleConfirmPasswordPaste}
              onChange={handleConfirmPasswordInput}
              onKeyDown={handleKeyDown}
            />
            <label htmlFor="floatingConfirmPassword">Confirmar senha</label>
            <span
              className="password-toggle-btn position-absolute end-0 top-50 translate-middle-y"
              style={{ marginRight: '10px' }}
              onClick={toggleConfirmPasswordVisibility}
            >
              {showConfirmPassword ? (
                <FaEyeSlash style={{ cursor: 'pointer' }} />
              ) : (
                <FaEye style={{ cursor: 'pointer' }} />
              )}
            </span>
          </div>

          <div className={styles.signupButton}>
            <button
              type="button"
              className={`btn btn-primary ${styles.signupButtonCss}`}
              disabled={disableButton}
              onClick={handleSignUp}
            >
              {showLoading ? <Loading /> : 'Criar conta'}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignUp 