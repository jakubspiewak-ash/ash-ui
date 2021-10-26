import {createContext, useContext, useState} from 'react';
import {Amount, ApiExpenseRequest, ApiExpenseResponse} from '../services/api.types';
import {HasChildren} from '../components/common/common.types';
import {fetchExpenses} from '../services/expense.service';
import {useErrorInfoContext} from './common/ErrorInfoContextProvider';
import {useDisclosure} from '@chakra-ui/react';
import {Omit} from "framer-motion/types/types";

export type FormAmount = Omit<Amount, "net" | "gross"> & {net?: number, gross?: number}
export type ExpenseFormType = Omit<ApiExpenseRequest, 'amount'> & {amount: FormAmount};


interface ExpenseToEdit {
    id: string,
    request: ExpenseFormType,
}

interface ModalFormType {
    isOpen: boolean,
    onOpen: () => void,
    onClose: () => void
}

interface ExpenseContextType {
    expenses: ApiExpenseResponse[];
    updateExpenses: () => void;
    requested?: ExpenseToEdit;
    setRequested: (value?: ExpenseToEdit) => void;
    modal: ModalFormType;
    isLoadingExpenses: boolean;
}

const ExpenseContext = createContext<ExpenseContextType>({
    expenses: [],
    updateExpenses: () => Promise.reject(),
    setRequested: () => {
    },
    modal: {
        isOpen: false,
        onOpen: () => {
        },
        onClose: () => {
        },
    },
    isLoadingExpenses: false
});

export const useExpenseContext = () => useContext<ExpenseContextType>(ExpenseContext);

export const ExpenseContextProvider = ({children}: HasChildren) => {
    const [expenses, setExpenses] = useState<ApiExpenseResponse[]>([]);
    const [requested, setRequested] = useState<ExpenseToEdit>();
    const [isLoadingExpenses, setIsLoading] = useState(false);

    const {addErrorToast} = useErrorInfoContext();

    const modal = useDisclosure();

    const updateExpenses = () => {
        setIsLoading(true)
        fetchExpenses().then(setExpenses).catch(addErrorToast).then(() => setIsLoading(false));
    };

    return (
        <ExpenseContext.Provider value={{
            expenses,
            updateExpenses,
            requested,
            setRequested,
            modal,
            isLoadingExpenses
        }}
        >
            {children}
        </ExpenseContext.Provider>
    );
};
