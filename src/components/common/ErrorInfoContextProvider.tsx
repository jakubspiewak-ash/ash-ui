import {createContext, ReactNode, ReactNodeArray, useContext} from "react";
import {useToast} from "@chakra-ui/react";
import {AxiosError} from "axios";

const ErrorInfoContext = createContext({
    addErrorToast: (error: AxiosError) => {
    }
})

export const useErrorInfoContext = () => useContext(ErrorInfoContext)

export const ErrorInfoContextProvider = ({children}: { children: ReactNode | ReactNodeArray }) => {

    const toast = useToast({
        position: "top-left",
        title: "Something goes wrong",
        status: "error"
    });

    const addErrorToast = (error: AxiosError) => {
        toast({
            description: error.message
        })
    }

    return (
        <ErrorInfoContext.Provider value={{addErrorToast}}>
            {children}
        </ErrorInfoContext.Provider>
    )
}