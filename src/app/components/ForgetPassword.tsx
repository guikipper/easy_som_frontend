import React, { useState } from 'react';
import styles from '../styles/ForgetPassword.module.css';
import { sendPasswordRecoveryEmail } from '../api/services/apiFunctions';
import Alert from '../components/Alert';
import Loading from './Loading';

interface ApiResponse {
  success?: {
    message: string;
  };
  error?: {
    message: string;
  };
}

type AlertType = 'success' | 'danger' | 'warning' | 'info';

const RecoverPassword: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [alertType, setAlertType] = useState<AlertType>('success');
  const [showLoading, setShowLoading] = useState<boolean>(false);

  const sendRecoveryEmail = async (): Promise<void> => {
    if (email) {
      removeAlert();
      setShowLoading(true);
      try {
        const response = await sendPasswordRecoveryEmail(email);
        if (response) {
          const data: ApiResponse = await response.json();
          
          if (data.success) {
            setAlertType('success');
            setShowAlert(true);
            setShowLoading(false);
            setAlertMessage(data.success.message);
          }
          
          if (data.error) {
            setAlertType('danger');
            setShowLoading(false);
            setShowAlert(true);
            setAlertMessage(data.error.message);
          }
        }
      } catch (error) {
        setAlertType('danger');
        setShowLoading(false);
        setShowAlert(true);
        setAlertMessage('Erro ao enviar email de recuperação.');
      }
    }
  };

  const removeAlert = (): void => {
    setShowAlert(false);
    setAlertMessage('');
    setAlertType('success');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      sendRecoveryEmail();
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  return (
    <>
      <button
        type="button"
        className={styles.recoverPasswordModalButton}
        onClick={() => {
          setShowModal(true);
          setShowAlert(false);
        }}
      >
        <p>Esqueceu sua senha?</p>
      </button>

      {showModal && (
        <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Recuperar conta
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                />
              </div>
              <div className="modal-body">
                <label htmlFor="inputPassword5" className="form-label">
                  Informe o email da sua conta.
                </label>
                <input
                  type="text"
                  className="form-control"
                  aria-describedby="passwordHelpBlock"
                  onChange={handleEmailChange}
                  onKeyDown={handleKeyDown}
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Fechar
                </button>
                <button
                  disabled={email.length < 6}
                  type="button"
                  className="btn btn-danger"
                  onClick={sendRecoveryEmail}
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
  );
};

export default RecoverPassword; 