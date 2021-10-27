import React from "react";

import { ExpenseAddButton } from '../components/expense/ExpenseAddButton';
import { ExpenseModal } from '../components/expense/ExpenseModal';
import { ExpenseRefreshButton } from '../components/expense/ExpenseRefreshButton';
import { ExpenseTable } from '../components/expense/ExpenseTable';
import { ExpenseContextProvider } from '../providers/ExpenseContextProvider';

export const ExpensePage = () => (
    <ExpenseContextProvider>
        <ExpenseTable/>
        <ExpenseModal/>
        <ExpenseAddButton/>
        <ExpenseRefreshButton/>
    </ExpenseContextProvider>
);
