import React, { useMemo } from 'react';

import { Collapse, GridItem } from '@chakra-ui/react';

import { useExpenseContext } from '../../../../providers/ExpenseContextProvider';
import { ApiExpense } from '../../../../services/api.types';
import { useIsMdBreakpoint } from '../../../../utils/hooks';

import { ExpenseGridRowBrowser } from './ExpenseGridRowBrowser';
import { ExpenseGridRowMobile } from './ExpenseGridRowMobile';
import { ExpenseInfo } from './ExpenseInfo';

export interface ExpenseTableRowProps {
    expense: ApiExpense,
    actions: {
        onInfo: () => void,
        onEdit: () => void,
        onDelete: () => void,
    },
    isInfoVisible: boolean
}

export const ExpenseGridRow = (props: ExpenseTableRowProps) => {
    const { expense, isInfoVisible } = props;
    const { id } = expense;
    const { data } = useExpenseContext();

    const isMd = useIsMdBreakpoint();

    const bottomBorder = useMemo(() => id === data.expenses[data.expenses.length - 1]?.id ? 0 : 1, [data.expenses]);

    const Row = (isMd ? ExpenseGridRowBrowser : ExpenseGridRowMobile)(props);

    return (
        <>
            {Row}
            <GridItem
              borderBottomWidth={bottomBorder}
              colSpan={12}
              justifyContent={'center'}
            >
                <Collapse
                  in={isInfoVisible}
                  animateOpacity
                >
                    <ExpenseInfo expense={expense}/>
                </Collapse>
            </GridItem>
        </>
    );
};