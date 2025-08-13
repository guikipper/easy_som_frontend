// Types and Interfaces
interface LoginResponse {
  error?: {
    message: string;
  };
  success?: {
    data: {
      token: string;
    };
  };
}

interface UserData {
  email: string;
  name: string;
  password: string;
}

interface TrainingData {
  [key: string]: any;  // This should be more specific based on your actual training data structure
}

interface TrainingSummary {
  [key: string]: any;  // This should be more specific based on your actual summary structure
}

interface ChangeNameData {
  token: string;
  newName: string;
  oldName: string;
}

interface ChangePasswordData {
  token: string;
  password: string;
  newPassword: string;
}

interface DeleteAccountData {
  token: string | undefined;
  password: string;
}

//const BASE_URL = "http://localhost:3500"
const BASE_URL = "https://easy-som-backend.vercel.app"

export const login = async (username: string, password: string): Promise<LoginResponse> => {
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
    throw new Error(`Error during login: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

export const resendEmailVerification = async (email: string): Promise<any> => {
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
    throw new Error(`Error during login: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

export const authenticateWithToken = async (token: string): Promise<any> => {
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
    throw new Error(`Error during authentication: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
} 

export const validateEmail = async (token: string): Promise<Response> => {
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
    throw new Error(`Error during validating email: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

export const saveTrainingData = async (data: TrainingData, token: string): Promise<Response | undefined> => {
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

export const getTrainingSummary = async (token: string): Promise<TrainingSummary | undefined> => {
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

export const signUp = async (userData: UserData): Promise<any> => {
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

export const changeName = async (userData: ChangeNameData): Promise<any> => {
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

export const changePassword = async (userData: ChangePasswordData): Promise<any> => {
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

export const deleteAccount = async (userData: DeleteAccountData): Promise<any> => {
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

export const sendPasswordRecoveryEmail = async (email: string): Promise<Response | undefined> => {
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

export const recoverPasswordRoute = async (newPassword: string, token: string): Promise<any> => {
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