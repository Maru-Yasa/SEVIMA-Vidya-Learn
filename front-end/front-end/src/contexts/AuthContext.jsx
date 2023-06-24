import { createContext, useEffect, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import jwtDecode from "jwt-decode";
import { validateToken } from "../libs/api";

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAthenticated] = useState(false);
    const { setItem, removeItem, getItem } = useLocalStorage()

    const setAuthToken = (newToken) => {
        if (newToken) {
            // TODO: memvalidasi token
            validateToken(newToken).then((res) => {
                if (!res.data.status) {
                    setIsAthenticated(false)
                    return
                }
                setIsAthenticated(true)
                setItem('token', newToken)
            })
        } else {
          removeItem('token')
        }    
        setToken(newToken);
    };

    useEffect(() => {
        const storedToken = getItem('token')
        if (storedToken) {
            // TODO: memvalidasi token
            validateToken(storedToken).then((res) => {
                const data = res.data
                if (!data.status) {
                    setIsAthenticated(false)
                    return 
                }
                setIsAthenticated(true)
                setToken(storedToken);
            })
        }
    }, []);

    useEffect(() => {
        if (token) {
            setUser(jwtDecode(token))
        }
    }, [token])

    return <AuthContext.Provider value={{user, token, setToken: setAuthToken, isAuthenticated}}>
        {children}
    </AuthContext.Provider>

}

export const AuthContext = createContext({
    user: null,
    token: null,
    isAuthenticated: false,
    setToken: () => {},
})