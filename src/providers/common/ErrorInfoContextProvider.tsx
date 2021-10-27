import { createContext, useContext } from 'react';

import { useToast } from '@chakra-ui/react';
import { AxiosError } from 'axios';

import { HasChildren } from '../../components/common/common.types';

interface ErrorInfoContextType {
  addErrorToast: (error: AxiosError) => void;
}

const ErrorInfoContext = createContext<ErrorInfoContextType>({
  addErrorToast: () => {
  },
});

export const useErrorInfoContext = () => useContext<ErrorInfoContextType>(ErrorInfoContext);

export const ErrorInfoContextProvider = ({ children }: HasChildren) => {
  const toast = useToast({
    position: 'top-left',
    status: 'error',
    title: 'Something goes wrong',
  });

  const addErrorToast = (error: AxiosError) => {
    toast({
      description: error.message,
    });
  };

  return (
    <ErrorInfoContext.Provider value={{ addErrorToast }}>
      {children}
    </ErrorInfoContext.Provider>
  );
};
