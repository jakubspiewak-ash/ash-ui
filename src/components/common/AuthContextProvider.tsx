import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {ApiUserCredentials} from "../../services/api.types";
import {clearStorageToken, getApiToken, getStorageToken, setStorageToken} from "../../services/auth.service";
import {useErrorInfoContext} from "./ErrorInfoContextProvider";

const AuthContext = createContext({
    authenticated: false,
    login: (credentials: ApiUserCredentials): Promise<void> => Promise.reject(),
    logout: () => {
    }
})

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({children}: { children: ReactNode }) => {
    const [authenticated, setAuthenticated] = useState(false);
    const {addErrorToast} = useErrorInfoContext();

    const login = (credentials: ApiUserCredentials) => {
        return getApiToken(credentials)
            .then(token => {
                setStorageToken(token);
                setAuthenticated(true);
            }).catch(addErrorToast);
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