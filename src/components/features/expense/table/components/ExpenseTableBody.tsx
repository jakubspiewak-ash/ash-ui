import { Fragment } from 'react';

import { Heading, Spinner, Tr } from '@chakra-ui/react';

import { useAppSelector } from '../../../../../redux/hooks';
import { ApiExpense } from '../../../../../services/api.types';

import * as Cell from './cell';
import { ExpenseInfo } from './info/ExpenseInfo';
import { TableData } from './TableData';


export const ExpenseTableBody = () => {
    const { data: { expenses }, status } = useAppSelector((state) => state.expense.table);

    if (status === 'LOADING') {
        return (
            <TableData
              align={'center'}
              size={5}
            >
                <Spinner
                  alignSelf={'center'}
                  size={'xl'}
                />
            </TableData>
        );
    }

    if (expenses.length === 0) {
        return (
            <TableData
              align={'center'}
              size={5}
            >
                <Heading>No data</Heading>
            </TableData>
        );
    }

    return (
        <>
            {
                expenses.map((expense: ApiExpense) => {
                    const { id } = expense;
                    return (
                        <Fragment key={id}>
                            <Tr>
                                <Cell.Name expense={expense}/>
                                <Cell.Amount expense={expense}/>
                                <Cell.Currency expense={expense}/>
                                <Cell.IsPrivate expense={expense}/>
                                <Cell.Info expense={expense}/>
                            </Tr>
                            <Tr>
                                <ExpenseInfo expense={expense}/>
                            </Tr>
                        </Fragment>
                    );
                })
            }
        </>
    );
};