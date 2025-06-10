import React, { createContext, useContext, useState, useEffect } from 'react';

interface GlobalNameContextType {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
}

interface AnotherContextProviderProps {
  children: React.ReactNode;
}

const GlobalNameContext = createContext<GlobalNameContextType | undefined>(undefined);

const AnotherContextProvider: React.FC<AnotherContextProviderProps> = ({ children }) => {
  const [name, setName] = useState<string>('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedName = localStorage.getItem('name') || '';
      setName(storedName);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('name', name);
    }
  }, [name]);

  const contextValue: GlobalNameContextType = {
    name,
    setName,
  };

  return <GlobalNameContext.Provider value={contextValue}>{children}</GlobalNameContext.Provider>;
};

const useGlobalNameContext = (): GlobalNameContextType => {
  const context = useContext(GlobalNameContext);
  if (!context) {
    throw new Error('useGlobalNameContext must be used within a AnotherContextProvider');
  }
  return context;
};

export { AnotherContextProvider, useGlobalNameContext }; 