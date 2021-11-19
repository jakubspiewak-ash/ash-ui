import { useEffect, useMemo } from 'react';

import { Box, Table, TableCaption, Tbody, Tfoot, Thead } from '@chakra-ui/react';

import { useExpenseContext } from '../../../providers/ExpenseContextProvider';
import { NoDataTableRow } from "../../common/data/NoDataTableRow";
import { ExpenseSummary } from '../summary/ExpenseSummary';

import { ColumnNames } from "./ExpenseTableColumnNames";
import { ExpenseTableRow } from "./ExpenseTableRow";

export const ExpenseTable = () => {
    const { data: { expenses, summary }, updateData } = useExpenseContext();

    useEffect(() => {
        updateData({ month: new Date().getMonth() + 1, year: new Date().getFullYear() });
    }, []);

    const TableBodyContent = useMemo(() => {
        if (expenses.length) {
            return expenses.map(ExpenseTableRow);
        }
        return <NoDataTableRow colsNumber={8}/>;

    }, [expenses]);

    return (
        <>
            <ExpenseSummary {...summary}/>
            <Box
              borderRadius={16}
              borderWidth={1}
              boxShadow={'md'}
              mb={3}
              overflowX={'auto'}
              py={3}
            >
                <Table size='sm'>
                    <TableCaption>Expenses data</TableCaption>
                    <Thead>
                        <ColumnNames/>
                    </Thead>
                    <Tbody>
                        {TableBodyContent}
                    </Tbody>
                    <Tfoot>
                        <ColumnNames/>
                    </Tfoot>
                </Table>
            </Box>
        </>
    );
};
