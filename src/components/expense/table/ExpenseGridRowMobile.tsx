import React from 'react';

import { ApiExpense } from '../../../services/api.types';

import * as Cell from './cell';
import { ExpenseGridCell } from './ExpenseGridCell';
import { ExpenseGridInfoIcon } from './ExpenseGridInfoIcon';
import { ExpenseToolsButtons } from './ExpenseToolsButtons';

interface ExpenseGridRowMobileProps {
    expense: ApiExpense,
    actions: {
        onInfo: () => void,
        onEdit: () => void,
        onDelete: () => void
    },
    isInfoVisible: boolean
}

const InvisibleInfoRow = (props: ExpenseGridRowMobileProps) => {
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
                <ExpenseGridInfoIcon
                  marginLeft={'auto'}
                  onClick={onInfo}
                />
            </ExpenseGridCell>
        </>
    );
};

const VisibleInfoRow = (props: ExpenseGridRowMobileProps) => {
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

export const ExpenseGridRowMobile = (props: ExpenseGridRowMobileProps) => {
    const { isInfoVisible } = props;
    return isInfoVisible ? VisibleInfoRow(props) : InvisibleInfoRow(props);
};