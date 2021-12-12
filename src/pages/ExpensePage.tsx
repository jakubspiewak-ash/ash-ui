import React from 'react';

import { ExpenseAddButton } from '../components/features/expense/ExpenseAddButton';
import { ExpenseModal } from '../components/features/expense/modal/ExpenseModal';
import { ExpenseTable } from '../components/features/expense/table/ExpenseTable';

export const ExpensePage = () => (
    <>
        <ExpenseTable/>
        <ExpenseAddButton/>
        <ExpenseModal/>
    </>
);
