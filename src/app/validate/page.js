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
        if (tokenFromParams) {
            setToken(tokenFromParams);
        }
    }, [searchParams]);

    useEffect(() => {
        const validateEmailAndSetResult = async () => {
            if (token) {
                try {
                    const response = await validateEmail(token);
                    setValidationResult(response);
                } catch (error) {
                    console.error(`Error during email validation: ${error.message}`);
                    // Pode tratar o erro de forma apropriada aqui, se necessário
                }
            }
        };

        validateEmailAndSetResult();
    }, [token]);



        if (validationResult && validationResult.status) {
            console.log('Aqui está o status: ', validationResult.status.toString());
        }

    
    
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
                    <button className={styles.loginButton}>
                        <Link href="./login" legacyBehavior>
                            <a className={styles.loginLink}>
                                <p>Login</p>
                            </a>
                        </Link>
                    </button>
                </div>   
                
            )}
            </div>
            
        </div>
        </>
    )
}