import styles from '../styles/DeleteAccount.module.css'
import { useState } from 'react'
import { deleteAccount } from '../api/services/apiFunctions'
import { useRouter } from 'next/navigation'
import Loading from '../components/Loading';
import Alert from './Alert';
//import { Modal } from 'bootstrap';

export default function DeleteAccount() {

    const [password, setPassword] = useState("") //used to delete the account
    const [showLoading, setShowLoading] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [failedDelete, setFailedDelete] = useState(false)
    const router = useRouter()

    const handleDeleteAccount = async () => {
        console.log("Entrou no botão de exclusão")
        setShowLoading(true)

        if (password) {
            const userData = {
                userId: localStorage.getItem("userId"),
                password: password
            }
            const result = await deleteAccount(userData)
            console.log('O RESULT', result)
            if (result.status == 201) {
                setShowLoading(false)
                setShowAlert(true)
                setTimeout(() => {
                    localStorage.clear()
                    closeModal()
                    setShowAlert(false)
                    router.push('/')
                }, 3000)
            } else {
                setShowLoading(false)
                alert("Ocorreu um erro ao deletar a conta!")
            }
        }
    }

    const closeModal = () => {
       // const modalElement = document.getElementById('deleteAccount');
       // const modalInstance = Modal.getInstance(modalElement);
       // modalInstance.hide();
    }

    return (
            <>
                <button type="button" className={`${styles.deleteButton} btn btn-danger`} data-bs-toggle="modal" data-bs-target="#deleteAccount">
                    Deletar Conta
                </button>

                <div className="modal fade" id="deleteAccount" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Deletar Conta Permanentemente</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <label htmlFor="inputPassword5" className="form-label">Informe a senha abaixo para confirmar a deleção da conta.</label>
                            <input 
                            type="password" 
                            id="inputPassword5" 
                            className="form-control" 
                            aria-describedby="passwordHelpBlock"
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }}
                            />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                            <button
                            disabled={password.length < 6} 
                            type="button" 
                            className="btn btn-danger"
                            onClick={handleDeleteAccount}
                            >
                            Deletar Conta</button>
                        </div>
                        {showLoading && (
                            <div className={styles.loadingContainer}>
                                <Loading/>
                            </div> 
                        )}
                        {showAlert && (
                            <div className={styles.alertContainer}>
                                <Alert type="success" message="Conta excluída com sucesso!"/>
                                <p>Redirecionando...</p>
                            </div>   
                        )}
                        </div>
                    </div>
                </div>
            </>
    )
}