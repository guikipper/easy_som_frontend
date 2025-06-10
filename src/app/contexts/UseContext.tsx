import React, { createContext, useContext, useState } from 'react';

interface FormData {
  [key: string]: any;
}

interface MyContextType {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  updateFormData: (newData: FormData) => void;
}

interface MyContextProviderProps {
  children: React.ReactNode;
}

const MyContext = createContext<MyContextType | undefined>(undefined);

const MyContextProvider: React.FC<MyContextProviderProps> = ({ children }) => {
  const [formData, setFormData] = useState<FormData>({});

  const updateFormData = (newData: FormData) => {
    setFormData(newData);
  };

  const contextValue: MyContextType = {
    formData,
    setFormData,
    updateFormData,
  };

  return <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>;
};

const useMyContext = (): MyContextType => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error('useMyContext must be used within a MyContextProvider');
  }
  return context;
};

export { MyContextProvider, useMyContext }; 