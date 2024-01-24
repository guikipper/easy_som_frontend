'use client'
import styles from '../styles/AccountPage.module.css'
import { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faXmark } from '@fortawesome/free-solid-svg-icons';

export default function Account() {

    const [userData, setUserData] = useState({})
    const [editMode, setEditMode] = useState(false)
    const [newName, setNewName] = useState()
    const [changePassword, setChangePassword] = useState(false)
    const inputRef = useRef(null)

    useEffect(() => {
        const name = localStorage.getItem("name");
        const email = localStorage.getItem("email")
        setUserData({name: name, email: email})
      }, [])

    const handleEditMode = () => {
        setEditMode(!editMode)
        console.log("O valor do editMode: ", editMode)
    }

    useEffect(() => {
        if (editMode) {
          inputRef.current.focus();
        }
      }, [editMode]);

      const handleChangePassword = () => {
        setChangePassword(!changePassword)
      }

      const handleNewName = (newName) => {
        setNewName((prevName) => {
            return newName;
        });
    };

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
                                value={userData.name} 
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
                        {newName && (
                            <div>
                                <button type="button" class="btn btn-success">Confimar</button>
                            </div>
                        )}
                        
                        
                    </div>
                    
                

                    <div className={`input-group mb-3 ${styles.inputData}`}>
                        <span className="input-group-text" id="inputGroup-sizing-default">Email</span>
                        <input type="text" className="form-control" value={userData.email} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" readOnly/>
                    </div>


                    <button type="button" className={`btn btn-light ${styles.toggleChangePassword}`} onClick={handleChangePassword}> 
                        Alterar senha
                    </button>


                    <div className={styles.changePassword}>
                        {changePassword && (
                            <div className={styles.changePasswordContainer}>
                                <div className={`input-group mb-3 ${styles.inputData}`}>
                                    <span className="input-group-text" id="inputGroup-sizing-default">Senha Atual</span>
                                    <input type="text" className="form-control" value="" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" readOnly/>
                                </div>

                                <div className={`input-group mb-3 ${styles.inputData}`}>
                                    <span className="input-group-text" id="inputGroup-sizing-default">Nova Senha</span>
                                    <input type="text" className="form-control" value="" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" readOnly/>
                                </div>

                                <button type="button" class="btn btn-success">Confimar</button>
                            </div>
                           
                        )}
                        
                    </div>
                    
                    
                </div>
                
            </div>

        </div>
    )
}