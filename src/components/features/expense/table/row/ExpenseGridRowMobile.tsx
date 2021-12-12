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
            <ExpenseGridCell size={9}>
                <Cell.Name expense={expense}/>
            </ExpenseGridCell>
            <ExpenseGridCell
              align={'end'}
              size={3}
            >
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
            <ExpenseGridCell size={7}>
                <Cell.Name expense={expense}/>
            </ExpenseGridCell>
            <ExpenseGridCell
              align={'end'}
              size={5}
            >
                <ExpenseToolsButtons {...actions}/>
            </ExpenseGridCell>
        </>
    );
};

export const ExpenseGridRowMobile = (props: ExpenseTableRowProps) => {
    const { isInfoVisible } = props;
    return isInfoVisible ? VisibleInfoRow(props) : InvisibleInfoRow(props);
};