import { createContext, useContext, useState, useEffect } from 'react';

const GlobalNameContext = createContext();

const AnotherContextProvider = ({ children }) => {
    const [name, setName] = useState('');

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

    const contextValue = {
        name,
        setName,
    };

    return <GlobalNameContext.Provider value={contextValue}>{children}</GlobalNameContext.Provider>;
}

const useGlobalNameContext = () => {
    const context = useContext(GlobalNameContext);
    if (!context) {
        throw new Error('useGlobalNameContext must be used within a AnotherContextProvider');
    }
    return context;
};

export { AnotherContextProvider, useGlobalNameContext };
