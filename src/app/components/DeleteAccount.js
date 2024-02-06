import styles from '../styles/DeleteAccount.module.css';
import { useState } from 'react';
import { deleteAccount } from '../api/services/apiFunctions';
import { useRouter } from 'next/navigation'; // Ajuste na importação para 'next/router'
import Loading from '../components/Loading';
import Alert from '../components/Alert'; // Certifique-se do caminho correto
import Cookies from 'js-cookie';

export default function DeleteAccount() {
    const [password, setPassword] = useState(""); // used to delete the account
    const [showLoading, setShowLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const router = useRouter();

    const handleDeleteAccount = async () => {
        setShowLoading(true);

        if (password) {
            const token = Cookies.get('token');

            const userData = {
                token: token,
                password: password,
            };
            const result = await deleteAccount(userData);

            if (result.status === 201) {
                setShowLoading(false);
                setShowAlert(true);
                setTimeout(() => {
                    Cookies.set('token', '');
                    setShowModal(false);
                    setShowAlert(false);
                    router.push('/');
                }, 3000);
            } else if (result.status === 401) {
                setShowLoading(false);
                alert("Senha inválida!");
            } else {
                alert('Outro erro');
            }
        }
    };

    return (
        <>
            <button
                type="button"
                className={`${styles.deleteButton} btn btn-danger`}
                onClick={() => setShowModal(true)} // Abre o modal
            >
                Deletar Conta
            </button>

            {showModal && ( 
                <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Deletar Conta Permanentemente</h1>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowModal(false)} // Fecha o modal
                                ></button>
                            </div>
                            <div className="modal-body">
                                <label htmlFor="inputPassword5" className="form-label">Informe a senha abaixo para confirmar a deleção da conta.</label>
                                <input
                                    type="password"
                                    id="inputPassword5"
                                    className="form-control"
                                    aria-describedby="passwordHelpBlock"
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Fechar</button>
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
                                    <Alert type="success" message="Conta excluída com sucesso!" />
                                    <p>Redirecionando...</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}