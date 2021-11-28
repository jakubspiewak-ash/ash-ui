import { ApiExpense } from '../../../../../services/api.types';

import { Amount } from './Amount';
import { Currency } from './Currency';
import { Date } from './Date';
import { IsPrivate } from './IsPrivate';
import { Name } from './Name';

export interface ExpenseGridItemProps {
    expense: ApiExpense,
}

export {
    Amount,
    Currency,
    Date,
    IsPrivate,
    Name,
};