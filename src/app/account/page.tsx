'use client'

import styles from '../styles/AccountPage.module.css'
import { useState, useEffect, useRef, KeyboardEvent, ChangeEvent } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faXmark } from '@fortawesome/free-solid-svg-icons'
import { changeName, changePassword } from '../api/services/apiFunctions'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import Alert from '../components/Alert'
import DeleteAccount from '../components/DeleteAccount'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { authenticateWithToken } from '../api/services/apiFunctions'

interface UserData {
  token: string;
  newName?: string;
  oldName?: string;
  password?: string;
  newPassword?: string;
}

interface ChangeNameData {
  token: string;
  newName: string;
  oldName: string;
}

interface ChangePasswordData {
  token: string;
  password: string;
  newPassword: string;
}

interface ApiResponse {
  success?: {
    data: {
      name: string;
      email: string;
      newName?: string;
    };
  };
  error?: {
    message: string;
  };
}

const Account: React.FC = () => {
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [editMode, setEditMode] = useState<boolean>(false)
  const [newName, setNewName] = useState<string>('')
  const [toggleChangePassword, setToggleChangePassword] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const [actualPassword, setActualPassword] = useState<string>('')
  const [newPassword, setNewPassword] = useState<string>('')
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>('')
  const [validNewPassword, setValidNewPassword] = useState<boolean>(false)
  const [matchPasswords, setMatchPasswords] = useState<boolean>(false)
  const [disableButton, setDisableButton] = useState<boolean>(true)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false)
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState<boolean>(false)
  const [showAlert, setShowAlert] = useState<boolean>(false)
  const [alertType, setAlertType] = useState<'success' | 'danger'>('danger')
  const [alertMessage, setAlertMessage] = useState<string>('')
  const router = useRouter()

  useEffect(() => {
    getData()
  }, [])

  const clearCookies = (): void => {
    const allCookies = Cookies.get()
    for (let cookie in allCookies) {
      Cookies.remove(cookie)
    }
  }

  const getData = async (): Promise<void> => {
    const token = Cookies.get('token')
    if (token) {
      const userData: ApiResponse = await authenticateWithToken(token)
      if (userData.error) {
        clearCookies()
        router.push('/login')
      } else if (userData.success) {
        setName(userData.success.data.name)
        setEmail(userData.success.data.email)
      }
    }
  }

  const handleEditMode = (): void => {
    setEditMode(!editMode)
  }

  const clearInputs = (): void => {
    setActualPassword('')
    setNewPassword('')
    setConfirmNewPassword('')
  }

  const togglePasswordVisibility = (): void => {
    setShowPassword(!showPassword)
  }

  const toggleNewPasswordVisibility = (): void => {
    setShowNewPassword(!showNewPassword)
  }

  const toggleConfirmNewPasswordVisibility = (): void => {
    setShowConfirmNewPassword(!showConfirmNewPassword)
  }

  useEffect(() => {
    if (editMode && inputRef.current) {
      inputRef.current.focus()
    }
  }, [editMode])

  const handleChangePassword = (): void => {
    setToggleChangePassword(!toggleChangePassword)
  }

  const validateNewPassword = (password: string): void => {
    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{9,}$/
    const valid = regexPassword.test(password)
    if (valid) {
      handleDivergentPassword(password)
      setValidNewPassword(true)
    } else {
      setValidNewPassword(false)
    }
  }

  const handleDivergentPassword = (password: string): void => {
    if (confirmNewPassword) {
      setMatchPasswords(password === confirmNewPassword)
    }
  }

  const validateConfirmNewPassword = (confirmPassword: string): void => {
    setMatchPasswords(newPassword === confirmPassword)
  }

  const validateInputs = (): void => {
    setDisableButton(!(actualPassword && newPassword && confirmNewPassword && matchPasswords))
  }

  useEffect(() => {
    validateInputs()
  }, [validNewPassword, matchPasswords])

  const confirmChangeName = async (): Promise<void> => {
    const token = Cookies.get('token')
    if (newName && token) {
      const userData: ChangeNameData = {
        token,
        newName,
        oldName: name,
      }
      const response: ApiResponse = await changeName(userData)
      if (response.success) {
        const newName = response.success.data.newName
        if (newName) {
          setName(newName)
          refreshPage()
        }
      } else if (response.error) {
        console.log(response)
        setShowAlert(true)
        setAlertMessage('Ocorreu um erro na alteração do nome, verifique se foram usados caracteres especiais.')
        setAlertType('danger')
        setTimeout(() => {
          setShowAlert(false)
          setAlertMessage('')
        }, 3000)
      }
    }
  }

  const refreshPage = (): void => {
    if (typeof window !== 'undefined') {
      window.location.reload()
    }
  }

  const handleNewName = (value: string): void => {
    setNewName(value)
  }

  const handleConfirmPasswordPaste = (e: React.ClipboardEvent): void => {
    e.preventDefault()
  }

  const confirmChangePassword = async (): Promise<void> => {
    if (actualPassword && validNewPassword && confirmNewPassword) {
      const token = Cookies.get('token')
      if (token) {
        const userData: ChangePasswordData = {
          token,
          password: actualPassword,
          newPassword,
        }

        const result: ApiResponse = await changePassword(userData)

        if (result.success) {
          setShowAlert(true)
          setAlertMessage('Senha alterada com sucesso!')
          setAlertType('success')
          clearInputs()
          setTimeout(() => {
            setShowAlert(false)
            setAlertMessage('')
          }, 2000)
        } else if (result.error) {
          setShowAlert(true)
          setAlertMessage(result.error.message)
          setAlertType('danger')
          clearInputs()
          setTimeout(() => {
            setShowAlert(false)
            setAlertMessage('')
          }, 2000)
        }
      }
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter' && newName && editMode) {
      confirmChangeName()
    }
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.value.length <= 60) {
      handleNewName(e.target.value)
    }
  }

  return (
    <div className={styles.accountMain}>
      <div className={styles.dataContainer}>
        <div className={styles.inputs}>
          <div className={styles.nameInput}>
            {editMode ? (
              <div className={`input-group mb-3 ${styles.inputData}`}>
                <span className="input-group-text" id="inputGroup-sizing-default">
                  Nome
                </span>
                <input
                  ref={inputRef}
                  type="text"
                  className="form-control"
                  value={newName}
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-default"
                  onKeyDown={handleKeyDown}
                  onChange={handleInputChange}
                />
              </div>
            ) : (
              <div className={`input-group mb-3 ${styles.inputData}`}>
                <span className="input-group-text" id="inputGroup-sizing-default">
                  Nome
                </span>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-default"
                  readOnly
                />
              </div>
            )}

            <div className={styles.editIcon}>
              {editMode ? (
                <FontAwesomeIcon icon={faXmark} onClick={handleEditMode} style={{ cursor: 'pointer' }} />
              ) : (
                <FontAwesomeIcon icon={faPen} onClick={handleEditMode} style={{ cursor: 'pointer' }} />
              )}
            </div>
          </div>

          <div className={`input-group mb-3 ${styles.inputData}`}>
            <span className="input-group-text" id="inputGroup-sizing-default">
              Email
            </span>
            <input
              type="text"
              className="form-control"
              value={email}
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              readOnly
            />
          </div>

          <div className={styles.changePassword}>
            <button type="button" className="btn btn-primary" onClick={handleChangePassword}>
              Alterar senha
            </button>
          </div>

          {toggleChangePassword && (
            <div className={styles.passwordInputs}>
              <div className={`input-group mb-3 ${styles.inputData}`}>
                <span className="input-group-text" id="inputGroup-sizing-default">
                  Senha atual
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-control"
                  value={actualPassword}
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-default"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setActualPassword(e.target.value)}
                />
                <span
                  className="password-toggle-btn position-absolute end-0 top-50 translate-middle-y"
                  style={{ marginRight: '10px', cursor: 'pointer' }}
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              <div className={`input-group mb-3 ${styles.inputData}`}>
                <span className="input-group-text" id="inputGroup-sizing-default">
                  Nova senha
                </span>
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  className={`form-control ${
                    validNewPassword && newPassword ? styles.validInput : newPassword && !validNewPassword ? styles.invalidInput : ''
                  }`}
                  value={newPassword}
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-default"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setNewPassword(e.target.value)
                    validateNewPassword(e.target.value)
                  }}
                />
                <span
                  className="password-toggle-btn position-absolute end-0 top-50 translate-middle-y"
                  style={{ marginRight: '10px', cursor: 'pointer' }}
                  onClick={toggleNewPasswordVisibility}
                >
                  {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              <div className={`input-group mb-3 ${styles.inputData}`}>
                <span className="input-group-text" id="inputGroup-sizing-default">
                  Confirmar nova senha
                </span>
                <input
                  type={showConfirmNewPassword ? 'text' : 'password'}
                  className={`form-control ${
                    validNewPassword && confirmNewPassword && matchPasswords
                      ? styles.validInput
                      : confirmNewPassword && !matchPasswords
                      ? styles.invalidInput
                      : ''
                  }`}
                  value={confirmNewPassword}
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-default"
                  onPaste={handleConfirmPasswordPaste}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setConfirmNewPassword(e.target.value)
                    validateConfirmNewPassword(e.target.value)
                  }}
                />
                <span
                  className="password-toggle-btn position-absolute end-0 top-50 translate-middle-y"
                  style={{ marginRight: '10px', cursor: 'pointer' }}
                  onClick={toggleConfirmNewPasswordVisibility}
                >
                  {showConfirmNewPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              <div className={styles.passwordRules}>
                <p>
                  A senha deve possuir, no mínimo, 9 caracteres, incluindo pelo menos uma letra maiúscula, uma letra
                  minúscula e um número.
                </p>
              </div>

              <div className={styles.confirmButton}>
                <button
                  type="button"
                  className="btn btn-success"
                  disabled={disableButton}
                  onClick={confirmChangePassword}
                >
                  Confirmar
                </button>
              </div>
            </div>
          )}
        </div>

        <div className={styles.alertContainer}>{showAlert && <Alert type={alertType} message={alertMessage} />}</div>

        <div className={styles.deleteAccount}>
          <DeleteAccount />
        </div>
      </div>
    </div>
  )
}

export default Account 