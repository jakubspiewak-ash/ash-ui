import React from 'react';

import * as Cell from './cell';
import { ExpenseGridCell } from './ExpenseGridCell';
import { ExpenseGridInfoIcon } from './ExpenseGridInfoIcon';
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
                <ExpenseGridInfoIcon onClick={onInfo}/>
            </ExpenseGridCell>
        </>
    );
};

const VisibleInfoProps = (props: ExpenseTableRowProps) => {
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
    return isInfoVisible ? VisibleInfoProps(props) : InvisibleInfoRow(props);
};