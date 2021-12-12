import { useEffect, useMemo, useState } from 'react';

import { Grid, Spinner } from '@chakra-ui/react';

import { useErrorInfoContext } from '../../../../providers/common/ErrorInfoContextProvider';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { loadExpenses, openModal } from '../../../../redux/reducer/ExpenseSlice';
import { ApiExpense } from '../../../../services/api.types';
import { deleteExpense } from '../../../../services/expense.service';
import { YearMonth } from '../../../../utils/types';
import { NoDataTableRow } from '../../../common/data/NoDataTableRow';
import { ExpenseSummary } from '../summary/ExpenseSummary';

import { ExpenseGridCell } from './row/ExpenseGridCell';
import { ExpenseGridRow } from './row/ExpenseGridRow';

export const ExpenseTable = () => {
    const { addErrorToast } = useErrorInfoContext();
    const [currentInfo, setCurrentInfo] = useState<string>();
    const dispatch = useAppDispatch();

    const { data: { expenses, summary }, status } = useAppSelector((state) => state.expense);

    const updateData = (month: YearMonth) => dispatch(loadExpenses(month));

    const onInfo = (expense: ApiExpense): () => void => {
        const { id } = expense;
        return () => setCurrentInfo(currentInfo !== id ? id : undefined);
    };

    const onEdit = (expense: ApiExpense) => () => dispatch(openModal(expense));

    const onDelete = (expense: ApiExpense): () => void => {
        const { id } = expense;
        const today = new Date();
        return () => {
            deleteExpense(id)
                .then(() => updateData({
                    month: today.getMonth() - 1,
                    year: today.getFullYear(),
                }))
                .catch(addErrorToast);
        };
    };

    useEffect(() => {
        updateData({ month: new Date().getMonth() + 1, year: new Date().getFullYear() });
    }, []);

    const TableBodyContent = useMemo(() => {
        if (status === 'LOADING') {
            return (
                <ExpenseGridCell
                  align={'center'}
                  size={12}
                >
                    <Spinner
                      my={4}
                      size={'xl'}
                    />
                </ExpenseGridCell>
            );
        }
        if (expenses.length) {
            return expenses.map((expense) => (
                <ExpenseGridRow
                  key={expense.id}
                  actions={{
                        onDelete: onDelete(expense),
                        onEdit: onEdit(expense),
                        onInfo: onInfo(expense),
                    }}
                  expense={expense}
                  isInfoVisible={currentInfo === expense.id}
                />
            ));
        }
        return <NoDataTableRow colsNumber={13}/>;

    }, [expenses, currentInfo, status]);

    return (
        <>
            <ExpenseSummary {...summary}/>
            <Grid
              alignItems={'center'}
              borderRadius={16}
              borderWidth={1}
              boxShadow={'md'}
                // overflowX={'auto'}
              templateColumns={'repeat(12, 1fr)'}
            >
                {TableBodyContent}
            </Grid>
        </>
    );
};
