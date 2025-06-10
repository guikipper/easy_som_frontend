import React, { useState } from 'react';
import styles from '../styles/DeleteAccount.module.css';
import { deleteAccount } from '../api/services/apiFunctions';
import { useRouter } from 'next/navigation';
import Loading from '../components/Loading';
import Alert from '../components/Alert';
import Cookies from 'js-cookie';

interface UserData {
  token: string | undefined;
  password: string;
}

interface DeleteAccountResponse {
  success?: {
    message: string;
  };
  error?: {
    message: string;
  };
}

type AlertType = 'success' | 'danger' | 'warning' | 'info';

const DeleteAccount: React.FC = () => {
  const [password, setPassword] = useState<string>('');
  const [showLoading, setShowLoading] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [type, setType] = useState<AlertType>('success');
  const [redirect, setRedirect] = useState<boolean>(false);
  const router = useRouter();

  const handleDeleteAccount = async (): Promise<void> => {
    setShowLoading(true);

    if (password) {
      const token = Cookies.get('token');

      const userData: UserData = {
        token,
        password,
      };

      const result = await deleteAccount(userData);

      if (result.success) {
        setShowLoading(false);
        setShowAlert(true);
        setRedirect(true);
        setType('success');
        setMessage('Conta excluída com sucesso!');

        setTimeout(() => {
          Cookies.set('token', '');
          setShowModal(false);
          setRedirect(false);
          setShowAlert(false);
          router.push('/');
        }, 3000);
      } else if (result.error) {
        setShowLoading(false);
        setRedirect(false);
        setType('danger');
        setShowAlert(true);
        setMessage(result.error.message);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter' && password) {
      handleDeleteAccount();
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };

  return (
    <>
      <button
        type="button"
        className={`${styles.deleteButton} btn btn-danger`}
        onClick={() => setShowModal(true)}
      >
        Deletar Conta
      </button>

      {showModal && (
        <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Deletar Conta Permanentemente
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                />
              </div>
              <div className="modal-body">
                <label htmlFor="inputPassword5" className="form-label">
                  Informe a senha abaixo para confirmar a deleção da conta.
                </label>
                <input
                  type="password"
                  id="inputPassword5"
                  className="form-control"
                  aria-describedby="passwordHelpBlock"
                  onKeyDown={handleKeyDown}
                  onChange={handlePasswordChange}
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
                  disabled={password.length < 6}
                  type="button"
                  className="btn btn-danger"
                  onClick={handleDeleteAccount}
                >
                  Deletar Conta
                </button>
              </div>

              {showLoading && (
                <div className={styles.loadingContainer}>
                  <Loading />
                </div>
              )}
              {showAlert && (
                <div className={styles.alertContainer}>
                  <Alert type={type} message={message} />
                  {redirect && <p>Redirecionando...</p>}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteAccount; 