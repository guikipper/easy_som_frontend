//const BASE_URL = "http://localhost:3500"
const BASE_URL = "https://easy-som-backend.vercel.app"

export const login = async (username, password) => {

  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: username, password }),
    });

    const data = await response.json();
    if (!response.ok) {
      return { ...data, failed: true };
    }
    return data;

  } catch (error) {
    throw new Error(`Error during login: ${error.message}`);
  }
};

export const resendEmailVerification = async (email) => {
  try {
    const response = await fetch(`${BASE_URL}/resendEmailVerification`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
    return data;

  } catch (error) {
    throw new Error(`Error during login: ${error.message}`);
  }
};

export const authenticateWithToken = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/authenticate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    })
    const data = await response.json();
    return data;

  } catch (error) {
    throw new Error(`Error during authentication: ${error.message}`);
  }
} 

export const validateEmail = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/validate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ message: "Validando Email com Token" }),
    });

    return response;
  } catch (error) {
    throw new Error(`Error during validating email: ${error.message}`);
  }
};

export const saveTrainingData = async (data, token) => {
  try {
    const response = await fetch(`${BASE_URL}/saveTrainingData`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })
    return response
  } catch (error) {
    console.error("Error:", error);
  }
}

export const getTrainingSummary = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/getTrainingSummary`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error:", error);
  }
}

export const signUp = async (userData) => {
  try {
    const response = await fetch(`${BASE_URL}/createUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};


export const changeName = async (userData) => {
    try {
        const { token, newName, oldName } = userData
        const response = await fetch(`${BASE_URL}/changeName`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ newName, oldName })
        });

        const data = await response.json();
        return data;
        
    } catch (error) {
        console.error('Erro na requisição:', error);
    }
}


export const changePassword = async (userData) => {
  try {
    const { token, password, newPassword } = userData
    const passwordData = {
      password, newPassword
    }

    const response = await fetch(`${BASE_URL}/changePassword`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(passwordData),
    });
    const data = await response.json();
    return data
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const deleteAccount = async (userData) => {

  try {
    const { token, password } = userData

    const response = await fetch(`${BASE_URL}/deleteAccount`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ password: password }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro: ", error);
  }
};

export const sendPasswordRecoveryEmail = async (email) => {
  try {
    const response = await fetch(`${BASE_URL}/sendPasswordRecovery`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    return response

  } catch (error) {
    console.error("Erro: ", error);
  }
}

export const recoverPasswordRoute = async (newPassword, token) => {
  try {
    console.log("Entrou aqui")
    const response = await fetch(`${BASE_URL}/recoverPassword`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({newPassword})
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Erro: ", error);
  }
}
