'use client'

import { useState, useEffect } from 'react'
import styles from '../styles/Signup.module.css'
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 
import { useRouter } from 'next/navigation'
import { signUp } from '../api/services/apiFunctions'
import Redirecting from '../components/Redirecting';
import Alert  from '../components/Alert';
export default function SignUp() {

  const [nameAndLastName, setNameAndLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState()
  const [confirmPassword, setConfirmPassword] = useState('')

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [matchPasswords, setMatchPasswords] = useState(false)
  const [validPassword, setValidPassword] = useState(false)
  const [disableButton, setDisableButton] = useState(true)
  const [validEmail, setValidEmail] = useState(false)
  const [redirect, setRedirect] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")

  const router = useRouter()

  const handleSignUp = async () => {
    cleanAlert()
    const userData = {
      name: nameAndLastName.toLowerCase(),
      email: email.toLowerCase(),
      password: password,
    };
    const response = await signUp(userData)
    console.log(response)
    if (response.error) {
      console.log("Deu erro na solicitação")
        setShowAlert(true)
        setAlertMessage(response.error.details[0].message)
    }
    if (response.success) {
      console.log("Deu sucesso na solicitação")
      setRedirect(true)
      setTimeout(() => {
        router.push('/login')
      }, 2000)
    } 
  }

  const cleanAlert = () => {
    setShowAlert(false)
    setAlertMessage("")
  }

  useEffect(() => {
    validateInputs();
  }, [validPassword, nameAndLastName, email, matchPasswords]);

  const validateEmail = (input) => {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const valid = regexEmail.test(input);
    if (valid) {
      setValidEmail(true)
    } else {
      setValidEmail(false)
    }
    return valid;
  };

  const validatePassword = (password) => {
    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{9,}$/
    const valid = regexPassword.test(password)
    if (valid) {
      handleDivergentPassword(password)
      setValidPassword(true)
    }
    else {
      handleDivergentPassword(password)
      setValidPassword(false)
    }
  }

  const handleDivergentPassword = (password) => {
    if (confirmPassword) {
      if (password == confirmPassword) {
        setMatchPasswords(true)
      } else {
        setMatchPasswords(false)
      }
    }
  }

  const validateConfirmPassword = (confirmPassword) => {
    if (password == confirmPassword) {
      setMatchPasswords(true)
    } else {
      setMatchPasswords(false)
    }
  }

  const validateInputs = () => {
    if (nameAndLastName && validEmail && validPassword && matchPasswords) {
      setDisableButton(false)
    } else {
      setDisableButton(true)
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  }

  const handleConfirmPasswordPaste = (e) => {
    e.preventDefault()
  }

  useEffect(() => {
    if (password == '') {
      setConfirmPassword('')
    }
  }, [password])

  const handleNameInput = (e) => {
    if (e.target.value.length <= 60) {
      setNameAndLastName(e.target.value)
    }
  }
  
  const handleEmailInput = (e) => {
    if (e.target.value.length <= 60) {
      setEmail(e.target.value),
      validateEmail(e.target.value);
    }
  }

  const handlePasswordInput = (e) => {
    if (e.target.value.length <= 60) {
      setPassword(e.target.value),
      validatePassword(e.target.value)
    }
  }

  const handleConfirmPasswordInput = (e) => {
    if (e.target.value.length <= 60) {
      setConfirmPassword(e.target.value),
      validateConfirmPassword(e.target.value)
    }
  }

  return(
    <>
   
    <div className={styles.signupMain}>
    {redirect && (
      <Redirecting email={email}/>
    )}
    {showAlert && (
      <Alert type="danger" message={alertMessage}/>
    )}
    
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
            onKeyDown={(e) => {
              if(e.key === 'Enter' && !disableButton) {
                handleSignUp();
              }
            }}
          />
          <label htmlFor="floatingInput">Nome e sobrenome</label>
        </div>
        
        <div className="form-floating mb-3">
          <input
            type="email"
            value={email}
            className={`form-control ${styles.inputs} ${validEmail && email ? styles.validInput : validEmail === false && email ? styles.invalidInput : ''}`}
            id="floatingInputEmail"
            placeholder="name@example.com"
            onChange={handleEmailInput}
            onKeyDown={(e) => {
              if(e.key === 'Enter' && !disableButton) {
                handleSignUp();
              }
            }}
          />
          <label htmlFor="floatingInput">Email</label>
        </div>

        {/* Password */}
        <div className="form-floating">
          <input
            value={password}
            type={showPassword ? 'text' : 'password'}
            className={`form-control ${styles.inputs} ${validPassword && password ? styles.validInput : !validPassword && password ? styles.invalidInput : ''}`}
            id="floatingPassword"
            placeholder="Password"
            onChange={handlePasswordInput}
            onKeyDown={(e) => {
              if(e.key === 'Enter' && !disableButton) {
                handleSignUp();
              }
            }}
          />
          <label htmlFor="floatingPassword">Senha</label>
          <span
          className="password-toggle-btn position-absolute end-0 top-50 translate-middle-y"
          style={{ marginRight: '10px' }}
          onClick={togglePasswordVisibility}>
            {showPassword ? <FaEyeSlash style={{cursor: 'pointer'}}/> : <FaEye style={{cursor: 'pointer'}}/>}
          </span>
          <div className={styles.passwordRules}>
            <p>A senha deve possuir, no mínimo, 9 caracteres, incluindo pelo menos uma letra maiúscula, uma letra minúscula e um número.</p>
          </div>
         
          
        </div>

        {/* ConfirmPassword */}
        <div className={`form-floating ${styles.confirmPassword}`}>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            className={`form-control ${styles.inputs} ${styles.confirmPasswordCss} ${validPassword && confirmPassword && matchPasswords ? styles.validInput : confirmPassword && !matchPasswords ? styles.invalidInput : ''}`}
            id="floatingConfirmPassword"
            placeholder="Password"
            value={confirmPassword}
            disabled={!validPassword}
            onPaste={handleConfirmPasswordPaste}
            onChange={handleConfirmPasswordInput}
            onKeyDown={(e) => {
              if(e.key === 'Enter' && !disableButton) {
                handleSignUp();
              }
            }}
          />
          <label htmlFor="floatingPassword">Confirmar senha</label>
          <span
          className="password-toggle-btn position-absolute end-0 top-50 translate-middle-y"
          style={{ marginRight: '10px' }}
          onClick={toggleConfirmPasswordVisibility}>
            {showConfirmPassword ? <FaEyeSlash style={{cursor: 'pointer'}}/> : <FaEye style={{cursor: 'pointer'}}/>}
          </span>
          
          { (!matchPasswords && password && confirmPassword !== undefined && confirmPassword !== null && confirmPassword !== "") && (
          <p className={styles.feedbackMessage}>As senhas não coincidem.</p>)}
          
          { (matchPasswords && password && confirmPassword !== undefined && confirmPassword !== null && confirmPassword !== "") && (
          <p className={styles.positiveFeedbackMessage}>As senhas  coincidem.</p>)}
          
        </div>
       
        <div>
          <button className={styles.sendPostButton}
          disabled={disableButton}
          style={{
            height: '50px',
            width: '180px',
            fontWeight: 'bold',
            outline: 'none',
            border: 'none',
            backgroundColor: disableButton ? '#ccc' : '#00A2FF',
            color: 'white',
            borderRadius: '8px',
            cursor: disableButton ? 'not-allowed' : 'pointer'
          }}
          onClick={handleSignUp}>
            Criar conta
          </button>
        </div>
      </div>
    </div>
    </>
  );
}