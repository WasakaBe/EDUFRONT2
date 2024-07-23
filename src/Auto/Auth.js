import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useState, useEffect } from 'react';
export const AuthContext = createContext(undefined);
export const AuthContextProvider = ({ children, }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    useEffect(() => {
        try {
            const storedUser = localStorage.getItem('user');
            const storedIsAuthenticated = localStorage.getItem('isAuthenticated');
            if (storedUser && storedIsAuthenticated) {
                setUser(JSON.parse(storedUser));
                setIsAuthenticated(JSON.parse(storedIsAuthenticated));
            }
        }
        catch (error) {
            console.error('Error al recuperar la información del usuario del localStorage:', error);
        }
    }, []);
    const login = (user) => {
        try {
            setUser(user);
            setIsAuthenticated(true);
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('isAuthenticated', JSON.stringify(true));
        }
        catch (error) {
            console.error('Error al guardar la información del usuario en el localStorage:', error);
        }
    };
    const logout = () => {
        try {
            setUser(null);
            setIsAuthenticated(false);
            localStorage.removeItem('user');
            localStorage.removeItem('isAuthenticated');
        }
        catch (error) {
            console.error('Error al limpiar la información del usuario en el localStorage:', error);
        }
    };
    return (_jsx(AuthContext.Provider, { value: { user, isAuthenticated, login, logout }, children: children }));
};
