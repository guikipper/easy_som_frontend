'use client'

import styles from '../styles/Login.module.css'
import Link from 'next/link'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState, useEffect } from 'react'
import { login } from '../api/services/apiFunctions'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie';
import Loading from '../components/Loading';

export default function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [feedback, setFeedback] = useState("")
    const [disableButton, setDisableButton] = useState(true)
    const [showPassword, setShowPassword] = useState(false);
    const [showLoading, setShowLoading] = useState(false)
    const router = useRouter()

    useEffect(() => {
        const handleStorageChange = () => {
          const savedData = localStorage.getItem("name");
          if (savedData != '' && savedData != null) {
            router.push('/')
          }
        };
       handleStorageChange();
      }, []);

    const handleLoginButton = async () => {
        try {
            setShowLoading(true)
            const response = await login(email, password)
            console.log('A resposta do servidor: ', response)
            if (response) {
                setShowLoading(false)
            }
            if (response.statusCode == 201) {
                console.log('A resposta do servidor', response.token)
                Cookies.set('token', response.token);
                //localStorage.setItem('userId', response.userId);
                //localStorage.setItem('name', response.username);
                //localStorage.setItem('email', response.email);
                router.push('/');
            }
            if (response.statusCode != 201) {
                setFeedback('')
                setFeedback(response.message)                
            }
        } catch (error) {
            console.log("Deu erro em handleLoginButton: ", error)
        }
       
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const validateInputs = () => {
        console.log("Verificando o email: ", email)
        console.log("Verificando a senha: ", password)
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
                        />
                        <span
                        className="password-toggle-btn position-absolute end-0 top-50 translate-middle-y"
                        style={{ marginRight: '10px' }}
                        onClick={togglePasswordVisibility}>
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
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

                <div className={styles.feedbackDiv}>
                    {feedback != '' && (
                            <h2 className={styles.feedback}>{feedback}</h2>
                        )}
                </div>

                
                <div className={styles.loadingWrapper}>
                    {showLoading && (
                        <div className={styles.loadingImage}>
                            <Loading/>
                        </div>
                    )}
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