import { useEffect, useMemo, useState } from 'react';

import { Grid } from '@chakra-ui/react';

import { useExpenseContext } from '../../../providers/ExpenseContextProvider';
import { NoDataTableRow } from "../../common/data/NoDataTableRow";
import { ExpenseSummary } from '../summary/ExpenseSummary';

import { ExpenseGridRow } from "./ExpenseGridRow";

export const ExpenseGrid = () => {
    const { data: { expenses, summary }, updateData } = useExpenseContext();
    const [currentInfo, setCurrentInfo] = useState<string>();

    useEffect(() => {
        updateData({ month: new Date().getMonth() + 1, year: new Date().getFullYear() });
    }, []);

    const TableBodyContent = useMemo(() => {
        if (expenses.length) {
            return expenses.map((expense) => (
                <ExpenseGridRow
                  key={expense.id}
                  expense={expense}
                  info={{
                        currentInfoId: currentInfo,
                        onClick: (id: string) => {
                            setCurrentInfo(currentInfo === id ? undefined : id);
                        },
                    }}
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
              overflowX={'auto'}
              templateColumns={`repeat(12, 1fr)`}
            >
                {TableBodyContent}
            </Grid>
        </>
    );
};
