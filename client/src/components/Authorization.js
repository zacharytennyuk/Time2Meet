import React, { createContext, useContext, useState, useEffect } from 'react';

const Authorization = createContext({
    token: null,
    setToken: () => {}
});

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));

    // Update token
    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
        }
    }, [token]);

    return (
        <Authorization.Provider value={{ token, setToken }}>
            {children}
        </Authorization.Provider>
    );
};

export const useAuth = () => useContext(Authorization);
