'use client'

import styles from '../styles/Login.module.css'
import Link from 'next/link'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState, useEffect } from 'react'
import { login } from '../api/services/apiFunctions'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie';
import Loading from '../components/Loading';
import RecoverPassword from '../components/ForgetPassword';
import ErrorFeedback from '../components/ErrorFeedback';

export default function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [feedback, setFeedback] = useState("")
    const [disableButton, setDisableButton] = useState(true)
    const [showPassword, setShowPassword] = useState(false);
    const [showLoading, setShowLoading] = useState(false)
    const router = useRouter()

    const handleLoginButton = async () => {
        try {
            setShowLoading(true)
            const response = await login(email, password)
            if (response) {
                setShowLoading(false)
            }
            if (response.error) {
                handleErrorFeedback(response.error.message)
            }
            if (response.success) {
                Cookies.set('token', response.success.data.token);
                router.push('/');
            }
        } catch (error) {
            console.log("Ocorreu um erro: ", error)
        }
       
    }

    const handleErrorFeedback = (error) => {
        setFeedback('')
        setFeedback(error)
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const validateInputs = () => {
            if (email && password) {
              setDisableButton(false)
            } else {
              setDisableButton(true)
            }
    }

    useEffect(() => {
        validateInputs();
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
                        onChange={(e) => { setEmail(e.target.value) }}
                        onKeyDown={(e) => {
                            if(e.key === 'Enter' && !disableButton) {
                                handleLoginButton();
                            }
                        }}
                        />
                    </div>

                     <div className="form-floating">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            className={styles.password} 
                            placeholder="Password"
                            onChange={(e) => {
                            setPassword(e.target.value)
                            }}
                            onKeyDown={(e) => {
                                if(e.key === 'Enter' && !disableButton) {
                                    handleLoginButton();
                                }
                            }}
                        />
                        <span
                        className="password-toggle-btn position-absolute end-0 top-50 translate-middle-y"
                        style={{ marginRight: '10px' }}
                        onClick={togglePasswordVisibility}>
                            {showPassword ? <FaEyeSlash style={{cursor: 'pointer'}}/> : <FaEye style={{cursor: 'pointer'}}/>}
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
                            cursor: disableButton ? 'not-allowed' : 'pointer'
                          }}
                        onClick={handleLoginButton}
                        >
                        Entrar
                        </button>
                    </div>
                    
                </div>


                <div className={styles.errorFeedbackDiv}>
                    {feedback != '' && (
                        <ErrorFeedback feedback={feedback}/>
                    )}
                </div> 
                

                
                <div className={styles.loadingWrapper}>
                    {showLoading && (
                        <div className={styles.loadingImage}>
                            <Loading/>
                        </div>
                    )}
                </div> 

                <div className={styles.forgetPassword}>
                    <RecoverPassword/>
                </div>  
                
                <p>Não tem uma conta? 
                    <Link href="./signup" className={styles.signUpLink}>
                        <span className={styles.signUpLink}> Cadastrar agora.</span>
                    </Link> 
                </p>
           
            </div>
        </div>
    )
}