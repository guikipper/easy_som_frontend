'use client'
import styles from '../styles/RecoverPassword.module.css'
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 
import { useState, useEffect } from 'react'
import Alert from '../components/Alert';
import Loading from '../components/Loading';
import { recoverPasswordRoute } from '../api/services/apiFunctions';
import { useSearchParams, useRouter } from 'next/navigation'

export default function recoverPassword() {

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [newPassword, setNewPassword] = useState("")
    const [confirmNewPassword, setConfirmNewPassword] = useState("")
    const [validPassword, setValidPassword] = useState(false)
    const [validConfirmPassword, setValidConfirmPassword] = useState(false)
    const [matchPasswords, setMatchPasswords] = useState(false)
    const searchParams = useSearchParams();
    const [token, setToken] = useState(null);
    const router = useRouter()

    const [showAlert, setShowAlert] = useState(false)
    const [alertType, setAlertType] = useState("")
    const [alertMessage, setAlertMessage] = useState("")
    const [showLoading, setShowLoading] = useState(false)

    useEffect(() => {
        const tokenFromParams = searchParams.get('token');
        if (tokenFromParams) {
            setToken(tokenFromParams);
        }
    }, [searchParams]);

    const handleConfirmPasswordPaste = (e) => {
        e.preventDefault()
    }
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const confirmChangePassword = async () => {
        if (newPassword && validPassword && confirmNewPassword && validConfirmPassword && matchPasswords && token) {
            setShowAlert(false)
            setShowLoading(true)
            const response = await recoverPasswordRoute(newPassword, token)
            const data = await response.json()

            if (response.status == 201 && data.message == "Senha alterada com sucesso!") {
                setShowLoading(false)
                setShowAlert(true)
                setAlertMessage(data.message)
                setAlertType("success")
                setTimeout(() => {
                    router.push('/login')
                }, 1500)
            }
            else if(response.status == 401 && data.message == "Erro: Token expirado.") {
                setShowLoading(false)
                setShowAlert(true)
                setAlertMessage(data.message)
                setAlertType("danger")
            }
            else if(response.status == 401 && data.message == "Erro: Token inválido.") {
                setShowLoading(false)
                setShowAlert(true)
                setAlertMessage(data.message)
                setAlertType("danger")
            }
            else if(response.status == 401 && data.message == "Erro: Falha ao autenticar o token.") {
                setShowLoading(false)
                setShowAlert(true)
                setAlertMessage(data.message)
                setAlertType("danger")
            }
            else if(response.status == 401 && data.message == "Por segurança, escolha uma senha diferente da atual.") {
                setShowLoading(false)
                setShowAlert(true)
                setAlertMessage(data.message)
                setAlertType("danger")
            }

        }
    }

    const regexPasswordValidator = (password) => {
        const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{9,}$/
        const valid = regexPassword.test(password)
        if (valid) {
            return true
        } else {
            return false
        }
    }

    const validatePassword = (password) => {
        
        if (password == confirmNewPassword) {
            setMatchPasswords(true)
        } else {
            setMatchPasswords(false)
        }
        const result = regexPasswordValidator(password)

        if (result) {
            setValidPassword(true)
        } else {
            setValidPassword(false) 
        }
    }

    const validateConfirmPassword = (confirmPassword) => {
            if (confirmPassword == newPassword) {
                setValidConfirmPassword(true)
                setMatchPasswords(true)
            } else {
                setValidConfirmPassword(false)
                setMatchPasswords(false)
            }
    }


    return(
        <div className={styles.main}>
            <div className={styles.container}>
                <h1 className={styles.title}>Defina uma nova senha</h1>
                {/* New Password */}
                <div className={`input-group mb-3 ${styles.inputData}`}>
                        <span className="input-group-text" id="inputGroup-sizing-default">Nova Senha</span>
                        <input 
                        type={showPassword ? 'text' : 'password'} 
                        className={`form-control ${validPassword && newPassword ? styles.validInput : newPassword && !validPassword ? styles.invalidInput : ''}`} 
                        value={newPassword}
                        autoComplete="off" 
                        aria-label="Sizing example input" 
                        aria-describedby="inputGroup-sizing-default"
                        onPaste={handleConfirmPasswordPaste}
                        onChange={(e) => {
                            setNewPassword(e.target.value),
                            validatePassword(e.target.value)
                        }}
                        />
                        <span
                            className={`${styles.eyeIcon} password-toggle-btn position-absolute end-0 top-50 translate-middle-y`}
                            onClick={togglePasswordVisibility}>
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>             
                </div>

                {/* Confirm New Password */}

                <div className={`input-group mb-3 ${styles.inputData}`}>
                        <span className="input-group-text" id="inputGroup-sizing-default">Confirmar Nova Senha</span>
                        <input 
                        type={showConfirmPassword ? 'text' : 'password'} 
                        className={`form-control ${validConfirmPassword && confirmNewPassword && matchPasswords ? styles.validInput : confirmNewPassword && !matchPasswords ? styles.invalidInput : ''}`}  
                        value={confirmNewPassword}
                        autoComplete="off" 
                        aria-label="Sizing example input" 
                        aria-describedby="inputGroup-sizing-default"
                        onPaste={handleConfirmPasswordPaste}
                        onChange={(e) => {
                            setConfirmNewPassword(e.target.value),
                            validateConfirmPassword(e.target.value)
                        }}
                        />
                        <span
                            className={`${styles.eyeIcon} password-toggle-btn position-absolute end-0 top-50 translate-middle-y`}
                            onClick={toggleConfirmPasswordVisibility}>
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>             
                </div>
                <div className={styles.passwordRules}>
                    <p>A senha deve possuir, no mínimo, 9 caracteres, incluindo pelo menos uma letra maiúscula, uma letra minúscula e um número.</p>
                </div>
                
                {/* FeedBack */}
                <div className={styles.feedbackDiv}>
                { (!matchPasswords && newPassword && confirmNewPassword !== undefined && confirmNewPassword !== null && confirmNewPassword !== "") && (
                                <p className={styles.feedbackMessage}>As senhas não coincidem.</p>)}
                        
                                { (matchPasswords && newPassword && confirmNewPassword && validPassword !== undefined && confirmNewPassword !== null && confirmNewPassword !== "") && (
                                <p className={styles.positiveFeedbackMessage}>As senhas  coincidem.</p>)}
                </div>
                
                {/* Confirm Button */}

                <button
                 disabled={!(newPassword && validPassword && confirmNewPassword && validConfirmPassword && matchPasswords)} 
                 type="button" 
                 className={`btn btn-success ${styles.confirmButton}`}
                 onClick={confirmChangePassword}
                 >
                     Confimar
                </button>
                <div className={styles.alertContainer}>
                    {showLoading && (
                        <Loading/>
                    )}
                    {showAlert && (
                        <Alert type={alertType} message={alertMessage}/>
                    )}
                </div> 
            </div>
        </div>
    )
}

