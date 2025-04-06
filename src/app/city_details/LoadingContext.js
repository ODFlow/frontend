import React, { createContext, useState, useContext } from 'react';


const LoadingContext = createContext();


export const LoadingProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);

    const toggleLoading = (state) => setLoading(state);

    return (
        <LoadingContext.Provider value={{ loading, toggleLoading }}>
            {children}
        </LoadingContext.Provider>
    );
};


export const useLoading = () => {
    const context = useContext(LoadingContext);
    if (!context) {
        throw new Error('error');
    }
    return context;
};
