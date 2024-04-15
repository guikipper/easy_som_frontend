'use client'
import styles from '../styles/AccountPage.module.css'

import { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faXmark } from '@fortawesome/free-solid-svg-icons';
import { changeName, changePassword } from '../api/services/apiFunctions';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 
import Alert from '../components/Alert';
import DeleteAccount from '../components/DeleteAccount';
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { authenticateWithToken } from '../api/services/apiFunctions';

export default function Account() {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [editMode, setEditMode] = useState(false)
    const [newName, setNewName] = useState("")
    const [toggleChangePassword, setToggleChangePassword] = useState(false)
    const inputRef = useRef(null)
    const [actualPassword, setActualPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmNewPassword, setConfirmNewPassword] = useState("")
    const [validNewPassword, setValidNewPassword] = useState(false)
    const [matchPasswords, setMatchPasswords] = useState(false)
    const [disableButton, setDisableButton] = useState(true)
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
    const [showAlert, setShowAlert] = useState(false)
    const [alertType, setAlertType] = useState("")
    const [alertMessage, setAlertMessage] = useState("")
    const router = useRouter()
      
    useEffect(() => {
        getData()
      }, [])
    
    const clearCookies = () => {
      const allCookies = Cookies.get();
      for (let cookie in allCookies) {
          Cookies.remove(cookie);
      }
    };

    const getData = async () => {
        const token = Cookies.get('token')
        const userData = await authenticateWithToken(token)
        if(userData.error) {
            clearCookies()
            router.push('/login')
        } else {
            setName(userData.success.data.name)
            setEmail(userData.success.data.email)
        }
        
    }

    const handleEditMode = () => {
        setEditMode(!editMode)
    }
    
    const clearInputs = () => {
        setActualPassword("")
        setNewPassword("")
        setConfirmNewPassword("")
    }
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const toggleNewPasswordVisibility = () => {
        setShowNewPassword(!showNewPassword);
    };
    const toggleConfirmNewPasswordVisibility = () => {
        setShowConfirmNewPassword(!showConfirmNewPassword);
    };

    useEffect(() => { //para foco do input ao clicar no ícone de edição (para editar o nome)
        if (editMode) {
          inputRef.current.focus();
        }
      }, [editMode]);

      const handleChangePassword = () => {
        setToggleChangePassword(!toggleChangePassword)
      }

      const validateNewPassword = (password) => {
        const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{9,}$/
        const valid = regexPassword.test(password)
        if (valid) {
          handleDivergentPassword(password)
          setValidNewPassword(true)
        }
        else {
          setValidNewPassword(false)
        }
      }

      const handleDivergentPassword = (password) => {
        if (confirmNewPassword) {
          if (password == confirmNewPassword) {
            setMatchPasswords(true)
          } else {
            setMatchPasswords(false)
          }
        }
      }

      const validateConfirmNewPassword = (confirmPassword) => {
        if (newPassword == confirmPassword) {
            setMatchPasswords(true)
          } else {
            setMatchPasswords(false)
          }
      }

      const validateInputs = () => {
        if (actualPassword && newPassword && confirmNewPassword && matchPasswords) {
          setDisableButton(false)
        } else {
          setDisableButton(true)
        }
      };

      useEffect(() => {
        validateInputs();
      }, [validNewPassword, matchPasswords]);
      
      const confirmChangeName = async () => {
        const token = Cookies.get('token')
        if (newName) {
            const userData = {
                token: token,
                newName: newName,
                oldName: name
            }
            const response = await changeName(userData)
            if (response.success) {         
                const newName = response.success.data.newName
                setName(newName)
                refreshPage()
            } else {
                //console.log(response)
            }
            return 
        }
      }

      function refreshPage() {
        if (typeof window !== "undefined") {
            window.location.reload();
        }
    }

      const handleNewName = (newName) => {
        setNewName((prevName) => {
            return newName;
        });
    };

    const handleConfirmPasswordPaste = (e) => {
        e.preventDefault()
      }

    const confirmChangePassword = async () => {
        if (actualPassword && validNewPassword && confirmNewPassword) {
            const token = Cookies.get("token")
            const userData = {
                token: token,
                password: actualPassword,
                newPassword: newPassword
            }
            
            const result = await changePassword(userData)
            console.log(result)

            if (result.success) {
                setShowAlert(true)
                setAlertMessage("Senha alterada com sucesso!")
                setAlertType("success")
                clearInputs()
                setTimeout(() => {
                    setShowAlert(false) 
                    setAlertMessage("")
                    setAlertType("")
                }, 2000)
            } else if (result.error) {
                setShowAlert(true)
                setAlertMessage(result.error.message)
                setAlertType("danger")
                clearInputs()
                setTimeout(() => {
                    setShowAlert(false) 
                    setAlertMessage("")
                    setAlertType("")
                }, 2000)
            }
        }
    }

    return (
        <div className={styles.accountMain}>
            
            <div className={styles.dataContainer}>
                <div className={styles.inputs}>
                    <div className={styles.nameInput}>
                        {editMode ? (
                            <div className={`input-group mb-3 ${styles.inputData}`}>
                                <span className="input-group-text" id="inputGroup-sizing-default">Nome</span>
                                <input 
                                ref={inputRef} 
                                type="text" 
                                className="form-control" 
                                value={newName} 
                                aria-label="Sizing example input" 
                                aria-describedby="inputGroup-sizing-default"
                                onKeyDown={(e) => {
                                    if(e.key === 'Enter' && newName && editMode) {
                                        confirmChangeName();
                                    }
                                }}
                                onChange={(e) => {
                                    if (e.target.value.length <= 60) {
                                        handleNewName(e.target.value)
                                      }
                                }}
                                />
                            </div>
                            
                        ) : (
                            <div className={`input-group mb-3 ${styles.inputData}`}>
                                <span className="input-group-text" id="inputGroup-sizing-default">Nome</span>
                                <input 
                                type="text" 
                                className="form-control" 
                                value={name} 
                                aria-label="Sizing example input" 
                                aria-describedby="inputGroup-sizing-default" 
                                readOnly/>
                            </div> 
                        )}

                        {editMode ? (
                            <div className={styles.icon}>
                                <FontAwesomeIcon icon={faXmark} color="white" cursor="pointer" onClick={handleEditMode}/> 
                            </div>
                        ) : (
                            <div className={styles.icon}>
                                <FontAwesomeIcon icon={faPen} color="white" cursor="pointer" onClick={handleEditMode}/> 
                            </div>
                        )}
                        {newName && editMode && (
                            <div>
                                <button type="button" className="btn btn-success" onClick={confirmChangeName}>Confimar</button>
                            </div>
                        )}      
                        
                    </div>                 

                    <div className={`input-group mb-3 ${styles.inputData}`}>
                        <span className="input-group-text" id="inputGroup-sizing-default">Email</span>
                        <input type="text" className="form-control" value={email} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" readOnly/>
                    </div>

                    <button type="button" className={`btn btn-light ${styles.toggleChangePassword}`} onClick={handleChangePassword}> 
                        Alterar senha
                    </button>

                </div>

                    <div className={styles.changePassword}>
                        {toggleChangePassword && (
                            <div className={styles.changePasswordContainer}>

                                {/* ActualPassword */}
                                <div className={`input-group mb-3 ${styles.inputData}`}>
                                    <span className="input-group-text" id="inputGroup-sizing-default">Senha Atual</span>
                                    <input 
                                    type={showPassword ? 'text' : 'password'} 
                                    className="form-control" 
                                    value={actualPassword}
                                    autoComplete="off" 
                                    aria-label="Sizing example input" 
                                    aria-describedby="inputGroup-sizing-default"
                                    onPaste={handleConfirmPasswordPaste}
                                    onChange={(e) => {
                                        setActualPassword(e.target.value)
                                    }}
                                    />
                                    <span
                                        className={`${styles.eyeIcon} password-toggle-btn position-absolute end-0 top-50 translate-middle-y`}
                                        onClick={togglePasswordVisibility}>
                                            {showPassword ? <FaEyeSlash cursor="pointer"/> : <FaEye cursor="pointer"/>}
                                    </span>
                                    
                                </div>

                                {/* NewPassword */}
                                <div className={`input-group mb-3 ${styles.inputData}`}>
                                    <span className="input-group-text" id="inputGroup-sizing-default">Nova Senha</span>
                                    <input 
                                    type={showNewPassword ? 'text' : 'password'}  
                                    className={`form-control ${validNewPassword && newPassword ? styles.validInput : !validNewPassword && newPassword ? styles.invalidInput : ''}`} 
                                    value={newPassword}
                                    autoComplete="off"
                                    aria-label="Sizing example input" 
                                    aria-describedby="inputGroup-sizing-default"
                                    onPaste={handleConfirmPasswordPaste}
                                    onChange={(e) => {
                                        validateNewPassword(e.target.value)
                                        setNewPassword(e.target.value)
                                    }}
                                    />
                                    <span
                                        className={`${styles.eyeIcon} password-toggle-btn position-absolute end-0 top-50 translate-middle-y`}
                                        onClick={toggleNewPasswordVisibility}>
                                            {showNewPassword ? <FaEyeSlash cursor="pointer"/> : <FaEye cursor="pointer"/>}
                                    </span>
                                </div>

                                {/* ConfirmNewPassword */}
                                <div className={`input-group mb-3 ${styles.inputData}`}>
                                <span className="input-group-text" id="inputGroup-sizing-default">Confirmar Nova Senha</span>
                                    <input 
                                    type={showConfirmNewPassword ? 'text' : 'password'} 
                                    className={`form-control ${validNewPassword && confirmNewPassword && matchPasswords ? styles.validInput : confirmNewPassword && !matchPasswords ? styles.invalidInput : ''}`}  
                                    value={confirmNewPassword}
                                    autoComplete="off"
                                    aria-label="Sizing example input" 
                                    aria-describedby="inputGroup-sizing-default"
                                    onPaste={handleConfirmPasswordPaste}
                                    onKeyDown={(e) => {
                                        if(e.key === 'Enter' && !disableButton) {
                                            confirmChangePassword();
                                        }
                                    }}
                                    onChange={(e) => {
                                        validateConfirmNewPassword(e.target.value)
                                        setConfirmNewPassword(e.target.value)
                                    }}
                                    />
                                    <span
                                        className={`${styles.eyeIcon} password-toggle-btn position-absolute end-0 top-50 translate-middle-y`}
                                        onClick={toggleConfirmNewPasswordVisibility}>
                                            {showConfirmNewPassword ? <FaEyeSlash cursor="pointer"/> : <FaEye cursor="pointer"/>}
                                    </span>
                                </div>

                                <div className={styles.passwordRules}>
                                    <p>A nova senha deve possuir, no mínimo, 9 caracteres, incluindo pelo menos uma letra maiúscula, uma letra minúscula e um número.</p>
                                </div>

                                { (!matchPasswords && newPassword && confirmNewPassword !== undefined && confirmNewPassword !== null && confirmNewPassword !== "") && (
                                    <p className={styles.feedbackMessage}>As senhas não coincidem.</p>)}
          
                                { (matchPasswords && newPassword && confirmNewPassword !== undefined && confirmNewPassword !== null && confirmNewPassword !== "") && (
                                    <p className={styles.positiveFeedbackMessage}>As senhas  coincidem.</p>)}

                                <button
                                disabled={disableButton} 
                                type="button" 
                                className="btn btn-success"
                                onClick={confirmChangePassword}
                                >
                                    Confimar
                                </button>
                            </div>
                           
                        )}
                        
                    </div>
    
            <DeleteAccount/> 
                    
            <div className={styles.footer}>
                {showAlert && alertType && alertMessage && (
                        <Alert type={alertType} message={alertMessage}/>
                    )}
            </div>
            
            </div>

        </div>
    )
}