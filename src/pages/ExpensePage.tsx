import React from 'react';

import { ExpenseAddButton } from '../components/expense/ExpenseAddButton';
import { ExpenseModal } from '../components/expense/form/ExpenseModal';
import { ExpenseTable } from '../components/expense/table/ExpenseTable';
import { ExpenseContextProvider } from '../providers/ExpenseContextProvider';

export const ExpensePage = () => (
    <ExpenseContextProvider>
        <ExpenseModal/>
        <ExpenseTable/>
        <ExpenseAddButton/>
    </ExpenseContextProvider>
);
