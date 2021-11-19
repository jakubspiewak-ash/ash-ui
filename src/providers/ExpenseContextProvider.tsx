import { createContext, useContext, useState } from 'react';

import { useDisclosure } from '@chakra-ui/react';
import { Omit } from 'framer-motion/types/types';

import { HasChildren } from '../components/common/common.types';
import { ApiExpenseAmount, ApiExpenseGetResponse, ApiExpenseRequest } from '../services/api.types';
import { fetchExpenses } from '../services/expense.service';

import { useErrorInfoContext } from './common/ErrorInfoContextProvider';

export type FormAmount = Omit<ApiExpenseAmount, 'net' | 'gross'> & { net?: number, gross?: number }
export type ExpenseFormType = Omit<ApiExpenseRequest, 'amount'> & { amount: FormAmount };


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
    data: ApiExpenseGetResponse;
    updateData: ({ year, month }: { year: number, month: number }) => void;
    requested?: ExpenseToEdit;
    setRequested: (value?: ExpenseToEdit) => void;
    modal: ModalFormType;
}

const defaultData: ApiExpenseGetResponse = {
    expenses: [],
    summary: {
        amount: {
            currency: 'PLN',
            gross: 0,
            net: 0,
            vat: 23,
        },
        currency: [],
        date: {},
    },
};

const ExpenseContext = createContext<ExpenseContextType>({
    data: defaultData,
    modal: {
        isOpen: false,
        onClose: () => {
        },
        onOpen: () => {
        },
    },
    setRequested: () => {
    },
    updateData: () => Promise.reject(),
});

export const useExpenseContext = () => useContext<ExpenseContextType>(ExpenseContext);

export const ExpenseContextProvider = ({ children }: HasChildren) => {
    const [data, setData] = useState<ApiExpenseGetResponse>(defaultData);
    const [requested, setRequested] = useState<ExpenseToEdit>();

    const { addErrorToast } = useErrorInfoContext();

    const modal = useDisclosure();

    const updateData = ({ year, month }: { year: number, month: number }) => {
        return fetchExpenses({ month, year }).then(setData).catch(addErrorToast);
    };

    return (
        <ExpenseContext.Provider
          value={{
                data,
                modal,
                requested,
                setRequested,
                updateData,
            }}
        >
            {children}
        </ExpenseContext.Provider>
    );
};
