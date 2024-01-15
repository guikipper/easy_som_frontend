import { createContext, useContext, useState } from 'react';

const MyContext = createContext();

const MyContextProvider = ({ children }) => {
  const [formData, setFormData] = useState({});

  const updateFormData = (newData) => {
    setFormData(newData);
  };

  //até aqui é config de useState

  const contextValue = {
    formData,
    setFormData, // Certifique-se de incluir setFormData no contexto
    updateFormData,
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