import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {ApiUserCredentials} from "../../services/api.types";
import {clearStorageToken, getApiToken, getStorageToken, setStorageToken} from "../../services/auth.service";

const AuthContext = createContext({
    authenticated: false,
    login: (credentials: ApiUserCredentials) => {
    },
    logout: () => {
    }
})

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({children}: { children: ReactNode }) => {
    const [authenticated, setAuthenticated] = useState(false)

    const login = (credentials: ApiUserCredentials) => {
        getApiToken(credentials).then(token => {
            setStorageToken(token);
            setAuthenticated(true);
        })
    }
    const logout = () => {
        clearStorageToken();
        setAuthenticated(false);
    }

    useEffect(() => {
            getStorageToken() && setAuthenticated(true)
        }, []
    )

    return (
        <AuthContext.Provider value={{authenticated, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}