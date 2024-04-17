"use client";

import { useState } from "react";
import styles from "../styles/ResendEmailVerification.module.css";
import { resendEmailVerification } from "../api/services/apiFunctions";
import { ResponseFeedback } from "../components/ResponseFeedback";
import Loading from "../components/Loading";

export default function RecoverPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("")
  const [type, setType] = useState("")
  const [details, setDetails] = useState(" ")
  const [loading, setLoading] = useState(true)

  const callApi = async () => {
    setLoading(true)
    if (email) {
      const response = await resendEmailVerification(email);
      console.log(response)
      if (response.success) {
        setLoading(false)
        setType("success")
        setMessage(response.success.message)
      }
      if (response.error) {
        setLoading(false)
        setType("error")
        setMessage(response.error.message)
        setDetails(response.error.details[0].message)
      }
    }
  };

  return (
    <div className={styles.mainContainer}>
      
      <div className={styles.resendEmailVerification}>
        
        <input
          type="text"
          placeholder="E-mail"
          aria-label="Email"
          className={styles.emailInput}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              callApi();
            }
          }}
        />

        <button
          type="button"
          class="btn btn-primary"
          onClick={() => {
            callApi();
          }}
        >
          Enviar
        </button>
      </div>
      <ResponseFeedback type={type} message={message} details={details}/>

      <div className={styles.loadingWrapper}>
                    {loading && (
                        <div className={styles.loadingImage}>
                            <Loading/>
                        </div>
                    )}
                </div>
    </div>
  );
}
