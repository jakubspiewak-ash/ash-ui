import React from 'react';

import { ExpenseGridItemProps } from './index';

export const Amount = ({ expense: { amount: { gross } } }: ExpenseGridItemProps) => {
    return (
        <>{gross}</>
    );
};
