import { ApiExpense } from '../../../../../services/api.types';

export interface HasExpense {
    expense: ApiExpense
}

export interface TableCellProps extends HasExpense {
}