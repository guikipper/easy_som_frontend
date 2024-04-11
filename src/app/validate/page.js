'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { validateEmail } from '../api/services/apiFunctions'
import styles from '../styles/Validate.module.css'
import Link from 'next/link'

// Obtém o parâmetro da URL

export default function Validate() {

    const [token, setToken] = useState(null);
    const searchParams = useSearchParams();
    const [validationResult, setValidationResult] = useState(1);

    useEffect(() => {
        const tokenFromParams = searchParams.get('token');
        console.log("Em validate, obtendo o token: ", tokenFromParams)
        if (tokenFromParams) {
            setToken(tokenFromParams);
        }
    }, [searchParams]);

    useEffect(() => {
        const validateEmailAndSetResult = async () => {
            if (token) {
                try {
                    const response = await validateEmail(token);
                    console.log("A resposta da validação: ", response)
                    setValidationResult(response);
                } catch (error) {
                    console.error(`Error during email validation: ${error.message}`);
                }
            }
        };

        validateEmailAndSetResult();
    }, [token]);
    
    return (
        <>
        <div className={styles.main}>

            <div className={styles.mainContent}>
            {validationResult && validationResult.status != 200 && (
                <p className={styles.waitingMessage}>Validando email...</p>
            )}
            {validationResult && validationResult.status == 200 && (
                <div className={styles.validationSuccess}>
                    <p className={styles.successMessage}>Seu email foi validado com sucesso!</p>
                   
                        <Link href="./login">
                        <button className={styles.loginButton}>
                            <p>Login</p>
                        </button>
                        </Link>
                    
                </div>   
                
            )}
            </div>
            
        </div>
        </>
    )
}