import { useEffect } from 'react';


import { Table, Tbody, Thead } from '@chakra-ui/react';

import { useAppDispatch } from '../../../../redux/hooks';
import { loadExpenses } from '../../../../redux/reducer/ExpenseSlice';
import { YearMonth } from '../../../../utils/types';

import { ExpenseTableBody } from './components/ExpenseTableBody';
import { ExpenseTableHead } from './components/ExpenseTableHead';

export const ExpenseTable = () => {
    const dispatch = useAppDispatch();
    const updateData = (month: YearMonth) => dispatch(loadExpenses(month));

    useEffect(() => {
        updateData({ month: new Date().getMonth() + 1, year: new Date().getFullYear() });
    }, []);


    return (
        <Table mb={4}>
            <Thead>
                <ExpenseTableHead/>
            </Thead>
            <Tbody>
                <ExpenseTableBody/>
            </Tbody>
        </Table>
    );
};
