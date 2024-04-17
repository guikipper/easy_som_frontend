"use client";

import { useState } from "react";
import styles from "../styles/ResendEmailVerification.module.css";
import { resendEmailVerification } from "../api/services/apiFunctions";
import { ResponseFeedback } from "../components/ResponseFeedback";

export default function RecoverPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("")
  const [type, setType] = useState("")

  const callApi = async () => {
    if (email) {
      const response = await resendEmailVerification(email);
      console.log(response)
      if (response.success) {
        console.log("success");
        setMessage(response.success.message)
      }
      if (response.error) {
        console.log("error");
        setMessage(response.error.message)
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
      <ResponseFeedback type={type} message={message}/>
    </div>
  );
}
