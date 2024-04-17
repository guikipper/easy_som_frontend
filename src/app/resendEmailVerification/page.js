"use client";

import { useState } from "react";
import styles from "../styles/ResendEmailVerification.module.css";
import { resendEmailVerification } from "../api/services/apiFunctions";

export default function RecoverPassword() {
  const [email, setEmail] = useState("");

  const callApi = async () => {
    if (email) {
      console.log("CHAMANDA A API");
      const response = await resendEmailVerification(email);

      console.log(' RESPONSE: ',response);
      if (response.success) {
        console.log("success");
      }
      if (response.error) {
        console.log("error");
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
    </div>
  );
}
