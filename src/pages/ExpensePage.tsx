import React from 'react';

import { ExpenseAddButton } from '../components/expense/ExpenseAddButton';
import { ExpenseModal } from '../components/features/ExpenseModal';

export const ExpensePage = () => (
    <>
        <ExpenseModal/>
        <ExpenseAddButton/>
    </>
);
