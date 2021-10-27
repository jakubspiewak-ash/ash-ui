import { createContext, useContext, useEffect, useState } from 'react';

import { HasChildren } from '../../components/common/common.types';
import { ApiUserCredentials } from '../../services/api.types';
import {
  clearStorageToken,
  getApiToken,
  getStorageToken,
  setStorageToken,
  updateAuthorizationHeader,
} from '../../services/auth.service';

import { useErrorInfoContext } from './ErrorInfoContextProvider';

interface AuthContextType {
  authenticated: boolean,
  login: (credentials: ApiUserCredentials) => Promise<void>,
  logout: () => void,
}

const AuthContext = createContext<AuthContextType>({
  authenticated: false,
  login: () => Promise.reject(),
  logout: () => {
  },
});

export const useAuthContext = () => useContext<AuthContextType>(AuthContext);

export const AuthContextProvider = ({ children }: HasChildren) => {
  const [authenticated, setAuthenticated] = useState(false);
  const { addErrorToast } = useErrorInfoContext();

  const login = (credentials: ApiUserCredentials) => getApiToken(credentials)
    .then((token) => {
      updateAuthorizationHeader(token);
      setStorageToken(token);
      setAuthenticated(true);
    }).catch(addErrorToast);
  const logout = () => {
    clearStorageToken();
    setAuthenticated(false);
  };

  useEffect(() => {
    const token = getStorageToken();
    if (token) {
      setAuthenticated(true);
      updateAuthorizationHeader(token);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
