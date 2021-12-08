import React from 'react';

import { ExpenseAddButton } from '../components/expense/ExpenseAddButton';
import { ExpenseModalForm } from '../components/features/ExpenseModalForm';

export const ExpensePage = () => (
    <>
        <ExpenseModalForm/>
        <ExpenseAddButton/>
    </>
);
