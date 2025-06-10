'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { validateEmail } from '../api/services/apiFunctions'
import styles from '../styles/Validate.module.css'
import Link from 'next/link'
import { ResponseFeedback } from '../components/ResponseFeedback'

interface ValidationResult {
  success?: boolean;
  error?: {
    details: Array<{
      message: string;
    }>;
  };
}

const Validate: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const [validationResult, setValidationResult] = useState<ValidationResult>({});
  const [error, setError] = useState<boolean>(false);
  const [validating, setValidating] = useState<boolean>(false);

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
          setValidating(true);
          const response = await validateEmail(token);
          const data: ValidationResult = await response.json();
          setValidationResult(data);
          if (data.success || data.error) {
            setValidating(false);
          }
        } catch (error) {
          if (error instanceof Error) {
            console.error(`Error during email validation: ${error.message}`);
          }
        }
      }
    };
    validateEmailAndSetResult();
  }, [token]);

  return (
    <>
      <div className={styles.main}>
        <div className={styles.mainContent}>
          {validating && (
            <p className={styles.waitingMessage}>Validando email...</p>
          )}

          {validationResult.success && (
            <div className={styles.validationSuccess}>
              <p className={styles.successMessage}>Seu email foi validado com sucesso!</p>
              <Link href="./login">
                <button className={styles.loginButton}>
                  <p>Login</p>
                </button>
              </Link>
            </div>
          )}

          {validationResult.error && (
            <ResponseFeedback
              type="error"
              message=""
              details={validationResult.error.details[0].message}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Validate; 