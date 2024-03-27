import { createContext, useContext, useState } from 'react';
//createContext serve para criar o contexto
//useContext serve para acessar o conteúdo em componentes filhos
const MyContext = createContext(); //criado um contexto chamado MyContext

const MyContextProvider = ({ children }) => {
  
  const [formData, setFormData] = useState({});

  //console.log("O formData: ", formData)

  const updateFormData = (newData) => {
    setFormData(newData);
  };

  //até aqui é config de useState

  const contextValue = {
    formData, //REVISAR
    setFormData, // Certifique-se de incluir setFormData no contexto
    updateFormData, //REVISAR
  };

  //o valor q é passado

  return <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>;
};

const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error('useMyContext must be used within a MyContextProvider');
  }
  return context;
};

export { MyContextProvider, useMyContext };