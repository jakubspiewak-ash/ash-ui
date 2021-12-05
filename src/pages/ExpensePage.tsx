import React from 'react';

import { ExpenseAddButton } from '../components/expense/ExpenseAddButton';
import { ExpenseModal } from '../components/expense/form/ExpenseModal';
import { ExpenseGrid } from '../components/expense/table/ExpenseGrid';

export const ExpensePage = () => (
    <>
        <ExpenseModal/>
        <ExpenseGrid/>
        <ExpenseAddButton/>
    </>
);
