const BASE_URL = "https://supreme-potato-x9rwpp995jr36qjq-3500.app.github.dev";

export const login = async (username, password) => {

  console.log(`${BASE_URL}/login`);
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

export const authenticateWithToken = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/authenticate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({token})
    })

    const data = await response.json();
    
    if (!response.ok) {
      return { ...data, failed: true };
    }

    return data;

  } catch (error) {
    throw new Error(`Error during login: ${error.message}`);
  }
} 

export const validateEmail = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/validate/${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: "Validando Email com Token" }),
    });

    if (!response.ok) {
      throw new Error("Validate failed");
    }

    return response;
  } catch (error) {
    throw new Error(`Error during validating email: ${error.message}`);
  }
};

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

  const { token, newName, oldName } = userData

    try {
        const response = await fetch(`${BASE_URL}/changeName`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ newName, oldName })
        });

        const data = await response.json();
        console.log("Nome alterado com sucesso! ", data);
        return data;
        
    } catch (error) {
        console.error('Erro na requisição:', error);
    }
}


export const changePassword = async (userData) => {
  try {
    const response = await fetch(`${BASE_URL}/changePassword`, {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    return data
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const deleteAccount = async (userData) => {

  try {
    const response = await fetch(`${BASE_URL}/deleteAccount`, {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (response.ok) {
      console.log('API Functions - Response of delete account: ', response);
      return response
    } else {
      console.error("Falha ao deletar a conta: ", response.status);
    }
  } catch (error) {
    console.error("Erro: ", error);
  }
};
