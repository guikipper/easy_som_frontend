import { useState } from 'react'
import styles from '../styles/ForgetPassword.module.css'
import { sendPasswordRecoveryEmail } from '../api/services/apiFunctions'
import Alert from '../components/Alert'
import Loading from './Loading'

export default function RecoverPassword() {
    const [showModal, setShowModal] = useState(false)
    const [email, setEmail] = useState("")
    const [showAlert, setShowAlert] = useState(false)
    const [alertMessage, setAlertMessage] = useState("")
    const [alertType, setAlertType] = useState("")
    const [showLoading, setShowLoading] = useState(false)

    const sendRecoveryEmail = async () => {
        if (email) {
            removeAlert()
            setShowLoading(true)
            const response = await sendPasswordRecoveryEmail(email)
            const data = await response.json()

            if(response.status == 201) {
                setShowAlert(true)
                setShowLoading(false)
                setAlertMessage(data.message)
                setAlertType("success")
            }
            if(response.status == 404) {
                setShowLoading(false)
                setShowAlert(true)
                setAlertMessage(data.message)
                setAlertType("danger")
            }
        }
    }
    const removeAlert = () => {
            setShowAlert(false)
            setAlertMessage("")
            setAlertType("success")
    }
    return (
        <>
            <button
                type="button"
                className={`${styles.recoverPasswordModalButton}`}
                onClick={() => {
                    setShowModal(true);
                    setShowAlert(false);
                }}
                ><p>Esqueceu sua senha?</p>
            </button>

            

            {showModal && ( 
                <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Recuperar conta</h1>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowModal(false)} // Fecha o modal
                                ></button>
                            </div>
                            <div className="modal-body">
                                <label htmlFor="inputPassword5" className="form-label">Informe o email da sua conta.</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    aria-describedby="passwordHelpBlock"
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Fechar</button>
                                <button
                                    disabled={email.length < 6}
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={(sendRecoveryEmail)}
                                >
                                    Enviar
                                </button>
                            </div>
                            <div className={styles.clientFeedback}>
                                {showLoading && (
                                    <div className={styles.loadingContainer}>
                                        <Loading />
                                    </div>
                                )} 
                                
                                {showAlert && (
                                    <div>
                                        <Alert type={alertType} message={alertMessage} />
                                    </div>
                                )}
                            </div>
                            
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}