import { createContext, useContext, useState } from 'react';
import { ApiExpenseRequest, ApiExpenseResponse } from '../services/api.types';
import { HasChildren } from '../components/common/common.types';
import { fetchExpenses } from '../services/expense.service';
import { useErrorInfoContext } from './common/ErrorInfoContextProvider';

interface ExpenseToEdit {
  id: string,
  request: ApiExpenseRequest,
}

interface ExpenseContextType {
  expenses: ApiExpenseResponse[];
  updateExpenses: () => void;
  requested?: ExpenseToEdit;
  setRequested: (value?: ExpenseToEdit) => void;
}

const ExpenseContext = createContext<ExpenseContextType>({
  expenses: [],
  updateExpenses: () => {
  },
  setRequested: () => {
  },
});

export const useExpenseContext = () => useContext<ExpenseContextType>(ExpenseContext);

export const ExpenseContextProvider = ({ children }: HasChildren) => {
  const [expenses, setExpenses] = useState<ApiExpenseResponse[]>([]);
  const [requested, setRequested] = useState<ExpenseToEdit>();
  const { addErrorToast } = useErrorInfoContext();

  const updateExpenses = () => {
    fetchExpenses().then(setExpenses).catch(addErrorToast);
  };

  return (
    <ExpenseContext.Provider value={{
      expenses,
      updateExpenses,
      requested,
      setRequested,
    }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};
