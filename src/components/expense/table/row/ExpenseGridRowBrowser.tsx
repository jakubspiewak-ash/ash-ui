import React from 'react';

import { InfoIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/react';

import * as Cell from './cell';
import { ExpenseGridCell } from './ExpenseGridCell';
import { ExpenseTableRowProps } from './ExpenseGridRow';
import { ExpenseToolsButtons } from './ExpenseToolsButtons';

const InvisibleInfoRow = (props: ExpenseTableRowProps) => {
    const { expense, actions: { onInfo } } = props;
    return (
        <>
            <ExpenseGridCell size={5}>
                <Cell.Name expense={expense}/>
            </ExpenseGridCell>
            <ExpenseGridCell
              align={'end'}
              size={2}
            >
                <Cell.Amount expense={expense}/>
            </ExpenseGridCell>
            <ExpenseGridCell>
                <Cell.Currency expense={expense}/>
            </ExpenseGridCell>
            <ExpenseGridCell align={'center'}>
                <Cell.IsPrivate expense={expense}/>
            </ExpenseGridCell>
            <ExpenseGridCell size={2}>
                <Cell.Date expense={expense}/>
            </ExpenseGridCell>
            <ExpenseGridCell align={'end'}>
                <IconButton
                  aria-label='info'
                  icon={<InfoIcon/>}
                  ml={'auto'}
                  my={3}
                  size={'sm'}
                  onClick={onInfo}
                />
            </ExpenseGridCell>
        </>
    );
};

const VisibleInfoRow = (props: ExpenseTableRowProps) => {
    const { expense, actions } = props;
    return (
        <>
            <ExpenseGridCell size={10}>
                <Cell.Name expense={expense}/>
            </ExpenseGridCell>
            <ExpenseGridCell
              align={'end'}
              size={2}
            >
                <ExpenseToolsButtons {...actions}/>
            </ExpenseGridCell>
        </>
    );
};

export const ExpenseGridRowBrowser = (props: ExpenseTableRowProps) => {
    const { isInfoVisible } = props;
    return isInfoVisible ? VisibleInfoRow(props) : InvisibleInfoRow(props);
};