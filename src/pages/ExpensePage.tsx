import React from 'react';

import { ExpenseAddButton } from '../components/expense/ExpenseAddButton';
import { ExpenseModal } from '../components/expense/form/ExpenseModal';
import { ExpenseGrid } from '../components/expense/table/ExpenseGrid';
import { ExpenseContextProvider } from '../providers/ExpenseContextProvider';

export const ExpensePage = () => (
    <ExpenseContextProvider>
        <ExpenseModal/>
        <ExpenseGrid/>
        <ExpenseAddButton/>
    </ExpenseContextProvider>
);
