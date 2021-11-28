import { useEffect, useMemo, useState } from 'react';

import { Grid } from '@chakra-ui/react';

import { useErrorInfoContext } from '../../../providers/common/ErrorInfoContextProvider';
import { useExpenseContext } from '../../../providers/ExpenseContextProvider';
import { ApiExpense } from '../../../services/api.types';
import { deleteExpense } from '../../../services/expense.service';
import { NoDataTableRow } from '../../common/data/NoDataTableRow';
import { ExpenseSummary } from '../summary/ExpenseSummary';

import { ExpenseGridRow } from './row/ExpenseGridRow';

export const ExpenseGrid = () => {
    const { setRequested, modal: { onOpen }, data: { expenses, summary }, updateData } = useExpenseContext();
    const { addErrorToast } = useErrorInfoContext();
    const [currentInfo, setCurrentInfo] = useState<string>();

    const onInfo = (expense: ApiExpense): () => void => {
        const { id } = expense;
        return () => setCurrentInfo(currentInfo !== id ? id : undefined);
    };

    const onEdit = (expense: ApiExpense): () => void => {
        const { id } = expense;
        return () => {
            setRequested({
                id,
                request: expense,
            });
            onOpen();
        };
    };

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

    }, [expenses, currentInfo]);

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
