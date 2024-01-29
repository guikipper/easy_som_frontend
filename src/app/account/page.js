'use client'
import styles from '../styles/AccountPage.module.css'
import { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faXmark } from '@fortawesome/free-solid-svg-icons';
import { changeName, changePassword } from '../api/services/apiFunctions';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 
import { useGlobalNameContext } from "../contexts/globalName";;

export default function Account() {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [userId, setUserId] = useState("")
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

    useEffect(() => {
        const name = localStorage.getItem("name");
        const userId = localStorage.getItem("userId")
        const email = localStorage.getItem("email")
        setName(name)
        setEmail(email)
        setUserId(userId)
      }, [])

    const handleEditMode = () => {
        setEditMode(!editMode)
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

    useEffect(() => {
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
          //handleDivergentPassword(password)
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
        if (actualPassword && newPassword && confirmNewPassword) {
          setDisableButton(false)
        } else {
          setDisableButton(true)
        }
      };

      useEffect(() => {
        validateInputs();
      }, [validNewPassword, matchPasswords]);
      
      const confirmChangeName = async () => {

        if (newName) {
            const userData = {
                name: name,
                email: email,
                userId: userId,
                newName: newName
            }

            const response = await changeName(userData)

            if (response.statusCode == 201) {
                              
                const newName = response.newName
                localStorage.setItem("name", newName);
                setName(newName)
                window.location.reload();
            }
            return 
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
        console.log("Chamada do POST")
        if (actualPassword && validNewPassword && confirmNewPassword) {
            const userId = localStorage.getItem("userId")
            const userData = {
                userId: userId,
                password: actualPassword,
                newPassword: newPassword
            }
            const result = await changePassword(userData)
            console.log(result)
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
                                onChange={(e) => {
                                    handleNewName(e.target.value)
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
                                <button type="button" class="btn btn-success" onClick={confirmChangeName}>Confimar</button>
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
                                    autocomplete="off" 
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
                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </span>
                                    
                                </div>

                                {/* NewPassword */}
                                <div className={`input-group mb-3 ${styles.inputData}`}>
                                    <span className="input-group-text" id="inputGroup-sizing-default">Nova Senha</span>
                                    <input 
                                    type={showNewPassword ? 'text' : 'password'}  
                                    className={`form-control ${validNewPassword && newPassword ? styles.validInput : !validNewPassword && newPassword ? styles.invalidInput : ''}`} 
                                    value={newPassword}
                                    autocomplete="off"
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
                                            {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                                    </span>
                                </div>

                                {/* ConfirmNewPassword */}
                                <div className={`input-group mb-3 ${styles.inputData}`}>
                                <span className="input-group-text" id="inputGroup-sizing-default">Confirmar Nova Senha</span>
                                    <input 
                                    type={showConfirmNewPassword ? 'text' : 'password'} 
                                    className={`form-control ${validNewPassword && confirmNewPassword && matchPasswords ? styles.validInput : confirmNewPassword && !matchPasswords ? styles.invalidInput : ''}`}  
                                    value={confirmNewPassword}
                                    autocomplete="off"
                                    aria-label="Sizing example input" 
                                    aria-describedby="inputGroup-sizing-default"
                                    onPaste={handleConfirmPasswordPaste}
                                    onChange={(e) => {
                                        validateConfirmNewPassword(e.target.value)
                                        setConfirmNewPassword(e.target.value)
                                    }}
                                    />
                                    <span
                                        className={`${styles.eyeIcon} password-toggle-btn position-absolute end-0 top-50 translate-middle-y`}
                                        onClick={toggleConfirmNewPasswordVisibility}>
                                            {showConfirmNewPassword ? <FaEyeSlash /> : <FaEye />}
                                    </span>
                                </div>

                                <div className={styles.passwordRules}>
                                    <p>A nova senha deve possuir, no mínimo, 9 caracteres, incluindo pelo menos uma letra maiúscula, uma letra minúscula e um número.</p>
                                </div>

                                <button 
                                type="button" 
                                class="btn btn-success"
                                onClick={confirmChangePassword}
                                >
                                    Confimar
                                </button>
                            </div>
                           
                        )}
                        
                    </div>
                    
                    
                </div>
                
            </div>

        </div>
    )
}